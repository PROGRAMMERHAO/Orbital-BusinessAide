const subtaskSubmit = async (
  subTaskName,
  subTaskDesc,
  goal,
  mainTaskName,
  employerName,
  workerArray
) => {
  let call = "/createSubTask/?";
  call = call + "subTaskName=" + subTaskName + "&"; // do this for each parameter you want to send
  call = call + "subTaskDesc=" + subTaskDesc + "&";
  call = call + "goal=" + goal + "&";
  call = call + "mainTaskName=" + mainTaskName + "&";
  call = call + "employerName=" + employerName + "&";
  call = call + "workerArray=" + workerArray;
  let result = await (await fetch(call)).json();
  return result;
};
export default subtaskSubmit;
