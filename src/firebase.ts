// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq8yPc0l7IofvhB7G9uqdEB-kYXOoHCXU",
  authDomain: "outsidervibes-493ac.firebaseapp.com",
  projectId: "outsidervibes-493ac",
  storageBucket: "outsidervibes-493ac.appspot.com",
  messagingSenderId: "22134585478",
  appId: "1:22134585478:web:ad18e8e7803272f5aaf907",
  measurementId: "G-YYPY3BHDF4",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
