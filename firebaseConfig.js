// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaghwIjZe-wLOLTP0jpyxE2z9F2o7pPpc",
  authDomain: "kartcentral-988ef.firebaseapp.com",
  projectId: "kartcentral-988ef",
  storageBucket: "kartcentral-988ef.firebasestorage.app",
  messagingSenderId: "362773632456",
  appId: "1:362773632456:web:635a4ec2df5e909fcbdcfd",
  measurementId: "G-M2NMYNDQNZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;