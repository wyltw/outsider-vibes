// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
