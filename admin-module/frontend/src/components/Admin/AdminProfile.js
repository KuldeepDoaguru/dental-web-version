import React, { useState } from "react";
import styled from "styled-components";
// import Header from "../../Header";
// import Sider from "../../Sider";
// import Card from "../Card";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import HeaderAdmin from "../../pages/admin/HeaderAdmin";
import SiderAdmin from "../../pages/admin/SiderAdmin";

const AdminProfile = () => {
  const location = useLocation();
  const [showUpdateAdmDetails, setShowUpdateAdmDetails] = useState(false);

  const openUpdateAdmDetailsPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowUpdateAdmDetails(true);
  };

  const closeUpdatePopup = () => {
    setShowUpdateAdmDetails(false);
  };

  const goBack = () => {
    window.history.go(-1);
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
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-4">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  {/* <Card /> */}
                </div>
                <div className="container-fluid shadow p-3 mt-5 bg-body rounded">
                  <div className="row">
                    <div className="col-lg-12 col-12">
                      <div className="text-start p-2">
                        <h3>Admin Profile</h3>
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <img
                        src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708170776/dental%20guru/admin_a1xw7x.png"
                        alt="doctor-profile"
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-lg-8">
                      <div className="row g-3">
                        <div className="col-lg-4">
                          <label className="text-info">Employee ID</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Doctor ID</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Employee Name</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Name</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Email</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">doctor@doaguru.com</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Sex</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Male</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">City</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Jabalpur</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Designation</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Doctor Designation</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Pin</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">482002</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Country</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">India</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">State</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Madhya Pradesh</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Mobile No.</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">7000070070</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Experience</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">2 Years</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">College Name</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Mahakousal</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">
                            Previous Work Experience
                          </label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">AIIMS</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Working Days</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Mon-Wed</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Working Shift</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">12PM - 2PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-info p-2 fs-4"
                      onClick={openUpdateAdmDetailsPopup}
                    >
                      Update Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**************************************************************************************************/}
          {/* pop-up for updating admin details */}
          <div
            className={`popup-container${
              showUpdateAdmDetails ? " active" : ""
            }`}
          >
            <div className="popup">
              <h2 className="text-center">Update Admin Details</h2>
              <hr />
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <div className="container mt-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <img
                        src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708170776/dental%20guru/admin_a1xw7x.png"
                        alt="doctor-profile"
                        className="img-fluid rounded"
                      />
                      <div>
                        <label htmlFor="" className="fw-bold mt-2 fs-3">
                          Change Picture
                        </label>
                      </div>

                      <input type="file" />
                    </div>
                    <div className="col-lg-8">
                      <div className="row g-3">
                        <div className="col-lg-4">
                          <label className="text-info">Employee ID</label>
                          <input
                            type="text"
                            placeholder="employee ID"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Employee Name</label>
                          <input
                            type="text"
                            placeholder="employee name"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Email</label>
                          <input
                            type="email"
                            placeholder="email"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Sex</label>
                          <select className="shadow-none p-1 bg-light rounded w-100">
                            <option value="">male</option>
                            <option value="">female</option>
                            <option value="">other</option>
                          </select>
                        </div>

                        <div className="col-lg-4">
                          <label className="text-info">City</label>
                          <input
                            type="text"
                            placeholder="city"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Designation</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Doctor Designation</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Pin</label>
                          <input
                            type="text"
                            placeholder="Pin Code"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Country</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">India</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">State</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Madhya Pradesh</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Mobile No.</label>
                          <input
                            type="text"
                            maxLength={10}
                            placeholder="Mobile Number"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Experience</label>
                          <input
                            type="text"
                            placeholder="employee experience"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">College Name</label>
                          <input
                            type="text"
                            placeholder="college"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">
                            Previous Work Experience
                          </label>
                          <input
                            type="text"
                            placeholder="Previous Work Experience"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Working Days</label>
                          <input
                            type="text"
                            placeholder="working days"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">Working Shift</label>
                          <input
                            type="text"
                            placeholder="working shift"
                            className="shadow-none p-1 bg-light rounded w-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-success mt-2 fw-bold shadow"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 mx-2 fw-bold shadow"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for updating admin details*/}
          {/* ************************************************************************************* */}
        </div>
      </Container>
    </>
  );
};

export default AdminProfile;
const Container = styled.div`
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
