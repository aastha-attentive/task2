import { useEffect, useState } from "react"
import { getDeletedTasks } from "../service/localStorage"
import DeletedTask from "./DeletedTask";

const DeletedTasks = () => {
  const [deletedTask, setDeletedTask]=useState(getDeletedTasks);

  useEffect(() =>{
    setDeletedTask(getDeletedTasks());
    console.log(deletedTask);
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