import React from 'react'

const DeletedTask = ({deletedtask}) => {

  return (
    <div className='deletedtask'>
        
        <p>{deletedtask.taskname}</p>
        <p>{deletedtask.assignee}</p>
        <p>{deletedtask.statuss}</p>
        <p>{deletedtask.priority}</p>
        <p>{deletedtask.storypoints}</p>
    </div>
  )
}

export default DeletedTask