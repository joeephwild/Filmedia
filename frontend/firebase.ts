// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtQCksDHoYGzAivV5SCgr4TDpsnjQ5GqY",
  authDomain: "filmediamobile.firebaseapp.com",
  projectId: "filmediamobile",
  storageBucket: "filmediamobile.appspot.com",
  messagingSenderId: "482827022073",
  appId: "1:482827022073:web:145b236d425bb9ff8f3c28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);