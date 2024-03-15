import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";

const ClinicSetting = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <div className="row d-flex justify-content-between">
                  <div className="col-12 col-md-4 mt-4 ms-4">
                    <div>
                      <h5>Branch : Madan Mahal</h5>
                    </div>
                    <div className="mt-2">
                      <h3> Welcome to Dental Guru! </h3>
                    </div>
                    <div className="mt-3">
                      <h6>Accountant Dashboard</h6>
                    </div>
                  </div>

                  <div className="col-12 col-md-4 me-4 mt-5">
                    <form className="d-flex ms-auto my-sm" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn btn-primary"
                        style={{ backgroundColor: "#201658" }}
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <div className="container-fluid">
                    <div className="row mt-3">
                      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container-fluid d-flex justify-content-center">
                            <h2 className="">Acountend Settings</h2>
                          </div>
                        </nav>
                      </div>

                      <div className="row mt-5">
                        <div className="col-12">
                          <div class="row g-5">
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/lab-setting">
                                <div className="card">
                                  <div class="card-body d-flex justify-content-center text-light align-items-center">
                                    <h4 className="text-light">History</h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/calender-setting">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className="d-flex justify-content-center text-light align-items-center">
                                      Delete
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/drug-setting">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Bookmark
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/communication-setting">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Communication
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/prescription-templates">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Prescription Template
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/treatment-setting">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
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

export default ClinicSetting;
const Container = styled.div`
  .card {
    background-color: #201658;
    height: 8rem;
    &:hover {
      background-color: #9b59b6;
    }
  }

  .card-body {
    display: flex;
    justify-content: center;
  }

  a {
    text-decoration: none;
  }
`;
