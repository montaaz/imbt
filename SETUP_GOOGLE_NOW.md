# 🚀 Setup Google Sign-In NOW (5 Minutes)

## Why You're Seeing a Warning

The Google sign-in button shows a warning because `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is not configured in your `.env.local` file.

## Quick Setup (Follow These Steps)

### Step 1: Go to Google Cloud Console
Open: https://console.cloud.google.com/

### Step 2: Create/Select Project
- Click "Select a project" at the top
- Click "NEW PROJECT"
- Name it: "IMBT Consulting"
- Click "CREATE"

### Step 3: Enable Google Identity Services
- Wait for project creation (10 seconds)
- Go to: https://console.cloud.google.com/apis/credentials
- Click "CREATE CREDENTIALS" → "OAuth client ID"

**If asked to configure consent screen:**
1. Click "CONFIGURE CONSENT SCREEN"
2. Select "External" → Click "CREATE"
3. Fill in:
   - App name: `IMBT Consulting`
   - User support email: your email
   - Developer contact: your email
4. Click "SAVE AND CONTINUE" (3 times)
5. Go back to "Credentials"

### Step 4: Create OAuth Client ID
1. Click "CREATE CREDENTIALS" → "OAuth client ID"
2. Application type: **Web application**
3. Name: `IMBT Web Client`
4. **Authorized JavaScript origins:**
   - Click "ADD URI"
   - Enter: `http://localhost:3000`
5. Click "CREATE"

### Step 5: Copy Your Client ID
- You'll see a popup with your credentials
- Copy the **Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)
- Click "OK"

### Step 6: Add to .env.local
1. Open `.env.local` file
2. Find the commented line:
   ```
   # NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   ```
3. Remove the `#` and replace with your Client ID:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
   ```
4. Save the file

### Step 7: Restart Your App
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 8: Test It!
1. Go to: http://localhost:3000/auth/signup
2. You should now see the **"Continuer avec Google"** button!
3. Click it and sign in with your Google account
4. You'll be automatically logged in and redirected to dashboard!

---

## Troubleshooting

### Still seeing warning?
- Make sure you removed the `#` from the line in `.env.local`
- Make sure there are no extra spaces
- Restart the dev server

### Button shows but doesn't work?
- Check browser console for errors
- Make sure you added `http://localhost:3000` to authorized origins
- Try in incognito/private window

### Error: "redirect_uri_mismatch"?
- Go back to Google Cloud Console
- Click on your OAuth client
- Add `http://localhost:3000` to "Authorized JavaScript origins"
- Save and try again

---

## ✅ Once Working

The Google sign-in button will appear on:
1. `/auth/signup` - Signup page
2. `/auth/client-login` - Login page
3. `/reservation` - After completing reservation (if no password set)

Users can sign in with one click, no password needed!

---

## 🎯 For Production

When deploying to production, add your production domain:

1. Go to Google Cloud Console → Credentials
2. Click your OAuth client
3. Add to "Authorized JavaScript origins":
   - `https://yourdomain.com`
4. Save
5. Update `.env.production` with the same Client ID

That's it! 🎉
