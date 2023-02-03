import { useForm } from "../hooks/useForm";
import { editTask, addTask , getTaskById} from "../service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./form.css";
import { task } from "../hooks/useForm";
import { useQuery,useMutation } from 'react-query'
import { TaskDetails } from "../Models/model";

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

  const {mutate:postTask } =
                 useMutation<any, Error>(
                  async () => {
                    return await addTask(inputValues);
                  },
                 );

  const {mutate:updateTask } =
                 useMutation<any, Error>(
                  async () => {
                    return await editTask(taskid,inputValues);
                  },
                 );


  function handleSubmit(){
    taskid != ""
      ? updateTask()
      : postTask();
    resetForm();
    notify();
    setTimeout(function () {
      window.location.reload(); 
    }, 1000);
  };

  const {  refetch }=useQuery<TaskDetails, Error>(
   'iddata', 
   async () => {
    return await getTaskById(taskid);  
  },
   {
     onSuccess: (res:any) => {
      if(taskid!="") setForm(res[0]);
     },
   });


  return (
    <>
    {console.log(inputValues)}
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
            <button className="btn" onClick={handleSubmit}>
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
