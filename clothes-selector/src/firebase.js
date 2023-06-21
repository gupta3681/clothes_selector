import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuN7MStFR2UQYJl4QrXrF8O4AvdSqk8Kg",
  authDomain: "clothes-selector.firebaseapp.com",
  projectId: "clothes-selector",
  storageBucket: "clothes-selector.appspot.com",
  messagingSenderId: "652291916244",
  appId: "1:652291916244:web:27b3de2aa94f9d11b91641",
  measurementId: "G-M6ZZZXRFYQ"
};

const app = initializeApp(firebaseConfig);

// Get a Firestore instance
export const db = getFirestore(app);
