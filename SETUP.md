# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/reservation_platform

# JWT Secret (change this to a random secure string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Node Environment
NODE_ENV=development
```

### 3. Setup PostgreSQL Database

#### Option A: Using existing PostgreSQL installation
```bash
# Create database
createdb reservation_platform

# Run the schema
psql reservation_platform -f database/schema.sql
```

#### Option B: Using Docker
```bash
# Start PostgreSQL container
docker run --name reservation-db \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=reservation_platform \
  -p 5432:5432 \
  -d postgres:15

# Wait a few seconds for PostgreSQL to start, then run schema
psql postgresql://postgres:yourpassword@localhost:5432/reservation_platform -f database/schema.sql
```

### 4. Verify Database Setup
```bash
# Connect to database
psql $DATABASE_URL

# Check tables
\dt

# You should see:
# - users
# - clients
# - reservations
# - products
# - purchases
# - settings
```

### 5. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Testing the System

### Test Client Registration
1. Go to `http://localhost:3000/auth/signup`
2. Fill in the registration form:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@test.com
   - Password: test123
   - Phone: +216 98 123 456
   - Company: Test Company
3. Click "Créer mon compte"
4. You should be redirected to the dashboard

### Test Client Login
1. Go to `http://localhost:3000/auth/client-login`
2. Login with:
   - Email: john.doe@test.com
   - Password: test123
3. You should see your dashboard

### Test Admin Login
1. Go to `http://localhost:3000/auth/signin`
2. Login with demo credentials:
   - Email: admin@imbt-consulting.com
   - Password: admin123
3. You should access the admin panel

## Database Schema Overview

### Tables Created
- **users** - Admin users (admin, manager, agent roles)
- **clients** - Client users with authentication
- **reservations** - Service reservations
- **products** - Products and services catalog
- **purchases** - Client purchases with tracking
- **settings** - Application configuration

### Sample Data Included
- 2 admin users
- 5 sample clients
- 5 sample reservations
- 5 sample products
- 3 sample purchases

## Common Issues

### Issue: Database connection error
**Solution:**
- Check if PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in `.env.local`
- Test connection: `psql $DATABASE_URL`

### Issue: JWT token errors
**Solution:**
- Ensure JWT_SECRET is set in `.env.local`
- Clear browser localStorage and login again

### Issue: Cannot create tables
**Solution:**
- Drop existing tables: `psql $DATABASE_URL -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"`
- Re-run schema: `psql $DATABASE_URL -f database/schema.sql`

## API Endpoints Summary

### Client Endpoints
- `POST /api/client/signup` - Register new client
- `POST /api/client/login` - Client login
- `GET /api/client/dashboard` - Get dashboard data (requires auth)

### Admin Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/reservations` - List reservations
- `GET /api/clients` - List clients
- `GET /api/stats` - Get statistics

### GraphQL Endpoint
- `POST /api/graphql` - GraphQL API

## GraphQL Playground

If you want to test GraphQL queries:

1. Use a tool like [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer) or [Postman](https://www.postman.com/)
2. Set endpoint to: `http://localhost:3000/api/graphql`
3. For authenticated queries, add header:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

### Example Query
```graphql
query {
  activeProducts {
    id
    name
    price
    description
    productType
  }
}
```

### Example Mutation (Client Signup)
```graphql
mutation {
  clientSignup(input: {
    firstName: "Jane"
    lastName: "Smith"
    email: "jane@example.com"
    password: "password123"
    phone: "+216 99 888 777"
  }) {
    token
    client {
      id
      email
      firstName
    }
  }
}
```

## Next Steps

1. **Customize the UI**: Update colors, fonts, and styles in `tailwind.config.js`
2. **Add Email Service**: Integrate email for verification and notifications
3. **Payment Integration**: Add payment gateway for purchases
4. **Admin Panel**: Extend admin features for managing products and purchases
5. **Mobile App**: Use the same API to build a mobile app

## Production Deployment

### Before deploying:
1. Change JWT_SECRET to a strong random string
2. Set NODE_ENV=production
3. Update database credentials
4. Enable SSL for database connection
5. Set up proper CORS policies
6. Configure rate limiting
7. Set up monitoring and logging

### Recommended Platforms:
- **Vercel** - Frontend and API routes
- **Railway** / **Render** - PostgreSQL database
- **AWS** / **DigitalOcean** - Full stack hosting

## Support

For detailed documentation, see [USER_AUTHENTICATION_GUIDE.md](USER_AUTHENTICATION_GUIDE.md)

For issues, check the troubleshooting section in the guide.
