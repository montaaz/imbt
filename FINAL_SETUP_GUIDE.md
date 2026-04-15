# 🚀 Final Setup Guide - Complete System

## 🚨 STEP 1: Fix Database Error (CRITICAL)

The error `column "password_hash" does not exist` means you need to run the database migration.

### Run This Command Now:

```bash
psql $DATABASE_URL -f database/migration-add-auth.sql
```

This will add:
- `password_hash` column to clients table
- `email_verified` column
- `last_login` column
- `products` table
- `purchases` table

### Verify It Worked:

```bash
psql $DATABASE_URL

# Check clients table
\d clients

# You should see password_hash, email_verified, last_login

\q
```

---

## 📦 STEP 2: Install Dependencies

**NO PACKAGE INSTALLATION NEEDED!**

The Google OAuth integration now uses Google Identity Services directly via CDN script, so you don't need to install any npm packages. Everything works out of the box!

---

## 🔐 STEP 3: Setup Google OAuth (Optional but Recommended)

### A. Get Google Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create OAuth Client ID"
5. Type: "Web application"
6. Authorized origins: `http://localhost:3000`
7. Copy your **Client ID**

### B. Add to Environment

Edit `.env.local`:

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# JWT Secret
JWT_SECRET=your-super-secret-key-change-this

# Google OAuth (add this)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

### C. Skip Google OAuth?

If you don't want Google sign-in, it's fine! The system works without it.
Just don't add the `NEXT_PUBLIC_GOOGLE_CLIENT_ID` variable.

---

## 🎯 STEP 4: Run Your App

```bash
npm run dev
```

Open: http://localhost:3000

---

## ✅ STEP 5: Test Everything

### Test 1: Reservation with Account Creation

1. Go to `/reservation`
2. Choose service → date/time
3. Fill personal info
4. **Set a password** (min 6 characters)
5. Submit
6. ✅ See "Voir mon dashboard" button
7. Click it → See your reservation!

### Test 2: Google Sign-In (if configured)

1. Go to `/auth/signup` or `/auth/client-login`
2. Click "Continuer avec Google"
3. Sign in with Google
4. ✅ Auto-redirected to dashboard

### Test 3: Regular Login

1. Go to `/auth/client-login`
2. Enter email + password
3. ✅ Access dashboard

---

## 📁 What Was Implemented

### 1. User Authentication System ✅
- Signup page (`/auth/signup`)
- Login page (`/auth/client-login`)
- JWT token authentication
- Password hashing with bcrypt
- Role-based access (admin vs client)

### 2. Reservation with Auto-Account ✅
- Password field added to reservation form
- Automatic account creation
- Auto-login after reservation
- Dashboard button on success page

### 3. Client Dashboard ✅
- View all reservations
- View all purchases
- Track order status
- Statistics cards
- Profile information

### 4. Google OAuth Integration ✅
- One-tap sign-in
- No password needed
- Auto account creation
- Secure and fast

### 5. Database Schema ✅
- Clients with authentication
- Products catalog
- Purchases tracking
- Proper indexes and triggers

---

## 🗂️ Database Tables

After migration, you have:

- **users** - Admin users (admin, manager, agent)
- **clients** - Client users with passwords ← UPDATED
- **reservations** - Service bookings
- **products** - Services/products catalog ← NEW
- **purchases** - Order tracking ← NEW
- **settings** - App configuration

---

## 🔑 Key Features

### For Clients:
- ✅ Register via signup page OR reservation
- ✅ Login with email/password OR Google
- ✅ View reservation history
- ✅ View purchase history
- ✅ Track orders with tracking numbers
- ✅ See statistics

### For Admins:
- ✅ All previous admin features
- ✅ Manage products
- ✅ Create purchases for clients
- ✅ Update order status

---

## 🌐 API Endpoints

### Client Endpoints:
- `POST /api/client/signup` - Register
- `POST /api/client/login` - Login
- `POST /api/auth/google` - Google OAuth
- `GET /api/client/dashboard` - Dashboard data

### Reservation:
- `POST /api/reservations` - Create (with optional password)

### GraphQL:
- `POST /api/graphql` - All queries/mutations

---

## 🎨 Pages

### Public:
- `/` - Homepage
- `/reservation` - Make reservation (with account creation)
- `/auth/signup` - Client signup
- `/auth/client-login` - Client login
- `/auth/signin` - Admin login

### Protected:
- `/dashboard` - Client dashboard
- `/admin` - Admin panel

---

## 🔧 Troubleshooting

### Error: "password_hash" does not exist
**Solution:**
```bash
psql $DATABASE_URL -f database/migration-add-auth.sql
```

### Google sign-in not showing
**Cause:** `NEXT_PUBLIC_GOOGLE_CLIENT_ID` not set
**Solution:** Add it to `.env.local` or ignore (it's optional)

### Can't login after signup
**Cause:** Database not updated
**Solution:** Run migration script

### Token errors
**Solution:**
```bash
# Clear browser localStorage
# In browser console:
localStorage.clear()
```

---

## 📊 User Flows

### Flow 1: Reservation → Account → Dashboard
```
Visit /reservation
  ↓
Select service & date
  ↓
Fill info + password
  ↓
Submit
  ↓
Account created automatically
  ↓
Token stored
  ↓
Click "Voir mon dashboard"
  ↓
See reservation & stats
```

### Flow 2: Google Sign-In
```
Visit /auth/signup
  ↓
Click "Continuer avec Google"
  ↓
Google authentication
  ↓
Account created/logged in
  ↓
Redirect to /dashboard
```

### Flow 3: Regular Login
```
Visit /auth/client-login
  ↓
Enter email + password
  ↓
Submit
  ↓
Token generated
  ↓
Redirect to /dashboard
```

---

## 📝 Environment Variables

Required `.env.local`:

```env
# Database (REQUIRED)
DATABASE_URL=postgresql://user:pass@host:port/dbname

# JWT Secret (REQUIRED)
JWT_SECRET=change-this-to-random-secure-string

# Google OAuth (OPTIONAL)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com

# Node Environment
NODE_ENV=development
```

---

## 🎉 You're Done!

The system is now fully functional with:
- ✅ User authentication
- ✅ Reservation with auto-account
- ✅ Client dashboard
- ✅ Google OAuth
- ✅ Purchase tracking
- ✅ Complete documentation

### Next Steps:
1. Run migration: `psql $DATABASE_URL -f database/migration-add-auth.sql`
2. (Optional) Setup Google OAuth credentials in `.env.local`
3. Start app: `npm run dev`
4. Test at: http://localhost:3000

---

## 📚 Additional Documentation

- [USER_AUTHENTICATION_GUIDE.md](USER_AUTHENTICATION_GUIDE.md) - Full auth system docs
- [RESERVATION_WITH_ACCOUNT.md](RESERVATION_WITH_ACCOUNT.md) - Reservation flow
- [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md) - Google setup details
- [SETUP.md](SETUP.md) - General setup guide
- [RUN_THIS_FIRST.md](RUN_THIS_FIRST.md) - Quick fix for database error

---

## 🆘 Need Help?

1. Check the error in terminal
2. Look at the documentation files
3. Verify database migration ran successfully
4. Check `.env.local` has all required variables
5. Clear browser localStorage if login issues

**Most common issue:** Forgot to run migration script!
**Solution:** `psql $DATABASE_URL -f database/migration-add-auth.sql`
