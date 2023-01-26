import React from 'react'
import { useDrag } from 'react-dnd';
import { deleteTask } from '../../service/api';
import { isOverdue } from '../../service/overduetask';

const TodoTask = ({task,setTaskData,setTaskid}) => {


  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: {task},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (

        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1}}  className={isOverdue(task) ? "task overduetask" : "task"}>
          <p className="todo-h">{task.taskname}</p>
          <div className="todo-btn">
            <i className="fa fa-edit add-btn" title="Edit Item" onClick={()=> setTaskid(task.id)}></i>
            <i className="fa fa-trash-o add-btn" title="Delete Item" onClick={()=> deleteTask(task)}></i>
          </div>    
        </div>  

  )
}

export default TodoTask