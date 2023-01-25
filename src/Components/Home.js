import { useState,useEffect } from "react";
import CompTask from "./Tasks/CompletedTask";
import CreateTask from "./CreateTask";
import ProgressTask from "./Tasks/ProgressTask";
import TodoTask from "./Tasks/TodoTask";
import { useDrop } from "react-dnd";
import axios from "../service/axios";
import { editTask } from "../service/api";

const Home = () => {
  
  const [taskData, setTaskData] = useState([]);
  
  const [updatedData,setUpdatedData]=useState(taskData);
  
  const [taskid,setTaskid]=useState(null);
  const [isActive,setActive]=useState(false);
  
  const handleSearch1=({target})=>{
      
      setUpdatedData(taskData.filter((item) => 
        item.taskname.toLowerCase().includes(target.value)));
  }

  const handleSearch2=({target})=>{
    setUpdatedData(taskData.filter((item) => 
      item.assignee.toLowerCase().includes(target.value)));
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
    //console.log(isActive);
    
  };

  const getApiData = async() =>{
    try{
      const res=await axios.get("/tasks");
      setTaskData(res.data);
      setUpdatedData(res.data);
    }
    catch (error){
      console.log(error);
    }
  };


  //changing status of task after droping task
  const DragtoCompleted = ({task}) => {
      const draggedTask= taskData.filter((ele)=> ele.id===task.id)[0];
      draggedTask.statuss="completed";
      console.log(draggedTask);
      editTask(task.id,draggedTask);
      getApiData();
  };
  const DragtoTodo = ({task}) => {
    const draggedTask= taskData.filter((ele)=> ele.id===task.id)[0];
    draggedTask.statuss="assigned";
    console.log(draggedTask);
    editTask(task.id,draggedTask);
    getApiData();
  };

  const DragtoProgress = ({task}) => {
    const draggedTask= taskData.filter((ele)=> ele.id===task.id)[0];
    draggedTask.statuss="progress";
    console.log(draggedTask);
    editTask(task.id,draggedTask);
    getApiData();
  };
    
  //Adding Drag functionality 
  const [{isOver1}, drop1] = useDrop(() => ({
    accept: 'CARD',
    drop:(item,monitor) => DragtoCompleted(item),
    collect:(monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }));

  const [{isOver2}, drop2] = useDrop(() => ({
    accept: 'CARD',
    drop:(item,monitor) => DragtoTodo(item),
    collect:(monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }));
  
  const [{isOver3}, drop3] = useDrop(() => ({
    accept: 'CARD',
    drop:(item,monitor) => DragtoProgress(item),
    collect:(monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }));
  
  useEffect(() => {

    //fetching data from api
    getApiData();
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
        
        {/* div for completed task */}
        <div className="boxes">
          <h1>Completed</h1>
          <div ref={drop1} className="boxes-h">
          {
            ctask.map(task => <CompTask task={task} key={task.id} setTaskData={setTaskData} setTaskid={setTaskid} />)
          }
          </div>
        </div>

        {/* div for todo task */}
        <div className="boxes">
          <h1>Todo</h1>
          <div ref={drop2} className="boxes-h">
          {
            todotask.map(task => <TodoTask task={task} key={task.id} setTaskData={setTaskData} setTaskid={setTaskid} />)
          }
          </div>
        </div>

        {/* div for progress task */}
        <div className="boxes">
          <h1>Progress</h1>
          <div ref={drop3} className="boxes-h">
          {
            ptask.map(task => <ProgressTask task={task} key={task.id} setTaskData={setTaskData} setTaskid={setTaskid}/>)
          }
          </div>
        </div>
      </div>

      {/* form to fill the task */}
      
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