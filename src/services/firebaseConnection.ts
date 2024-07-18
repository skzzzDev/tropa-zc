import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv3e3o5HCdQoNEjGZyH_RXZuDfVLiqYAE",
  authDomain: "dashboard-zc.firebaseapp.com",
  projectId: "dashboard-zc",
  storageBucket: "dashboard-zc.appspot.com",
  messagingSenderId: "818601941117",
  appId: "1:818601941117:web:75144724e01dc080303914"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }