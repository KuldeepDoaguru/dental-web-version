/* eslint-disable jsx-a11y/img-redundant-alt */
// import React, { useRef, useState } from "react";
// import { Button } from "react-bootstrap";
// import { v4 as uuid } from "uuid";
// import styled from "styled-components";
// import Header from "../../components/MainComponents/Header";
// import Sider from "../../components/MainComponents/Sider";
// import { IoArrowBackSharp } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import Footer from "../../components/MainComponents/Footer";
// import signature from "../BloodTest/signature_maker_after_.webp";

// const Sencivity = () => {
//   const goBack = () => {
//     window.history.go(-1);
//   };

//   const testNames = [
//     { name: "Allergy Test", range: "40 - 59" },
//     { name: "Saliva Test", range: "80 - 96" },
//     { name: "Sencivity", range: "26 - 35" },
//   ];
//   const unitsName = ["%", "fL", "pg"];

//   const dummy = {
//     test: "",
//     value: "",
//     unit: "",
//     range: "",
//   };

//   const [tableEntry, setTableEntry] = useState([]);
//   const [inputData, setInputData] = useState(dummy);
//   const inputRef = useRef();

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setInputData({ ...inputData, [name]: value });
//   };

//   const handleTest = () => {
//     if (
//       inputData.test === "" ||
//       inputData.value === "" ||
//       inputData.unit === ""
//     ) {
//       return;
//     }

//     let selectRange = testNames.find((ele) => ele.name === inputData.test);
//     const newEntry = {
//       id: inputData.id ? inputData.id : uuid(),
//       test: inputData.test,
//       value: inputData.value,
//       unit: inputData.unit,
//       range: selectRange.range,
//     };
//     let newArray = tableEntry;
//     if (inputData?.position) {
//       newArray.splice(inputData.position, 0, newEntry);
//     } else {
//       newArray.push(newEntry);
//     }
//     newArray.range = selectRange.range;
//     setTableEntry(newArray);
//     setInputData(dummy);
//     inputRef.current.focus();
//   };
//   const editEntry = (item, index) => {
//     let newEntry = tableEntry.filter((ele) => ele.id !== item.id);
//     setTableEntry(newEntry);
//     item.position = index;
//     setInputData(item);
//   };
//   const deleteEntry = (item) => {
//     let newArray = tableEntry.filter((ele) => ele.id !== item.id);
//     setTableEntry(newArray);
//   };
//   return (
//     <>
//       <Wrapper>
//         <div className="d-print-none">
//           <Header />
//         </div>
//         <div className="main">
//           <div className="container-fluid">
//             <div className="row flex-nowrap ">
//               <div className="col-xxl-1 col-xl-1 col-lg-1 d-print-none col-sm-1 p-0">
//                 <Sider />
//               </div>
//               <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 p-0">
//                 <IoArrowBackSharp
//                   className="fs-1 text-black d-print-none"
//                   onClick={goBack}
//                 />
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-6 mt-4">
//                           <div>
//                             <h5>Branch : Madan Mahal</h5>
//                           </div>
//                           <form className="d-flex fw-semibold">
//                             <p>Addresh </p>
//                             <p className="ms-1"> : </p>
//                             <p className="ms-2">
//                               128,Near Gwarighat Jabalpur M.p
//                             </p>
//                           </form>

//                           <form className="d-flex">
//                             <h5>Email id : </h5>
//                             <h5 className="ms-2">DentalGuru@Gmail.com</h5>
//                           </form>

//                           <form className="d-flex ms-auto my-sm mt-1">
//                             <h5>Contact Number : </h5>
//                             <h5 className="ms-2">+91-7000000058 </h5>
//                           </form>
//                         </div>

//                         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 mt-4">
//                           <div className="text-center mt-2 footer print-visible">
//                             <img
//                               className="ms-4"
//                               src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
//                               alt="Logo"
//                               width="100"
//                               height="85"
//                             />
//                             <h3 className="ms-2">Dental Guru</h3>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <hr
//                     style={{
//                       color: "Grey",
//                       height: "2px",
//                     }}
//                   />

//                   <div className="row d-flex justify-content-between ">
//                     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
//                       <div class="table-responsive rounded">
//                         <table class="table tables table-bordered rounded shadow">
//                           <tbody>
//                             <tr className="table-row">
//                               <td
//                                 className="table-small"
//                                 style={{ width: "20%" }}
//                               >
//                                 Bill No. :
//                                 <input
//                                   type ="text"
//                                   className = "border border-0 ms-3 w-50"
//                                 />
//                               </td>
//                               <td
//                                 className="table-small"
//                                 style={{ width: "20%" }}
//                               >
//                                 UHID : {" "}
//                                 <input
//                                   type="text"
//                                   className="border border-0 ms-2"
//                                 />
//                               </td>
//                             </tr>
//                           </tbody>

//                           <tbody>
//                             <tr
//                               className="
//                             table-row"
//                             >
//                               <td
//                                 colSpan="2"
//                                 className="table-small"
//                                 style={{ width: "20%" }}
//                               >
//                                 Patient Name :
//                                 <input
//                                   type="text"
//                                   className="border border-0 ms-3 w-50"
//                                 />
//                               </td>
//                             </tr>
//                           </tbody>

//                           <tbody>
//                             <tr className="table-row">
//                               <td
//                                 className="table-small"
//                                 style={{ width: "20%" }}
//                               >
//                                 Age / Gender :
//                                 <input
//                                   type="Number"
//                                   className="border border-0 ms-3"
//                                   style={{ width: "40px" }}
//                                 />{" "}
//                                 /
//                                 <input
//                                   type="text"
//                                   className="border border-0 w-25 ms-3"
//                                 />
//                               </td>
//                               <td
//                                 className="table-small"
//                                 style={{ width: "10%" }}
//                               >
//                                 Bill Date :
//                                 <input
//                                   type="date"
//                                   className="border border-0 ms-2"
//                                 />
//                               </td>
//                             </tr>
//                           </tbody>
//                           <tbody>
//                             <tr className="table-row">
//                               <td
//                                 className="table-small"
//                                 style={{ width: "20%" }}
//                               >
//                                 Advised By :{" "}
//                                 <input
//                                   type="text"
//                                   className="border border-0 ms-2"
//                                 />
//                               </td>
//                               <td
//                                 className="table-small"
//                                 style={{ width: "10%" }}
//                               >
//                                 Collection Date :{" "}
//                                 <input
//                                   type="date"
//                                   className="border border-0 ms-2"
//                                 />
//                               </td>
//                             </tr>
//                           </tbody>

//                           <tbody>
//                             <tr className="table-row">
//                               <td
//                                 className="table-small"
//                                 style={{ width: "20%" }}
//                               >
//                                 Center Name :{" "}
//                                 <input
//                                   type="text"
//                                   className="border border-0 ms-2"
//                                 />
//                               </td>
//                               <td
//                                 className="table-small"
//                                 style={{ width: "10%" }}
//                               >
//                                 Authenticate Date:{" "}
//                                 <input
//                                   type="date"
//                                   className="border border-0 ms-2"
//                                 />
//                               </td>
//                             </tr>
//                           </tbody>

//                           <tbody>
//                             <tr className="table-row">
//                               <td
//                                 className="table-small"
//                                 style={{ width: "20%" }}
//                               >
//                                 Patient Type :{" "}
//                                 <input
//                                   type="text"
//                                   className="border border-0 ms-2"
//                                 />
//                               </td>
//                               <td
//                                 className="table-small"
//                                 style={{ width: "10%" }}
//                               >
//                                 Printed Date :
//                                 <input
//                                   type="date"
//                                   className="border border-0 ms-2"
//                                 />
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="container-fluid">
//                     <div className="row d-print-none">
//                       <div className="d-flex justify-content-between">
//                         <div className="col-lg-4 form-group">
//                           <label className="fw-bold fs-5">
//                             Test (Methodology)
//                           </label>
//                           <input
//                             list="TestName"
//                             ref={inputRef}
//                             className="form-control mt-2 p-3"
//                             name="test"
//                             type="text"
//                             onChange={(e) => handleInput(e)}
//                             value={`${inputData.test}`}
//                           />
//                           <datalist id="TestName">
//                             {testNames.map((ele) => (
//                               <option value={ele.name} />
//                             ))}
//                           </datalist>
//                         </div>

//                         <div className="col-lg-3 form-group">
//                           <label className="fw-bold fs-5">Result</label>
//                           <input
//                             className="form-control mt-2 p-3"
//                             name="value"
//                             type="text"
//                             onChange={(e) => handleInput(e)}
//                             value={inputData.value}
//                           />
//                         </div>
//                         <div className="col-lg-4 form-group">
//                           <label className="fw-bold fs-5">Unit</label>
//                           <input
//                             list="unitName"
//                             name="unit"
//                             className="form-control unit mt-2 p-3"
//                             type="text"
//                             onChange={(e) => handleInput(e)}
//                             value={inputData.unit}
//                           />
//                           <datalist id="unitName">
//                             {unitsName.map((ele) => (
//                               <option value={ele} />
//                             ))}
//                           </datalist>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="d-print-none">
//                       <Button
//                         className="mt-4 mb-5 px-4 py-2"
//                         style={{ backgroundColor: "#213555" }}
//                         onClick={handleTest}
//                       >
//                         Submit
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="container-fluid">
//                     <div className="row">
//                       <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
//                         <table className=" bg-white text-center table table-borderless">
//                           <thead className="border ">
//                             <th className="p-3">Test</th>
//                             <th className="p-3">Result</th>
//                             <th className="p-3">Unit</th>
//                             <th className="p-3">Range</th>
//                             <th className="p-3 d-print-none">Action</th>
//                           </thead>
//                           <tbody>
//                             {tableEntry.map((item, index) => (
//                               <tr key={item.id}>
//                                 <td>{item.test}</td>
//                                 <td>{item.value}</td>
//                                 <td>{item.unit}</td>
//                                 <td>{item.range}</td>
//                                 <td>
//                                   <Button
//                                     className="mx-2 d-print-none"
//                                     onClick={() => editEntry(item, index)}
//                                   >
//                                     edit
//                                   </Button>
//                                   <Button
//                                     className="d-print-none"
//                                     onClick={() => deleteEntry(item)}
//                                   >
//                                     delete
//                                   </Button>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>

//                           <tbody>
//                             <tr>
//                               <td className="colspan-3">Notes :</td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-center fs-5 text fw-semibold">
//                     {" "}
//                     - End of Report -{" "}
//                   </p>
//                 </div>

//                 <hr
//                   style={{
//                     color: "Grey",
//                     height: "2px",
//                   }}
//                 />

//                 <div className="container-fluid">
//                   <div className="row  mt-5">
//                     <div className="d-flex justify-content-between">
//                       <div className="col-lg-4 form-group">
//                         <div className="text-center">
//                           <img
//                             src={signature}
//                             style={{ width: "100px", height: "50px" }}
//                             alt="Today's Image"
//                           />
//                         </div>
//                         <h4 className=" text-center fs-5 fw-bold">
//                           DAULAT SINGH CHOUHAN{" "}
//                         </h4>
//                         <h6 className=" text-center">TECHNICIAN</h6>
//                       </div>

//                       <div className="col-lg-4 form-group">
//                         <div className="text-center">
//                           <img
//                             src={signature}
//                             style={{ width: "100px", height: "50px" }}
//                             alt="Today's Image"
//                           />
//                         </div>
//                         <h4 className=" text-center fs-5 fw-bold">
//                           Dr RAMANURAJ SINGH{" "}
//                         </h4>
//                         <h6 className=" text-center">Null</h6>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-around mb-5 mt-5 d-print-none ">
//                   <div className="table-small mt-4">
//                     <button
//                       className="btn px-4 py-1"
//                       style={{
//                         fontSize: "25px",
//                         color: "white",
//                         backgroundColor: "#213555",
//                       }}
//                       onClick={() => window.print()}
//                     >
//                       Print
//                     </button>
//                   </div>

//                   <div className="table-small mt-4">
//                     <button
//                       className="btn px-4 py-1"
//                       style={{
//                         fontSize: "25px",
//                         color: "white",
//                         backgroundColor: "#213555",
//                       }}
//                     >
//                       <Link
//                         to="/OralTest"
//                         style={{
//                           textDecoration: "none",
//                           color: "white",
//                         }}
//                       >
//                         Save
//                       </Link>
//                     </button>
//                   </div>

//                   <div className="table-small mt-4">
//                     <button
//                       className="btn px-4 py-1"
//                       style={{
//                         fontSize: "25px",
//                         color: "white",
//                         backgroundColor: "#213555",
//                       }}
//                     >
//                       <Link
//                         to="/PAyment"
//                         style={{
//                           textDecoration: "none",
//                           color: "white",
//                         }}
//                       >
//                         Continue
//                       </Link>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="print-fixed-footer">
//           <Footer />
//         </div>
//       </Wrapper>
//     </>
//   );
// };

// export default Sencivity;

// const Wrapper = styled.div`
//   @media print {
//     .print-fixed-footer {
//       position: fixed;
//       bottom: 0;
//       left: 0;
//       width: 100%;
//       text-align: center;
//       z-index: 9999; /* Adjust the z-index */
//     }
//   }

//   .footer {
//     display: none; /* Hide the footer by default */
//   }

//   @media print {
//     .print-visible {
//       display: block !important; /* Show the footer when printing */
//     }
//   }

//   @media print {
//     .tables {
//       box-shadow: none !important; /* Remove shadow for print */
//     }
//   }
// `;


import axios from 'axios'
import cogoToast from 'cogo-toast'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/MainComponents/Header'
import Sider from '../../components/MainComponents/Sider'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Button } from 'react-bootstrap';

function Sencivity() {
  const [patientbill_no , setPatientbill_no] = useState('')
  const [patientUHID , setPatientUHID] = useState('')
  const [patientName , setPatientName] = useState('')
  const [patientage , setPatientage] = useState('')
  const [patientgender , setPatientgender] = useState('')
  const [patientbranch_name , setPatientbranch_name] = useState('')
  const [patientAssigned_Doctor_Name , setPatientAssigned_Doctor_Name] = useState('')
  const [patienttest , setPatienttest] = useState('')
  const [patientresult , setPatientresult] = useState('')
  const [patientunit , setPatientunit] = useState('')
  const [patientcollection_date , setPatientcollection_date] = useState('')
  const [patientauthenticate_date , setPatientauthenticate_date] = useState('')
  const [labType , setLabType] = useState('External')

  const navigate = useNavigate();
  const {id} = useParams();
 
  const goBack = () => {
     navigate('/')
  };

  const hundleSumbit = async () => {
  
    // Check if all required fields are filled
    if (
      patientcollection_date === '' ||
      patientauthenticate_date === '' ||
      patientresult === '' ||
      patientunit === ''
    ) {
      alert('Please fill in all required fields.');
      return;
    }
  
    try {
      // Update the test status
      const responsee = await axios.put(`https://dentalgurulab.doaguru.com/api/lab/update-test-status/${id}`);
      if (responsee.status === 200) {
        console.log('Test status successfully updated');
      }
      console.log(patientbill_no);
  
      // Submit the patient test details
      const response = await axios.post(`https://dentalgurulab.doaguru.com/api/lab/paitent-test/${patientbill_no}`, {
        test: patienttest,
        result: patientresult,
        unit: patientunit,
        collection_date: patientcollection_date,
        authenticate_date: patientauthenticate_date,
        lab_type:labType
  
      });
  
      // Check if the submission was successful
      if (response.data.success === true) {
        // Display success message
        cogoToast.success(`${response.data.message}`);
        navigate(`/final-oral-testing/${patientbill_no}`);
  
        // Fetch the patient test data after submission
      } else {
        console.error('Error uploading patient test data');
      }
    } catch (error) {
      console.error('Server Error:', error.message);
    }
  };


  return (
      <div className="">
     <div className="d-print-none">
          <Header />
        </div>
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 d-print-none col-sm-1 p-0">
                <Sider />
              </div>
            
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 p-0">
              <IoArrowBackSharp
                  className="fs-1 text-black d-print-none"
                  onClick={goBack}
                />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-6 mt-4">
                          <div>
                            <h5>Branch : Madan Mahal</h5>
                          </div>
                          <form className="d-flex fw-semibold">
                            <p>Addresh </p>
                            <p className="ms-1"> : </p>
                            <p className="ms-2">
                              128,Near Gwarighat Jabalpur M.p
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
                          <div className="text-center mt-2 footer ">
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
                  <hr
                    style={{
                      color: "Grey",
                      height: "2px",
                    }}
                  />

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
                      <div class="table-responsive rounded">
                        <table class="table tables table-bordered rounded shadow">
                     
                          <tbody>
                            <tr className="table-row">
                      
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Bill No. :
                                <input
                                  type ="text"
                                  className = "border border-0 ms-3 w-50"
                                 value={patientbill_no}
                                 onChange={(e)=>setPatientbill_no(e.target.value)}
                               
                                />
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                UHID :{" "}
                                <input
                                  type="text"
                                  className="border border-0 ms-2"
                                  value={patientUHID}
                                  onChange={(e)=>setPatientUHID(e.target.value)}
                                />
                              </td>
                            </tr>
                          </tbody>

                          {/* <tbody>
                            <tr
                              className="
                            table-row"
                            >
                              <td
                                colSpan="2"
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Patient Name :
                                <input
                                  type="text"
                                  className="border border-0 ms-3 w-50"
                                  value={patientName}
                                  onChange={(e)=>setPatientName(e.target.value)}
                                />
                              </td>
                            </tr>
                          </tbody> */}

                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Age / Gender :
                                <input
                                  type="Number"
                                  className="border border-0 ms-3"
                                  style={{ width: "40px" }}
                                  value={patientage}
                                  onChange={(e)=>setPatientage(e.target.value)}
                    
                                />{" "}
                                /
                                <input
                                  type="text"
                                  className="border border-0 w-25 ms-3"
                                  value={patientgender}
                                  onChange={(e)=>setPatientgender(e.target.value)}
                                />
                              </td>

                              <td
                                colSpan="2"
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Patient Name :
                                <input
                                  type="text"
                                  className="border border-0 ms-3 w-50"
                                  value={patientName}
                                  onChange={(e)=>setPatientName(e.target.value)}
                                />
                              </td>

                              
                              {/* <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Bill Date :
                                <input
                                  type="date"
                                  className="border border-0 ms-2"

                                />
                              </td> */}
                            </tr>
                          </tbody>
                          <tbody>
                            <tr className="table-row">
                             
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Collection Date :{" "}
                                <input
                                  type="date"
                                  className="border border-0 ms-2"
                                  value={patientcollection_date}
                                  onChange={(e)=>setPatientcollection_date(e.target.value)}
                                  required
                                />
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Authenticate Date:{" "}
                                <input
                                  type="date"
                                  className="border border-0 ms-2"
                                  value={patientauthenticate_date}
                                  onChange={(e)=>setPatientauthenticate_date(e.target.value)}
                                  required
                                />
                              </td>
                            </tr>
                            
                          </tbody>

                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Center Name :{" "}
                                <input
                                  type="text"
                                  className="border border-0 ms-2"
                                  value={patientbranch_name}
                                  onChange={(e)=>setPatientbranch_name(e.target.value)}
                                />
                              </td>
                             
                            </tr>
                          </tbody>

                        
                         
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="container-fluid">
                    <div className="row d-print-none">
                      <div className="d-flex justify-content-between">
                        <div className="col-lg-4 form-group">
                          <label className="fw-bold fs-5">
                            Test (Methodology)
                          </label>
                          <input
                            list="TestName"
                         
                            className="form-control mt-2 p-3"
                            name="test"
                            type="text"

                          value={patienttest}
                          onChange={(e)=>setPatienttest(e.target.value)}
                          />
                        
                        </div>

                        <div className="col-lg-3 form-group">
                          <label className="fw-bold fs-5">Result</label>
                          <input
                            className="form-control mt-2 p-3"
                            name="value"
                            type="text"
                           value={patientresult}
                           onChange={(e)=>setPatientresult(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-4 form-group">
                          <label className="fw-bold fs-5">Unit</label>
                          <input
                            list="unitName"
                            name="unit"
                            className="form-control unit mt-2 p-3"
                            type="text"
                            value={patientunit}
                            onChange={(e)=>setPatientunit(e.target.value)}
                          />
                         
                        </div>
                      </div>
                    </div>
                    <div className="d-print-none">
                      <Button
                        className="mt-4 mb-5 px-4 py-2"
                        style={{ backgroundColor: "#213555" }}
                      onClick={hundleSumbit}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>

                
                </div>

              </div>
            </div>

          </div>
  )
}

export default Sencivity