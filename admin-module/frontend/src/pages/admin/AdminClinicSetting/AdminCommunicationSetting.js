import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";
import { IoMdArrowRoundBack } from "react-icons/io";
import AdminAppointNotify from "../../../components/Admin/AdminCommunication/AdminAppointNotify";
import AdminNotifyTemp from "../../../components/Admin/AdminCommunication/AdminNotifyTemp";
import AdminAddNewTemp from "../../../components/Admin/AdminCommunication/AdminAddNewTemp";

const AdminCommunicationSetting = () => {
  const initialTab = localStorage.getItem("selectedTab") || "tab1";
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Communication Settings</h2>
                          </div>
                        </nav>
                      </div>
                      {/* nav-items-start */}
                      <div className="container-fluid mt-5 navsect">
                        <Nav
                          className="d-flex justify-content-between side-cont"
                          activeKey={selectedTab}
                          onSelect={(selectedKey) =>
                            setSelectedTab(selectedKey)
                          }
                        >
                          <div className="d-flex flex-row">
                            <Nav.Item>
                              <Nav.Link eventKey="tab1" className="navlink">
                                Appointment Notification
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link
                                eventKey="tab2"
                                className="navlink mx-2"
                              >
                                Notification Template
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="tab3" className="navlink">
                                Add New Template
                              </Nav.Link>
                            </Nav.Item>
                          </div>
                        </Nav>
                        <div className="flex-grow-1 p-3 mainback">
                          {selectedTab === "tab1" && <AdminAppointNotify />}
                          {selectedTab === "tab2" && <AdminNotifyTemp />}
                          {selectedTab === "tab3" && <AdminAddNewTemp />}
                        </div>
                      </div>
                      {/* nav-items-ends */}
                    </div>
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

export default AdminCommunicationSetting;
const Container = styled.div`
  .navlink.active {
    background-color: red;
    color: white;
    border-radius: 1rem;
  }

  .navlink {
    color: black;
    background-color: #e0e0e0;
    border-radius: 1rem;
    box-shadow: 0px 0px 5px #b1b1b1;
    font-weight: bold;
  }
`;
