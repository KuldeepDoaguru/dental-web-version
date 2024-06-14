import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSlice";
import moment from "moment";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log(currentUser);

  return (
    <>
      <Wrapper>
        <div className="container shadow p-3 mt-5 bg-body rounded">
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="text-start p-2">
                <h3>Doctor Profile</h3>
                <hr />
              </div>
            </div>
          </div>
          {currentUser && (
            <div className="row">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <img
                  src={currentUser.employee_picture}
                  alt="doctor-profile"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                <div className="row g-3">
                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <label className="text-info">UserID</label>
                    <div className="shadow-none p-1 bg-light rounded">
                      <p className="m-0">{currentUser.employee_ID}</p>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <label className="text-info">User Name</label>
                    <div className="shadow-none p-1 bg-light rounded">
                      <p className="m-0">Dr. {currentUser.employee_name}</p>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <label className="text-info">Email</label>
                    <div className="shadow-none p-1 bg-light rounded">
                      <p className="m-0">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <label className="text-info">Mobile No.</label>
                    <div className="shadow-none p-1 bg-light rounded">
                      <p className="m-0">{currentUser.employee_mobile}</p>
                    </div>
                  </div>

                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <label className="text-info">Designation</label>
                    <div className="shadow-none p-1 bg-light rounded">
                      <p className="m-0">{currentUser.employee_designation}</p>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <label className="text-info">Address</label>
                    <div className="shadow-none p-1 bg-light rounded">
                      <p className="m-0">{currentUser.address}</p>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <label className="text-info">Working Days</label>
                    <div className="shadow-none p-1 bg-light rounded">
                      <p className="m-0">
                        {currentUser.working_days === null ||
                        currentUser.working_days === "null"
                          ? "--"
                          : currentUser.working_days}
                      </p>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <label className="text-info">Morning Working Shift</label>
                    <div className="shadow-none p-1 bg-light rounded">
                      <p className="m-0">
                        {moment(
                          currentUser.morning_shift_start_time,
                          "HH:mm:ss.SSSSSS"
                        ).format("h:mm A")}{" "}
                        -{" "}
                        {moment(
                          currentUser.morning_shift_end_time,
                          "HH:mm:ss.SSSSSS"
                        ).format("h:mm A")}{" "}
                      </p>
                    </div>
                  </div>

                  <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <label className="text-info">Evening Working Shift</label>
                    <div className="shadow-none p-1 bg-light rounded">
                      <p className="m-0">
                        {moment(
                          currentUser.evening_shift_start_time,
                          "HH:mm:ss.SSSSSS"
                        ).format("h:mm A")}{" "}
                        -{" "}
                        {moment(
                          currentUser.evening_shift_end_time,
                          "HH:mm:ss.SSSSSS"
                        ).format("h:mm A")}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Profile;
const Wrapper = styled.div`
  img {
    width: 100%;
    height: 26rem;
  }
`;
