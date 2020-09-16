import * as firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZYjwxYcX9ndPsAUCVJrcRTs8SN7IidFI",
  authDomain: "campy-810fc.firebaseapp.com",
  databaseURL: "https://campy-810fc.firebaseio.com",
  projectId: "campy-810fc",
  storageBucket: "campy-810fc.appspot.com",
  messagingSenderId: "693403754728",
  appId: "1:693403754728:web:9198c8e4058bdc4742a95d"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
