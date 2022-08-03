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
import { useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
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

export default function CreateFeedback(props) {
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
  const [feedback, setFeedback] = React.useState();

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

  let localerror = -2;

  const [returned, setReturned] = useState(-2);
  const [open, setOpen] = React.useState(false);
  const [anonymousCheck, setAnonymousCheck] = useState(true);
  const handleChange = (event) => {
    setAnonymousCheck(event.target.value);
  };
  const feedbackSubmit = async (
    employeeName,
    employerName,
    feedback,
    anonymousCheck,
    mainTaskName
  ) => {
    let call = "/sendFeedback/?";
    call = call + "employeeName=" + employeeName + "&"; // do this for each parameter you want to send
    call = call + "employerName=" + employerName + "&";
    call = call + "feedback=" + feedback + "&";
    call = call + "anonymousCheck=" + anonymousCheck + "&";
    call = call + "mainTaskName=" + mainTaskName;
    let result = await (await fetch(call)).json();
    alert(result.reason);
    setReturned(result.body);
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
          left: 617,
        }}
      >
        Create Feedback
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create a Feedback
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box component="form" onSubmit noValidate sx={{ mt: 1 }}>
            <TextField
              value={feedback}
              margin="normal"
              required
              fullWidth
              id="feedback"
              label="Feedback"
              name="feedback"
              autoComplete="feedback"
              autoFocus
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Box>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Anonymity
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={anonymousCheck}
              onChange={handleChange}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Anonymous"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Non-anonymous"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              feedback === undefined ||
              anonymousCheck === undefined ||
              props.employeeName === undefined ||
              props.employerName === [] ||
              props.mainTaskName === undefined
                ? alert("please complete all required fields")
                : feedbackSubmit(
                    props.employeeName,
                    props.employerName,
                    feedback,
                    anonymousCheck,
                    props.mainTaskName
                  );
              //console.log(returned);
              //</DialogActions>returned === -1
              //</BootstrapDialog>? alert("the employee is not found")
              //: console.log("subtask added");
              handleClose();
              console.log(anonymousCheck);
            }}
          >
            Create Feedback
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
