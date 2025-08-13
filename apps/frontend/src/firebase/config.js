import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these with your actual Firebase project credentials
// Get these from: Firebase Console > Project Settings > Your Apps > Web App
const firebaseConfig = {
  apiKey: "AIzaSyCMBVgcth_EMnt-c4fwlYClvofgOjtzUjM",
  authDomain: "travelos-6a239.firebaseapp.com",
  projectId: "travelos-6a239",
  storageBucket: "travelos-6a239.firebasestorage.app",
  messagingSenderId: "877730605991",
  appId: "1:877730605991:web:46843406a8499e63cbe482"
};

// TODO: Replace the above with your actual Firebase config
// Example of what it should look like:
// const firebaseConfig = {
//   apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz",
//   authDomain: "my-project.firebaseapp.com",
//   projectId: "my-project",
//   storageBucket: "my-project.appspot.com",
//   messagingSenderId: "123456789012",
//   appId: "1:123456789012:web:abcdef1234567890"
// };

// Initialize Firebase
let app;
let db;

try {
  console.log('Initializing Firebase with config:', firebaseConfig.projectId);
  
  // Check if config has been updated with real values
  if (firebaseConfig.apiKey === "your-api-key" || firebaseConfig.projectId === "your-project-id") {
    console.warn('⚠️ Firebase config not set up yet. Please update src/firebase/config.js with your Firebase credentials.');
    // Create a mock db object to prevent errors
    db = {
      collection: () => ({
        add: () => Promise.reject(new Error('Firebase not configured')),
        get: () => Promise.reject(new Error('Firebase not configured')),
        doc: () => ({
          get: () => Promise.reject(new Error('Firebase not configured')),
          set: () => Promise.reject(new Error('Firebase not configured')),
          update: () => Promise.reject(new Error('Firebase not configured')),
          delete: () => Promise.reject(new Error('Firebase not configured'))
        })
      })
    };
  } else {
    console.log('Initializing Firebase app...');
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized, getting Firestore...');
    db = getFirestore(app);
    console.log('Firestore initialized successfully');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Create a mock db object to prevent errors
  db = {
    collection: () => ({
      add: () => Promise.reject(new Error('Firebase initialization failed')),
      get: () => Promise.reject(new Error('Firebase initialization failed')),
      doc: () => ({
        get: () => Promise.reject(new Error('Firebase initialization failed')),
        set: () => Promise.reject(new Error('Firebase initialization failed')),
        update: () => Promise.reject(new Error('Firebase initialization failed')),
        delete: () => Promise.reject(new Error('Firebase initialization failed'))
      })
    })
  };
}

// Collection names
export const COLLECTIONS = {
  REVENUE_FUNCTIONS: 'Functions',
  DRAFTS: 'drafts',
  TEMPLATES: 'templates'
};

export { db };
export default app; 