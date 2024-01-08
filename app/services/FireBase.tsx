// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOFG8MfgPQ8kjnbPkvemdXjvv9lhBamsw",
  authDomain: "evpro-e5806.firebaseapp.com",
  projectId: "evpro-e5806",
  storageBucket: "evpro-e5806.appspot.com",
  messagingSenderId: "850567253455",
  appId: "1:850567253455:web:bb5932f83d90011bc796ba",
  measurementId: "G-98QNM97QC0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);