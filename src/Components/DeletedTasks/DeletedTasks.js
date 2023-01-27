import { useEffect, useState } from "react";
import DeletedTask from "./DeletedTask";
import axios from "../../service/axios";
import "./style.css";

const DeletedTasks = () => {
  const [deletedTask, setDeletedTask] = useState([]);

  const getDeletedTasks = async () => {
    try {
      const res = await axios.get(`/deletedtasks`);
      setDeletedTask(res.data);
    } catch (error) {
      console.log(error);
    }
  };
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
        {deletedTask.map((deletedtask) => (
          <DeletedTask key={deletedtask.id} deletedtask={deletedtask} />
        ))}
      </table>
    </div>
  );
};

export default DeletedTasks;
