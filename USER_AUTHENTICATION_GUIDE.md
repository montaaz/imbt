# User Authentication & Dashboard System

## Overview

This implementation adds a complete user authentication system that allows clients to:
- Register and create accounts
- Login to their personal dashboard
- View their reservation history
- View their purchase history and tracking information
- Manage their profile

The system uses PostgreSQL database with GraphQL API and includes role-based access control for both admin users and regular clients.

## Database Schema Updates

### New Tables

1. **Products Table**
   - Stores products and services catalog
   - Supports different product types (service, formation, consultation, software, other)
   - Includes pricing, duration, features, and metadata

2. **Purchases Table**
   - Tracks client purchases and orders
   - Includes status tracking (pending, processing, completed, cancelled, refunded)
   - Supports order tracking with tracking numbers
   - Links to both clients and products

### Updated Tables

1. **Clients Table** - Added authentication fields:
   - `password_hash` - Hashed password for authentication
   - `email_verified` - Email verification status
   - `last_login` - Timestamp of last login

## API Endpoints

### Client Authentication

#### POST `/api/client/signup`
Register a new client account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "phone": "+216 XX XXX XXX",
  "company": "Company Name",
  "position": "CEO",
  "city": "Tunis",
  "country": "Tunisia"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN",
  "client": {
    "id": 1,
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    ...
  }
}
```

#### POST `/api/client/login`
Login to existing client account.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN",
  "client": {
    "id": 1,
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    ...
  }
}
```

#### GET `/api/client/dashboard`
Get client dashboard data including reservations, purchases, and statistics.

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "client": {...},
  "reservations": [...],
  "purchases": [...],
  "stats": {
    "reservations": {
      "pending_reservations": 2,
      "confirmed_reservations": 3,
      "completed_reservations": 5,
      "upcoming_reservations": 1
    },
    "purchases": {
      "total_purchases": 3,
      "completed_purchases": 2,
      "processing_purchases": 1,
      "total_spent": 4500.00
    }
  }
}
```

## GraphQL API

### Queries

#### Client Queries
```graphql
# Get my profile (requires client authentication)
query {
  myProfile {
    id
    email
    firstName
    lastName
    phone
    company
    emailVerified
    lastLogin
  }
}

# Get my reservations
query {
  myReservations {
    id
    serviceName
    date
    time
    status
    duration
  }
}

# Get my purchases
query {
  myPurchases {
    id
    productName
    totalPrice
    status
    trackingNumber
    createdAt
  }
}

# Get all products (public)
query {
  products(limit: 10, active: true) {
    id
    name
    description
    price
    productType
    features
  }
}
```

### Mutations

#### Client Authentication
```graphql
# Client signup
mutation {
  clientSignup(input: {
    firstName: "John"
    lastName: "Doe"
    email: "john@example.com"
    password: "password123"
    phone: "+216 XX XXX XXX"
    company: "Company Name"
  }) {
    token
    client {
      id
      email
      firstName
      lastName
    }
  }
}

# Client login
mutation {
  clientLogin(email: "john@example.com", password: "password123") {
    token
    client {
      id
      email
      firstName
      lastName
    }
  }
}

# Update my profile
mutation {
  updateMyProfile(input: {
    firstName: "John"
    lastName: "Smith"
    phone: "+216 XX XXX XXX"
  }) {
    id
    firstName
    lastName
  }
}
```

#### Admin Mutations (requires admin authentication)
```graphql
# Create product
mutation {
  createProduct(input: {
    name: "Premium Consultation"
    description: "1-hour premium consultation"
    productType: consultation
    price: 500.00
    currency: "TND"
    duration: 60
    features: ["Expert advice", "Follow-up support"]
  }) {
    id
    name
    price
  }
}

# Create purchase
mutation {
  createPurchase(input: {
    clientId: 1
    productId: 1
    productName: "Premium Consultation"
    productType: consultation
    quantity: 1
    unitPrice: 500.00
    totalPrice: 500.00
    paymentMethod: "credit_card"
  }) {
    id
    status
    trackingNumber
  }
}

# Update purchase status
mutation {
  updatePurchase(id: 1, input: {
    status: completed
    trackingNumber: "TRK-2025-001"
  }) {
    id
    status
    trackingNumber
  }
}
```

## Frontend Pages

### `/auth/signup` - Client Registration
- Form for new client registration
- Validates password strength (minimum 6 characters)
- Creates account and redirects to dashboard

### `/auth/client-login` - Client Login
- Login form for existing clients
- Stores JWT token in localStorage
- Redirects to dashboard on successful login

### `/auth/signin` - Admin Login
- Existing admin login page
- For admin, manager, and agent roles
- Redirects to admin panel

### `/dashboard` - Client Dashboard
- **Profile Tab**: View and manage profile information
- **Reservations Tab**: View all reservations with status
- **Purchases Tab**: View all purchases with tracking
- **Statistics Cards**: Quick overview of activity

Features:
- Real-time status badges (pending, confirmed, completed, etc.)
- Tracking number display for purchases
- Date/time formatting
- Responsive design

## Authentication Flow

### Client Registration & Login
1. User fills signup form at `/auth/signup`
2. Frontend sends POST to `/api/client/signup`
3. Backend validates data, hashes password with bcrypt
4. Creates client record in database
5. Returns JWT token with role='client'
6. Frontend stores token in localStorage as 'client_token'
7. User redirected to `/dashboard`

### Accessing Dashboard
1. User visits `/dashboard`
2. Page reads 'client_token' from localStorage
3. Sends GET to `/api/client/dashboard` with Authorization header
4. Backend verifies JWT token
5. Returns client data, reservations, purchases, and stats
6. Dashboard renders with all information

## Role-Based Access Control

### User Roles
- **admin** - Full access to all features
- **manager** - Access to client and reservation management
- **agent** - Limited access to reservations
- **client** - Access to own dashboard and data

### Token Structure
JWT tokens include:
```json
{
  "userId": 123,
  "email": "user@example.com",
  "role": "client"
}
```

### Protected Routes
- Admin routes check for `role` in ['admin', 'manager', 'agent']
- Client routes check for `role` === 'client'
- GraphQL resolvers enforce authentication via context

## Security Features

1. **Password Hashing**: bcrypt with 10 rounds
2. **JWT Tokens**: 7-day expiration
3. **Role Verification**: Checked on every protected route
4. **Input Validation**: Required fields validation
5. **SQL Injection Protection**: Parameterized queries
6. **HTTPS Required**: Tokens only transmitted over HTTPS

## Setup Instructions

### 1. Update Database Schema
```bash
# Run the updated schema
psql $DATABASE_URL -f database/schema.sql
```

This will:
- Add `password_hash`, `email_verified`, `last_login` to clients table
- Create products table
- Create purchases table
- Add sample products and purchases

### 2. Install Dependencies
```bash
npm install
# All required dependencies are already in package.json
```

### 3. Environment Variables
Ensure your `.env.local` file has:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-very-secure-secret-key-change-this
```

### 4. Run the Application
```bash
npm run dev
```

### 5. Test the Flow
1. Visit `http://localhost:3000/auth/signup`
2. Create a new account
3. You'll be redirected to `/dashboard`
4. View your reservations and purchases

## Testing with Sample Data

The schema includes sample data:

### Sample Products
- Consultation Transformation Digitale (500 TND)
- Formation Marketing Digital (1200 TND)
- Développement Site Web E-commerce (3500 TND)
- CRM sur mesure (2800 TND)
- Formation React & Next.js (900 TND)

### Sample Clients
You can test login with existing clients:
- mohamed.benali@example.com
- fatima.mansouri@example.com
- ahmed.khalil@example.com

Note: Existing clients need to be given passwords. You can update them manually in the database or use the signup flow to create new clients.

## Adding Purchase for a Client (Admin)

Use GraphQL or create an API endpoint to add purchases:

```graphql
mutation {
  createPurchase(input: {
    clientId: 1
    productId: 1
    productName: "Formation Marketing Digital"
    productType: formation
    quantity: 1
    unitPrice: 1200.00
    totalPrice: 1200.00
    currency: "TND"
    paymentMethod: "bank_transfer"
  }) {
    id
    status
  }
}
```

## Troubleshooting

### Token Invalid/Expired
- Client should logout and login again
- Token stored as 'client_token' in localStorage

### 401 Unauthorized
- Check if token is being sent in Authorization header
- Verify JWT_SECRET matches between signup and login
- Ensure role is 'client' not 'admin'

### Cannot Access Dashboard
- Clear localStorage and login again
- Check browser console for errors
- Verify API routes are responding

## Future Enhancements

- Email verification system
- Password reset functionality
- Two-factor authentication
- Purchase payment integration
- Real-time notifications
- Order status updates via email/SMS
- Export purchase history as PDF

## File Structure

```
app/
├── api/
│   └── client/
│       ├── signup/route.ts          # Client registration
│       ├── login/route.ts           # Client login
│       └── dashboard/route.ts       # Dashboard data
├── auth/
│   ├── signin/page.tsx              # Admin login
│   ├── signup/page.tsx              # Client signup
│   └── client-login/page.tsx        # Client login
└── dashboard/page.tsx               # Client dashboard

lib/
├── auth.ts                          # JWT & bcrypt utilities
├── db.ts                            # Database connection
└── graphql/
    ├── schema.ts                    # GraphQL type definitions
    └── resolvers.ts                 # GraphQL resolvers

database/
└── schema.sql                       # Database schema with updates
```

## Support

For issues or questions, please refer to the main project documentation or create an issue in the repository.
