// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeGbd-r06DQodwISw0AH6tOsYVecRCnbE",
  authDomain: "fly-atl.firebaseapp.com",
  projectId: "fly-atl",
  storageBucket: "fly-atl.firebasestorage.app",
  messagingSenderId: "1060237589056",
  appId: "1:1060237589056:web:7c05dd325bd979646dbda5",
  measurementId: "G-CEHT09EQBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics on web platform
let analytics = null;
if (Platform.OS === 'web') {
  try {
    const { getAnalytics } = require("firebase/analytics");
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Firebase Analytics not available:', error);
  }
}

const auth = getAuth(app);
const db = getFirestore(app);

// Export the instances for use in other parts of the app
export { auth, db, analytics };
export default app;