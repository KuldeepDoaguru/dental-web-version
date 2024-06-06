// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// // import Header from "../../components/Header";
// // import Sider from "../../components/Sider";
// // import BranchSelector from "../../components/BranchSelector";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import cogoToast from "cogo-toast";
// import { Link, useNavigate } from "react-router-dom";
// import HeaderAdmin from "./HeaderAdmin";
// import SiderAdmin from "./SiderAdmin";

// const AdminManageStaff = () => {
//   const fileInputRef = useRef(null);
//   const [showAddEmployee, setShowAddEmployee] = useState(false);
//   const [showEditEmployee, setShowEditEmployee] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.currentUser);
//   console.log(user);
//   const [doctorList, setDoctorList] = useState([]);
//   const [keyword, setkeyword] = useState("");
//   const [empProfilePicture, setEmpProfilePicture] = useState(null);
//   const [inEmpData, setInEmpData] = useState({
//     branch: user.branch_name,
//     empName: "",
//     empMobile: "",
//     empGender: "",
//     empEmail: "",
//     empDesignation: "",
//     empSalary: "",
//     empAddress: "",
//     status: "",
//     morningShiftStartTime: "",
//     morningShiftEndTime: "",
//     eveningShiftStartTime: "",
//     eveningShiftEndTime: "",
//     allDayShiftStartTime: "",
//     allDayShiftEndTime: "",
//     working_days: "",
//     password: "",
//     empRole: [],
//     availability: "",
//     type_of: "",
//     experience: "",
//     language: "",
//     speciality: "",
//     employee_education: "",
//   });

//   const handleEmpProfilePicture = (e) => {
//     const selectedFile = e.target.files[0];
//     console.log(selectedFile);
//     if (selectedFile) {
//       // Read the selected file as data URL
//       const reader = new FileReader();
//       reader.readAsDataURL(selectedFile);
//       reader.onloadend = () => {
//         setEmpProfilePicture({
//           file: selectedFile,
//           imageUrl: reader.result,
//         });
//       };
//     }
//   };

//   console.log(empProfilePicture);
//   console.log(inEmpData);

//   const handleInputChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     if (type === "checkbox") {
//       setInEmpData((prevEmpData) => ({
//         ...prevEmpData,
//         [name]: checked
//           ? [...prevEmpData[name], value]
//           : prevEmpData[name].filter((item) => item !== value),
//       }));
//     } else {
//       setInEmpData((prevEmpData) => ({
//         ...prevEmpData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleCheckChange = (event) => {
//     const { name, checked } = event.target;

//     setInEmpData((prevEmpData) => ({
//       ...prevEmpData,
//       empRole: checked
//         ? [...prevEmpData.empRole, name]
//         : prevEmpData.empRole.filter((role) => role !== name),
//     }));
//   };

//   const getDocDetailsList = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/getEmployeeDataByBranch/${user.branch_name}`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(data);
//       setDoctorList(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getDocDetailsList();
//   }, []);

//   console.log(doctorList[8]?.employee_picture);

//   const openAddEmployeePopup = (index, item) => {
//     // setSelectedItem(item);
//     console.log("open pop up");
//     setShowAddEmployee(true);
//   };

//   const openEditEmployeePopup = (index, item) => {
//     // setSelectedItem(item);
//     console.log("open pop up");
//     setShowEditEmployee(true);
//   };

//   const closeUpdatePopup = () => {
//     setInEmpData({
//       branch: user.branch_name,
//       empName: "",
//       empMobile: "",
//       empGender: "",
//       empEmail: "",
//       empDesignation: "",
//       empSalary: "",
//       empAddress: "",
//       status: "",
//       morningShiftStartTime: "",
//       morningShiftEndTime: "",
//       eveningShiftStartTime: "",
//       eveningShiftEndTime: "",
//       allDayShiftStartTime: "",
//       allDayShiftEndTime: "",
//       working_days: "",
//       password: "",
//       empRole: [],
//       availability: "",
//       type_of: "",
//       experience: "",
//       language: "",
//       speciality: "",
//       employee_education: "",
//     });
//     setEmpProfilePicture(null);
//     setShowAddEmployee(false);
//     setShowEditEmployee(false);
//     // Deselect the file input
//     fileInputRef.current.value = "";
//   };

//   const enrollEmployeeDetails = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();

//       // Append user.data fields to formData
//       for (const key in inEmpData) {
//         formData.append(key, inEmpData[key]);
//       }
//       formData.append("empProfilePicture", empProfilePicture.file);
//       console.log(inEmpData, empProfilePicture);

//       const { data } = await axios.post(
//         "https://dentalguruadmin.doaguru.com/api/v1/admin/enroll-employee",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );

//       cogoToast.success("Registration successful!");
//       addEmployeeTimeline();
//       getDocDetailsList();
//       setInEmpData({
//         branch: user.branch_name,
//         empName: "",
//         empMobile: "",
//         empGender: "",
//         empEmail: "",
//         empDesignation: "",
//         empSalary: "",
//         empAddress: "",
//         status: "",
//         morningShiftStartTime: "",
//         morningShiftEndTime: "",
//         eveningShiftStartTime: "",
//         eveningShiftEndTime: "",
//         allDayShiftStartTime: "",
//         allDayShiftEndTime: "",
//         working_days: "",
//         password: "",
//         empRole: [],
//         availability: "",
//         type_of: "",
//         experience: "",
//         language: "",
//         speciality: "",
//         employee_education: "",
//       });
//       // Deselect the file input
//       fileInputRef.current.value = "";

//       setEmpProfilePicture(null);
//       closeUpdatePopup();
//     } catch (error) {
//       console.log(error);

//       // alert(`${error?.response?.data?.error}` || "some error");
//       cogoToast.error(`${error?.response?.data?.error}` || "some error");
//     }
//   };

//   const addEmployeeTimeline = async () => {
//     try {
//       const response = await axios.post(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/addSuperAdminNotify`,
//         {
//           branch_name: user.branch_name,
//           title: "New Employee Registered",
//           event_msg: `Please Check Manage Staff List ${inEmpData.empName}`,
//           open: "/manage-staff",
//           status: "unread",
//           time: new Date().toISOString().split("T")[0],
//         },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//     } catch (error) {
//       // console.log(`error employee TimeLine ${error}`);
//       cogoToast.error(`error employee TimeLine ${error}`);
//     }
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
//                 <div className="container-fluid mt-3">
//                   <div className="d-flex justify-content-between">
//                     {/* <BranchSelector /> */}
//                   </div>
//                 </div>
//                 <div className="container-fluid mt-3">
//                   <h2 className="text-center">Manage Employee</h2>
//                   {/* <img
//                     src="https://dentalgurusuperadmin.doaguru.com/empProfilePicture/17104102635691709210206279kd.jpg"
//                     alt="profile"
//                   /> */}
//                   <div className="d-flex justify-content-between">
//                     <div>
                     
//                       <input
//                         type="text"
//                         placeholder="Search Employee Name"
//                         className=""
//                         value={keyword}
//                         onChange={(e) =>
//                           setkeyword(e.target.value.toLowerCase())
//                         }
//                       />
//                     </div>
//                     <div>
//                       <button
//                         className="btn btn-success"
//                         onClick={() => openAddEmployeePopup()}
//                       >
//                         Add Employee
//                       </button>
//                     </div>
//                   </div>

//                   <div class="table-responsive mt-4">
//                     <table class="table table-bordered">
//                       <thead className="table-head">
//                         <tr>
//                           <th className="thead sticky">Emp ID</th>
//                           <th className="thead sticky">Name</th>
//                           <th className="thead sticky">Mobile</th>
//                           <th className="thead sticky">Email</th>
//                           <th className="thead sticky">Designation</th>
//                           <th className="thead sticky">Role</th>
//                           <th className="thead sticky">Salary</th>
//                           <th className="thead sticky">Address</th>
//                           <th className="sticky">Profile Picture</th>
//                           <th className="sticky" style={{ minWidth: "10rem" }}>
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {doctorList
//                           ?.filter((val) => {
//                             if (keyword === "") {
//                               return true;
//                             } else if (
//                               val.employee_name
//                                 .toLowerCase()
//                                 .includes(keyword.toLowerCase())
//                             ) {
//                               return val;
//                             }
//                           })
//                           .map((item) => (
//                             <>
//                               <tr className="table-row">
//                                 <td className="thead">{item.employee_ID}</td>
//                                 <td className="thead">{item.employee_name}</td>
//                                 <td className="thead">
//                                   {item.employee_mobile}
//                                 </td>

//                                 <td className="thead">{item.employee_email}</td>
//                                 <td className="thead">
//                                   {item.employee_designation}
//                                 </td>
//                                 <td className="thead">{item.employee_role}</td>
//                                 <td className="thead">{item.salary}</td>
//                                 <td className="thead">{item.address}</td>
//                                 <td>
//                                   <div className="emp-Img">
//                                     <img
//                                       src={item.employee_picture}
//                                       alt="profile"
//                                     />
//                                   </div>
//                                 </td>
//                                 <td className="" style={{ minWidth: "13rem" }}>
//                                   <Link
//                                     to={`/employee-profile/${item.employee_ID}`}
//                                   >
//                                     <button className="btn btn-warning">
//                                       Edit/View
//                                     </button>
//                                   </Link>

//                                   {/* <button className="btn btn-danger mx-1">
//                                     Delete
//                                   </button> */}
//                                 </td>
//                               </tr>
//                             </>
//                           ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* ***************************************************************************************************** */}
//           {/* other pop-up */}
//           {/* pop-up for adding lab */}
//           <div className={`popup-container${showAddEmployee ? " active" : ""}`}>
//             <div className="popup">
//               <h4 className="text-center">Add Employee</h4>
//               <hr />
//               <form
//                 className="d-flex flex-column"
//                 onSubmit={enrollEmployeeDetails}
//               >
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label class="form-label">Employee Name</label>
//                         <input
//                           type="text"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="Employee Name"
//                           name="empName"
//                           value={inEmpData.empName}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label class="form-label">Employee Mobile</label>
//                         <input
//                           type="text"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="Employee Mobile"
//                           name="empMobile"
//                           value={inEmpData.empMobile}
//                           maxLength={10}
//                           minLength={10}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label class="form-label">Employee Gender</label>
//                         <select
//                           name="empGender"
//                           id=""
//                           class="form-control w-100"
//                           value={inEmpData.empGender}
//                           onChange={handleInputChange}
//                           required
//                         >
//                           <option value="">select-option</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label class="form-label">Employee Email</label>
//                         <input
//                           type="email"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="Employee Email"
//                           name="empEmail"
//                           value={inEmpData.empEmail}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label class="form-label">Employee Designation</label>
//                         <select
//                           name="empDesignation"
//                           id=""
//                           class="form-select"
//                           aria-label="Default select example"
//                           value={inEmpData.empDesignation}
//                           onChange={handleInputChange}
//                           required
//                         >
//                           <option value="">select-designation</option>
//                           <option value="admin">Admin</option>
//                           <option value="receptionist">Receptionist</option>
//                           <option value="consultant">Consultant</option>
//                           <option value="helper">Helper</option>
//                           <option value="lab attendant">Lab Attendent</option>
//                           <option value="doctor">Doctor</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label class="form-label">Employee Salary</label>
//                         <input
//                           type="text"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="Employee salary"
//                           name="empSalary"
//                           value={inEmpData.empSalary}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label
//                           for="exampleFormControlInput1"
//                           class="form-label"
//                         >
//                           Employee Address
//                         </label>
//                         <input
//                           type="text"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="Employee Address"
//                           name="empAddress"
//                           value={inEmpData.empAddress}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label
//                           for="exampleFormControlInput1"
//                           class="form-label"
//                         >
//                           Employee Status
//                         </label>
//                         <select
//                           name="status"
//                           id=""
//                           class="form-select"
//                           aria-label="Default select example"
//                           value={inEmpData.status}
//                           onChange={handleInputChange}
//                           required
//                         >
//                           <option value="">select-status</option>
//                           <option value="onboard">Onboard</option>
//                           <option value="approved">Approved</option>
//                           <option value="pending">Pending</option>
//                           <option value="rejected">Rejected</option>
//                           <option value="hold">Hold</option>
//                           <option value="leave">Leave</option>
//                         </select>
//                       </div>
//                     </div>
//                     {/* <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label
//                           for="exampleFormControlInput1"
//                           class="form-label"
//                         >
//                           Morning Shift Start Time
//                         </label>
//                         <input
//                           type="time"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="Employee Mobile"
//                           name="morningShiftStartTime"
//                           value={inEmpData.morningShiftStartTime}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label
//                           for="exampleFormControlInput1"
//                           class="form-label"
//                         >
//                           Morning Shift End Time
//                         </label>
//                         <input
//                           type="time"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="Employee Mobile"
//                           name="morningShiftEndTime"
//                           value={inEmpData.morningShiftEndTime}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label
//                           for="exampleFormControlInput1"
//                           class="form-label"
//                         >
//                           Evening Shift Start Time
//                         </label>
//                         <input
//                           type="time"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="Employee Mobile"
//                           name="eveningShiftStartTime"
//                           value={inEmpData.eveningShiftStartTime}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div class="mb-3">
//                         <label
//                           for="exampleFormControlInput1"
//                           class="form-label"
//                         >
//                           Evening Shift End Time
//                         </label>
//                         <input
//                           type="time"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="Employee Mobile"
//                           name="eveningShiftEndTime"
//                           value={inEmpData.eveningShiftEndTime}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div> */}
//                     {inEmpData.empDesignation !== "doctor" && (
//                       <>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                           <div class="mb-3">
//                             <label
//                               for="exampleFormControlInput1"
//                               class="form-label"
//                             >
//                               All Day Shift Start Time
//                             </label>
//                             <input
//                               type="time"
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="Employee Mobile"
//                               name="allDayShiftStartTime"
//                               value={inEmpData.allDayShiftStartTime}
//                               onChange={handleInputChange}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                           <div class="mb-3">
//                             <label
//                               for="exampleFormControlInput1"
//                               class="form-label"
//                             >
//                               All Day Shift End Time
//                             </label>
//                             <input
//                               type="time"
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="Employee Mobile"
//                               name="allDayShiftEndTime"
//                               value={inEmpData.allDayShiftEndTime}
//                               onChange={handleInputChange}
//                             />
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div className="mb-3">
//                         <label
//                           for="exampleFormControlInput1"
//                           class="form-label"
//                         >
//                           Working Days
//                         </label>
//                         <input
//                           type="text"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="working days"
//                           name="working_days"
//                           value={inEmpData.working_days}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div className="mb-3">
//                         <label
//                           for="exampleFormControlInput1"
//                           class="form-label"
//                         >
//                           One Time Login Password
//                         </label>
//                         <input
//                           type="password"
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           placeholder="Employee Password"
//                           name="password"
//                           value={inEmpData.password}
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </div>
//                     </div>

//                     {inEmpData.empDesignation === "doctor" && (
//                       <>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                           <div class="mb-3">
//                             <label
//                               for="exampleFormControlInput1"
//                               class="form-label"
//                             >
//                               Morning Shift Start Time
//                             </label>
//                             <input
//                               type="time"
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="Employee Mobile"
//                               name="morningShiftStartTime"
//                               value={inEmpData.morningShiftStartTime}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                           <div class="mb-3">
//                             <label
//                               for="exampleFormControlInput1"
//                               class="form-label"
//                             >
//                               Morning Shift End Time
//                             </label>
//                             <input
//                               type="time"
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="Employee Mobile"
//                               name="morningShiftEndTime"
//                               value={inEmpData.morningShiftEndTime}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                           <div class="mb-3">
//                             <label
//                               for="exampleFormControlInput1"
//                               class="form-label"
//                             >
//                               Evening Shift Start Time
//                             </label>
//                             <input
//                               type="time"
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="Employee Mobile"
//                               name="eveningShiftStartTime"
//                               value={inEmpData.eveningShiftStartTime}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                           <div class="mb-3">
//                             <label
//                               for="exampleFormControlInput1"
//                               class="form-label"
//                             >
//                               Evening Shift End Time
//                             </label>
//                             <input
//                               type="time"
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="Employee Mobile"
//                               name="eveningShiftEndTime"
//                               value={inEmpData.eveningShiftEndTime}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                           <div className="mb-3">
//                             <label
//                               for="exampleFormControlInput1"
//                               class="form-label"
//                             >
//                               Doctor Education
//                             </label>
//                             <input
//                               type="text"
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="employee_education"
//                               name="employee_education"
//                               value={inEmpData.employee_education}
//                               onChange={handleInputChange}
//                             />
//                           </div>
//                         </div>

//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                           <div className="mb-3">
//                             <label
//                               for="exampleFormControlInput1"
//                               class="form-label"
//                             >
//                               Speciality
//                             </label>
//                             <input
//                               type="text"
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="speciality"
//                               name="speciality"
//                               value={inEmpData.speciality}
//                               onChange={handleInputChange}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                           <div className="mb-3">
//                             <label
//                               for="exampleFormControlInput1"
//                               class="form-label"
//                             >
//                               language
//                             </label>
//                             <input
//                               type="text"
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="language"
//                               name="language"
//                               value={inEmpData.language}
//                               onChange={handleInputChange}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                           <div className="mb-3">
//                             <label
//                               for="exampleFormControlInput1"
//                               class="form-label"
//                             >
//                               experience
//                             </label>
//                             <input
//                               type="text"
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               placeholder="experience"
//                               name="experience"
//                               value={inEmpData.experience}
//                               onChange={handleInputChange}
//                             />
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
//                       <div className="mb-3">
//                         <label class="form-label">type_of</label>

//                         <select
//                           id=""
//                           name="type_of"
//                           value={inEmpData.type_of}
//                           class="form-control"
//                           onChange={handleInputChange}
//                           required
//                         >
//                           <option value="">--Select--</option>
//                           <option value="full time">Full Time</option>
//                           <option value="half time">Part Time</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-between">
//                   <div class="mb-3">
//                     <label for="exampleFormControlInput1" class="form-label">
//                       Employee Role
//                     </label>
//                     <div class="form-check">
//                       <input
//                         class="form-check-input"
//                         type="checkbox"
//                         id="flexCheckDefault"
//                         name="admin"
//                         value={inEmpData.empRole}
//                         onChange={handleCheckChange}
//                       />
//                       <label class="form-check-label" for="flexCheckDefault">
//                         Admin
//                       </label>
//                     </div>
//                     <div class="form-check">
//                       <input
//                         class="form-check-input"
//                         type="checkbox"
//                         id="flexCheckDefault"
//                         name="receptionist"
//                         value={inEmpData.empRole}
//                         onChange={handleCheckChange}
//                       />
//                       <label class="form-check-label" for="flexCheckDefault">
//                         Receptionist
//                       </label>
//                     </div>
//                     <div class="form-check">
//                       <input
//                         class="form-check-input"
//                         type="checkbox"
//                         id="flexCheckDefault"
//                         name="consultant"
//                         value={inEmpData.empRole}
//                         onChange={handleCheckChange}
//                       />
//                       <label class="form-check-label" for="flexCheckDefault">
//                         Consultant
//                       </label>
//                     </div>
//                     <div class="form-check">
//                       <input
//                         class="form-check-input"
//                         type="checkbox"
//                         id="flexCheckDefault"
//                         name="lab attendant"
//                         value={inEmpData.empRole}
//                         onChange={handleCheckChange}
//                       />
//                       <label class="form-check-label" for="flexCheckDefault">
//                         Lab Attendent
//                       </label>
//                     </div>
//                     <div class="form-check">
//                       <input
//                         class="form-check-input"
//                         type="checkbox"
//                         id="flexCheckDefault"
//                         name="doctor"
//                         value={inEmpData.empRole}
//                         onChange={handleCheckChange}
//                       />
//                       <label class="form-check-label" for="flexCheckDefault">
//                         Doctor
//                       </label>
//                     </div>
//                   </div>
//                   <div className="d-flex">
//                     <div className="mb-3">
//                       <label for="exampleFormControlInput1" class="form-label">
//                         Upload Employee Profile Picture
//                       </label>
//                       <input
//                         type="file"
//                         class="p-1 w-100 rounded"
//                         placeholder="available stock"
//                         accept=".pdf, .jpg, .jpeg, .png"
//                         required
//                         name="empProfilePicture"
//                         onChange={handleEmpProfilePicture}
//                         ref={fileInputRef}
//                       />
//                     </div>
//                     <div className="mb-3 mx-2">
//                       {empProfilePicture && (
//                         <img
//                           src={empProfilePicture.imageUrl}
//                           alt="profile"
//                           className="imgData"
//                         />
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-success mt-2">
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-danger mt-2 mx-2"
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

// export default AdminManageStaff;
// const Container = styled.div`
//   .popup-container {
//     display: none;
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     overflow: scroll;
//     z-index: 99999;
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
//     height: auto;
//     width: auto;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//   }

//   th {
//     background-color: #1abc9c;
//     color: white;
//     text-align: center;
//     white-space: nowrap;
//   }
//   td {
//     text-align: center;
//     white-space: nowrap;
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

//   .thead {
//     min-width: 8rem;
//   }

//   .imgData {
//     height: 10rem;
//     width: auto;
//   }

//   .smallImg {
//     img {
//       height: 6rem;
//       width: auto;
//     }
//   }

//   .table-responsive {
//     height: 30rem;
//     overflow: auto;
//   }

//   .sticky {
//     position: sticky;
//     top: 0;
//     background-color: #1abc9c;
//     color: white;
//     z-index: 1;
//   }

//   .emp-Img {
//     img {
//       height: 5rem;
//       width: 5rem;
//     }
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
//     width: 115%;
//     padding: 12px 20px;
//     margin: 8px 0;
//     display: inline-block;
//     border: 1px solid #ccc;
//     border-radius: 20px;
//     box-sizing: border-box;
//     transition: border-color 0.3s ease;
//   }

//   input:focus {
//     border-color:  #1abc9c;
//   }
// `;





import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Link, useNavigate } from "react-router-dom";
import SiderAdmin from "./SiderAdmin";
import HeaderAdmin from "./HeaderAdmin";
import animationData from "../animation/loading-effect.json";
import Lottie from "react-lottie";

const AdminManageStaff = () => {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fileinput = useRef(null);
  const user = useSelector((state) => state.user.currentUser);
  
  const branch = user.branch_name;
  
  const [doctorList, setDoctorList] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [empProfilePicture, setEmpProfilePicture] = useState(null);
  const [inEmpData, setInEmpData] = useState({
    branch: branch,
    empName: "",
    empMobile: "",
    empGender: "",
    empEmail: "",
    empDesignation: "",
    empSalary: "",
    empAddress: "",
    status: "",
    morningShiftStartTime: "",
    morningShiftEndTime: "",
    eveningShiftStartTime: "",
    eveningShiftEndTime: "",
    allDayShiftStartTime: "",
    allDayShiftEndTime: "",
    working_days: "",
    password: "",
    empRole: [],
    availability: "",
    type_of: "",
    experience: "",
    language: "",
    speciality: "",
  });

  const handleEmpProfilePicture = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      // Read the selected file as data URL
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setEmpProfilePicture({
          file: selectedFile,
          imageUrl: reader.result,
        });
      };
    }
  };

  console.log(empProfilePicture);
  console.log(inEmpData);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setInEmpData((prevEmpData) => ({
        ...prevEmpData,
        [name]: checked
          ? [...prevEmpData[name], value]
          : prevEmpData[name].filter((item) => item !== value),
      }));
    } else if (name === "empMobile") {
      // Specific handling for mobile number field
      if (/^\d*$/.test(value) && value.length <= 10) {
        setInEmpData((prevEmpData) => ({
          ...prevEmpData,
          [name]: value,
        }));
      }
    } else {
      setInEmpData((prevEmpData) => ({
        ...prevEmpData,
        [name]: value,
      }));
    }
  };

  const handleCheckChange = (event) => {
    const { name, checked } = event.target;

    setInEmpData((prevEmpData) => ({
      ...prevEmpData,
      empRole: checked
        ? [...prevEmpData.empRole, name]
        : prevEmpData.empRole.filter((role) => role !== name),
    }));
  };

  const getDocDetailsList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getEmployeeDataByBranch/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      console.log(data);
      setDoctorList(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getDocDetailsList();
  }, []);

  

  useEffect(() => {
    getDocDetailsList();
  }, [branch]);

  console.log(doctorList);

  const openAddEmployeePopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddEmployee(true);
  };

  const openEditEmployeePopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowEditEmployee(true);
  };

  const closeUpdatePopup = () => {
    setInEmpData({
      branch: branch,
      empName: "",
      empMobile: "",
      empGender: "",
      empEmail: "",
      empDesignation: "",
      empSalary: "",
      empAddress: "",
      status: "",
      morningShiftStartTime: "",
      morningShiftEndTime: "",
      eveningShiftStartTime: "",
      eveningShiftEndTime: "",
      allDayShiftStartTime: "",
      allDayShiftEndTime: "",
      working_days: "",
      password: "",
      empRole: [],
      availability: "",
      type_of: "",
      experience: "",
      language: "",
      speciality: "",
    });
    setShowAddEmployee(false);
    setShowEditEmployee(false);
    fileinput.current.value = "";
    setEmpProfilePicture(null);
  };

  const enrollEmployeeDetails = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append user.data fields to formData
      for (const key in inEmpData) {
        formData.append(key, inEmpData[key]);
      }
      formData.append("empProfilePicture", empProfilePicture.file);
      console.log(inEmpData, empProfilePicture);

      const { data } = await axios.post(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/enroll-employee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      cogoToast.success("Registration successful!");
      addEmployeeTimeline();
      getDocDetailsList();
      setInEmpData({
        branch: branch,
        empName: "",
        empMobile: "",
        empGender: "",
        empEmail: "",
        empDesignation: "",
        empSalary: "",
        empAddress: "",
        status: "",
        morningShiftStartTime: "",
        morningShiftEndTime: "",
        eveningShiftStartTime: "",
        eveningShiftEndTime: "",
        allDayShiftStartTime: "",
        allDayShiftEndTime: "",
        working_days: "",
        password: "",
        empRole: [],
        availability: "",
        type_of: "",
        experience: "",
        language: "",
        speciality: "",
      });
      fileinput.current.value = "";
      setEmpProfilePicture(null);
      closeUpdatePopup();
    } catch (error) {
      console.log(error);
      cogoToast.error(error?.response?.data?.error || "Something went wrong");
      // alert(error?.response?.data?.error || "Something went wrong");
    }
  };

  console.log(new Date().toISOString().split("T")[0]);

  const addEmployeeTimeline = async () => {
    try {
      const response = await axios.post(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/addSuperAdminNotify`,
        {
          branch_name: branch,
          title: "New Employee Registered",
          event_msg: `Please Check Manage Staff List ${inEmpData.empName}`,
          open: "/manage-staff",
          status: "unread",
          time: new Date().toISOString().split("T")[0],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      // console.log(`error employee TimeLine ${error}`);
      cogoToast.error(`error employee TimeLine ${error}`);
    }
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  console.log(inEmpData);

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
                  <h2 className="text-center">Manage Employee</h2>
                  <div className="d-flex justify-content-between">
                    <div>
                      {/* <label>Employee Name :</label> */}
                      <input
                        type="text"
                        placeholder="Search Employee Name"
                        className="input"
                        value={keyword}
                        onChange={(e) =>
                          setkeyword(e.target.value.toLowerCase())
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => openAddEmployeePopup()}
                      >
                        Add Employee
                      </button>
                    </div>
                  </div>

                  {loading ? (
            <Lottie options={defaultOptions} height={300} width={400}></Lottie>
          ) : (
            <>
                      <div class="table-responsive mt-4">
                        <table class="table table-bordered">
                          <thead className="table-head">
                            <tr>
                              <th className="thead sticky">Emp ID</th>
                              <th className="thead sticky">Name</th>
                              <th className="thead sticky">Mobile</th>
                              <th className="thead sticky">Email</th>
                              <th className="thead sticky">Designation</th>
                              <th className="thead sticky">Role</th>
                              <th className="thead sticky">Salary</th>
                              <th className="thead sticky">Address</th>
                              <th className="sticky">Profile Picture</th>
                              <th
                                className="sticky"
                                style={{ minWidth: "10rem" }}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {doctorList
                              ?.filter((val) => {
                                if (keyword === "") {
                                  return true;
                                } else if (
                                  val.employee_name
                                    .toLowerCase()
                                    .includes(keyword.toLowerCase())
                                ) {
                                  return val;
                                }
                              })
                              .map((item) => (
                                <>
                                  <tr className="table-row">
                                    <td className="thead">
                                      {item.employee_ID}
                                    </td>
                                    <td className="thead">
                                      {item.employee_name}
                                    </td>
                                    <td className="thead">
                                      {item.employee_mobile}
                                    </td>

                                    <td className="thead">
                                      {item.employee_email}
                                    </td>
                                    <td className="thead">
                                      {item.employee_designation}
                                    </td>
                                    <td className="thead">
                                      {item.employee_role}
                                    </td>
                                    <td className="thead">{item.salary}</td>
                                    <td className="thead">{item.address}</td>
                                    <td>
                                      <div className="smallImg">
                                        <img
                                          src={item.employee_picture}
                                          alt="profile"
                                        />
                                      </div>
                                    </td>
                                    <td
                                      className=""
                                      style={{ minWidth: "13rem" }}
                                    >
                                      <Link
                                        to={`/employee-profile/${item.employee_ID}`}
                                      >
                                        <button className="btn btn-warning">
                                          Edit/View
                                        </button>
                                      </Link>

                                      {/* <button className="btn btn-danger mx-1">
                                    Delete
                                  </button> */}
                                    </td>
                                  </tr>
                                </>
                              ))}
                          </tbody>
                        </table>
                      </div>

                      </>
          )}
                   
                </div>
              </div>
            </div>
          </div>
          {/* ***************************************************************************************************** */}
          {/* other pop-up */}
          {/* pop-up for adding lab */}
          <div className={`popup-container${showAddEmployee ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Employee</h4>
              <hr />
              <form
                className="d-flex flex-column"
                onSubmit={enrollEmployeeDetails}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Name"
                          name="empName"
                          required
                          value={inEmpData.empName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Mobile
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Mobile"
                          name="empMobile"
                          maxLength={10}
                          minLength={10}
                          required
                          value={inEmpData.empMobile}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Gender
                        </label>
                        <select
                          name="empGender"
                          id=""
                          required
                          class="form-control w-100"
                          value={inEmpData.empGender}
                          onChange={handleInputChange}
                        >
                          <option value="">select-option</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Email
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Email"
                          required
                          name="empEmail"
                          value={inEmpData.empEmail}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Designation
                        </label>
                        <select
                          name="empDesignation"
                          id=""
                          class="form-select"
                          required
                          aria-label="Default select example"
                          value={inEmpData.empDesignation}
                          onChange={handleInputChange}
                        >
                          <option value="">select-designation</option>
                          <option value="admin">Admin</option>
                          <option value="receptionist">Receptionist</option>
                          <option value="consultant">Consultant</option>
                          <option value="accountant">Accountant</option>
                          <option value="helper">Helper</option>
                          <option value="lab attendant">Lab Attendent</option>
                          <option value="doctor">Doctor</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Salary
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          required
                          placeholder="Employee salary"
                          name="empSalary"
                          value={inEmpData.empSalary}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Address
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Address"
                          required
                          name="empAddress"
                          value={inEmpData.empAddress}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Employee Status
                        </label>
                        <select
                          name="status"
                          id=""
                          class="form-select"
                          required
                          aria-label="Default select example"
                          value={inEmpData.status}
                          onChange={handleInputChange}
                        >
                          <option value="">select-status</option>
                          <option value="onboard">Onboard</option>
                          <option value="Approved">Approved</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                          <option value="hold">Hold</option>
                          <option value="leave">Leave</option>
                        </select>
                      </div>
                    </div>
                    {inEmpData.empDesignation !== "doctor" && (
                      <>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div class="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              All Day Shift Start Time
                            </label>
                            <input
                              type="time"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Employee Mobile"
                              name="allDayShiftStartTime"
                              required
                              value={inEmpData.allDayShiftStartTime}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div class="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              All Day Shift End Time
                            </label>
                            <input
                              type="time"
                              class="form-control"
                              required
                              id="exampleFormControlInput1"
                              placeholder="Employee Mobile"
                              name="allDayShiftEndTime"
                              value={inEmpData.allDayShiftEndTime}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Working Days
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="working days"
                          name="working_days"
                          required
                          value={inEmpData.working_days}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          One Time Login Password
                        </label>
                        <input
                          type="password"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Employee Password"
                          name="password"
                          required
                          value={inEmpData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {inEmpData.empDesignation === "doctor" && (
                      <>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div class="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Morning Shift Start Time
                            </label>
                            <input
                              required
                              type="time"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Employee Mobile"
                              name="morningShiftStartTime"
                              value={inEmpData.morningShiftStartTime}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div class="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Morning Shift End Time
                            </label>
                            <input
                              type="time"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Employee Mobile"
                              name="morningShiftEndTime"
                              value={inEmpData.morningShiftEndTime}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div class="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Evening Shift Start Time
                            </label>
                            <input
                              type="time"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Employee Mobile"
                              name="eveningShiftStartTime"
                              value={inEmpData.eveningShiftStartTime}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div class="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Evening Shift End Time
                            </label>
                            <input
                              type="time"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Employee Mobile"
                              name="eveningShiftEndTime"
                              value={inEmpData.eveningShiftEndTime}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Doctor Education
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="employee_education"
                              required
                              name="employee_education"
                              value={inEmpData.employee_education}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Speciality
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="speciality"
                              name="speciality"
                              required
                              value={inEmpData.speciality}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              language
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="language"
                              name="language"
                              required
                              value={inEmpData.language}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                          <div className="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              experience
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="experience"
                              required
                              name="experience"
                              value={inEmpData.experience}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          type_of
                        </label>

                        <select
                          id=""
                          name="type_of"
                          value={inEmpData.type_of}
                          class="form-control"
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">--Select--</option>
                          <option value="full time">Full Time</option>
                          <option value="half time">Part Time</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <div class="">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Role
                    </label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="admin"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Admin
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="receptionist"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Receptionist
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="accountant"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Accountant
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="consultant"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Consultant
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="lab attendant"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Lab Attendent
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="doctor"
                        value={inEmpData.empRole}
                        onChange={handleCheckChange}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Doctor
                      </label>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Upload Employee Profile Picture
                      </label>
                      <input
                        type="file"
                        class="p-1 w-100 rounded"
                        placeholder="available stock"
                        accept=".pdf, .jpg, .jpeg, .png"
                        required
                        name="empProfilePicture"
                        onChange={handleEmpProfilePicture}
                        ref={fileinput}
                      />
                    </div>
                    <div className="mb-3 mx-2">
                      {empProfilePicture && (
                        <img
                          src={empProfilePicture.imageUrl}
                          alt="profile"
                          className="imgData"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mx-2"
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

export default AdminManageStaff;
const Container = styled.div`
  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: scroll;
    z-index: 99999;
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
    margin-top: 1rem;
    border-radius: 8px;
    height: auto;
    width: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  th {
    background-color: #1abc9c;
    color: white;
    text-align: center;
  }
  td {
    text-align: center;
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

  .thead {
    min-width: 8rem;
  }

  .imgData {
    height: 10rem;
    width: auto;
  }

  .smallImg {
    img {
      height: 6rem;
      width: auto;
    }
  }

  .table-responsive {
    height: 30rem;
    overflow: auto;
  }

  th {
    background-color: #1abc9c;
    color: white;
    position: sticky;
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color: #1abc9c;
    color: white;
    z-index: 1;
  }

  .input::placeholder {
    color: #aaa;
    opacity: 1; /* Ensure placeholder is visible */
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  .input:focus::placeholder {
    color: transparent; /* Hide placeholder on focus */
  }

  .input {
    width: 110%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
  }

  .input:focus {
    border-color: #007bff; /* Change border color on focus */
  }
`;