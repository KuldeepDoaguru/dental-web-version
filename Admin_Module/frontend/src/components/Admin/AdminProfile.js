import React, { useState } from "react";
import styled from "styled-components";
// import Card from "../Card";
import { useLocation, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
// import BranchSelector from "../../BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
import HeaderAdmin from "../../pages/admin/HeaderAdmin";
import SiderAdmin from "../../pages/admin/SiderAdmin";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const branch = user.branch_name;
  const { eid } = useParams();
  const location = useLocation();
  const [empData, setEmpData] = useState([]);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [empProfilePicture, setEmpProfilePicture] = useState(null);
  const [inEmpData, setInEmpData] = useState({
    branch: branch,
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

  console.log(eid);
  const goBack = () => {
    window.history.go(-1);
  };

  const openEditEmployeePopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowEditEmployee(true);
  };

  const closeUpdatePopup = () => {
    setShowEditEmployee(false);
  };

  const getEmployeeData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getEmployeeDetails/${branch}/${user.employee_ID}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setEmpData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    getEmployeeData();
  }, [branch]);

  console.log(empData);

  const editEmployeeData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      // Append user.data fields to formData
      for (const key in inEmpData) {
        formData.append(key, inEmpData[key]);
      }
      formData.append("empProfilePicture", empProfilePicture?.file);
      console.log(inEmpData, empProfilePicture);

      const response = await axios.put(
        `https://dentalguruadmin.doaguru.com//api/v1/admin/editEmployeeDetails/${branch}/${user.employee_ID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      cogoToast.success("data updated successfuly");
      closeUpdatePopup();
      getEmployeeData();
    } catch (error) {
      console.log(error);
    }
  };
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
              <div className="col-lg-11 col-11 ps-0" style={{marginTop:"4rem"}}>
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    {/* <BranchSelector /> */}
                  </div>
                </div>
                <div className="container-fluid mt-4">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  {/* <Card /> */}
                </div>
                <div className="container shadow p-3 mt-5 bg-body rounded">
                  <div className="row">
                    <div className="col-lg-12 col-12">
                      <div className="text-start p-2">
                        <div className="d-flex justify-content-between">
                          <div>
                            {" "}
                            <h3>Employee Profile</h3>
                          </div>
                          {/* <div>
                            <button
                              className="btn btn-warning fw-bold shadow"
                              onClick={() => openEditEmployeePopup()}
                            >
                              Update Details
                            </button>
                          </div> */}
                        </div>

                        <hr />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <img
                        src={empData[0]?.employee_picture}
                        alt="doctor-profile"
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-lg-8">
                      <div className="row g-3">
                        <div className="col-lg-4">
                          <label className="text-info">Employee ID</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">{empData[0]?.employee_ID}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Employee Name</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">{empData[0]?.employee_name}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Email</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p
                              className="m-0"
                              style={{ wordWrap: "break-word" }}
                            >
                              {empData[0]?.employee_email}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Gender</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">{empData[0]?.gender}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Mobile Number</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">{empData[0]?.employee_mobile}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Address</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">{empData[0]?.address}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Designation</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">
                              {empData[0]?.employee_designation}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Salary</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">{empData[0]?.salary}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Status</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">{empData[0]?.employee_status}</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Availability</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">{empData[0]?.availability}</p>
                          </div>
                        </div>
                        {/* <div className="col-lg-4">
                          <label className="text-info">
                            Morning Shift Start Time
                          </label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">
                              {empData[0]?.morning_shift_start_time
                                ? empData[0]?.morning_shift_start_time
                                : " - "}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">
                            Morning Shift End Time
                          </label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">
                              {empData[0]?.morning_shift_end_time
                                ? empData[0]?.morning_shift_end_time
                                : " - "}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">
                            Evening Shift Start Time
                          </label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">
                              {empData[0]?.evening_shift_start_time
                                ? empData[0]?.evening_shift_start_time
                                : " - "}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">
                            Evening Shift End Time
                          </label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">
                              {empData[0]?.evening_shift_end_time
                                ? empData[0]?.evening_shift_end_time
                                : " - "}
                            </p>
                          </div>
                        </div> */}
                        <div className="col-lg-4">
                          <label className="text-info">
                            All Day Shift Start Time
                          </label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">
                              {
                                empData[0]?.allday_shift_start_time?.split(
                                  "."
                                )[0]
                              }
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">
                            All Day Shift End Time
                          </label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">
                              {empData[0]?.allday_shift_end_time?.split(".")[0]}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Working Days</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">
                              {empData[0]?.working_days
                                ? empData[0]?.working_days
                                : " - "}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Employee Role</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">
                              {empData[0]?.employee_role
                                ? empData[0]?.employee_role
                                : " - "}
                            </p>
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

        {/* ***************************************************************************************************** */}
        {/* other pop-up */}
        {/* pop-up for adding lab */}
        <div className={`popup-container${showEditEmployee ? " active" : ""}`}>
          <div className="popup">
            <h4 className="text-center">Edit Employee Details</h4>
            <hr />
            <form className="d-flex flex-column" onSubmit={editEmployeeData}>
              <div className="container">
                <div className="row">
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Employee Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder={empData[0]?.employee_name}
                        name="empName"
                        value={inEmpData.empName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Employee Mobile
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder={empData[0]?.employee_mobile}
                        name="empMobile"
                        value={inEmpData.empMobile}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
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
                      <label for="exampleFormControlInput1" class="form-label">
                        Employee Email
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder={empData[0]?.employee_email}
                        name="empEmail"
                        value={inEmpData.empEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
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
                      <label for="exampleFormControlInput1" class="form-label">
                        Employee Salary
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder={empData[0]?.salary}
                        name="empSalary"
                        value={inEmpData.empSalary}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Employee Address
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder={empData[0]?.address}
                        name="empAddress"
                        value={inEmpData.empAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
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
                  {/* <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Morning Shift Start Time
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="morningShiftStartTime"
                        value={inEmpData.morningShiftStartTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Morning Shift End Time
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="morningShiftEndTime"
                        value={inEmpData.morningShiftEndTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Evening Shift Start Time
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="eveningShiftStartTime"
                        value={inEmpData.eveningShiftStartTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Evening Shift End Time
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="eveningShiftEndTime"
                        value={inEmpData.eveningShiftEndTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div> */}
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        All Day Shift Start Time
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="allDayShiftStartTime"
                        value={inEmpData.allDayShiftStartTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        All Day Shift End Time
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="allDayShiftEndTime"
                        value={inEmpData.allDayShiftEndTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Working Days
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder={empData[0]?.working_days}
                        name="working_days"
                        value={inEmpData.working_days}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
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
                      name="empProfilePicture"
                      onChange={handleEmpProfilePicture}
                    />
                  </div>
                  <div className="mb-3 mx-2">
                    {empProfilePicture ? (
                      <img
                        src={empProfilePicture.imageUrl}
                        alt="profile"
                        className="imgData"
                      />
                    ) : (
                      <img
                        src={empData[0]?.employee_picture}
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
      </Container>
    </>
  );
};

export default AdminProfile;
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

  .text-info {
    font-size: 1.5rem;
  }

  p {
    font-size: 1.2rem;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  .imgData {
    height: 8rem;
    width: auto;
  }
`;
