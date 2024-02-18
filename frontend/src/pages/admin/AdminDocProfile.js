import React from "react";
import styled from "styled-components";
// import Card from "../Card";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";
import AdminCards from "../../components/Admin/dashboard/AdminCards";
import AdminDocCards from "../../components/Admin/AdminDocCards";

const AdminDocProfile = () => {
  const location = useLocation();

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
                  <button
                    className="btn btn-success fs-4 shadow"
                    onClick={goBack}
                  >
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <AdminDocCards />
                </div>
                <div className="container shadow p-3 mt-5 bg-body rounded">
                  <div className="row">
                    <div className="col-lg-12 col-12">
                      <div className="text-start p-2">
                        <h3>Doctor Profile</h3>
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <img
                        src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                        alt="doctor-profile"
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-lg-8">
                      <div className="row g-3">
                        <div className="col-lg-4">
                          <label className="text-info">UserID</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Doctor ID</p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="text-info">User Name</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Dr. Name</p>
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
                          <label className="text-info">Reg.No</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">123</p>
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
                          <label className="text-info">Specialization</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">Doctor Specialization</p>
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
                          <label className="text-info">Last Degree</label>
                          <div className="shadow-none p-1 bg-light rounded">
                            <p className="m-0">B.com</p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminDocProfile;
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
`;
