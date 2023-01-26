
export const isOverdue=(task)=>{
    const theDate=new Date(task.storypoints);
    const date=new Date(theDate.getTime() + ((task.days)*(24)*60*60*1000)+((task.hours)*60*60*1000));
    return  (date < new Date() && task.statuss!=="completed");
  }