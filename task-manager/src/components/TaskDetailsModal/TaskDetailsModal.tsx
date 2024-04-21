import { Button, Modal } from "react-bootstrap";
import { ITask } from "../../interfaces";
import { FaStar } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Moment from "react-moment";

interface TaskDetailsModalProps {
  taskDetails?: ITask;
  showModal: boolean;
  hideModal: () => void;
}

const TaskDetailsModal = (props: TaskDetailsModalProps) => {
  console.log(props);
  return props.taskDetails != null ? (
    <Modal
      className="custom-modal"
      show={props.showModal}
      onHide={props.hideModal}
    >
      <Modal.Header>
        <Modal.Title className="d-flex flex-row">
          {props.taskDetails.name}
          <div className="d-flex align-items-center ml-3">
            {props.taskDetails.isImportant && (
              <FaStar className="task-important-icon" />
            )}
          </div>
        </Modal.Title>
        <IoMdClose className="ml-auto" onClick={props.hideModal} />
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            Deadline:{" "}
            <Moment format="YYYY-MM-DD">{props.taskDetails.date}</Moment>
          </p>
          <h5>Description</h5>
          {props.taskDetails.description}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.hideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
        <Modal.Body>Task details not found.</Modal.Body>
      </Modal.Header>
    </Modal>
  );
};

export default TaskDetailsModal;
