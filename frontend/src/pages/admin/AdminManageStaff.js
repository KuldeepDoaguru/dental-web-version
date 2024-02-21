import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";
import axios from "axios";

const AdminManageStaff = () => {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [showAdminDetails, setShowAdminDetails] = useState([]);
  const [empData, setEmpData] = useState({
    empName: "",
    empMobile: "",
    empEmail: "",
    empDesignation: "",
    password: "",
    empRole: "",
    status: "pending",
  });

  const getEmployeeList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8888/api/v1/admin/getEmployeeDetails"
      );
      console.log(response.data);
      setShowAdminDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      let updatedRoles = empData[name] || ""; // Initialize with empty string if not yet defined

      if (checked) {
        updatedRoles += (updatedRoles ? ", " : "") + value; // Add the checked role with a comma separator
      } else {
        updatedRoles = updatedRoles
          .split(", ")
          .filter((role) => role !== value)
          .join(", "); // Remove the unchecked role
      }

      setEmpData({
        ...empData,
        [name]: updatedRoles, // Set the updated roles string
      });
    } else {
      setEmpData({
        ...empData,
        [name]: value,
      });
    }
  };

  console.log(empData);

  const openAddEmployeePopup = (index, item) => {
    console.log("open pop up");
    setShowAddEmployee(true);
  };

  const openEditEmployeePopup = (index, item) => {
    console.log("open pop up");
    setShowEditEmployee(true);
  };

  const closeUpdatePopup = () => {
    setShowAddEmployee(false);
    setShowEditEmployee(false);
  };

  const handleEnrollEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/api/v1/admin/enroll-employee",
        empData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);
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
                          <th>Emp ID</th>
                          <th>Name</th>
                          <th>Mobile</th>
                          <th>Gender</th>
                          <th>Email</th>
                          <th>Designation</th>
                          <th>Role</th>
                          <th>Salary</th>
                          <th>Address</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showAdminDetails?.map((item, index) => (
                          <>
                            <tr className="table-row">
                              <td>{item.employee_ID}</td>
                              <td>{item.employee_name}</td>
                              <td>{item.employee_mobile}</td>
                              <td>male</td>
                              <td>{item.employee_email}</td>
                              <td>{item.employee_designation}</td>
                              <td>{item.employee_role}</td>
                              <td>30000</td>
                              <td>Jabalpur</td>
                              <td>Active</td>
                              <td>
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
                onSubmit={handleEnrollEmployeeSubmit}
              >
                <div className="">
                  <div class="mb-3 ">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      class="form-control w-100"
                      id="exampleFormControlInput1"
                      placeholder="Employee Name"
                      name="empName"
                      value={empData.empName}
                      required
                      onChange={handleInputChange}
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
                      name="empMobile"
                      value={empData.empMobile}
                      required
                      onChange={handleInputChange}
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
                      name="empEmail"
                      value={empData.empEmail}
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div class="mb-3 w-100">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Designation
                    </label>
                    <select
                      id="empDesignation"
                      class="form-select"
                      aria-label="Default select example"
                      value={empData.empDesignation}
                      onChange={handleInputChange}
                      name="empDesignation"
                    >
                      <option value="Receptionist">Receptionist</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Helper">Helper</option>
                      <option value="Lab Attendant">Lab Attendant</option>
                      <option value="Doctor">Doctor</option>
                    </select>
                  </div>
                  <div className="mb-3 w-100 mx-2">
                    <label for="exampleFormControlInput1" class="form-label">
                      One Time Login Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Employee Password"
                      name="password"
                      value={empData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Employee Role
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Receptionist"
                        id="flexCheckReceptionist"
                        onChange={handleInputChange}
                        name="empRole"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckReceptionist"
                      >
                        Receptionist
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Consultant"
                        id="flexCheckConsultant"
                        onChange={handleInputChange}
                        name="empRole"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckConsultant"
                      >
                        Consultant
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Lab Attendant"
                        id="flexCheckLabAttendant"
                        onChange={handleInputChange}
                        name="empRole"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckLabAttendant"
                      >
                        Lab Attendant
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Doctor"
                        id="flexCheckDoctor"
                        onChange={handleInputChange}
                        name="empRole"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDoctor"
                      >
                        Doctor
                      </label>
                    </div>
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
                <div className="">
                  {/* <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="EMP ID"
                    />
                  </div> */}
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
                      <option value="">Receptionist</option>
                      <option value="">Consultant</option>
                      <option value="">Helper</option>
                      <option value="">Lab Attendent</option>
                      <option value="">Doctor</option>
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

export default AdminManageStaff;
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
    background-color: #1abc9c;
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
`;
