import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";
import { IoMdArrowRoundBack } from "react-icons/io";

const AdminPrescriptTemp = () => {
  const [showAddPreTemp, setShowAddPreTemp] = useState(false);
  const [showEditPreTemp, setShowEditPreTemp] = useState(false);
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };

  const openAddPreTempPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddPreTemp(true);
  };

  const openEditPreTempPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowEditPreTemp(true);
  };

  const closeUpdatePopup = () => {
    setShowAddPreTemp(false);
    setShowEditPreTemp(false);
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
                  <h3 className="text-center">
                    {" "}
                    Prescription Template Settings
                  </h3>
                  <div className="container-fluid">
                    <div className="row mt-5">
                      <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                        <input
                          type="text"
                          placeholder="search here"
                          className="inputser"
                        />
                        <button className="mx-2 btn btn-info">
                          <FaSearch />
                        </button>
                      </div>
                      <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                        <button
                          className="btn btn-info"
                          onClick={() => openAddPreTempPopup()}
                        >
                          Add Prescription Template
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid mt-3">
                    <div className="banner-mid">
                      <div>
                        <h6 className="text-dark fs-4 fw-bold">
                          Prescription Template List
                        </h6>
                      </div>
                      <div>
                        <p className="fw-bold text-dark fs-4 fw-bold">
                          Total - 30
                        </p>
                      </div>
                    </div>
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">Template ID</th>
                            <th className="table-small">Template Name</th>
                            <th className="table-small">Drug</th>
                            <th className="table-small">Strength</th>
                            <th className="table-small">Instructions</th>
                            <th className="table-small">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">Maleria</td>
                            <td className="table-small">Paracetamol</td>
                            <td className="table-small">400 Mg</td>
                            <td className="table-small">
                              Take Only incase of fever
                            </td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditPreTempPopup()}
                              >
                                Edit
                              </button>
                              <button className="btn btn-danger mx-1">
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">Maleria</td>
                            <td className="table-small">Paracetamol</td>
                            <td className="table-small">400 Mg</td>
                            <td className="table-small">
                              Take Only incase of fever
                            </td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditPreTempPopup()}
                              >
                                Edit
                              </button>
                              <button className="btn btn-danger mx-1">
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">Maleria</td>
                            <td className="table-small">Paracetamol</td>
                            <td className="table-small">400 Mg</td>
                            <td className="table-small">
                              Take Only incase of fever
                            </td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditPreTempPopup()}
                              >
                                Edit
                              </button>
                              <button className="btn btn-danger mx-1">
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ***************************************************************************************************** */}
          {/* other pop-up */}
          {/* pop-up for adding lab */}
          <div className={`popup-container${showAddPreTemp ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Prescription Template</h4>
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <input
                  type="text"
                  placeholder="Add Template Name"
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
                  placeholder="Add Drug Name"
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
                  placeholder="Add Strength"
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
                  placeholder="Add Instruction"
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
          <div className={`popup-container${showEditPreTemp ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Edit Prescription Template</h4>
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <input
                  type="text"
                  placeholder="Update Template Name"
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
                  placeholder="Update Drug Name"
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
                  placeholder="Update strength"
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
                  placeholder="Update Instruction"
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

export default AdminPrescriptTemp;
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

  .banner-mid {
    background-color: #1abc9c;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .btn-info {
    background-color: #1abc9c;
    font-weight: bold;
  }

  .btn-success {
    background-color: #1abc9c;
    font-weight: bold;
    color: #000;
    border: none;
  }

  th {
    background-color: #1abc9c;
  }
`;
