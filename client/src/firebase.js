// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "quizapp-18896.firebaseapp.com",
  projectId: "quizapp-18896",
  storageBucket: "quizapp-18896.firebasestorage.app",
  messagingSenderId: "720886250895",
  appId: "1:720886250895:web:039cfddd47763d89bf1ffa",
  measurementId: "G-T1K01SYLQY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
