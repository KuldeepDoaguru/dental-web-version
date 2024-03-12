import React from "react";
import dental_logo from "../images/dentalnew.png";
import { AiFillBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
const Header = () => {
  return (
    <Wrapper>
      <div>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
                alt="Logo"
                width="75"
                height="60"
                // style={{ marginLeft: "-1.3rem" }}
              />
            </Link>
            <li style={{ listStyle: "none" }}>
              <Link
                className="nav-link active text-white mt-2 mx-2 fs-5"
                to="/"
              >
                Dental Guru
              </Link>
            </li>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item mx-3">
                  <Link to="/clinic-setting">
                    <IoSettings className="icon" />
                  </Link>
                </li>
                <li className="nav-item dropdown mx-3" id="userid">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserAlt className="icon" />
                  </a>
                  <ul className="dropdown-menu second-dropdown">
                    <li>
                      <Link className="dropdown-item" to="/super-admin-profile">
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown" id="bell">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <AiFillBell className="icon" />
                  </a>
                  <ul className="dropdown-menu third-dropdown">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/super-admin-notification"
                      >
                        Admin Added New Doctor - Approve the doctor
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </Wrapper>
  );
};

export default Header;
const Wrapper = styled.div`
  #userid {
    /* margin-left: -10rem; */
    list-style-type: none;
    @media screen and (max-width: 768px) {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }
  #bell {
    //margin-left: 5rem;
    list-style-type: none;
    @media screen and (max-width: 768px) {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }

  .nav-link {
    display: inline;
    list-style-type: none;
  }

  .second-dropdown {
    margin-left: -5rem;
    width: fit-content;
    @media screen and (max-width: 500px) {
      margin-left: 0rem;
    }
  }

  .icon {
    color: white;
    font-size: 2rem;
    &:hover {
      color: #55efc4;
    }
  }
  .navbar {
    background-color: #1abc9c;
    box-shadow: 1px 1px 6px black;
  }

  ul {
    li {
      list-style: none !important;
    }
  }

  .third-dropdown {
    width: 500px;
    left: -27rem;
    overflow-y: auto;
    max-height: calc(100vh - 100px);
  }
`;
