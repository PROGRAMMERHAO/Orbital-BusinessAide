// Module of functions to handle all task functions by the employer
var admin = require("firebase-admin");
const db = admin.firestore();

// Function to create the task and send it to the database
// employerName should be in the format: 'firstname lastname'
createMainTask = async (
  mainTaskName,
  mainTaskDesc,
  employerName,
  workerArray
) => {
  let taskData = {
    description: mainTaskDesc,
    workers: workerArray,
    status: "in progress",
  };
  // update employees database to track what they are currently working on
  updateEmployees = async (employerName, workerArray) => {
    for (i = 0; i < workerArray.length; ++i) {
      employeeName = workerArray[i];
      // check if the employee is under that employer, if not return -1
      docRef = db
        .collection("employers")
        .doc(employerName)
        .collection("employees")
        .doc(employeeName);
      docRef.get().then((doc) => {
        if (doc.exists) {
          employeeRef = db.collection("employees").doc(employeeName);
          employeeRef.update({
            currentTask: mainTaskName,
          });
          console.log("employee data updated");
          return 0;
        } else {
          // doc.data() will be undefined in this case
          console.log("There is no employee under that employer!");
          return -1;
        }
      });
    }
  };

  await updateEmployees(employerName, workerArray);

  // send main task to employers > employerName > tasks
  await db
    .collection("employers")
    .doc(employerName)
    .collection("tasks")
    .doc(mainTaskName)
    .set(taskData);
  console.log("main task data created");
};

createSubTask = async (
  subTaskName,
  subTaskDesc,
  goal,
  mainTaskName,
  employerName,
  workerArray
) => {
  let taskData = {
    description: subTaskDesc,
    workers: workerArray,
    goal: goal,
    progress: 0,
    status: "in progress",
  };

  // update employees database to track what they are currently working on
  updateEmployees = async (employerName, workerArray) => {
    for (i = 0; i < workerArray.length; ++i) {
      employeeName = workerArray[i];
      // check if the employee is under that employer, if not return -1
      docRef = db
        .collection("employers")
        .doc(employerName)
        .collection("employees")
        .doc(employeeName);
      docRef.get().then((doc) => {
        if (doc.exists) {
          employeeRef = db.collection("employees").doc(employeeName);
          employeeRef.update({
            currentTask: mainTaskName + " - " + subTaskName,
          });
          console.log("employee data updated");
        } else {
          // doc.data() will be undefined in this case
          console.log("There is no employee under that employer!");
          return -1;
        }
      });
    }
  };

  await updateEmployees(employerName, workerArray);

  db.collection("employers")
    .doc(employerName)
    .collection("tasks")
    .doc(mainTaskName)
    .collection("subtasks")
    .doc(subTaskName)
    .set(taskData);
  console.log("sub task data created");
};

mainTaskProgress = async (mainTaskName, employerName) => {
  // find progress/per goal of all subtasks and then find the %
  // jiayou
  let mainTaskProgress = "0";
  var subTaskProgress = 0;
  var subTaskCounter = 0;
  const snapshot = await db
    .collection("employers")
    .doc(employerName)
    .collection("tasks")
    .doc(mainTaskName)
    .collection("subtasks")
    .get();
  if (snapshot.empty) {
    console.log("no sub tasks found");
    return mainTaskProgress;
  }
  snapshot.forEach((doc) => {
    console.log(doc.data().status);
    if (doc.data().status == "finished") {
      subTaskProgress += 1;
      subTaskCounter += 1;
    } else {
      subTaskProgress += doc.data().progress / doc.data().goal;
      subTaskCounter += 1;
    }
  });
  // console.log(subTaskProgress);
  //console.log(subTaskCounter);
  mainTaskProgress = (subTaskProgress / subTaskCounter).toString();
  if (mainTaskProgress === "0") {
    mainTaskProgress = "0";
  }
  console.log("the progress of the main task is:" + mainTaskProgress);
  return mainTaskProgress;
};

completeMainTask = async (mainTaskName, employerName) => {
  console.log("triggered")
  mainTaskRef = db
    .collection("employers")
    .doc(employerName)
    .collection("tasks")
    .doc(mainTaskName);
  // complete all of the subtasks of the main task
 
  const snapshot = await mainTaskRef.collection("subtasks").get();
  snapshot.forEach((doc) => {
    doc.ref.update({
      status: "finished",
      progress: doc.data().goal
    });
  });

  // complete the main task
  mainTaskRef.update({
    status: "finished",
  });
  console.log("main task completed");
};

completeSubTask = async (subTaskName, mainTaskName, employerName) => {
  subTaskRef = db
    .collection("employers")
    .doc(employerName)
    .collection("tasks")
    .doc(mainTaskName)
    .collection("subtasks")
    .doc(subTaskName);
  const snapshot = await subTaskRef.get();
  subTaskRef.update({
    progress: snapshot.data().goal,
    status: "finished"
    })
  console.log("sub task completed");
};

// Function to increase the progress of a subtask
// If new value >= goal, instantly complete the subtask
// Function to increase the progress of a subtask
// If new value >= goal, instantly complete the subtask
progressSubTask = async(subTaskName, value, mainTaskName, employerName) => {
  subTaskRef = db.collection('employers').doc(employerName).collection('tasks').doc(mainTaskName).collection('subtasks').doc(subTaskName);
// finsih this blyat
  let subTaskProgress = 0;
  let subTaskGoal = 0;
  let doc = await subTaskRef.get();
  subTaskProgress = doc.data().progress;
  subTaskGoal = doc.data().goal;
  let newvalue = Number(value);
  if ((subTaskProgress + newvalue) >= subTaskGoal) {
      subTaskRef.update({
          progress: subTaskGoal,
          status: 'finished'
      });    
  } else {
      subTaskRef.update({
          progress: subTaskProgress + newvalue
      });
  }
  console.log('sub task progressed')
}

module.exports = {createMainTask, createSubTask, completeMainTask, completeSubTask, mainTaskProgress, progressSubTask};