import { ITasksFilter } from "../interfaces";

export const buildFilterString = (filters: ITasksFilter): string => {
  const filterParams = [];

  if (filters.isImportant) {
    filterParams.push("IsImportant=true");
  }
  if (filters.isCompleted) {
    filterParams.push("IsCompleted=true");
  }

  return filterParams.length > 0 ? `?${filterParams.join("&")}` : "";
};
