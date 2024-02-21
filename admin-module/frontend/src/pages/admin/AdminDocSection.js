import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";

const AdminDocSection = () => {
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
                  <h3 className="text-center">Doctor List</h3>
                  <div className="container-fluid mt-3">
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">EMP_ID</th>
                            <th className="table-small">Doctor Name</th>
                            <th className="table-small">Mobile</th>
                            <th className="table-small">Email</th>
                            <th className="table-small">Gender</th>
                            <th className="table-small">Address</th>
                            <th className="table-small">
                              Feedback by Receptionist
                            </th>
                            <th>Doctor Availability</th>
                            <th>Shift Time</th>
                            <th className="table-small">View Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">8602161019</td>
                            <td className="table-small">doctor@gmail.com</td>
                            <td className="table-small">Male</td>
                            <td className="table-small">Jabalpur</td>
                            <td>He is a good doctor</td>
                            <td>Available</td>
                            <td>12:00PM - 7:00PM</td>
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
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">8602161019</td>
                            <td className="table-small">doctor@gmail.com</td>
                            <td className="table-small">Male</td>
                            <td className="table-small">Jabalpur</td>
                            <td>He is a good doctor</td>
                            <td>Available</td>
                            <td>12:00PM - 7:00PM</td>
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
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">8602161019</td>
                            <td className="table-small">doctor@gmail.com</td>
                            <td className="table-small">Male</td>
                            <td className="table-small">Jabalpur</td>
                            <td>He is a good doctor</td>
                            <td>Available</td>
                            <td>12:00PM - 7:00PM</td>
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
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">8602161019</td>
                            <td className="table-small">doctor@gmail.com</td>
                            <td className="table-small">Male</td>
                            <td className="table-small">Jabalpur</td>
                            <td>He is a good doctor</td>
                            <td>Available</td>
                            <td>12:00PM - 7:00PM</td>
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
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">8602161019</td>
                            <td className="table-small">doctor@gmail.com</td>
                            <td className="table-small">Male</td>
                            <td className="table-small">Jabalpur</td>
                            <td>He is a good doctor</td>
                            <td>Available</td>
                            <td>12:00PM - 7:00PM</td>
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
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">8602161019</td>
                            <td className="table-small">doctor@gmail.com</td>
                            <td className="table-small">Male</td>
                            <td className="table-small">Jabalpur</td>
                            <td>He is a good doctor</td>
                            <td>Available</td>
                            <td>12:00PM - 7:00PM</td>
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
      </Container>
    </>
  );
};

export default AdminDocSection;
const Container = styled.div`
  th {
    background-color: #1abc9c;
    color: black;
  }

  .select-style {
    border: none;
    background-color: Admin #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
