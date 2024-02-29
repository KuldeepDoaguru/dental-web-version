import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import BranchSelector from "../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ManageStaff = () => {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [doctorList, setDoctorList] = useState([]);

  const getDocDetailsList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getEmployeeDetails/${branch.name}`
      );
      console.log(data);
      setDoctorList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocDetailsList();
  }, []);

  console.log(doctorList);

  const openAddEmployeePopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddEmployee(true);
  };

  const openEditEmployeePopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowEditEmployee(true);
  };

  const closeUpdatePopup = () => {
    setShowAddEmployee(false);
    setShowEditEmployee(false);
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
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    <BranchSelector />
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <h2 className="text-center">Manage Employee</h2>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-success"
                      onClick={() => openAddEmployeePopup()}
                    >
                      Add Employee
                    </button>
                  </div>
                  <div class="table-responsive mt-4">
                    <table class="table table-bordered">
                      <thead className="table-head">
                        <tr>
                          <th className="thead">Emp ID</th>
                          <th className="thead">Name</th>
                          <th className="thead">Mobile</th>
                          <th className="thead">Gender</th>
                          <th className="thead">Email</th>
                          <th className="thead">Designation</th>
                          <th className="thead">Role</th>
                          <th className="thead">Salary</th>
                          <th className="thead">Address</th>
                          <th className="thead">Status</th>
                          <th className="thead">Morning Shift Start Time</th>
                          <th className="thead">Morning Shift End Time</th>
                          <th className="thead">Evening Shift Start Time</th>
                          <th className="thead">Evening Shift End Time</th>
                          <th className="thead">Allday Shift Start Time</th>
                          <th className="thead">Allday Shift End Time</th>
                          <th className="thead">Availability</th>
                          <th className="" style={{ minWidth: "10rem" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctorList?.map((item) => (
                          <>
                            <tr className="table-row">
                              <td className="thead">{item.employee_ID}</td>
                              <td className="thead">{item.employee_name}</td>
                              <td className="thead">{item.employee_mobile}</td>
                              <td className="thead">{item.gender}</td>
                              <td className="thead">{item.employee_email}</td>
                              <td className="thead">
                                {item.employee_designation}
                              </td>
                              <td className="thead">{item.employee_role}</td>
                              <td className="thead">{item.salary}</td>
                              <td className="thead">{item.address}</td>
                              <td className="thead">{item.employee_status}</td>
                              <td className="thead">
                                {item.morning_shift_start_time}
                              </td>
                              <td className="thead">
                                {item.morning_shift_end_time}
                              </td>
                              <td className="thead">
                                {item.evening_shift_start_time}
                              </td>
                              <td className="thead">
                                {item.evening_shift_end_time}
                              </td>
                              <td className="thead">
                                {item.allday_shift_start_time}
                              </td>
                              <td className="thead">
                                {item.allday_shift_end_time}
                              </td>
                              <td className="thead">{item.availability}</td>
                              <td className="" style={{ minWidth: "10rem" }}>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => openEditEmployeePopup()}
                                >
                                  Edit
                                </button>
                                <button className="btn btn-danger mx-1">
                                  Delete
                                </button>
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
          {/* ***************************************************************************************************** */}
          {/* other pop-up */}
          {/* pop-up for adding lab */}
          <div className={`popup-container${showAddEmployee ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Employee</h4>
              <hr />
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <div className="d-flex">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="EMP ID"
                    />
                  </div>
                  <div class="mb-3 mx-2">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Employee Name"
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Mobile
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Employee Mobile"
                    />
                  </div>
                  <div class="mb-3 mx-2">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Email
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Employee Email"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div class="mb-3 w-100">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Designation
                    </label>
                    <select
                      name=""
                      id=""
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Admin</option>
                      <option value="">Receptionist</option>
                      <option value="">Consultant</option>
                      <option value="">Helper</option>
                      <option value="">Lab Attendent</option>
                      <option value="">Doctor</option>
                    </select>
                  </div>
                  <div class="mb-3 mx-2 w-100">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Status
                    </label>
                    <select
                      name=""
                      id=""
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Approved</option>
                      <option value="">Pending</option>
                      <option value="">Rejected</option>
                      <option value="">Hold</option>
                      <option value="">Leave</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Role
                    </label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Admin
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Receptionist
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Consultant
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Lab Attendent
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Doctor
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      One Time Login Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Employee Password"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 mx-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for adding lab */}
          {/* ************************************************************************************* */}

          {/* ***************************************************************************************************** */}
          {/* other pop-up */}
          {/* pop-up for adding lab */}
          <div
            className={`popup-container${showEditEmployee ? " active" : ""}`}
          >
            <div className="popup">
              <h4 className="text-center">Edit Employee Details</h4>
              <hr />
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <div className="d-flex">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="EMP ID"
                    />
                  </div>
                  <div class="mb-3 mx-2">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Employee Name"
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Mobile
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Employee Mobile"
                    />
                  </div>
                  <div class="mb-3 mx-2">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Email
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Employee Email"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div class="mb-3 w-100">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Designation
                    </label>
                    <select
                      name=""
                      id=""
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Admin</option>
                      <option value="">Receptionist</option>
                      <option value="">Consultant</option>
                      <option value="">Helper</option>
                      <option value="">Lab Attendent</option>
                      <option value="">Doctor</option>
                    </select>
                  </div>
                  <div class="mb-3 mx-2 w-100">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Status
                    </label>
                    <select
                      name=""
                      id=""
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value="">Approved</option>
                      <option value="">Pending</option>
                      <option value="">Rejected</option>
                      <option value="">Hold</option>
                      <option value="">Leave</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Employee Role
                  </label>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Admin
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Receptionist
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Consultant
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Lab Attendent
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Doctor
                    </label>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 mx-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for adding lab */}
          {/* ************************************************************************************* */}
        </div>
      </Container>
    </>
  );
};

export default ManageStaff;
const Container = styled.div`
  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    height: auto;
    width: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  th {
    background-color: #004aad;
    color: white;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  label {
    font-weight: bold;
  }

  .thead {
    min-width: 8rem;
  }
`;
