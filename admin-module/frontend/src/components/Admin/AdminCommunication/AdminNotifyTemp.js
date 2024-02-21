import React from "react";
import styled from "styled-components";

const AdminNotifyTemp = () => {
  return (
    <>
      <Container>
        <h1>Appointment Notification Templates Settings</h1>
        <div className="container-fluid mt-5">
          <div className="row mt-2">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="container">
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <button className="btn btn-info">Patient Birthday</button>
                  </div>
                  <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <button className="btn btn-secondary">
                      Hi Rahul, Dental Guru Wishes you a very happy birthday,
                      stay happy and healthy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="box-cont">
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
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger mx-2">Delete</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-2">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="container">
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <button className="btn btn-info">Patient Welcome</button>
                  </div>
                  <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <button className="btn btn-secondary mx-1">
                      Hi rahul , Thank you for visiting Dental guru clinic, you
                      can reach us at 9856325545 for any queries.
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="box-cont">
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
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger mx-2">Delete</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-2">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="container">
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <button className="btn btn-info">Patient Followup</button>
                  </div>
                  <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                    <button className="btn btn-secondary mx-1">
                      Dear Rahul, your appointment is due at Dental guru clinic
                      date 25 oct 2023 at 11 Am,you can reach us at 985632589
                      for any queries.
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="box-cont">
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
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger mx-2">Delete</button>
              </div>
            </div>
          </div>
          <hr />
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

export default AdminNotifyTemp;
const Container = styled.div`
  .box-cont {
    display: flex;
    justify-content: center;
    align-items: center;
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
