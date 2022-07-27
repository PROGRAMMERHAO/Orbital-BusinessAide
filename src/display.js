import { Component } from "react";
import { useAuth } from "./useAuth";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import SignInUser from "./components/signin/signin.js";
import CreateForm from "./components/signup/employeesignup.js";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import EmployeesList from "./viewemployees";
import Welcome from "./Welcome";
import { useState, useEffect } from "react";
import Individual from "./Individual";
import EmployeeDataService from "./employeeserver";
import OutlinedCard from "./task/displaytask";
import BasicCard from "./task/singletask";
import CreateTask from "./task/createtask";
import Showpayroll from "./payroll/payroll";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Home(props) {
  const refreshPage = () => {
    window.location.reload();
  };
  const { signOutWithGoogle } = useAuth();
  const auth = getAuth();
  const [employeeId, setEmployeeId] = useState("");

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
                to="/payroll/payroll"
              >
                Payroll
              </Link>
            </Button>
            <Button>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/viewemployees"
              >
                Employees
              </Link>
            </Button>
            <Button>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/task/displaytask"
              >
                View Tasks
              </Link>
            </Button>
            <Button>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/task/createtask"
              >
                Add Tasks
              </Link>
            </Button>
            <Button
              onClick={signOutWithGoogle}
              variant="outlined"
              sx={{
                color: "yellow",
                backgroundColor: "orange",
                borderColor: "green",
              }}
            >
              sign out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/viewemployees/*"
          element={<EmployeesList getEmployeeId={getEmployeeIdHandler} />}
        />
        <Route path="/Individual/:id" element={<Individual />} />
        <Route path="/task/displaytask" element={<OutlinedCard />} />
        <Route
          path="/task/singletask"
          element={<BasicCard employName={props.name} />}
        />
        <Route path="/task/createtask" element={<CreateTask />} />
        <Route
          path="/payroll/payroll"
          element={<Showpayroll name={props.name} />}
        />
      </Routes>
    </div>
  );
}

export default Home;

