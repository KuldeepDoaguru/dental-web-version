import React, { useState } from "react";
import styled from "styled-components";

const AdminLabTask = () => {
  const [showPopup, setShowPopup] = useState(false);
  //   const [showAddLab, setShowAddLab] = useState(false);

  const openUpdatePopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowPopup(true);
  };

  const closeUpdatePopup = () => {
    setShowPopup(false);
  };

  console.log(showPopup);

  return (
    <>
      <Container>
        <div class="table-responsive mt-4">
          <table class="table table-bordered">
            <thead className="table-head">
              <tr>
                <th>Lab Task Name</th>
                <th>Lab Task Code</th>
                <th>Waiting Days for Task</th>
                <th>Default Lab</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td>Full Dentures</td>
                <td>LAB2015</td>
                <td>same day</td>
                <td>Lab Name</td>
                <td>500</td>
                <td>12/12/2024</td>

                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => openUpdatePopup()}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger mx-1">Delete</button>
                </td>
              </tr>
              <tr className="table-row">
                <td>Full Dentures</td>
                <td>LAB2015</td>
                <td>same day</td>
                <td>Lab Name</td>
                <td>500</td>
                <td>12/12/2024</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => openUpdatePopup()}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger mx-1">Delete</button>
                </td>
              </tr>
              <tr className="table-row">
                <td>Full Dentures</td>
                <td>LAB2015</td>
                <td>same day</td>
                <td>Lab Name</td>
                <td>500</td>
                <td>12/12/2024</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => openUpdatePopup()}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger mx-1">Delete</button>
                </td>
              </tr>
              <tr className="table-row">
                <td>Full Dentures</td>
                <td>LAB2015</td>
                <td>same day</td>
                <td>Lab Name</td>
                <td>500</td>
                <td>12/12/2024</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => openUpdatePopup()}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger mx-1">Delete</button>
                </td>
              </tr>
              <tr className="table-row">
                <td>Full Dentures</td>
                <td>LAB2015</td>
                <td>same day</td>
                <td>Lab Name</td>
                <td>500</td>
                <td>12/12/2024</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => openUpdatePopup()}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger mx-1">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          {/* pop-up for creating notice */}
          <div className={`popup-container${showPopup ? " active" : ""}`}>
            <div className="popup">
              <h2>Update Lab Test Details</h2>
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
                  placeholder="Waiting Days"
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
                  placeholder="Default Lab"
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
        </div>
      </Container>
    </>
  );
};

export default AdminLabTask;
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
