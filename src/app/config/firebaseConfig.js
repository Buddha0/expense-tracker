// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";





const firebaseConfig = {
  apiKey: "AIzaSyB1y302WVLKMt_mPrXLAAOpfy4dolELa1k",
  authDomain: "expense-tracker-85327.firebaseapp.com",
  projectId: "expense-tracker-85327",
  storageBucket: "expense-tracker-85327.appspot.com",
  messagingSenderId: "192216478222",
  appId: "1:192216478222:web:879a19a3c2ba3dde2f425f",
  measurementId: "G-34X5E8WTH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

export{auth,provider,db}
