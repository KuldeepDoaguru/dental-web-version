import React from "react";
import styled from "styled-components";
import { AiFillBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/UserSlicer";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = user.token;
  console.log("User State:", user);
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
      <div>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <Link to="/accountant-dashboard">
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
                <li className="nav-item mx-2" id="bell">
                  <h5 className="text-light text-capitalize">
                    Welcome {user.employee_name}
                  </h5>
                  &nbsp;
                  <h5 className="text-light">({user.id})</h5>
                </li>
                <li className="nav-item dropdown mx-4" id="userid">
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
                      <Link className="dropdown-item" to="/accountant-profile">
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/view-clinic-details">
                        View Clinic Details
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li onClick={handleLogout}>
                      <a className="dropdown-item">Logout</a>
                    </li>
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

export default Header;
const Wrapper = styled.div`
  #userid {
    list-style-type: none;
    @media screen and (max-width: 768px) {
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }
  #bell {
    list-style-type: none;
    display: flex;
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
    background-color: #201658;
    box-shadow: 1px 1px 6px black;
  }

  ul {
    li {
      list-style: none !important;
    }
  }
`;
