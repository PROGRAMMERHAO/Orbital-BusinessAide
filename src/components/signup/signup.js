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
  const { registerWithEmailAndPassword } = useAuth();
  const { signInWithGoogle } = useAuth();
  const [fullname, setFullname] = useState("");
  const [username, setName] = useState("");
  const [password, setPassword] = useState(null);
  const [retypepassword, setRetypepassword] = useState(null);
  const dispatch = useDispatch();
  // const register = (e) => {
  // e.preventDefault();
  //if (!username) alert("Please enter name");
  //registerWithEmailAndPassword(fullname, username, password);
  //};
  const register = (e) => {
    e.preventDefault();
    if (!username) {
      return alert("Please enter a full name");
    }

    // Create a new user with Firebase
    registerWithEmailAndPassword(fullname, username, password)
      .then((userAuth) => {
        // Update the newly created user with a display name and a picture
        updateProfile(userAuth.user, {
          displayName: fullname,
        })
          .then(
            // Dispatch the user information for persistence in the redux state
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: fullname,
              })
            )
          )
          .catch((error) => {
            console.log("user not updated");
          });
      })
      .catch((err) => {
        alert(err);
      });
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
          <Box component="form" onSubmit={register} noValidate sx={{ mt: 1 }}>
            <TextField
              value={fullname}
              margin="normal"
              required
              fullWidth
              name="fullname"
              label="Fullname"
              id="fullname"
              autoComplete="fullname"
              onChange={(e) => setFullname(e.target.value)}
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

export default function CreateForm() {
  return <Submit></Submit>;
}
