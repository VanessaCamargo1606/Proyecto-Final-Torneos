// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc-YQ3tFR28v0l3xHluGuOKxHHigghhQo",
  authDomain: "mi-primer-firebase-a1548.firebaseapp.com",
  projectId: "mi-primer-firebase-a1548",
  storageBucket: "mi-primer-firebase-a1548.appspot.com",
  messagingSenderId: "618878276332",
  appId: "1:618878276332:web:c38142c5eb97c3b0544bc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
