
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { FaSearch } from "react-icons/fa";
// import { Nav } from "react-bootstrap";
// import HeaderAdmin from "./HeaderAdmin";
// import SiderAdmin from "./SiderAdmin";
// import AdminLab from "../../components/Admin/Lab-settings/AdminLab";
// import AdminLabTest from "../../components/Admin/Lab-settings/AdminLabTest";
// import AdminLabTask from "../../components/Admin/Lab-settings/AdminLabTask";
// import { Link, useLocation } from "react-router-dom";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import cogoToast from "cogo-toast";
// import { toggleTableRefresh } from "../../redux/slices/UserSlicer";
// import Lab from "../../components/Admin/Lab-settings/AdminLab";
// import LabTest from "../../components/Admin/Lab-settings/AdminLabTest";

// const AdminLabSetting = () => {
//   const dispatch = useDispatch();
//   const initialTab = localStorage.getItem("selectedTab") || "tab1";
//   const [selectedTab, setSelectedTab] = useState(initialTab);
//   const [showAddLab, setShowAddLab] = useState(false);
//   const [labList, setLabList] = useState([]);
//   const user = useSelector((state) => state.user.currentUser);
 
//   const [showAddLabTest, setShowAddLabTest] = useState(false);
//   const [showAddLabTask, setShowAddLabTask] = useState(false);
//   const [addLabField, setAddLabField] = useState({
//     branch: user.branch_name,
//     name: "",
//     type: "",
//     contact: "",
//     email: "",
//     address: "",
//     status: "",
//   });

//   const [addLabTestField, setAddLabTestField] = useState({
//     test_name: "",
//     test_code: "",
//     waiting_days: "",
//     default_lab: "",
//     test_date: "",
//     test_cost: "",
//   });

//   const handleAddLabChange = (event) => {
//     const { name, value } = event.target;
//     setAddLabField((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   console.log(addLabField);

//   const handleAddLabTestChange = (event) => {
//     const { name, value } = event.target;
//     setAddLabTestField((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   console.log(addLabTestField);

//   const openAddLabPopup = (index, item) => {
//     // setSelectedItem(item);
//     console.log("open pop up");
//     setShowAddLab(true);
//   };

//   const openAddLabTestPopup = (index, item) => {
//     // setSelectedItem(item);
//     console.log("open pop up");
//     setShowAddLabTest(true);
//   };

//   const openAddLabTaskPopup = (index, item) => {
//     // setSelectedItem(item);
//     console.log("open pop up");
//     setShowAddLabTask(true);
//   };

//   const closeUpdatePopup = () => {
//     setShowAddLab(false);
//     setShowAddLabTest(false);
//     setShowAddLabTask(false);
//   };

//   const insertLabClinic = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://dentalguruadmin.doaguru.com/api/v1/admin/addLab",
//         addLabField,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       cogoToast.success("Lab Added Successfully");
//       dispatch(toggleTableRefresh());
//       closeUpdatePopup();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const insertLabTestClinic = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://dentalguruadmin.doaguru.com/api/v1/admin/addLabTest",
//         addLabTestField,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       cogoToast.success("Lab Test Added Successfully");
//       dispatch(toggleTableRefresh());
//       closeUpdatePopup();
//       setAddLabTestField({
//         test_name: "",
//         test_code: "",
//         waiting_days: "",
//         default_lab: "",
//         test_date: "",
//         test_cost: "",
//       });
//     } catch (error) {
//       console.log(error);
//       cogoToast.error("Test Code Already Exist");
//     }
//   };

//   const getListLabDetails = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/getLabList/${user.branch_name}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       setLabList(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getListLabDetails();
//   }, []);

//   console.log(labList);
//   return (
//     <>
//       <Container>
//         <HeaderAdmin />
//         <div className="main">
//           <div className="container-fluid">
//             <div className="row flex-nowrap ">
//               <div className="col-lg-1 col-1 p-0">
//                 <SiderAdmin />
//               </div>
//               <div className="col-lg-11 col-11 ps-0" style={{marginTop:"5rem"}}>
//                 {/* <div className="container-fluid mt-3">
//                   <div className="d-flex justify-content-between">
//                     <BranchSelector />
//                   </div>
//                 </div> */}
//                 <div className="container-fluid mt-3 response">
//                   <h2 className="text-center">Lab Settings</h2>
//                   <div className="mid-box">
//                     <div className="row mt-5 background">
//                       {/* <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
//                         <input
//                           type="text"
//                           placeholder="search here"
//                           className="inputser"
//                         />
//                         <button className="mx-2 btn btn-info">
//                           <FaSearch />
//                         </button> 
//                       </div> */}

//                       {/* Add Lab Button Commont out */}
//                       {/* <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12 m-md-3">
//                         <div className="">
//                           <button
//                             className="btn btn-info lab-actbtn"
//                             onClick={() => openAddLabPopup()}
//                           >
//                             Add Lab
//                           </button>
//                         </div>
//                       </div> */}

//                       <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12 m-md-3" style={{whiteSpace:"nowrap"}}>
//                         <div className="">
//                           <button
//                             className="btn btn-info lab-actbtn"
//                             onClick={() => openAddLabTestPopup()}
//                           >
//                             Add Lab Test
//                           </button>
//                         </div>
//                       </div>
//                       {/* <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
//                         <button
//                           className="btn btn-info lab-actbtn"
//                           onClick={() => openAddLabTaskPopup()}
//                         >
//                           Add Lab Task
//                         </button>
//                       </div> */}
//                     </div>
//                   </div>
//                   {/* nav-items-start */}
//                   <div className="container-fluid mt-5 navsect background">
//                     <Nav
//                       className="d-flex justify-content-between side-cont"
//                       activeKey={selectedTab}
//                       onSelect={(selectedKey) => setSelectedTab(selectedKey)}
//                     >
//                       <div className="d-flex flex-row">
//                         <Nav.Item>
//                           <Nav.Link eventKey="tab1" className="navlink">
//                             Lab
//                           </Nav.Link>
//                         </Nav.Item>
//                         <Nav.Item>
//                           <Nav.Link eventKey="tab2" className="navlink mx-2">
//                             Lab Test
//                           </Nav.Link>
//                         </Nav.Item>
//                         {/* <Nav.Item>
//                           <Nav.Link eventKey="tab3" className="navlink">
//                             Test Tasks
//                           </Nav.Link>
//                         </Nav.Item> */}
//                       </div>
//                       <div>
//                         {/* <p className="fw-bold">Total Lab - 09</p> */}
//                       </div>
//                     </Nav>
//                     <div className="flex-grow-1 p-3 mainback">
//                       {selectedTab === "tab1" && <Lab/>}
//                       {selectedTab === "tab2" && <LabTest />}
//                       {/* {selectedTab === "tab3" && <LabTasks />} */}
//                     </div>
//                   </div>
//                   {/* nav-items-ends */}
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* ***************************************************************************************************** */}
//           {/* other pop-up */}
//           {/* pop-up for adding lab */}
//           <div className={`popup-container${showAddLab ? " active" : ""}`}>
//             <div className="popup">
//               <h4 className="text-center">Add Labs</h4>
//               <form className="d-flex flex-column" onSubmit={insertLabClinic}>
//                 <div className="d-flex flex-column">
//                   <div className="d-flex">
//                     <div className="d-flex flex-column">
//                       <label htmlFor="">Lab Name</label>
//                       <input
//                         type="text"
//                         placeholder="Lab Name"
//                         className="rounded p-2"
//                         name="name"
//                         required
//                         value={addLabField.name}
//                         onChange={handleAddLabChange}
//                       />
//                     </div>
//                     <div className="d-flex flex-column mx-2 w-100">
//                       <label htmlFor="">Type</label>
//                       <select
//                         className="typeset w-100"
//                         name="type"
//                         required
//                         value={addLabField.type}
//                         onChange={handleAddLabChange}
//                       >
//                         <option value="">-select-</option>
//                         <option value="internal">Internal</option>
//                         <option value="external">External</option>
//                       </select>
//                     </div>
//                   </div>
//                   <br />
//                   <div className="d-flex">
//                     <div className="d-flex flex-column">
//                       <label htmlFor="">Number</label>
//                       <input
//                         type="text"
//                         maxLength={10}
//                         placeholder="contact number"
//                         className="rounded p-2"
//                         name="contact"
//                         required
//                         value={addLabField.contact}
//                         onChange={handleAddLabChange}
//                       />
//                     </div>
//                     <div className="d-flex flex-column mx-2">
//                       <label htmlFor="">Email</label>
//                       <input
//                         type="email"
//                         placeholder="add email"
//                         className="rounded p-2"
//                         name="email"
//                         required
//                         value={addLabField.email}
//                         onChange={handleAddLabChange}
//                       />
//                     </div>
//                   </div>
//                   <br />
//                   <div className="d-flex flex-column">
//                     <label htmlFor="">Address</label>
//                     <textarea
//                       name="address"
//                       id=""
//                       cols="30"
//                       rows="3"
//                       value={addLabField.address}
//                       onChange={handleAddLabChange}
//                     ></textarea>
//                   </div>
//                   <br />
//                   <div className="d-flex flex-column w-100">
//                     <label htmlFor="">Status</label>
//                     <select
//                       className="typeset w-100"
//                       name="status"
//                       required
//                       value={addLabField.status}
//                       onChange={handleAddLabChange}
//                     >
//                       <option value="">-select-</option>
//                       <option value="pending">Pending</option>
//                       <option value="approved">Approve</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-evenly">
//                   <button type="submit" className="btn btn-success mt-2">
//                     Save
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

//           {/* pop-up for adding lab */}
//           {/* ************************************************************************************* */}

//           {/* ***************************************************************************************************** */}
//           {/* other pop-up */}
//           {/* pop-up for adding lab */}
//           <div className={`popup-container${showAddLabTest ? " active" : ""}`}>
//             <div className="popup">
//               <h4 className="text-center">Add Lab Test</h4>
//               <form
//                 className="d-flex flex-column"
//                 onSubmit={insertLabTestClinic}
//               >
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Test Name</label>
//                         <input
//                           type="text"
//                           placeholder="Lab Test Name"
//                           className="rounded p-2"
//                           name="test_name"
//                           required
//                           value={addLabTestField.test_name}
//                           onChange={handleAddLabTestChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Test Code</label>
//                         <input
//                           type="text"
//                           placeholder="Lab Test Code"
//                           className="rounded p-2"
//                           name="test_code"
//                           required
//                           value={addLabTestField.test_code}
//                           onChange={handleAddLabTestChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Waiting for Report Days</label>
//                         <input
//                           type="text"
//                           placeholder="waiting days"
//                           className="rounded p-2"
//                           name="waiting_days"
//                           required
//                           value={addLabTestField.waiting_days}
//                           onChange={handleAddLabTestChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Lab Name</label>
//                         <select
//                           className="rounded p-2"
//                           name="default_lab"
//                           required
//                           value={addLabTestField.default_lab}
//                           onChange={handleAddLabTestChange}
//                         >
//                           <option value="">-select-</option>
//                           {labList?.map((item) => (
//                             <>
//                               <option value={item.lab_name}>
//                                 {item.lab_name}
//                               </option>
//                             </>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     {/* <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Test Date</label>
//                         <input
//                           type="date"
//                           placeholder="Lab Test Date"
//                           className="rounded p-2"
//                           name="test_date"
//                           required
//                           value={addLabTestField.test_date}
//                           onChange={handleAddLabTestChange}
//                         />
//                       </div>
//                     </div> */}
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Test Cost</label>
//                         <input
//                           type="text"
//                           placeholder="Lab Test Cost"
//                           className="rounded p-2"
//                           name="test_cost"
//                           required
//                           value={addLabTestField.test_cost}
//                           onChange={handleAddLabTestChange}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-success mt-2">
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-danger mt-2 ms-2"
//                     onClick={closeUpdatePopup}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* pop-up for adding lab */}
//           {/* ************************************************************************************* */}

//           {/* ***************************************************************************************************** */}
//           {/* other pop-up */}
//           {/* pop-up for adding lab */}
//           <div className={`popup-container${showAddLabTask ? " active" : ""}`}>
//             <div className="popup">
//               <h4 className="text-center">Add Labs Task</h4>
//               <form
//                 className="d-flex flex-column"
//                 // onSubmit={handleNoticeSubmit}
//               >
//                 <input
//                   type="text"
//                   placeholder="Lab Task Name"
//                   className="rounded p-2"
//                   // value={noticeData.linkURL}
//                   // onChange={(e) =>
//                   //   setNoticeData({
//                   //     ...noticeData,
//                   //     linkURL: e.target.value,
//                   //   })
//                   // }
//                 />
//                 <br />
//                 <input
//                   type="text"
//                   placeholder="Lab Task Code"
//                   className="rounded p-2"
//                   // value={noticeData.linkURL}
//                   // onChange={(e) =>
//                   //   setNoticeData({
//                   //     ...noticeData,
//                   //     linkURL: e.target.value,
//                   //   })
//                   // }
//                 />
//                 <br />
//                 <input
//                   type="text"
//                   placeholder="waiting days"
//                   className="rounded p-2"
//                   // value={noticeData.linkURL}
//                   // onChange={(e) =>
//                   //   setNoticeData({
//                   //     ...noticeData,
//                   //     linkURL: e.target.value,
//                   //   })
//                   // }
//                 />
//                 <br />
//                 <input
//                   type="text"
//                   placeholder="Default Labs"
//                   className="rounded p-2"
//                   // value={noticeData.linkURL}
//                   // onChange={(e) =>
//                   //   setNoticeData({
//                   //     ...noticeData,
//                   //     linkURL: e.target.value,
//                   //   })
//                   // }
//                 />
//                 <br />
//                 <input
//                   type="text"
//                   placeholder="Lab Task Cost"
//                   className="rounded p-2"
//                   // value={noticeData.linkURL}
//                   // onChange={(e) =>
//                   //   setNoticeData({
//                   //     ...noticeData,
//                   //     linkURL: e.target.value,
//                   //   })
//                   // }
//                 />
//                 <div className="d-flex justify-content-evenly">
//                   <button type="submit" className="btn btn-success mt-2">
//                     Save
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

//           {/* pop-up for adding lab */}
//           {/* ************************************************************************************* */}
//         </div>
//       </Container>
//     </>
//   );
// };
// export default AdminLabSetting;
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

//   .navlink {
//     background-color: #e0e0e0;
//     color: black;
//     border-radius: 1rem;
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

//   .background {
//     background: white;
//     padding: 1rem;
//     border-radius: 0.5rem;
//     box-shadow: inset 0px 0px 4px #b1adad;
//   }

//   .select-style {
//     border: none;
//     background-color: #22a6b3;
//     font-weight: bold;
//     color: white;
//   }

//   .typeset {
//     padding: 0.5rem;
//     border-radius: 6px;
//   }

//   label {
//     font-weight: bold;
//   }

//   .lab-actbtn {
//     height: 4rem;
//     padding: 0.5rem;
//     font-weight: bold;
//   }
//   .response{
//     @media (min-width: 1024px) and (max-width: 1279px){
//               width: 95%;
//             }
//     @media (min-width: 768px) and (max-width: 1023px){
//       width: 90%;
//       margin-left: 3rem;
//             }
//    }

//    th{
//     white-space: nowrap;
//    }
//    td{
//     white-space: nowrap;
//    }
// `;


import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";
import AdminLab from "../../components/Admin/Lab-settings/AdminLab";
import AdminLabTest from "../../components/Admin/Lab-settings/AdminLabTest";
import AdminLabTask from "../../components/Admin/Lab-settings/AdminLabTask";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
import { toggleTableRefresh } from "../../redux/slices/UserSlicer";
import Lab from "../../components/Admin/Lab-settings/AdminLab";
import LabTest from "../../components/Admin/Lab-settings/AdminLabTest";

const AdminLabSetting = () => {
  const dispatch = useDispatch();
  const initialTab = localStorage.getItem("selectedTab") || "tab1";
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [showAddLab, setShowAddLab] = useState(false);
  const [labList, setLabList] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  
  const branch = user.branch_name;

  const [showAddLabTest, setShowAddLabTest] = useState(false);
  const [showAddLabTask, setShowAddLabTask] = useState(false);
  const [addLabField, setAddLabField] = useState({
    branch: branch,
    name: "",
    type: "",
    contact: "",
    email: "",
    address: "",
    status: "",
  });

  const [addLabTestField, setAddLabTestField] = useState({
    test_name: "",
    test_code: "",
    waiting_days: "",
    default_lab: "",
    test_date: "",
    test_cost: "",
  });

  const handleAddLabChange = (event) => {
    const { name, value } = event.target;
    setAddLabField((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(addLabField);

  const handleAddLabTestChange = (event) => {
    const { name, value } = event.target;
    setAddLabTestField((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(addLabTestField);

  const openAddLabPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddLab(true);
  };

  const openAddLabTestPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddLabTest(true);
  };

  const openAddLabTaskPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddLabTask(true);
  };

  const closeUpdatePopup = () => {
    setShowAddLab(false);
    setShowAddLabTest(false);
    setShowAddLabTask(false);
  };

  const insertLabClinic = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/addLab",
        addLabField,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      cogoToast.success("Lab Added Successfully");
      dispatch(toggleTableRefresh());
      closeUpdatePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const insertLabTestClinic = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/addLabTest",
        addLabTestField,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      cogoToast.success("Lab Test Added Successfully");
      dispatch(toggleTableRefresh());
      closeUpdatePopup();
      setAddLabTestField({
        test_name: "",
        test_code: "",
        waiting_days: "",
        default_lab: "",
        test_date: "",
        test_cost: "",
      });
    } catch (error) {
      console.log(error);
      cogoToast.error("Test Code Already Exist");
    }
  };

  const getListLabDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getLabList/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLabList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListLabDetails();
  }, []);

  console.log(labList);
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
              <div className="col-lg-11 col-11 ps-0" style={{marginTop:"6rem"}}>
                {/* <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    <BranchSelector />
                  </div>
                </div> */}
                <div className="container-fluid mt-3">
                  <h2 className="text-center">Lab Settings</h2>
                  {/* <div className="mid-box">
                    <div className="row mt-5 background">
                      <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12 m-md-3">
                        <div className="">
                          <button
                            className="btn btn-info lab-actbtn"
                            onClick={() => openAddLabTestPopup()}
                          >
                            Add Lab Test
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* nav-items-start */}
                  <div className="container-fluid mt-5 navsect background">
                    <Nav
                      className="d-flex justify-content-between side-cont"
                      activeKey={selectedTab}
                      onSelect={(selectedKey) => setSelectedTab(selectedKey)}
                    >
                      <div className="d-flex flex-row">
                        <Nav.Item>
                          <Nav.Link eventKey="tab1" className="navlink">
                            Lab
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tab2" className="navlink mx-2">
                            Lab Test
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                      <div>
                        {/* <p className="fw-bold">Total Lab - 09</p> */}
                      </div>
                    </Nav>
                    <div className="flex-grow-1 p-3 mainback">
                      {selectedTab === "tab1" && <Lab />}
                      {selectedTab === "tab2" && <LabTest />}
                    </div>
                  </div>
                  {/* nav-items-ends */}
                </div>
              </div>
            </div>
          </div>
          {/* ***************************************************************************************************** */}
          {/* other pop-up */}
          {/* pop-up for adding lab */}
          <div className={`popup-container${showAddLab ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Labs</h4>
              <form className="d-flex flex-column" onSubmit={insertLabClinic}>
                <div className="d-flex flex-column">
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <label htmlFor="">Lab Name</label>
                      <input
                        type="text"
                        placeholder="Lab Name"
                        className="rounded p-2"
                        name="name"
                        required
                        value={addLabField.name}
                        onChange={handleAddLabChange}
                      />
                    </div>
                    <div className="d-flex flex-column mx-2 w-100">
                      <label htmlFor="">Type</label>
                      <select
                        className="typeset typeInput w-100"
                        name="type"
                        required
                        value={addLabField.type}
                        onChange={handleAddLabChange}
                        readonly
                      >
                        <option value="internal">Internal</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <label htmlFor="">Number</label>
                      <input
                        type="text"
                        maxLength={10}
                        placeholder="contact number"
                        className="rounded p-2"
                        name="contact"
                        required
                        value={addLabField.contact}
                        onChange={handleAddLabChange}
                      />
                    </div>
                    <div className="d-flex flex-column mx-2">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        placeholder="add email"
                        className="rounded p-2"
                        name="email"
                        required
                        value={addLabField.email}
                        onChange={handleAddLabChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="d-flex flex-column">
                    <label htmlFor="">Address</label>
                    <textarea
                      name="address"
                      id=""
                      cols="30"
                      rows="3"
                      value={addLabField.address}
                      onChange={handleAddLabChange}
                    ></textarea>
                  </div>
                  <br />
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="">Status</label>
                    <select
                      className="typeset w-100"
                      name="status"
                      required
                      value={addLabField.status}
                      onChange={handleAddLabChange}
                    >
                      <option value="">-select-</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approve</option>
                    </select>
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

          {/* pop-up for adding lab */}
          {/* ************************************************************************************* */}

          {/* ***************************************************************************************************** */}
          {/* other pop-up */}
          {/* pop-up for adding lab */}
          <div className={`popup-container${showAddLabTest ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Lab Test</h4>
              <form
                className="d-flex flex-column"
                onSubmit={insertLabTestClinic}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Test Name</label>
                        <input
                          type="text"
                          placeholder="Lab Test Name"
                          className="rounded p-2"
                          name="test_name"
                          required
                          value={addLabTestField.test_name}
                          onChange={handleAddLabTestChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Test Code</label>
                        <input
                          type="text"
                          placeholder="Lab Test Code"
                          className="rounded p-2"
                          name="test_code"
                          required
                          value={addLabTestField.test_code}
                          onChange={handleAddLabTestChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Waiting for Report Days</label>
                        <input
                          type="text"
                          placeholder="waiting days"
                          className="rounded p-2"
                          name="waiting_days"
                          required
                          value={addLabTestField.waiting_days}
                          onChange={handleAddLabTestChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Lab Name</label>
                        <select
                          className="rounded p-2"
                          name="default_lab"
                          required
                          value={addLabTestField.default_lab}
                          onChange={handleAddLabTestChange}
                        >
                          <option value="">-select-</option>
                          {labList?.map((item) => (
                            <>
                              <option value={item.lab_name}>
                                {item.lab_name}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Test Date</label>
                        <input
                          type="date"
                          placeholder="Lab Test Date"
                          className="rounded p-2"
                          name="test_date"
                          required
                          value={addLabTestField.test_date}
                          onChange={handleAddLabTestChange}
                        />
                      </div>
                    </div> */}
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Test Cost</label>
                        <input
                          type="text"
                          placeholder="Lab Test Cost"
                          className="rounded p-2"
                          name="test_cost"
                          required
                          value={addLabTestField.test_cost}
                          onChange={handleAddLabTestChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 ms-2"
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
          <div className={`popup-container${showAddLabTask ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Labs Task</h4>
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
                  placeholder="waiting days"
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
                  placeholder="Default Labs"
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

export default AdminLabSetting;
const Container = styled.div`
  .inputser {
    border-radius: 1.5rem;
    padding: 0.5rem;
    width: 80%;
  }

  .navlink.active {
    background-color: red;
    color: white;
    border-radius: 1rem;
  }

  .navlink {
    background-color: #e0e0e0;
    color: black;
    border-radius: 1rem;
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

  .background {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: inset 0px 0px 4px #b1adad;
    margin-left: 0.5rem;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  .typeset {
    padding: 0.5rem;
    border-radius: 6px;
  }

  label {
    font-weight: bold;
  }

  .lab-actbtn {
    height: 3rem;
    font-weight: bold;
    white-space: nowrap;
  }

  .typeInput {
    margin-top: 8px !important;
  }
`;

