// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkA-QTaePcS5ZEfItIllamKOxIupU4hU0",
  authDomain: "react-login-lobby.firebaseapp.com",
  projectId: "react-login-lobby",
  storageBucket: "react-login-lobby.appspot.com",
  messagingSenderId: "608399141231",
  appId: "1:608399141231:web:4ddb92422245d372c1209a",
  measurementId: "G-Y152HN0XKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  db,
  storage
}