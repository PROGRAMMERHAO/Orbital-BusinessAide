import { db } from "../firebaseini";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const taskCollectionRef = collection(db, "employers/adam jerry/tasks");
class TaskDataService {
  addTask = (newTask) => {
    return addDoc(taskCollectionRef, newTask);
  };

  deleteTask = (id) => {
    const employeeDoc = doc(db, "employers", id);
    return deleteDoc(employeeDoc);
  };

  getALLTask = () => {
    return getDocs(taskCollectionRef);
  };

  printRef = () => {
    return taskCollectionRef;
  };

  getTask = (id) => {
    const EmployeeDoc = doc(db, "employers", id);
    return getDoc(EmployeeDoc);
  };
}

export default new TaskDataService();
