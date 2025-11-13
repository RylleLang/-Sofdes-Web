// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLgpyBtIyUi-ybVMl05B0zakCUlVqPCjc",
  authDomain: "lulan-web-app-dashboard.firebaseapp.com",
  projectId: "lulan-web-app-dashboard",
  storageBucket: "lulan-web-app-dashboard.firebasestorage.app",
  messagingSenderId: "760333405255",
  appId: "1:760333405255:web:fce411c4a36d256807f562",
  measurementId: "G-H8GKN21413",
  databaseURL: "https://lulan-web-app-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);