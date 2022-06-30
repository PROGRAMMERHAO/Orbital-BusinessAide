// Functions to send data to firestore
var admin = require("firebase-admin");
const db = admin.firestore();
var sc = require("./secret-code"); // secret code prefix

sendEmployer = (firstName, lastName, secretCode) => {
  // Send employer data on registration
  const userData = {
    firstName: firstName,
    lastName: lastName,
    secretcode: secretCode,
  };
  db.collection("employers")
    .doc(firstName + " " + lastName)
    .set(userData);
  console.log("Employer data sent!");
};

// send employee data on registration and check to see if secret code is valid
// returns -1 if not valid
sendEmployee = async (
  firstName,
  lastName,
  secretCode,
  dob,
  workExp,
  location,
  title,
  phoneNum
) => {
  var employer = await sc.findEmployer(secretCode);
  if (employer == -1) {
    console.log("No employer found, double check spelling");
    return -1;
  }

  assign = async (
    firstName,
    lastName,
    secretCode,
    employer,
    dob,
    workExp,
    location,
    title,
    phoneNum
  ) => {
    var employeeData = {
      firstName: firstName,
      lastName: lastName,
      secretcode: secretCode,
      employer: employer,
      dob: dob,
      workExp: workExp,
      location: location,
      title: title,
      phoneNum: phoneNum,
    };
    return employeeData;
  };
  assign(
    firstName,
    lastName,
    secretCode,
    employer,
    dob,
    workExp,
    location,
    title,
    phoneNum
  )
    .then((employeeData) => {
      db.collection("employees")
        .doc(firstName + " " + lastName)
        .set(employeeData);
      db.collection("employers")
        .doc(employer)
        .collection("employees")
        .doc(firstName + " " + lastName)
        .set(employeeData);
    })
    .then(() => {
      console.log("Employee data sent!");
    });
};

tempSendEmployee = (firstName, lastName, teamLeader) => {
  const tempData = {
    Firstname: firstName,
    Lastname: lastName,
    TeamLeader: teamLeader,
  };
  db.collection("Employees")
    .doc(firstName + lastName)
    .set(tempData);
  console.log("Employee data sent!");
};
module.exports = { sendEmployer, sendEmployee, tempSendEmployee };
