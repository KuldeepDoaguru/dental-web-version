import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Detail() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Wrapper className="container">
      <Button variant="" onClick={handleShow} id="b1">
        Detail
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Patient Bill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class=" d-flex ">
              <label for="recipient-name" class="col-form-label">
                UHID :
              </label>
              <p className="mt-2 mx-2">DH19 </p>
            </div>
            <div class=" d-flex ">
              <label for="recipient-name" class="col-form-label">
                RGID :
              </label>
              <p className="mt-2 mx-2">RG5</p>
            </div>
            <div class=" d-flex ">
              <label for="message-text" class="col-form-label">
                Patient Name :
              </label>
              <p className="mt-2 mx-2">Mohit Sahu</p>
            </div>
            <div class=" d-flex ">
              <label for="message-text" class="col-form-label">
                Mobile No:
              </label>
              <p className="mt-2 mx-2">9456687475</p>
            </div>
            <div class=" d-flex ">
              <label for="message-text" class="col-form-label">
                Treatment Amount:
              </label>
              <p className="mt-2 mx-2">3000</p>
            </div>
            <div class=" d-flex ">
              <label for="message-text" class="col-form-label">
                Payment Status :
              </label>
              <p className="mt-2 mx-2">Pending</p>
            </div>
          </form>
          <div
            className="widget-area-2 proclinic-box-shadow"
            id="tableres"
          ></div>
          {/* <button type="button" class="btn btn-primary mt-4 mx-3" id="button1">
            Print
          </button> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Wrapper>
  );
}

export default Detail;
const Wrapper = styled.div`
  #button {
    margin: 2rem;
  }
`;
