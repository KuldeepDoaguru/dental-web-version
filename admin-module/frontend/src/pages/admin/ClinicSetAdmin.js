import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";

const ClinicSetAdmin = () => {
  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Clinic Settings</h2>
                          </div>
                        </nav>
                      </div>

                      <div className="row mt-5">
                        {/* <div className="col-1"></div> */}
                        <div className="col-12">
                          <div class="row g-5">
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/admin-lab-setting">
                                <div className="card">
                                  <div class="card-body d-flex justify-content-center text-dark  align-items-center">
                                    <h4 className="text-dark ">Lab</h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/admin-calender-setting">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className="d-flex justify-content-center text-dark  align-items-center">
                                      Calender
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/admin-drug-setting">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-dark  align-items-center">
                                      DRUG
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/admin-communication-setting">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-dark  align-items-center">
                                      Communication
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/admin-prescription-templates">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-dark  align-items-center">
                                      Prescription Template
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/admin-treatment-setting">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-dark  align-items-center">
                                      Treatments
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

export default ClinicSetAdmin;
const Container = styled.div`
  nav {
    background-color: #1abc9c;
  }
  .card {
    background-color: #1abc9c;
    height: 8rem;
    box-shadow: 0px 0px 16px #41c686;
    border: none;
    &:hover {
      background-color: #3498db;
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
