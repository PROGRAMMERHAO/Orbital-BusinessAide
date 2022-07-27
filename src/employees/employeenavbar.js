import { Component } from "react";
import { useAuth } from "../useAuth";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Welcome from "../Welcome";
import { useState, useEffect } from "react";
import Employeesingletask from "./employeesingletask";
import Employeetasklist from "./employeedisplaytask";
import EmployeeWelcome from "./employeewelcome";
import Salary from "./salary";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function EmployeeBar(props) {
  console.log(props.name);
  const refreshPage = () => {
    window.location.reload();
  };
  const { signOutWithGoogle } = useAuth();
  const auth = getAuth();
  const [employeeId, setEmployeeId] = useState("");
  const [username, setUsername] = useState();
  const FindUserType = async (email) => {
    let call = "/findUserType/?";
    call = call + "email=" + email;
    let result = await (await fetch(call)).json();
    console.log(result);
    //setUsertype(result.body);
    //setUsername(result.name);
    setUsername(result.name);
  };

  const getEmployeeIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setEmployeeId(id);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                BusinessAide
              </Link>
            </Typography>
            <Button>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/employees/salary"
              >
                Payroll
              </Link>
            </Button>
            <Button>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/employees/employeedisplaytask"
              >
                View Tasks
              </Link>
            </Button>
            <Button onClick={signOutWithGoogle} color="inherit">
              sign out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<EmployeeWelcome />} />
        <Route
          path="/employees/employeedisplaytask"
          element={<Employeetasklist />}
        />
        <Route
          path="/employees/employeesingletask"
          element={<Employeesingletask />}
        />
        <Route
          path="/employees/salary"
          element={<Salary name={props.name} />}
        />
      </Routes>
    </div>
  );
}

export default EmployeeBar;
