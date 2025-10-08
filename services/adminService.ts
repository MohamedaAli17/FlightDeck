import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  profilePicture?: string;
}

export interface ErrorLog {
  id: string;
  type: 'API_ERROR' | 'AUTH_ERROR' | 'VALIDATION_ERROR' | 'SYSTEM_ERROR' | 'USER_ERROR';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  stackTrace?: string;
  user?: string;
  endpoint?: string;
  timestamp: string;
  resolved: boolean;
  metadata?: Record<string, any>;
}

export interface ContentItem {
  id: string;
  type: 'restaurant' | 'shop' | 'activity' | 'service';
  name: string;
  description: string;
  location: string;
  hours: string;
  rating: number;
  imageUrl?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalSessions: number;
  averageSessionDuration: number;
  mostViewedContent: Array<{
    name: string;
    views: number;
    type: string;
  }>;
  errorStats: {
    total: number;
    critical: number;
    resolved: number;
  };
}

// User Management
export const getUserList = async (): Promise<User[]> => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUserRole = async (userId: string, role: 'user' | 'admin'): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      role,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

export const updateUserStatus = async (userId: string, isActive: boolean): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      isActive,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

// Error Logs
export const getErrorLogs = async (limitCount: number = 100): Promise<ErrorLog[]> => {
  try {
    const logsRef = collection(db, 'errorLogs');
    const q = query(logsRef, orderBy('timestamp', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ErrorLog[];
  } catch (error) {
    console.error('Error fetching error logs:', error);
    throw error;
  }
};

export const getErrorLogsBySeverity = async (severity: string): Promise<ErrorLog[]> => {
  try {
    const logsRef = collection(db, 'errorLogs');
    const q = query(logsRef, where('severity', '==', severity), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ErrorLog[];
  } catch (error) {
    console.error('Error fetching error logs by severity:', error);
    throw error;
  }
};

export const markErrorAsResolved = async (logId: string): Promise<void> => {
  try {
    const logRef = doc(db, 'errorLogs', logId);
    await updateDoc(logRef, {
      resolved: true,
      resolvedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error marking error as resolved:', error);
    throw error;
  }
};

export const subscribeToErrorLogs = (callback: (logs: ErrorLog[]) => void) => {
  const logsRef = collection(db, 'errorLogs');
  const q = query(logsRef, orderBy('timestamp', 'desc'), limit(50));
  
  return onSnapshot(q, (snapshot) => {
    const logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ErrorLog[];
    callback(logs);
  });
};

// Content Management
export const getContentList = async (): Promise<ContentItem[]> => {
  try {
    const contentRef = collection(db, 'content');
    const snapshot = await getDocs(contentRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ContentItem[];
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};

export const addContentItem = async (content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const contentRef = collection(db, 'content');
    const docRef = await addDoc(contentRef, {
      ...content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding content:', error);
    throw error;
  }
};

export const updateContentItem = async (contentId: string, updates: Partial<ContentItem>): Promise<void> => {
  try {
    const contentRef = doc(db, 'content', contentId);
    await updateDoc(contentRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
};

export const deleteContentItem = async (contentId: string): Promise<void> => {
  try {
    const contentRef = doc(db, 'content', contentId);
    await deleteDoc(contentRef);
  } catch (error) {
    console.error('Error deleting content:', error);
    throw error;
  }
};

// Analytics
export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    // Get user statistics
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    const totalUsers = usersSnapshot.size;
    const activeUsers = usersSnapshot.docs.filter(doc => doc.data().isActive).length;
    
    // Get today's new users
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newUsersToday = usersSnapshot.docs.filter(doc => {
      const createdAt = doc.data().createdAt?.toDate();
      return createdAt && createdAt >= today;
    }).length;

    // Get error statistics
    const logsRef = collection(db, 'errorLogs');
    const logsSnapshot = await getDocs(logsRef);
    const totalErrors = logsSnapshot.size;
    const criticalErrors = logsSnapshot.docs.filter(doc => doc.data().severity === 'CRITICAL').length;
    const resolvedErrors = logsSnapshot.docs.filter(doc => doc.data().resolved).length;

    // Get content statistics
    const contentRef = collection(db, 'content');
    const contentSnapshot = await getDocs(contentRef);
    const totalContent = contentSnapshot.size;

    // Get most viewed content (this would need to be tracked separately)
    const mostViewedContent = contentSnapshot.docs
      .map(doc => ({
        name: doc.data().name,
        views: doc.data().views || 0,
        type: doc.data().type
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    return {
      totalUsers,
      activeUsers,
      newUsersToday,
      totalSessions: 0, // This would need to be tracked separately
      averageSessionDuration: 0, // This would need to be tracked separately
      mostViewedContent,
      errorStats: {
        total: totalErrors,
        critical: criticalErrors,
        resolved: resolvedErrors
      }
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
};

// Real-time notifications
export const subscribeToCriticalErrors = (callback: (error: ErrorLog) => void) => {
  const logsRef = collection(db, 'errorLogs');
  const q = query(
    logsRef, 
    where('severity', '==', 'CRITICAL'),
    where('resolved', '==', false),
    orderBy('timestamp', 'desc'),
    limit(1)
  );
  
  return onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const error = {
          id: change.doc.id,
          ...change.doc.data()
        } as ErrorLog;
        callback(error);
      }
    });
  });
};

// Log error function (to be used throughout the app)
export const logError = async (errorData: Omit<ErrorLog, 'id' | 'timestamp' | 'resolved'>): Promise<void> => {
  try {
    const logsRef = collection(db, 'errorLogs');
    await addDoc(logsRef, {
      ...errorData,
      timestamp: serverTimestamp(),
      resolved: false
    });
  } catch (error) {
    console.error('Error logging error:', error);
    // Don't throw here to avoid infinite loops
  }
};
