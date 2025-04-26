import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0Q-F1vGp0Hi5naDHG8F4_lrwoykXR_kY",
  authDomain: "convite-panela-a4762.firebaseapp.com",
  projectId: "convite-panela-a4762",
  storageBucket: "convite-panela-a4762.firebasestorage.app",
  messagingSenderId: "37978446350",
  appId: "1:37978446350:web:a0e7b90e6cdf38bdd83a5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);