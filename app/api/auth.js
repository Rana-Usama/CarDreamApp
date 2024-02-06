import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, signOut, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { db, firebaseAuth } from ".";
import { getCurrentUser, removeCurrentUser, saveCurrentUser } from "../utils/helpers";
import { collection, getDocs, where, query, updateDoc, doc } from "firebase/firestore";

const userRef = db.collection("users").doc();

const auth = getAuth();

export const signUp = async (userData) => {
  const { firstName, lastName, email, password } = userData;
  const { user } = await createUserWithEmailAndPassword(firebaseAuth, email.toLowerCase(), password);

  const userBody = {
    firstName,
    lastName,
    email: email.toLowerCase(),
    id: user.uid,
    createdAt: new Date(),
  };

  await userRef.set(userBody);
  await signIn(email.toLowerCase(), password);
};

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(firebaseAuth, email.toLowerCase(), password);
  await saveUser(email?.toLowerCase());
};

export const signOutUser = async () => {
  await signOut(firebaseAuth);
  await removeCurrentUser();
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email.toLowerCase());
};

export const updateUser = async (userDetails) => {
  const currentUser = await getCurrentUser();

  // let { user } = await signInWithEmailAndPassword(firebaseAuth, currentUser?.email, currentPass)

  // await updateEmail(user, userDetails?.email)

  const docRef = doc(db, "users", currentUser?.docId);
  await updateDoc(docRef, userDetails);
  await saveUser(userDetails?.email.toLowerCase());
};

export const updateUserPassword = async (oldPass, newPass) => {
  const currentUser = await getCurrentUser();

  const { user } = await signInWithEmailAndPassword(firebaseAuth, currentUser?.email.toLowerCase(), oldPass);
  user?.email && (await updatePassword(user, newPass));
};

const saveUser = async (email) => {
  const querySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", email.toLowerCase())));
  const user = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    docId: doc?._key?.path?.segments[6],
  }))[0];

  await saveCurrentUser(user);
};
