import React, { useState } from 'react'
import Popup from './Popup'
import EditPopup from './EditPopup'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DeletePopup from './DeletePopup'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModifyPopup({onClose,onEdit,onDelete,slotInfo}) {

  // const [show, setShow] = useState(true);

  // const [showEditPopup, setShowEditPopup] = useState(false);
  // const [showDeletePopup, setShowDeletePopup] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleEditClick = () => {
    
    onEdit() // Close the previous modal
  };

  const handleDeleteClick = () => {
    
    onDelete() // Close the previous modal
  };
  return (
    <Wrapper>

<Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Edit or Delete Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>







 
    </Wrapper>
  )
}

export default ModifyPopup
const Wrapper = styled.div`

  

.b{
    text-decoration: none;
  }
  .b:hover{
  text-decoration-line: underline;
  
  

  }
  .b1{
    text-decoration: none;
    margin-top:   0.1rem;
  }
  .b1:hover{
  text-decoration-line: underline;
  
  

  }
`
