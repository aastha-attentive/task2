  
// localStorage for deleted tasks
export const getDeletedTasks=()=>{
    if(!localStorage["deletedtasks"]){
      localStorage["deletedtasks"]="[]";
    }
    let deletedtasks = localStorage["deletedtasks"];
    deletedtasks=JSON.parse(deletedtasks);
    //console.log(deletedtasks);
    return deletedtasks;
  }
  
  export const addDeletedTasks = (deletedtask) =>{
    const deletedtasks=getDeletedTasks();
    deletedtasks.push(deletedtask);
    localStorage["deletedtasks"]=JSON.stringify(deletedtasks);
  }
  
    
    export const getListTask = () => {
      if (!localStorage["tasks"]) {
        localStorage["tasks"] = "[]";
      }
    
      let tasks = localStorage["tasks"];
      tasks = JSON.parse(tasks);
      return tasks;
    };
    
    export const addTask = (task) => {
      const tasks = getListTask();
      tasks.push(task);
      localStorage["tasks"] = JSON.stringify(tasks);
    };
     export const getTaskById = (id) => {
      const tasks = getListTask();
      const task = tasks.find((task) => task.id === id);
      return task;
    };
    
    export const removeTask = (id) => {
      let deletedtask=getTaskById(id);
      addDeletedTasks(deletedtask);
      let tasks = getListTask();
      tasks = tasks.filter((task) => task.id !== id);
      localStorage["tasks"] = JSON.stringify(tasks);
    };
    
   
    
    export const editTask = (id, newTask) => {
      let tasks = getListTask();
      tasks = tasks.filter((task) => task.id !== id);
      tasks.push(newTask);
      localStorage["tasks"] = JSON.stringify(tasks);
    };
  