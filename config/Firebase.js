import Firebase from 'firebase';

let firebaseConfig = {
   


/*         apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: "" */

        apiKey: "AIzaSyCF8_-IBmj_NKnmdmt-lrMG2x-8DaUBfHs",
        authDomain: "kitchensense-c5854.firebaseapp.com",
        databaseURL: "https://kitchensense-c5854-default-rtdb.firebaseio.com",
        projectId: "kitchensense-c5854",
        storageBucket: "kitchensense-c5854.appspot.com",
        messagingSenderId: "788060667660",
        appId: "1:788060667660:web:39c1c62d1fb26081e29329",
        measurementId: "G-V2Q3F3MWRP"

      
};
// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database()
export const auth = app.auth()
export const storage = app.storage()
export const firestore = app.firestore()
