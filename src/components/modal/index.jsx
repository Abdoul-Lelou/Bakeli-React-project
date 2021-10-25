import React,{useState} from 'react'

const Modal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <button variant="primary" onClick={handleShow}>
          Launch demo modal
        </button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closebutton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
            <button variant="primary" onClick={handleClose}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default Modal
