import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Makepayment() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
   <Wrapper className="container">
   <>
      <Button variant="" onClick={handleShow} id='b1'>
       Make Payment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Bill Amount:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Amount to be Paid:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Amount pending:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Payment  Method:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Payment Details:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
        <button type="button" class="btn btn-primary">Click to continue</button>
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

export default Makepayment
const Wrapper = styled.div`



`

