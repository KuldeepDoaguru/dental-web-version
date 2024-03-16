import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BranchDetails from "../BranchDetails";
const AllStaffSalar = () => {
  const [designation, setDesignation] = useState("");
  const [keyword, setkeyword] = useState("");

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
                <div className="d-flex justify-content-between mb-2 mt-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <label>
                        <button className="btn btn-info">
                          Search Employee Name
                        </button>{" "}
                      </label>
                      <input
                        type="text"
                        placeholder="search employee name"
                        className="mx-3 p-1 rounded"
                        value={keyword}
                        onChange={(e) =>
                          setkeyword(e.target.value.toLowerCase())
                        }
                      />
                    </div>
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
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                      >
                        <option value="">Select-designation</option>
                        <option value="admin">Admin</option>
                        <option value="doctor">Doctor</option>
                        <option value="lab_assistant">Lab Assistant</option>
                        <option value="helper">Helper</option>
                        <option value="consultant">Consultant</option>
                        <option value="accountant">Acountant</option>
                        <option value="receptionist">Receptionist</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="table-responsive rounded">
                  <table class="table table-bordered rounded shadow">
                    <thead className="table-head">
                      <tr>
                        <th className="table-sno" style={{ width: "3%" }}>
                          SN
                        </th>
                        <th className="table-small">Name</th>
                        <th className="table-small">Designation</th>
                        <th className="table-small">Salary</th>
                        <th className="table-small">Paid Salary</th>
                        <th className="table-small">Due Salary</th>
                        <th className="table-small">Advance</th>
                        <th className="table-small">Pay Date</th>

                        <th className="table-small">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno" style={{ width: "3%" }}>
                          1
                        </td>
                        <td className="table-small">Dr.Shubham patel</td>
                        <td className="table-small">Doctor</td>
                        <td className="table-small">50000</td>
                        <td className="table-small">30000</td>
                        <td className="table-small">20000</td>

                        <td className="table-small">0</td>

                        <td className="table-small">01/04/2024</td>

                        <td className="table-small">
                          <Link to="/PaySlip">
                            <button className="btn">Pay Slip</button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno">2</td>
                        <td className="table-small">Res.Umair Qureshi</td>
                        <td className="table-small">Receptionist</td>
                        <td className="table-small">5000</td>
                        <td className="table-small">5500</td>
                        <td className="table-small">0</td>
                        <td className="table-small">500</td>
                        <td className="table-small">01/04/2024</td>
                        <td className="table-small">
                          <Link to="/PaySlip">
                            <button className="btn">Pay Slip</button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno">3</td>
                        <td className="table-small">Ac.Suhani Patel</td>
                        <td className="table-small">Accountend</td>
                        <td className="table-small">10000</td>
                        <td className="table-small">11000</td>
                        <td className="table-small">0</td>
                        <td className="table-small">1000</td>
                        <td className="table-small">01/04/2024</td>
                        <td className="table-small">
                          <Link to="/PaySlip">
                            <button className="btn">Pay Slip</button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno">4</td>
                        <td className="table-small">Nu.Suhani Kewat</td>
                        <td className="table-small">Nurse</td>
                        <td className="table-small">8000</td>
                        <td className="table-small">3500</td>
                        <td className="table-small">4500</td>
                        <td className="table-small">0</td>
                        <td className="table-small">01/04/2024</td>
                        <td className="table-small">
                          <Link to="/PaySlip">
                            <button className="btn">Pay Slip</button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno">5</td>
                        <td className="table-small">Dr.Devansh Dubey</td>
                        <td className="table-small">Doctor</td>
                        <td className="table-small">30000</td>
                        <td className="table-small">30000</td>
                        <td className="table-small">0</td>
                        <td className="table-small">0</td>
                        <td className="table-small">01/04/2024</td>
                        <td className="table-small">
                          <Link to="/PaySlip">
                            <button className="btn">Pay Slip</button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno">6</td>
                        <td className="table-small">Dr.Shubham patel</td>
                        <td className="table-small">Doctor</td>
                        <td className="table-small">50000</td>
                        <td className="table-small">25000</td>
                        <td className="table-small">25000</td>
                        <td className="table-small">0</td>
                        <td className="table-small">01/04/2024</td>
                        <td className="table-small">
                          <Link to="/PaySlip">
                            <button className="btn">Pay Slip</button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno">7</td>
                        <td className="table-small">Shubham patel</td>
                        <td className="table-small">Helper</td>
                        <td className="table-small">500</td>
                        <td className="table-small">750</td>
                        <td className="table-small">0</td>
                        <td className="table-small">150</td>
                        <td className="table-small">01/04/2024</td>
                        <td className="table-small">
                          <Link to="/PaySlip">
                            <button className="btn">Pay Slip</button>
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

  .table-small {
    button {
      background-color: #201658;
      color: white;
    }
  }
`;
