import { useForm } from "../hooks/useForm";
import uuid from "react-uuid";
import { useEffect } from "react";
import { editTask, addTask } from "../service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../service/axios";
import "./form.css";

const CreateTask = ({ taskid, toggleClass }) => {
  const notify = () =>
    toast("Task Added successfully!", {
      position: "bottom-left",
      autoClose: 5000,
      theme: "dark",
    });

  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    taskname: "",
    assignee: "",
    priority: "",
    days: 0,
    hours: 0,
    statuss: "",
    storypoints: new Date(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    taskid != null
      ? editTask(taskid, inputValues)
      : addTask({ id: uuid(), ...inputValues });
    resetForm();
    notify();
    setTimeout(function () {
      window.location.reload(true); //MODIFICATION
    }, 1000);
  };

  const getTaskById = async (id) => {
    try {
      const res = await axios.get(`/tasks?id=${id}`);
      console.log(res.data[0]);
      setForm(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (taskid != null) {
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
              onChange={handleInputChange}
            />
          </div>
          <div className="inputfield">
            <label>Assignee</label>
            <div className="custom_select">
              <select
                name="assignee"
                value={inputValues.assignee}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
              name="statuss"
              value={inputValues.statuss}
              onChange={handleInputChange}
            />
          </div>

          <div className="inputfield">
            <label>Deadline</label>
            <input
              className="input"
              name="days"
              value={inputValues.days}
              onChange={handleInputChange}
            />

            <input
              className="input"
              name="hours"
              value={inputValues.hours}
              onChange={handleInputChange}
            />
          </div>

          <div className="inputfield">
            <button className="btn" onClick={toggleClass}>
              close
            </button>
            <button className="btn" onClick={handleSubmit}>
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* <form className="main-form">
        <div className="child-form">
          <label htmlFor="taskname">taskname</label>
          <input
            name="taskname"
            value={inputValues.taskname}
            onChange={handleInputChange}
          />
        </div>
        <div className="child-form">
          <label htmlFor="priority">priority</label>
          <select
            name="priority"
            value={inputValues.priority}
            onChange={handleInputChange}
          >
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
        </div>
        <div className="child-form">
          <label htmlFor="assignee">assignee</label>
          <input
            name="assignee"
            value={inputValues.assignee}
            onChange={handleInputChange}
          />
        </div>
        <div className="child-form deadline">
          <label htmlFor="time">deadline</label>
          <input
            className="deadline"
            name="days"
            value={inputValues.days}
            onChange={handleInputChange}
          />
          <input
            className="deadline"
            name="hours"
            value={inputValues.hours}
            onChange={handleInputChange}
          />
        </div>
        <div className="child-form">
          <label htmlFor="status">status</label>
          <input
            name="statuss"
            value={inputValues.statuss}
            onChange={handleInputChange}
          />
        </div>

        <div className="btn">
          <button onClick={toggleClass}>close</button>
          <button onClick={handleSubmit}>Add Task</button>
        </div>
      </form> */}
      <ToastContainer position="bottom-left" autoClose={1000} theme="dark" />
    </>
  );
};

export default CreateTask;
