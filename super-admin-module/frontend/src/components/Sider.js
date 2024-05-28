import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineInventory, MdOutlineSick } from "react-icons/md";
import { FaCodeBranch } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { AiFillBell } from "react-icons/ai";
import { FcLeave } from "react-icons/fc";

const Sider = () => {
  const location = useLocation();

  const getSidebarClass = (path) => {
    return location.pathname === path ? "active-nav" : "";
  };

  return (
    <Wrapper>
      <div className="px-sm-2 px-0" id="sidebar">
        <div className="d-flex flex-column align-items-center  px-3 pt-2">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center "
            id="menu"
          >
            <li>
              <Link
                to="/superadmin-dashboard"
                className={`link-div ${getSidebarClass(
                  "/superadmin-dashboard"
                )}`}
              >
                <div>
                  <i className="fs-4 bi bi-house-door-fill "></i>
                </div>
                <div>
                  <h3
                    className=" d-none d-sm-inline icon-view"
                    id="navleft1"
                  >
                    Dashboard
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to="/superadmin-branch"
                className={`link-div ${getSidebarClass("/superadmin-branch")}`}
              >
                <div>
                  <FaCodeBranch className="fs-4 bi bi-house-door-fill" />
                </div>
                <div>
                  <h3
                    className=" d-none d-sm-inline icon-view"
                    id="navleft1"
                  >
                   &nbsp; Branch &nbsp;
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to="/super-admin-appointment"
                className={`link-app ${getSidebarClass(
                  "/super-admin-appointment"
                )}`}
              >
                <div>
                  <i className="fs-4 bi bi-table "></i>
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
                to="/bill_section"
                className={`link-div ${getSidebarClass("/bill_section")}`}
              >
                <div>
                  <i className="fs-4 bi bi-receipt-cutoff"></i>
                </div>
                <div>
                  <h3
                    className=" d-none d-sm-inline icon-view"
                    id="navleft"
                  >
                   &nbsp; &nbsp; Bills &nbsp; &nbsp;
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            {/* <li>
              <Link
                to="/inventory"
                className={`link-div ${getSidebarClass("/inventory")}`}
              >
                <div>
                  <MdOutlineInventory className="fs-4 bi bi-house-door-fill" />
                </div>
                <div>
                  <h3
                    className=" d-none d-sm-inline fs-6 icon-view"
                    id="navleft"
                  >
                    Inventory
                  </h3>
                </div>
              </Link>
            </li> */}
            {/* <hr /> */}
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
                    className=" d-none d-sm-inline icon-view"
                    id="navleft"
                  >
                   &nbsp; Patient &nbsp;
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            {/* <li>
              <Link
                to="/doctor_section"
                className={`link-div ${getSidebarClass("/doctor_section")}`}
              >
                <div>
                  <i className="fs-4 bi bi-person-fill"></i>
                </div>
                <div>
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft">
                    Doctor
                  </h3>
                </div>
              </Link>
            </li>
            <hr /> */}
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
                    id="navleft"
                  >
                    Manage Staff
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to="/leave-management"
                className={`link-div ${getSidebarClass("/leave-management")}`}
              >
                <div>
                  {/* <i className="fs-4 bi bi-camera-video"></i> */}
                  <FcLeave className="fs-4 bi bi-camera-video" />
                  {/* <IoIosPeople  /> */}
                </div>
                <div>
                  <h3
                    className=" d-none d-sm-inline icon-view"
                    id="navleft"
                  >
                    Leave Details
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to="/lab-setting"
                className={`link-div ${getSidebarClass("/lab-setting")}`}
              >
                <div>
                  <i className="fs-4 bi bi-file-medical"></i>
                </div>
                <div>
                  <h3
                    className=" d-none d-sm-inline icon-view"
                    id="navleft"
                  >
                  &nbsp; &nbsp; Lab &nbsp; &nbsp; 
           
                  </h3>
                </div>
              </Link>
            </li>
            <hr />

            <li>
              <Link
                to="/reports-dashboard"
                className={`link-div ${getSidebarClass("/reports-dashboard")}`}
              >
                <div>
                  {/* <i className="fs-4 bi bi-camera-video"></i> */}
                  <TbReportSearch className="fs-4 bi bi-camera-video" />
                </div>
                <div>
                  <h3
                    className=" d-none d-sm-inline icon-view"
                    id="navleft"
                  >
                   &nbsp;  Report &nbsp;
                  </h3>
                </div>
              </Link>
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
  #navleft1 {
    font-size: 12px;
    margin-left: 0rem;
    color: white;
    @media (min-width: 1281px) and (max-width: 2000px) {
      font-size: 16px;
    }
  }
  #navleft2 {
    font-size: 12px;
    margin-left: 0rem;
    color: white;
    /* @media (min-width: 901px) and (max-width: 1212) {
      font-size: 11px;
    } */
    @media (min-width: 1281px) and (max-width: 2000px) {
      font-size: 16px;
    }
  }
  #navleft {
    font-size: 12px;
    white-space: nowrap;
    margin-left: -0.2rem;
    color: white;
    @media (min-width: 1281px) and (max-width: 2000px) {
      font-size: 15px;
      padding: 0.5rem;
    }
  }
  #sidebar {
    width: 100%;
    height: 150rem;
    
    background-color: #004aad;
    @media screen and (max-width: 768px) {
      width: 100%;
      height: 212rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 100%;
      height: 151rem;
    }
  }
  .bi {
    color: white;
  }

  li:hover {
    color: red;
  }

  .link-div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
  }
  .link-app {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
  a {
    text-decoration: none;
  }

  .active-nav {
    background-color: #0e67dd;
    padding: 0.5rem;
    box-shadow: 1px 0px 30px #0e67dd;
    border-radius: 10px;
  }

  .icon-view {
    @media (max-width: 900px) {
      display: none !important;
    }
    @media (min-width: 1024px) and (max-width: 1280px) {
      font-size: 14px;
    }
    @media (min-width: 1281px) and (max-width: 2000px) {
      font-size: 16px;
    }
  }
`;
