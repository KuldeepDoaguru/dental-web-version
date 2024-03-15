import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa6";
import { GiNurseFemale } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";

const RightSider = () => {
  return (
    <>
      <Wrapper>
        <div className="main d-grid gap-2 mt-5">
          <div className="container-fluid mt-5">
            <div className="row mt-4">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div
                  className="rounded pb-3"
                  style={{
                    backgroundColor: "#FFA600",
                  }}
                >
                  <div className="d-flex flex-column pt-3 px-4">
                    <Link to="/AccountantSalaryMain" target="_blank">
                      <div class="d-flex gap-3 align-items-center">
                        <div className="">
                          <FaHandHoldingDollar className="fs-2 text-dark" />
                        </div>
                        <div className="mt-2">
                          <h3 class="d-sm-inline fs-5 text-dark">Accountend</h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid mt-4 ">
            <div className="row ">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div
                  className="rounded pb-3"
                  style={{
                    backgroundColor: "#FFA600",
                  }}
                >
                  <div className="d-flex flex-column pt-3 px-4">
                    <Link to="/DoctorMainSalary" target="_blank">
                      <div class="d-flex gap-3 align-items-center">
                        <div className="">
                          <FaUserDoctor className="fs-2 text-dark" />
                        </div>
                        <div className="mt-2">
                          <h3 class="d-sm-inline fs-5 text-dark">Doctors</h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid mt-4 ">
            <div className="row ">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div
                  className="rounded pb-3"
                  style={{
                    backgroundColor: "#FFA600",
                  }}
                >
                  <div className="d-flex flex-column pt-3 px-4">
                    <Link to="/ReceptionistSalaryMain" target="_blank">
                      <div class="d-flex gap-3 align-items-center">
                        <div className="">
                          <FaHospitalUser className="fs-2 text-dark" />
                        </div>
                        <div className="mt-2">
                          <h3 class="d-sm-inline fs-5 text-dark">
                            Receptionist
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid mt-4 ">
            <div className="row ">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div
                  className="rounded pb-3"
                  style={{
                    backgroundColor: "#FFA600",
                  }}
                >
                  <div className="d-flex flex-column pt-3 px-4">
                    <Link to="/NurseMainSalary" target="_blank">
                      <div class="d-flex gap-3 align-items-center">
                        <div className="">
                          <GiNurseFemale className="fs-2 text-dark" />
                        </div>
                        <div className="mt-2">
                          <h3 class="d-sm-inline fs-5 text-dark">Nurse</h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid mt-4 ">
            <div className="row ">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div
                  className="rounded pb-3"
                  style={{
                    backgroundColor: "#FFA600",
                  }}
                >
                  <div className="d-flex flex-column pt-3 px-4">
                    <Link to="/OtherMainSalary" target="_blank">
                      <div class="d-flex gap-3 align-items-center">
                        <div className="">
                          <GrUserWorker className="fs-2 text-dark" />
                        </div>
                        <div className="mt-2">
                          <h3 class="d-sm-inline fs-5 text-dark">Others</h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="container-fluid mt-4 ">
          <div className="row ">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="rounded bg-warning pb-3">
                <div className="d-flex flex-column pt-3 px-4">
                  <Link to="/OtherMainSalary" target="_blank">
                    <div class="d-flex gap-3 align-items-center">
                      <div className="">
                        <FaHandHoldingDollar className="fs-2 text-dark" />
                      </div>
                      <div className="mt-2">
                        <h3 class="d-sm-inline fs-5 text-dark">Others</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </Wrapper>
    </>
  );
};

export default RightSider;

const Wrapper = styled.div`
  #navleft1 {
    font-size: 12px;
    margin-left: 0rem;
    color: white;
  }
  #navleft2 {
    font-size: 12px;
    margin-left: 0rem;
    color: white;
  }
  #navleft {
    font-size: 12px;
    margin-left: -0.2rem;
    color: white;
  }
  #sidebar {
    width: 100%;
    height: 4rem;
    background-color: #004aad;
    /* @media screen and (max-width: 768px) {
      width: 3rem;
      height: 212rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 5rem;
      height: 151rem;
    } */
  }
  .bi {
    background-color: #fbceb1;
  }

  /* li:hover {
    color: red;
  } */

  .link-div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  a {
    text-decoration: none;
  }

  .active-nav {
    background-color: red;
    padding: 1rem;
  }
`;
