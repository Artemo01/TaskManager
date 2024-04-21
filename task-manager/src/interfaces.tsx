export interface ITask {
  id: number;
  name: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  isImportant: boolean;
}

export interface INewTask {
  name: string;
  date: string;
  description: string;
  isImportant: boolean;
}

export interface ITasksFilter {
  isCompleted?: boolean;
  isImportant?: boolean;
}
