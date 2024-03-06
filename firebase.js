// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCus1BhGk85twMcpQqatjUkJJ65vfZuMv0",
  authDomain: "react-native-first-year.firebaseapp.com",
  projectId: "react-native-first-year",
  storageBucket: "react-native-first-year.appspot.com",
  messagingSenderId: "894187003213",
  appId: "1:894187003213:web:97a17203b4db1f3509eb04"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getFirestore(app);
 const storage = getStorage(app);
  export { app, database, storage};