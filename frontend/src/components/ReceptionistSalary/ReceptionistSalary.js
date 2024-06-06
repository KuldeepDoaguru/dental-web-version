import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const ReceptionistSalary = () => {
  return (
    <>
      <Container>
        <div className="container-fluid">
          <div className="row flex-nowrap ">
            <div className="col-lg-12 col-12 ps-0">
              <div className="container mt-3">
                <div className="col-12 col-md-4 mt-5">
                  <div>
                    <h5>Branch : Madan Mahal</h5>
                  </div>
                </div>
              </div>
              <div className="container mt-3">
                <h2 className="text-center">
                  All Receptionist Salary Payment List
                </h2>
                <div className="container mt-5">
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
                          <td className="table-sno" style={{ width: "10%" }}>
                            1
                          </td>
                          <td className="table-small" style={{ width: "15%" }}>
                            Mona Mishra
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            Receptionist
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            20000
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            15000
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            5000
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
                            Suhani Kewat
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            Receptionist
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            8000
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            9900
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            0
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            1100
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
                            Devi Prashad Dubey
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            Receptionist
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            9000
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            9000
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
                    </table>
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

export default ReceptionistSalary;

const Container = styled.div`
  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }
`;
