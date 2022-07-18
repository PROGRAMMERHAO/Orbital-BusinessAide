import React from "react";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { config as firebaseConfig } from "./config";
export default function Welcome() {
 
  const callFunctionTemplate = async (name) => {
    let call = '/getEmployee/?';
    call = call + 'name=' + name; // do this for each parameter you want to send
    let result = await (await fetch(call)).json()
    console.log(result);
  }
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;
  //const q = query(collection(db, "users"), where("uid", "==", user.uid));
 // const docs = await getDocs(q);
 
 
  //console.log(user.uid);
  return (
    <div>
      <h1>welcome!</h1>
    </div>
  );
}
