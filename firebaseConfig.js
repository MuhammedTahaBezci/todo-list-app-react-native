// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'



const firebaseConfig = {
  apiKey: "AIzaSyDm5RGqIHRw37meXVDVNANWxn4z0BmtYyA",
  authDomain: "test-app-ccdd0.firebaseapp.com",
  projectId: "test-app-ccdd0",
  storageBucket: "test-app-ccdd0.firebasestorage.app",
  messagingSenderId: "434749546916",
  appId: "1:434749546916:web:63931bf15f634983836131",
  measurementId: "G-F1QE0EG5X0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;