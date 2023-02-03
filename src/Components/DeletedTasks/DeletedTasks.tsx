import { useEffect, useState } from "react";
import DeletedTask from "./DeletedTask";
import axios from "../../service/axios";
import "./style.css";
import {getDeletedTasks} from "../../service/api";
import { TaskDetails } from "../../Models/model";
import { useQuery} from 'react-query';

const DeletedTasks = () => {
  const [deletedTask, setDeletedTask] = useState<TaskDetails[]>([])
  const { refetch:getdeletedtask } =
                 useQuery<TaskDetails[], Error>(
                  'taskdata', getDeletedTasks,
                  {
                    onSuccess: (res) => {
                      setDeletedTask(res);
                    },
                  });


  const renderNotes = ():JSX.Element[] => {
    return deletedTask.map(deletedtask => {
      return <DeletedTask key={deletedtask.id} deletedtask={deletedtask} />
    })
  }

  return (
    <div>
      <div className="deletedtask">
        <h1>Deleted Task</h1>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Task Name</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Deadline</th>
          </tr>
          {renderNotes()}
        </tbody>
      </table>
    </div>
  );
};

export default DeletedTasks;
