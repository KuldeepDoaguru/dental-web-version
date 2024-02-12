import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineInventory } from "react-icons/md";
import { FaCodeBranch } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";

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
                  <i className="fs-4 bi bi-house-door-fill"></i>
                </div>
                <div>
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft1">
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
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft1">
                    Branch
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to="/super-admin-appointment"
                className={`link-div ${getSidebarClass(
                  "/super-admin-appointment"
                )}`}
              >
                <div>
                  <i className="fs-4 bi bi-table"></i>
                </div>
                <div>
                  <h3 className="d-none d-sm-inline fs-6" id="navleft2">
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
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft">
                    Bills
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to="/inventory"
                className={`link-div ${getSidebarClass("/inventory")}`}
              >
                <div>
                  <MdOutlineInventory className="fs-4 bi bi-house-door-fill" />
                </div>
                <div>
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft">
                    Inventory
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
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
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft">
                    Manage Staff
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
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft">
                    Lab
                  </h3>
                </div>
              </Link>
            </li>
            <hr />

            <li>
              <Link
                to="/reports"
                className={`link-div ${getSidebarClass("/reports")}`}
              >
                <div>
                  {/* <i className="fs-4 bi bi-camera-video"></i> */}
                  <TbReportSearch className="fs-4 bi bi-camera-video" />
                </div>
                <div>
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft">
                    Report
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <div className={`link-div ${getSidebarClass("/settings")}`}>
                <Link
                  to="/clinic-setting"
                  className={`link-div ${getSidebarClass("/clinic-setting")}`}
                >
                  <div>
                    <i className="fs-4 bi bi-gear"></i>
                  </div>
                  <div>
                    <h3 className=" d-none d-sm-inline fs-6" id="navleft">
                      Settings
                    </h3>
                  </div>
                </Link>
              </div>
            </li>
            <hr />
            <li>
              <div className="link-div">
                <div>
                  <i className="fs-4 bi bi-power"></i>
                </div>
                <div>
                  <button className="btn btn-danger d-none d-sm-inline">
                    Logout
                  </button>
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
    height: 130rem;
    background-color: #004aad;
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

  li:hover {
    color: red;
  }

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
