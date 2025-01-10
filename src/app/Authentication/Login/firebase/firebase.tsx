import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

if (!process.env.FIREBASE_SERCRET) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEYがありません。');
}

const firebaseConfig = JSON.parse(process.env.FIREBASE_SERCRET)


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)