import React, { useState } from "react";
import styled from "styled-components";

const AdminLab = () => {
  const [showPopup, setShowPopup] = useState(false);

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
                <th>Lab Name</th>
                <th>Lab Type</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td>Inhouse Dental Lab Works</td>
                <td>Internal</td>
                <td>+91-999965651</td>
                <td>maheshkuldeep@gmail.com</td>
                <td>Jabalpur</td>
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
                <td>Inhouse Dental Lab Works</td>
                <td>Internal</td>
                <td>+91-999965651</td>
                <td>maheshkuldeep@gmail.com</td>
                <td>Jabalpur</td>
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
                <td>Inhouse Dental Lab Works</td>
                <td>Internal</td>
                <td>+91-999965651</td>
                <td>maheshkuldeep@gmail.com</td>
                <td>Jabalpur</td>
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
                <td>Inhouse Dental Lab Works</td>
                <td>Internal</td>
                <td>+91-999965651</td>
                <td>maheshkuldeep@gmail.com</td>
                <td>Jabalpur</td>
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
                <td>Inhouse Dental Lab Works</td>
                <td>Internal</td>
                <td>+91-999965651</td>
                <td>maheshkuldeep@gmail.com</td>
                <td>Jabalpur</td>
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
              <h2>Update Lab Details</h2>
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

          {/* popup for updating notice */}
        </div>
      </Container>
    </>
  );
};

export default AdminLab;
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
