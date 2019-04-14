import firebase from 'firebase';

// flowertaekk
// initialize database
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
}

firebase.initializeApp(config);
export default firebase;