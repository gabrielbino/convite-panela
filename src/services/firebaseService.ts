// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvtQDw9OZQ_jilBPBeAS23AoddxKcNKpI",
  authDomain: "convite-panela.firebaseapp.com",
  projectId: "convite-panela",
  storageBucket: "convite-panela.firebasestorage.app",
  messagingSenderId: "69471745581",
  appId: "1:69471745581:web:90ec593844ba8dbdcbeaa4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
