import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Popup({ onClose, slotInfo }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Wrapper>
     
  <>
      <Button variant=""onClick={handleShow} id='btn21'>
       
      </Button>

      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Patient Name:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Date & Time:</label>
            <input type="text"  value={slotInfo.slots} class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Doctor:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Add Treatment:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Notes:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
        <button type="button" class="btn btn-primary">Book Appointment</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
    </Wrapper>
  )
}

export default Popup
const Wrapper = styled.div`
#btn21{
  height: 5rem;
  width: 100%;
}
`
{/* <form>
<div class="mb-3">
  <label for="recipient-name" class="col-form-label">Patient Name:</label>
  <input type="text" class="form-control" id="recipient-name"/>
</div>
<div class="mb-3">
  <label for="message-text" class="col-form-label">Date & Time:</label>
  <input type="text" class="form-control" id="recipient-name"/>
</div>
<div class="mb-3">
  <label for="message-text" class="col-form-label">Doctor:</label>
  <input type="text" class="form-control" id="recipient-name"/>
</div>
<div class="mb-3">
  <label for="message-text" class="col-form-label">Add Treatment:</label>
  <input type="text" class="form-control" id="recipient-name"/>
</div>
<div class="mb-3">
  <label for="message-text" class="col-form-label">Notes:</label>
  <input type="text" class="form-control" id="recipient-name"/>
</div>
<button type="button" class="btn btn-primary">Send message</button>
</form> */}
 {/* <button type="button" class="btn btn21  w-100 " data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">rre</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Appointment</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Patient Name:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Date & Time:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Doctor:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Add Treatment:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Notes:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
        <button type="button" class="btn btn-primary">Send message</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div> */}