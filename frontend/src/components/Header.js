import React from "react";
import dental_logo from "../images/dentalnew.png";
import { AiFillBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Wrapper>
      <div className="container-fluid" style={{ backgroundColor: "#004aad" }}>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <Link to="/">
              <img
                src={dental_logo}
                alt="Logo"
                width="75"
                height="50"
                style={{ marginLeft: "-1.3rem" }}
              />
            </Link>
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active text-white mt-2  fs-5"
                    aria-current="page"
                    href="/"
                  >
                    Dental Guru
                  </a>
                </li>
              </ul>
              <ul className="d-lg-flex d-sm-column">
                <li className="nav-item dropdown" id="userid">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserAlt />
                  </a>
                  <ul className="dropdown-menu" style={{ marginLeft: "-2rem" }}>
                    <li>
                      <a className="dropdown-item" href="/">
                        View Profile
                      </a>
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
                <li className="nav-item" id="bell">
                  <AiFillBell />
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
    margin-left: -10rem;
    list-style-type: none;
    @media screen and (max-width: 768px) {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }
  #bell {
    margin-left: 5rem;
    list-style-type: none;
    @media screen and (max-width: 768px) {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }
`;
