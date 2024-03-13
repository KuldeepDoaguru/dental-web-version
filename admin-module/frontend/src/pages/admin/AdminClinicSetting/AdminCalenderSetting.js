import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
// import Sider from "../../../components/Sider";
// import Header from "../../../components/Header";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
// import BranchSelector from "../../../components/BranchSelector";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";

const AdminCalenderSetting = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const location = useLocation();
  const [showAddBlockDays, setShowAddBlockDays] = useState(false);
  const [showEditBlockDays, setShowEditBlockDays] = useState(false);
  const [brData, setBrData] = useState([]);
  const [holidayList, setHolidayList] = useState([]);
  const [selected, setSelected] = useState();
  const [upData, setUpData] = useState({
    open_time: "",
    close_time: "",
    appoint_slot_duration: "",
  });
  const [holidays, setHolidays] = useState({
    branch_name: branch.name,
    holiday_name: "",
    holiday_date: "",
    holiday_start_time: "",
    holiday_end_time: "",
    notes: "",
  });
  const [upHolidays, setUpHolidays] = useState({
    holiday_name: "",
    holiday_date: "",
    holiday_start_time: "",
    holiday_end_time: "",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "radio" && checked) {
      // For radio inputs
      setUpData({
        ...upData,
        appoint_slot_duration: value,
      });
    } else if (type === "time") {
      // For time inputs
      setUpData({
        ...upData,
        [name]: value,
      });
    }
  };

  const handleHoliday = (event) => {
    const { name, value } = event.target;
    setHolidays({
      ...holidays,
      [name]: value,
    });
  };

  const handleHolidayUpdate = (event) => {
    const { name, value } = event.target;
    setUpHolidays({
      ...upHolidays,
      [name]: value,
    });
  };

  console.log(holidays);

  const openAddBlockDaysPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddBlockDays(true);
  };

  const openEditBlockDaysPopup = (id) => {
    console.log(id);
    setSelected(id);
    console.log("open pop up");
    setShowEditBlockDays(true);
  };

  const closeUpdatePopup = () => {
    setShowAddBlockDays(false);
    setShowEditBlockDays(false);
  };

  const goBack = () => {
    window.history.go(-1);
  };

  const getBranchDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com//api/v1/admin/getBranchDetailsByBranch/${branch.name}`
      );
      setBrData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBranchDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalguruadmin.doaguru.com//api/v1/admin/updateBranchCalenderSetting/${branch.name}`,
        upData
      );
      console.log(response);
      getBranchDetails();
      cogoToast.success("branch details updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBranchDetails();
  }, []);

  console.log(brData);
  console.log(upData);

  const getHolidayList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com//api/v1/admin/getHolidays/${branch.name}`
      );
      setHolidayList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addHolidays = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dentalguruadmin.doaguru.com//api/v1/admin/addBlockDays",
        holidays
      );
      // console.log(response);
      cogoToast.success("Holiday Added Successfully");
      closeUpdatePopup();
      getHolidayList();
    } catch (error) {
      console.log(error);
      cogoToast.error(error.response.data);
    }
  };

  const updateHolidetails = async (e) => {
    e.preventDefault();
    console.log(selected);
    try {
      const response = await axios.put(
        `https://dentalguruadmin.doaguru.com//api/v1/admin/updateHolidays/${selected}`,
        upHolidays
      );
      cogoToast.success("Holiday Added Successfully");
      closeUpdatePopup();
      getHolidayList();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selected);

  const deleteHoliday = async (id) => {
    try {
      const response = await axios.delete(
        `https://dentalguruadmin.doaguru.com//api/v1/admin/deleteHolidays/${id}`
      );
      cogoToast.success("Holiday Deleted Successfully");
      getHolidayList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHolidayList();
  }, [branch.name]);

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
                  <div className="d-flex justify-content-between">
                    {/* <BranchSelector /> */}
                    <div>
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="banner-mid mt-2">
                    <div>
                      <h3 className="text-light text-center">
                        Clinic Settings
                      </h3>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-center mt-2 fw-bold text-success">
                      Current Timing :{" "}
                      <span>
                        Opening Time -{" "}
                        {brData[0]?.open_time
                          .split("T")[0]
                          .split(".")[0]
                          .slice(0, 5)}
                      </span>{" "}
                      To{" "}
                      <span>
                        {" "}
                        Closing Time -{" "}
                        {brData[0]?.close_time
                          .split("T")[0]
                          .split(".")[0]
                          .slice(0, 5)}
                      </span>
                    </h6>
                    <h6 className="text-center mt-2 fw-bold text-success">
                      Current Appointment Slot :{" "}
                      <span>{brData[0]?.appoint_slot_duration}</span>
                    </h6>
                  </div>
                  <form onSubmit={updateBranchDetails}>
                    <div className="container calender-time">
                      <h6 className="fw-bold mx-2">Change Clinic Timing:</h6>
                      <input
                        type="time"
                        className="p-1 rounded"
                        value={upData.open_time}
                        onChange={handleChange}
                        name="open_time" // Add name attribute
                      />{" "}
                      <p className="mx-2">To</p>
                      <input
                        type="time"
                        className="p-1 rounded"
                        value={upData.close_time}
                        onChange={handleChange}
                        name="close_time" // Add name attribute
                      />
                    </div>
                    <div className="appointment-slot-time">
                      <div>
                        {" "}
                        <p className="fw-bold">Appointment Slot Time:</p>
                      </div>
                      <div className="d-flex mx-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="flexRadioDefault1" // Add id attribute
                            name="appoint_slot_duration" // Update name attribute
                            value="10 min"
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1" // Use htmlFor instead of for
                          >
                            10 min
                          </label>
                        </div>
                        <div className="form-check mx-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="flexRadioDefault2" // Add id attribute
                            name="appoint_slot_duration" // Update name attribute
                            value="15 min"
                            checked={upData.appoint_slot_duration === "15 min"} // Check based on state
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2" // Use htmlFor instead of for
                          >
                            15 min
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="flexRadioDefault3" // Add id attribute
                            name="appoint_slot_duration" // Update name attribute
                            value="30 min"
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault3" // Use htmlFor instead of for
                          >
                            30 min
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-success mx-2">Change</button>
                    </div>
                  </form>

                  <div className="container-fluid mt-3">
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
                            <th className="table-sno">Holiday Name</th>
                            <th className="table-small">Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th className="table-small">Notes</th>
                            <th className="table-small">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {holidayList?.map((item) => (
                            <>
                              <tr className="table-row">
                                <td>{item.holiday_name}</td>
                                <td className="table-sno">
                                  {item.holiday_date.split("T")[0]}
                                </td>
                                <td className="table-small">
                                  {item.holiday_start_time}
                                </td>
                                <td className="table-small">
                                  {item.holiday_end_time}
                                </td>
                                <td className="table-small">{item.notes}</td>

                                <td>
                                  <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                      openEditBlockDaysPopup(item.holiday_id)
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-danger mx-1"
                                    onClick={() =>
                                      deleteHoliday(item.holiday_id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </>
                          ))}
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
              <form className="d-flex flex-column" onSubmit={addHolidays}>
                <input
                  type="text"
                  placeholder="holiday name"
                  className="rounded p-2"
                  name="holiday_name"
                  value={holidays.holiday_name}
                  onChange={handleHoliday}
                />
                <br />
                <input
                  type="date"
                  placeholder="select date"
                  className="rounded p-2"
                  name="holiday_date"
                  value={holidays.holiday_date}
                  onChange={handleHoliday}
                />
                <br />
                <input
                  type="time"
                  placeholder="Add start time"
                  className="rounded p-2"
                  name="holiday_start_time"
                  value={holidays.holiday_start_time}
                  onChange={handleHoliday}
                />
                <br />
                <input
                  type="time"
                  placeholder="Add end time"
                  className="rounded p-2"
                  name="holiday_end_time"
                  value={holidays.holiday_end_time}
                  onChange={handleHoliday}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add Notes"
                  className="rounded p-2"
                  name="notes"
                  value={holidays.notes}
                  onChange={handleHoliday}
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
              <form className="d-flex flex-column" onSubmit={updateHolidetails}>
                <input
                  type="text"
                  placeholder="holiday name"
                  className="rounded p-2"
                  name="holiday_name"
                  value={upHolidays.holiday_name}
                  onChange={handleHolidayUpdate}
                />
                <br />
                <input
                  type="date"
                  placeholder="select date"
                  className="rounded p-2"
                  name="holiday_date"
                  value={upHolidays.holiday_date}
                  onChange={handleHolidayUpdate}
                />
                <br />
                <input
                  type="time"
                  placeholder="Add start time"
                  className="rounded p-2"
                  name="holiday_start_time"
                  value={upHolidays.holiday_start_time}
                  onChange={handleHolidayUpdate}
                />
                <br />
                <input
                  type="time"
                  placeholder="Add end time"
                  className="rounded p-2"
                  name="holiday_end_time"
                  value={upHolidays.holiday_end_time}
                  onChange={handleHolidayUpdate}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add Notes"
                  className="rounded p-2"
                  name="notes"
                  value={upHolidays.notes}
                  onChange={handleHolidayUpdate}
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

export default AdminCalenderSetting;
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
