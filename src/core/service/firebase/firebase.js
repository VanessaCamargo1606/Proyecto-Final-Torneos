// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDF7l2eFu-DiFo4ELcXc6YNWy7T3bn02SE",
  authDomain: "proyecto-final-torneos.firebaseapp.com",
  projectId: "proyecto-final-torneos",
  storageBucket: "proyecto-final-torneos.appspot.com",
  messagingSenderId: "920911308555",
  appId: "1:920911308555:web:250a94c748fd464c47640e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export { app, db, storage };
