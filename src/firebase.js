import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
const config = {
 // your firebase config
    apiKey: "XXXXXXXXX",
    messagingSenderId: "XXXXXXXX",
    projectId:"XXXXXXXX",
    databaseURL:"XXXXXXXX",
    storageBucket:"XXXXXXXX"
}

firebase.initializeApp(config);

export const app = firebase.app();
export const auth = firebase.auth();
export const functions = firebase.functions();
