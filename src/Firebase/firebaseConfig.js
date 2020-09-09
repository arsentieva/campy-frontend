import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWmDoFXx_m6V2RLkMBQSwvA17pIaLOhmo",
    authDomain: "campy-c19ce.firebaseapp.com",
    databaseURL: "https://campy-c19ce.firebaseio.com",
    projectId: "campy-c19ce",
    storageBucket: "campy-c19ce.appspot.com",
    messagingSenderId: "90614007418",
    appId: "1:90614007418:web:639dd79182d13144219dc3",
    measurementId: "G-CZ50QS6Z0C"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };