import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

const config = {
 // your firebase config
    apiKey: "AIzaSyBGrTm1aIeiGTb6rynZbRXnwQhFA9AJBHc",
    messagingSenderId: "257370346102",
    projectId:"emailtest-c548a",
    databaseURL:"https://emailtest-c548a.firebaseio.com",
    storageBucket:"emailtest-c548a.appspot.com"
}

firebase.initializeApp(config);

export const app = firebase.app();
export const auth = firebase.auth();
export const functions = firebase.functions();