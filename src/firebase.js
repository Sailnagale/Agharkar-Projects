// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBIRsu0G9r5mdBH7B4nQJ_-9ZAmZplYss",
  authDomain: "soyabean-ai.firebaseapp.com",
  projectId: "soyabean-ai",
  storageBucket: "soyabean-ai.firebasestorage.app",
  messagingSenderId: "241186232648",
  appId: "1:241186232648:web:75df8b2585ecee91e33b7d",
  measurementId: "G-NHZFTHSVT4",
};

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);  <-- COMMENTED OUT FOR TESTING
console.log("FIREBASE CONFIG CHECK:", app.options);
// 2. Initialize and Export Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 3. Helper Functions
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const logout = () => {
  return signOut(auth);
};
