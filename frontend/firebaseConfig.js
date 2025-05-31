import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAF6W7QyxTHUJhEuXwoCWu-iNqQxw5rg1k",
    authDomain: "studymon.firebaseapp.com",
    projectId: "studymon",
    storageBucket: "studymon.firebasestorage.app",
    messagingSenderId: "620222071644",
    appId: "1:620222071644:web:d3afab5b993bbf6847f799"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
