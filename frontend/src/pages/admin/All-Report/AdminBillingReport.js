import React from "react";
import styled from "styled-components";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";

const AdminBillingReport = () => {
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };

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
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Billing Reports</h2>
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
                                <th>Bill Date</th>
                                <th>UHID</th>
                                <th>Patient Name</th>
                                <th>Patient Mobile</th>
                                <th>Patient Email</th>
                                <th>Treatment</th>
                                <th>Drugs with Quantity</th>
                                <th>Total Amount</th>
                                <th>Paid Amount</th>
                                <th>Payment Date</th>
                                <th>Payment time</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="table-row">
                                <td>13/02/2024</td>
                                <td>007</td>

                                <td>Mahesh Kuldeep</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>Root Canal</td>
                                <td>Paracetamol 12</td>
                                <td>120</td>
                                <td>120</td>
                                <td>13/02/2024</td>
                                <td>12:00 pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>13/02/2024</td>
                                <td>007</td>

                                <td>Mahesh Kuldeep</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>Root Canal</td>
                                <td>Paracetamol 12</td>
                                <td>120</td>
                                <td>120</td>
                                <td>13/02/2024</td>
                                <td>12:00 pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>13/02/2024</td>
                                <td>007</td>

                                <td>Mahesh Kuldeep</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>Root Canal</td>
                                <td>Paracetamol 12</td>
                                <td>120</td>
                                <td>120</td>
                                <td>13/02/2024</td>
                                <td>12:00 pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>13/02/2024</td>
                                <td>007</td>

                                <td>Mahesh Kuldeep</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>Root Canal</td>
                                <td>Paracetamol 12</td>
                                <td>120</td>
                                <td>120</td>
                                <td>13/02/2024</td>
                                <td>12:00 pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>13/02/2024</td>
                                <td>007</td>

                                <td>Mahesh Kuldeep</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>Root Canal</td>
                                <td>Paracetamol 12</td>
                                <td>120</td>
                                <td>120</td>
                                <td>13/02/2024</td>
                                <td>12:00 pm</td>
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

export default AdminBillingReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  th {
    background-color: #1abc9c;
    color: #000;
  }
`;
