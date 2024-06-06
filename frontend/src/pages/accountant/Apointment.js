import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";

const Apointment = () => {
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
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="row d-flex justify-content-between mx-3">
                  <div className="col-12 col-md-12 mt-4">
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

                    {/* pop-up for creating notice */}
                    <div
                      className={`popup-container${showPopup ? " active" : ""}`}
                    >
                      <div className="popup">
                        <h2>Update Apointment Details</h2>
                        <form
                          className="d-flex flex-column"
                          // onSubmit={handleNoticeSubmit}
                        >
                          <label htmlFor="">Select Branch</label>
                          <select
                            type="text"
                            placeholder="branch name"
                            className="rounded p-1"
                            // value={noticeData.linkURL}
                            // onChange={(e) =>
                            //   setNoticeData({
                            //     ...noticeData,
                            //     linkURL: e.target.value,
                            //   })
                            // }
                          >
                            <option value="Madan Mahal">Madan Mahal</option>
                            <option value="Ranjhi">Ranjhi</option>
                          </select>
                          <br />
                          <label htmlFor="">Select Doctor</label>
                          <select
                            type="text"
                            placeholder=""
                            className="rounded p-1"
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
                          <br />
                          <label htmlFor="">Update Patient Name</label>
                          <input
                            type="text"
                            placeholder="update Patient Name"
                            className="rounded p-1"
                            // value={noticeData.linkURL}
                            // onChange={(e) =>
                            //   setNoticeData({
                            //     ...noticeData,
                            //     linkURL: e.target.value,
                            //   })
                            // }
                          />
                          <br />
                          <label htmlFor="">Update Patient Number</label>
                          <input
                            type="text"
                            placeholder="update Patient contact number"
                            className="rounded p-1"
                            // value={noticeData.linkURL}
                            // onChange={(e) =>
                            //   setNoticeData({
                            //     ...noticeData,
                            //     linkURL: e.target.value,
                            //   })
                            // }
                          />
                          <br />
                          <label htmlFor="">Update Date and Time</label>
                          <input
                            type="date"
                            placeholder="update date and time"
                            className="rounded p-1"
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
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              update
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

                    {/* popup for updating notice */}

                    <h2 className="text-center"> Appointment Details </h2>
                    <div className="container mt-3">
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th
                                className="table-sno"
                                style={{ width: "10%" }}
                              >
                                SN
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Branch Name
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Assigned Doctor
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Patient Name
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Patient Number
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Created by
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Updated by
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Appointment Date
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Edit
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Delete
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-sno"
                                style={{ width: "10%" }}
                              >
                                1
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Madan Mahal
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Shubham
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Dev ansh
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                8602161019
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                mohit
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                mohit
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                09-02-2024
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                <button
                                  className="btn btn-warning"
                                  onClick={() => openUpdatePopup()}
                                >
                                  Edit
                                </button>
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
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
        </div>
      </Container>
    </>
  );
};

export default Apointment;
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
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
