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
import subtaskSubmit from "./subtasksubmit";

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

export default function CreateSubtask(props) {
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = useState();
  const [people, setPeople] = useState([]);
  const [description, setDescription] = useState();
  const [employer, setEmployer] = useState();
  const [goal, setGoal] = useState();
  const maintask = props.maintask;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span style={{ color: "white" }}> hahahahahahaa </span>
      <Button variant="outlined" onClick={handleClickOpen}>
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
            <TextField
              value={employer}
              margin="normal"
              required
              fullWidth
              id="employer"
              label="Employer's Name"
              name="employer"
              autoComplete="employer"
              autoFocus
              onChange={(e) => setEmployer(e.target.value)}
            />
            <TextField
              value={people}
              margin="normal"
              required
              fullWidth
              name="people"
              label="People Assigned"
              id="people"
              onChange={(e) => setPeople(e.target.value)}
            />
            <TextField
              value={goal}
              margin="normal"
              required
              fullWidth
              name="goal"
              label="Task Goal"
              id="goal"
              onChange={(e) => setGoal(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              subtaskSubmit(
                task,
                description,
                goal,
                maintask,
                employer,
                people
              );
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
