import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";

const DoctorList = () => {
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
                      {/* <Link to="/register-doctor">
                        <button className="btn btn-success">Add Doctor</button>
                      </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container mt-3">
                  <h3 className="text-center">Doctor List</h3>
                  <div className="container mt-3">
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">doc_id</th>
                            <th className="table-small">Doctor Name</th>
                            <th className="table-small">Mobile</th>
                            <th className="table-small">Email</th>
                            <th className="table-small">Gender</th>
                            <th className="table-small">Address</th>
                            <th className="table-small">
                              FeedBack by Receptionist
                            </th>
                            <th>Doctor Availability</th>
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
                            <td className="table-small">
                              <Link to="/doctor-profile">
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
                            <td className="table-small">
                              <Link to="/doctor-profile">
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
                            <td className="table-small">
                              <Link to="/doctor-profile">
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
                            <td className="table-small">
                              <Link to="/doctor-profile">
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
                            <td className="table-small">
                              <Link to="/doctor-profile">
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
                            <td className="table-small">
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
      </Container>
    </>
  );
};

export default DoctorList;
const Container = styled.div`
  th {
    background-color: #004aad;
    color: white;
  }
`;
