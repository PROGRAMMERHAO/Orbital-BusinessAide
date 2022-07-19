import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ProgressBar from "./progressbar";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDisplayName } from "@mui/utils";
import handleSubmit from "./handlesubmit";
import { Grid, TextField } from "@mui/material";
import CreateSubtask from "./createsubtask";


const auth = getAuth();
const user = auth.currentUser;

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

export default function BasicCard(props) {
  const [subtasks, setSubTasks] = useState([]);
  let subtasktemp = [];
  const [description, setDescription] = useState([]);
  const [mainworkers, setMainWorkers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [goal, setGoal] = useState([]);
  const [progress, setProgress] = useState([]);
  const [mainprogress, setMainProgress] = useState(0);
  const [localProgress, setLocalProgress] = useState([])
  const [status, setStatus] = useState([]);
  const [mainstatus, setMainStatus] = useState([]);
  const [maindescription, setMainDescription] = useState([]);
  const location = useLocation();
  const maintask = location.state;
  const auth = getAuth();
  const user = auth.currentUser;
  const name = user.fullname;
  var tempprogress = 0;
  var progresstemp= [];
  let temp = 0;
  const [newValue, setnewValue] = useState(0);
  var value = 0;
  console.log(user);
  function refreshPage() {
    window.location.reload(false);
  }
  const mainTaskProgress = async (tasks, employerName) => {
    let call = "/mainTaskProgress/?";
    call = call + "tasks=" + tasks + "&";
    call = call + "employerName=" + employerName;
    let  result = await (await fetch(call)).json();
    setMainProgress(result);
    console.log(mainprogress);
  };
  
 const calculateprogress = (subtasks, status, progress, goal) =>{
  var subTaskProgress = 0;
  var subTaskCounter = 0;
  tempprogress = mainprogress;
 for (let i = 0; i< subtasks.length; i++ ) {
  if (status[i] == "finished") {
      subTaskProgress += 1;
      subTaskCounter += 1;
    } else {
      subTaskProgress +=progress[i] / goal[i];
      subTaskCounter += 1;
    }
  
 }
 tempprogress = (subTaskProgress / subTaskCounter);
  if (tempprogress === 0) {
    tempprogress = 0;
  }
  setMainProgress(tempprogress)
}

  useEffect(() => {
    const viewMainTask = async (mainTaskName, employerName) => {
      let call = "/getMainTaskData/?";
      call = call + "mainTaskName=" + mainTaskName + "&";
      call = call + "employerName=" + employerName;
      let result = await (await fetch(call)).json();
      console.log(result);
      setMainDescription(result.description);
      setMainStatus(result.status);
      setSubTasks(result.subtasks);
      setMainWorkers(result.workers);
      subtasktemp = result.subtasks;
      console.log(subtasktemp)
      for (let i = 0; i < subtasktemp.length; i++) {
      let call = "/getSubTaskData/?";
      call = call + "subTaskName=" + subtasktemp[i] + "&";
      call = call + "mainTaskName=" + maintask + "&";
      call = call + "employerName=" + "adam jerry";
      let result = await (await fetch(call)).json();
      console.log(result);
      //setSubTasks((subtasks) => [...subtasks, result.subTaskName]);
      setDescription((description) => [...description, result.description]);
      setWorkers((workers) => [...workers, result.workers]);
      setGoal((goal) => [...goal, result.goal]);
      setProgress((progress) => [...progress, result.progress]);
      setStatus((status) => [...status, result.status]);
      console.log(subtasks);
      }
    };
  
    viewMainTask(maintask, "adam jerry");
    mainTaskProgress(maintask,"adam jerry")
  }, []);

useEffect (()=> {
  console.log(mainprogress);
},[mainprogress])

  useEffect(() => {
    console.log(goal);
  }, [goal]);

   /*useEffect(() => {
    const viewSubTask = async (subTaskName, mainTaskName, employerName) => {
      let call = "/getSubTaskData/?";
      call = call + "subTaskName=" + subTaskName + "&";
      call = call + "mainTaskName=" + mainTaskName + "&";
      call = call + "employerName=" + employerName;
      let result = await (await fetch(call)).json();
      console.log(result);
      //setSubTasks((subtasks) => [...subtasks, result.subTaskName]);
      setDescription((description) => [...description, result.description]);
      setWorkers((workers) => [...workers, result.workers]);
      setGoal((goal) => [...goal, result.goal]);
      setProgress((progress) => [...progress, result.progress]);
      setStatus((status) => [...status, result.status]);
      
    };
   // for (let i = 0; i < subtasks.length; i++) {
     // viewSubTask(subtasks[i],maintask,"adam jerry")
      
    //}
    //console.log(progress);
    
  }, [maintask, subtasks]);*/

  useEffect(()=>{
    //progresstemp = progress;
    console.log(progress);
  },[progress])
  const subTaskProgress = async (subTaskName, value, mainTaskName, employerName, index) => {
    let call = "/subTaskProgress/?";
    call = call + "subTaskName=" + subTaskName + "&";
    call = call + "value=" + value + "&";
    call = call + "mainTaskName=" + mainTaskName + "&";
    call = call + "employerName=" + employerName;
    await (await fetch(call)).json();
   
    //setProgress(progress[index]+1);
  }

  const completeSubTask = async (subTaskName, mainTaskName, employerName) => {
    let call = "/completeSubTask/?";
    call = call + "subTaskName=" + subTaskName + "&";
    call = call + "mainTaskName=" + mainTaskName + "&";
    call = call + "employerName=" + employerName;
    await (await fetch(call)).json();
  }

  const completeMainTask = async (mainTaskName, employerName) => {
    let call = "/completeMainTask/?";
    call = call + "mainTaskName=" + mainTaskName + "&";
    call = call + "employerName=" + employerName;
    await (await fetch(call)).json();
  }

  
 
 
  //subTaskProgress("hahahah",3, maintask, "adam jerry")
 
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Task Name
        </Typography>
        <Typography variant="h5" component="div">
          {maintask}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Task Description
        </Typography>
        <Typography variant="h5" component="div">
          {maindescription}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Task Status
        </Typography>
        <Typography variant="h5" component="div">
          {mainstatus}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Workers Allocated
        </Typography>
        <Typography variant="h5" component="div">
          {mainworkers.length===0? "loading" : mainworkers.map((worker=>(worker+"  ")))}
          </Typography>
        <ProgressBar bgcolor={"#1976d2"} completed={mainprogress>1?100 : Math.round((mainprogress/1)*100)} />
        <Button onClick={()=>{completeMainTask(maintask, "adam jerry"); refreshPage()}}>Mark as Finished</Button>
        {mainworkers.length===0? <div>loading...</div>:<CreateSubtask maintask = {maintask} people = {mainworkers}/>}
        <div style={{color:"white"}}>hahahah</div>
        <Grid >
          {subtasks.map((task, index) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{task}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div>Task Description: {description[index]}</div>
                    <div>workers allocated: {workers[index]}</div>
                    <div>goal: {goal[index]}</div>
                    
                    <div>
                      {"progress"}
                      <ProgressBar
                        bgcolor={"#6a1b9a"}
                        completed={((progress[index] / goal[index]) * 100>= 100) ? 100 :progress[index]/goal[index]*100}
                      ></ProgressBar>
                    </div>
                    <div>
                    <TextField
              value={Number(newValue)}
  
              type="text" 
              margin="normal"
              required
              fullWidth
            
              label="Increase New Progress by"
              
              
              autoFocus
              onChange={(e) => {setnewValue(e.target.value)}}
            />
           
                    <Button onClick={()=>{setProgress(existingItems => {
                        return [
                        ...existingItems.slice(0, index),
                         existingItems[index]+Number(newValue),
                        ...existingItems.slice(index + 1),
                        ]
                    }); 
                     
                     subTaskProgress(task, newValue, maintask,"adam jerry", index); 
                     progresstemp = progress;
                     progresstemp[index] += Number(newValue); 
                     {if (progresstemp[index]>=goal[index]) {
                     
                      setStatus(existingItems => {
                      return [
                      ...existingItems.slice(0, index),
                        "finished",
                      ...existingItems.slice(index + 1),
                      ]
                    });
                   
                      
                  }}
                     calculateprogress(subtasks, status, progresstemp, goal);
                     setMainProgress(tempprogress);
                     console.log(tempprogress);
                    // mainTaskProgress(maintask, "adam jerry")
                    }}>Increase Progress</Button>
                    </div>
                    <div>status: {status[index]}</div>
                  </Typography>
                  <Button onClick={()=>{completeSubTask(task, maintask, "adam jerry");completeMainTask(maintask, "adam jerry"); refreshPage(); refreshPage();
                setStatus(existingItems => {
                      return [
                      ...existingItems.slice(0, index),
                        "finished",
                      ...existingItems.slice(index + 1),
                      ]})}}>Mark as Finished</Button>
                </AccordionDetails>
              </Accordion>
            );
          })}
          
        </Grid>
        
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}