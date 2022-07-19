import React from "react";

const handleSubmit = async (taskname, description, employer, people) => {
  if (taskname!=="") {
  let call = "/createMainTask/?";
  call = call + "taskname=" + taskname + "&"; // do this for each parameter you want to send
  call = call + "description=" + description + "&";
  call = call + "employer=" + employer + "&";
  call = call + "people=" + people;
  await (await fetch(call)).json();
} else {
  alert("please enter a taskname")

}}
export default handleSubmit;
