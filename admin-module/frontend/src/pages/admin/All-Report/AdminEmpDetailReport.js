import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import { IoMdArrowRoundBack } from "react-icons/io";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";

const AdminEmpDetailReport = () => {
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
                              <button className="btn btn-info">
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
                                <th className="table-sno">EMP ID</th>
                                <th className="table-small">Branch Name</th>
                                <th className="table-small">Employee Name</th>
                                <th>Role</th>
                                <th>Designation</th>
                                <th>Salary</th>

                                <th className="table-small">Mobile</th>
                                <th className="table-small">Email</th>
                                <th className="table-small">Gender</th>
                                <th className="table-small">Address</th>
                                <th>Status</th>
                                <th className="table-small">View Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="table-row">
                                <td className="table-sno">1</td>
                                <td className="table-small">Madan Mahal</td>
                                <td className="table-small">Shubham patel</td>
                                <td>Doctor</td>
                                <td>Doctor</td>
                                <td>30000</td>
                                <td className="table-small">8602161019</td>
                                <td className="table-small">
                                  doctor@gmail.com
                                </td>
                                <td className="table-small">Male</td>
                                <td className="table-small">Jabalpur</td>
                                <td>Active</td>
                                <td className="table-small">
                                  <Link to="/admin-doctor-profile">
                                    <button className="btn btn-warning">
                                      View Details
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                              <tr className="table-row">
                                <td className="table-sno">1</td>
                                <td className="table-small">Madan Mahal</td>
                                <td className="table-small">Shubham patel</td>
                                <td>Doctor</td>
                                <td>Doctor</td>
                                <td>30000</td>
                                <td className="table-small">8602161019</td>
                                <td className="table-small">
                                  doctor@gmail.com
                                </td>
                                <td className="table-small">Male</td>
                                <td className="table-small">Jabalpur</td>
                                <td>Active</td>
                                <td className="table-small">
                                  <Link to="/admin-doctor-profile">
                                    <button className="btn btn-warning">
                                      View Details
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                              <tr className="table-row">
                                <td className="table-sno">1</td>
                                <td className="table-small">Madan Mahal</td>
                                <td className="table-small">Shubham patel</td>
                                <td>Doctor</td>
                                <td>Doctor</td>
                                <td>30000</td>
                                <td className="table-small">8602161019</td>
                                <td className="table-small">
                                  doctor@gmail.com
                                </td>
                                <td className="table-small">Male</td>
                                <td className="table-small">Jabalpur</td>
                                <td>Active</td>
                                <td className="table-small">
                                  <Link to="/admin-doctor-profile">
                                    <button className="btn btn-warning">
                                      View Details
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                              <tr className="table-row">
                                <td className="table-sno">1</td>
                                <td className="table-small">Madan Mahal</td>
                                <td className="table-small">Shubham patel</td>
                                <td>Doctor</td>
                                <td>Doctor</td>
                                <td>30000</td>
                                <td className="table-small">8602161019</td>
                                <td className="table-small">
                                  doctor@gmail.com
                                </td>
                                <td className="table-small">Male</td>
                                <td className="table-small">Jabalpur</td>
                                <td>Active</td>
                                <td className="table-small">
                                  <Link to="/admin-doctor-profile">
                                    <button className="btn btn-warning">
                                      View Details
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                              <tr className="table-row">
                                <td className="table-sno">1</td>
                                <td className="table-small">Madan Mahal</td>
                                <td className="table-small">Shubham patel</td>
                                <td>Doctor</td>
                                <td>Doctor</td>
                                <td>30000</td>
                                <td className="table-small">8602161019</td>
                                <td className="table-small">
                                  doctor@gmail.com
                                </td>
                                <td className="table-small">Male</td>
                                <td className="table-small">Jabalpur</td>
                                <td>Active</td>
                                <td className="table-small">
                                  <Link to="/admin-doctor-profile">
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

export default AdminEmpDetailReport;
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
