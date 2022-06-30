import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { db } from "./firebaseini";
import { useState } from "react";
import Cards from "./cards";
import { Routes, Route } from "react-router-dom";
import EmployeeDataService from "./employeeserver";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const employeeCollectionRef = collection(db, "Employees");
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EmployeesList = ({ getEmployeeId }) => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const data = await EmployeeDataService.getALLEmployee();
    console.log(data.docs);
    setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  /* 
  const deleteHandler = async (id) => {
    await deleteEmployee(id);
    getEmployees();
  }; */

  return (
    /*   {namecards.map(({ id, data: { Firstname, Lastname, TeamLeader } }) => (
        <Cards
          key={id}
          Firstname={Firstname}
          Lastname={Lastname}
          TeamLeader={TeamLeader}
        />
      ))} */
    <div>
      <Grid
        container
        rowSpacing={1}
        columns={12}
        columnSpacing={{ xs: 2, sm: 2, md: 3 }}
      >
        {employees.map((doc, index) => {
          console.log(doc);
          return (
            <Grid item xs={3} key={doc.id}>
              <Link
                to={"/Individual/" + doc.id}
                style={{ textDecoration: "none", color: "black" }}
                key={doc.id}
              >
                <Cards
                  key={doc.id}
                  id={doc.id}
                  index={index + 1}
                  Firstname={doc.firstName}
                  Lastname={doc.lastName}
                  employer={doc.employer}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default EmployeesList;
