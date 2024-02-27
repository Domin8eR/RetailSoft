import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { GoogleAuthProvider, getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain: "digilytics-80f52.firebaseapp.com",
  projectId: "digilytics-80f52",
  storageBucket: "digilytics-80f52.appspot.com",
  messagingSenderId: "365028667698",
  appId: "1:365028667698:web:ef9ac5217209ee655be72b"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
