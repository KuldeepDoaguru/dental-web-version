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
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div
                className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0"
                id="hd"
              >
                <Sider />
              </div>
              <div
                className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10"
                id="set"
              >
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

                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="#">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Security Amount Refund Reports
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

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
                              <Link to="/opd-refund">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className="d-flex justify-content-center text-light align-items-center">
                                      OPD Refund Report
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
                                      Bill Payment Report
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div>

                            {/* <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/voucher-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Voucher Reports
                                    </h4>
                                  </div>
                                </div>
                              </Link>
                            </div> */}

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
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-12">
                              <Link to="/lab-patient-report">
                                <div className="card">
                                  <div class="card-body">
                                    <h4 className=" d-flex justify-content-center text-light align-items-center">
                                      Lab Test Report
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

  .sticky {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1;
  }
  #set {
    margin-left: -4.5rem;
    padding-left: 150px; /* Width of sidebar */
    padding-top: 90px; /* Height of header */
    flex-grow: 1;
    overflow-y: auto;

    @media screen and (max-width: 768px) {
      margin-left: -2rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      margin-left: -1rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
      margin-left: -1.5rem;
    }
    @media screen and (min-width: 1500px) and (max-width: 1700px) {
      margin-left: 0.1rem;
    }
    @media screen and (min-width: 1700px) and (max-width: 2000px) {
      margin-left: 0.1rem;
    }

    @media screen and (min-width: 2000px) and (max-width: 2500px) {
      margin-left: 0rem;
    }
  }

  #hd {
    padding-top: 60px; /* Height of header */
    min-height: 100vh;
    position: fixed;

    @media screen and (max-width: 768px) {
      height: 68rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      height: 58rem;
    }
  }
  .header {
    position: fixed;
    min-width: 100%;
    z-index: 100;
  }
`;
