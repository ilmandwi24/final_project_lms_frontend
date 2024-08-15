// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1QjFrNvCkyULsKNpHDQA-RiRtMoggvro',
  authDomain: 'auth-bc517.firebaseapp.com',
  projectId: 'auth-bc517',
  storageBucket: 'auth-bc517.appspot.com',
  messagingSenderId: '958708583309',
  appId: '1:958708583309:web:1ef4cf358cbd8f03ed8bc4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
