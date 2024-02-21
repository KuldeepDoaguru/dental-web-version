import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import { IoMdArrowRoundBack } from "react-icons/io";

const AppointmentReport = () => {
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <h4>Select Branch : </h4>
                      </div>
                      <div>
                        <select
                          name="branch"
                          id="branch"
                          className="mx-2 p-2 rounded shadow select-style"
                        >
                          <option value="Madan Mahal" className="fw-bold">
                            Madan Mahal
                          </option>
                          <option value="Madan Mahal" className="fw-bold">
                            Ranjhi
                          </option>
                        </select>
                      </div>
                    </div>
                    <div>
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <div className="container-fluid">
                    <button className="btn btn-success" onClick={goBack}>
                      <IoMdArrowRoundBack /> Back
                    </button>
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Appointment Reports</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container">
                        <div class="table-responsive mt-4">
                          <div className="d-flex justify-content-between mb-2">
                            <div className="d-flex justify-content-between">
                              <div>
                                <input
                                  type="date"
                                  name=""
                                  id=""
                                  className="p-2 rounded"
                                />
                              </div>
                              <div className="mx-2">To</div>
                              <div>
                                <input
                                  type="date"
                                  name=""
                                  id=""
                                  className="p-2 rounded"
                                />
                              </div>
                              <button className="btn btn-warning mx-2">
                                Download Report
                              </button>
                            </div>

                            <div className="d-flex justify-content-between">
                              <div>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>select year</option>
                                  <option value="1">2024</option>
                                  <option value="2">2023</option>
                                  <option value="3">2022</option>
                                </select>
                              </div>
                              <div>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>select Month</option>
                                  <option value="1">Jan</option>
                                  <option value="2">Feb</option>
                                  <option value="3">Mar</option>
                                  <option value="1">Apr</option>
                                  <option value="2">May</option>
                                  <option value="3">June</option>
                                  <option value="1">July</option>
                                  <option value="2">Aug</option>
                                  <option value="3">Sept</option>
                                  <option value="1">Oct</option>
                                  <option value="2">Nov</option>
                                  <option value="3">Dec</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <table class="table table-bordered">
                            <thead className="table-head">
                              <tr>
                                <th>Branch</th>
                                <th>UHID</th>
                                <th>Patient Name</th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>Assigned Doctor</th>
                                <th>Treatment Provided</th>
                                <th>Treatment Status</th>
                                <th>Payment Status</th>
                                <th>Payment Date & Time</th>
                                <th>Appointed by</th>
                                <th>Update by</th>
                                <th>Appointment Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="table-row">
                                <td>Madan Mahal</td>
                                <td>007</td>
                                <td>Mahesh Kuldeep</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>shubham</td>
                                <td>2 injection</td>
                                <td>Treated</td>
                                <td>Complete</td>
                                <td>12/12/2023 10:30pm</td>
                                <td>mohit</td>
                                <td>mohit</td>
                                <td>12/12/2023 10:30pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>Madan Mahal</td>
                                <td>007</td>
                                <td>Mahesh Kuldeep</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>shubham</td>
                                <td>2 injection</td>
                                <td>Treated</td>
                                <td>Complete</td>
                                <td>12/12/2023 10:30pm</td>
                                <td>mohit</td>
                                <td>mohit</td>
                                <td>12/12/2023 10:30pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>Madan Mahal</td>
                                <td>007</td>
                                <td>Mahesh Kuldeep</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>shubham</td>
                                <td>2 injection</td>
                                <td>Treated</td>
                                <td>Complete</td>
                                <td>12/12/2023 10:30pm</td>
                                <td>mohit</td>
                                <td>mohit</td>
                                <td>12/12/2023 10:30pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>Madan Mahal</td>
                                <td>007</td>
                                <td>Mahesh Kuldeep</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>shubham</td>
                                <td>2 injection</td>
                                <td>Treated</td>
                                <td>Complete</td>
                                <td>12/12/2023 10:30pm</td>
                                <td>mohit</td>
                                <td>mohit</td>
                                <td>12/12/2023 10:30pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>Madan Mahal</td>
                                <td>007</td>
                                <td>Mahesh Kuldeep</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>shubham</td>
                                <td>2 injection</td>
                                <td>Treated</td>
                                <td>Complete</td>
                                <td>12/12/2023 10:30pm</td>
                                <td>mohit</td>
                                <td>mohit</td>
                                <td>12/12/2023 10:30pm</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AppointmentReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  th {
    background-color: #004aad;
    color: white;
  }
`;
