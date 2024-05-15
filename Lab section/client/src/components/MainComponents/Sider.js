import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { GiMicroscopeLens } from "react-icons/gi";
import { GiMicroscope } from "react-icons/gi";
import { LiaXRaySolid } from "react-icons/lia";
import { FaHistory } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import Logout from "../../Pages/Logout/Logout";

const Sider = () => {
  return (
    <Wrapper>
      <div className="px-0 d-print-none" id="sidebar">
        <div className="d-flex flex-column align-items-center pt-2">
          <ul className="nav nav-pills nav-dash" id="menu">
            <li class="nav-item link-div">
              <Link to="/" class="nav-link px-0 align-middle">
                <div className="link-div">
                  <i className="fs-4 bi bi-house-door-fill"></i>
                </div>
                <div d-flex justify-content-center>
                  <h3 class=" d-none d-sm-inline fs-6 text-light">Dashboard</h3>
                </div>
              </Link>
            </li>
            {/* <hr /> */}

            {/* <div>
              <Link to="/Sencivity">
                <div className="link-div">
                  <GiMicroscopeLens className="fs-2 bi bi-house-door-fill" />
                </div>

                <h3 class="d-none d-sm-inline fs-6 text-light">ORAL Test</h3>
              </Link>
            </div> */}

            {/* **************** When We Need Dropdown ************* */}
            {/* <li className="">
              <Link
                to="#submenu1"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle "
              >
                <div className="link-div">
                  <GiMicroscopeLens className="fs-2 bi bi-house-door-fill" />
                </div>{" "}
                <h3 class="d-none d-sm-inline text-center fs-6 text-light">
                  ORAL Test
                  <IoMdArrowDropdown />
                </h3>{" "}
              </Link>
              <ul
                class=" nav collapse flex-column"
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li class="w-100">
                  <Link to="/Sencivity" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-center text-light fs-6"
                      target="_blank"
                    >
                      Oral Test
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>
              </ul>
            </li> */}
            {/* <hr /> */}

            {/* <div>
              <Link to="/CBCTest">
                <div className="link-div">
                  <GiMicroscope className="fs-2 bi bi-house-door-fill" />
                </div>

                <h3 class="d-none d-sm-inline fs-6 text-light">Blood Test</h3>
              </Link>
            </div> */}

            {/* **************** When We Need Dropdown ************* */}
            {/* <li>
              <Link
                to="#submenu3"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle "
              >
                <div className="link-div">
                  <GiMicroscope className="fs-2 bi bi-house-door-fill" />
                </div>{" "}
                <h3 class="d-none d-sm-inline fs-6 text-light">
                  Blood Test <IoMdArrowDropdown />
                </h3>{" "}
              </Link>
              <ul
                class="collapse nav flex-column"
                id="submenu3"
                data-bs-parent="#menu"
              >
                <li class="w-100">
                  <Link to="/CBCTest" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      CBC Test
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>
              </ul>
            </li> */}
            {/* <hr /> */}

            {/* <div>
              <Link to="/OPGXRay">
                <div className="link-div">
                  <LiaXRaySolid className="fs-1 bi bi-house-door-fill" />
                </div>

                <h3 class="d-none d-sm-inline fs-6 text-light">Radiology</h3>
              </Link>
            </div> */}

            {/* **************** When We Need Dropdown ************* */}
            {/* <li className="">
              <Link
                to="#submenu4"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle"
              >
                <div className="link-div">
                  <LiaXRaySolid className="fs-1 bi bi-house-door-fill" />
                </div>{" "}
                <h3 class="d-none d-sm-inline fs-6 text-light">
                  Radiology <IoMdArrowDropdown />
                </h3>{" "}
              </Link>
              <ul
                class="collapse nav flex-column ms-1"
                id="submenu4"
                data-bs-parent="#menu"
              >
                <li>
                  <Link to="/OPGXRay" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      OPG X-Ray
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>
              </ul>
            </li> */}
            <hr />

            <li className="">
              <div>
                <Link to="/History" class="nav-link px-0 align-middle ">
                  <div className="link-div">
                    <div className="">
                      <FaHistory className="text-light fs-3" />
                    </div>
                    <div>
                      <h3 className=" d-none d-sm-inline fs-6 text-light">
                        History
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
            <hr />

            <li className="">
              <div>
                <Link to="/AllTest" class="nav-link px-0 align-middle ">
                  <div className="link-div">
                    <div className="">
                      <TbReportAnalytics className="text-light fs-3" />
                    </div>
                    <div>
                      <h3 className=" d-none d-sm-inline fs-6 text-light">
                        All Test
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
          <hr />

            <li className="">
              <div>
                <Link to="/PaymentHistory" class="nav-link px-0 align-middle ">
                  <div className="link-div">
                    <div className="">
                      <RiSecurePaymentLine className="text-light fs-3" />
                    </div>
                    <div>
                      <h3 className=" d-none d-sm-inline fs-6 text-light">
                        Payment History
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
            <hr />

            <li className="">
              <div className="link-div">
                <div>
                  <i className="fs-2 bi bi-power"></i>
                </div>
                <div>
                  {/* <button
                    type="submit"
                    className="btn d-none d-sm-inline text-light fs-6"
                    style={{
                      backgroundColor: "#2ecc71",
                    }}
                  >
                    Logout
                  </button> */}
                  <Logout/>
                </div>
              </div>
            </li>
            <hr />
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default Sider;
const Wrapper = styled.div`
  #sidebar {
    width: 8%;
    height: 100vh;
    background-color: #213555;
    position: fixed;
    margin-top: 4rem;

    @media screen and (max-width: 768px) {
      width: 3rem;
      height: 212rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 5rem;
      height: 151rem;
    }
  }
  .bi {
    color: white;
  }

  .link-div {
  }
  a {
    text-decoration: none;
  }

  .nav-dash {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .link-div {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  .nav-link {
    text-align: center;
  }
`;
