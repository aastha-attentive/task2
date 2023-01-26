import { useEffect, useState } from "react"
import DeletedTask from "./DeletedTask";
import axios from "../../service/axios";

const DeletedTasks = () => {
  const [deletedTask, setDeletedTask]=useState([])

  const getDeletedTasks = async() =>{
    try{
      const res=await axios.get(`/deletedtasks`);
      setDeletedTask(res.data);
    }catch(error){
        console.log(error);
    }
  }
  useEffect(() =>{
    getDeletedTasks();
  },[])

  return (
    <div>
      <div className="deletedtask"><h1>Deleted Task</h1></div>
      <table>
      <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Country</th>
        <th>Contact</th>
        <th>Country</th>
      </tr>
        {
        deletedTask.map(deletedtask => <DeletedTask  key={deletedtask.id} deletedtask={deletedtask}/>)
        }
      </table>
    
      
    </div>
  )
}

export default DeletedTasks