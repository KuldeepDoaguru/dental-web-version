import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import { FaCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";

const AdminEmpAttendReport = () => {
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
                            <h2 className="">
                              Employee Attendance and Time Sheet
                            </h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container-fluid">
                        <div className="container-fluid">
                          <div className="d-flex justify-content-between mb-2 mt-4">
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
                          <div class="table-responsive">
                            <table class="table table-bordered">
                              <thead className="table-head">
                                <tr>
                                  <th>EMP ID</th>
                                  <th>Employee Name</th>
                                  <th>1 Feb</th>
                                  <th>2 Feb</th>
                                  <th>3 Feb</th>
                                  <th>4 Feb</th>
                                  <th>5 Feb</th>
                                  <th>6 Feb</th>
                                  <th>7 Feb</th>
                                  <th>8 Feb</th>
                                  <th>9 Feb</th>
                                  <th>10 Feb</th>
                                  <th>11 Feb</th>
                                  <th>12 Feb</th>
                                  <th>13 Feb</th>
                                  <th>14 Feb</th>
                                  <th>15 Feb</th>
                                  <th>16 Feb</th>
                                  <th>17 Feb</th>
                                  <th>18 Feb</th>
                                  <th>19 Feb</th>
                                  <th>20 Feb</th>
                                  <th>21 Feb</th>
                                  <th>22 Feb</th>
                                  <th>23 Feb</th>
                                  <th>24 Feb</th>
                                  <th>25 Feb</th>
                                  <th>26 Feb</th>
                                  <th>27 Feb</th>
                                  <th>28 Feb</th>
                                  <th>29 Feb</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="table-row">
                                  <td>007</td>
                                  <td>Mahesh Kuldeep</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                </tr>
                                <tr className="table-row">
                                  <td>007</td>
                                  <td>Mahesh Kuldeep</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                </tr>
                                <tr className="table-row">
                                  <td>007</td>
                                  <td>Mahesh Kuldeep</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                </tr>
                                <tr className="table-row">
                                  <td>007</td>
                                  <td>Mahesh Kuldeep</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                </tr>
                                <tr className="table-row">
                                  <td>007</td>
                                  <td>Mahesh Kuldeep</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
                                  <td>9 hrs</td>
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
        </div>
      </Container>
    </>
  );
};

export default AdminEmpAttendReport;
const Container = styled.div`
  .table {
    overflow-x: auto;
    th {
      background-color: #1abc9c;
      color: #000;
    }
    td {
      font-weight: bold;
    }
  }
  .table::-webkit-scrollbar {
    width: 0;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
