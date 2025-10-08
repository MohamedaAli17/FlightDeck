import { doc, updateDoc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

/**
 * Promote a user to admin role
 * This function should only be called by existing admins or during initial setup
 */
export const promoteUserToAdmin = async (userEmail: string): Promise<boolean> => {
  try {
    // First, find the user by email in the users collection
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', userEmail));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('User not found');
    }
    
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, 'users', userDoc.id);
    
    // Update the user's role to admin
    await updateDoc(userRef, {
      role: 'admin',
      isAdmin: true,
      updatedAt: new Date().toISOString()
    });
    
    console.log(`User ${userEmail} has been promoted to admin`);
    return true;
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    return false;
  }
};

/**
 * Demote an admin user to regular user
 */
export const demoteAdminToUser = async (userEmail: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', userEmail));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('User not found');
    }
    
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, 'users', userDoc.id);
    
    await updateDoc(userRef, {
      role: 'user',
      isAdmin: false,
      updatedAt: new Date().toISOString()
    });
    
    console.log(`User ${userEmail} has been demoted to regular user`);
    return true;
  } catch (error) {
    console.error('Error demoting admin to user:', error);
    return false;
  }
};

/**
 * Create the first admin user during app initialization
 * This should be called once during app setup
 */
export const createFirstAdmin = async (adminEmail: string, adminPassword: string): Promise<boolean> => {
  try {
    // This would typically be done through Firebase Admin SDK on the backend
    // For now, we'll create a user document that can be manually updated
    const adminUserData = {
      email: adminEmail,
      role: 'admin',
      isAdmin: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      displayName: 'System Administrator'
    };
    
    // Create a document with the admin email as ID
    const adminRef = doc(db, 'users', adminEmail.replace('@', '_at_').replace('.', '_dot_'));
    await setDoc(adminRef, adminUserData);
    
    console.log(`Admin user document created for ${adminEmail}`);
    console.log('Please sign up this user through the app and the admin role will be automatically applied');
    return true;
  } catch (error) {
    console.error('Error creating first admin:', error);
    return false;
  }
};

/**
 * Check if a user is admin
 */
export const isUserAdmin = async (userEmail: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', userEmail));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return false;
    }
    
    const userData = querySnapshot.docs[0].data();
    return userData.role === 'admin' || userData.isAdmin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Get all admin users
 */
export const getAllAdmins = async (): Promise<any[]> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'admin'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting admin users:', error);
    return [];
  }
};
