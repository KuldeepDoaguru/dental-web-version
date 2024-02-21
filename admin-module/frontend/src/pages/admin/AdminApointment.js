import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";

const AdminApointment = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openUpdatePopup = (index, item) => {
    // setSelectedItem(item);
    setShowPopup(true);
  };

  const closeUpdatePopup = () => {
    setShowPopup(false);
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
                <div className="row d-flex justify-content-between mx-3">
                  <div className="col-12 col-md-12 mt-4">
                    <h2 className="text-center"> Appointment Details </h2>
                    <div className="container-fluid mt-3">
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th className="table-sno">SN</th>
                              <th>Patient UHID</th>

                              <th className="table-small">Patient Name</th>
                              <th className="table-small">Contact Number</th>
                              <th className="table-small">Assigned Doctor</th>
                              <th className="table-small">
                                Appointment Date & Time
                              </th>
                              <th className="table-small">Appointed by</th>

                              <th className="table-small">Treatment Status</th>
                              <th className="table-small">Payment Status</th>
                              <th className="table-small">
                                Payment Date & Time
                              </th>

                              <th className="table-small">Updated by</th>
                              <th className="table-small">
                                Treatment Provided
                              </th>

                              <th className="table-small">Edit</th>
                              <th className="table-small">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-row">
                              <td className="table-sno">1</td>
                              <td className="table-small">Shubham</td>
                              <td>007</td>
                              <td className="table-small">Dev ansh</td>
                              <td className="table-small">8602161019</td>
                              <td className="table-small">Treated</td>
                              <td className="table-small">Payment Complete</td>
                              <td className="table-small">
                                12/12/2024 12:00PM
                              </td>

                              <td className="table-small">mohit</td>
                              <td className="table-small">mohit</td>
                              <td className="table-small">09-02-2024</td>
                              <td className="table-small">
                                <button className="btn btn-info">
                                  View Treatment
                                </button>
                              </td>
                              <td className="table-small">
                                <button
                                  className="btn btn-warning"
                                  onClick={() => openUpdatePopup()}
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="table-small">
                                <button className="btn btn-danger">
                                  Delete
                                </button>
                              </td>
                            </tr>
                            <tr className="table-row">
                              <td className="table-sno">1</td>
                              <td className="table-small">Shubham</td>
                              <td>007</td>
                              <td className="table-small">Dev ansh</td>
                              <td className="table-small">8602161019</td>
                              <td className="table-small">Treated</td>
                              <td className="table-small">Payment Complete</td>
                              <td className="table-small">
                                12/12/2024 12:00PM
                              </td>

                              <td className="table-small">mohit</td>
                              <td className="table-small">mohit</td>
                              <td className="table-small">09-02-2024</td>
                              <td className="table-small">
                                <button className="btn btn-info">
                                  View Treatment
                                </button>
                              </td>
                              <td className="table-small">
                                <button
                                  className="btn btn-warning"
                                  onClick={() => openUpdatePopup()}
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="table-small">
                                <button className="btn btn-danger">
                                  Delete
                                </button>
                              </td>
                            </tr>
                            <tr className="table-row">
                              <td className="table-sno">1</td>
                              <td className="table-small">Shubham</td>
                              <td>007</td>
                              <td className="table-small">Dev ansh</td>
                              <td className="table-small">8602161019</td>
                              <td className="table-small">Treated</td>
                              <td className="table-small">Payment Complete</td>
                              <td className="table-small">
                                12/12/2024 12:00PM
                              </td>

                              <td className="table-small">mohit</td>
                              <td className="table-small">mohit</td>
                              <td className="table-small">09-02-2024</td>
                              <td className="table-small">
                                <button className="btn btn-info">
                                  View Treatment
                                </button>
                              </td>
                              <td className="table-small">
                                <button
                                  className="btn btn-warning"
                                  onClick={() => openUpdatePopup()}
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="table-small">
                                <button className="btn btn-danger">
                                  Delete
                                </button>
                              </td>
                            </tr>
                            <tr className="table-row">
                              <td className="table-sno">1</td>
                              <td className="table-small">Shubham</td>
                              <td>007</td>
                              <td className="table-small">Dev ansh</td>
                              <td className="table-small">8602161019</td>
                              <td className="table-small">Treated</td>
                              <td className="table-small">Payment Complete</td>
                              <td className="table-small">
                                12/12/2024 12:00PM
                              </td>

                              <td className="table-small">mohit</td>
                              <td className="table-small">mohit</td>
                              <td className="table-small">09-02-2024</td>
                              <td className="table-small">
                                <button className="btn btn-info">
                                  View Treatment
                                </button>
                              </td>
                              <td className="table-small">
                                <button
                                  className="btn btn-warning"
                                  onClick={() => openUpdatePopup()}
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="table-small">
                                <button className="btn btn-danger">
                                  Delete
                                </button>
                              </td>
                            </tr>
                            <tr className="table-row">
                              <td className="table-sno">1</td>
                              <td className="table-small">Shubham</td>
                              <td>007</td>
                              <td className="table-small">Dev ansh</td>
                              <td className="table-small">8602161019</td>
                              <td className="table-small">Treated</td>
                              <td className="table-small">Payment Complete</td>
                              <td className="table-small">
                                12/12/2024 12:00PM
                              </td>

                              <td className="table-small">mohit</td>
                              <td className="table-small">mohit</td>
                              <td className="table-small">09-02-2024</td>
                              <td className="table-small">
                                <button className="btn btn-info">
                                  View Treatment
                                </button>
                              </td>
                              <td className="table-small">
                                <button
                                  className="btn btn-warning"
                                  onClick={() => openUpdatePopup()}
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="table-small">
                                <button className="btn btn-danger">
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
          {/* pop-up for edit appointment */}
          <div className={`popup-container${showPopup ? " active" : ""}`}>
            <div className="popup">
              <h2 className="text-center fw-bold">Update Apointment Details</h2>
              <hr />
              <form
                className="d-flex flex-column"
                // onSubmit={handleNoticeSubmit}
              >
                <div className="d-flex">
                  <div class="d-flex flex-column input-group mb-3">
                    <label htmlFor="">Update Patient UHID</label>
                    <input
                      type="text"
                      placeholder="update Patient UHID"
                      className="rounded p-1 shadow"
                      // value={noticeData.linkURL}
                      // onChange={(e) =>
                      //   setNoticeData({
                      //     ...noticeData,
                      //     linkURL: e.target.value,
                      //   })
                      // }
                    />
                  </div>
                  <div class="d-flex flex-column input-group mb-3 mx-2">
                    <label htmlFor="">Update Patient Name</label>
                    <input
                      type="text"
                      placeholder="update Patient Name"
                      className="rounded p-1 shadow"
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
                <div className="d-flex">
                  <div class="d-flex flex-column input-group mb-3">
                    <label htmlFor="">Update Patient contact</label>
                    <input
                      type="text"
                      placeholder="update Patient contact"
                      className="rounded p-1 shadow"
                      // value={noticeData.linkURL}
                      // onChange={(e) =>
                      //   setNoticeData({
                      //     ...noticeData,
                      //     linkURL: e.target.value,
                      //   })
                      // }
                    />
                  </div>
                  <div class="d-flex flex-column input-group mb-3 mx-2">
                    <label htmlFor="">Asigned Doctor</label>
                    <select
                      type="text"
                      placeholder=""
                      className="rounded p-1 shadow"
                      // value={noticeData.linkURL}
                      // onChange={(e) =>
                      //   setNoticeData({
                      //     ...noticeData,
                      //     linkURL: e.target.value,
                      //   })
                      // }
                    >
                      <option value="Shubham singh">Shubham singh</option>
                      <option value="Mohit singh">Mohit singh</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex">
                  <div class="d-flex flex-column input-group mb-3">
                    <label htmlFor="">Apointment Date and Time</label>
                    <input
                      type="date"
                      placeholder="Apointment Date and Time"
                      className="rounded p-1 shadow"
                      // value={noticeData.linkURL}
                      // onChange={(e) =>
                      //   setNoticeData({
                      //     ...noticeData,
                      //     linkURL: e.target.value,
                      //   })
                      // }
                    />
                  </div>
                  <div class="d-flex flex-column input-group mb-3 mx-2">
                    <label htmlFor="">Treatment Status</label>
                    <select name="" id="" className="rounded p-1 shadow">
                      <option value="">Treated</option>
                      <option value="">Hold</option>
                      <option value="">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex">
                  <div class="d-flex flex-column input-group mb-3">
                    <label htmlFor="">Payment Status</label>
                    <select name="" id="" className="rounded p-1 shadow">
                      <option value="">Success</option>
                      <option value="">Pending</option>
                    </select>
                  </div>
                  <div class="d-flex flex-column input-group mb-3 mx-2">
                    <label htmlFor="">Payment date and time</label>
                    <input
                      type="date"
                      placeholder="Payment date and time"
                      className="rounded p-1 shadow"
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
                <div className="d-flex">
                  <div class="d-flex flex-column input-group mb-3">
                    <label htmlFor="">Appointed by</label>
                    <select name="" id="" className="rounded p-1 shadow">
                      <option value="">Mohit</option>
                      <option value="">Shubham</option>
                      <option value="">Naman</option>
                    </select>
                  </div>
                  <div class="d-flex flex-column input-group mb-3 mx-2">
                    <label htmlFor="">Updated by</label>
                    <select name="" id="" className="rounded p-1 shadow">
                      <option value="">Mohit</option>
                      <option value="">Shubham</option>
                      <option value="">Naman</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-success mt-2 fw-bold shadow"
                  >
                    update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 mx-2 fw-bold shadow"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* popup for edit appointment */}
        </div>
      </Container>
    </>
  );
};

export default AdminApointment;
const Container = styled.div`
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
    padding: 4rem;
    width: 50%;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  th {
    background-color: #1abc9c;
    color: #000;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  label {
    font-weight: bold;
  }
`;
