import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import { FaSearch } from "react-icons/fa";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";
import { IoMdArrowRoundBack } from "react-icons/io";

const AdminTreatSetting = () => {
  const [showAddTreatments, setShowAddTreatments] = useState(false);
  const [showEditTreatments, setShowEditTreatments] = useState(false);
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };

  const openAddTreatmentsPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddTreatments(true);
  };

  const openEditTreatmentsPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowEditTreatments(true);
  };

  const closeUpdatePopup = () => {
    setShowAddTreatments(false);
    setShowEditTreatments(false);
  };

  return (
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
                          <h2 className="">Treatment Settings</h2>
                        </div>
                      </nav>
                    </div>
                    <div className="mid-box">
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
                            onClick={() => openAddTreatmentsPopup()}
                          >
                            Add Treatment
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="table-responsive rounded">
                      <div className="banner-mid mt-2">
                        <div>
                          <h4 className="text-dark">Treatments</h4>
                        </div>
                        <div>
                          <h4 className="fw-bold text-dark">
                            Total Treatments - 25
                          </h4>
                        </div>
                      </div>
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno" style={{ width: "10%" }}>
                              Treatment ID
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Treatment Name
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Cost(INR)
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Maximum Discount To give
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
                              Consultation
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              500
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              0
                            </td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditTreatmentsPopup()}
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
                              Consultation
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              500
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              0
                            </td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditTreatmentsPopup()}
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
                              Consultation
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              500
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              0
                            </td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditTreatmentsPopup()}
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
        </div>
        {/* ***************************************************************************************************** */}
        {/* other pop-up */}
        {/* pop-up for adding lab */}
        <div className={`popup-container${showAddTreatments ? " active" : ""}`}>
          <div className="popup">
            <h4 className="text-center">Add Treatment</h4>
            <form
              className="d-flex flex-column"
              // onSubmit={handleNoticeSubmit}
            >
              <input
                type="text"
                placeholder="Add Treatment Name"
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
                placeholder="Add Cost"
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
                placeholder="Max Discount to give"
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
        <div
          className={`popup-container${showEditTreatments ? " active" : ""}`}
        >
          <div className="popup">
            <h4 className="text-center">Edit Drugs Details</h4>
            <form
              className="d-flex flex-column"
              // onSubmit={handleNoticeSubmit}
            >
              <input
                type="text"
                placeholder="Add Treatment Name"
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
                placeholder="Add Cost"
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
                placeholder="Max Discount to give"
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
  );
};

export default AdminTreatSetting;
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
