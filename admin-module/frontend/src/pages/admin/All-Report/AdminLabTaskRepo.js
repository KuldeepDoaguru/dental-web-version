import React from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import Header from "../../../components/Header";
import Sider from "../../../components/Sider";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";

const AdminLabTaskRepo = () => {
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
                          <div class="container-fluid d-flex justify-content-center">
                            <h2 className="">Lab Task Report</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container-fluid mt-2">
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
                        <div class="table-responsive mt-4">
                          <table class="table table-bordered">
                            <thead className="table-head">
                              <tr>
                                <th>Lab Task Name</th>
                                <th>Lab Task Code</th>
                                <th>Waiting Days for Task</th>
                                <th>Default Lab</th>
                                <th>Code</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="table-row">
                                <td>Full Dentures</td>
                                <td>LAB2015</td>
                                <td>same day</td>
                                <td>Lab Name</td>
                                <td>500</td>
                                <td>12/12/2024</td>
                              </tr>
                              <tr className="table-row">
                                <td>Full Dentures</td>
                                <td>LAB2015</td>
                                <td>same day</td>
                                <td>Lab Name</td>
                                <td>500</td>
                                <td>12/12/2024</td>
                              </tr>
                              <tr className="table-row">
                                <td>Full Dentures</td>
                                <td>LAB2015</td>
                                <td>same day</td>
                                <td>Lab Name</td>
                                <td>500</td>
                                <td>12/12/2024</td>
                              </tr>
                              <tr className="table-row">
                                <td>Full Dentures</td>
                                <td>LAB2015</td>
                                <td>same day</td>
                                <td>Lab Name</td>
                                <td>500</td>
                                <td>12/12/2024</td>
                              </tr>
                              <tr className="table-row">
                                <td>Full Dentures</td>
                                <td>LAB2015</td>
                                <td>same day</td>
                                <td>Lab Name</td>
                                <td>500</td>
                                <td>12/12/2024</td>
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

export default AdminLabTaskRepo;
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
