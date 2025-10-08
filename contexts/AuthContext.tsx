import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebaseConfig';
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (displayName: string, additionalData?: { phone?: string; dateOfBirth?: string; nationality?: string; passportNumber?: string }) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Google Sign-In configuration
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'YOUR_WEB_CLIENT_ID', // You'll need to replace this with your actual web client ID
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'my-flightdeck',
      }),
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    }
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Try to load additional profile data from local storage
        try {
          const profileData = await AsyncStorage.getItem('userProfile');
          if (profileData) {
            const parsedData = JSON.parse(profileData);
            // Merge Firebase user data with local storage data
            const enhancedUser = {
              ...user,
              displayName: parsedData.displayName || user.displayName
            };
            setUser(enhancedUser);
            
            // Check if user is admin
            const isAdminUser = parsedData.role === 'admin' || parsedData.isAdmin === true;
            setIsAdmin(isAdminUser);
          } else {
            setUser(user);
            setIsAdmin(false);
          }
        } catch (error) {
          console.warn('Failed to load profile data from storage:', error);
          setUser(user);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Send email verification after successful signup
      await sendEmailVerification(userCredential.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Start the Google OAuth flow
      const result = await promptAsync();
      
      if (result.type === 'success') {
        // Exchange the authorization code for an ID token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: 'YOUR_WEB_CLIENT_ID', // You'll need to replace this with your actual web client ID
            code: result.params.code,
            grant_type: 'authorization_code',
            redirect_uri: AuthSession.makeRedirectUri({
              scheme: 'my-flightdeck',
            }),
          }).toString(),
        });

        const tokens = await tokenResponse.json();
        
        if (tokens.id_token) {
          // Create a Google credential with the ID token
          const googleCredential = GoogleAuthProvider.credential(tokens.id_token);
          
          // Sign-in the user with the credential
          await signInWithCredential(auth, googleCredential);
        } else {
          throw new Error('Failed to get ID token from Google');
        }
      } else {
        throw new Error('Google sign-in was cancelled or failed');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updateUserProfile = async (displayName: string, additionalData?: { phone?: string; dateOfBirth?: string; nationality?: string; passportNumber?: string }) => {
    try {
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      
      // Always update local state first
      const updatedUser = { ...user, displayName };
      setUser(updatedUser);
      
      // Try to update Firebase if available
      try {
        if (auth.currentUser) {
          await updateProfile(user, { displayName });
        }
      } catch (firebaseError: any) {
        console.warn('Firebase update failed, using local storage:', firebaseError.message);
      }
      
      // Save to local storage as fallback
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify({
          displayName,
          email: user.email,
          ...additionalData
        }));
      } catch (storageError: any) {
        console.warn('Local storage failed:', storageError.message);
      }
      
      console.log('Profile updated successfully');
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const sendEmailVerificationToUser = async () => {
    try {
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      await sendEmailVerification(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const sendPasswordResetToEmail = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const value = {
    user,
    loading,
    isAdmin,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    updateProfile: updateUserProfile,
    sendEmailVerification: sendEmailVerificationToUser,
    sendPasswordReset: sendPasswordResetToEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
