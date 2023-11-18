import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";





const firebaseConfig = {
    apiKey: "AIzaSyCqPUx8DfHjBNn1HUteK7Q9ztMUEYHHyww",
    authDomain: "la-casa-bda03.firebaseapp.com",
    projectId: "la-casa-bda03",
    storageBucket: "la-casa-bda03.appspot.com",
    messagingSenderId: "478032292673",
    appId: "1:478032292673:web:387cf1e4481bee4d7a8fc0",
    measurementId: "G-6KJD3VDPRM"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);