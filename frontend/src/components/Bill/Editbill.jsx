import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Editbill() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Wrapper className="container">
        <>
          <Button variant="" onClick={handleShow} id="b1">
            Edit
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="container">
                  <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">
                          UHID:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          RGID:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Patient Name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Date:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Treatment Amount
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12">
                      {" "}
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Payme:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Bill Amount:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Pending:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Paid:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Billing Status:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-primary">
                    Update
                  </button>
                </div>
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
  );
}

export default Editbill;
const Wrapper = styled.div`
  .modal {
    width: 80% !important;
  }
`;
