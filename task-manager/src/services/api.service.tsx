import { ITask, ITasksFilter } from "../interfaces";
import { buildFilterString } from "./stringBuilder.service";

const baseUrl = "https://localhost:44361/api";
const taskUrlBase = baseUrl + "/Task";
const apiStatusUrlBase = baseUrl + "/StatusApi";

export const checkApiStatus = async () => {
  const response = await fetch(apiStatusUrlBase);
  return response.text();
};

export const getAllTasks = async (filters?: ITasksFilter): Promise<ITask[]> => {
  let url = taskUrlBase + "/GetAllTasks";
  if (filters && (filters.isImportant || filters.isCompleted)) {
    const filterString = buildFilterString(filters);
    url += filterString;
  }
  const response = await fetch(url);
  return response.json();
};

export const addNewTask = async (task: ITask) => {
  const response = await fetch(taskUrlBase, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (task: ITask) => {
  const response = await fetch(taskUrlBase, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(task),
  });
  return response.json();
};
