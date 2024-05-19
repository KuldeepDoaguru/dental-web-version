import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";
import BranchSelector from "../../components/BranchSelector";
import { useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
import ReactPaginate from "react-paginate";

const Apointment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const branch = useSelector((state) => state.branch);
  const complaintsPerPage = 10; // Number of complaints per page
  const [currentPage, setCurrentPage] = useState(0); // Start from the first page
  const user = useSelector((state) => state.user);
  const [appointmentList, setAppointmentList] = useState([]);
  const [timeLIneData, setTimeLineData] = useState();
  const [updateData, setUpdateData] = useState({
    branch: branch.name,
    patientName: "",
    patContact: "",
    assignedDoc: "",
    appointedBy: "",
    appointDateTime: "",
    updatedBy: user.id,
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
    setSelectedItem(id);
    setShowPopup(true);
  };

  const closeUpdatePopup = () => {
    setShowPopup(false);
  };

  const getAppointList = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getAppointmentData/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAppointmentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointList();
  }, [branch.name]);

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const date = String(todayDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${date}`;

  const filterforOneMonth = appointmentList?.filter((item) => {
    return item.appointment_dateTime?.slice(0, 7) === formattedDate.slice(0, 7);
  });

  const totalPages = Math.ceil(filterforOneMonth.length / complaintsPerPage);

  const filterAppointDataByMonth = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return filterforOneMonth?.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedAppointments = filterAppointDataByMonth();

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
                      <div className="table-responsive rounded">
                        <table className="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th className="table-sno">Appointment ID</th>
                              <th>Patient UHID</th>
                              <th>Treatment Package ID</th>
                              <th className="table-small">Patient Name</th>
                              <th className="table-small">Contact Number</th>
                              <th className="table-small">Assigned Doctor</th>
                              <th className="table-small">Appointed by</th>
                              <th className="table-small">Updated by</th>
                              <th className="table-small">Appointment Date & Time</th>
                              <th className="table-small">Appointment Status</th>
                              <th>Cancel Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedAppointments?.map((item) => (
                              <tr className="table-row" key={item.appoint_id}>
                                <td className="table-sno">{item.appoint_id}</td>
                                <td className="table-small">
                                  <Link
                                    to={`/patient-profile/${item.patient_uhid}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    {item.patient_uhid}
                                  </Link>
                                </td>
                                <td className="table-small">{item.tp_id}</td>
                                <td>{item.patient_name}</td>
                                <td className="table-small">{item.mobileno}</td>
                                <td className="table-small">{item.assigned_doctor_name}</td>
                                <td className="table-small">{item.appointment_created_by}</td>
                                <td className="table-small">{item.updated_by ? item.updated_by : "-"}</td>
                                <td className="table-small">
                                  {item.appointment_dateTime?.split("T")[0]}{" "}
                                  {item.appointment_dateTime?.split("T")[1]}
                                </td>
                                <td>{item.appointment_status}</td>
                                <td>{item.cancel_reason}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <PaginationContainer>
                      <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                      />
                       </PaginationContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Popup for updating appointment details */}
          <div className={`popup-container${showPopup ? " active" : ""}`}>
            <div className="popup">
              <h2>Update Appointment Details</h2>
              <form className="d-flex flex-column">
                <div className="d-flex">
                  <div className="d-flex flex-column input-group mb-3">
                    <label htmlFor="">Select Branch</label>
                    <select type="text" className="rounded p-1">
                      <option value={branch.name}>{branch.name}</option>
                    </select>
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
    white-space: nowrap;
  }
  td{
    white-space: nowrap;
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

  .pagination {
    display: flex;
    justify-content: flex-end;
    ul {
      display: flex;
      justify-content: space-between;
      gap: 15px;
      li {
        list-style: none;
      }
    }
  }
`

const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    padding: 10px;
    list-style: none;
    border-radius: 5px;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination li a {
    display: block;
    padding: 8px 16px;
    border: 1px solid black;
    color: #007bff;
    cursor: pointer;
    text-decoration: none;
  }

  .pagination li.active a {
    background-color: #007bff;
    color: white;
    border: 1px solid #007bff;
  }

  .pagination li.disabled a {
    color: #ddd;
    cursor: not-allowed;
  }

  .pagination li a:hover:not(.active) {
    background-color: #ddd;
  }
`;
