import firebase from "firebase/app/dist/index.cjs";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "yourapikey123",
  authDomain: "yourauthdomain.firebaseapp.com",
  databaseURL: "https://databaseurl.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-storage.appspot.com"
};

const app = firebase.initializeApp(config);

const { Timestamp } = firebase.firestore;
export { Timestamp };

export const db = app.firestore();
export const st = app.storage();
export const auth = app.auth();
