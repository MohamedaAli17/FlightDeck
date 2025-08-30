import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (displayName: string, additionalData?: { phone?: string; dateOfBirth?: string; nationality?: string; passportNumber?: string }) => Promise<void>;
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
          } else {
            setUser(user);
          }
        } catch (error) {
          console.warn('Failed to load profile data from storage:', error);
          setUser(user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logout,
    updateProfile: updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
