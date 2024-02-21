import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineInventory } from "react-icons/md";
import { FaCodeBranch } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { AiFillBell } from "react-icons/ai";

const SiderAdmin = () => {
  const location = useLocation();

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
                    <h3 className=" d-none d-sm-inline fs-6" id="navleft1">
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
                    <h3 className="d-none d-sm-inline fs-6" id="navleft2">
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
                    <h3 className=" d-none d-sm-inline fs-6" id="navleft">
                      Bills
                    </h3>
                  </div>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  to="/admin-inventory"
                  className={`link-div ${getSidebarClass("/admin-inventory")}`}
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
                  to="/admin-doctor_section"
                  className={`link-div ${getSidebarClass(
                    "/admin-doctor_section"
                  )}`}
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
                  to="/admin-manage-staff"
                  className={`link-div ${getSidebarClass(
                    "/admin-manage-staff"
                  )}`}
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
                  to="/admin-lab-setting"
                  className={`link-div ${getSidebarClass(
                    "/admin-lab-setting"
                  )}`}
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
                    <h3 className=" d-none d-sm-inline fs-6" id="navleft">
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
  }
  #navleft2 {
    font-size: 12px;
    margin-left: 0rem;
    color: #000;
  }
  #navleft {
    font-size: 12px;
    margin-left: -0.2rem;
    color: #000;
  }
  #sidebar {
    width: 100%;
    height: 160rem;
    background-color: #1abc9c;
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
    color: #000;
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
    background-color: #9af5c996;
    padding: 1rem;
    box-shadow: 0px 0px 16px #9af5c996;
  }
`;
