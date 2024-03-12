import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";

const ReportDash = () => {
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
                <div className="container mt-3">
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Reports Dashboard</h2>
                          </div>
                        </nav>
                      </div>

                      <div className="row mt-5">
                        {/* <div className="col-1"></div> */}
                        <div className="col-12">
                          <div class="row g-5">
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/finance-reports">
                                <div className="card">
                                  <div class="card-body d-flex justify-content-center text-light align-items-center">
                                    <h4 className="text-light">
                                      Financial Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/appointment-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className="d-flex justify-content-center text-light align-items-center">
                                      Appointment Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/Billing-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Billing Reports
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/inventory-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Inventory Reports
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/employee-attendance-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Employee Attendance Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/employee-details-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Employee Details Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/lab-details-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Lab Details Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/lab-test-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Lab Test Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/lab-task-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Lab Task Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
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

export default ReportDash;
const Container = styled.div`
  nav {
    background-color: #1abc9c;
  }
  .card {
    background-color: #1abc9c;
    height: 8rem;
    &:hover {
      background-color: #000;
    }
  }

  .card-body {
    display: flex;
    justify-content: center;
  }

  a {
    text-decoration: none;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
