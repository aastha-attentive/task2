import axios from "./axios";
import swal from 'sweetalert';


const adddeletetask= async(task) => {
    try{
        const res=await axios.post('/deletedtasks',task);
        console.log(res);
    }catch(error){
        console.log(error);
    }
}

const deletetask= async(id) => {
    try{
        const res=await axios.delete(`/tasks/${id}`);
        console.log(res);
    }catch(error){
        console.log(error);
    }
}

export const deleteTask=(task)=>{
    swal({
      title: `Delete ${task.taskname}`,
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        adddeletetask(task);
        deletetask(task.id);
        window.location.reload(true);
      }
    });
  } 