import firebase from 'firebase';

// flowertaekk.dev
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