import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

console.log('Initializing Firebase...');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwDWMDUlKvdMlSYyYh5HypNp38a984rko",
  authDomain: "interndocs-todo-project.firebaseapp.com",
  projectId: "interndocs-todo-project",
  storageBucket: "interndocs-todo-project.firebasestorage.app",
  messagingSenderId: "799949711751",
  appId: "1:799949711751:web:e5b43d904b733954640b22",
  measurementId: "G-VB0S2R885R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized');

export const auth = getAuth(app);
console.log('Firebase auth initialized');

export default app;