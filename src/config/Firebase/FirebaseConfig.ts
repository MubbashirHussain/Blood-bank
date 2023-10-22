// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRNjXpSt-dnyYiMGSanoqtMSgio4wNNio",
  authDomain: "pakistan-blood-bank-01.firebaseapp.com",
  databaseURL: "https://pakistan-blood-bank-01-default-rtdb.firebaseio.com",
  projectId: "pakistan-blood-bank-01",
  storageBucket: "pakistan-blood-bank-01.appspot.com",
  messagingSenderId: "151934833056",
  appId: "1:151934833056:web:238659f62ddd944eb914c5",
  measurementId: "G-SSEH9DK5Y7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app