// import React, { useEffect, useState } from 'react'
// import { Button } from 'react-bootstrap'
// import Footer from '../MainComponents/Footer'
// import Sider from '../MainComponents/Sider'
// import { IoArrowBackSharp } from 'react-icons/io5'
// import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
// import signature from "../../Pages/signature_maker_after_.webp";
// import Header from '../MainComponents/Header'
// import axios from 'axios'
// import cogoToast from "cogo-toast";
// import styled from 'styled-components'
// import { useSelector } from 'react-redux'

// function Oral_Blood_Tests() {
//   const [patientbill_no, setPatientbill_no] = useState('')
//   const [patientUHID, setPatientUHID] = useState('')
//   const [patientName, setPatientName] = useState('')
//   const [patienttid, setPatienttid] = useState('')
//   const [patientbranch_name, setPatientbranch_name] = useState('')
//   const [patientAssigned_Doctor_Name, setPatientAssigned_Doctor_Name] = useState('')
//   const [patienttest, setPatienttest] = useState('')
//   const [patientresult, setPatientresult] = useState('')
//   const [patientunit, setPatientunit] = useState('')
//   const [patientcost, setPatientcost] = useState('')
//   const [patientcollection_date, setPatientcollection_date] = useState('')
//   const [patientauthenticate_date, setPatientauthenticate_date] = useState('')
//   const [labName, setLabName] = useState('')
//   const [labType, setLabType] = useState('Internal')
//   const [labtestpayment, setLabtestpayment] = useState(1500);
//   const [labtestpaymentstatus, setLabtestpaymentstatus] = useState('done');
//   const [loading, setLoading] = useState(false);
//   // const [pdfFile, setPdfFile] = useState(null);
//   // const [pdfFileError, setPdfFileError] = useState('');
//   const [files, setFiles] = useState([]);
//   const [fileError, setFileError] = useState('');

//   const location = useLocation();
//   const navigate = useNavigate();
//   const [resultError, setResultError] = useState('');
//   const [unitError, setUnitError] = useState('');

//   const currentUser = useSelector(state => state.auth.user);
//   const token = currentUser?.token;
//   const branch = currentUser.branch_name
//   const address = currentUser.address

//   const goBack = () => {
//     navigate('/')
//   };

//   const { id } = useParams();

//   useEffect(() => {
//     if (location.state && location.state.test) {
//       const { test, cost } = location.state;
//       setPatienttest(test);
//       setPatientcost(cost); // Set the patient cost if available
//     }
//   }, [location.state]);

//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://dentalgurulab.doaguru.com/api/lab/get-patient-details-by-id/${id}`,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             }
//           }
//         );
//         setPatientbill_no(response.data[0].testid)
//         setPatientUHID(response.data[0].patient_uhid)
//         setPatientName(response.data[0].patient_name)
//         setPatientbranch_name(response.data[0].branch_name)
//         setPatientAssigned_Doctor_Name(response.data[0].assigned_doctor_name)
//         setLabName(response.data[0].lab_name)
//         setPatienttid(response.data[0].tpid)
//       } catch (error) {
//         console.error("Error fetching patient details:", error);
//       }
//     };

//     fetchPatientDetails();
//   }, []);

//   const handleResultChange = (e) => {
//     const value = e.target.value;
//     const alphaRegex = /^[A-Za-z\s]*$/;

//     if (alphaRegex.test(value)) {
//       setResultError('');
//       setPatientresult(value);
//     } else {
//       setResultError('Result should contain only alphabetic characters.');
//     }
//   };

//   const handleUnitChange = (e) => {
//     const value = e.target.value;
//     const numericRegex = /^[0-9]*$/;

//     if (numericRegex.test(value)) {
//       setUnitError('');
//       setPatientunit(value);
//     } else {
//       setUnitError('Unit should contain only numeric characters.');
//     }
//   };

//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file && file.type !== 'application/pdf') {
//   //     setPdfFile(null);
//   //     setPdfFileError('Please upload a valid PDF file.');
//   //   } else {
//   //     setPdfFile(file);
//   //     setPdfFileError('');
//   //   }
//   // };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/webp', 'image/png'];
//     const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));

//     if (invalidFiles.length > 0) {
//       setFiles([]);
//       setFileError('Please upload valid files. Only PDF, JPG, JPEG, WEBP, and PNG files are allowed.');
//     } else {
//       setFiles(files);
//       setFileError('');
//     }
//   };

//   const hundleSumbit = async () => {
//     // Check if all required fields are filled
//     if (patientcollection_date === '') {
//       alert('Please fill patient collection date.');
//       return;
//     }
//     if (patientauthenticate_date === '') {
//       alert('Please fill patient authenticate date.');
//       return;
//     }
//     if (patientresult === '') {
//       alert('Please fill patient result.');
//       return;
//     }
//     if (labName === 'oral' && patientunit === '') {
//       alert('Please fill patient unit.');
//       return;
//     }
//     if (labName === 'pathology' && patientunit === '') {
//       alert('Please fill patient unit.');
//       return;
//     }
//     if (labName === 'radiology' && patientcost === '') {
//       alert('Please fill patient cost.');
//       return;
//     }
//     // if (!pdfFile) {
//     //   setPdfFileError('Please upload a PDF file.');
//     //   return;
//     // }
//     if (files.length === 0) {
//       setFileError('Please upload files.');
//       return;
//     }

//     try {
//       setLoading(true);
//       // Update the test status
//       const responsee = await axios.put(`https://dentalgurulab.doaguru.com/api/lab/update-test-status/${id}`, [],
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });
//       if (responsee.status === 200) {
//         console.log('Test status successfully updated');
//       }

//       const formData = new FormData();
//       formData.append('test', patienttest);
//       formData.append('result', patientresult);
//       formData.append('unit', patientunit);
//       formData.append('cost', patientcost);
//       formData.append('collection_date', patientcollection_date);
//       formData.append('authenticate_date', patientauthenticate_date);
//       // formData.append('pdf', pdfFile);
//       files.forEach(file => {
//         formData.append('files', file);
//       });

//       const response = await axios.put(
//         `https://dentalgurulab.doaguru.com/api/lab/update-patent-test-data/${patientbill_no}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       navigate(`/final-oral-testing/${patientbill_no}`);

//       // Check if the submission was successful
//       if (response.data.success === true) {
//         // Display success message
//         cogoToast.success(`${response.data.message}`);
//       } else {
//         console.error('Error uploading patient test data');
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error('Server Error:', error.message);
//     }
//   };

//   return (
//     <Wrapper>
//       <div className="">
//         <div className="d-print-none">
//           <Header />
//         </div>
//       </div>

//       <div clasNameName="main">
//         <div className="container-fluid">
//           <div className="row flex-nowrap ">
//             <div className="col-xxl-1 col-xl-1 col-lg-1 d-print-none col-sm-1 p-0">
//               <Sider />
//             </div>

//             <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 p-0" style={{ marginTop: "5rem" }}>
//               <div className="mx-5 resp">
//                 <IoArrowBackSharp
//                   className="fs-1 text-black d-print-none"
//                   onClick={goBack}
//                   style={{ cursor: "pointer" }}
//                 />
//                 <div className="row">
//                   <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
//                     <div className="row d-flex justify-content-between">
//                       <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-6 mt-4">
//                         <div>
//                           <h5>Branch : {branch}</h5>
//                         </div>
//                         <form className="d-flex fw-semibold">
//                           <p>Address </p>
//                           <p className="ms-1"> : </p>
//                           <p className="ms-2">
//                             {address}
//                           </p>
//                         </form>

//                         <form className="d-flex">
//                           <h5>Email id : </h5>
//                           <h5 className="ms-2">DentalGuru@Gmail.com</h5>
//                         </form>

//                         <form className="d-flex ms-auto my-sm mt-1">
//                           <h5>Contact Number : </h5>
//                           <h5 className="ms-2">+91-7000000058 </h5>
//                         </form>
//                       </div>

//                       <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 mt-4">
//                         <div className="text-center mt-2 footer">
//                           <img
//                             className="ms-4"
//                             src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
//                             alt="Logo"
//                             width="100"
//                             height="85"
//                           />
//                           <h3 className="ms-2">Dental Guru</h3>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <hr style={{ color: "Grey", height: "2px" }} />

//                 <div className="row d-flex justify-content-between ">
//                   <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
//                     <div className="col-lg-3 ">
//                       <label className="form-check-label mb-2">
//                         Lab Types
//                         <input
//                           className='form-control'
//                           type="text"
//                           value={labType}
//                         />
//                       </label>
//                     </div>
//                     <div className="table-responsive rounded">
//                       <table className="table tables table-bordered rounded shadow">
//                         <tbody>
//                           <tr>
//                             <td className="fw-semibold">
//                               Patient Name : {patientName}
//                             </td>
//                             <td className="fw-semibold">Patient UHID : {patientUHID}</td>
//                           </tr>
//                           <tr>
//                             <td className="fw-semibold">
//                               Patient Bill No : {patientbill_no}
//                             </td>
//                             <td className="fw-semibold">Branch Name : {patientbranch_name}</td>
//                           </tr>
//                           <tr>
//                             <td className="fw-semibold">
//                               Patient assigned Doctor Name :
//                               {patientAssigned_Doctor_Name}
//                             </td>
//                             <td className="fw-semibold">Test Name : {patienttest}</td>
//                           </tr>
//                           <tr>
//                             <td className="fw-semibold">Cost : {patientcost}</td>
//                             <td>
//                               <label htmlFor="result" className="fw-semibold">Result:</label>
//                               <input
//                                 type="text"
//                                 id="result"
//                                 value={patientresult}
//                                 onChange={handleResultChange}
//                                 className="form-control"
//                               />
//                               {resultError && (
//                                 <p style={{ color: 'red' }}>{resultError}</p>
//                               )}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <label htmlFor="unit" className="fw-semibold">Unit:</label>
//                               <input
//                                 type="text"
//                                 id="unit"
//                                 value={patientunit}
//                                 onChange={handleUnitChange}
//                                 className="form-control"
//                               />
//                               {unitError && (
//                                 <p style={{ color: 'red' }}>{unitError}</p>
//                               )}
//                             </td>
//                             <td>
//                               <label htmlFor="patientcollection_date" className="fw-semibold">Patient Collection Date:</label>
//                               <input
//                                 type="date"
//                                 id="patientcollection_date"
//                                 value={patientcollection_date}
//                                 onChange={(e) => setPatientcollection_date(e.target.value)}
//                                 className="form-control"
//                               />
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <label htmlFor="patientauthenticate_date" className="fw-semibold">Patient Authenticate Date:</label>
//                               <input
//                                 type="date"
//                                 id="patientauthenticate_date"
//                                 value={patientauthenticate_date}
//                                 onChange={(e) => setPatientauthenticate_date(e.target.value)}
//                                 className="form-control"
//                               />
//                             </td>
//                             <td>
//                               <label htmlFor="" className="fw-semibold">Upload PDF:</label>
//                               {/* <input
//                                 type="file"
//                                 id="pdfUpload"
//                                 accept="application/pdf"
//                                 onChange={handleFileChange}
//                                 className="form-control"
//                               />
//                               {pdfFileError && (
//                                 <p style={{ color: 'red' }}>{pdfFileError}</p>
//                               )} */}
//                                 <input
//                     type="file"
//                     className="form-control"
//                     onChange={handleFileChange}
//                     multiple
//                     accept=".pdf,.jpg,.jpeg,.webp,.png"
//                   />
//                   {fileError && <small className="text-danger">{fileError}</small>}
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center mt-4">
//                 <Button onClick={hundleSumbit} disabled={loading}>
//                   {loading ? 'Submitting...' : 'Submit'}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   )
// }

// export default Oral_Blood_Tests

// const Wrapper = styled.div`
//   .resp{
//     @media (min-width: 768px) and (max-width: 1020px) {
//       width: 80%;
//     }
//   }
// `

// import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import Footer from '../MainComponents/Footer';
// import Sider from '../MainComponents/Sider';
// import { IoArrowBackSharp } from 'react-icons/io5';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import Header from '../MainComponents/Header';
// import axios from 'axios';
// import cogoToast from "cogo-toast";
// import styled from 'styled-components';
// import { useSelector } from 'react-redux';

// function Oral_Blood_Tests() {
//   const [patientbill_no, setPatientbill_no] = useState('');
//   const [patientUHID, setPatientUHID] = useState('');
//   const [patientName, setPatientName] = useState('');
//   const [patienttid, setPatienttid] = useState('');
//   const [patientbranch_name, setPatientbranch_name] = useState('');
//   const [patientAssigned_Doctor_Name, setPatientAssigned_Doctor_Name] = useState('');
//   const [patienttest, setPatienttest] = useState('');
//   const [patientresult, setPatientresult] = useState('');
//   const [patientunit, setPatientunit] = useState('');
//   const [patientcost, setPatientcost] = useState('');
//   const [patientcollection_date, setPatientcollection_date] = useState('');
//   const [patientauthenticate_date, setPatientauthenticate_date] = useState('');
//   const [labName, setLabName] = useState('');
//   const [labType, setLabType] = useState('Internal');
//   const [labtestpayment, setLabtestpayment] = useState(1500);
//   const [labtestpaymentstatus, setLabtestpaymentstatus] = useState('done');
//   const [loading, setLoading] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [fileError, setFileError] = useState('');

//   const location = useLocation();
//   const navigate = useNavigate();
//   const [resultError, setResultError] = useState('');
//   const [unitError, setUnitError] = useState('');

//   const currentUser = useSelector(state => state.auth.user);
//   const token = currentUser?.token;
//   const branch = currentUser.branch_name;
//   const address = currentUser.address;

//   const goBack = () => {
//     navigate('/');
//   };

//   const { id } = useParams();

//   useEffect(() => {
//     if (location.state && location.state.test) {
//       const { test, cost } = location.state;
//       setPatienttest(test);
//       setPatientcost(cost); // Set the patient cost if available
//     }
//   }, [location.state]);

//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://dentalgurulab.doaguru.com/api/lab/get-patient-details-by-id/${id}`,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             }
//           }
//         );
//         const data = response.data[0];
//         setPatientbill_no(data.testid);
//         setPatientUHID(data.patient_uhid);
//         setPatientName(data.patient_name);
//         setPatientbranch_name(data.branch_name);
//         setPatientAssigned_Doctor_Name(data.assigned_doctor_name);
//         setLabName(data.lab_name);
//         setPatienttid(data.tpid);
//       } catch (error) {
//         console.error("Error fetching patient details:", error);
//       }
//     };

//     fetchPatientDetails();
//   }, []);

//   const handleResultChange = (e) => {
//     const value = e.target.value;
//     const alphaRegex = /^[A-Za-z\s]*$/;

//     if (alphaRegex.test(value)) {
//       setResultError('');
//       setPatientresult(value);
//     } else {
//       setResultError('Result should contain only alphabetic characters.');
//     }
//   };

//   const handleUnitChange = (e) => {
//     const value = e.target.value;
//     const numericRegex = /^[0-9]*$/;

//     if (numericRegex.test(value)) {
//       setUnitError('');
//       setPatientunit(value);
//     } else {
//       setUnitError('Unit should contain only numeric characters.');
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/webp', 'image/png'];
//     const invalidFiles = selectedFiles.filter(file => !allowedTypes.includes(file.type));

//     if (invalidFiles.length > 0) {
//       setFiles([]);
//       setFileError('Please upload valid files. Only PDF, JPG, JPEG, WEBP, and PNG files are allowed.');
//     } else {
//       setFiles(selectedFiles);
//       setFileError('');
//     }
//   };

//   const handleSubmit = async () => {
//     // Check if all required fields are filled
//     if (patientcollection_date === '') {
//       alert('Please fill patient collection date.');
//       return;
//     }
//     if (patientauthenticate_date === '') {
//       alert('Please fill patient authenticate date.');
//       return;
//     }
//     if (patientresult === '') {
//       alert('Please fill patient result.');
//       return;
//     }
//     if (labName === 'oral' && patientunit === '') {
//       alert('Please fill patient unit.');
//       return;
//     }
//     if (labName === 'pathology' && patientunit === '') {
//       alert('Please fill patient unit.');
//       return;
//     }
//     if (labName === 'radiology' && patientcost === '') {
//       alert('Please fill patient cost.');
//       return;
//     }
//     if (files.length === 0) {
//       setFileError('Please upload files.');
//       return;
//     }

//     try {
//             setLoading(true);
//             // Update the test status
//             const responsee = await axios.put(`https://dentalgurulab.doaguru.com/api/lab/update-test-status/${id}`, [],
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${token}`
//                 }
//               });
//             if (responsee.status === 200) {
//               console.log('Test status successfully updated');
//             }

//             const formData = new FormData();
//             formData.append('test', patienttest);
//             formData.append('result', patientresult);
//             formData.append('unit', patientunit);
//             formData.append('cost', patientcost);
//             formData.append('collection_date', patientcollection_date);
//             formData.append('authenticate_date', patientauthenticate_date);
//             // formData.append('pdf', pdfFile);
//             files.forEach(file => {
//               formData.append('files', file);
//             });

//             const response = await axios.put(
//               `https://dentalgurulab.doaguru.com/api/lab/update-patent-test-data/${patientbill_no}`,
//               formData,
//               {
//                 headers: {
//                   'Content-Type': 'multipart/form-data',
//                   'Authorization': `Bearer ${token}`
//                 }
//               }
//             );

//             navigate(`/final-oral-testing/${patientbill_no}`);

//             // Check if the submission was successful
//             if (response.data.success === true) {
//               // Display success message
//               cogoToast.success(`${response.data.message}`);
//             } else {
//               console.error('Error uploading patient test data');
//             }
//           } catch (error) {
//             setLoading(false);
//             console.error('Server Error:', error.message);
//           }
//         };
//   return (
//     <Wrapper>
//       <Header />
//       <Sider />
//       <div className="main-content">
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <h2>Update Oral/Blood Tests</h2>
//               <IoArrowBackSharp className="fs-1 text-black d-print-none" onClick={goBack} style={{ cursor: "pointer" }} />
//               <div className="row">
//                 <div className="col-12">
//                   <div className="d-flex justify-content-between">
//                     <div className="col-6">
//                       <h5>Branch : {branch}</h5>
//                       <p>Address: {address}</p>
//                       <p>Email id : DentalGuru@Gmail.com</p>
//                       <p>Contact Number : +91-7000000058 </p>
//                     </div>
//                     <div className="col-6 text-end">
//                       <img src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png" alt="Logo" width="100" height="85" />
//                       <h3 className="ms-2">Dental Guru</h3>
//                     </div>
//                   </div>
//                   <hr style={{ color: "Grey", height: "2px" }} />
//                   <div className="col-12">
//                     <div className="table-responsive rounded">
//                       <table className="table tables table-bordered rounded shadow">
//                         <tbody>
//                           <tr>
//                             <td className="fw-semibold">Patient Name : {patientName}</td>
//                             <td className="fw-semibold">Patient UHID : {patientUHID}</td>
//                           </tr>
//                           <tr>
//                             <td className="fw-semibold">Patient Bill No : {patientbill_no}</td>
//                             <td className="fw-semibold">Branch Name : {patientbranch_name}</td>
//                           </tr>
//                           <tr>
//                             <td className="fw-semibold">Patient assigned Doctor Name : {patientAssigned_Doctor_Name}</td>
//                             <td className="fw-semibold">Test Name : {patienttest}</td>
//                           </tr>
//                           <tr>
//                             <td className="fw-semibold">Cost : {patientcost}</td>
//                             <td>
//                               <label htmlFor="result" className="fw-semibold">Result:</label>
//                               <input
//                                 type="text"
//                                 id="result"
//                                 value={patientresult}
//                                 onChange={handleResultChange}
//                                 className="form-control"
//                               />
//                               {resultError && <p style={{ color: 'red' }}>{resultError}</p>}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <label htmlFor="unit" className="fw-semibold">Unit:</label>
//                               <input
//                                 type="text"
//                                 id="unit"
//                                 value={patientunit}
//                                 onChange={handleUnitChange}
//                                 className="form-control"
//                               />
//                               {unitError && <p style={{ color: 'red' }}>{unitError}</p>}
//                             </td>
//                             <td>
//                               <label htmlFor="patientcollection_date" className="fw-semibold">Patient Collection Date:</label>
//                               <input
//                                 type="date"
//                                 id="patientcollection_date"
//                                 value={patientcollection_date}
//                                 onChange={(e) => setPatientcollection_date(e.target.value)}
//                                 className="form-control"
//                               />
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <label htmlFor="patientauthenticate_date" className="fw-semibold">Patient Authenticate Date:</label>
//                               <input
//                                 type="date"
//                                 id="patientauthenticate_date"
//                                 value={patientauthenticate_date}
//                                 onChange={(e) => setPatientauthenticate_date(e.target.value)}
//                                 className="form-control"
//                               />
//                             </td>
//                             <td>
//                               <label htmlFor="file-upload" className="fw-semibold">Upload Files:</label>
//                               <input
//                                 type="file"
//                                 className="form-control"
//                                 onChange={handleFileChange}
//                                 multiple
//                                 accept=".pdf,.jpg,.jpeg,.webp,.png"
//                               />
//                               {fileError && <small className="text-danger">{fileError}</small>}
//                               {files.length > 0 && (
//                                 <div>
//                                   <h6>Selected Files:</h6>
//                                   <ul>
//                                     {files.map((file, index) => (
//                                       <li key={index}>{file.name}</li>
//                                     ))}
//                                   </ul>
//                                 </div>
//                               )}
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center mt-4">
//                 <Button onClick={handleSubmit} disabled={loading}>
//                   {loading ? 'Submitting...' : 'Submit'}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </Wrapper>
//   );
// }

// export default Oral_Blood_Tests;

// const Wrapper = styled.div`
//   .resp {
//     @media (min-width: 768px) and (max-width: 1020px) {
//       width: 80%;
//     }
//   }
// `;



import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Footer from '../MainComponents/Footer';
import Sider from '../MainComponents/Sider';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Header from '../MainComponents/Header';
import axios from 'axios';
import cogoToast from "cogo-toast";
import styled from 'styled-components';
import { useSelector } from 'react-redux';

function Oral_Blood_Tests() {
  const [patientbill_no, setPatientbill_no] = useState('');
  const [patientUHID, setPatientUHID] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patienttid, setPatienttid] = useState('');
  const [patientbranch_name, setPatientbranch_name] = useState('');
  const [patientAssigned_Doctor_Name, setPatientAssigned_Doctor_Name] = useState('');
  const [patienttest, setPatienttest] = useState('');
  const [patientresult, setPatientresult] = useState('');
  const [patientunit, setPatientunit] = useState('');
  const [patientcost, setPatientcost] = useState('');
  const [patientcollection_date, setPatientcollection_date] = useState('');
  const [patientauthenticate_date, setPatientauthenticate_date] = useState('');
  const [labName, setLabName] = useState('');
  const [labType, setLabType] = useState('Internal');
  const [labtestpayment, setLabtestpayment] = useState(1500);
  const [labtestpaymentstatus, setLabtestpaymentstatus] = useState('done');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const [resultError, setResultError] = useState('');
  const [unitError, setUnitError] = useState('');

  const currentUser = useSelector(state => state.auth.user);
  const token = currentUser?.token;
  const branch = currentUser.branch_name;
  const address = currentUser.address;

  const goBack = () => {
    navigate('/');
  };

  const { id } = useParams();

  useEffect(() => {
    if (location.state && location.state.test) {
      const { test, cost } = location.state;
      setPatienttest(test);
      setPatientcost(cost); // Set the patient cost if available
    }
  }, [location.state]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/get-patient-details-by-id/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const data = response.data[0];
        setPatientbill_no(data.testid);
        setPatientUHID(data.patient_uhid);
        setPatientName(data.patient_name);
        setPatientbranch_name(data.branch_name);
        setPatientAssigned_Doctor_Name(data.assigned_doctor_name);
        setLabName(data.lab_name);
        setPatienttid(data.tpid);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);

  const handleResultChange = (e) => {
    const value = e.target.value;
    const alphaRegex = /^[A-Za-z\s]*$/;

    if (alphaRegex.test(value)) {
      setResultError('');
      setPatientresult(value);
    } else {
      setResultError('Result should contain only alphabetic characters.');
    }
  };

  const handleUnitChange = (e) => {
    const value = e.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(value)) {
      setUnitError('');
      setPatientunit(value);
    } else {
      setUnitError('Unit should contain only numeric characters.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/webp', 'image/png'];
    const invalidFiles = selectedFiles.filter(file => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setFiles([]);
      setFileError('Please upload valid files. Only PDF, JPG, JPEG, WEBP, and PNG files are allowed.');
    } else {
      setFiles(selectedFiles);
      setFileError('');
    }
  };

  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (patientcollection_date === '') {
      alert('Please fill patient collection date.');
      return;
    }
    if (patientauthenticate_date === '') {
      alert('Please fill patient authenticate date.');
      return;
    }
    if (patientresult === '') {
      alert('Please fill patient result.');
      return;
    }
    if (labName === 'oral' && patientunit === '') {
      alert('Please fill patient unit.');
      return;
    }
    if (labName === 'pathology' && patientunit === '') {
      alert('Please fill patient unit.');
      return;
    }
    if (labName === 'radiology' && patientcost === '') {
      alert('Please fill patient cost.');
      return;
    }
    if (files.length === 0) {
      setFileError('Please upload files.');
      return;
    }

    try {
      setLoading(true);
      // Update the test status
      const responsee = await axios.put(`https://dentalgurulab.doaguru.com/api/lab/update-test-status/${id}`, [],
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      if (responsee.status === 200) {
        console.log('Test status successfully updated');
      }

      const formData = new FormData();
      formData.append('test', patienttest);
      formData.append('result', patientresult);
      formData.append('unit', patientunit);
      formData.append('cost', patientcost);
      formData.append('collection_date', patientcollection_date);
      formData.append('authenticate_date', patientauthenticate_date);
      // formData.append('pdf', pdfFile);
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await axios.put(
        `https://dentalgurulab.doaguru.com/api/lab/update-patent-test-data/${patientbill_no}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      navigate(`/final-oral-testing/${patientbill_no}`);

      // Check if the submission was successful
      if (response.data.success === true) {
        // Display success message
        cogoToast.success(`${response.data.message}`);
      } else {
        console.error('Error uploading patient test data');
      }
    } catch (error) {
      setLoading(false);
      console.error('Server Error:', error.message);
    }
  };

  return (
    <Wrapper>
    <div className="">
      <div className="d-print-none">
        <Header />
      </div>
    </div>

    <div clasNameName="main">
      <div className="container-fluid">
        <div className="row flex-nowrap ">
          <div className="col-xxl-1 col-xl-1 col-lg-1 d-print-none col-sm-1 p-0">
            <Sider />
          </div>

          <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 p-0" style={{ marginTop: "5rem" }}>
            <div className="mx-5 resp">
              <IoArrowBackSharp
                className="fs-1 text-black d-print-none"
                onClick={goBack}
                style={{ cursor: "pointer" }}
              />
              <div className="row">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                  <div className="row d-flex justify-content-between">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-6 mt-4">
                      <div>
                        <h5>Branch : {branch}</h5>
                      </div>
                      <form className="d-flex fw-semibold">
                        <p>Address </p>
                        <p className="ms-1"> : </p>
                        <p className="ms-2">
                          {address}
                        </p>
                      </form>

                      <form className="d-flex">
                        <h5>Email id : </h5>
                        <h5 className="ms-2">DentalGuru@Gmail.com</h5>
                      </form>

                      <form className="d-flex ms-auto my-sm mt-1">
                        <h5>Contact Number : </h5>
                        <h5 className="ms-2">+91-7000000058 </h5>
                      </form>
                    </div>

                    {/* <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 mt-4">
                      <div className="text-center mt-2 footer">
                        <img
                          className="ms-4"
                          src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
                          alt="Logo"
                          width="100"
                          height="85"
                        />
                        <h3 className="ms-2">Dental Guru</h3>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <hr style={{ color: "Grey", height: "2px" }} />

              <div className="row d-flex justify-content-between ">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="col-lg-3 ">
                    <label className="form-check-label mb-2">
                      Lab Types
                      <input
                        className='form-control'
                        type="text"
                        value={labType}
                      />
                    </label>
                  </div>
                  <div className="table-responsive rounded">
                  <div className="table-responsive rounded">
                    <table className="table tables table-bordered rounded shadow">
                      <tbody>
                        <tr>
                          <td className="fw-semibold">Patient Name : {patientName}</td>
                          <td className="fw-semibold">Patient UHID : {patientUHID}</td>
                        </tr>
                        <tr>
                          <td className="fw-semibold">Patient Bill No : {patientbill_no}</td>
                          <td className="fw-semibold">Branch Name : {patientbranch_name}</td>
                        </tr>
                        <tr>
                          <td className="fw-semibold">Patient Assigned Doctor Name : {patientAssigned_Doctor_Name}</td>
                          <td className="fw-semibold">Test Name : {patienttest}</td>
                        </tr>
                        <tr>
                          <td className="fw-semibold">Cost : {patientcost}</td>
                          <td>
                            <label htmlFor="result" className="fw-semibold">Result:</label>
                            <input
                              type="text"
                              id="result"
                              value={patientresult}
                              onChange={handleResultChange}
                              className="form-control"
                            />
                            {resultError && <p style={{ color: 'red' }}>{resultError}</p>}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="unit" className="fw-semibold">Unit:</label>
                            <input
                              type="text"
                              id="unit"
                              value={patientunit}
                              onChange={handleUnitChange}
                              className="form-control"
                            />
                            {unitError && <p style={{ color: 'red' }}>{unitError}</p>}
                          </td>
                          <td>
                            <label htmlFor="patientcollection_date" className="fw-semibold">Patient Collection Date:</label>
                            <input
                              type="date"
                              id="patientcollection_date"
                              value={patientcollection_date}
                              onChange={(e) => setPatientcollection_date(e.target.value)}
                              className="form-control"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="patientauthenticate_date" className="fw-semibold">Patient Authenticate Date:</label>
                            <input
                              type="date"
                              id="patientauthenticate_date"
                              value={patientauthenticate_date}
                              onChange={(e) => setPatientauthenticate_date(e.target.value)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <label htmlFor="file-upload" className="fw-semibold">Upload Files:</label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleFileChange}
                              multiple
                              accept=".pdf,.jpg,.jpeg,.webp,.png"
                            />
                            {fileError && <small className="text-danger">{fileError}</small>}
                            {files.length > 0 && (
                              <div>
                                <h6>Selected Files:</h6>
                                <ul>
                                  {files.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4 mb-3">
            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>

  );
}

export default Oral_Blood_Tests;

const Wrapper = styled.div`
  .resp {
    @media (min-width: 768px) and (max-width: 1020px) {
      width: 80%;
    }
  }
`;







// lastbackcode
// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import Footer from "../MainComponents/Footer";
// import Sider from "../MainComponents/Sider";
// import { IoArrowBackSharp } from "react-icons/io5";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import Header from "../MainComponents/Header";
// import axios from "axios";
// import cogoToast from "cogo-toast";
// import styled from "styled-components";
// import { useSelector } from "react-redux";

// function Oral_Blood_Tests() {
//   const [patientbill_no, setPatientbill_no] = useState("");
//   const [patientUHID, setPatientUHID] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const [patienttid, setPatienttid] = useState("");
//   const [patientbranch_name, setPatientbranch_name] = useState("");
//   const [patientAssigned_Doctor_Name, setPatientAssigned_Doctor_Name] =
//     useState("");
//   const [patienttest, setPatienttest] = useState("");
//   const [patientresult, setPatientresult] = useState("");
//   const [patientunit, setPatientunit] = useState("");
//   const [patientcost, setPatientcost] = useState("");
//   const [patientcollection_date, setPatientcollection_date] = useState("");
//   const [patientauthenticate_date, setPatientauthenticate_date] = useState("");
//   const [labName, setLabName] = useState("");
//   const [labType, setLabType] = useState("Internal");
//   const [labtestpayment, setLabtestpayment] = useState(1500);
//   const [labtestpaymentstatus, setLabtestpaymentstatus] = useState("done");
//   const [loading, setLoading] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [fileError, setFileError] = useState("");

//   const location = useLocation();
//   const navigate = useNavigate();
//   const [resultError, setResultError] = useState("");
//   const [unitError, setUnitError] = useState("");

//   const currentUser = useSelector((state) => state.auth.user);
//   const token = currentUser?.token;
//   const branch = currentUser.branch_name;
//   const address = currentUser.address;

//   const goBack = () => {
//     navigate("/");
//   };

//   const { id } = useParams();

//   useEffect(() => {
//     if (location.state && location.state.test) {
//       const { test, cost } = location.state;
//       setPatienttest(test);
//       setPatientcost(cost); // Set the patient cost if available
//     }
//   }, [location.state]);

//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://dentalgurulab.doaguru.com/api/lab/get-patient-details-by-id/${id}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = response.data[0];
//         setPatientbill_no(data.testid);
//         setPatientUHID(data.patient_uhid);
//         setPatientName(data.patient_name);
//         setPatientbranch_name(data.branch_name);
//         setPatientAssigned_Doctor_Name(data.assigned_doctor_name);
//         setLabName(data.lab_name);
//         setPatienttid(data.tpid);
//       } catch (error) {
//         console.error("Error fetching patient details:", error);
//       }
//     };

//     fetchPatientDetails();
//   }, []);

//   const handleResultChange = (e) => {
//     const value = e.target.value;
//     const alphaRegex = /^[A-Za-z\s]*$/;

//     if (alphaRegex.test(value)) {
//       setResultError("");
//       setPatientresult(value);
//     } else {
//       setResultError("Result should contain only alphabetic characters.");
//     }
//   };

//   const handleUnitChange = (e) => {
//     const value = e.target.value;
//     const numericRegex = /^[0-9]*$/;

//     if (numericRegex.test(value)) {
//       setUnitError("");
//       setPatientunit(value);
//     } else {
//       setUnitError("Unit should contain only numeric characters.");
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const allowedTypes = [
//       "application/pdf",
//       "image/jpeg",
//       "image/jpg",
//       "image/webp",
//       "image/png",
//     ];
//     const invalidFiles = selectedFiles.filter(
//       (file) => !allowedTypes.includes(file.type)
//     );

//     if (invalidFiles.length > 0) {
//       setFileError(
//         "Please upload valid files. Only PDF, JPG, JPEG, WEBP, and PNG files are allowed."
//       );
//     } else {
//       setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
//       setFileError("");
//     }
//   };

//   const handleSubmit = async () => {
//     // Check if all required fields are filled
//     if (patientcollection_date === "") {
//       alert("Please fill patient collection date.");
//       return;
//     }
//     if (patientauthenticate_date === "") {
//       alert("Please fill patient authenticate date.");
//       return;
//     }
//     if (patientresult === "") {
//       alert("Please fill patient result.");
//       return;
//     }
//     if (labName === "oral" && patientunit === "") {
//       alert("Please fill patient unit.");
//       return;
//     }
//     if (labName === "pathology" && patientunit === "") {
//       alert("Please fill patient unit.");
//       return;
//     }
//     if (labName === "radiology" && patientcost === "") {
//       alert("Please fill patient cost.");
//       return;
//     }
//     if (files.length === 0) {
//       setFileError("Please upload files.");
//       return;
//     }

//     try {
//       setLoading(true);
//       // Update the test status
//       const responsee = await axios.put(
//         `https://dentalgurulab.doaguru.com/api/lab/update-test-status/${id}`,
//         [],
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (responsee.status === 200) {
//         console.log("Test status successfully updated");
//       }

//       const formData = new FormData();
//       formData.append("test", patienttest);
//       formData.append("result", patientresult);
//       formData.append("unit", patientunit);
//       formData.append("cost", patientcost);
//       formData.append("collection_date", patientcollection_date);
//       formData.append("authenticate_date", patientauthenticate_date);
//       // formData.append('pdf', pdfFile);
//       files.forEach((file, index) => {
//         formData.append("files", file);
//       });

//       const response = await axios.put(
//         `https://dentalgurulab.doaguru.com/api/lab/update-patent-test-data/${patientbill_no}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       navigate(`/final-oral-testing/${patientbill_no}`);

//       // Check if the submission was successful
//       if (response.data.success === true) {
//         // Display success message
//         cogoToast.success(`${response.data.message}`);
//       } else {
//         console.error("Error uploading patient test data");
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Server Error:", error.message);
//     }
//   };

//   return (
//     <Wrapper>
//       <Header />
//       <Sider />
//       <div className="main-content">
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <h2>Update Oral/Blood Tests</h2>
//               <IoArrowBackSharp
//                 className="fs-1 text-black d-print-none"
//                 onClick={goBack}
//                 style={{ cursor: "pointer" }}
//               />
//               <div className="row">
//                 <div className="col-12">
//                   <div className="d-flex justify-content-between">
//                     <div className="col-6">
//                       <h5>Branch : {branch}</h5>
//                       <p>Address: {address}</p>
//                       <p>Email id : DentalGuru@Gmail.com</p>
//                       <p>Contact Number : +91-7000000058 </p>
//                     </div>
//                     <div className="col-6 text-end">
//                       <img
//                         src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
//                         alt="Logo"
//                         width="100"
//                         height="85"
//                       />
//                       <h3 className="ms-2">Dental Guru</h3>
//                     </div>
//                   </div>
//                   <hr style={{ color: "Grey", height: "2px" }} />
//                   <div className="col-12">
//                     <div className="table-responsive rounded">
//                       <table className="table tables table-bordered rounded shadow">
//                         <tbody>
//                           <tr>
//                             <td className="fw-semibold">
//                               Patient Name : {patientName}
//                             </td>
//                             <td className="fw-semibold">
//                               Patient UHID : {patientUHID}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="fw-semibold">
//                               Patient Bill No : {patientbill_no}
//                             </td>
//                             <td className="fw-semibold">
//                               Branch Name : {patientbranch_name}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="fw-semibold">
//                               Patient assigned Doctor Name :{" "}
//                               {patientAssigned_Doctor_Name}
//                             </td>
//                             <td className="fw-semibold">
//                               Test Name : {patienttest}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td className="fw-semibold">
//                               Cost : {patientcost}
//                             </td>
//                             <td>
//                               <label htmlFor="result" className="fw-semibold">
//                                 Result:
//                               </label>
//                               <input
//                                 type="text"
//                                 id="result"
//                                 value={patientresult}
//                                 onChange={handleResultChange}
//                                 className="form-control"
//                               />
//                               {resultError && (
//                                 <p style={{ color: "red" }}>{resultError}</p>
//                               )}
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <label htmlFor="unit" className="fw-semibold">
//                                 Unit:
//                               </label>
//                               <input
//                                 type="text"
//                                 id="unit"
//                                 value={patientunit}
//                                 onChange={handleUnitChange}
//                                 className="form-control"
//                               />
//                               {unitError && (
//                                 <p style={{ color: "red" }}>{unitError}</p>
//                               )}
//                             </td>
//                             <td>
//                               <label
//                                 htmlFor="patientcollection_date"
//                                 className="fw-semibold"
//                               >
//                                 Patient Collection Date:
//                               </label>
//                               <input
//                                 type="date"
//                                 id="patientcollection_date"
//                                 value={patientcollection_date}
//                                 onChange={(e) =>
//                                   setPatientcollection_date(e.target.value)
//                                 }
//                                 className="form-control"
//                               />
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>
//                               <label
//                                 htmlFor="patientauthenticate_date"
//                                 className="fw-semibold"
//                               >
//                                 Patient Authenticate Date:
//                               </label>
//                               <input
//                                 type="date"
//                                 id="patientauthenticate_date"
//                                 value={patientauthenticate_date}
//                                 onChange={(e) =>
//                                   setPatientauthenticate_date(e.target.value)
//                                 }
//                                 className="form-control"
//                               />
//                             </td>
//                             <td>
//                               <label
//                                 htmlFor="file-upload"
//                                 className="fw-semibold"
//                               >
//                                 Upload Files:
//                               </label>
//                               <input
//                                 type="file"
//                                 className="form-control"
//                                 onChange={handleFileChange}
//                                 multiple
//                                 accept=".pdf,.jpg,.jpeg,.webp,.png"
//                               />
//                               {fileError && (
//                                 <small className="text-danger">
//                                   {fileError}
//                                 </small>
//                               )}
//                               {files.length > 0 && (
//                                 <div>
//                                   <h6>Selected Files:</h6>
//                                   <ul>
//                                     {files.map((file, index) => (
//                                       <li key={index}>{file.name}</li>
//                                     ))}
//                                   </ul>
//                                 </div>
//                               )}
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center mt-4">
//                 <Button onClick={handleSubmit} disabled={loading}>
//                   {loading ? "Submitting..." : "Submit"}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </Wrapper>
//   );
// }

// export default Oral_Blood_Tests;

// const Wrapper = styled.div`
//   .resp {
//     @media (min-width: 768px) and (max-width: 1020px) {
//       width: 80%;
//     }
//   }
// `;






// old
{/* <Wrapper>
      <div className="">
        <div className="d-print-none">
          <Header />
        </div>
      </div>

      <div clasNameName="main">
        <div className="container-fluid">
          <div className="row flex-nowrap ">
            <div className="col-xxl-1 col-xl-1 col-lg-1 d-print-none col-sm-1 p-0">
              <Sider />
            </div>

            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 p-0" style={{ marginTop: "5rem" }}>
              <div className="mx-5 resp">
                <IoArrowBackSharp
                  className="fs-1 text-black d-print-none"
                  onClick={goBack}
                  style={{ cursor: "pointer" }}
                />
                <div className="row">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                    <div className="row d-flex justify-content-between">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-6 mt-4">
                        <div>
                          <h5>Branch : {branch}</h5>
                        </div>
                        <form className="d-flex fw-semibold">
                          <p>Address </p>
                          <p className="ms-1"> : </p>
                          <p className="ms-2">
                            {address}
                          </p>
                        </form>

                        <form className="d-flex">
                          <h5>Email id : </h5>
                          <h5 className="ms-2">DentalGuru@Gmail.com</h5>
                        </form>

                        <form className="d-flex ms-auto my-sm mt-1">
                          <h5>Contact Number : </h5>
                          <h5 className="ms-2">+91-7000000058 </h5>
                        </form>
                      </div>

                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 mt-4">
                        <div className="text-center mt-2 footer">
                          <img
                            className="ms-4"
                            src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
                            alt="Logo"
                            width="100"
                            height="85"
                          />
                          <h3 className="ms-2">Dental Guru</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr style={{ color: "Grey", height: "2px" }} />

                <div className="row d-flex justify-content-between ">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="col-lg-3 ">
                      <label className="form-check-label mb-2">
                        Lab Types
                        <input
                          className='form-control'
                          type="text"
                          value={labType}
                        />
                      </label>
                    </div>
                    <div className="table-responsive rounded">
                    <div className="table-responsive rounded">
                      <table className="table tables table-bordered rounded shadow">
                        <tbody>
                          <tr>
                            <td className="fw-semibold">Patient Name : {patientName}</td>
                            <td className="fw-semibold">Patient UHID : {patientUHID}</td>
                          </tr>
                          <tr>
                            <td className="fw-semibold">Patient Bill No : {patientbill_no}</td>
                            <td className="fw-semibold">Branch Name : {patientbranch_name}</td>
                          </tr>
                          <tr>
                            <td className="fw-semibold">Patient assigned Doctor Name : {patientAssigned_Doctor_Name}</td>
                            <td className="fw-semibold">Test Name : {patienttest}</td>
                          </tr>
                          <tr>
                            <td className="fw-semibold">Cost : {patientcost}</td>
                            <td>
                              <label htmlFor="result" className="fw-semibold">Result:</label>
                              <input
                                type="text"
                                id="result"
                                value={patientresult}
                                onChange={handleResultChange}
                                className="form-control"
                              />
                              {resultError && <p style={{ color: 'red' }}>{resultError}</p>}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label htmlFor="unit" className="fw-semibold">Unit:</label>
                              <input
                                type="text"
                                id="unit"
                                value={patientunit}
                                onChange={handleUnitChange}
                                className="form-control"
                              />
                              {unitError && <p style={{ color: 'red' }}>{unitError}</p>}
                            </td>
                            <td>
                              <label htmlFor="patientcollection_date" className="fw-semibold">Patient Collection Date:</label>
                              <input
                                type="date"
                                id="patientcollection_date"
                                value={patientcollection_date}
                                onChange={(e) => setPatientcollection_date(e.target.value)}
                                className="form-control"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label htmlFor="patientauthenticate_date" className="fw-semibold">Patient Authenticate Date:</label>
                              <input
                                type="date"
                                id="patientauthenticate_date"
                                value={patientauthenticate_date}
                                onChange={(e) => setPatientauthenticate_date(e.target.value)}
                                className="form-control"
                              />
                            </td>
                            <td>
                              <label htmlFor="file-upload" className="fw-semibold">Upload Files:</label>
                              <input
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                                multiple
                                accept=".pdf,.jpg,.jpeg,.webp,.png"
                              />
                              {fileError && <small className="text-danger">{fileError}</small>}
                              {files.length > 0 && (
                                <div>
                                  <h6>Selected Files:</h6>
                                  <ul>
                                    {files.map((file, index) => (
                                      <li key={index}>{file.name}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <Button onClick={hundleSumbit} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper> */}

    //new
        // <Wrapper>
    //   <Header />
    //   <Sider />
    //   <div className="main-content">
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-12">
    //           <h2>Update Oral/Blood Tests</h2>
    //           <IoArrowBackSharp className="fs-1 text-black d-print-none" onClick={goBack} style={{ cursor: "pointer" }} />
    //           <div className="row">
    //             <div className="col-12">
    //               <div className="d-flex justify-content-between">
    //                 <div className="col-6">
    //                   <h5>Branch : {branch}</h5>
    //                   <p>Address: {address}</p>
    //                   <p>Email id : DentalGuru@Gmail.com</p>
    //                   <p>Contact Number : +91-7000000058 </p>
    //                 </div>
    //                 <div className="col-6 text-end">
    //                   <img src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png" alt="Logo" width="100" height="85" />
    //                   <h3 className="ms-2">Dental Guru</h3>
    //                 </div>
    //               </div>
    //               <hr style={{ color: "Grey", height: "2px" }} />
    //               <div className="col-12">
    //                 <div className="table-responsive rounded">
    //                   <table className="table tables table-bordered rounded shadow">
    //                     <tbody>
    //                       <tr>
    //                         <td className="fw-semibold">Patient Name : {patientName}</td>
    //                         <td className="fw-semibold">Patient UHID : {patientUHID}</td>
    //                       </tr>
    //                       <tr>
    //                         <td className="fw-semibold">Patient Bill No : {patientbill_no}</td>
    //                         <td className="fw-semibold">Branch Name : {patientbranch_name}</td>
    //                       </tr>
    //                       <tr>
    //                         <td className="fw-semibold">Patient assigned Doctor Name : {patientAssigned_Doctor_Name}</td>
    //                         <td className="fw-semibold">Test Name : {patienttest}</td>
    //                       </tr>
    //                       <tr>
    //                         <td className="fw-semibold">Cost : {patientcost}</td>
    //                         <td>
    //                           <label htmlFor="result" className="fw-semibold">Result:</label>
    //                           <input
    //                             type="text"
    //                             id="result"
    //                             value={patientresult}
    //                             onChange={handleResultChange}
    //                             className="form-control"
    //                           />
    //                           {resultError && <p style={{ color: 'red' }}>{resultError}</p>}
    //                         </td>
    //                       </tr>
    //                       <tr>
    //                         <td>
    //                           <label htmlFor="unit" className="fw-semibold">Unit:</label>
    //                           <input
    //                             type="text"
    //                             id="unit"
    //                             value={patientunit}
    //                             onChange={handleUnitChange}
    //                             className="form-control"
    //                           />
    //                           {unitError && <p style={{ color: 'red' }}>{unitError}</p>}
    //                         </td>
    //                         <td>
    //                           <label htmlFor="patientcollection_date" className="fw-semibold">Patient Collection Date:</label>
    //                           <input
    //                             type="date"
    //                             id="patientcollection_date"
    //                             value={patientcollection_date}
    //                             onChange={(e) => setPatientcollection_date(e.target.value)}
    //                             className="form-control"
    //                           />
    //                         </td>
    //                       </tr>
    //                       <tr>
    //                         <td>
    //                           <label htmlFor="patientauthenticate_date" className="fw-semibold">Patient Authenticate Date:</label>
    //                           <input
    //                             type="date"
    //                             id="patientauthenticate_date"
    //                             value={patientauthenticate_date}
    //                             onChange={(e) => setPatientauthenticate_date(e.target.value)}
    //                             className="form-control"
    //                           />
    //                         </td>
    //                         <td>
    //                           <label htmlFor="file-upload" className="fw-semibold">Upload Files:</label>
    //                           <input
    //                             type="file"
    //                             className="form-control"
    //                             onChange={handleFileChange}
    //                             multiple
    //                             accept=".pdf,.jpg,.jpeg,.webp,.png"
    //                           />
    //                           {fileError && <small className="text-danger">{fileError}</small>}
    //                           {files.length > 0 && (
    //                             <div>
    //                               <h6>Selected Files:</h6>
    //                               <ul>
    //                                 {files.map((file, index) => (
    //                                   <li key={index}>{file.name}</li>
    //                                 ))}
    //                               </ul>
    //                             </div>
    //                           )}
    //                         </td>
    //                       </tr>
    //                     </tbody>
    //                   </table>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="text-center mt-4">
    //             <Button onClick={handleSubmit} disabled={loading}>
    //               {loading ? 'Submitting...' : 'Submit'}
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </Wrapper>