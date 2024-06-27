import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { MdOutlineInventory } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { AiOutlineAccountBook } from "react-icons/ai";
import { SiCodereview } from "react-icons/si";
// import { ImLab } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { ImSwitch } from "react-icons/im";
import { IoPeople } from "react-icons/io5";
import { CiMedicalClipboard } from "react-icons/ci";
import { clearUser } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";

const Sider = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSidebarClass = (path) => {
    return location.pathname === path ? "active-nav" : "";
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to Logout?");
    if (!isConfirmed) {
      return;
    }
    navigate("/");
    dispatch(clearUser());
  };

  return (
    <Wrapper>
      <div className="px-0" id="sidebar">
        <div className="d-flex flex-column align-items-center  px-3 pt-2">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center "
            id="menu"
          >
            <li>
              <Link
                to="/doctor-dashboard"
                className={`link-div ${getSidebarClass("/doctor-dashboard")}`}
              >
                <div>
                  {/* <i className="fs-4 bi bi-house-door-fill"></i> */}
                  <IoHome className="icon" />
                </div>
                <div>
                  <h3
                    className=" d-none d-sm-inline fs-6 icon-text"
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
                to="/attendance-dashboard"
                className={`link-div ${getSidebarClass(
                  "/attendance-dashboard"
                )}`}
              >
                <div>
                  {/* <i className="fs-4 bi bi-house-door-fill"></i> */}
                  <BsFileEarmarkPerson className="fs-2 text-white" />
                </div>
                <div>
                  <h3
                    className="d-none d-sm-inline fs-6 icon-text"
                    id="navleft1"
                  >
                    Attendance
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to="/prescription-details"
                className={`link-div ${getSidebarClass(
                  "/prescription-details"
                )}`}
              >
                <div>
                  {/* <i className="fs-4 bi bi-house-door-fill"></i> */}
                  <FaPrescriptionBottleMedical className="fs-2 text-white" />
                </div>
                <div>
                  <h3
                    className="d-none d-sm-inline fs-6 icon-text"
                    id="navleft1"
                  >
                    Prescription
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <div
                className="link-div"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                <div>
                  {/* <i className="fs-4 bi bi-power"></i> */}
                  <ImSwitch className="icon" />
                </div>
                <div className="text-light icon-text">
                  Logout
                  {/* <button className="btn btn-danger d-none d-sm-inline">
                    Logout
                  </button> */}
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
    height: 82rem;
    /* margin-top: 55%; */
    background-color: #0dcaf0;
    @media screen and (max-width: 768px) {
      width: 100%;
      height: 212rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      height: 110rem;
    }
  }
  .bi {
    color: white;
  }

  li:hover {
    color: #8ae6ff;
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
    background-color: #8ae6ff;
    padding: 1rem;
    box-shadow: rgb(138 230 255) 0px 0px 42px;
    border-radius: 17px;
  }
  .icon {
    color: white;
    font-size: 2rem;
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 1rem;
    }
  }

  .icon-text {
    @media screen and (max-width: 1024px) {
      display: none !important;
    }
  }
`;
