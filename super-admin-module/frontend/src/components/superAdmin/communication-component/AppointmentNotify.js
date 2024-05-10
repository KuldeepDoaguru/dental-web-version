import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const AppointmentNotify = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [addNotify, setAddNotify] = useState(false);
  const [showUpNotify, setShowUpNotify] = useState(false);
  const [selected, setSelected] = useState();
  const [getNotify, setGetNotify] = useState([]);
  const [notiDetails, setNotiDetails] = useState({
    notification_tag: "",
    notification_msg: "",
    sms: "",
    email: "",
    whatsapp: "",
  });
  const [upNotiDetails, setUpNotiDetails] = useState({
    notification_tag: "",
    notification_msg: "",
    sms: "",
    email: "",
    whatsapp: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNotiDetails({
      ...notiDetails,
      [name]: value,
    });
  };

  const handleUpChange = (event) => {
    const { name, value } = event.target;
    setUpNotiDetails({
      ...upNotiDetails,
      [name]: value,
    });
  };

  const openAddPreTempPopup = () => {
    setAddNotify(true);
  };

  const openEditPreTempPopup = (id) => {
    setSelected(id);
    console.log("open pop up");
    setShowUpNotify(true);
  };

  const closeUpdatePopup = () => {
    setAddNotify(false);
    setShowUpNotify(false);
  };

  const getNotifyList = async () => {
    try {
      const { data } = await axios.get(
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getNotifyList",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setGetNotify(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNotifyTags = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/addNotifyCommunication",
        notiDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      closeUpdatePopup();
      getNotifyList();
      cogoToast.success("data added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateNotifyTags = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/updateNotifyTagsDetails/${selected}`,
        upNotiDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      closeUpdatePopup();
      getNotifyList();
      cogoToast.success("data updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotifyTags = async (id) => {
    try {
      const response = await axios.delete(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/deleteNotifyTags/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getNotifyList();
      cogoToast.success("data deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(notiDetails);
  console.log(getNotify);
  console.log(upNotiDetails);

  useEffect(() => {
    getNotifyList();
  }, []);

  return (
    <>
      <Container>
        <h1>Appointment Notification Settings</h1>
        <div className="mt-2">
          <button
            className="btn btn-success fw-bold p-2"
            onClick={() => openAddPreTempPopup()}
          >
            Add Notification Tag
          </button>
        </div>
        <div className="container-fluid mt-5">
          {getNotify?.map((item) => (
            <>
              <div className="row mt-2">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="container">
                    <div className="row">
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <button className="btn btn-info">
                          {item.notification_tag}
                        </button>
                      </div>
                      <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                        <button className="btn btn-secondary">
                          {item.notification_msg}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12">
                  <div className="d-flex mrgn-mobile">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked={item.sms === "enable" ? true : false}
                      />
                      <label
                        class="form-check-label fw-bold"
                        for="flexCheckDefault"
                      >
                        SMS
                      </label>
                    </div>
                    <div class="form-check mx-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked={item.email === "enable" ? true : false}
                      />
                      <label
                        class="form-check-label fw-bold"
                        for="flexCheckChecked"
                      >
                        Email
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        checked={item.whatsapp === "enable" ? true : false}
                      />
                      <label
                        class="form-check-label fw-bold"
                        for="flexCheckDefault"
                      >
                        Whatsapp
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 col-sm-12 col-12">
                  <div className="d-flex mrgn-mobile">
                    <button
                      className="btn btn-warning fw-bold p-2"
                      onClick={() => openEditPreTempPopup(item.notify_id)}
                    >
                      Change
                    </button>
                    <button
                      className="btn btn-danger fw-bold p-2 mx-2"
                      onClick={() => deleteNotifyTags(item.notify_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
          {/* ***************************************************************************************************** */}
          {/* pop-up for adding notification */}
          <div className={`popup-container${addNotify ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Notification Tag Details</h4>
              <form className="d-flex flex-column" onSubmit={addNotifyTags}>
                <div className="d-flex">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Notification Tag
                    </label>
                    <input
                      type="text"
                      placeholder="notification tag"
                      class="form-control"
                      name="notification_tag"
                      value={notiDetails.notification_tag}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-3 mx-2">
                    <label for="exampleFormControlInput1" class="form-label">
                      Notification MSG
                    </label>
                    <input
                      type="text"
                      placeholder="notification msg"
                      class="form-control"
                      name="notification_msg"
                      value={notiDetails.notification_msg}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-3">
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      SMS
                    </label>
                    <select
                      name="sms"
                      value={notiDetails.sms}
                      class="form-control"
                      onChange={handleChange}
                      id=""
                    >
                      <option value="">-select-</option>
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </select>
                  </div>
                  <div className="mx-2">
                    <label for="exampleFormControlInput1" class="form-label">
                      EMAIL
                    </label>
                    <select
                      name="email"
                      value={notiDetails.email}
                      class="form-control"
                      onChange={handleChange}
                      id=""
                    >
                      <option value="">-select-</option>
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </select>
                  </div>
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      WHATSAPP
                    </label>
                    <select
                      name="whatsapp"
                      value={notiDetails.whatsapp}
                      class="form-control"
                      onChange={handleChange}
                      id=""
                    >
                      <option value="">-select-</option>
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-start">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 mx-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for adding notification*/}
          {/* ************************************************************************************* */}
          {/* ***************************************************************************************************** */}
          {/* pop-up for adding notification */}
          <div className={`popup-container${showUpNotify ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center mb-3">
                Update Notification Tag Details
              </h4>
              <hr />
              <form className="d-flex flex-column" onSubmit={updateNotifyTags}>
                <div className="d-flex">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Notification Tag
                    </label>
                    <input
                      type="text"
                      placeholder="notification tag"
                      class="form-control"
                      name="notification_tag"
                      value={upNotiDetails.notification_tag}
                      onChange={handleUpChange}
                    />
                  </div>
                  <div class="mb-3 mx-2">
                    <label for="exampleFormControlInput1" class="form-label">
                      Notification MSG
                    </label>
                    <input
                      type="text"
                      placeholder="notification msg"
                      class="form-control"
                      name="notification_msg"
                      value={upNotiDetails.notification_msg}
                      onChange={handleUpChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-start mb-3">
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      SMS
                    </label>
                    <select
                      name="sms"
                      value={upNotiDetails.sms}
                      class="form-control"
                      onChange={handleUpChange}
                      id=""
                    >
                      <option value="">-select-</option>
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </select>
                  </div>
                  <div className="mx-2">
                    <label for="exampleFormControlInput1" class="form-label">
                      EMAIL
                    </label>
                    <select
                      name="email"
                      value={upNotiDetails.email}
                      class="form-control"
                      onChange={handleUpChange}
                      id=""
                    >
                      <option value="">-select-</option>
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </select>
                  </div>
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      WHATSAPP
                    </label>
                    <select
                      name="whatsapp"
                      value={upNotiDetails.whatsapp}
                      class="form-control"
                      onChange={handleUpChange}
                      id=""
                    >
                      <option value="">-select-</option>
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-start">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 mx-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for adding notification*/}
          {/* ************************************************************************************* */}
        </div>
      </Container>
    </>
  );
};

export default AppointmentNotify;
const Container = styled.div`
  .savebtn {
    background-color: #004aad;
    border: none;
    color: white;
  }

  .btncenter {
    display: flex;
    justify-content: flex-end;
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

  .mrgn-mobile {
    @media screen and (max-width: 900px) {
      margin-top: 1rem;
    }
  }
`;
