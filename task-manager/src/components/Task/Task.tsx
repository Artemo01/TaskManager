import { useState } from "react";
import { ITask } from "../../interfaces";
import { FaStar } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import "./Task.scss";
import Moment from "react-moment";
import { updateTask } from "../../services/api.service";

interface TaskProps {
  task: ITask;
  openTaskDetails: () => void;
}

const Task = (props: TaskProps) => {
  const [complete, setComplete] = useState<boolean>(props.task.isCompleted);

  const changeCompleteState = async () => {
    props.task.isCompleted = !complete;
    await updateTask(props.task);
    setComplete(!complete);
  };
  return (
    <div className="d-flex flex-column card-container task-container">
      <div className="d-flex flex-row">
        <h5 className="task-title">{props.task.name}</h5>
        <FaEdit
          className="ml-auto task-edit-icon"
          onClick={props.openTaskDetails}
        />
      </div>

      <div className="mb-auto task-description">{props.task.description}</div>
      <Moment format="YYYY-MM-DD">{props.task.date}</Moment>
      <div className="d-flex flex-row mt-1">
        <div
          className={`task-complete-button__${
            complete ? "completed" : "complete"
          }`}
          onClick={changeCompleteState}
        >
          {complete ? "Completed" : "Complete"}
        </div>
        <div className="ml-2">
          {props.task.isImportant && <FaStar className="task-important-icon" />}
        </div>
      </div>
    </div>
  );
};

export default Task;
