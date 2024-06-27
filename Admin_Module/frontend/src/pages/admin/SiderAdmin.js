import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineInventory, MdOutlineSick } from "react-icons/md";
import { FaCodeBranch } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { AiFillBell } from "react-icons/ai";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/UserSlicer";
import { FcLeave } from "react-icons/fc";

const SiderAdmin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getSidebarClass = (path) => {
    return location.pathname === path ? "active-nav" : "";
  };

  return (
    <>
      <Container>
        <div className="px-sm-2 px-0" id="sidebar">
          <div className="d-flex flex-column align-items-center  px-3 pt-2">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center "
              id="menu"
            >
              <li>
                <Link
                  to="/admin-dashboard"
                  className={`link-div ${getSidebarClass("/admin-dashboard")}`}
                >
                  <div>
                    <i className="fs-4 bi bi-house-door-fill"></i>
                  </div>
                  <div>
                    <h3
                      className=" d-none d-sm-inline icon-view icon-view"
                      id="navleft2"
                    >
                      Dashboard
                    </h3>
                  </div>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  to="/admin-appointment"
                  className={`link-div ${getSidebarClass(
                    "/admin-appointment"
                  )}`}
                >
                  <div>
                    <i className="fs-4 bi bi-table"></i>
                  </div>
                  <div>
                    <h3
                      className="d-none d-sm-inline icon-view"
                      id="navleft2"
                    >
                      Appointment
                    </h3>
                  </div>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  to="/admin-bill_section"
                  className={`link-div ${getSidebarClass(
                    "/admin-bill_section"
                  )}`}
                >
                  <div>
                    <i className="fs-4 bi bi-receipt-cutoff"></i>
                  </div>
                  <div>
                    <h3
                      className=" d-none d-sm-inline icon-view"
                      id="navleft2"
                    >
                      Bills
                    </h3>
                  </div>
                </Link>
              </li>
              {/* <hr />
              <li>
                <Link
                  to="/admin-inventory"
                  className={`link-div ${getSidebarClass("/admin-inventory")}`}
                >
                  <div>
                    <MdOutlineInventory className="fs-4 bi bi-house-door-fill" />
                  </div>
                  <div>
                    <h3
                      className="d-none d-sm-inline icon-view"
                      id="navleft"
                    >
                      Inventory
                    </h3>
                  </div>
                </Link>
              </li> */}
              <hr />
              <li>
                <Link
                  to="/patient-list"
                  className={`link-div ${getSidebarClass("/patient-list")}`}
                >
                  <div>
                    <MdOutlineSick className="fs-4 bi bi-house-door-fill" />
                  </div>
                  <div>
                    <h3
                      className=" d-none d-sm-inline icon-view icon-view"
                      id="navleft2"
                    >
                      Patient
                    </h3>
                  </div>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  to="/manage-staff"
                  className={`link-div ${getSidebarClass("/manage-staff")}`}
                >
                  <div>
                    {/* <i className="fs-4 bi bi-camera-video"></i> */}
                    <IoIosPeople className="fs-4 bi bi-camera-video" />
                  </div>
                  <div>
                    <h3
                      className=" d-none d-sm-inline icon-view"
                      id="navleft2"
                    >
                      Manage Staff
                    </h3>
                  </div>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  to="/admin-lab-setting"
                  className={`link-div ${getSidebarClass(
                    "/admin-lab-setting"
                  )}`}
                >
                  <div>
                    <i className="fs-4 bi bi-file-medical"></i>
                  </div>
                  <div>
                    <h3
                      className=" d-none d-sm-inline icon-view"
                      id="navleft2"
                    >
                      Lab
                    </h3>
                  </div>
                </Link>
              </li>
              <hr />
              {/* <li>
                <Link
                  to="/attendance-dashboard"
                  className={`link-div ${getSidebarClass(
                    "/attendance-dashboard"
                  )}`}
                >
                  <div>
                    {/* <i className="fs-4 bi bi-house-door-fill"></i> */}
                    {/* <BsFileEarmarkPerson className="fs-2 text-dark" />
                  </div>
                  <div>
                    <h3
                      className="d-none d-sm-inline icon-text"
                      id="navleft1"
                    >
                      Attendance
                    </h3>
                  </div>
                </Link> */}
              {/* </li> */} 
              {/* <hr /> */}

              {/* <li>
                <Link
                  to="/leave-management"
                  className={`link-div ${getSidebarClass("/leave-management")}`}
                >
                  <div>
                    {/* <i className="fs-4 bi bi-camera-video"></i> */}
                    {/* <FcLeave className="fs-4 bi bi-camera-video" /> */}
                    {/* <IoIosPeople  /> */}
                  {/* </div>
                  <div>
                    <h3
                      className=" d-none d-sm-inline icon-view"
                      id="navleft"
                    >
                      Leave Details
                    </h3>
                  </div>
                </Link>
              </li> */}

              <li>
                <Link
                  to="/admin-reports-dashboard"
                  className={`link-div ${getSidebarClass(
                    "/admin-reports-dashboard"
                  )}`}
                >
                  <div>
                    {/* <i className="fs-4 bi bi-camera-video"></i> */}
                    <TbReportSearch className="fs-4 bi bi-camera-video" />
                  </div>
                  <div>
                    <h3
                      className=" d-none d-sm-inline icon-view"
                      id="navleft2"
                    >
                      Report
                    </h3>
                  </div>
                </Link>
              </li>
              <hr />
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SiderAdmin;
const Container = styled.div`
  #navleft1 {
    font-size: 12px;
    margin-left: 0rem;
    color: #000;
    @media (max-width: 900px) {
      display: none !important;
    }
    @media (min-width: 1024px) and (max-width: 1280px) {
      font-size: 12px;
    }
    @media (min-width: 1281px) and (max-width: 2000px) {
      font-size: 16px;
    }
  }
  #navleft2 {
    font-size: 12px;
    margin-left: 0rem;
    color: #000;
    white-space: nowrap;
    @media (max-width: 900px) {
      display: none !important;
    }
    @media (min-width: 1024px) and (max-width: 1280px) {
      font-size: 12px;
    }
    @media (min-width: 1281px) and (max-width: 2000px) {
      font-size: 12px;
    }
  }
  #navleft {
    font-size: 12px;
    margin-left: -0.2rem;
    color: #000;
    @media (max-width: 900px) {
      display: none !important;
    }
    @media (min-width: 1024px) and (max-width: 1280px) {
      font-size: 12px;
    }
    @media (min-width: 1281px) and (max-width: 2000px) {
      font-size: 16px;
    }
  }
  #sidebar {
    width: 8%;
    height: 100vh;
    position: fixed;
    margin-top: 4.8rem;
    background-color: #1abc9c;
    @media screen and (max-width: 768px) {
      width: fit-content;
      height: 212rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: fit-content;
      height: 151rem;
    }
  }
  .bi {
    color: #000;
  }

  li:hover {
    color: red;
  }

  /* .link-div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  a {
    text-decoration: none;
  }

  .active-nav {
    background-color: #9af5c996;
    padding: 1rem;
    box-shadow: 0px 0px 16px #9af5c996;
  } */
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
    @media screen and (max-width: 820px) {
      font-size: smaller;
    }
  }

  .nav-link {
    text-align: center;
    @media screen and (max-width: 820px) {
      width: auto !important;
    }
  }

  hr {
    color: white;
  }

  .active-nav {
    background-color: #9af5c996;
    padding: 6px;
    box-shadow: 0px 0px 16px #9af5c996;
  }
  a {
    text-decoration: none;
  }

`;
