import "./App.css";
import { useAuth } from "./useAuth";
import Home from "./display";
import ButtonAppBar from "./NavBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/employee.feature";
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
import userEvent from "@testing-library/user-event";

//import HomePage from "./components/signin/mainpage";

export default function App() {
  useEffect(() => {}, []);
  const { user } = useAuth();
  if (user) {
    console.log(user.email);
  } else {
  }
  return <div className="App">{user ? <Home /> : <ButtonAppBar />}</div>;
}

//(docs&&docs.docs[0].metadata._document.data.value.mapValue.fields.position.stringValue==="employee"? <div>hello</div>:
