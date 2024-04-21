import { Modal } from "react-bootstrap";

const ResponseErrorModal = () => {
  return (
    <Modal className="error-modal" show={true}>
      <Modal.Header>
        <Modal.Title>An error occurred</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        An error occurred while trying to connect to the API service
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};

export default ResponseErrorModal;
