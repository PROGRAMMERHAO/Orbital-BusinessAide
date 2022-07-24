import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EmployeeDataService from "../employeeserver";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import TextField from "@mui/material/TextField";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CakeIcon from "@mui/icons-material/Cake";
import WorkIcon from "@mui/icons-material/Work";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import PaidIcon from "@mui/icons-material/Paid";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Salary(props) {
  const [employees, setEmployees] = useState([]);

  const [open, setOpen] = React.useState(false);

  let feedback;

  useEffect(() => {
    console.log(props.name);
    getEmployees(props.name);
  }, []);

  const getEmployees = async (id) => {
    const data = await EmployeeDataService.getEmployee(id);
    console.log(
      data._document.data.value.mapValue.fields.firstName.stringValue
    );
    setEmployees(data);
  };

  console.log(employees);

  if (employees.length === 0) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  } else {
    const employeename =
      employees._document.data.value.mapValue.fields.firstName.stringValue +
      " " +
      employees._document.data.value.mapValue.fields.lastName.stringValue;
    console.log(employeename + " hello" + employeename);
    return (
      <div className="list" rowspacing={3}>
        <div
          style={{
            backgroundImage: `url("https://thingscareerrelated.files.wordpress.com/2018/03/lake2b.jpg")`,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/476/476844.png"
            alt=""
            height={200}
            width={200}
          />
          <h1>
            {
              employees._document.data.value.mapValue.fields.firstName
                .stringValue
            }{" "}
            {
              employees._document.data.value.mapValue.fields.lastName
                .stringValue
            }
          </h1>
        </div>
        <div>
          <h3>
            Daily Salary:{" "}
            {
              employees._document.data.value.mapValue.fields.dailySalary
                .stringValue
            }
          </h3>
          <h3>
            Days Attended:{" "}
            {
              employees._document.data.value.mapValue.fields.daysAttended
                .stringValue
            }
          </h3>
          <h3>
            Overtime Hourly Rate:{" "}
            {
              employees._document.data.value.mapValue.fields.overtimeHourlyRate
                .stringValue
            }
          </h3>

          <h3>
            Overtime Hours:{" "}
            {
              employees._document.data.value.mapValue.fields.overtimeHours
                .stringValue
            }
          </h3>
          <h3>
            Salary for the Month:{" "}
            {
              employees._document.data.value.mapValue.fields.overallSalary
                .stringValue
            }
          </h3>
        </div>
      </div>
    );
  }

  //console.log(employees);
}
