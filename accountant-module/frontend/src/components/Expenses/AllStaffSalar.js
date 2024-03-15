import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BranchDetails from "../BranchDetails";
const AllStaffSalar = () => {
  return (
    <Container>
      <div className="container-fluid">
        <div className="row flex-nowrap ">
          <div className="col-lg-12 col-12 ps-0">
            <div className="container mt-3">
              <div className="col-12 col-md-4 mt-5"></div>
            </div>
            <div className="container">
              <h2 className="text-center">All Staff Salary List</h2>
              <div className="container mt-4">
                <div class="table-responsive rounded">
                  <table class="table table-bordered rounded shadow">
                    <thead className="table-head">
                      <tr>
                        <th className="table-sno" style={{ width: "3%" }}>
                          SN
                        </th>
                        <th className="table-small" style={{ width: "10%" }}>
                          Name
                        </th>
                        <th className="table-small" style={{ width: "15%" }}>
                          Designation
                        </th>
                        <th className="table-small" style={{ width: "10%" }}>
                          Salary
                        </th>
                        <th className="table-small" style={{ width: "10%" }}>
                          Paid Salary
                        </th>
                        <th className="table-small" style={{ width: "10%" }}>
                          Due Salary
                        </th>
                        <th className="table-small" style={{ width: "10%" }}>
                          Advance
                        </th>
                        <th className="table-small" style={{ width: "10%" }}>
                          Pay Date
                        </th>

                        <th className="table-small" style={{ width: "10%" }}>
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno" style={{ width: "3%" }}>
                          1
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          Dr.Shubham patel
                        </td>
                        <td className="table-small" style={{ width: "20%" }}>
                          Doctor
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          50000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          30000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          20000
                        </td>

                        <td className="table-small" style={{ width: "10%" }}>
                          0
                        </td>

                        <td className="table-small" style={{ width: "10%" }}>
                          01/04/2024
                        </td>

                        <td className="table-small" style={{ width: "15%" }}>
                          <Link to="/PaySlip">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FFA600",
                              }}
                            >
                              Action
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno" style={{ width: "10%" }}>
                          2
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          Res.Umair Qureshi
                        </td>
                        <td className="table-small" style={{ width: "20%" }}>
                          Receptionist
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          5000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          5500
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          0
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          500
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          01/04/2024
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          <Link to="/PaySlip">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FFA600",
                              }}
                            >
                              Action
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno" style={{ width: "10%" }}>
                          3
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          Ac.Suhani Patel
                        </td>
                        <td className="table-small" style={{ width: "20%" }}>
                          Accountend
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          10000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          11000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          0
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          1000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          01/04/2024
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          <Link to="/PaySlip">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FFA600",
                              }}
                            >
                              Action
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno" style={{ width: "10%" }}>
                          4
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          Nu.Suhani Kewat
                        </td>
                        <td className="table-small" style={{ width: "20%" }}>
                          Nurse
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          8000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          3500
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          4500
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          0
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          01/04/2024
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          <Link to="/PaySlip">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FFA600",
                              }}
                            >
                              Action
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno" style={{ width: "10%" }}>
                          5
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          Dr.Devansh Dubey
                        </td>
                        <td className="table-small" style={{ width: "20%" }}>
                          Doctor
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          30000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          30000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          0
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          0
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          01/04/2024
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          <Link to="/PaySlip">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FFA600",
                              }}
                            >
                              Action
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno" style={{ width: "10%" }}>
                          6
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          Dr.Shubham patel
                        </td>
                        <td className="table-small" style={{ width: "20%" }}>
                          Doctor
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          50000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          25000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          25000
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          0
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          01/04/2024
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          <Link to="/PaySlip">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FFA600",
                              }}
                            >
                              Action
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno" style={{ width: "10%" }}>
                          7
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          Shubham patel
                        </td>
                        <td className="table-small" style={{ width: "20%" }}>
                          Helper
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          500
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          750
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          0
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          150
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          01/04/2024
                        </td>
                        <td className="table-small" style={{ width: "15%" }}>
                          <Link to="/PaySlip">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FFA600",
                              }}
                            >
                              Action
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
    </Container>
  );
};

export default AllStaffSalar;

const Container = styled.div`
  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }
`;
