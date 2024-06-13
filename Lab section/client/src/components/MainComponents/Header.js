import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import UserLogin from "../../Pages/UserLogin";
const Header = () => {
  return (
    <>
      <Container>
        <div className="hd">
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1717595664/dental%20guru/test_1_liu3zb.png"
                  alt="Logo"
                  width="75"
                  height="60"
                />
              </Link>
              <li style={{ listStyle: "none" }}>
                <Link
                  className="nav-link active text-white mt-2 mx-2 fs-5"
                  to="/"
                >
                  DentalGuru
                </Link>
              </li>
              <button
                className="navbar-toggler bg-white"
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
                <UserLogin/>
                  <li className="nav-item dropdown" id="userid">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUserAlt className="icon mx-3" />
                    </a>
                    <ul className="dropdown-menu second-dropdown detail" >
                    <li><Link to='/lab-attendant-profile' className="dropdown-item">View Profile</Link></li>
    {/* <li><Link to='/attendanceLeave' className="dropdown-item">View Attendance & Leave</Link></li> */}
    <li><Link to='/branch-details' className="dropdown-item">View Clinic Details</Link></li>
                    </ul>
 


  



                  </li>

                  {/* <li className="nav-item" id="bell">
                    <AiFillBell className="icon" />
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </>
  );
};

export default Header;
const Container = styled.div`
  #userid {
    list-style-type: none;
    @media screen and (max-width: 768px) {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }
  #bell {
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
    font-size: 1.4rem;
  }
  .navbar {
    background-color: #213555;
    box-shadow: 1px 1px 6px black;
    position: fixed;
    min-width: 100%;
    z-index: 100;
    /* width: 100%; */
    margin-bottom: 4rem;
  }

  ul {
    li {
      list-style: none !important;
    }
  }
  .detail{
    margin-left: -8rem;
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      margin-left: 0rem;
    }
  }


`;
