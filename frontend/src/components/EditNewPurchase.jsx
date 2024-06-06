import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditNewPurchase() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Wrapper className="container">
        <>
          <Button
            variant="warning"
            className="warning"
            onClick={handleShow}
            id="b1"
          >
            Update
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Purchase Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="container">
                  <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">
                          Item Name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Vendor:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Quantity:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          MRP :
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Total Amount:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Total Amount:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          GST:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Discount:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Net Amount:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Paid Amount:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Due Amount:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Paid Date:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label">
                          Bill Date:
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

export default EditNewPurchase;
const Wrapper = styled.div`
  .warning {
    background: #201658;
    color: white;
    border: none;
  }
`;
