import axios from "./axios";
import swal from "sweetalert";
import { TaskDetails } from "../Models/model";

const adddeletetask = async (task:TaskDetails) => {
  try {
    const res = await axios.post("/deletedtasks", task);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const deletetask = async (id:String) => {
  try {
    const res = await axios.delete(`/tasks/${id}`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (task:TaskDetails) => {
  swal({
    title: `Delete ${task.taskname}`,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      adddeletetask(task);
      deletetask(task.id);
      window.location.reload();
    }
  });
};

export const editTask = async (id:String, newtask:TaskDetails) => {
  try {
    const res = await axios.put(`/tasks/${id}`, newtask);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async (task:TaskDetails) => {
  try {
    const res = await axios.post("/tasks", task);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
