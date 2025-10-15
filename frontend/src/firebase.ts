import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

console.log('Firebase module loaded, starting initialization...');

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

console.log('Firebase config:', firebaseConfig.projectId);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

try {
  // Initialize Firebase
  console.log('Calling initializeApp...');
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
  
  console.log('Getting auth instance...');
  auth = getAuth(app);
  console.log('Firebase auth initialized successfully');
} catch (error: any) {
  console.error('FIREBASE INITIALIZATION ERROR:', error);
  console.error('Error code:', error.code);
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
}

export { auth };
export default app;