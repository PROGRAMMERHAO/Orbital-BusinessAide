import React from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useEffect } from "react";
import { db } from "../firebaseini";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeDataService from "../employeeserver";
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
import {IconButton} from "@mui/material";
import { Box } from "@mui/system";
import PaidIcon from '@mui/icons-material/Paid';
import {TextField} from "@mui/material";
import { Link } from "react-router-dom";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayRemove,
} from "firebase/firestore";
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
const employeeCollectionRef = collection(db, "Employees");
const Showpayroll = (props) => {
  let [employeenames, setEmployeenames] = useState([]);
  const [rate, setRate] = useState(0);
  const [hourly, setHourly] = useState(0);
  const [days, setDays] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [overall, setOverall] = useState(0);

  let feedback;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  let totalsalary = 0;
  const [total, setTotal] = useState(0);
  const handleClick = () => {
    setOpen(!open);
  };
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getEmployees(props.name);
  }, []);
  useEffect(() => {
    console.log(employees);
  }, [employees]);
  const sendPayroll = async (
    dailySalary,
    daysAttended,
    overtimeHourlyRate,
    overtimeHours,
    deductions,
    overallSalary,
    employeeName,
    employerName
  ) => {
    let call = "/sendPayroll/?";
    call = call + "dailySalary=" + dailySalary + "&";
    call = call + "daysAttended=" + daysAttended + "&";
    call = call + "overtimeHourlyRate=" + overtimeHourlyRate + "&";
    call = call + "overtimeHours=" + overtimeHours + "&";
    call = call + "deductions=" + deductions + "&";
    call = call + "overallSalary=" + overallSalary + "&";
    call = call + "employeeName=" + employeeName + "&";
    call = call + "employerName=" + employerName;
    let result = await (await fetch(call)).json();
    feedback = result;
    alert(feedback.reason);
  };
  const getEmployees = async (employerName) => {
    let call = "/getAllEmployeeSalary/?";
    call = call + "employerName=" + employerName + "&";
    let result = await (await fetch(call)).json();
    console.log(result.body);
    setEmployees(
      result.body.map((doc) => ({
        ...doc,
        id: doc.name,
      }))
    );
    setEmployeenames(
      result.body.map((doc) => ({
        ...doc.id,
        id: doc.name,
      }))
    );
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 1600,
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Payroll for the Month
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            employees.length === 0
              ? "loading..."
              : "Total salary for the month: " +
                employees
                  .map((element) => Number(element.overallSalary))
                  .reduce((a, b) => a + b, 0)
          }
        />
      </ListItemButton>
      {employees.length === 0
        ? ""
        : employees.map((doc) => {
            console.log(doc);
            return (
              <Link
                to={"/Individual/" + doc.name}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                key={doc}
              >
                <ListItemButton key={doc.name}>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.name}
                    secondary={"salary for the month: " + doc.overallSalary}
                  />
                </ListItemButton>
              </Link>
            );
          })}
    </List>
  );
};

export default Showpayroll;