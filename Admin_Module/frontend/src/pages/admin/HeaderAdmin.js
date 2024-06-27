import React, { useEffect, useState } from "react";
import dental_logo from "../../images/dentalnew.png";
import { AiFillBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearUser } from "../../redux/slices/UserSlicer";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  // console.log(user);
  const [notifyList, setNotifyList] = useState([]);

  const getNotifyDetails = async () => {
    try {
      const { data } = await axios.get(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/getSuperAdminNotify",
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
      if (error?.response?.status == 401) {
        // alert("Your token is expired please login again");
        navigate("/");
        dispatch(clearUser());
      }

      
    }
  };

  const updateMarkRead = async (id) => {
    try {
      const response = await axios.put(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/markRead/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getNotifyDetails();
    
    } catch (error) {
      // console.log(error);
    }
  };
  const logoutHandler = () => {
    try {
      localStorage.removeItem("userData");
      navigate("/");
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getNotifyDetails();
    const intervalId = setInterval(getNotifyDetails, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to Logout?");
    if (!isConfirmed) {
      return;
    }
    navigate("/");
    dispatch(clearUser());
  };


  const logoutHandleByToken = () => {
    alert("Token Expired! You have been logged out");
    dispatch(clearUser());
    navigate("/");
  };

  // console.log(notifyList);

  const filterForRead = notifyList?.filter((item) => {
    return item.status === "unread";
  });
  // console.log(filterForRead);

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
                className="nav-link active text-white mt-2  fs-5"
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
              <p className='  text-white   fs-6 mt-1' >Welcome {user.employee_name} ({user.employee_ID})</p>
            
                <li className="nav-item mx-3">
                  <Link to="/admin-clinic-setting">
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
                      <Link className="dropdown-item" to="/admin-profile">
                        View Profile
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <Link className="dropdown-item" to="/attendance-dashboard">
                      Attendance
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <Link className="dropdown-item" to="/leave-management">
                      Leave Detail                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>

                {/* <li className="nav-item dropdown" id="bell">
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
                              <Link to="/admin-notification" className="mx-2">
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
                </li> */}
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
                      <ul className="dropdown-menu first-dropdown " style={{marginLeft:"-7rem"}}>
                        {" "}
                        <Link to="/admin-notification" className="mx-2">
                          <button className="btn btn-info w-75">view all</button>
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
                                  to="/admin-notification"
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

export default HeaderAdmin;
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
     position: fixed; 
    min-width: 100%;
    z-index: 100;
    /* margin-bottom: 4rem; */
  
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

  .right-noti {
    a {
      text-decoration: none;
      color: black;
      &:hover {
        color: #1abc9c;
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
      align-items: baseline;
    }
  }
`;
