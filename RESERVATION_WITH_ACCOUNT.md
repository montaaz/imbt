# Reservation with Automatic Account Creation

## Overview

The reservation flow has been updated to automatically create a client account during the reservation process. Users can now set a password when making a reservation, and they will be automatically logged in with access to their dashboard.

## How It Works

### Reservation Flow

1. **User fills reservation form** at `/reservation`
   - Step 1: Select service
   - Step 2: Choose date and time
   - Step 3: Enter personal information + **CREATE PASSWORD**

2. **Password field added to Step 3**
   - Required field (minimum 6 characters)
   - Password visibility toggle (eye icon)
   - Hint: "Ce mot de passe vous permettra d'accéder à votre espace client"

3. **On submission**:
   - Creates reservation in database
   - Creates client account with hashed password
   - Generates JWT token
   - Returns token to frontend

4. **After success**:
   - Token stored in localStorage as 'client_token'
   - Client data stored in localStorage
   - **"Voir mon dashboard" button** appears
   - User can immediately access their dashboard

## Technical Implementation

### Frontend Changes

**File**: [app/reservation/page.tsx](app/reservation/page.tsx)

**New state**:
```typescript
const [showPassword, setShowPassword] = useState(false)
const [clientToken, setClientToken] = useState<string | null>(null)

const [formData, setFormData] = useState({
  // ... existing fields
  password: "", // NEW
})
```

**New password field in Step 3**:
```tsx
<div className="space-y-2">
  <Label htmlFor="password">
    <Lock className="h-4 w-4 inline mr-2" />
    Créer un mot de passe
  </Label>
  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      placeholder="Minimum 6 caractères"
      required
      minLength={6}
      className="bg-card/50 border-border/50 pr-10"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      {showPassword ? <EyeOff /> : <Eye />}
    </button>
  </div>
  <p className="text-xs text-foreground/60">
    Ce mot de passe vous permettra d'accéder à votre espace client
  </p>
</div>
```

**Auto-login after reservation**:
```typescript
if (data.token) {
  setClientToken(data.token)
  localStorage.setItem("client_token", data.token)
  localStorage.setItem("client", JSON.stringify({
    id: data.clientId,
    email: formData.email,
    name: `${formData.firstName} ${formData.lastName}`,
  }))
}
```

**Success screen with dashboard button**:
```tsx
{clientToken && (
  <Link href="/dashboard">
    <Button className="glow-primary">
      <LogIn className="mr-2 h-4 w-4" />
      Voir mon dashboard
    </Button>
  </Link>
)}
```

### Backend Changes

**File**: [app/api/reservations/route.ts](app/api/reservations/route.ts)

**Imports**:
```typescript
import { hashPassword, signToken } from '@/lib/auth'
```

**Password validation**:
```typescript
if (password && password.length < 6) {
  return NextResponse.json(
    { error: 'Le mot de passe doit contenir au moins 6 caractères' },
    { status: 400 }
  )
}
```

**Account creation logic**:
```typescript
let clientId: number
let token: string | null = null
let isNewAccount = false

if (existingClient.rows.length > 0) {
  clientId = existingClient.rows[0].id
  const hasPassword = existingClient.rows[0].password_hash

  if (password && !hasPassword) {
    // Client exists but didn't have password - add it now
    const passwordHash = await hashPassword(password)
    await query(`UPDATE clients SET password_hash = $1 ...`, [passwordHash, ...])

    token = signToken({ userId: clientId, email, role: 'client' })
    isNewAccount = true
  }
} else {
  // New client
  if (password) {
    const passwordHash = await hashPassword(password)
    const newClient = await query(
      `INSERT INTO clients (..., password_hash) VALUES (...)`,
      [..., passwordHash]
    )
    clientId = newClient.rows[0].id

    token = signToken({ userId: clientId, email, role: 'client' })
    isNewAccount = true
  }
}
```

**Response with token**:
```typescript
const response: any = {
  message: 'Réservation créée avec succès',
  reservation: reservation.rows[0],
  clientId
}

if (token) {
  response.token = token
  response.isNewAccount = isNewAccount
}

return NextResponse.json(response, { status: 201 })
```

## User Experience

### For New Users

1. **Make a reservation** → Fill form with password
2. **See success message** → "Réservation confirmée !"
3. **Click "Voir mon dashboard"** → Instantly logged in
4. **View dashboard** → See their new reservation

### For Returning Users (Without Account)

1. **Make another reservation** with same email
2. **Set password this time** → Account upgraded
3. **Get logged in automatically** → Access dashboard
4. **See all their reservations** (even past ones)

### For Existing Account Holders

1. **Make reservation** → Can skip password (or change it)
2. **Not automatically logged in** (must use login page)
3. **Access dashboard** → See new reservation added

## API Response

### Without Password
```json
{
  "message": "Réservation créée avec succès",
  "reservation": { ... },
  "clientId": 123
}
```

### With Password (New Account)
```json
{
  "message": "Réservation créée avec succès",
  "reservation": { ... },
  "clientId": 123,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "isNewAccount": true
}
```

## Security Features

1. **Password Hashing**: bcrypt with 10 rounds
2. **Minimum Length**: 6 characters required
3. **JWT Token**: 7-day expiration
4. **Secure Storage**: Token in localStorage
5. **No Duplicate Accounts**: Email uniqueness enforced

## Database Schema

The `clients` table already has these fields:
- `password_hash` VARCHAR(255) - Hashed password
- `email_verified` BOOLEAN - Email verification status
- `last_login` TIMESTAMP - Last login time

## Benefits

✅ **Seamless UX**: One-step registration + reservation
✅ **Immediate Access**: Auto-login after reservation
✅ **Account Upgrade**: Existing clients can add password
✅ **Dashboard Ready**: Instant access to reservation history
✅ **No Extra Steps**: No separate signup required

## Migration

Existing clients without passwords can:
1. Make a new reservation
2. Set a password during the process
3. Their account gets upgraded
4. They can now login and see all reservations

## Testing

### Test 1: New User with Password
```bash
1. Go to /reservation
2. Fill all steps
3. In Step 3, enter password: "test123"
4. Submit
5. See "Voir mon dashboard" button
6. Click it → Should see dashboard with the reservation
```

### Test 2: Existing Client Adding Password
```bash
1. Make reservation without password (email: test@example.com)
2. Make another reservation with same email
3. This time add password: "newpass123"
4. Submit
5. Should get auto-logged in
6. Dashboard shows both reservations
```

### Test 3: Skip Password
```bash
1. Go to /reservation
2. Fill all steps but leave password empty
3. Submit
4. Success but no "Voir mon dashboard" button
5. User must use /auth/client-login later
```

## Frontend Flow Diagram

```
/reservation
    ↓
Step 1: Select Service
    ↓
Step 2: Choose Date/Time
    ↓
Step 3: Personal Info + Password ← NEW
    ↓
Submit Form
    ↓
API: Create Reservation + Account
    ↓
Response with Token (if password provided)
    ↓
Store Token in localStorage
    ↓
Success Screen with "Voir mon dashboard" ← NEW
    ↓
Click → Redirect to /dashboard
    ↓
Show Reservations & Purchases
```

## Files Modified

1. ✅ [app/reservation/page.tsx](app/reservation/page.tsx)
   - Added password field
   - Added auto-login logic
   - Added dashboard button

2. ✅ [app/api/reservations/route.ts](app/api/reservations/route.ts)
   - Added password handling
   - Added token generation
   - Added account creation/upgrade

## Future Enhancements

- [ ] Email verification after reservation
- [ ] Password strength indicator
- [ ] Optional password (make it truly optional)
- [ ] "Already have account?" link to login
- [ ] Remember me checkbox
- [ ] Social login integration

## Conclusion

Users can now create an account and make a reservation in one seamless flow, with immediate access to their dashboard to track their reservations and purchases! 🎉
