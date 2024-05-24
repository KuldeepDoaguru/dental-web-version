import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DoctorProfile = ({refresh}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const { eid } = useParams();
  console.log(eid);
  const [empData, setEmpData] = useState([]);

  const getEmployeeData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getEmployeeDetails/${branch.name}/${eid}`,
        {
          headers: {
            "Content-Type": "application/json",
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

  useEffect(() => {
    getEmployeeData();
  }, [branch, refresh]);

  console.log(empData);

  return (
    <>
      <Container>
        <div className="container">
          <div className="row">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="emp-img">
                <img
                  src={empData[0]?.employee_picture}
                  alt="doctor-profile"
                  className="img-fluid rounded"
                />
              </div>
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="head-div">
                <h2>Dr. {empData[0]?.employee_name}</h2>
                <p>{empData[0]?.employee_education}</p>
                <div className="mini-sec-one">
                  <div className="row">
                    <div className="col-6">
                      <p>
                        <strong style={{ color: "#1abc9c" }}>
                          Speciality :{" "}
                        </strong>
                        {empData[0]?.speciality}
                      </p>
                      <p>
                        <strong style={{ color: "#1abc9c" }}>
                          Language :{" "}
                        </strong>
                        {empData[0]?.language}
                      </p>
                    </div>
                    <div className="col-6">
                      <p>
                        <strong style={{ color: "#1abc9c" }}>
                          Experience :{" "}
                        </strong>
                        {empData[0]?.experience}
                      </p>
                      <p>
                        <strong style={{ color: "#1abc9c" }}>Type of : </strong>
                        {empData[0]?.type_of}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mid-boxes">
                  <div className="row g-5">
                    <div className="col-xxl-5 col-xl-5 col-md-5 col-sm-12 ms-3 col-12 b-shadow rounded">
                      <div className="box-under rounded">
                        <h4 className="fw-bold">Contact Info</h4>
                        <p>
                          <strong style={{ color: "#1abc9c" }}>
                            Address :{" "}
                          </strong>
                          {empData[0]?.address}
                        </p>
                        <p>
                          <strong style={{ color: "#1abc9c" }}>Email : </strong>
                          {empData[0]?.employee_email}
                        </p>
                        <p>
                          <strong style={{ color: "#1abc9c" }}>Phone : </strong>
                          {empData[0]?.employee_mobile}
                        </p>
                      </div>
                    </div>
                    <div className="col-xxl-5 col-xl-5 col-md-5 col-sm-12 col-12 ms-3 b-shadow rounded">
                      <div className="box-under rounded">
                        <h4 className="fw-bold">Working Hours</h4>
                        <p>
                          <strong style={{ color: "#1abc9c" }}>
                            Morning :{" "}
                          </strong>
                          {empData[0]?.morning_shift_start_time.slice(0, 5)}-
                          {empData[0]?.morning_shift_end_time.slice(0, 5)}
                        </p>
                        <p>
                          <strong style={{ color: "#1abc9c" }}>
                            Evening :{" "}
                          </strong>
                          {empData[0]?.evening_shift_start_time.slice(0, 5)}-
                          {empData[0]?.evening_shift_end_time.slice(0, 5)}
                        </p>
                        <p>
                          <strong style={{ color: "#1abc9c" }}>
                            Employee Status :{" "}
                          </strong>
                          {empData[0]?.employee_status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="">
                    <div className="row g-3">
                      <div className="col-lg-4">
                        <label className="fw-bold" style={{ color: "#1abc9c" }}>
                          Doctor's Employee ID
                        </label>
                        <div className="shadow-none p-1 bg-light rounded">
                          <p className="m-0">{empData[0]?.employee_ID}</p>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label className="fw-bold" style={{ color: "#1abc9c" }}>
                          Gender
                        </label>
                        <div className="shadow-none p-1 bg-light rounded">
                          <p className="m-0">{empData[0]?.gender}</p>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label className="fw-bold" style={{ color: "#1abc9c" }}>
                          Designation
                        </label>
                        <div className="shadow-none p-1 bg-light rounded">
                          <p className="m-0">
                            {empData[0]?.employee_designation}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label className="fw-bold" style={{ color: "#1abc9c" }}>
                          Salary
                        </label>
                        <div className="shadow-none p-1 bg-light rounded">
                          <p className="m-0">{empData[0]?.salary}</p>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label className="fw-bold" style={{ color: "#1abc9c" }}>
                          Employee Role
                        </label>
                        <div className="shadow-none p-1 bg-light rounded">
                          <p className="m-0">
                            {empData[0]?.employee_role
                              ? empData[0]?.employee_role
                              : " - "}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label className="fw-bold" style={{ color: "#1abc9c" }}>
                          Working Days
                        </label>
                        <div className="shadow-none p-1 bg-light rounded">
                          <p className="m-0">{empData[0]?.working_days}</p>
                        </div>
                      </div>
                    </div>
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

export default DoctorProfile;
const Container = styled.div`
  .b-shadow {
    background: #fff;
    height: 100%;
    padding: 1rem;
    box-shadow: inset 0px 0px 4px 0px #c7b3b3;
  }

  .box-under {
    /* border: 2px solid #1abc9c; */
    background: #f7f3f35c;
    padding: 0.5rem;
    height: 100%;
    box-shadow: inset 0px 0px 3px 0px #c7b3b3;
  }
`;
