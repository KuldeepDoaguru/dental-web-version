import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import BranchDetails from "../../components/BranchDetails";

const StaffSalaryReport = () => {
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
                  <div className="">
                    <BranchDetails />
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Staff Salary Reports</h2>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div class="table-responsive mt-4">
                    <div className="d-flex justify-content-between mb-2">
                      <form>
                        <div className="d-flex justify-content-between">
                          <div>
                            <input
                              type="date"
                              name=""
                              id=""
                              className="p-2 rounded"
                              // onChange={(e) =>
                              //   setFromDate(e.target.value)
                              // }
                            />
                          </div>
                          <div className="mx-2">To</div>
                          <div>
                            <input
                              type="date"
                              name=""
                              id=""
                              className="p-2 rounded"
                              // onChange={(e) => setToDate(e.target.value)}
                            />
                          </div>
                          <button className="btn btn-warning mx-2">
                            Download Report
                          </button>
                        </div>
                      </form>
                    </div>
                    <div
                      className="container-fluid mt-1 rounded"
                      style={{ overflowX: "auto" }}
                    >
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th className="thead">ID</th>
                              <th className="thead">Bill Date</th>
                              <th className="thead">UHID</th>
                              <th className="thead">Branch</th>
                              <th className="thead">Patient Name</th>
                              <th className="thead">Patient Number</th>
                              <th className="thead">Assigned Doctor</th>
                              <th className="thead">Treatment</th>
                              <th className="thead">Total Amount</th>
                              <th className="thead">Paid Amount</th>
                              <th className="thead">Pending Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-row">
                              <td className="thead">1</td>
                              <td className="thead">18-03-2024</td>
                              <td className="thead">1</td>
                              <td className="thead">DHID001</td>
                              <td className="thead">Shubham Singh</td>
                              <td className="thead">8602161019</td>
                              <td className="thead">Mohit</td>
                              <td className="thead">10000</td>
                              <td className="thead">Paid</td>
                              <td className="thead">5000</td>
                              <td className="thead">0</td>
                            </tr>
                            <tr className="table-row">
                              <td className="thead">1</td>
                              <td className="thead">18-03-2024</td>
                              <td className="thead">1</td>
                              <td className="thead">DHID001</td>
                              <td className="thead">Shubham Singh</td>
                              <td className="thead">8602161019</td>
                              <td className="thead">Mohit</td>
                              <td className="thead">10000</td>
                              <td className="thead">Paid</td>
                              <td className="thead">5000</td>
                              <td className="thead">0</td>
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
      </Container>
    </>
  );
};

export default StaffSalaryReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
  th {
    background-color: #201658;
    color: white;
  }
`;
