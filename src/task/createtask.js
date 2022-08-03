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
import handleSubmit from "./handlesubmit";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import EmployeeDataService from "../employeeserver";
import { useAuth } from "../useAuth";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

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

export default function CreateTask() {
  const [employees, setEmployees] = useState([]);
  const theme = useTheme();
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
    let employerreturned = result.name;
    getEmployees(employerreturned);
  };
  useEffect(() => {
    if (user) {
      FindUserType(user.email);
    }
  }, []);

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

  const names = employees.map(function(employee) {
    return employee.name;
  });
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const getEmployees = async (employer) => {
    let calltask = "/getAllEmployeeSalary/?";
    calltask = calltask + "employerName=" + employer;
    let callresult = await (await fetch(calltask)).json();
    console.log(callresult.body);
    setEmployees(callresult.body);
  };
  const [personName, setPersonName] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = useState();
  const [people, setPeople] = useState();
  const [description, setDescription] = useState();
  const [employer, setEmployer] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Add New Task
          </Typography>
          <Typography variant="body2">
            <Button variant="outlined" onClick={handleClickOpen}>
              New Task
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
                Create a New Task
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
                  {console.log(employees)}
                  <FormControl
                    required
                    fullwidth
                    sx={{
                      ml: 0,
                      mt: 2,
                      width: 568,
                    }}
                  >
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
                      {names.length != 0 ? (
                        names.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))
                      ) : (
                        <div>loading...</div>
                      )}
                    </Select>
                  </FormControl>
                  {console.log(personName)}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    console.log(personName);
                    console.log(task);
                    personName.length == 0 ||
                    task === undefined ||
                    description === undefined ||
                    employername === undefined
                      ? alert("please complete all required fields")
                      : handleSubmit(
                          task,
                          description,
                          employername,
                          personName
                        );
                    handleClose();
                  }}
                >
                  Create Task
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
