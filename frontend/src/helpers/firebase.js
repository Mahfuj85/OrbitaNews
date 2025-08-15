import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "orbitanews-3fc5c.firebaseapp.com",
  projectId: "orbitanews-3fc5c",
  storageBucket: "orbitanews-3fc5c.firebasestorage.app",
  messagingSenderId: "660215879541",
  appId: "1:660215879541:web:24dfc57fef7d081bed653c",
  measurementId: "G-B70QN7Q7K6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
