

// import React, { useEffect, useMemo, useState } from "react";
// import styled from "styled-components";
// import HeaderAdmin from "./HeaderAdmin";
// import SiderAdmin from "./SiderAdmin";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import cogoToast from "cogo-toast";
// import animationData from "../animation/loading-effect.json";
// import Lottie from "react-lottie";
// import moment from "moment";

// const AdminAppointment = () => {
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const user = useSelector((state) => state.user.currentUser);
//   const [appointmentList, setAppointmentList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [updateData, setUpdateData] = useState({
//     branch: user.branch_name,
//     patientName: "",
//     patContact: "",
//     assignedDoc: "",
//     appointedBy: "",
//     appointDateTime: "",
//     updatedBy: user.name,
//     appointment_status: "",
//   });
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 10;

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUpdateData({
//       ...updateData,
//       [name]: value,
//     });
//   };

//   const openUpdatePopup = (id) => {
//     setSelectedItem(id);
//     setShowPopup(true);
//   };

//   const closeUpdatePopup = () => {
//     setShowPopup(false);
//   };

//   const getAppointList = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/getAppointmentData/${user.branch_name}`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       setLoading(false);
//       setAppointmentList(response.data);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAppointList();
//   }, [user.branch_name]);

//   const timelineData = async (id) => {
//     try {
//       const response = await axios.post(
//         "https://dentalguruadmin.doaguru.com/api/v1/admin/insertTimelineEvent",
//         {
//           type: "appointment",
//           description: "appointment scheduled",
//           branch: user.branch_name,
//           patientId: id,
//         },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateAppData = async (e, id) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/updateAppointData/${id}`,
//         updateData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(response);
//       closeUpdatePopup();
//       timelineData(id);
//       cogoToast.success("Appointment Details Updated Successfully");
//       getAppointList();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteAppointment = async (id) => {
//     try {
//       const response = await axios.delete(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/deleteAppointData/${id}`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(response);
//       cogoToast.success("Appointment Deleted Successfully");
//       getAppointList();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const todayDate = new Date();
//   const year = todayDate.getFullYear();
//   const month = String(todayDate.getMonth() + 1).padStart(2, "0");
//   const date = String(todayDate.getDate()).padStart(2, "0");
//   const formattedDate = `${year}-${month}-${date}`;

//   const filterAppointDataByMonth = () => {
//     return appointmentList.filter(
//       (item) =>
//         item.appointment_dateTime?.split("T")[0].slice(0, 7) ===
//         formattedDate.slice(0, 7)
//     );
//   };

//   // const filterBySearchQuery = (data) => {
//   //   if (searchQuery === "") {
//   //     return data;
//   //   }
//   //   return data.filter((item) =>
//   //     item.patient_name.toLowerCase().includes(searchQuery.toLowerCase())
//   //   );
//   // };

//   const filterBySearchQuery = (data) => {
//     const trimmedSearchQuery = searchQuery.trim().toLowerCase();
//     if (trimmedSearchQuery === "") {
//       return data;
//     }
//     return data.filter(
//       (item) =>
//         item.patient_name.toLowerCase().includes(trimmedSearchQuery) ||
//         item.patient_uhid.toLowerCase().includes(trimmedSearchQuery) ||
//         item.mobileno.includes(trimmedSearchQuery)
//     );
//   };

//   const filteredData = useMemo(
//     () => filterBySearchQuery(filterAppointDataByMonth()),
//     [appointmentList, searchQuery, formattedDate]
//   );

//   // Assuming filteredData is the array of items to be paginated
//   // const filteredData = filterBySearchQuery(filterAppointDataByMonth());
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   return (
//     <>
//       <Container>
//         <HeaderAdmin />
//         <div className="main">
//           <div className="container-fluid">
//             <div className="row flex-nowrap ">
//               <div className="col-lg-1 col-md-2 col-1 p-0">
//                 <SiderAdmin />
//               </div>
//               <div
//                 className="col-lg-11 col-md-10 col-11 ps-0"
//                 style={{ marginTop: "5rem" }}
//               >
//                 <div className="row d-flex justify-content-between">
//                   <div className="col-12 col-md-12 mt-4">
//                     <div className="d-flex justify-content-between"></div>

//                     <h2 className="text-center"> Appointment Details </h2>
//                     <div className="container-fluid mt-3">
//                       <div className="d-flex justify-content-between align-items-end">
//                         <input
//                           type="text"
//                           placeholder="Search by Patient Name or UHID or mobile number"
//                           value={searchQuery}
//                           onChange={(e) => {
//                             setSearchQuery(e.target.value);
//                             setCurrentPage(1); // Reset to the first page on search
//                           }}
//                           className="search-input"
//                         />
//                         <p className="fw-bold mx-2" style={{whiteSpace:"nowrap"}}>Total Appointments : {filteredData.length}</p>
//                       </div>
//                       <div className="table-responsive rounded">
//                         {loading ? (
//                           <Lottie
//                             options={defaultOptions}
//                             height={300}
//                             width={400}
//                           ></Lottie>
//                         ) : (
//                           <>
//                             {currentItems.length === 0 ? (
//                               <div className="mb-2 fs-4 fw-bold text-center">
//                                 No appointent detail available
//                               </div>
//                             ) : (
//                               <>
//                                 <table className="table table-bordered rounded shadow">
//                                   <thead className="table-head">
//                                     <tr>
//                                       <th className="table-sno">
//                                         Appointment ID
//                                       </th>
//                                       <th>Patient UHID</th>
//                                       <th className="table-small">
//                                         Treatment Package ID
//                                       </th>
//                                       <th className="table-small">
//                                         Patient Name
//                                       </th>
//                                       <th className="table-small">
//                                         Contact Number
//                                       </th>
//                                       <th className="table-small">
//                                         Assigned Doctor
//                                       </th>
//                                       <th className="table-small">
//                                         Appointed by
//                                       </th>
//                                       <th className="table-small">
//                                         Updated by
//                                       </th>
//                                       <th className="table-small">
//                                         Appointment Date & Time
//                                       </th>
//                                       <th className="table-small">
//                                         Appointment Status
//                                       </th>
//                                       <th>Cancel Reason</th>
//                                     </tr>
//                                   </thead>
//                                   <tbody>
//                                     {currentItems.map((item) => (
//                                       <tr
//                                         className="table-row"
//                                         key={item.appoint_id}
//                                       >
//                                         <td className="table-sno">
//                                           {item.appoint_id}
//                                         </td>
//                                         <td className="table-small">
//                                           <Link
//                                             to={`/patient-profile/${item.patient_uhid}`}
//                                             style={{ textDecoration: "none" }}
//                                           >
//                                             {item.patient_uhid}
//                                           </Link>
//                                         </td>
//                                         <td className="table-small">
//                                           {item.tp_id}
//                                         </td>
//                                         <td>{item.patient_name}</td>
//                                         <td className="table-small">
//                                           {item.mobileno}
//                                         </td>
//                                         <td className="table-small">
//                                           {item.assigned_doctor_name}
//                                         </td>
//                                         <td className="table-small">
//                                           {item.appointment_created_by}
//                                         </td>
//                                         <td className="table-small">
//                                           {item.appointment_updated_by}
//                                         </td>
//                                         <td className="table-small">
//                                           {/* {item.appointment_dateTime?.split("T")[0]}{" "}
//                                  {item.appointment_dateTime?.split("T")[1]} */}
//                                           {item?.appointment_dateTime
//                                             ? moment(
//                                                 item?.appointment_dateTime,
//                                                 "YYYY-MM-DDTHH:mm"
//                                               ).format("hh:mm A")
//                                             : ""}
//                                         </td>
//                                         <td>{item.appointment_status}</td>
//                                         <td>{item.cancel_reason}</td>
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </>
//                             )}
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Pagination */}
//           <nav>
//             <ul className="pagination">
//               <li
//                 className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 >
//                   Previous
//                 </button>
//               </li>
//               {Array.from(
//                 { length: Math.ceil(filteredData.length / itemsPerPage) },
//                 (_, i) => (
//                   <li
//                     key={i}
//                     className={`page-item ${
//                       currentPage === i + 1 ? "active" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => paginate(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   </li>
//                 )
//               )}
//               <li
//                 className={`page-item ${
//                   currentPage === Math.ceil(filteredData.length / itemsPerPage)
//                     ? "disabled"
//                     : ""
//                 }`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={
//                     currentPage ===
//                     Math.ceil(filteredData.length / itemsPerPage)
//                   }
//                 >
//                   Next
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </Container>
//     </>
//   );
// };

// const Container = styled.div`
//   .popup-container {
//     display: none;
//   }
//   .popup-container.active {
//     display: block;
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 0.5);
//     z-index: 1000;
//     justify-content: center;
//     align-items: center;
//   }
//   .popup {
//     background: white;
//     padding: 2rem;
//     border-radius: 5px;
//     width: 30%;
//     min-width: 300px;
//   }
//   .pagination {
//     display: flex;
//     justify-content: center;
//     margin-top: 1rem;
//   }

//   .page-item.active {
//     background-color: #007bff;
//     color: white;
//   }
//   /* .search-input {
//     margin-bottom: 1rem;
//     padding: 0.5rem;
//     width: 100%;
//     max-width: 400px;
//     border-radius: 5px;
//     border: 1px solid #ddd;
//   }  */

//   th {
//     background-color: #1abc9c;
//     color: white;
//     white-space: nowrap;
//   }
//   td {
//     white-space: nowrap;
//   }
//   input::placeholder {
//     color: #aaa;
//     opacity: 1; /* Ensure placeholder is visible */
//     font-size: 1.2rem;
//     transition: color 0.3s ease;
//   }

//   input:focus::placeholder {
//     color: transparent; /* Hide placeholder on focus */
//   }

//   input {
//     width: 30%;
//     padding: 12px 20px;
//     margin: 8px 0;
//     display: inline-block;
//     border: 1px solid #ccc;
//     border-radius: 20px;
//     box-sizing: border-box;
//     transition: border-color 0.3s ease;

//     @media (min-width: 1279px) and (max-width: 1600px) {
//       width: 45%;
//     }
//     @media (min-width: 1024px) and (max-width: 1279px) {
//       width: 60%;
//     }
//     @media (min-width: 768px) and (max-width: 1023px) {
//       width: 100%;
//     }
//   }

//   input:focus {
//     border-color: #007bff; /* Change border color on focus */
//   }
// `;

// export default AdminAppointment;







import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactPaginate from "react-paginate";
import cogoToast from "cogo-toast";
import animationData from "../animation/loading-effect.json";
import Lottie from "react-lottie";
import moment from "moment";

const AdminAppointment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [status, setStatus] = useState("");

  const complaintsPerPage = 10; // Number of complaints per page
  const [currentPage, setCurrentPage] = useState(0); // Start from the first page
  const user = useSelector((state) => state.user.currentUser);
  const [appointmentList, setAppointmentList] = useState([]);
  const [timeLIneData, setTimeLineData] = useState();
  const [keyword, setkeyword] = useState("");
  const [updateData, setUpdateData] = useState({
    branch: user.branch_name,
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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const openUpdatePopup = (id) => {
    setSelectedItem(id);
    setShowPopup(true);
  };

  const closeUpdatePopup = () => {
    setShowPopup(false);
  };

  const getAppointList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getAppointmentData/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      setAppointmentList(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointList();
  }, [user.branch_name]);

  useEffect(() => {
    setCurrentPage(0);
  }, [keyword]);

  console.log(appointmentList[0]?.appointment_status);
  console.log(status);

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const date = String(todayDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${date}`;

  const handleKeywordChange = (e) => {
    setkeyword(e.target.value);
  };

  const trimmedKeyword = keyword.trim().toLowerCase();
  console.log(trimmedKeyword);

  const searchFilter = appointmentList.filter((lab) => {
    if (status && trimmedKeyword) {
      return (
        lab.appointment_status === status &&
        (lab.patient_name.toLowerCase().includes(trimmedKeyword) ||
          lab.patient_uhid.toLowerCase().includes(trimmedKeyword))
      );
    } else if (status) {
      return lab.appointment_status === status;
    } else if (trimmedKeyword) {
      return (
        lab.patient_name.toLowerCase().includes(trimmedKeyword) ||
        lab.patient_uhid.toLowerCase().includes(trimmedKeyword)
      );
    } else {
      return true; // Show all data when no filters are applied
    }
  });

  console.log(searchFilter);

  // const filterforOneMonth = searchFilter?.filter((item) => {
  //   return item.appointment_dateTime?.slice(0, 7) === formattedDate.slice(0, 7);
  // });

  const totalPages = Math.ceil(searchFilter.length / complaintsPerPage);

  const filterAppointDataByMonth = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return searchFilter?.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedAppointments = filterAppointDataByMonth();

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
              <div className="col-lg-11 col-11 ps-0" style={{marginTop:"5rem"}}>
                <div className="row d-flex justify-content-between mx-3">
                  <div className="col-12 col-md-12 mt-4">
                    {/* <div className="d-flex justify-content-between">
                      <BranchSelector />
                    </div> */}

                    <div className="container-fluid mt-3">
                      <h2 className="text-center"> Appointment Details </h2>
                      <div>
                        <div className="row">
                          {/* <label>Employee Name :</label> */}
                          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12">
                            <input
                              type="text"
                              placeholder="Search Patient Name or Patient UHID"
                              className="input w-100"
                              value={keyword}
                              onChange={handleKeywordChange}
                            />
                          </div>
                          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                            <div className="d-flex justify-content-end align-items-center mt-3">
                              <div>
                                <button className="btn btn-info">
                                  Filter by Status
                                </button>
                              </div>

                              <div className="mx-2">
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  <option value="">Select-Status</option>
                                  <option value="Appoint">Appoint</option>
                                  <option value="Complete">Complete</option>
                                  <option value="in treatment">
                                    In treatment
                                  </option>
                                  <option value="Check-In">Check-In</option>
                                  <option value="Cancel">Cancel</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {loading ? (
                        <Lottie
                          options={defaultOptions}
                          height={300}
                          width={400}
                          style={{ background: "transparent" }}
                        ></Lottie>
                      ) : (
                        <>
                          <div className="table-responsive rounded">
                            <table className="table table-bordered rounded shadow">
                              <thead className="table-head">
                                <tr>
                                  <th className="table-sno">Appointment ID</th>
                                  <th>Patient UHID</th>
                                  <th>Treatment Package ID</th>
                                  <th className="table-small">Patient Name</th>
                                  <th className="table-small">
                                    Contact Number
                                  </th>
                                  <th className="table-small">
                                    Assigned Doctor
                                  </th>
                                  <th className="table-small">Appointed by</th>
                                  <th className="table-small">Updated by</th>
                                  <th className="table-small">
                                    Appointment Date & Time
                                  </th>
                                  <th className="table-small">
                                    Appointment Status
                                  </th>
                                  <th>Cancel Reason</th>
                                </tr>
                              </thead>
                              <tbody>
                                {displayedAppointments?.map((item) => (
                                  <tr
                                    className="table-row"
                                    key={item.appoint_id}
                                  >
                                    <td className="table-sno">
                                      {item.appoint_id}
                                    </td>
                                    <td className="table-small">
                                      <Link
                                        to={`/patient-profile/${item.patient_uhid}`}
                                        style={{ textDecoration: "none" }}
                                      >
                                        {item.patient_uhid}
                                      </Link>
                                    </td>
                                    <td className="table-small">
                                      {item.tp_id}
                                    </td>
                                    <td>{item.patient_name}</td>
                                    <td className="table-small">
                                      {item.mobileno}
                                    </td>
                                    <td className="table-small">
                                      {item.assigned_doctor_name}
                                    </td>
                                    <td className="table-small">
                                      {item.appointment_created_by}
                                    </td>
                                    <td className="table-small">
                                      {item.appointment_updated_by}
                                    </td>
                                    <td className="table-small">
                                      {moment(
                                        item.appointment_dateTime?.split("T")[0]
                                      ).format("DD-MM-YYYY")}{" "}
                                      {moment(
                                        item.appointment_dateTime?.split(
                                          "T"
                                        )[1],
                                        "HH:mm"
                                      ).format("hh:mm A")}
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
                        </>
                      )}
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
                      <option value={user.branch_name}>{user.branch_name}</option>
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
    background-color:  #1abc9c; 
    color: white;
    white-space: nowrap;
  }
  td {
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

  input::placeholder {
    color: #aaa;
    opacity: 1; /* Ensure placeholder is visible */
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  input {
    width: 3
    
    
    
    
    
    0%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;

    @media (min-width: 1279px) and (max-width: 1600px) {
      width: 45%;
    }
    @media (min-width: 1024px) and (max-width: 1279px) {
      width: 60%;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      width: 100%;
    }
  }

  input:focus {
    border-color: #007bff; /* Change border color on focus */
  }
`;

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
export default AdminAppointment;
