import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import BranchDetails from "../../components/BranchDetails";

const AllBills = () => {
  //   const [billType, setBillType] = useState(null);
  const initialTab = localStorage.getItem("selectedTab") || "tab1";
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [showPaid, setShowPaid] = useState(false);

  console.log(showPaid);
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <div className="">
                  <BranchDetails />
                </div>

                <div className="container box-details p-3 mt-5">
                  <h2 className="text-center">Invoice Generator</h2>
                  <hr />
                  <div className="row mt-5">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="container">
                        <div className="row">
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>Bill Date :</h4>
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>16-03-2024</h4>
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>UHID :</h4>
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>DH0001</h4>
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>Branch :</h4>
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>Madan Mahal</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="container">
                        <div className="row">
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>Patient Name :</h4>
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>Shubham</h4>
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>Patient Mobile :</h4>
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>8602161019</h4>
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>Assigned Doctor :</h4>
                          </div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <h4>shubham</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="container mt-3">
                    <div className="row">
                      <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                        <div>
                          <h2>Treatments -</h2>
                          <ul>
                            <li>
                              <p>- Dental Cleanings</p>
                            </li>
                            <li>
                              <p>- Dental Cleanings</p>
                            </li>
                            <li>
                              <p>- Dental Cleanings</p>
                            </li>
                            <li>
                              <p>- Dental Cleanings</p>
                            </li>
                            <li>
                              <p>- Dental Cleanings</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div className="container box-amount">
                          <div>
                            <h4>Total Amount</h4>
                            <p className="fw-bold">10000 INR </p>
                            <hr />
                            <h4>Paid Amount</h4>
                            {showPaid ? (
                              <>
                                <p className="fw-bold">10000 INR </p>
                              </>
                            ) : (
                              <>
                                <div className="d-flex">
                                  <input
                                    type="number"
                                    placeholder="add amount"
                                    className="rounded b-none"
                                  />
                                  <button
                                    className="btn btn-info mx-2"
                                    onClick={() => setShowPaid(true)}
                                  >
                                    Pay
                                  </button>
                                </div>
                              </>
                            )}

                            <hr />
                            <h4>Pending Amount</h4>
                            <p className="fw-bold"> No Due </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-info">Print</button>
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

export default AllBills;
const Container = styled.div`
  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }

  .box-details {
    background-color: white;
    height: auto;
    width: 100vw;
  }
  ul {
    li {
      list-style: none;
      p {
        font-weight: bold;
      }
    }
  }

  .box-amount {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;
