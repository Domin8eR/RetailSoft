import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { GoogleAuthProvider, getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain: "retailsoft12.firebaseapp.com",
  projectId: "retailsoft12",
  storageBucket: "retailsoft12.appspot.com",
  messagingSenderId: "182413591384",
  appId: "1:182413591384:web:fb6d8627844f59d9459b2d",
  measurementId: "G-JQ4YB425T5"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
