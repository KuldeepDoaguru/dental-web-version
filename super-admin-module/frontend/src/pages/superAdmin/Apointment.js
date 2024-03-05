import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";
import BranchSelector from "../../components/BranchSelector";
import { useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";

const Apointment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [appointmentList, setAppointmentList] = useState([]);
  const [timeLIneData, setTimeLineData] = useState();
  const [updateData, setUpdateData] = useState({
    branch: branch.name,
    patientName: "",
    patContact: "",
    assignedDoc: "",
    appointedBy: "",
    appointDateTime: "",
    updatedBy: "",
    appointment_status: "",
  });
  const [selectedItem, setSelectedItem] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const openUpdatePopup = (id) => {
    console.log(id);
    setSelectedItem(id);
    setShowPopup(true);
    // updateAppData(e, id);
  };

  const closeUpdatePopup = () => {
    setShowPopup(false);
  };

  const getAppointList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getAppointmentData/${branch.name}`
      );
      console.log(response);
      setAppointmentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointList();
  }, [branch.name]);

  console.log(appointmentList);
  console.log(updateData);
  console.log(selectedItem);

  const timelineData = async (updateData) => {
    console.log(updateData);
    try {
      const response = await axios.post(
        "http://localhost:7777/api/v1/super-admin/insertTimelineEvent",
        {
          type: "appointment",
          description: "apointment scheduled",
          branch: branch.name,
          patientId: "DH0001",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAppData = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:7777/api/v1/super-admin/updateAppointData/${id}`,
        updateData
      );
      console.log(response);
      setTimeLineData(response);
      closeUpdatePopup();
      timelineData(updateData);
      cogoToast.success("Appointment Details Updated Successfully");
      getAppointList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7777/api/v1/super-admin/deleteAppointData/${id}`
      );
      console.log(response);
      cogoToast.success("Appointment Deleted Successfully");
      getAppointList();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(timeLIneData);

  const todayDate = new Date();

  // Get year, month, and date
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate.slice(0, 7));

  const filterAppointDataByMonth = appointmentList?.filter((item) => {
    return (
      item.apointment_date_time.split("T")[0].slice(0, 7) ===
      formattedDate.slice(0, 7)
    );
  });

  console.log(filterAppointDataByMonth);

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
                      <BranchSelector />
                    </div>

                    <h2 className="text-center"> Appointment Details </h2>
                    <div className="container-fluid mt-3">
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th className="table-sno">Appointment ID</th>
                              <th>Patient UHID</th>

                              <th className="table-small">Patient Name</th>
                              <th className="table-small">Contact Number</th>
                              <th className="table-small">Assigned Doctor</th>
                              {/* <th className="table-small">
                                Treatment Provided
                              </th> */}
                              {/* <th className="table-small">Treatment Status</th>
                              <th className="table-small">Payment Status</th>
                              <th className="table-small">
                                Payment Date & Time
                              </th> */}

                              <th className="table-small">Appointed by</th>
                              <th className="table-small">Updated by</th>
                              <th className="table-small">
                                Appointment Date & Time
                              </th>
                              <th className="table-small">
                                Appointment Status
                              </th>
                              <th>Cancel Reason</th>
                              <th className="table-small">Edit</th>
                              <th className="table-small">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterAppointDataByMonth?.map((item) => (
                              <>
                                <tr className="table-row">
                                  <td className="table-sno">
                                    {item.appoint_id}
                                  </td>
                                  <td className="table-small">{item.uhid}</td>
                                  <td>{item.patient_name}</td>
                                  <td className="table-small">
                                    {item.patient_contact}
                                  </td>
                                  <td className="table-small">
                                    {item.assigned_doctor}
                                  </td>
                                  {/* <td className="table-small">
                                    {item.treatment_provided}
                                  </td>
                                  <td className="table-small">
                                    {item.treatment_status}
                                  </td>
                                  <td className="table-small">
                                    {item.payment_status}
                                  </td>
                                  <td className="table-small">
                                    {item.payment_date_time?.split("T")[0]}{" "}
                                    {item.payment_date_time?.split("T")[1]}
                                  </td> */}
                                  <td className="table-small">
                                    {item.appointed_by}
                                  </td>
                                  <td className="table-small">
                                    {item.updated_by ? item.updated_by : "-"}
                                  </td>
                                  <td className="table-small">
                                    {item.apointment_date_time?.split("T")[0]}{" "}
                                    {item.apointment_date_time?.split("T")[1]}
                                  </td>
                                  <td>{item.appointment_status}</td>
                                  <td>{item.cancel_reason}</td>
                                  <td className="table-small">
                                    <button
                                      className="btn btn-warning"
                                      onClick={() =>
                                        openUpdatePopup(item.appoint_id)
                                      }
                                    >
                                      Edit
                                    </button>
                                  </td>
                                  <td className="table-small">
                                    <button
                                      className="btn btn-danger"
                                      onClick={() =>
                                        deleteAppointment(item.appoint_id)
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
          </div>
          {/* ******************************************************************************************* */}
          {/* pop-up for creating notice */}
          <div className={`popup-container${showPopup ? " active" : ""}`}>
            <div className="popup">
              <h2>Update Apointment Details</h2>
              <form
                className="d-flex flex-column"
                onSubmit={(e) => updateAppData(e, selectedItem)}
              >
                <div className="d-flex">
                  <div className="d-flex flex-column input-group mb-3">
                    <label htmlFor="">Select Branch</label>
                    <select
                      type="text"
                      placeholder="branch name"
                      className="rounded p-1"
                    >
                      <option value={branch.name}>{branch.name}</option>
                    </select>
                  </div>
                  <div className="input-group mb-3 mx-2">
                    <label htmlFor="">Update Patient Name</label>
                    <input
                      type="text"
                      name="patientName"
                      // placeholder={appointmentList[]}
                      className="rounded p-1 w-100"
                      value={updateData.patientName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="d-flex">
                  <div className="d-flex flex-column input-group mb-3">
                    <label htmlFor="">Update Patient Number</label>
                    <input
                      type="text"
                      placeholder="update Patient contact number"
                      className="rounded p-1 w-100"
                      name="patContact"
                      value={updateData.patContact}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-group mb-3 mx-2">
                    <label htmlFor="">Update Assigned Doctor</label>
                    <select
                      id=""
                      className="rounded p-1 w-100"
                      name="assignedDoc"
                      value={updateData.assignedDoc}
                      onChange={handleInputChange}
                    >
                      <option value="dev">dev</option>
                      <option value="mohit">mohit</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="input-group mb-3">
                    <label htmlFor="">Appointed by</label>
                    <input
                      type="text"
                      placeholder="Appointed by"
                      className="rounded p-1 w-100"
                      name="appointedBy"
                      value={updateData.appointedBy}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-group mb-3 mx-2">
                    <label htmlFor="">Appointment Date & Time</label>
                    <input
                      type="date"
                      placeholder="update Patient Name"
                      className="rounded p-1 w-100"
                      name="appointDateTime"
                      value={updateData.appointDateTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="input-group mb-3">
                    <label htmlFor="">Updated by</label>
                    <input
                      type="text"
                      placeholder="updated by"
                      className="rounded p-1 w-100"
                      name="updatedBy"
                      value={updateData.updatedBy}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-group mb-3 mx-2">
                    <label htmlFor="">Appointment Status</label>
                    <input
                      type="text"
                      placeholder="update Patient Name"
                      className="rounded p-1 w-100"
                      name="appointment_status"
                      value={updateData.appointment_status}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
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
          {/* **************************************************************************************************** */}
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

  th {
    background-color: #004aad;
    color: white;
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
