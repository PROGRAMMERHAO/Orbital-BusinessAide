import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EmployeeDataService from "./employeeserver";
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
import {IconButton} from "@mui/material";
import { Box } from "@mui/system";
import PaidIcon from '@mui/icons-material/Paid';


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

export default function Individual() {
  const [employees, setEmployees] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [rate, setRate] = useState(0);
  const [hourly, setHourly] = useState(0);
  const [days, setDays] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [overall, setOverall] = useState(0);
  let feedback;
  

  useEffect(() => {
    getEmployees(id);
  }, [id]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const sendPayroll = async (dailySalary, daysAttended, overtimeHourlyRate, overtimeHours, deductions, overallSalary, employeeName, employerName) => {
    let call = "/sendPayroll/?";
    call = call + "dailySalary=" + dailySalary + "&";
    call = call + "daysAttended=" + daysAttended + "&";
    call = call + "overtimeHourlyRate=" + overtimeHourlyRate + "&";
    call = call + "overtimeHours=" + overtimeHours + "&";
    call = call + "deductions=" + deductions + "&";
    call = call + "overallSalary=" + overallSalary + "&";
    call = call + "employeeName=" +  employeeName + "&";
    call = call + "employerName=" + employerName;
    let  result = await (await fetch(call)).json();
    feedback = result;
    alert(feedback.reason);
  };

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
    const employeename = employees._document.data.value.mapValue.fields.firstName.stringValue+" "+employees._document.data.value.mapValue.fields.lastName.stringValue
    console.log(employeename+" hello"+employeename);
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
            <AddIcCallIcon></AddIcCallIcon> Phone number:{" "}
            {
              employees._document.data.value.mapValue.fields.phoneNum
                .stringValue
            }
          </h3>
          <h3>
            <AddLocationIcon></AddLocationIcon> Location:{" "}
            {
              employees._document.data.value.mapValue.fields.location
                .stringValue
            }
          </h3>
          <h3>
            <CakeIcon></CakeIcon> Date of Birth:{" "}
            {employees._document.data.value.mapValue.fields.dob.stringValue}
          </h3>
          <h3>
            <WorkIcon></WorkIcon> Work Experience:{" "}
            {employees._document.data.value.mapValue.fields.workExp.stringValue}
          </h3>
          <h3>
            <PaidIcon></PaidIcon> Salary for the Month:{" "}
            {overall}
          </h3>
          <Button variant="outlined" onClick={handleClickOpen}>add new payroll</Button> 
          <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add a Payroll
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box component="form" onSubmit noValidate sx={{ mt: 1 }}>
            <TextField
              value={rate}
              margin="normal"
              required
              fullWidth
              id="rate"
              label="Daily Salary"
              name="rate"
              autoComplete="rate"
              autoFocus
              onChange={(e) => {setRate(Number(e.target.value)); setOverall(e.target.value*days+overtime-deductions)}}
            />
             
            <TextField
              value={days}
              margin="normal"
              required
              fullWidth
              id="days"
              label="Number of Days Attended"
              name="days"
              autoComplete="days"
              autoFocus
              onChange={(e) => {setDays(Number(e.target.value));setOverall(rate*e.target.value+overtime*hourly-deductions)}}
            />
            <TextField
              value={hourly}
              margin="normal"
              required
              fullWidth
              id="hourly"
              label="Hourly Salary for Overtime"
              name="hourly"
              autoComplete="hourly"
              autoFocus
              onChange={(e) => {setHourly(Number(e.target.value)); setOverall(rate*days+overtime*e.target.value-deductions)}}
            />
            <TextField
              value={overtime}
              margin="normal"
              required
              fullWidth
              id="overtime"
              label="Overtime Hours"
              name="overtime"
              autoComplete="overtime"
              autoFocus
              onChange={(e) => {setOvertime(Number(e.target.value));setOverall(rate*days+Number(e.target.value)*hourly-deductions)}}
            />
            <TextField
              value={deductions}
              margin="normal"
              required
              fullWidth
              name="deductions"
              label="Deductions"
              id="deductions"
              onChange={(e) => {setDeductions(Number(e.target.value));setOverall(rate*days+overtime*hourly-e.target.value)}}
            />
           <h3>The overall monthly salary is: {overall}</h3>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{sendPayroll(rate,days,hourly,overtime,deductions,overall,employeename,"adam jerry")
          ; handleClose();
          }}
          >
            SUBMIT
          </Button>
        </DialogActions>
      </BootstrapDialog>   
        </div>
      </div>
    );
  }

  //console.log(employees);
}

/*const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const Employees = state.firestore.data.Employees;
  const employee = Employees[id];
  return { employee: employee };
};*/

/*export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Employees" }])
)(Individual);*/
