import {initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAc1xaH2N8HepfCKeMOgtzpmUuxvTWnSho",
    authDomain: "crud-initial-practice.firebaseapp.com",
    projectId: "crud-initial-practice",
    storageBucket: "crud-initial-practice.appspot.com",
    messagingSenderId: "503696763955",
    appId: "1:503696763955:web:e72869bacb46d685ccc746",
    measurementId: "G-PSL5L33KC2"
  };

  export const app = initializeApp(firebaseConfig)
  export const storage = getStorage(app)