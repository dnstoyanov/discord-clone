import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCRYbzFdP53Ae2C6uuk45kgbfd91q3ZnTc",
  authDomain: "discord-clone-8bab4.firebaseapp.com",
  projectId: "discord-clone-8bab4",
  storageBucket: "discord-clone-8bab4.appspot.com",
  messagingSenderId: "252640955288",
  appId: "1:252640955288:web:ff3041e3d0b4798dd5b9ed",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { database, auth, provider };
