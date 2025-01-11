import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAdknZU-076ySmJvT1C3EBccjtm06v88j0",
  authDomain: "next1-c5784.firebaseapp.com",
  projectId: "next1-c5784",
  storageBucket: "next1-c5784.appspot.com",
  messagingSenderId: "661541000684",
  appId: "1:661541000684:web:5076e8ad5794bab37e1cc9",
  measurementId: "G-3CGF53S9SZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };