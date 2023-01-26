
import { useForm } from '../hooks/useForm';
import uuid from 'react-uuid';
import {  useEffect } from 'react';
import { editTask,addTask } from '../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../service/axios';


const CreateTask = ({taskid,toggleClass}) => {
  const notify = () => toast("Task Added successfully!",{
    position: "bottom-left",
    autoClose: 5000,
    theme: "dark",
  });

  const {inputValues, handleInputChange, resetForm, setForm } = useForm({
      taskname: '',
      assignee: '',
      priority:'',
      days: 0,
      hours:0,
      statuss: '',
      storypoints: new Date(),
  });


  const handleSubmit = (e) => {
      e.preventDefault();
      (taskid!=null) ? editTask(taskid, inputValues) : addTask({ id: uuid(),...inputValues });
      resetForm();
      notify();
      setTimeout(function () {
        window.location.reload(true); //MODIFICATION
    }, 1000);
  };
  
  const getTaskById=async(id) =>{
    try {
      const res= await axios.get(`/tasks?id=${id}`);
      console.log((res.data)[0]);
      setForm((res.data)[0]);
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    if (taskid!=null) {
        getTaskById(taskid);
    }
}, [taskid]);




  return (
    <>
      <form  className="main-form">
              <div className="child-form">
                  <label htmlFor="taskname">taskname</label>
                  <input name="taskname" value={inputValues.taskname} onChange={handleInputChange}/>
              </div>
              <div  className="child-form">
                  <label htmlFor="priority" >priority</label>
                  <select name="priority" value={inputValues.priority} onChange={handleInputChange}>
                      <option value="P0">P0</option>
                      <option value="P1">P1</option>
                      <option value="P2">P2</option>
                      <option value="P3">P3</option>
                  </select>
              </div>
              <div  className="child-form">
                  <label htmlFor="assignee" >assignee</label>
                  <input name="assignee" value={inputValues.assignee} onChange={handleInputChange}/>
              </div>
              <div  className="child-form">
                  <label htmlFor="time" >deadline</label>
                  <input name="days" value={inputValues.days} onChange={handleInputChange}/>
                  <input name="hours" value={inputValues.hours} onChange={handleInputChange}/>
              </div>
              <div  className="child-form">
                  <label htmlFor="status">status</label>
                  <input name="statuss" value={inputValues.statuss} onChange={handleInputChange}/>
              </div>
              
              <div className='btn'>
                <button onClick={toggleClass}>close</button>
                <button onClick={handleSubmit}>Add Task</button>
              </div>
              
                    
            </form> 
            <ToastContainer position='bottom-left' autoClose={1000} theme="dark"/>
        
    </>
  )
}

export default CreateTask