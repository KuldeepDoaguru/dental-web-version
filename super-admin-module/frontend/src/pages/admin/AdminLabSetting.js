import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";
import AdminLab from "../../components/Admin/Lab-settings/AdminLab";
import AdminLabTest from "../../components/Admin/Lab-settings/AdminLabTest";
import AdminLabTask from "../../components/Admin/Lab-settings/AdminLabTask";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const AdminLabSetting = () => {
  const initialTab = localStorage.getItem("selectedTab") || "tab1";
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [showAddLab, setShowAddLab] = useState(false);
  const [showAddLabTest, setShowAddLabTest] = useState(false);
  const [showAddLabTask, setShowAddLabTask] = useState(false);

  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };

  const openAddLabPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddLab(true);
  };

  const openAddLabTestPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddLabTest(true);
  };

  const openAddLabTaskPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddLabTask(true);
  };

  const closeUpdatePopup = () => {
    setShowAddLab(false);
    setShowAddLabTest(false);
    setShowAddLabTask(false);
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
                <div className="d-flex p-2">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                </div>
                <div className="container-fluid mt-3">
                  <h2 className="text-center">Lab Settings</h2>
                  <div className="container-fluid">
                    <div className="row mt-5 background">
                      <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                        <input
                          type="text"
                          placeholder="search here"
                          className="inputser"
                        />
                        <button className="mx-2 btn btn-info">
                          <FaSearch />
                        </button>
                      </div>
                      <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-info lab-actbtn"
                            onClick={() => openAddLabPopup()}
                          >
                            Add Lab
                          </button>
                        </div>
                      </div>
                      <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-info lab-actbtn"
                            onClick={() => openAddLabTestPopup()}
                          >
                            Add Lab Test
                          </button>
                        </div>
                      </div>
                      <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                        <button
                          className="btn btn-info lab-actbtn"
                          onClick={() => openAddLabTaskPopup()}
                        >
                          Add Lab Task
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* nav-items-start */}
                  <div className="container-fluid mt-5 navsect background">
                    <Nav
                      className="d-flex justify-content-between side-cont"
                      activeKey={selectedTab}
                      onSelect={(selectedKey) => setSelectedTab(selectedKey)}
                    >
                      <div className="d-flex flex-row">
                        <Nav.Item>
                          <Nav.Link eventKey="tab1" className="navlink">
                            Lab
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tab2" className="navlink mx-2">
                            Lab Test
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tab3" className="navlink">
                            Test Tasks
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                      <div>
                        <p className="fw-bold">Total Lab - 09</p>
                      </div>
                    </Nav>
                    <div className="flex-grow-1 p-3 mainback">
                      {selectedTab === "tab1" && <AdminLab />}
                      {selectedTab === "tab2" && <AdminLabTest />}
                      {selectedTab === "tab3" && <AdminLabTask />}
                    </div>
                  </div>
                  {/* nav-items-ends */}
                </div>
              </div>
            </div>
          </div>
          {/* ***************************************************************************************************** */}
          {/* other pop-up */}
          {/* pop-up for adding lab */}
          <div className={`popup-container${showAddLab ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Labs</h4>
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <div className="d-flex flex-column">
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <label htmlFor="">Lab Name</label>
                      <input
                        type="text"
                        placeholder="Lab Name"
                        className="rounded p-2"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                    <div className="d-flex flex-column mx-2 w-100">
                      <label htmlFor="">Type</label>
                      <select name="" id="" className="typeset w-100">
                        <option value="">Internal</option>
                        <option value="">External</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <label htmlFor="">Number</label>
                      <input
                        type="text"
                        placeholder="contact number"
                        className="rounded p-2"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                    <div className="d-flex flex-column mx-2">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        placeholder="add email"
                        className="rounded p-2"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="d-flex flex-column">
                    <label htmlFor="">Address</label>
                    <textarea name="" id="" cols="30" rows="3"></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-evenly">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for adding lab */}
          {/* ************************************************************************************* */}

          {/* ***************************************************************************************************** */}
          {/* other pop-up */}
          {/* pop-up for adding lab */}
          <div className={`popup-container${showAddLabTest ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Labs Test</h4>
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <input
                  type="text"
                  placeholder="Lab Test Name"
                  className="rounded p-2"
                  // value={noticeData.linkURL}
                  // onChange={(e) =>
                  //   setNoticeData({
                  //     ...noticeData,
                  //     linkURL: e.target.value,
                  //   })
                  // }
                />
                <br />
                <input
                  type="text"
                  placeholder="Lab Test Code"
                  className="rounded p-2"
                  // value={noticeData.linkURL}
                  // onChange={(e) =>
                  //   setNoticeData({
                  //     ...noticeData,
                  //     linkURL: e.target.value,
                  //   })
                  // }
                />
                <br />
                <input
                  type="text"
                  placeholder="waiting days"
                  className="rounded p-2"
                  // value={noticeData.linkURL}
                  // onChange={(e) =>
                  //   setNoticeData({
                  //     ...noticeData,
                  //     linkURL: e.target.value,
                  //   })
                  // }
                />
                <br />
                <input
                  type="text"
                  placeholder="Default Labs"
                  className="rounded p-2"
                  // value={noticeData.linkURL}
                  // onChange={(e) =>
                  //   setNoticeData({
                  //     ...noticeData,
                  //     linkURL: e.target.value,
                  //   })
                  // }
                />
                <br />
                <input
                  type="text"
                  placeholder="Lab Test Cost"
                  className="rounded p-2"
                  // value={noticeData.linkURL}
                  // onChange={(e) =>
                  //   setNoticeData({
                  //     ...noticeData,
                  //     linkURL: e.target.value,
                  //   })
                  // }
                />
                <div className="d-flex justify-content-evenly">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for adding lab */}
          {/* ************************************************************************************* */}

          {/* ***************************************************************************************************** */}
          {/* other pop-up */}
          {/* pop-up for adding lab */}
          <div className={`popup-container${showAddLabTask ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Labs Task</h4>
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <input
                  type="text"
                  placeholder="Lab Task Name"
                  className="rounded p-2"
                  // value={noticeData.linkURL}
                  // onChange={(e) =>
                  //   setNoticeData({
                  //     ...noticeData,
                  //     linkURL: e.target.value,
                  //   })
                  // }
                />
                <br />
                <input
                  type="text"
                  placeholder="Lab Task Code"
                  className="rounded p-2"
                  // value={noticeData.linkURL}
                  // onChange={(e) =>
                  //   setNoticeData({
                  //     ...noticeData,
                  //     linkURL: e.target.value,
                  //   })
                  // }
                />
                <br />
                <input
                  type="text"
                  placeholder="waiting days"
                  className="rounded p-2"
                  // value={noticeData.linkURL}
                  // onChange={(e) =>
                  //   setNoticeData({
                  //     ...noticeData,
                  //     linkURL: e.target.value,
                  //   })
                  // }
                />
                <br />
                <input
                  type="text"
                  placeholder="Default Labs"
                  className="rounded p-2"
                  // value={noticeData.linkURL}
                  // onChange={(e) =>
                  //   setNoticeData({
                  //     ...noticeData,
                  //     linkURL: e.target.value,
                  //   })
                  // }
                />
                <br />
                <input
                  type="text"
                  placeholder="Lab Task Cost"
                  className="rounded p-2"
                  // value={noticeData.linkURL}
                  // onChange={(e) =>
                  //   setNoticeData({
                  //     ...noticeData,
                  //     linkURL: e.target.value,
                  //   })
                  // }
                />
                <div className="d-flex justify-content-evenly">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for adding lab */}
          {/* ************************************************************************************* */}
        </div>
      </Container>
    </>
  );
};

export default AdminLabSetting;
const Container = styled.div`
  .inputser {
    border-radius: 1.5rem;
    padding: 0.5rem;
    width: 80%;
  }

  .navlink.active {
    background-color: red;
    color: white;
    border-radius: 1rem;
  }

  .navlink {
    background-color: #e0e0e0;
    color: black;
    border-radius: 1rem;
  }

  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .background {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: inset 0px 0px 4px #b1adad;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  .typeset {
    padding: 0.5rem;
    border-radius: 6px;
  }

  label {
    font-weight: bold;
  }

  .lab-actbtn {
    height: 4rem;
    font-weight: bold;
  }
`;
