import "./App.css";
import { useAuth } from "./useAuth";
import Home from "./display";
import ButtonAppBar from "./NavBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/employee.feature";

//import HomePage from "./components/signin/mainpage";

export default function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <Home /> : <ButtonAppBar />}</div>;
}
