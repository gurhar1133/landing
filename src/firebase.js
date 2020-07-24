import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
const config = {
 // your firebase config
    apiKey: "XXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXX",
    projectId:"XXXXXXXXXXX",
    databaseURL:"XXXXXXXXXXX",
    storageBucket:"XXXXXXXXXXX"
}

firebase.initializeApp(config);

export const app = firebase.app();
export const auth = firebase.auth();
export const functions = firebase.functions();