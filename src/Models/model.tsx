export interface TaskDetails {
    id: string,
    taskname: string,
    assignee: string,
    priority: string,
    days: number,
    hours: number,
    status:string,
    storypoints: Date
  }

  type Support = {
    text: string;
    url: string;
  };

export interface Tasks {
  data: TaskDetails[];
  page: number;
  per_page: number;
  support: Support;
  total: number;
  total_pages: number;
}