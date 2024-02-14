import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import { IoMdArrowRoundBack } from "react-icons/io";

const EmpDetailsRepo = () => {
  const location = useLocation();

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
                <div className="container mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <h6>Select Branch : </h6>
                      </div>
                      <div>
                        <select name="branch" id="branch" className="mx-2">
                          <option value="Madan Mahal">Madan Mahal</option>
                          <option value="Madan Mahal">Ranjhi</option>
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
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Employee Details Report</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container mt-3">
                        <div className="d-flex justify-content-between mb-2 mt-4">
                          <div className="d-flex justify-content-between">
                            <button className="btn btn-warning mx-2">
                              Download Report
                            </button>
                          </div>

                          <div className="d-flex justify-content-between">
                            <div>
                              <button className="btn btn-secondary">
                                Filter by Designation
                              </button>
                            </div>

                            <div className="mx-2">
                              <select
                                class="form-select"
                                aria-label="Default select example"
                              >
                                <option selected>Select Designation</option>
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Lab Assistant</option>
                                <option value="1">Helper</option>
                                <option value="2">Consultant</option>
                                <option value="3">Acountant</option>
                                <option value="1">Receptionist</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="table-responsive rounded">
                          <table class="table table-bordered rounded shadow">
                            <thead className="table-head">
                              <tr>
                                <th
                                  className="table-sno"
                                  style={{ width: "10%" }}
                                >
                                  id
                                </th>
                                <th
                                  className="table-small"
                                  style={{ width: "20%" }}
                                >
                                  Branch Name
                                </th>
                                <th
                                  className="table-small"
                                  style={{ width: "20%" }}
                                >
                                  Doctor Name
                                </th>
                                <th
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  Mobile
                                </th>
                                <th
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  Email
                                </th>
                                <th
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  Gender
                                </th>
                                <th
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  Address
                                </th>
                                <th
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  View Details
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="table-row">
                                <td
                                  className="table-sno"
                                  style={{ width: "10%" }}
                                >
                                  1
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "20%" }}
                                >
                                  Madan Mahal
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "20%" }}
                                >
                                  Shubham patel
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  8602161019
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  doctor@gmail.com
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  Male
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  Jabalpur
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  <Link to="/doctor-profile">
                                    <button className="btn btn-warning">
                                      View Details
                                    </button>
                                  </Link>
                                </td>
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

export default EmpDetailsRepo;
const Container = styled.div``;
