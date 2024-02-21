import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../../components/Header";
import Sider from "../../../components/Sider";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";
import { IoMdArrowRoundBack } from "react-icons/io";

const AdminDrugSetting = () => {
  const [showAddDrugs, setShowAddDrugs] = useState(false);
  const [showEditDrugs, setShowEditDrugs] = useState(false);
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };

  const openAddDrugsPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddDrugs(true);
  };

  const openEditDrugsPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowEditDrugs(true);
  };

  const closeUpdatePopup = () => {
    setShowAddDrugs(false);
    setShowEditDrugs(false);
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
                  <h3 className="text-center mt-1">Drug Settings</h3>
                  <div className="mid-box">
                    <div className="row mt-5">
                      <div className="col-1"></div>
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
                      <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                        <button
                          className="btn btn-info fw-bold"
                          onClick={() => openAddDrugsPopup()}
                        >
                          Add Drugs
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid mt-3">
                    <div className="banner-mid">
                      <div>
                        <h6 className="text-dark fw-bold fs-4">Drug List</h6>
                      </div>
                      <div>
                        <p className="fw-bold text-dark fw-bold fs-4">
                          Total Drug - 52
                        </p>
                      </div>
                    </div>
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno" style={{ width: "10%" }}>
                              Drug ID
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Drug Name
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Drug Strength
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Instructions
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td className="table-sno" style={{ width: "10%" }}>
                              1
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Paracetamol
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              400 Mg
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Take Only incase of fever
                            </td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditDrugsPopup()}
                              >
                                Edit
                              </button>
                              <button className="btn btn-danger mx-1">
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno" style={{ width: "10%" }}>
                              1
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Paracetamol
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              400 Mg
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Take Only incase of fever
                            </td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditDrugsPopup()}
                              >
                                Edit
                              </button>
                              <button className="btn btn-danger mx-1">
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno" style={{ width: "10%" }}>
                              1
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Paracetamol
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              400 Mg
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Take Only incase of fever
                            </td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditDrugsPopup()}
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
          <div className={`popup-container${showAddDrugs ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Drugs</h4>
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
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
                  placeholder="Add strength"
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
          <div className={`popup-container${showEditDrugs ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Edit Drugs Details</h4>
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
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

export default AdminDrugSetting;
const Container = styled.div`
  .inputser {
    border-radius: 1.5rem;
    padding: 0.5rem;
    width: 90%;
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

  th {
    background-color: #1abc9c;
    color: #000;
  }
`;
