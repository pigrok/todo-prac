// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk-8ZV0hq2c78CqaScNA6QYDnOJRA5Avg",
  authDomain: "todo-firebase-daed3.firebaseapp.com",
  projectId: "todo-firebase-daed3",
  storageBucket: "todo-firebase-daed3.appspot.com",
  messagingSenderId: "708331468822",
  appId: "1:708331468822:web:b893c109d9acd042365d37",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
