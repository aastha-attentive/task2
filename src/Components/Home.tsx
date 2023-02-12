import { useState} from "react";
import CompTask from "./Tasks/CompletedTask";
import CreateTask from "./CreateTask";
import ProgressTask from "./Tasks/ProgressTask";
import TodoTask from "./Tasks/TodoTask";
import { useDrop } from "react-dnd";
import { editTask ,getApiData} from "../service/api";
import { TaskDetails} from "../Models/model";
import { useQuery} from 'react-query';

const Home = () => {
  const [taskData,setTaskData]=useState<TaskDetails[]>([]);
  const [updatedData, setUpdatedData] = useState<TaskDetails[]>(taskData);
  const {  refetch:refectingdata } =
                 useQuery<TaskDetails[], Error>(
                  'taskdata', getApiData,
                  {
                    onSuccess: (res) => {
                      setTaskData(res);
                      setUpdatedData(res);
                    },
                  });
  const [taskid, setTaskid] = useState("");
  const [isActive, setActive] = useState(false);

  const handleSearch1 = (target:string):void => {
    setUpdatedData(taskData.filter((item:TaskDetails) => item.taskname.includes(target)));
  };

  const handleSearch2 = (target:string):void => {
    setUpdatedData(taskData.filter((item:TaskDetails) => item.assignee.includes(target)));
  };

  const ClearFilter = () => {
    setUpdatedData(taskData);
  };

  const ctask = updatedData.filter((task:TaskDetails) => {
    return task.status === "completed";
  });

  const todotask = updatedData.filter((elem:TaskDetails) => {
    return elem.status === "assigned";
  });

  const ptask = updatedData.filter((elem:TaskDetails) => {
    return elem.status === "progress";
  });

  const toggleClass = () => {
    setActive(!isActive);
    setTaskid("");
  };

  // const getApiData = async () => {
  //   try {
  //     const res = await axios.get("/tasks");
  //     setTaskData(res.data);
  //     setUpdatedData(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //changing status of task after droping task
  const DragtoCompleted = ({task}:any) => {
    task.status = "completed";
    editTask(task.id, task);
    refectingdata();
  };

  const DragtoTodo = ({task}:any) => {
    task.status = "assigned";
    editTask(task.id, task);
    refectingdata();
  };

  const DragtoProgress = ({task}:any) => {
    task.status = "progress";
    editTask(task.id, task);
    refectingdata();
  };

  //Adding Drag functionality
  const [,drop1] = useDrop(() => ({
    accept: "CARD",
    drop: (item:any, monitor) => DragtoCompleted(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [,drop2] = useDrop(() => ({
    accept: "CARD",
    drop: (item:any, monitor) => DragtoTodo(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [, drop3] = useDrop(() => ({
    accept: "CARD",
    drop: (item:any, monitor) => DragtoProgress(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));



  return (
    <>
      <div className="createb1" onClick={toggleClass}>
        <button className="fill">Create Task</button>
      </div>
      <form className="filterbox">
        <input
          type="text"
          name="taskname"
          id="myinput1"
          placeholder="Search for a task.."
          
          onChange={(e) => handleSearch1(e.target.value)}
        />
        <select
          name="assignee"
          id="myinput2"
          placeholder="Filter by Assignee.."
         
          onChange={(e) => handleSearch2(e.target.value)}
        >
          <option value="">Filter by Assignee</option>
          <option value="Me">me</option>
          <option value="Team Leader">Team Leader</option>
          <option value="Mentor">Mentor</option>
        </select>
        <input type="reset" value="clear Filter" onClick={()=>ClearFilter()}/>
      </form>
      <div className="container">
        {/* div for completed task */}
        <div className="boxes">
          <h1>Completed</h1>
          <div ref={drop1} className="boxes-h">
            {ctask.map((task:TaskDetails) => (
              <CompTask
                key={task.id}
                task={task}
                setTaskid={setTaskid}
              />
            ))}
          </div>
        </div>

        {/* div for todo task */}
        <div className="boxes">
          <h1>Todo</h1>
          <div ref={drop2} className="boxes-h">
            {todotask.map((task:TaskDetails) => (
              <TodoTask
                key={task.id}
                task={task}
                setTaskid={setTaskid}
              />
            ))}
          </div>
        </div>

        {/* div for progress task */}
        <div className="boxes">
          <h1>Progress</h1>
          <div ref={drop3} className="boxes-h">
            {ptask.map((task:TaskDetails) => (
              <ProgressTask
                key={task.id}
                task={task}
                setTaskid={setTaskid}
              />
            ))}
          </div>
        </div>
      </div>

      {/* form to fill the task */}
      {(isActive || taskid !== "") && (
        <div className="modal overlay">
          <div className=".modal-content">
            <CreateTask taskid={taskid} toggleClass={toggleClass} />
          </div>
        </div>
      )}

    </>
  );
};

export default Home;
