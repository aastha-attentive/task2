import React from 'react'
import { removeTask } from '../../service/localStorage';
import { getListTask } from '../../service/localStorage';
import swal from 'sweetalert';
import {useDrag} from "react-dnd";

const ProgressTask = ({task,setTaskData,setTaskid}) => {
  
  function deleteTask(id){
    swal({
      title: `Delete ${task.taskname}`,
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        removeTask(id);
        setTaskData(getListTask());
        window.location.reload(true);
      }
    });
  } 

    // Adding Drag effect 
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'CARD',
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }))
  
  
  return (
    
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1}} className="task">
          <p className="todo-h">{task.taskname}</p>
         <div className="todo-btn">
            <i className="fa fa-edit add-btn" title="Edit Item" onClick={()=> setTaskid(task.id)}></i>
            <i className="fa fa-trash-o add-btn" title="Delete Item" onClick={()=> deleteTask(task.id)} ></i>
         </div>    
      </div>

  )
}

export default ProgressTask