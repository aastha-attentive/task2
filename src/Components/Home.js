import { useState,useEffect } from "react";
import { getListTask } from "../service/localStorage";
import CompTask from "./CompTask";
import CreateTask from "./CreateTask";
import ProgressTask from "./ProgressTask";
import TodoTask from "./TodoTask";



const Home = () => {
  
  const [taskData, setTaskData] = useState(getListTask());
  
  const [updatedData,setUpdatedData]=useState(taskData);
  
  const [taskid,setTaskid]=useState(null);
  const [isActive,setActive]=useState(false);
  
  const handleSearch1=({target})=>{
      
      setUpdatedData(taskData.filter((item) => item.taskname.toLowerCase().includes(target.value)));
  }

  const handleSearch2=({target})=>{
    setUpdatedData(taskData.filter((item) => item.assignee.toLowerCase().includes(target.value)));
  }

  const ClearFilter = ()=>{
      document.getElementById('myinput1').value = '';
      document.getElementById('myinput2').value = '';
      setUpdatedData(taskData);
  }

  const ctask=(updatedData.filter((task)=>{
    return task.statuss=== "completed";
  }))

  const todotask = updatedData.filter((elem)=>{
    return elem.statuss=== "assigned";
  })

  const ptask = updatedData.filter((elem)=>{
    return elem.statuss=== "progress";
  })

  const toggleClass = () => {
    setActive(!isActive);
    console.log(isActive);
    
  };

  
  useEffect(() => {
    setTaskData(getListTask());
    setUpdatedData(taskData);
  }, []);
    
  

  return (
    <>
      <div className='createb1' onClick={toggleClass}>
          <button >Create Task</button>
      </div>
      <div className="filterbox">
        <input type="text" name="taskname" id="myinput1" placeholder="Search for a task.." onChange={handleSearch1}/>
        <input type="text" name="assignee" id="myinput2" placeholder="Filter by Assignee.." onChange={handleSearch2}/>
        <button onClick={ClearFilter}>clear Filter</button>
      </div>
      <div className={(isActive || taskid!=null)? 'blur-container':'container'}>
        
        <div className="boxes">
          <h1>Completed</h1>
          <div className="boxes-h">
          {
            ctask.map(task => <CompTask task={task} key={task.id} setTaskData={setTaskData} setTaskid={setTaskid} />)
          }
          </div>
        </div>
        <div className="boxes">
          <div className="boxes-h"><h1>Todo</h1>
          {
            todotask.map(task => <TodoTask task={task} key={task.id} setTaskData={setTaskData} setTaskid={setTaskid} />)
          }
          </div>
        </div>
        <div className="boxes">
          <div className="boxes-h"><h1>Progress</h1>
          {
            ptask.map(task => <ProgressTask task={task} key={task.id} setTaskData={setTaskData} setTaskid={setTaskid}/>)
          }
          </div>
        </div>
      </div>
      
      { (taskid==null) ? (<div className={isActive ? 'form-container': 'hide-form'}>
            <CreateTask taskid={taskid} toggleClass={toggleClass}/>
       </div> ):
       (<div className={'form-container'}>
            <CreateTask taskid={taskid}  toggleClass={toggleClass}/>
       </div> )
      } 
      
    </>

  )
}

export default Home