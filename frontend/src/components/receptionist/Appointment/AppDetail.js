import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";

function AppDetails({ onClose, slotInfo }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(slotInfo);
  return (
    <Wrapper>
      <>
        <Button variant="" onClick={handleShow} id="btn21"></Button>

        <Modal show={true} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Appointment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Appointment Id:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  readOnly
                  value={slotInfo.appoint_id}
                />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Patient UHID:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  readOnly
                  value={slotInfo.uhid}
                />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label text-capitalize">
                  Patient Name:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  readOnly
                  value={slotInfo.patient_name}
                />
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Status
                </label>
                <input
                  type="text"
                  class="form-control text-capitalize"
                  id="recipient-name"
                  readOnly
                  value={slotInfo.appointment_status}
                />
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">
                  Date & Time:
                </label>
                <input
                  type="text"
                  value={
                    slotInfo?.appointment_dateTime 
                    ? moment(slotInfo?.appointment_dateTime,"YYYY-MM-DDTHH:mm").format("DD/MM/YYYY hh:mm A") : "" }
                  class="form-control"
                  id="recipient-name"
                  readOnly
                />
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">
                  Mobile No.
                </label>
                <input
                  type="text"
                  value={slotInfo.mobileno}
                  class="form-control"
                  id="recipient-name"
                  readOnly
                />
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">
                  Treatment
                </label>
                <input
                  type="text"
                  value={slotInfo.treatment_provided}
                  class="form-control"
                  id="recipient-name"
                  readOnly
                />
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">
                  Doctor:
                </label>
                <input
                  type="text"
                  class="form-control text-capitalize"
                  id="recipient-name"
                  value={slotInfo.assigned_doctor_name}
                  readOnly
                />
              </div>
              {/* <div class="mb-3">
            <label for="message-text" class="col-form-label">Add Treatment:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div> */}
              <div class="mb-3">
                <label for="message-text" class="col-form-label">
                  Patient type:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  value={slotInfo.patient_type}
                  readOnly
                />
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">
                  Notes:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  value={slotInfo.notes}
                  readOnly
                />
              </div>
              {/* <button type="button" class="btn btn-primary">Book Appointment</button> */}
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
  );
}

export default AppDetails;
const Wrapper = styled.div`
  #btn21 {
    height: 5rem;
    width: 100%;
  }
`;
