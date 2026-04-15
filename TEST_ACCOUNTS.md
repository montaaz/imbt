# Test Accounts

All accounts can log in at: `/auth/signin`

## Available Test Accounts

### 👨‍💼 Administrator
- **Email:** `admin@imbt-consulting.com`
- **Password:** `admin123`
- **Role:** `admin`
- **Access:** Full admin dashboard at `/admin`
  - Reservations management
  - Client management
  - Blog management
  - Statistics
  - Settings

### 👔 Manager
- **Email:** `manager@test.com`
- **Password:** `password123`
- **Role:** `manager`
- **Access:** Admin dashboard at `/admin`
  - Same access as administrator

### 👤 Regular User/Client #1
- **Email:** `client@test.com`
- **Password:** `password123`
- **Role:** `user`
- **Access:** Client dashboard at `/dashboard`
  - View their reservations
  - View their purchases
  - Update profile

### 👤 Regular User/Client #2
- **Email:** `marie@test.com`
- **Password:** `password123`
- **Role:** `user`
- **Access:** Client dashboard at `/dashboard`
  - View their reservations
  - View their purchases
  - Update profile

## Login Flow

1. User enters email and password at `/auth/signin`
2. System validates credentials
3. System checks user role
4. **Automatic redirect based on role:**
   - `admin` or `manager` → `/admin` (Admin Dashboard)
   - `user` → `/dashboard` (Client Dashboard)

## Creating More Users

To create additional test users, run:
```bash
node database/create-test-users.js
```

Or use the signup page at `/auth/signup` to create new accounts.
