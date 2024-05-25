import React, { useEffect, useState } from "react";
import dental_logo from "../images/dentalnew.png";
import { AiFillBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearUser, toggleTableRefresh } from "../redux/slices/UserSlicer";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  // console.log("User State:", user);
  const { refreshTable } = useSelector((state) => state.user);
  const branch = useSelector((state) => state.branch);
  // console.log(`User Name: ${branch.name}`);
  const [notifyList, setNotifyList] = useState([]);

  const getNotifyDetails = async () => {
    try {
      const { data } = await axios.get(
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getSuperAdminNotify",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setNotifyList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMarkRead = async (id) => {
    try {
      const response = await axios.put(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/markRead/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getNotifyDetails();
      dispatch(toggleTableRefresh());
    } catch (error) {
      // console.log(error);
    }
  };

  // const logoutHandler = () => {
  //   try {
  //     localStorage.removeItem("userData");
  //     navigate("/");
  //   } catch (error) {
  //     // console.log(error);
  //   }
  // };

  const logoutHandler = () => {
    const isConfirmed = window.confirm("Are you sure you want to Logout?");
    if (isConfirmed) {
      dispatch(clearUser());
      navigate("/");
    }
  };

  useEffect(() => {
    getNotifyDetails();
  }, [refreshTable]);

  useEffect(() => {
    getNotifyDetails();
    const intervalId = setInterval(getNotifyDetails, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log(notifyList);

  const filterForRead = notifyList?.filter((item) => {
    return item.status !== "read";
  });
  console.log(filterForRead);

  return (
    <Wrapper>
      <div>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <Link to="/superadmin-dashboard">
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
                to="/superadmin-dashboard"
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
                    className="nav-link"
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
                      <button className="dropdown-item" onClick={logoutHandler}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown" id="bell">
                  <a
                    className="nav-link"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <AiFillBell className="icon" />
                    <div className="nav-cart-count">{filterForRead.length}</div>
                  </a>
                  {filterForRead.length == 0 ? (
                    <>
                      <ul className="dropdown-menu first-dropdown">
                        {" "}
                        <Link to="/super-admin-notification" className="mx-2">
                          <button className="btn btn-info">view all</button>
                        </Link>
                      </ul>
                    </>
                  ) : (
                    <ul className="dropdown-menu third-dropdown">
                      {filterForRead?.slice(-10).map((item) => {
                        return (
                          <>
                            <li key={item.id}>
                              <div className="d-flex p-3 justify-content-between">
                                <div className="right-noti">
                                  <h4>
                                    <a
                                      href={item.open}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {item.title}
                                    </a>
                                  </h4>
                                  <p>{item.event_msg}</p>
                                </div>
                              </div>
                              <div className="mx-2">
                                <button
                                  className="btn btn-info"
                                  onClick={() => updateMarkRead(item.event_id)}
                                >
                                  Mark as Read
                                </button>
                                <Link
                                  to="/super-admin-notification"
                                  className="mx-2"
                                >
                                  <button className="btn btn-info">
                                    view all
                                  </button>
                                </Link>
                              </div>
                            </li>
                            <hr />
                          </>
                        );
                      })}
                    </ul>
                  )}
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
    background-color: #004aad;
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
    @media screen and (max-width: 900px) {
      width: 500px;
      left: 0rem;
      overflow-y: auto;
      max-height: calc(100vh - 100px);
      position: absolute;
    }
  }

  .first-dropdown {
    width: 75px;
    left: -5rem;
    background: transparent;
    border: 0;
    overflow-y: auto;
    text-align: center;
    max-height: calc(100vh - 100px);
    @media screen and (max-width: 900px) {
      width: 500px;
      left: 0rem;
      overflow-y: auto;
      max-height: calc(100vh - 100px);
      position: absolute;
    }
  }

  .right-noti {
    a {
      text-decoration: none;
      color: black;
      &:hover {
        color: #004aad;
      }
    }
  }

  .nav-cart-count {
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -40px;
    margin-left: 0px;
    border-radius: 11px;
    font-size: 14px;
    background: red;
    color: white;
    @media screen and (max-width: 900px) {
      margin-left: -11px;
    }
  }

  .navbar-nav {
    @media (max-width: 900px) {
      display: flex;
      flex-direction: row;
      margin-top: 2rem;
    }
  }
`;
