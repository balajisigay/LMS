import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your Firebase config
// Get this from Firebase Console: Project Settings
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyDemoKey',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'lms-demo.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'lms-demo',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'lms-demo.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
