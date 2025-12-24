// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0zNxPUrsHWLrzykP8nR19-WHYs53Glmo",
  authDomain: "fir-appproj-df4bc.firebaseapp.com",
  projectId: "fir-appproj-df4bc",
  storageBucket: "fir-appproj-df4bc.firebasestorage.app",
  messagingSenderId: "576878168848",
  appId: "1:576878168848:web:c7104235ae17189a8cb395"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

export default db;