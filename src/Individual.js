import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EmployeeDataService from "./employeeserver";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddLocationIcon from "@mui/icons-material/AddLocation";
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

export default function Individual() {
  const [employees, setEmployees] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getEmployees(id);
  }, [id]);

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
