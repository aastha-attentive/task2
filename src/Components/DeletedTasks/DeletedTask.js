import React from 'react'

const DeletedTask = ({deletedtask}) => {

  return (
    <div className='deletedtask'>
        
        <p>{deletedtask.taskname}</p>
        <p>qqq</p>
        <p>{deletedtask.statuss}</p>
        <p>pa</p>
        <p>wwww</p>
    </div>
  )
}

export default DeletedTask