import { useForm } from "../hooks/useForm";
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import { editTask, addTask } from "../service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../service/axios";
import "./form.css";
import { task } from "../hooks/useForm";

interface CreateTaskProps {
  taskid: String
  toggleClass: () => void
}

const CreateTask:React.FC<CreateTaskProps> = ({ taskid, toggleClass }) => {
  const notify = () =>
    toast("Task Added successfully!", {
      position: "bottom-left",
      autoClose: 5000,
      theme: "dark",
    });

  const { inputValues, handleInputChange, resetForm,setForm} = useForm(task);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(inputValues);
    taskid != ""
      ? editTask(taskid, inputValues)
      : addTask(inputValues );
    resetForm();
    notify();
    setTimeout(function () {
      window.location.reload(); 
    }, 1000);
  };

  const getTaskById = async (newtaskid:String) => {
    try {
      const res = await axios.get(`/tasks?id=${newtaskid}`);
      console.log(res);
      setForm(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (taskid != "") {
      getTaskById(taskid);
    }
  }, [taskid]);

  return (
    <>
      <div className="wrapper">
        <div className="title">Add Task</div>
        <div className="form">
          <div className="inputfield">
            <label>Task Name</label>
            <input
              type="text"
              className="input"
              name="taskname"
              value={inputValues.taskname}
              onChange={(e)=>handleInputChange(e)}
            />
          </div>
          <div className="inputfield">
            <label>Assignee</label>
            <div className="custom_select">
              <select
                name="assignee"
                value={inputValues.assignee}
                onChange={(e)=>handleInputChange(e)}
              >
                <option value="">Select</option>
                <option value="Me">Me</option>
                <option value="Team Leader">Team Leader</option>
                <option value="Mentor">Mentor</option>
              </select>
            </div>
          </div>
          <div className="inputfield">
            <label>Priority</label>
            <div className="custom_select">
              <select
                name="priority"
                value={inputValues.priority}
                onChange={(e)=>handleInputChange(e)}
              >
                <option value="">Select</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </select>
            </div>
          </div>
          <div className="inputfield">
            <label>Status</label>
            <input
              type="text"
              className="input"
              name="status"
              value={inputValues.status}
              onChange={(e)=>handleInputChange(e)}
            />
          </div>

          <div className="inputfield">
            <label>Deadline</label>
            <input
              className="input"
              name="days"
              value={inputValues.days}
              onChange={(e)=>handleInputChange(e)}
            />

            <input
              className="input"
              name="hours"
              value={inputValues.hours}
              onChange={(e)=>handleInputChange(e)}
            />
          </div>

          <div className="inputfield">
            <button className="btn" onClick={toggleClass}>
              close
            </button>
            <button className="btn" onClick={(event)=>handleSubmit(event)}>
              Add Task
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-left" autoClose={1000} theme="dark" />
    </>
  );
};

export default CreateTask;
