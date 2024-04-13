// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
	initializeAuth,
	setPersistence,
	getAuth,
	inMemoryPersistence,
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDwKLq4uTnkITEAmynACs-T37mDcQbC49E",
	authDomain: "prophecybypreeti.firebaseapp.com",
	projectId: "prophecybypreeti",
	storageBucket: "prophecybypreeti.appspot.com",
	messagingSenderId: "588766432659",
	appId: "1:588766432659:web:cf304f8088cbb40759ec66",
	measurementId: "G-E56QGFGBF5",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAnalytics = getAnalytics(FirebaseApp);
export const FirebaseAuth = initializeAuth(FirebaseApp, {
	persistence: getReactNativePersistence(AsyncStorage),
});
