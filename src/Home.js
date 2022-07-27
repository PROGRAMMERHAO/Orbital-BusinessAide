import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import SignInUser from "./components/signin/signin.js";
import { Card, List, ListItem, Paper } from "@mui/material";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import SendIcon from "@mui/icons-material/Send";
export default function Home() {
  return (
    <div>
      <h1>Welcome to BusinessAide</h1>
      <ListItem>
        <Card>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <Typography fontFamily={'"Segoe UI"'} variant="h6">
            Please go to Login page to sign in after registration
          </Typography>
        </Card>
      </ListItem>
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
              To register as an employer, please create your secret code and
              advise your employees to key in the same secret code when they
              sign up
            </Typography>
          </Card>
        </ListItem>
        <ListItem>
          <Card>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <Typography fontFamily={'"Segoe UI"'} variant="h6">
              To register as an employee, please key in the secret code your
              employer gives you
            </Typography>
          </Card>
        </ListItem>
      </List>
    </div>
  );
}
