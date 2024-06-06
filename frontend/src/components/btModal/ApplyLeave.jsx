import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ApplyLeave() {
  const [show, setShow] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  console.log(selectedDates);

  const handleDateClick = (date) => {
    setSelectedDates((prevDates) => {
      const updatedDates = { ...prevDates };
      // Toggle the selection status of the clicked date
      updatedDates[date] = !updatedDates[date];
      return updatedDates;
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Wrapper className="container">
      <Button variant="info" onClick={handleShow} id="b1">
        Apply Leave
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Leave Reason
              </label>
              <input
                type="text"
                class="form-control"
                id=""
                placeholder="leave reason"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Leave Dates
              </label>
              <input
                type="date"
                class="form-control"
                id=""
                placeholder="leave dates"
              />
            </div>
            <div>
              <Calendar
                onChange={handleDateClick}
                value={Object.keys(selectedDates).filter(
                  (date) => selectedDates[date]
                )}
                selectRange={true}
                calendarType="gregory"
              />
              <div>
                Selected Dates:
                <ul>
                  {/* {selectedDates.map((date) => (
                    <li key={date.getTime()}>
                      {new Date(date).toDateString()}
                    </li>
                  ))} */}
                </ul>
              </div>
            </div>

            <div>
              <button className="btn btn-success">Apply</button>
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

export default ApplyLeave;
const Wrapper = styled.div`
  #button {
    margin: 2rem;
  }
`;
