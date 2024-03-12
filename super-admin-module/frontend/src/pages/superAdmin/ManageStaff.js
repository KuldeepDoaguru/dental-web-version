import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import BranchSelector from "../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Link, useNavigate } from "react-router-dom";

const ManageStaff = () => {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [doctorList, setDoctorList] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [empProfilePicture, setEmpProfilePicture] = useState(null);
  const [inEmpData, setInEmpData] = useState({
    branch: branch.name,
    empName: "",
    empMobile: "",
    empGender: "",
    empEmail: "",
    empDesignation: "",
    empSalary: "",
    empAddress: "",
    status: "",
    morningShiftStartTime: "",
    morningShiftEndTime: "",
    eveningShiftStartTime: "",
    eveningShiftEndTime: "",
    allDayShiftStartTime: "",
    allDayShiftEndTime: "",
    working_days: "",
    password: "",
    empRole: [],
    availability: "",
  });

  const handleEmpProfilePicture = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      // Read the selected file as data URL
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setEmpProfilePicture({
          file: selectedFile,
          imageUrl: reader.result,
        });
      };
    }
  };

  console.log(empProfilePicture);
  console.log(inEmpData);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setInEmpData((prevEmpData) => ({
        ...prevEmpData,
        [name]: checked
          ? [...prevEmpData[name], value]
          : prevEmpData[name].filter((item) => item !== value),
      }));
    } else {
      setInEmpData((prevEmpData) => ({
        ...prevEmpData,
        [name]: value,
      }));
    }
  };

  const handleCheckChange = (event) => {
    const { name, checked } = event.target;

    setInEmpData((prevEmpData) => ({
      ...prevEmpData,
      empRole: checked
        ? [...prevEmpData.empRole, name]
        : prevEmpData.empRole.filter((role) => role !== name),
    }));
  };

  const getDocDetailsList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getEmployeeDataByBranch/${branch.name}`
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

  const enrollEmployeeDetails = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append user.data fields to formData
      for (const key in inEmpData) {
        formData.append(key, inEmpData[key]);
      }
      formData.append("empProfilePicture", empProfilePicture.file);
      console.log(inEmpData, empProfilePicture);

      const { data } = await axios.post(
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/enroll-employee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      cogoToast.success("Registration successful!");
      getDocDetailsList();
      closeUpdatePopup();
    } catch (error) {
      console.log(error);
    }
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
                  <div className="d-flex justify-content-between">
                    <div>
                      <label>Employee Name :</label>
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
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => openAddEmployeePopup()}
                      >
                        Add Employee
                      </button>
                    </div>
                  </div>

                  <div class="table-responsive mt-4">
                    <table class="table table-bordered">
                      <thead className="table-head">
                        <tr>
                          <th className="thead">Emp ID</th>
                          <th className="thead">Name</th>
                          <th className="thead">Mobile</th>
                          <th className="thead">Email</th>
                          <th className="thead">Designation</th>
                          <th className="thead">Role</th>
                          <th className="thead">Salary</th>
                          <th className="thead">Address</th>
                          <th>Profile Picture</th>
                          <th className="" style={{ minWidth: "10rem" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctorList
                          ?.filter((val) => {
                            if (keyword === "") {
                              return true;
                            } else if (
                              val.employee_name
                                .toLowerCase()
                                .includes(keyword.toLowerCase())
                            ) {
                              return val;
                            }
                          })
                          .map((item) => (
                            <>
                              <tr className="table-row">
                                <td className="thead">{item.employee_ID}</td>
                                <td className="thead">{item.employee_name}</td>
                                <td className="thead">
                                  {item.employee_mobile}
                                </td>

                                <td className="thead">{item.employee_email}</td>
                                <td className="thead">
                                  {item.employee_designation}
                                </td>
                                <td className="thead">{item.employee_role}</td>
                                <td className="thead">{item.salary}</td>
                                <td className="thead">{item.address}</td>
                                <td>
                                  <div className="smallImg">
                                    <img
                                      src={item.employee_picture}
                                      alt="profile"
                                    />
                                  </div>
                                </td>
                                <td className="" style={{ minWidth: "13rem" }}>
                                  <Link
                                    to={`/employee-profile/${item.employee_ID}`}
                                  >
                                    <button className="btn btn-warning">
                                      Edit/View
                                    </button>
                                  </Link>

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
                onSubmit={enrollEmployeeDetails}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Name"
                          name="empName"
                          value={inEmpData.empName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Mobile
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Mobile"
                          name="empMobile"
                          value={inEmpData.empMobile}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Gender
                        </label>
                        <select
                          name="empGender"
                          id=""
                          class="form-control w-100"
                          value={inEmpData.empGender}
                          onChange={handleInputChange}
                        >
                          <option value="">select-option</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Email
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Email"
                          name="empEmail"
                          value={inEmpData.empEmail}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Designation
                        </label>
                        <select
                          name="empDesignation"
                          id=""
                          class="form-select"
                          aria-label="Default select example"
                          value={inEmpData.empDesignation}
                          onChange={handleInputChange}
                        >
                          <option value="">select-designation</option>
                          <option value="admin">Admin</option>
                          <option value="receptionist">Receptionist</option>
                          <option value="consultant">Consultant</option>
                          <option value="helper">Helper</option>
                          <option value="lab attendant">Lab Attendent</option>
                          <option value="doctor">Doctor</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Salary
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee salary"
                          name="empSalary"
                          value={inEmpData.empSalary}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Address
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Address"
                          name="empAddress"
                          value={inEmpData.empAddress}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Status
                        </label>
                        <select
                          name="status"
                          id=""
                          class="form-select"
                          aria-label="Default select example"
                          value={inEmpData.status}
                          onChange={handleInputChange}
                        >
                          <option value="">select-status</option>
                          <option value="onboard">Onboard</option>
                          <option value="approved">Approved</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                          <option value="hold">Hold</option>
                          <option value="leave">Leave</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Morning Shift Start Time
                        </label>
                        <input
                          type="time"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Mobile"
                          name="morningShiftStartTime"
                          value={inEmpData.morningShiftStartTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Morning Shift End Time
                        </label>
                        <input
                          type="time"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Mobile"
                          name="morningShiftEndTime"
                          value={inEmpData.morningShiftEndTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Evening Shift Start Time
                        </label>
                        <input
                          type="time"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Mobile"
                          name="eveningShiftStartTime"
                          value={inEmpData.eveningShiftStartTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Evening Shift End Time
                        </label>
                        <input
                          type="time"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Mobile"
                          name="eveningShiftEndTime"
                          value={inEmpData.eveningShiftEndTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          All Day Shift Start Time
                        </label>
                        <input
                          type="time"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Mobile"
                          name="allDayShiftStartTime"
                          value={inEmpData.allDayShiftStartTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          All Day Shift End Time
                        </label>
                        <input
                          type="time"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Mobile"
                          name="allDayShiftEndTime"
                          value={inEmpData.allDayShiftEndTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Working Days
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="working days"
                          name="working_days"
                          value={inEmpData.working_days}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          One Time Login Password
                        </label>
                        <input
                          type="password"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Password"
                          name="password"
                          value={inEmpData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
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
                        id="flexCheckDefault"
                        name="admin"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Admin
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="receptionist"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Receptionist
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="consultant"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Consultant
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="lab attendant"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Lab Attendent
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="doctor"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Doctor
                      </label>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Upload Employee Profile Picture
                      </label>
                      <input
                        type="file"
                        class="p-1 w-100 rounded"
                        placeholder="available stock"
                        accept=".pdf, .jpg, .jpeg, .png"
                        required
                        name="empProfilePicture"
                        onChange={handleEmpProfilePicture}
                      />
                    </div>
                    <div className="mb-3 mx-2">
                      {empProfilePicture && (
                        <img
                          src={empProfilePicture.imageUrl}
                          alt="profile"
                          className="imgData"
                        />
                      )}
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
    overflow: scroll;
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
    text-align: center;
  }
  td {
    text-align: center;
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

  .imgData {
    height: 10rem;
    width: auto;
  }

  .smallImg {
    img {
      height: 6rem;
      width: auto;
    }
  }
`;
