import axios from "./axios";
import swal from "sweetalert";
import { TaskDetails,Tasks } from "../Models/model";




export const getApiData = async()=> {
  const response = await axios.get<TaskDetails[]>("/tasks");
  return response.data;
};

export const getTaskById = async (newtaskid:any) => {
    const res = await axios.get<TaskDetails>(`/tasks?id=${newtaskid}`);
    return res.data;
};

export const getDeletedTasks = async () => {
    const res = await axios.get<TaskDetails[]>(`/deletedtasks`);
    return res.data
};


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
    const res = await axios.put(`/tasks/${id}`, newtask);
    return res.data;
};

export const addTask = async (task:TaskDetails) => {
    const res = await axios.post("/tasks", task);
    return res.data;
};

