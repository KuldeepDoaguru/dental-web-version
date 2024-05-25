import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link, useNavigate } from "react-router-dom";
import BranchSelector from "../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearUser, toggleTableRefresh } from "../../redux/slices/UserSlicer";
import moment from 'moment';

const SuperAdmNotify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user.token);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [notifyList, setNotifyList] = useState([]);
  const { refreshTable } = useSelector((state) => state.user);

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
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/markRead/${id}`,{}, 
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
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifyDetails();
  }, [notifyList.length , refreshTable]);

  console.log(notifyList);

  // const filterForRead = notifyList?.filter((item) => {
  //   return item.status !== "read";
  // });
  // console.log(filterForRead);
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    <BranchSelector />
                    <div>
                      {/* <Link to="/register-doctor">
                        <button className="btn btn-success">Add Doctor</button>
                      </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <h3 className="text-center">Notification List</h3>
                  <hr />
                  <div className="container mt-3 box-not">
                    <ul className="">
                      {notifyList?.map((item) => {
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
                                  {/* <p>Date : {moment(item.time).utc().format('YYYY-MM-DD')}</p> */}
                                   {/* <p>Time : {moment(item.time).utc().format('HH:mm')}</p> */}
                                </div>
                                {item.status !== "read" ? (
                                  <>
                                    <div className="mx-2">
                                      <button
                                        className="btn btn-info"
                                        onClick={() =>
                                          updateMarkRead(item.event_id)
                                        }
                                      >
                                        Mark as Read
                                      </button>
                                      <Link
                                        to="/super-admin-notification"
                                        className="mx-2"
                                      ></Link>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <p>checked</p>
                                  </>
                                )}
                              </div>
                            </li>
                            <hr />
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SuperAdmNotify;
const Container = styled.div`
  th {
    background-color: #004aad;
    color: white;
  }
  .li-div {
    background-color: #c7ecee;
    margin-top: 1rem;
    padding: 1rem;
    border: none;
    box-shadow: 0px 0px 10px darkgrey;
    border-radius: 10px;
    color: #004aad;
    font-weight: bold;
    &:hover {
      background-color: #000;
    }
    a {
      text-decoration: none;
    }
  }

  li {
    list-style: none;
  }

  .right-noti {
    a {
      text-decoration: none;
      color: black;
      &:hover {
        color: #004aad;
      }
    }
    p {
      margin-bottom: 0px;
    }
  }

  .box-not {
    height: 30rem;
    overflow: auto;
  }
`;
