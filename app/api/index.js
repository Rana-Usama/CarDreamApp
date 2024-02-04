import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import "firebase/compat/firestore";

import firebaseConfig from "../config/firebase";

let app;

if (firebase.apps.length === 0) app = firebase.initializeApp(firebaseConfig);
else app = firebase.app();

initializeFirestore(app, { useFetchStraems: false, experimentalForceLongPolling: true });

const firebaseAuth = getAuth(app);
const firebaseDatabase = getDatabase(app);
const firebaseFirestore = getFirestore(app);
const db = app.firestore();
const storage = getStorage(app);

export { firebaseAuth, firebaseDatabase, firebaseFirestore, firebase, db, storage };
