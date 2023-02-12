import { useState } from "react";
import { useDrag } from "react-dnd";
import { deleteTask } from "../../service/api";
import { isOverdue } from "../../service/overduetask";
import "./style.css";
import { TaskDetails } from "../../Models/model";
import {Modal} from "elysium-ui";

interface CompletedTaskProps {
  task:TaskDetails;
  setTaskid:React.Dispatch<React.SetStateAction<string>>;
}

const CompTask:React.FC<CompletedTaskProps> = ({ task, setTaskid }) => {
  // Adding Drag effect
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: {task},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // const [open, setOpen] = useState(false);

  //   const ctas = {
  //       primary: {
  //           label: 'OK',
  //           color: 'secondary',
  //           onClick: () => deleteTask(task)
  //       },
  //       secondary: {
  //           label: 'Cancel',
  //           color: 'secondary',
  //           onClick: () => setOpen(false),
  //           variant: 'text'
  //       }
  //   };

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={isOverdue(task) ? "task overduetask" : "task"}
    >
      <p className="todo-h">{task.taskname}</p>
      <div className="todo-btn">
        <i
          className="fa fa-edit add-btn"
          title="Edit Item"
          onClick={() => setTaskid(task.id)}
        ></i>
        <i
          className="fa fa-trash-o add-btn"
          title="Delete Item"
          onClick={() => deleteTask(task)}
        ></i>
      </div>
      {/* <Modal 
            show={open}
            onClose={() => setOpen(false)}
            heading='Dialog title'
            content='Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.'
            ctas={ctas}
      /> */}
      </div>
  );
};

export default CompTask;
