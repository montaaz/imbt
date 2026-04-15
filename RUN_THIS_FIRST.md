# 🚨 IMPORTANT: Run This First!

## Fix the Database Error

The error `column "password_hash" does not exist` means your database needs to be updated.

### Option 1: Run Migration (Safe - Keeps Existing Data)

```bash
# This will add the missing columns without deleting anything
psql $DATABASE_URL -f database/migration-add-auth.sql
```

### Option 2: Fresh Setup (Warning - Deletes All Data)

```bash
# Only use this if you want to start fresh
psql $DATABASE_URL -f database/schema.sql
```

### Verify It Worked

```bash
# Connect to database
psql $DATABASE_URL

# Check if password_hash column exists
\d clients

# You should see:
# - password_hash (character varying 255)
# - email_verified (boolean)
# - last_login (timestamp)

# Exit
\q
```

## After Migration

Run your app:
```bash
npm run dev
```

Now the reservation with password will work! ✅
