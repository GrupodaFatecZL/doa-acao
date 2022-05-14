// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY_GOOGLE,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  // databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECTID,
  // storageBucket: "doa-acao-homolog.appspot.com",
  messagingSenderId: import.meta.env.VITE_SENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID 
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);