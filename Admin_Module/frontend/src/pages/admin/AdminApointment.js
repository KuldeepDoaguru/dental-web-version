// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Header from "../../components/Header";
// import Sider from "../../components/Sider";
// import { Link, useNavigate } from "react-router-dom";
// // import BranchSelector from "../../components/BranchSelector";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import cogoToast from "cogo-toast";
// import SiderAdmin from "./SiderAdmin";
// import HeaderAdmin from "./HeaderAdmin";

// const AdminApointment = () => {
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const user = useSelector((state) => state.user.currentUser);
//   console.log(user);
//   const [appointmentList, setAppointmentList] = useState([]);
//   const [timeLIneData, setTimeLineData] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
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
//   const [selectedItem, setSelectedItem] = useState();

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUpdateData({
//       ...updateData,
//       [name]: value,
//     });
//   };

//   const openUpdatePopup = (id) => {
//     console.log(id);
//     setSelectedItem(id);
//     setShowPopup(true);
//     // updateAppData(e, id);
//   };

//   const closeUpdatePopup = () => {
//     setShowPopup(false);
//   };

//   const getAppointList = async () => {
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
//       console.log(response);
//       setAppointmentList(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAppointList();
//   }, [user.branch_name]);

//   console.log(appointmentList);
//   console.log(updateData);
//   console.log(selectedItem);

//   const timelineData = async (id) => {
//     console.log(updateData);
//     try {
//       const response = await axios.post(
//         "https://dentalguruadmin.doaguru.com//api/v1/admin/insertTimelineEvent",
//         {
//           type: "appointment",
//           description: "apointment scheduled",
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
//       setTimeLineData(response);
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

//   console.log(timeLIneData);

//   const todayDate = new Date();

//   // Get year, month, and date
//   const year = todayDate.getFullYear();
//   const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
//   const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

//   // Format as 'YYYY-MM-DD'
//   const formattedDate = `${year}-${month}-${date}`;

//   console.log(formattedDate.slice(0, 7));

//   // const filterAppointDataByMonth = appointmentList?.filter((item) => {
//   //   return (
//   //     item.appointment_dateTime?.split("T")[0].slice(0, 7) ===
//   //     formattedDate.slice(0, 7)
//   //   );
//   // });

//   // console.log(filterAppointDataByMonth);

//   const totalPages = Math.ceil(appointmentList.length / itemsPerPage);
//   console.log(totalPages);
//   const filterAppointDataByMonth = () => {
//     // Filter and paginate appointment data based on currentPage and itemsPerPage
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return appointmentList
//       .filter(
//         (item) =>
//           item.appointment_dateTime?.split("T")[0].slice(0, 7) ===
//           formattedDate.slice(0, 7)
//       )
//       .slice(startIndex, endIndex);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     for (let i = 1; i <= totalPages; i++) {
//       buttons.push(
//         <li key={i}>
//           <button
//             className={`btn ${
//               currentPage === i ? "btn-info" : "btn-secondary"
//             }`}
//             onClick={() => handlePageChange(i)}
//           >
//             {i}
//           </button>
//         </li>
//       );
//     }
//     return buttons;
//   };

//   console.log(filterAppointDataByMonth);

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
//               <div className="col-lg-11 col-md-10 col-11 ps-0" style={{marginTop:"5rem"}}>
//                 <div className="row d-flex justify-content-between">
//                   <div className="col-12 col-md-12 mt-4">
//                     <div className="d-flex justify-content-between">
//                       {/* <BranchSelector /> */}
//                     </div>

//                     <h2 className="text-center"> Appointment Details </h2>
//                     <div className="container-fluid mt-3">
//                       <div class="table-responsive rounded">
//                         <table class="table table-bordered rounded shadow">
//                           <thead className="table-head">
//                             <tr>
//                               <th className="table-sno">Appointment ID</th>
//                               <th>Patient UHID</th>
//                               <th className="table-small">
//                                 Treatment Package ID
//                               </th>
//                               <th className="table-small">Patient Name</th>
//                               <th className="table-small">Contact Number</th>
//                               <th className="table-small">Assigned Doctor</th>

//                               <th className="table-small">Appointed by</th>
//                               <th className="table-small">Updated by</th>
//                               <th className="table-small">
//                                 Appointment Date & Time
//                               </th>
//                               <th className="table-small">
//                                 Appointment Status
//                               </th>
//                               <th>Cancel Reason</th>
//                               {/* <th className="table-small">Edit</th>
//                               <th className="table-small">Delete</th> */}
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {filterAppointDataByMonth()?.map((item) => (
//                               <>
//                                 <tr className="table-row">
//                                   <td className="table-sno">
//                                     {item.appoint_id}
//                                   </td>
//                                   <td className="table-small">
//                                     <Link
//                                       to={`/patient-profile/${item.patient_uhid}`}
//                                       style={{ textDecoration: "none" }}
//                                     >
//                                       {item.patient_uhid}
//                                     </Link>
//                                   </td>
//                                   <td>{item.tp_id}</td>
//                                   <td>{item.patient_name}</td>
//                                   <td className="table-small">
//                                     {item.mobileno}
//                                   </td>
//                                   <td className="table-small">
//                                     {item.assigned_doctor_name}
//                                   </td>

//                                   <td className="table-small">
//                                     {item.appointment_created_by}
//                                   </td>
//                                   <td className="table-small">
//                                     {item.updated_by ? item.updated_by : "-"}
//                                   </td>
//                                   <td className="table-small">
//                                     {item.appointment_dateTime?.split("T")[0]}{" "}
//                                     {item.appointment_dateTime?.split("T")[1]}
//                                   </td>
//                                   <td>{item.appointment_status}</td>
//                                   <td>{item.cancel_reason}</td>
//                                   {/* <td className="table-small">
//                                     <button
//                                       className="btn btn-warning"
//                                       onClick={() =>
//                                         openUpdatePopup(item.appoint_id)
//                                       }
//                                     >
//                                       Edit
//                                     </button>
//                                   </td>
//                                   <td className="table-small">
//                                     <button
//                                       className="btn btn-danger"
//                                       onClick={() =>
//                                         deleteAppointment(item.appoint_id)
//                                       }
//                                     >
//                                       Delete
//                                     </button>
//                                   </td> */}
//                                 </tr>
//                               </>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                       <div className="pagination">
//                         <ul>
//                           <li>
//                             <button
//                               onClick={() => handlePageChange(currentPage - 1)}
//                               disabled={currentPage === 1}
//                               className="btn btn-danger"
//                             >
//                               Previous
//                             </button>
//                           </li>
//                           {renderPaginationButtons()}
//                           <li>
//                             <button
//                               onClick={() => handlePageChange(currentPage + 1)}
//                               disabled={currentPage === totalPages}
//                               className="btn btn-info"
//                             >
//                               Next
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* ******************************************************************************************* */}
//           {/* pop-up for creating notice */}
//           <div className={`popup-container${showPopup ? " active" : ""}`}>
//             <div className="popup">
//               <h2>Update Apointment Details</h2>
//               <form
//                 className="d-flex flex-column"
//                 onSubmit={(e) => updateAppData(e, selectedItem)}
//               >
//                 <div className="d-flex">
//                   <div className="d-flex flex-column input-group mb-3">
//                     <label htmlFor="">Select Branch</label>
//                     <select
//                       type="text"
//                       placeholder="branch name"
//                       className="rounded p-1"
//                     >
//                       <option value={user.branch_name}>
//                         {user.branch_name}
//                       </option>
//                     </select>
//                   </div>
//                   <div className="input-group mb-3 mx-2">
//                     <label htmlFor="">Update Patient Name</label>
//                     <input
//                       type="text"
//                       name="patientName"
//                       // placeholder={appointmentList[]}
//                       className="rounded p-1 w-100"
//                       value={updateData.patientName}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="d-flex">
//                   <div className="d-flex flex-column input-group mb-3">
//                     <label htmlFor="">Update Patient Number</label>
//                     <input
//                       type="text"
//                       placeholder="update Patient contact number"
//                       className="rounded p-1 w-100"
//                       name="patContact"
//                       value={updateData.patContact}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="input-group mb-3 mx-2">
//                     <label htmlFor="">Update Assigned Doctor</label>
//                     <select
//                       id=""
//                       className="rounded p-1 w-100"
//                       name="assignedDoc"
//                       value={updateData.assignedDoc}
//                       onChange={handleInputChange}
//                     >
//                       <option value="dev">dev</option>
//                       <option value="mohit">mohit</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="d-flex">
//                   <div className="input-group mb-3">
//                     <label htmlFor="">Appointed by</label>
//                     <input
//                       type="text"
//                       placeholder="Appointed by"
//                       className="rounded p-1 w-100"
//                       name="appointedBy"
//                       value={updateData.appointedBy}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="input-group mb-3 mx-2">
//                     <label htmlFor="">Appointment Date & Time</label>
//                     <input
//                       type="date"
//                       placeholder="update Patient Name"
//                       className="rounded p-1 w-100"
//                       name="appointDateTime"
//                       value={updateData.appointDateTime}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="d-flex">
//                   <div className="input-group mb-3">
//                     <label htmlFor="">Updated by</label>
//                     <input
//                       type="text"
//                       placeholder="updated by"
//                       className="rounded p-1 w-100"
//                       name="updatedBy"
//                       value={updateData.updatedBy}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="input-group mb-3 mx-2">
//                     <label htmlFor="">Appointment Status</label>
//                     <input
//                       type="text"
//                       placeholder="update Patient Name"
//                       className="rounded p-1 w-100"
//                       name="appointment_status"
//                       value={updateData.appointment_status}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-evenly">
//                   <button type="submit" className="btn btn-success mt-2">
//                     update
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-danger mt-2"
//                     onClick={closeUpdatePopup}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* popup for updating notice */}
//           {/* **************************************************************************************************** */}
//         </div>
//       </Container>
//     </>
//   );
// };

// export default AdminApointment;
// const Container = styled.div`
//   .popup-container {
//     display: none;
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     align-items: center;
//     justify-content: center;
//   }

//   .popup-container.active {
//     display: flex;
//     background-color: #00000075;
//   }

//   .popup {
//     background-color: white;
//     padding: 20px;
//     border-radius: 8px;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//   }

//   th {
//     background-color: #1abc9c;
//     color: white;
//   }

//   .select-style {
//     border: none;
//     background-color: #22a6b3;
//     font-weight: bold;
//     color: white;
//   }

//   label {
//     font-weight: bold;
//   }

//   .pagination {
//     display: flex;
//     justify-content: flex-end;
//     ul {
//       display: flex;
//       justify-content: space-between;
//       gap: 15px;
//       li {
//         list-style: none;
//       }
//     }
//   }
// `;





import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
import animationData from "../animation/loading-effect.json";
import Lottie from "react-lottie";

const AdminAppointment = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    branch: user.branch_name,
    patientName: "",
    patContact: "",
    assignedDoc: "",
    appointedBy: "",
    appointDateTime: "",
    updatedBy: user.name,
    appointment_status: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

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
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getAppointmentData/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  const timelineData = async (id) => {
    try {
      const response = await axios.post(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/insertTimelineEvent",
        {
          type: "appointment",
          description: "appointment scheduled",
          branch: user.branch_name,
          patientId: id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
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
        `https://dentalguruadmin.doaguru.com/api/v1/admin/updateAppointData/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      closeUpdatePopup();
      timelineData(id);
      cogoToast.success("Appointment Details Updated Successfully");
      getAppointList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await axios.delete(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/deleteAppointData/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      cogoToast.success("Appointment Deleted Successfully");
      getAppointList();
    } catch (error) {
      console.log(error);
    }
  };

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const date = String(todayDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${date}`;

  const filterAppointDataByMonth = () => {
    return appointmentList.filter(
      (item) =>
        item.appointment_dateTime?.split("T")[0].slice(0, 7) ===
        formattedDate.slice(0, 7)
    );
  };

 
  const filterBySearchQuery = (data) => {
    if (searchQuery === "") {
      return data;
    }
    return data.filter((item) =>
      item.patient_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
 
  // Assuming filteredData is the array of items to be paginated
  const filteredData = filterBySearchQuery(filterAppointDataByMonth());
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  
  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-md-2 col-1 p-0">
                <SiderAdmin />
              </div>
              <div
                className="col-lg-11 col-md-10 col-11 ps-0"
                style={{ marginTop: "5rem" }}
              >
                <div className="row d-flex justify-content-between">
                  <div className="col-12 col-md-12 mt-4">
                    <div className="d-flex justify-content-between"></div>
  
                    <h2 className="text-center"> Appointment Details </h2>
                    <div className="container-fluid mt-3">
                    <div className="d-flex justify-content-between">
                      <input
                        type="text"
                        placeholder="Search by Patient Name"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1); // Reset to the first page on search
                        }}
                        
                        className="search-input"
                      />
                    </div>
                      <div className="table-responsive rounded">
                      {loading ? (
            <Lottie options={defaultOptions} height={300} width={400}></Lottie>
          ) : (
            <>
                        <table className="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th className="table-sno">Appointment ID</th>
                              <th>Patient UHID</th>
                              <th className="table-small">
                                Treatment Package ID
                              </th>
                              <th className="table-small">Patient Name</th>
                              <th className="table-small">Contact Number</th>
                              <th className="table-small">Assigned Doctor</th>
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
                            {currentItems.map((item) => (
                              <tr className="table-row" key={item.appoint_id}>
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
                                <td>{item.tp_id}</td>
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
                                  {item.updated_by ? item.updated_by : "-"}
                                </td>
                                <td className="table-small">
                                  {item.appointment_dateTime
                                    ? item.appointment_dateTime.split("T")[0]
                                    : ""}{" "}
                                  {item.appointment_dateTime
                                    ? item.appointment_dateTime.split("T")[1]
                                    : ""}
                                </td>
                                <td>{item.appointment_status}</td>
                                <td>{item.cancel_reason}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        </>
          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(filteredData.length / itemsPerPage) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage ===
                  Math.ceil(filteredData.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredData.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </>
  );
  
};

const Container = styled.div`
  .popup-container {
    display: none;
  }
  .popup-container.active {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
  }
  .popup {
    background: white;
    padding: 2rem;
    border-radius: 5px;
    width: 30%;
    min-width: 300px;
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .page-item.active {
    background-color: #007bff;
    color: white;
  }
  .search-input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 100%;
    max-width: 400px;
    border-radius: 5px;
    border: 1px solid #ddd;
  } 
  
   th {
     background-color: #1abc9c;
     color: white;
   }
`;

export default AdminAppointment;

