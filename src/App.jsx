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
import { useState } from "react";

//import HomePage from "./components/signin/mainpage";
import EmployeeBar from "./employees/employeenavbar";
import { Navigate } from "react-router-dom";

export default function App() {
  const FindUserType = async (email) => {
    let call = "/findUserType/?";
    call = call + "email=" + email;
    let result = await (await fetch(call)).json();
    console.log(result);
    setUsertype(result.body);
    setUsername(result.name);
  };

  const { user } = useAuth();
  const [usertype, setUsertype] = useState();
  const [username, setUsername] = useState();
  if (user) {
    console.log(user.email);
    FindUserType(user.email);
  } else {
  }
  return (
    <div className="App">
      {user ? (
        usertype == "employer" ? (
          <Home name={username} />
        ) : (
          <div>
            <EmployeeBar name={username} />
          </div>
        )
      ) : (
        <ButtonAppBar />
      )}
    </div>
  );
}

//(docs&&docs.docs[0].metadata._document.data.value.mapValue.fields.position.stringValue==="employee"? <div>hello</div>:
