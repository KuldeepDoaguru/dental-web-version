import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditLab() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
   <Wrapper className="container">
   <>
      <Button variant="" onClick={handleShow} id='b1'>
    Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Lab Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Due Date:</label>
            <input type="date" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Status:</label>
           
            <select class="form-select" aria-label="Default select example">
  <option selected> Select menu</option>
  <option value="1">Advised</option>
  <option value="2">Sample/Collected</option>
  <option value="3">Processing/Sent</option>
  <option value="4">Completed</option>
</select>
          </div>
        
        <button type="button" class="btn btn-primary">Save</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
  
        </Modal.Footer>
      </Modal>
    </>
  
        
   </Wrapper>
  
    </>
  )
}

export default EditLab
const Wrapper = styled.div`



`

