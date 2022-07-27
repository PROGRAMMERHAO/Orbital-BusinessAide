import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from "react";
import { useAuth } from "../useAuth";
//import subtaskSubmit from "./subtasksubmit";

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

export default function CreateSubtask({
  setIsupdated,
  isUpdated,
  maintask,
  people,
}) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [personName, setPersonName] = React.useState([]);
  const names = people;
  console.log(names);
  const theme = useTheme();
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  function refreshPage() {
    window.location.reload(false);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(personName);
  };
  let localerror = -2;

  const [feedback, setFeedback] = useState(-2);
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = useState();
  const [description, setDescription] = useState();
  const [goal, setGoal] = useState();
  const [employername, setEmployername] = useState();
  const { user } = useAuth();
  const FindUserType = async (email) => {
    let call = "/findUserType/?";
    call = call + "email=" + email;
    let result = await (await fetch(call)).json();
    console.log(result);
    //setUsertype(result.body);
    //setUsername(result.name);
    setEmployername(result.name);
  };

  useEffect(() => {
    if (user) {
      FindUserType(user.email);
    }
  }, []);
  const subtaskSubmit = async (
    subTaskName,
    subTaskDesc,
    goal,
    mainTaskName,
    employerName,
    workerArray
  ) => {
    if (!isUpdated) {
      setIsupdated(true);
    } else {
      setIsupdated(false);
    }
    console.log(workerArray);
    let call = "/createSubTask/?";
    call = call + "subTaskName=" + subTaskName + "&"; // do this for each parameter you want to send
    call = call + "subTaskDesc=" + subTaskDesc + "&";
    call = call + "goal=" + goal + "&";
    call = call + "mainTaskName=" + mainTaskName + "&";
    call = call + "employerName=" + employerName + "&";
    call = call + "workerArray=" + workerArray;
    let result = await (await fetch(call)).json();
    setFeedback(result);
    localerror = result;
  };
  //useEffect(()=>{
  //console.log(props.people)
  //setNames(props.people);
  // },[])
  return (
    <div>
      <span style={{ color: "white" }}> hahahahahahaa </span>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          position: "absolute",
          left: 633,
        }}
      >
        New Subtask
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create a New Subtask
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box component="form" onSubmit noValidate sx={{ mt: 1 }}>
            <TextField
              value={task}
              margin="normal"
              required
              fullWidth
              id="task"
              label="Task Name"
              name="task"
              autoComplete="task"
              autoFocus
              onChange={(e) => setTask(e.target.value)}
            />
            <TextField
              value={description}
              margin="normal"
              required
              fullWidth
              id="description"
              label="Task Description"
              name="description"
              autoComplete="description"
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl required fullwidth sx={{ ml: 0, mt: 2, width: 568 }}>
              <InputLabel id="demo-multiple-name-label">
                Employees Assigned
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.length === 0
                  ? "loading"
                  : names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
            {console.log(personName)}
            <TextField
              InputProps={{
                inputProps: { min: 1 },
              }}
              value={goal}
              type="number"
              margin="normal"
              required
              fullWidth
              name="goal"
              label="Task Goal"
              id="goal"
              onChange={(e) =>
                e.target.value > 0
                  ? setGoal(e.target.value)
                  : alert("please enter a positive integer")
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              task === undefined ||
              description === undefined ||
              goal === undefined ||
              employername === undefined ||
              personName === undefined
                ? alert("please complete all required fields")
                : subtaskSubmit(
                    task,
                    description,
                    goal,
                    maintask,
                    employername,
                    personName
                  );

              console.log(personName);
              console.log(feedback);
              feedback === -1
                ? alert("the employee is not found")
                : console.log("subtask added");
              handleClose();
            }}
          >
            Create Task
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
