import React from "react";
import styled from "styled-components";

const AdminAppointNotify = () => {
  return (
    <>
      <Container>
        <h1>Appointment Notification Settings</h1>
        <div className="container-fluid mt-5">
          <div className="row mt-2">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="container">
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <button className="btn btn-info">
                      Patient Appointment Confirmation
                    </button>
                  </div>
                  <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <button className="btn btn-secondary">
                      Sms! Sent to patient on adding a new appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="d-flex">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    class="form-check-label fw-bold"
                    for="flexCheckDefault"
                  >
                    SMS
                  </label>
                </div>
                <div class="form-check mx-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label
                    class="form-check-label fw-bold"
                    for="flexCheckChecked"
                  >
                    Email
                  </label>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-2">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="container">
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <button className="btn btn-info">
                      Patient Appointment Reshedule
                    </button>
                  </div>
                  <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <button className="btn btn-secondary mx-1">
                      Sms! Sent to patient on reshedule an appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="d-flex">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    class="form-check-label fw-bold"
                    for="flexCheckDefault"
                  >
                    SMS
                  </label>
                </div>
                <div class="form-check mx-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label
                    class="form-check-label fw-bold"
                    for="flexCheckChecked"
                  >
                    Email
                  </label>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-2">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="container">
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <button className="btn btn-info">
                      Patient Appointment Reminder
                    </button>
                  </div>
                  <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <button className="btn btn-secondary mx-1">
                      Sms! Sent to patient on the day of appointment at 8:am
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="d-flex">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    class="form-check-label fw-bold"
                    for="flexCheckDefault"
                  >
                    SMS
                  </label>
                </div>
                <div class="form-check mx-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label
                    class="form-check-label fw-bold"
                    for="flexCheckChecked"
                  >
                    Email
                  </label>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-2">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="container">
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <button className="btn btn-info">
                      Doctor Appointment Confirmation
                    </button>
                  </div>
                  <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <button className="btn btn-secondary mx-1">
                      Sms! Sent to Doctor on adding a new appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="d-flex">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    class="form-check-label fw-bold"
                    for="flexCheckDefault"
                  >
                    SMS
                  </label>
                </div>
                <div class="form-check mx-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label
                    class="form-check-label fw-bold"
                    for="flexCheckChecked"
                  >
                    Email
                  </label>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-2">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="container">
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    {" "}
                    <button className="btn btn-info">
                      Doctor Appointment Reshedule
                    </button>
                  </div>
                  <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <button className="btn btn-secondary mx-1">
                      Sms! Sent to Doctor on reshedule an appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="d-flex">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    class="form-check-label fw-bold"
                    for="flexCheckDefault"
                  >
                    SMS
                  </label>
                </div>
                <div class="form-check mx-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked
                  />
                  <label
                    class="form-check-label fw-bold"
                    for="flexCheckChecked"
                  >
                    Email
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="btncenter">
            <button className="btn btn-info mt-5 fs-1 shadow savebtn">
              Save
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminAppointNotify;
const Container = styled.div`
  .savebtn {
    background-color: #004aad;
    border: none;
    color: white;
  }

  .btncenter {
    display: flex;
    justify-content: flex-end;
  }

  .btn-info {
    background-color: #1abc9c;
    font-weight: bold;
    width: 100%;
  }

  .btn-secondary {
    background-color: #34495e;
    width: 100%;
  }
`;
