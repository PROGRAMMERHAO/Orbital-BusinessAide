import { useState } from "react";
import { useAuth } from "../../useAuth";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { login } from "../../redux/employee.feature";
import { useNavigate } from "react-router-dom";

//import { useAuthState } from "react-firebase-hooks/auth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Joi from "joi-browser";
import styled from "styled-components";
const Styles = styled.div`
  background: lavender;
  padding: 20px;
  form {
    background: white;
    border: 1px solid #dedede;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 500px;
    padding: 40px 50px;
  }
  button {
    background-color: #ffffff;

    padding: 10px;
    border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    margin: auto;
    width: 100px;
    height: 50px;
  }
`;

const theme = createTheme();
const Submit = () => {
  const {user} = useAuth();
  const { registerWithEmailAndPassword } = useAuth();
  const { signInWithGoogle } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secretcode, setSecretCode] = useState("");
  const [employer, setEmployer] = useState("");
  const [dob, setDob] = useState("");
  const [workExp, setWorkExp] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [phoneNum,setphoneNum] = useState("");
  const [username, setName] = useState("");
  const [loginerror, setError] = useState("");
  const [password, setPassword] = useState(null);
  const [retypepassword, setRetypepassword] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const register = (e) => {
  // e.preventDefault();
  //if (!username) alert("Please enter name");
  //registerWithEmailAndPassword(fullname, username, password);
  //};
  async function register (event) {

    event.preventDefault();
   
    if (firstName=="") {
      return alert("Please enter a full name");
    }
 
else if (username==="") {
  alert("please enter an email")
}
    else if(password!==retypepassword) {
      alert("passwords do not match")
    }
   
    else{
    // Create a new user with Firebase
    let call = "/SendEmployer/?";
    call = call + "firstName=" + firstName + "&";
    call = call + "lastName=" + lastName + "&";
    call = call + "secretCode=" + secretcode;
   await registerWithEmailAndPassword(firstName+" "+lastName, username, password)
      .then((userAuth) => {
        // Update the newly created user with a display name and a picture
        updateProfile(userAuth.user, {
          displayName: firstName+" "+lastName,
        })
          .then(
            // Dispatch the user information for persistence in the redux state
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: firstName+" "+lastName,
              })
            )
          )
          .catch((error) => {
            console.log(error);
            setError(error);
          });
      })
      .catch((err) => {
        alert(err);
      });
   navigate("/");
      await (await fetch(call)).json();
    
    }
    
  };
    
  
  /* const schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };
  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  }; */
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={(e)=>{register(e);}} noValidate sx={{ mt: 1 }}>
            <TextField
              value={firstName}
              margin="normal"
              required
              fullWidth
              name="firstname"
              label="Firstname"
              id="firstname"
              autoComplete="firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
             <TextField
              value={lastName}
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="Lastname"
              id="lastname"
              autoComplete="lastname"
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              value={username}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
             <TextField
              value={secretcode}
              margin="normal"
              required
              fullWidth
              name="secretcode"
              label="Secretcode"
              id="secretcode"
              onChange={(e) => setSecretCode(e.target.value)}
            />
            <TextField
              value={password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              value={retypepassword}
              margin="normal"
              required
              fullWidth
              name="retypepassword"
              label="Re-enter Password"
              type="password"
              id="retypepassword"
              autoComplete="current-password"
              onChange={(e) => setRetypepassword(e.target.value)}
            />
            <Typography component="h3" variant="h5">
            {loginerror}
          </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              onClick={signInWithGoogle}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In With Google
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default function EmployerSignup() {
  return <Submit></Submit>;
}
