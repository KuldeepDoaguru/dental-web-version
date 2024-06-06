import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BranchDetails from "../BranchDetails";
import axios from "axios";
import { useSelector } from "react-redux";

const AllStaffSalar = () => {
  const user = useSelector((state) => state.user);
  const token = user.token;
  console.log(token);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [designation, setDesignation] = useState("");
  const [keyword, setkeyword] = useState("");
  const [empList, setEmpList] = useState([]);

  const getEmployeeList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getEmployeeListByBranch/${user.branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmpList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  console.log(empList);
  console.log(designation);

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
                        <th className="table-sno">SN</th>
                        <th>EMP ID</th>
                        <th className="table-small">Employee Name</th>
                        <th className="table-small">Designation</th>
                        <th>Gross Salary</th>
                        <th className="table-small">Payable Salary</th>
                        <th className="table-small">Paid Salary</th>
                        <th className="table-small">Due Salary</th>
                        <th className="table-small">Advance</th>
                        <th className="table-small">Pay Date</th>
                        <th>Salary Month</th>
                        <th className="table-small">Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empList
                        ?.filter((val) => {
                          const desEmp = val.employee_designation.toLowerCase();
                          if (designation === "") {
                            return true;
                          } else {
                            return designation === desEmp;
                          }
                        })
                        .filter((val) => {
                          const name = val.employee_name.toLowerCase();
                          const lowerKeyword = keyword.toLowerCase();
                          if (keyword === "") {
                            return true;
                          } else {
                            if (name.startsWith(lowerKeyword)) {
                              return true;
                            } else {
                              if (name.includes(lowerKeyword)) {
                                return true;
                              }
                            }
                          }
                        })
                        .map((item) => (
                          <>
                            <tr className="table-row">
                              <td className="table-sno">{item.sl_id}</td>
                              <td className="table-small">
                                {item.employee_ID}
                              </td>
                              <td className="table-small">
                                {item.employee_name}
                              </td>
                              <td className="table-small">
                                {item.employee_designation}
                              </td>
                              <td>{item.salary}</td>
                              <td className="table-small">
                                {item.payable_salary}
                              </td>
                              <td className="table-small">
                                {item.paid_salary}
                              </td>
                              <td className="table-small">{item.due_salary}</td>
                              <td className="table-small">
                                {item.advance_payment}
                              </td>
                              <td className="table-small">
                                {item.pay_date.split("T")[0]}
                              </td>
                              <td className="table-small">{item.pay_month}</td>
                              <td className="table-small">{item.pay_status}</td>
                              <td className="table-small">
                                <Link to={`/PaySlip/${item.sl_id}`}>
                                  <button className="btn">Pay Slip</button>
                                </Link>
                              </td>
                            </tr>
                          </>
                        ))}
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
