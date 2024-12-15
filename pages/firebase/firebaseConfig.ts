import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCihX_s5yvpPWQ9kPSqMErKLsdfkOF9GHc",
    authDomain: "wildlife-332b8.firebaseapp.com",
    projectId: "wildlife-332b8",
    storageBucket: "wildlife-332b8.firebasestorage.app",
    messagingSenderId: "929901258852",
    appId: "1:929901258852:web:42a0d59bebb1deeca5d771",
    measurementId: "G-K3NY1LDS2Q"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
