import { useState } from "react";
import { TaskDetails } from "../Models/model";

export const task={
    id:"",
    taskname:"",
    assignee: "",
    priority: "",
    days: 0,
    hours: 0,
    status: "",
    storypoints: new Date(),
}

export const useForm = (callback:any,initialState = task) => {
  const [inputValues, setInputValues] = useState(initialState);

  const resetForm = () => {
    setInputValues(initialState);
  };

  const setForm = (newValues:TaskDetails) => {
    setInputValues(newValues);
  };

  const handleInputChange = (event:any):void=> {
    console.log('hi');
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
    console.log(inputValues);
  };

  return { inputValues, handleInputChange, resetForm, setForm };
};