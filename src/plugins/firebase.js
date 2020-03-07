import firebase from "firebase/app/dist/index.cjs";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCB3IzZfVwDaYE_KjIYxsWzRtrsUmjmtQ4",
  authDomain: "sekda-app.firebaseapp.com",
  databaseURL: "https://sekda-app.firebaseio.com",
  projectId: "sekda-app",
  storageBucket: "sekda-app.appspot.com"
};

const app = firebase.initializeApp(config);

const { Timestamp } = firebase.firestore;
export { Timestamp };

export const db = app.firestore();
export const st = app.storage();
export const auth = app.auth();
