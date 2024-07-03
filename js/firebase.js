import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB14xUjaJV2gW5HRBRQfLJyLmls4FZAWlE",
    authDomain: "moviehub-99221.firebaseapp.com",
    projectId: "moviehub-99221",
    storageBucket: "moviehub-99221.appspot.com",
    messagingSenderId: "999571231191",
    appId: "1:999571231191:web:0e561eb383f48fed6bfb92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword };
