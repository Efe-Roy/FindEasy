import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxqpP0IGjxd7TWMM4yYqpa87EkKp16eLU",
  authDomain: "easysearch-cce5e.firebaseapp.com",
  projectId: "easysearch-cce5e",
  storageBucket: "easysearch-cce5e.firebasestorage.app",
  messagingSenderId: "499630260855",
  appId: "1:499630260855:web:d9bd787e805070f6ef7c72",
  measurementId: "G-9X14MHWGWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getDatabase(app);

export { auth, db };