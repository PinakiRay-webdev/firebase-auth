import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "authentication-afb6d.firebaseapp.com",
  projectId: "authentication-afb6d",
  storageBucket: "authentication-afb6d.firebasestorage.app",
  messagingSenderId: "953147164478",
  appId: "1:953147164478:web:8798c37bde856dc3980e6f",
  measurementId: "G-X8D6B7S9P1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)