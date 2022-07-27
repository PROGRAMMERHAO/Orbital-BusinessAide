import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProgressBar from "./employeeprogressbar";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../useAuth";
var username;
//const [employeeName, setEmployeename] = useState();
//const [employerName, setEmployerName] = useState();
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);
//const { user } = useAuth();
export default function Employeetasklist() {
  window.onload = function() {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState([]);
  const refreshPage = () => {
    window.location.reload();
  };

  var task = [];
  var employer;
  const displayTask = async (email) => {
    let call1 = "/findUserType/?";
    call1 = call1 + "email=" + email;
    let result1 = await (await fetch(call1)).json();
    console.log(result1);
    //setUsertype(result.body);
    //setUsername(result.name);
    username = result1.name;
    //setEmployeename(result1.name);
    let call2 = "/getEmployerName/?";
    call2 = call2 + "employeeName=" + result1.name;
    let result2 = await (await fetch(call2)).json();
    employer = result2.employerName;
    console.log(employer);
    //setEmployerName(result2);
    let call = "/displayEmployeeTask/?";
    call = call + "employeeName=" + result1.name;
    let result = await (await fetch(call)).json();
    for (let i = 0; i < result.body.length; i++) {
      task[i] = result.body[i];
      setTasks((tasks) => [...tasks, result.body[i]]);

      //try {mainTaskProgress(task[i], "adam jerry" )
      //} catch (err) {
      //console.error(err)
    }
    for (let i = 0; i < task.length; i++) {
      let calltask = "/mainTaskProgress/?";
      calltask = calltask + "tasks=" + task[i] + "&";
      calltask = calltask + "employerName=" + result2.employerName;
      let resulttask = await (await fetch(calltask)).json();
      setProgress((progress) => [...progress, resulttask.body]);
    }
    console.log(progress);
  };
  /* const mainTaskProgress = async (mainTaskName, employerName) => {
    let call = "/mainTaskProgress/?";
    call = call + "mainTaskName=" + mainTaskName + "&";
    call = call + "employerName=" + employerName;
    let  result = await (await fetch(call)).json();
    setProgress((progress) => [...progress, result]);
  };
 */

  useEffect(() => {
    if (user) {
      displayTask(user.email);
    }
  }, []);

  //useEffect(() => {
  //console.log(task.length);
  //for (let i = 0; i < task.length; i++) {
  // mainTaskProgress("Cook Lunch", "adam jerry");
  //}
  //}, []);

  //useEffect(()=>{
  // console.log(tasks);

  //}, [tasks]);

  useEffect(() => {
    console.log(tasks);
    console.log(progress);
  }, [tasks]);

  return tasks === [] ? (
    <div>loading...</div>
  ) : (
    <div>
      <h1>Task Page</h1>

      <Grid
        container
        rowSpacing={20}
        columns={12}
        columnSpacing={{ xs: 2, sm: 2, md: 3 }}
      >
        {tasks === [] ? (
          <h2>loading...</h2>
        ) : (
          tasks.map((doc, index) => {
            return (
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 20 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Current Task
                    </Typography>
                    <Typography variant="h5" component="div">
                      {doc ? doc : "loading"}
                    </Typography>
                    <Typography variant="body2">
                      {progress[index] ? (
                        <ProgressBar
                          bgcolor={"#6a1b9a"}
                          completed={Math.round((progress[index] / 1) * 100)}
                        />
                      ) : (
                        <ProgressBar bgcolor={"#6a1b9a"} completed={0} />
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      to="/employees/employeesingletask"
                      state={doc}
                      style={{ textDecoration: "none", color: "blue" }}
                    >
                      View Task
                    </Link>
                    <span style={{ color: "white" }}>hahahaha</span>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}
