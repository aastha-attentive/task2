import { TaskDetails } from '../../Models/model';
interface DeletedTaskProps {
    key:string,
    deletedtask: TaskDetails
}
const DeletedTask: React.FC<DeletedTaskProps> = ({deletedtask}) =>{
  return (
    <tr>
      <td> {deletedtask.taskname} </td>
      <td> {deletedtask.assignee} </td>
      <td>{deletedtask.status}</td>
      <td>{deletedtask.priority}</td>
      <td>
        {deletedtask.days} days {deletedtask.hours} hours
      </td>
    </tr>
  );
};

export default DeletedTask;


