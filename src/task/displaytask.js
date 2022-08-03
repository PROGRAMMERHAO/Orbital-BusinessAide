import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProgressBar from "./progressbar";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Link } from "react-router-dom";
import CreateTask from "./createtask";
import CreateSubtask from "./createsubtask";
import TaskDataService from "./taskserver";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../useAuth";


const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

export default function OutlinedCard() {
  window.onload = function() {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };

  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState([]);
  const refreshPage = () => {
    window.location.reload();
  };
  var username;
  var task = [];

  const { user } = useAuth();
  const [employerName, setEmployername] = useState();
  const [errormessage, setErrormessage] = useState();
  const FindUserType = async (email) => {
    let call = "/findUserType/?";
    call = call + "email=" + email;
    let result = await (await fetch(call)).json();
    console.log(result);
    //setUsertype(result.body);
    //setUsername(result.name);
    username = result.name;
    setEmployername(result.name);
    let call2 = "/displayTask/?";
    call2 = call2 + "employerName=" + username;
    let result2 = await (await fetch(call2)).json();
    console.log(result2);
    if (result2.status == "empty") {
      setErrormessage("There are no tasks");
    }
    for (let i = 0; i < result2.body.length; i++) {
      task[i] = result2.body[i];
      setTasks((tasks) => [...tasks, result2.body[i]]);

      //try {mainTaskProgress(task[i], "adam jerry" )
      //} catch (err) {
      //console.error(err)
    }
    for (let i = 0; i < task.length; i++) {
      let calltask = "/mainTaskProgress/?";
      calltask = calltask + "tasks=" + task[i] + "&";
      calltask = calltask + "employerName=" + username;
      let resulttask = await (await fetch(calltask)).json();
      setProgress((progress) => [...progress, resulttask.body]);
    }
    console.log(progress);
  };

  const displayTask = async (employerName) => {
    let call = "/displayTask/?";
    call = call + "employerName=" + employerName;
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
      calltask = calltask + "employerName=" + employerName;
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
      FindUserType(user.email);
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

  /*if (tasks.length === 0) {
    return <div>loading...</div>;
  }*/
  return errormessage ? (
    <h1>{errormessage}</h1>
  ) : tasks.length == 0 ? (
    <div>loading...</div>
  ) : (
    <div>
      <h1>Task Page</h1>
      <Grid
        container
        rowSpacing={20}
        columns={12}
        columnSpacing={{
          xs: 2,
          sm: 2,
          md: 3,
        }}
      >
        {tasks.map((doc, index) => {
          return (
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: 20,
                    }}
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
                    to="/task/singletask"
                    state={doc}
                    style={{
                      textDecoration: "none",
                      color: "blue",
                    }}
                  >
                    View Task
                  </Link>
                  <span
                    style={{
                      color: "white",
                    }}
                  >
                    hahahaha
                  </span>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
