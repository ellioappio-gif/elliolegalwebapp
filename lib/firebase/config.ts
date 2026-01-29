/**
 * Firebase Configuration for Ellio-Law Ad System
 * 
 * Handles authentication, analytics, and ad metrics storage
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDEnn9aYzQP52SkkyWjoaILtXxI_trnfZ4",
  authDomain: "ellio-legal-v12526.firebaseapp.com",
  projectId: "ellio-legal-v12526",
  storageBucket: "ellio-legal-v12526.firebasestorage.app",
  messagingSenderId: "460268538980",
  appId: "1:460268538980:web:b79f316be770dd8a036371",
  measurementId: "G-NBVLL9VNL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (client-side only)
let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };

export default app;