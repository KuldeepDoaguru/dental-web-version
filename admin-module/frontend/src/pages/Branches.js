import React, { useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sider from "../components/Sider";
import { Link } from "react-router-dom";

const Branches = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ notice: "" });
  const [popupVisible, setPopupVisible] = useState(false);

  const openUpdatePopup = (index, item) => {
    setSelectedItem(item);
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
                          <h4>Select Branch : </h4>
                        </div>
                        <div>
                          <select
                            name="branch"
                            id="branch"
                            className="mx-2 p-2 rounded shadow select-style"
                          >
                            <option value="Madan Mahal" className="fw-bold">
                              Madan Mahal
                            </option>
                            <option value="Madan Mahal" className="fw-bold">
                              Ranjhi
                            </option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* pop-up for creating notice */}
                    <div
                      className={`popup-container${showPopup ? " active" : ""}`}
                    >
                      <div className="popup">
                        <h2>Update Branch Details</h2>
                        <form
                          className="d-flex flex-column"
                          // onSubmit={handleNoticeSubmit}
                        >
                          <input
                            type="text"
                            placeholder="branch name"
                            // value={noticeData.linkURL}
                            // onChange={(e) =>
                            //   setNoticeData({
                            //     ...noticeData,
                            //     linkURL: e.target.value,
                            //   })
                            // }
                          />
                          <textarea
                            placeholder="update branch address"
                            rows="4"
                            cols="50"
                            required
                            // value={noticeData.noticeText}
                            // onChange={(e) =>
                            //   setNoticeData({
                            //     ...noticeData,
                            //     noticeText: e.target.value,
                            //   })
                            // }
                          />
                          <input
                            type="text"
                            placeholder="update branch contact number"
                            // value={noticeData.linkURL}
                            // onChange={(e) =>
                            //   setNoticeData({
                            //     ...noticeData,
                            //     linkURL: e.target.value,
                            //   })
                            // }
                          />
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

                    <h2 className="text-center"> Branch List </h2>
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
                                Branch Address
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Contact Number
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
                                Madan Mahal, Nagpur Road
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
                                <button
                                  className="btn btn-warning"
                                  onClick={() => openUpdatePopup()}
                                >
                                  Edit Details
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

export default Branches;
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

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
