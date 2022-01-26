import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBpr9cBmHMTA-2qdjOVzPRFd7iC8K4m7I4",
  authDomain: "anilite-crux.firebaseapp.com",
  projectId: "anilite-crux",
  storageBucket: "anilite-crux.appspot.com",
  messagingSenderId: "862296294691",
  appId: "1:862296294691:web:f2f6a074c17f6dd5277896",
  measurementId: "G-443W21ZB9Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
