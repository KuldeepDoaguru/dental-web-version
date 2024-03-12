import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import { FaSearch } from "react-icons/fa";

const CalenderSetting = () => {
  const [showAddBlockDays, setShowAddBlockDays] = useState(false);
  const [showEditBlockDays, setShowEditBlockDays] = useState(false);

  const openAddBlockDaysPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddBlockDays(true);
  };

  const openEditBlockDaysPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowEditBlockDays(true);
  };

  const closeUpdatePopup = () => {
    setShowAddBlockDays(false);
    setShowEditBlockDays(false);
  };

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
                <div className="container mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <h6>Select Branch : </h6>
                      </div>
                      <div>
                        <select name="branch" id="branch" className="mx-2">
                          <option value="Madan Mahal">Madan Mahal</option>
                          <option value="Madan Mahal">Ranjhi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container mt-3">
                  <div className="banner-mid">
                    <div>
                      <h3 className="text-light">Calender Settings</h3>
                    </div>
                    <div>
                      <button className="btn btn-info">Back to settings</button>
                    </div>
                  </div>
                  <div className="container calender-time">
                    <h6 className="fw-bold mx-2">Calender Time : </h6>
                    <input type="time" /> <p className="mx-2">To</p>
                    <input type="time" />
                  </div>
                  <div className="appointment-slot-time">
                    <div>
                      {" "}
                      <p className="fw-bold">Appointment Slot Time : </p>
                    </div>
                    <div className="d-flex mx-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          10 min
                        </label>
                      </div>
                      <div class="form-check mx-2">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          15 min
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          30 min
                        </label>
                      </div>
                    </div>
                    <div></div>
                  </div>

                  <div className="container mt-3">
                    <div className="calender-time mb-2">
                      <div>
                        <h6 className="text-dark fw-bold">
                          Block Days On Calender :
                        </h6>
                      </div>
                      <div>
                        <button
                          className="btn btn-info mx-2"
                          onClick={() => openAddBlockDaysPopup()}
                        >
                          Add Block Days
                        </button>
                      </div>
                    </div>
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno" style={{ width: "10%" }}>
                              Block Days
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Block Time
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Notes
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
                              15 Feb 2024
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Full Day
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Govt Holiday
                            </td>

                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditBlockDaysPopup()}
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
                              15 Feb 2024
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Full Day
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Govt Holiday
                            </td>

                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditBlockDaysPopup()}
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
                              15 Feb 2024
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Full Day
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Govt Holiday
                            </td>

                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => openEditBlockDaysPopup()}
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
          <div
            className={`popup-container${showAddBlockDays ? " active" : ""}`}
          >
            <div className="popup">
              <h4 className="text-center">Add Drugs</h4>
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <input
                  type="date"
                  placeholder="select date"
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
                  placeholder="Add hours"
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
                  placeholder="Add Notes"
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
            className={`popup-container${showEditBlockDays ? " active" : ""}`}
          >
            <div className="popup">
              <h4 className="text-center">Edit Drugs Details</h4>
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <input
                  type="date"
                  placeholder="select date"
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
                  placeholder="Add hours"
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
                  placeholder="Add Notes"
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

export default CalenderSetting;
const Container = styled.div`
  .banner-mid {
    background-color: #1abc9c;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .calender-time {
    display: flex;
    margin-top: 1rem;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
  .appointment-slot-time {
    display: flex;
    margin-top: 1rem;
    align-content: center;
    justify-content: center;
    align-items: flex-start;
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
`;
