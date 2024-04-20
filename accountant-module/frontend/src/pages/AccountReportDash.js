import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Sider from "../components/Sider";
import BranchDetails from "../components/BranchDetails";

const AccountReportDash = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-md-2 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-md-10 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <BranchDetails />
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary shadow rounded">
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
                              <Link to="/security-amount-report">
                                <div className="card">
                                  <div class="card-body d-flex justify-content-center text-light align-items-center">
                                    <h4 className="text-light">
                                      Security Amount Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            {/* <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/invoice-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className="d-flex justify-content-center text-light align-items-center">
                                      Invoice Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div> */}

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/opd-income-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      OPD Income Reports
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/treat-income-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Treatment Income Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/due-payment-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Due Payment Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                              <Link to="/paid-payment-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Paid Payment Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            {/* <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/staff-salary-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Staff Salary Reports
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div> */}
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/voucher-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Voucher Reports
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            {/* <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/purchase-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Purchase Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div> */}
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

export default AccountReportDash;
const Container = styled.div`
  nav {
    background-color: #201658;
  }
  .card {
    background-color: #201658;
    height: 8rem;
    border: none;
    box-shadow: 1px 1px 8px #201658;
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
