import React from "react";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Card, List, ListItem, Paper } from "@mui/material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SendIcon from "@mui/icons-material/Send";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@mui/material";

export default function EmployeeWelcome() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  const auth = getAuth();
  const user = auth.currentUser;
  //const q = query(collection(db, "users"), where("uid", "==", user.uid));
  // const docs = await getDocs(q);
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
  useEffect(() => {
    FindUserType(user.email);
  }, []);
  //console.log(user.uid);
  return username ? (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Welcome {username}!</h1>
        <List>
          <ListItem>
            <Card>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography
                sx={{
                  fontFamily: '"Segoe UI"',
                }}
                variant="h6"
              >
                To view, please go to the "payroll" page
              </Typography>
            </Card>
          </ListItem>
          <ListItem>
            <Card>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography fontFamily={'"Segoe UI"'} variant="h6">
                To view each individual task, please to go to "view task" page
                and click on each of the task
              </Typography>
            </Card>
          </ListItem>
          <ListItem>
            <Card>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography fontFamily={'"Segoe UI"'} variant="h6">
                To increase the task progress, enter a number and click on
                "increase progress by"
              </Typography>
            </Card>
          </ListItem>
          <ListItem>
            <Card>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <Typography fontFamily={'"Segoe UI"'} variant="h6">
                To complete a main task/subtask, click on "mark as complete
                under the task"
              </Typography>
            </Card>
          </ListItem>
        </List>
      </div>
    </ThemeProvider>
  ) : (
    <div>loading...</div>
  );
}
