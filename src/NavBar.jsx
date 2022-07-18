import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import SignInUser from "./components/signin/signin.js";
import CreateForm from "./components/signup/employeesignup.js";
import Home from "./Home.js";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavBar.css";
import EmployerSignup from "./components/signup/employersignup.js";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              BusinessAide
            </Link>
          </Typography>
          <Button color="inherit"></Button>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="components/signup/employersignup"
            >
              Employer Signup
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="components/signup/employeesignup"
            >
              Employee Signup
            </Link>
          </Button>
          <Button color="inherit">
            {" "}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="components/signin/signin"
            >
              Signin
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      
      <Routes>
        <Route path="/components/signup/employersignup" element={<EmployerSignup/>}/>
        <Route path="/" element={<Home />} />
        <Route path="components/signup/employeesignup" element={<CreateForm />} />
        <Route path="components/signin/signin" element={<SignInUser />} />
      </Routes>
    </Box>
  );
}
