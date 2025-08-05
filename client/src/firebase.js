
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "note-s-circle-f2edf.firebaseapp.com",
  projectId: "note-s-circle-f2edf",
  storageBucket: "note-s-circle-f2edf.firebasestorage.app",
  messagingSenderId: "785793888821",
  appId: "1:785793888821:web:38e7555111a097fa02377c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
