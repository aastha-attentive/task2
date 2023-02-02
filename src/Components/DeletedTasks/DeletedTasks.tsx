import { useEffect, useState } from "react";
import DeletedTask from "./DeletedTask";
import axios from "../../service/axios";
import "./style.css";
import { TaskDetails } from "../../Models/model";

const DeletedTasks = () => {
  const [deletedTask, setDeletedTask] = useState<TaskDetails[]>([])

  const getDeletedTasks = async () => {
    try {
      const res = await axios.get(`/deletedtasks`);
      setDeletedTask(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderNotes = ():JSX.Element[] => {
    return deletedTask.map(deletedtask => {
      return <DeletedTask key={deletedtask.id} deletedtask={deletedtask} />
    })
  }

  useEffect(() => {
    getDeletedTasks();
  }, []);

  return (
    <div>
      <div className="deletedtask">
        <h1>Deleted Task</h1>
      </div>
      <table>
        <tr>
          <th>Task Name</th>
          <th>Assignee</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Deadline</th>
        </tr>
        {renderNotes()}
      </table>
    </div>
  );
};

export default DeletedTasks;
