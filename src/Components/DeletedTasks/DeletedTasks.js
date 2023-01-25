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
    <div className="deleteContainer">
      <div><h1>Deleted Task</h1></div>
      <div className="dtasks">
      {
        deletedTask.map(deletedtask => <DeletedTask  key={deletedtask.id} deletedtask={deletedtask}/>)
      }
      </div>
      
    </div>
  )
}

export default DeletedTasks