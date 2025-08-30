# Firebase Setup Guide

This guide will help you set up Firebase authentication for the FlightDeck app.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "flightdeck-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project console, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Email/Password"
5. Enable "Email/Password" authentication
6. Click "Save"

## Step 3: Get Firebase Configuration

1. In your Firebase project console, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>) to add a web app
5. Enter an app nickname (e.g., "FlightDeck Web")
6. Click "Register app"
7. Copy the Firebase configuration object

## Step 4: Update Firebase Configuration

1. Open `config/firebase.ts` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Test the Authentication

1. Start your development server: `npm start`
2. The app will automatically redirect to the sign-in screen if no user is authenticated
3. Create a new account using the sign-up screen
4. Sign in with your credentials
5. Test the sign-out functionality in the profile screen

## Features Implemented

- ✅ Email/Password Authentication
- ✅ User Registration (Sign Up)
- ✅ User Login (Sign In)
- ✅ User Logout (Sign Out)
- ✅ Persistent Authentication State
- ✅ Protected Routes
- ✅ User Profile Display
- ✅ Loading States
- ✅ Error Handling

## File Structure

```
my-FlightDeck/
├── config/
│   └── firebase.ts              # Firebase configuration
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── app/
│   ├── auth/
│   │   ├── signup.tsx           # Sign up screen
│   │   └── signin.tsx           # Sign in screen
│   ├── (tabs)/
│   │   └── profile.tsx          # Updated profile screen
│   ├── _layout.tsx              # Root layout with AuthProvider
│   └── index.tsx                # Entry point with auth routing
└── components/
    └── AuthWrapper.tsx          # Authentication wrapper component
```

## Security Notes

- Never commit your Firebase API keys to version control
- Consider using environment variables for production
- Enable additional authentication methods as needed (Google, Apple, etc.)
- Set up proper Firebase Security Rules for your database

## Troubleshooting

### Common Issues:

1. **"Firebase App named '[DEFAULT]' already exists"**
   - This usually happens when Firebase is initialized multiple times
   - Make sure you're only calling `initializeApp` once

2. **Authentication not persisting**
   - Ensure AsyncStorage is properly configured
   - Check that the persistence is set up correctly in the Firebase config

3. **Navigation issues**
   - Make sure all routes are properly defined in your app structure
   - Check that the router paths match your file structure

### Getting Help:

- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review the [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- Check the console for any error messages





