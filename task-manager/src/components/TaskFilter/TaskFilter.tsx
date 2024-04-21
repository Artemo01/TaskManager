import { Form } from "react-bootstrap";
import "./TaskFilter.scss";
import { ITask, ITasksFilter } from "../../interfaces";
import { useState } from "react";
import { getAllTasks } from "../../services/api.service";
import { MdClear } from "react-icons/md";

interface TaskFilterProps {
  updateTaskList: (data: ITask[]) => void;
}

const TaskFilter = (props: TaskFilterProps) => {
  const baseFilter: ITasksFilter = {
    isCompleted: false,
    isImportant: false,
  };
  const [filters, setFilters] = useState<ITasksFilter>(baseFilter);

  const getFilteredTaks = async (field: string, value: any) => {
    const newFilter = { ...filters, [field]: value };
    setFilters(newFilter);
    const tasks = await getAllTasks(newFilter);
    props.updateTaskList(tasks);
  };

  const clear = async () => {
    const tasks = await getAllTasks();
    props.updateTaskList(tasks);
    console.log(baseFilter);
    setFilters(baseFilter);
  };
  return (
    <div className="d-flex flex-row justify-content-between filters-container card-container">
      <Form>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Only Important"
            checked={filters.isImportant}
            onChange={(e) => getFilteredTaks("isImportant", e.target.checked)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="To complete"
            checked={filters.isCompleted}
            onChange={(e) => getFilteredTaks("isCompleted", e.target.checked)}
          />
        </Form.Group>
      </Form>
      <button
        className="clear-filters-button align-self-center"
        onClick={clear}
      >
        <MdClear className="clear-icon" />
      </button>
    </div>
  );
};

export default TaskFilter;
