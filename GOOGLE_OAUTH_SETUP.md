# Google OAuth Setup Guide

## Step 1: No Installation Needed! ✅

**Great news:** You don't need to install any npm packages! The Google OAuth integration uses Google Identity Services directly via CDN script.

## Step 2: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "IMBT Consulting"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback`
     - `https://yourdomain.com/auth/google/callback`
   - Click "Create"

5. Copy the **Client ID** (you'll need this)

## Step 3: Add to Environment Variables

Create/update `.env.local`:

```env
# Existing variables
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret

# Add Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

## Step 4: Test It (No Restart Needed!)

1. Start your app: `npm run dev`
2. Go to `/auth/signup` or `/auth/client-login`
3. Click "Continuer avec Google"
4. Sign in with your Google account
5. You'll be redirected to the dashboard!

## How It Works

- Uses Google Identity Services (no npm package required!)
- Loads script directly from Google's CDN
- Creates account automatically
- No password needed
- Fast and secure
- Free to use (no API costs)
- Works in all pages: signup, login, and reservation success page

## Security

- Google handles all authentication
- We receive verified email and name
- JWT token generated for your app
- Secure and trusted by millions
