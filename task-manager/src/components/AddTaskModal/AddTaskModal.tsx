import { Button, Form, Modal } from "react-bootstrap";
import { addNewTask } from "../../services/api.service";
import { INewTask, ITask } from "../../interfaces";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface AddTaskModalProps {
  showModal: boolean;
  hideModal: () => void;
  updateTaskList: (data: ITask[]) => void;
}

const AddTaskModal = (props: AddTaskModalProps) => {
  const baseForm = {
    name: "",
    date: "",
    description: "",
    isImportant: false,
  };
  const [formData, setFormData] = useState<INewTask>(baseForm);

  const [validName, setValidName] = useState<boolean>(false);
  const [validDesctiption, setValidDescription] = useState<boolean>(false);
  const [validDate, setValidDate] = useState<boolean>(false);

  const setField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const formValidation = () => {
    formData.name === "" ? setValidName(true) : setValidName(false);
    formData.date === "" ? setValidDate(true) : setValidDate(false);
    formData.description === ""
      ? setValidDescription(true)
      : setValidDescription(false);
    return (
      formData.name !== "" &&
      formData.date !== "" &&
      formData.description !== ""
    );
  };

  const reset = () => {
    setFormData(baseForm);
    setValidDate(false);
    setValidName(false);
    setValidDescription(false);
  };

  const hideModal = () => {
    reset();
    props.hideModal();
  };

  const addTicket = async () => {
    if (!formValidation()) return;
    const newTaskData: ITask = {
      id: 0,
      name: formData.name,
      description: formData.description,
      date: new Date(formData.date),
      isCompleted: false,
      isImportant: formData.isImportant,
    };

    const response = await addNewTask(newTaskData);
    props.updateTaskList(response);
    reset();
    props.hideModal();
  };
  return (
    <Modal
      className="custom-modal"
      show={props.showModal}
      onHide={props.hideModal}
    >
      <Modal.Header>
        <Modal.Title>Add new task</Modal.Title>
        <IoMdClose className="ml-auto" onClick={hideModal} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="NewTask.Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task name"
              isInvalid={validName}
              onChange={(e) => setField("name", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="NewTask.Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              isInvalid={validDesctiption}
              onChange={(e) => setField("description", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="NewTask.Date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              isInvalid={validDate}
              onChange={(e) => setField("date", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="NewTask.IsImportant">
            <Form.Check
              type="checkbox"
              label="Important"
              onChange={(e) => setField("isImportant", e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={hideModal}>
          Close
        </Button>
        <Button variant="success" onClick={addTicket}>
          Add task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskModal;
