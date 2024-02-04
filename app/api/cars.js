import { collection, doc, getDocs, updateDoc, where } from "firebase/firestore";
import { db } from ".";
import { query } from "firebase/database";

const carsRef = db.collection("cars");

export const addCar = async (carDetails) => {
  await carsRef.doc().set(carDetails);
};

export const updateCar = async (carDetails) => {
  const docRef = doc(db, "cars", carDetails?.docId);
  await updateDoc(docRef, carDetails);
};

export const fetchAllCars = async () => {
  const querySnapshot = await getDocs(query(collection(db, "cars")));

  if (querySnapshot.empty) return [];

  return querySnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
};
