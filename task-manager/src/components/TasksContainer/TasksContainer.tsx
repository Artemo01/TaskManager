import "./TasksContainer.scss";
import { getAllTasks } from "../../services/api.service";
import { useEffect, useState } from "react";
import Task from "../Task/Task";
import { ITask } from "../../interfaces";
import { IoMdAddCircle } from "react-icons/io";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import TaskDetailsModal from "../TaskDetailsModal/TaskDetailsModal";
import TaskFilter from "../TaskFilter/TaskFilter";
import { FaFilter } from "react-icons/fa";

const TasksContainer = () => {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask>();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [displayFilters, setDisplayFilters] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowAddModal(true);
  };

  const handleHidewModal = () => {
    setShowAddModal(false);
    setShowDetailsModal(false);
  };

  const updateTaskList = (data: ITask[]) => {
    setAllTasks(data);
  };

  const openTaskDetails = (task: ITask) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
    console.log(task);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getAllTasks();
      setAllTasks(tasks);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="tasks-container-wrapper card-container">
        <div className="d-flex align-items-center">
          <h3>All Tasks</h3>{" "}
          <FaFilter
            className="filter-icon"
            onClick={() => setDisplayFilters(!displayFilters)}
          ></FaFilter>
        </div>
        {displayFilters && (
          <TaskFilter updateTaskList={updateTaskList}></TaskFilter>
        )}
        <div className="tasks-container">
          {allTasks &&
            allTasks.map((task) => (
              <div key={task.id}>
                <Task
                  key={task.id}
                  task={task}
                  openTaskDetails={() => openTaskDetails(task)}
                ></Task>
              </div>
            ))}
          <div className="add-task-card" onClick={handleShowModal}>
            <IoMdAddCircle />
          </div>
        </div>
      </div>
      <AddTaskModal
        showModal={showAddModal}
        hideModal={handleHidewModal}
        updateTaskList={updateTaskList}
      ></AddTaskModal>
      <TaskDetailsModal
        showModal={showDetailsModal}
        hideModal={handleHidewModal}
        taskDetails={selectedTask}
      ></TaskDetailsModal>
    </>
  );
};

export default TasksContainer;
