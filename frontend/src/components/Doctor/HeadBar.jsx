import React from "react";
import dental_logo from "../../images/dentalnew.png";
import { AiFillBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const HeadBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user.currentUser.employee_name);
  return (
    <Wrapper>
      <div>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1717595664/dental%20guru/test_1_liu3zb.png"
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
                DentalGuru
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
                <p className="text-white fw-bold">
                  Welcome{" "}
                  <strong>
                    Dr. {user.currentUser.employee_name}(
                    {user.currentUser.employee_ID})
                  </strong>
                </p>
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
                    <li className="text-center">
                      <Link to="/profileDashboard">View Profile</Link>
                    </li>
                    {/* <li>
                      <hr className="dropdown-divider" />
                    </li> */}
                    {/* <li>
                      <a className="dropdown-item" href="/">
                        Logout
                      </a>
                    </li> */}
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
    </Wrapper>
  );
};

export default HeadBar;
const Wrapper = styled.div`
  nav {
    width: 100%;
    /* position: fixed; */
    /* margin-bottom: 40%; */
    @media (min-width: 820px) and (max-width: 1024px) {
      width: 100%;
    }
  }
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
    @media screen and (max-width: 1000px) {
      margin-left: 0rem;
    }
  }

  .icon {
    color: white;
    font-size: 1.5rem;
  }
  .navbar {
    background-color: #0dcaf0;
    box-shadow: 1px 1px 6px black;
  }

  ul {
    li {
      list-style: none !important;
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
`;
