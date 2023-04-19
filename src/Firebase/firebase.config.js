import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDq5fhozbf8yWyGAaRZDphX8Mj1nW-_UMo",
    authDomain: "realtime-collaboration-fdfe6.firebaseapp.com",
    projectId: "realtime-collaboration-fdfe6",
    storageBucket: "realtime-collaboration-fdfe6.appspot.com",
    messagingSenderId: "239071905818",
    appId: "1:239071905818:web:53df9d48370500e98269a3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;