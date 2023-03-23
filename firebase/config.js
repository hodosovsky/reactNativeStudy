import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNgZXvkGuCrs31HqCzFdIggH614Bu2bIY",
  authDomain: "reactnative-28542.firebaseapp.com",
  projectId: "reactnative-28542",
  storageBucket: "reactnative-28542.appspot.com",
  messagingSenderId: "673341923462",
  appId: "1:673341923462:web:3b74e8ba66d7858806f107",
  measurementId: "G-493XMP8THL",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
