import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sider from "../Sider";
import BranchDetails from "../BranchDetails";
const DueByUs = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <div className="container-fluid">
                  <div className="row flex-nowrap ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-12 ps-0">
                      <BranchDetails />

                      <div className="container mt-3">
                        <h2 className="text-center">All Due Amount </h2>
                        <div className="container mt-5">
                          <div class="table-responsive rounded">
                            <table class="table table-bordered rounded shadow">
                              <thead className="table-head">
                                <tr>
                                  <th
                                    className="table-sno"
                                    style={{ width: "3%" }}
                                  >
                                    SN
                                  </th>
                                  <th
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    Branch Name
                                  </th>
                                  <th
                                    className="table-small"
                                    style={{ width: "15%" }}
                                  >
                                    Name
                                  </th>
                                  <th
                                    className="table-small"
                                    style={{ width: "15%" }}
                                  >
                                    For
                                  </th>
                                  <th
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    Total Amount
                                  </th>
                                  <th
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    Due Amount
                                  </th>
                                  <th
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    Due Date
                                  </th>
                                  <th
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    Action
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
                                    style={{ width: "15%" }}
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
                                    Salary
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    5000
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    2000
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    01/04/2024
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    <Link to="/AllDuaAmount">
                                      <button
                                        className="btn"
                                        style={{
                                          backgroundColor: "#FFA600",
                                        }}
                                      >
                                        Get Action
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>

                              <tbody>
                                <tr className="table-row">
                                  <td
                                    className="table-sno"
                                    style={{ width: "10%" }}
                                  >
                                    2
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "15%" }}
                                  >
                                    Madan Mahal
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "20%" }}
                                  >
                                    Devi Prashad
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    Machine
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    25000
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    13000
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    01/02/2024
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    <Link to="/AllDuaAmount">
                                      <button
                                        className="btn"
                                        style={{
                                          backgroundColor: "#FFA600",
                                        }}
                                      >
                                        Get Action
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>

                              <tbody>
                                <tr className="table-row">
                                  <td
                                    className="table-sno"
                                    style={{ width: "10%" }}
                                  >
                                    3
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "15%" }}
                                  >
                                    Madan Mahal
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "20%" }}
                                  >
                                    Raju
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    Root canal
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    5500
                                  </td>

                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    3000
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    01/04/2024
                                  </td>
                                  <td
                                    className="table-small"
                                    style={{ width: "10%" }}
                                  >
                                    <Link to="/AllDuaAmount">
                                      <button
                                        className="btn"
                                        style={{
                                          backgroundColor: "#FFA600",
                                        }}
                                      >
                                        Get Action
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
        </div>
      </Container>
    </>
  );
};

export default DueByUs;

const Container = styled.div``;
