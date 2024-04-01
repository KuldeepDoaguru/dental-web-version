import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MakeRefund(props) {
  const [show, setShow] = useState(false);
  // const sid = useParams();
  console.log(props.id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Wrapper className="container">
      <Button variant="warning" onClick={handleShow} id="b1">
        Make Refund
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Patient Bill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class=" d-flex ">
              <label for="recipient-name" class="col-form-label">
                Security Amount : 8000
              </label>
            </div>
            <div class=" d-flex ">
              <label for="recipient-name" class="col-form-label">
                Bill Amount : 5000
              </label>
            </div>
            <div class=" d-flex ">
              <label for="message-text" class="col-form-label">
                Refund Amount: 3000
              </label>
            </div>
            <div>
              <button className="btn btn-success">Make Refund</button>
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

export default MakeRefund;
const Wrapper = styled.div`
  #button {
    margin: 2rem;
  }
`;
