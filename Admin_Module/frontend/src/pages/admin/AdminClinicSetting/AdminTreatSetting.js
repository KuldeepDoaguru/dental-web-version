// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import styled from "styled-components";
// // import Sider from "../../../components/Sider";
// // import Header from "../../../components/Header";
// import { FaSearch } from "react-icons/fa";
// // import BranchSelector from "../../../components/BranchSelector";
// import axios from "axios";
// import cogoToast from "cogo-toast";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import HeaderAdmin from "../HeaderAdmin";
// import SiderAdmin from "../SiderAdmin";
// import { useSelector } from "react-redux";

// const AdminTreatSetting = () => {
//   const user = useSelector((state) => state.user.currentUser);
//   console.log(user);
//   const location = useLocation();
//   const [showAddTreatments, setShowAddTreatments] = useState(false);
//   const [showEditTreatments, setShowEditTreatments] = useState(false);
//   const [keyword, setkeyword] = useState("");
//   const [treatList, setTreatList] = useState([]);
//   const [trID, setTrID] = useState();
//   const [treatData, setTreatData] = useState({
//     treatName: "",
//     treatCost: "",
//     treatDiscount: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     // Use spread syntax to update only the changed field
//     setTreatData({
//       ...treatData,
//       [name]: value,
//     });
//   };

//   console.log(treatData);

//   const openAddTreatmentsPopup = (index, item) => {
//     // setSelectedItem(item);
//     console.log("open pop up");
//     setShowAddTreatments(true);
//   };

//   const openEditTreatmentsPopup = (id) => {
//     console.log(id);
//     setTrID(id);
//     // setSelectedItem(item);
//     console.log("open pop up");
//     setShowEditTreatments(true);
//   };

//   const closeUpdatePopup = () => {
//     setShowAddTreatments(false);
//     setShowEditTreatments(false);
//   };

//   const addTreatments = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://dentalguruadmin.doaguru.com/api/v1/admin/addTreatment",
//         treatData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(response);
//       cogoToast.success("Treatment Addded Successfully");
//       closeUpdatePopup();
//       getTreatmentList();
//       treatData.treatName = "";
//       treatData.treatCost = "";
//       treatData.treatDiscount = "";
//     } catch (error) {
//       console.log(error);
//       cogoToast.error(error.response.data);
//     }
//   };

//   const getTreatmentList = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://dentalguruadmin.doaguru.com/api/v1/admin/getTreatmentList",
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(data);
//       setTreatList(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateTreatmentDetails = async (e, id) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/updateTreatmentDetails/${id}`,
//         treatData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );

//       console.log(response);
//       cogoToast.success("Treatment updated successfully");
//       closeUpdatePopup();
//       getTreatmentList();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteTreatment = async (id) => {
//     try {
//       const response = await axios.delete(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/deleteTreatment/${id}`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       getTreatmentList();
//       cogoToast.success("Treatment deleted successfully");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getTreatmentList();
//   }, []);

//   console.log(trID);

//   const goBack = () => {
//     window.history.go(-1);
//   };
//   return (
//     <Container>
//       <HeaderAdmin />
//       <div className="main">
//         <div className="container-fluid">
//           <div className="row flex-nowrap ">
//             <div className="col-lg-1 col-1 p-0">
//               <SiderAdmin />
//             </div>
//             <div className="col-lg-11 col-11 ps-0">
//               <div className="container-fluid mt-3">
//                 {/* <BranchSelector /> */}
//               </div>
//               <div className="container-fluid mt-3">
//                 <button className="btn btn-success" onClick={goBack}>
//                   <IoMdArrowRoundBack /> Back
//                 </button>
//                 <div className="container-fluid">
//                   <div className="row mt-3">
//                     {/* <div className="col-1"></div> */}

//                     <div className="col-12">
//                       <nav class="navbar navbar-expand-lg bg-body-tertiary">
//                         <div class="container-fluid d-flex justify-content-center">
//                           <h2 className="">Treatment Settings</h2>
//                         </div>
//                       </nav>
//                     </div>
//                     <div className="container-fluid">
//                       <div className="row mt-5">
//                         <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
//                           <input
//                             type="text"
//                             placeholder="search here"
//                             className="inputser"
//                             value={keyword}
//                             onChange={(e) =>
//                               setkeyword(e.target.value.toLowerCase())
//                             }
//                           />
//                           {/* <button className="mx-2 btn btn-info btnback">
//                             <FaSearch />
//                           </button> */}
//                         </div>
//                         <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
//                           <button
//                             className="btn btn-info btnback"
//                             onClick={() => openAddTreatmentsPopup()}
//                           >
//                             Add Treatment
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <div class="table-responsive rounded">
//                       <div className="banner-mid mt-2">
//                         <div>
//                           <h6 className="text-light">Treatments</h6>
//                         </div>
//                         <div>
//                           <p className="fw-bold text-light">
//                             Total Treatments - 25
//                           </p>
//                         </div>
//                       </div>
//                       <table class="table table-bordered rounded shadow">
//                         <thead className="table-head">
//                           <tr>
//                             <th className="table-sno">Treatment ID</th>
//                             <th className="table-small">Treatment Name</th>
//                             <th className="table-small">Cost(INR)</th>
//                             <th className="table-small">
//                               Maximum Discount To give
//                             </th>
//                             <th className="table-small">Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {treatList
//                             ?.filter((val) => {
//                               if (keyword === "") {
//                                 return true;
//                               } else if (
//                                 val.treatment_name
//                                   .toLowerCase()
//                                   .includes(keyword) ||
//                                 val.treatment_name
//                                   .toLowerCase()
//                                   .includes(keyword)
//                               ) {
//                                 return val;
//                               }
//                             })
//                             .map((item) => (
//                               <React.Fragment key={item.treatment_id}>
//                                 <tr className="table-row">
//                                   <td className="table-sno">
//                                     {item.treatment_id}
//                                   </td>
//                                   <td className="table-small">
//                                     {item.treatment_name}
//                                   </td>
//                                   <td className="table-small">
//                                     {item.treatment_cost}
//                                   </td>
//                                   <td className="table-small">
//                                     {item.treatment_discount}
//                                   </td>
//                                   <td>
//                                     <button
//                                       className="btn btn-warning"
//                                       onClick={() =>
//                                         openEditTreatmentsPopup(
//                                           item.treatment_id
//                                         )
//                                       }
//                                     >
//                                       Edit
//                                     </button>
//                                     <button
//                                       type="button"
//                                       class="btn btn-danger mx-2"
//                                       data-bs-toggle="modal"
//                                       data-bs-target={`#exampleModal-${item.treatment_id}`}
//                                     >
//                                       Delete
//                                     </button>
//                                   </td>
//                                 </tr>
//                                 <div
//                                   className="modal fade rounded"
//                                   id={`exampleModal-${item.treatment_id}`}
//                                   tabIndex="-1"
//                                   aria-labelledby={`exampleModalLabel-${item.treatment_id}`}
//                                   aria-hidden="true"
//                                 >
//                                   <div class="modal-dialog rounded">
//                                     <div class="modal-content">
//                                       <div class="modal-header">
//                                         <h1
//                                           class="modal-title fs-5"
//                                           id={`exampleModalLabel-${item.treatment_id}`}
//                                         >
//                                           Are you sure you want to delete this
//                                           data
//                                         </h1>
//                                       </div>

//                                       <div class="modal-footer d-flex justify-content-center">
//                                         <button
//                                           type="button"
//                                           class="btn btn-danger"
//                                           data-bs-dismiss="modal"
//                                           onClick={() =>
//                                             deleteTreatment(item.treatment_id)
//                                           }
//                                         >
//                                           Yes
//                                         </button>
//                                         <button
//                                           type="button"
//                                           class="btn btn-secondary"
//                                           data-bs-dismiss="modal"
//                                         >
//                                           Close
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </React.Fragment>
//                             ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* ***************************************************************************************************** */}
//         {/* other pop-up */}
//         {/* pop-up for adding lab */}
//         <div className={`popup-container${showAddTreatments ? " active" : ""}`}>
//           <div className="popup">
//             <h4 className="text-center">Add Treatment</h4>
//             <form
//               onSubmit={addTreatments}
//               className="d-flex flex-column"
//               // onSubmit={handleNoticeSubmit}
//             >
//               <input
//                 type="text"
//                 placeholder="Add Treatment Name"
//                 className="rounded p-2"
//                 name="treatName"
//                 value={treatData.treatName}
//                 onChange={handleInputChange}
//               />
//               <br />
//               <input
//                 type="text"
//                 placeholder="Add Cost"
//                 className="rounded p-2"
//                 name="treatCost"
//                 value={treatData.treatCost}
//                 onChange={handleInputChange}
//               />
//               <br />
//               <input
//                 type="text"
//                 placeholder="Max Discount to give"
//                 className="rounded p-2"
//                 name="treatDiscount"
//                 value={treatData.treatDiscount}
//                 onChange={handleInputChange}
//               />
//               <br />

//               <div className="d-flex justify-content-evenly">
//                 <button type="submit" className="btn btn-success mt-2">
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger mt-2"
//                   onClick={closeUpdatePopup}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* pop-up for adding lab */}
//         {/* ************************************************************************************* */}

//         {/* ***************************************************************************************************** */}
//         {/* other pop-up */}
//         {/* pop-up for adding lab */}
//         <div
//           className={`popup-container${showEditTreatments ? " active" : ""}`}
//         >
//           <div className="popup">
//             <h4 className="text-center">Edit Drugs Details</h4>
//             <form
//               className="d-flex flex-column"
//               onSubmit={(e) => updateTreatmentDetails(e, trID)}
//             >
//               <input
//                 type="text"
//                 placeholder="Add Treatment Name"
//                 className="rounded p-2"
//                 name="treatName"
//                 value={treatData.treatName}
//                 onChange={handleInputChange}
//               />
//               <br />
//               <input
//                 type="text"
//                 placeholder="Add Cost"
//                 className="rounded p-2"
//                 name="treatCost"
//                 value={treatData.treatCost}
//                 onChange={handleInputChange}
//               />
//               <br />
//               <input
//                 type="text"
//                 placeholder="Max Discount to give"
//                 className="rounded p-2"
//                 name="treatDiscount"
//                 value={treatData.treatDiscount}
//                 onChange={handleInputChange}
//               />
//               <br />

//               <div className="d-flex justify-content-evenly">
//                 <button type="submit" className="btn btn-success mt-2">
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger mt-2"
//                   onClick={closeUpdatePopup}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* pop-up for adding lab */}
//         {/* ************************************************************************************* */}
//       </div>
//     </Container>
//   );
// };

// export default AdminTreatSetting;
// const Container = styled.div`
//   .inputser {
//     border-radius: 1.5rem;
//     padding: 0.5rem;
//     width: 80%;
//   }

//   .navlink.active {
//     background-color: red;
//     color: white;
//     border-radius: 1rem;
//   }

//   .banner-mid {
//     background-color: #1abc9c;
//     padding: 1rem;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }

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

//   .btnback {
//     background: #1abc9c;
//     color: white;
//   }
// `;




import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { FaSearch } from "react-icons/fa";

import axios from "axios";
import cogoToast from "cogo-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { TbEdit } from "react-icons/tb";
import { GrAdd } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";

const AdminTreatSetting = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.currentUser);
 
  const [showAddTreatments, setShowAddTreatments] = useState(false); 
  const [showEditTreatments, setShowEditTreatments] = useState(false);
  const [keyword, setkeyword] = useState("");
  const [treatList, setTreatList] = useState([]);
  const [totalTreatment, settotalTreatment] = useState(0);
  const [trID, setTrID] = useState();
  const complaintsPerPage = 7; // Number of complaints per page
  const [currentPage, setCurrentPage] = useState(0); // Start from the first page
  const [treatData, setTreatData] = useState({
    treatName: "",
    treatCost: "",
    treatDiscount: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Use spread syntax to update only the changed field
    setTreatData({
      ...treatData,
      [name]: value,
    });
  };

  console.log(treatData);
  console.log(treatList);

  const openAddTreatmentsPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddTreatments(true);
  };

  const openEditTreatmentsPopup = (id) => {
    console.log(id);
    setTrID(id);
    // setSelectedItem(item);
    console.log("open pop up");
    setShowEditTreatments(true);
  };

  const closeUpdatePopup = () => {
    setShowAddTreatments(false);
    setShowEditTreatments(false);
  };

  const addTreatments = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/addTreatment",
        treatData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      cogoToast.success("Treatment Addded Successfully");
      closeUpdatePopup();
      getTreatmentList();
      treatData.treatName = "";
      treatData.treatCost = "";
      treatData.treatDiscount = "";
    } catch (error) {
      console.log(error);
    }
  };

  const getTreatmentList = async () => {
    try {
      const { data } = await axios.get(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/getTreatmentList",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setTreatList(data);
      settotalTreatment(data.length); 
    } catch (error) {
      console.log(error);
    }
  };

  const updateTreatmentDetails = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/updateTreatmentDetails/${id}`,
        treatData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(response);
      cogoToast.success("Treatment updated successfully");
      closeUpdatePopup();
      getTreatmentList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTreatment = async (id) => {
    try {
      const response = await axios.delete(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/deleteTreatment/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getTreatmentList();
      cogoToast.success("Treatment deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentList();
  }, []);

  console.log(trID);

  const goBack = () => {
    window.history.go(-1);
  };

  const totalCount = treatList.length;

  const searchFilter = treatList.filter((lab)=>lab.treatment_name.toLowerCase().includes(keyword.toLowerCase()));

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
    <Container>
      <HeaderAdmin />
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-nowrap ">
            <div className="col-lg-1 col-1 p-0">
              <SiderAdmin />
            </div>
            <div className="col-lg-11 col-11 ps-0" style={{marginTop:"5rem"}}>
              <div className="container-fluid mt-3">
                {/* <BranchSelector /> */}
              </div>
              <div className="container-fluid mt-3">
                <button className="btn btn-success" onClick={goBack}>
                  <IoMdArrowRoundBack /> Back
                </button>
                <div className="container-fluid">
                  <div className="row mt-3">
                    {/* <div className="col-1"></div> */}

                    <div className="col-12">
                      <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid d-flex justify-content-center">
                          <h2 className="">Treatment Settings</h2>
                        </div>
                      </nav>
                    </div>
                    <div className="container-fluid">
                      <div className="row mt-5">
                        <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-12 col-12">
                          <input
                            type="text"
                            placeholder="Search by Treatment Name"
                            className="inputser"
                            value={keyword}
                            onChange={(e) =>
                              setkeyword(e.target.value.toLowerCase())
                            }
                          />
                          <button className="mx-2 btn  btnback" style={{backgroundColor:"#1abc9c"}}>
                            <FaSearch size={20}/>
                          </button>
                        </div>
                        {/* <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                          <button
                            className="btn btn-info btnback"
                            onClick={() => openAddTreatmentsPopup()}
                          >
                            <GrAdd size={22}/>
                          </button>
                        </div> */}
                        {/* Add Treatment Comment Out */}
                      </div>
                    </div>

                    <div class="table-sticky rounded">
                      <div className="banner-mid mt-2">
                        <div>
                          <h6 className="text-light">Treatments</h6>
                        </div>
                        <div>
                          <p className="fw-bold text-light">
                            Total Treatments - {totalTreatment +1}
                          </p>
                        </div>
                      </div>
                      <table class="table table-bordered rounded shadow tableStyle">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">Treatment ID</th>
                            <th className="table-small">Treatment Producer Name</th>
                            <th className="table-small">Treatment Name</th>
                            <th className="table-small">Cost(INR)</th>
                            <th className="table-small">
                              Maximum Discount To give %
                            </th>
                            {/* <th className="table-small">Actions</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {displayedAppointments
                            ?.filter((val) => {
                              if (keyword === "") {
                                return true;
                              } else if (
                                val.treatment_name
                                  .toLowerCase()
                                  .includes(keyword) ||
                                val.treatment_name
                                  .toLowerCase()
                                  .includes(keyword)
                              ) {
                                return val;
                              }
                            })
                            .map((item) => (
                              <>
                                <tr className="table-row">
                                  <td className="table-sno">
                                    {item.treatment_id}
                                  </td>
                                  <td className="table-small">
                                    {item.treat_procedure_name}
                                  </td>
                                  <td className="table-small">
                                    {item.treatment_name}
                                  </td>
                                  <td className="table-small">
                                    {item.treatment_cost}
                                  </td>
                                  <td className="table-small">
                                    {item.treatment_discount}
                                  </td>
                                  {/* <td>
                                    <button
                                      className="btn btn-warning text-light"
                                      onClick={() =>
                                        openEditTreatmentsPopup(
                                          item.treatment_id
                                        )
                                      }
                                    >
                                      <TbEdit size={22}/>
                                    </button>

                                    // Delete Comment out haa

                                    {/* <button
                                      type="button"
                                      class="btn btn-danger mx-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                    >
                                      Delete
                                    </button> 

                                    // Delete Comment out haa

                                  </td> */}
                                </tr>
                                <div
                                  class="modal fade rounded"
                                  id="exampleModal"
                                  tabindex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div class="modal-dialog rounded">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h1
                                          class="modal-title fs-5"
                                          id="exampleModalLabel"
                                        >
                                          Are you sure you want to delete this
                                          data
                                        </h1>
                                      </div>

                                      <div class="modal-footer d-flex justify-content-center">
                                        <button
                                          type="button"
                                          class="btn btn-danger"
                                          data-bs-dismiss="modal"
                                          onClick={() =>
                                            deleteTreatment(item.treatment_id)
                                          }
                                        >
                                          Yes
                                        </button>
                                        <button
                                          type="button"
                                          class="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                        </tbody>
                      </table>

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
        </div>
        {/* ***************************************************************************************************** */}
        {/* other pop-up */}
        {/* pop-up for adding lab */}
        <div className={`popup-container${showAddTreatments ? " active" : ""}`}>
          <div className="popup">
            <h4 className="text-center">Add Treatment</h4>
            <form
              onSubmit={addTreatments}
              className="d-flex flex-column"
              // onSubmit={handleNoticeSubmit}
            >
              <input
                type="text"
                placeholder="Add Treatment Name"
                className="rounded p-2"
                name="treatName"
                value={treatData.treatName}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                placeholder="Add Cost"
                className="rounded p-2"
                name="treatCost"
                value={treatData.treatCost}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                placeholder="Max Discount to give"
                className="rounded p-2"
                name="treatDiscount"
                value={treatData.treatDiscount}
                onChange={handleInputChange}
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
          className={`popup-container${showEditTreatments ? " active" : ""}`}
        >
          <div className="popup">
            <h4 className="text-center">Edit Drugs Details</h4>
            <form
              className="d-flex flex-column"
              onSubmit={(e) => updateTreatmentDetails(e, trID)}
            >
              <input
                type="text"
                placeholder="Add Treatment Name"
                className="rounded p-2"
                name="treatName"
                value={treatData.treatName}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                placeholder="Add Cost"
                className="rounded p-2"
                name="treatCost"
                value={treatData.treatCost}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                placeholder="Max Discount to give"
                className="rounded p-2"
                name="treatDiscount"
                value={treatData.treatDiscount}
                onChange={handleInputChange}
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
  );
};

export default AdminTreatSetting;
const Container = styled.div`
  .inputser {
    border-radius: 1.5rem;
    padding: 0.5rem;
    width: 30%;
  }

  input::placeholder {
            color: #aaa;
            opacity: 1; /* Ensure placeholder is visible */
            font-size: 1.2rem;
            transition: color 0.3s ease;
        }

        input:focus::placeholder {
            color: transparent; /* Hide placeholder on focus */
        }

        input {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }

        input:focus {
            border-color:  #1abc9c; /* Change border color on focus */
        }

  .navlink.active {
    background-color: red;
    color: white;
    border-radius: 1rem;
  }

  .banner-mid {
    background-color:  #1abc9c;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .btnback {
    background: #004aad;
    color: white;
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
    color:  #1abc9c;
    cursor: pointer;
    text-decoration: none;
  }

  .pagination li.active a {
    background-color:  #1abc9c;
    color: white;
    border: 1px solid  #1abc9c;
  }

  .pagination li.disabled a {
    color: #ddd;
    cursor: not-allowed;
  }

  .pagination li a:hover:not(.active) {
    background-color: #ddd;
  }
`;