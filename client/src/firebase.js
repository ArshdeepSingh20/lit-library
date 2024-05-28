// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "litlibrary-5d9b0.firebaseapp.com",
  projectId: "litlibrary-5d9b0",
  storageBucket: "litlibrary-5d9b0.appspot.com",
  messagingSenderId: "120297035176",
  appId: "1:120297035176:web:1d1287bce67cbad337399d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);