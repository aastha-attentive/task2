import React from 'react'
import { removeTask } from '../../service/localStorage';
import { getListTask } from '../../service/localStorage';
import swal from 'sweetalert';
import { useDrag } from 'react-dnd';

const TodoTask = ({task,setTaskData,setTaskid}) => {

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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: {task},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (

        <div ref={drag} className="task" >
          <p className="todo-h">{task.taskname}</p>
          <div className="todo-btn">
            <i className="fa fa-edit add-btn" title="Edit Item" onClick={()=> setTaskid(task.id)}></i>
            <i className="fa fa-trash-o add-btn" title="Delete Item" onClick={()=> deleteTask(task.id)}></i>
          </div>    
        </div>  

  )
}

export default TodoTask