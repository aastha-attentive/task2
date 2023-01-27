import React from "react";

const DeletedTask = ({ deletedtask }) => {
  return (
    <tr>
      <td>{deletedtask.taskname}</td>
      <td>{deletedtask.assignee}</td>
      <td>{deletedtask.statuss}</td>
      <td>{deletedtask.tdriority}</td>
      <td>
        {deletedtask.days} days {deletedtask.hours} hours
      </td>
    </tr>
  );
};

export default DeletedTask;
