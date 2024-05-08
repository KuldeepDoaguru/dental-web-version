// import React from "react";
// import styled from "styled-components";

// const TableData = () => {
//   let sty = {
//     position: "sticky",
//     top: " 8px",
//     backgroundColor: "black",
//     color: "white",
//   };

//   return (
//     <>
//       <RecentPatients>
//         <h4>Recent Patients</h4>
//         <Btn>See all</Btn>
//       </RecentPatients>
//       <table class="table">
//         <thead>
//           <tr style={sty}>
//             <th scope="col">Sn.</th>
//             <th scope="col">Name</th>
//             <th scope="col">Referred by</th>
//             <th scope="col">UHID</th>
//             <th scope="col">Actions</th>
//           </tr>
//         </thead>

//         <tbody class="table-group-divider">
//           <tr>
//             <th scope="row">1</th>
//             <td>Marko</td>
//             <td>Dr. Shrikant Dubey</td>
//             <td>80UF78</td>

//             <td>
//               <button
//                 type="button"
//                 className="btn px-3 py-0"
//                 data-bs-toggle="modal"
//                 data-bs-target="#exampleModal"
//                 style={{
//                   fontSize: "25px",
//                   color: "white",
//                   backgroundColor: "#213555",
//                 }}
//               >
//                 View
//               </button>

//               <div
//                 className="modal fade"
//                 id="exampleModal"
//                 tabindex="-1"
//                 aria-labelledby="exampleModalLabel"
//                 aria-hidden="true"
//               >
//                 <div className="modal-dialog">
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h4 className="modal-title" id="exampleModalLabel">
//                         Patient Test Information
//                       </h4>

//                       <button
//                         type="button"
//                         className="btn-close"
//                         data-bs-dismiss="modal"
//                         aria-label="Close"
//                       ></button>
//                     </div>

//                     <div className="modal-body">
//                       <table className="table table-bordered shadow text-center mt-4">
//                         <tbody>
//                           <tr>
//                             <td>1</td>
//                             <td>Sencivity </td>

//                             <td>
//                               <button
//                                 className="mx-2 py-2 px-4 rounded"
//                                 style={{
//                                   backgroundColor: "#213555",
//                                   color: "white",
//                                   textDecoration: "none", // Moved from Link to here
//                                 }}
//                                 onClick={() => {
//                                   window.location.href = `/Sencivity`;
//                                 }}
//                               >
//                                 {" "}
//                                 Start
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>

//                         <tbody>
//                           <tr>
//                             <td>2</td>
//                             <td>Bitewing X-rays </td>

//                             <td>
//                               <button
//                                 className="mx-2  py-2 px-4 rounded"
//                                 style={{
//                                   backgroundColor: "#213555",
//                                   color: "white",
//                                 }}
//                                 onClick={() => {
//                                   window.location.href = "/OPGXRay";
//                                 }}
//                               >
//                                 {" "}
//                                 Start
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>

//                         <tbody>
//                           <tr>
//                             <td>3</td>
//                             <td> M C H C </td>

//                             <td>
//                               <button
//                                 className="mx-2  py-2 px-4 rounded"
//                                 style={{
//                                   backgroundColor: "#213555",
//                                   color: "white",
//                                 }}
//                                 onClick={() => {
//                                   window.location.href = "/OPGXRay";
//                                 }}
//                               >
//                                 {" "}
//                                 Start{" "}
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </td>
//           </tr>

//           <tr>
//             <th scope="row">2</th>
//             <td>Ramesh Sahu</td>
//             <td>Dr. Aman Soni</td>
//             <td>45FF47</td>

//             <td>
//               <button
//                 type="button"
//                 className="btn px-3 py-0"
//                 data-bs-toggle="modal"
//                 data-bs-target="#exampleModal"
//                 style={{
//                   fontSize: "25px",
//                   color: "white",
//                   backgroundColor: "#213555",
//                 }}
//               >
//                 View
//               </button>

//               <div
//                 className="modal fade"
//                 id="exampleModal"
//                 tabindex="-1"
//                 aria-labelledby="exampleModalLabel"
//                 aria-hidden="true"
//               >
//                 <div className="modal-dialog">
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h4 className="modal-title" id="exampleModalLabel">
//                         Patient Test Information
//                       </h4>

//                       <button
//                         type="button"
//                         className="btn-close"
//                         data-bs-dismiss="modal"
//                         aria-label="Close"
//                       ></button>
//                     </div>

//                     <div className="modal-body">
//                       <table className="table table-bordered shadow text-center mt-4">
//                         <tbody>
//                           <tr>
//                             <td>1</td>
//                             <td>Sencivity</td>

//                             <td>
//                               <button
//                                 className="mx-2 py-2 px-4 rounded"
//                                 style={{
//                                   backgroundColor: "#213555",
//                                   color: "white",
//                                   textDecoration: "none", // Moved from Link to here
//                                 }}
//                                 onClick={() => {
//                                   window.location.href = "/Sencivity";
//                                 }}
//                               >
//                                 {" "}
//                                 Start
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </td>
//           </tr>

//           <tr>
//             <th scope="row">3</th>
//             <td>Rajni Goutam</td>
//             <td>Dr. Anita Dhariya</td>

//             <td>78RR88</td>

//             <td>
//               <button
//                 type="button"
//                 className="btn px-3 py-0"
//                 data-bs-toggle="modal"
//                 data-bs-target="#exampleModal"
//                 style={{
//                   fontSize: "25px",
//                   color: "white",
//                   backgroundColor: "#213555",
//                 }}
//               >
//                 View
//               </button>

//               <div
//                 className="modal fade"
//                 id="exampleModal"
//                 tabindex="-1"
//                 aria-labelledby="exampleModalLabel"
//                 aria-hidden="true"
//               >
//                 <div className="modal-dialog">
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h4 className="modal-title" id="exampleModalLabel">
//                         Patient Test Information
//                       </h4>

//                       <button
//                         type="button"
//                         className="btn-close"
//                         data-bs-dismiss="modal"
//                         aria-label="Close"
//                       ></button>
//                     </div>

//                     <div className="modal-body">
//                       <table className="table table-bordered shadow text-center mt-4">
//                         <tbody>
//                           <tr>
//                             <td>1</td>
//                             <td>Bitewing X-rays</td>

//                             <td>
//                               <button
//                                 className="mx-2  py-2 px-4 rounded"
//                                 style={{
//                                   backgroundColor: "#213555",
//                                   color: "white",
//                                 }}
//                                 onClick={() => {
//                                   window.location.href = "/OPGXRay";
//                                 }}
//                               >
//                                 {" "}
//                                 Start
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>

//                         <tbody>
//                           <tr>
//                             <td>3</td>
//                             <td> M C H C</td>

//                             <td>
//                               <button
//                                 className="mx-2  py-2 px-4 rounded"
//                                 style={{
//                                   backgroundColor: "#213555",
//                                   color: "white",
//                                 }}
//                                 onClick={() => {
//                                   window.location.href = "/OPGXRay";
//                                 }}
//                               >
//                                 {" "}
//                                 Start{" "}
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </td>
//           </tr>

//           <tr>
//             <th scope="row">4</th>
//             <td>Pavi Yadav</td>
//             <td>-</td>
//             <td>44DF56</td>

//             <td>
//               <button
//                 type="button"
//                 className="btn px-3 py-0"
//                 data-bs-toggle="modal"
//                 data-bs-target="#exampleModal"
//                 style={{
//                   fontSize: "25px",
//                   color: "white",
//                   backgroundColor: "#213555",
//                 }}
//               >
//                 View
//               </button>

//               <div
//                 className="modal fade"
//                 id="exampleModal"
//                 tabindex="-1"
//                 aria-labelledby="exampleModalLabel"
//                 aria-hidden="true"
//               >
//                 <div className="modal-dialog">
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h4 className="modal-title" id="exampleModalLabel">
//                         Patient Test Information
//                       </h4>

//                       <button
//                         type="button"
//                         className="btn-close"
//                         data-bs-dismiss="modal"
//                         aria-label="Close"
//                       ></button>
//                     </div>

//                     <div className="modal-body">
//                       <table className="table table-bordered shadow text-center mt-4">
//                         <tbody>
//                           <tr>
//                             <td>1</td>
//                             <td>Sencivity</td>

//                             <td>
//                               <button
//                                 className="mx-2 py-2 px-4 rounded"
//                                 style={{
//                                   backgroundColor: "#213555",
//                                   color: "white",
//                                   textDecoration: "none", // Moved from Link to here
//                                 }}
//                                 onClick={() => {
//                                   window.location.href = "/Sencivity";
//                                 }}
//                               >
//                                 {" "}
//                                 Start
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>

//                         <tbody>
//                           <tr>
//                             <td>2</td>
//                             <td>Bitewing X-rays</td>

//                             <td>
//                               <button
//                                 className="mx-2  py-2 px-4 rounded"
//                                 style={{
//                                   backgroundColor: "#213555",
//                                   color: "white",
//                                 }}
//                                 onClick={() => {
//                                   window.location.href = "/OPGXRay";
//                                 }}
//                               >
//                                 {" "}
//                                 Start
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>

//                         <tbody>
//                           <tr>
//                             <td>3</td>
//                             <td> M C H C</td>

//                             <td>
//                               <button
//                                 className="mx-2  py-2 px-4 rounded"
//                                 style={{
//                                   backgroundColor: "#213555",
//                                   color: "white",
//                                 }}
//                                 onClick={() => {
//                                   window.location.href = "/OPGXRay";
//                                 }}
//                               >
//                                 {" "}
//                                 Start{" "}
//                               </button>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default TableData;

// const Btn = styled.button`
//   outline: none;
//   border: none;
//   color: #3dcbb1;
//   background-color: white;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: red;
//   }
// `;

// const RecentPatients = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;
// `;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import { useNavigate } from 'react-router-dom';
// import { Button, Modal } from 'react-bootstrap';

// function TableData() {
//   const [patientDetails, setPatientDetails] = useState([]);
//   const [selectedTest, setSelectedTest] = useState(null);
// const navigate  = useNavigate();
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://dentalgurulab.doaguru.com/api/lab/get-patient-details`
//         );
//         setPatientDetails(response.data);
//         console.log(response);
//         console.log(patientDetails);
//       } catch (error) {
//         console.error("Error fetching quotations:", error);
//       }
//     };

//     fetchPatientDetails();
//   }, []);

//   const getTestArray = (testString) => {
//     return testString.split(",").map((item) => item.trim());
//   };

//   const handleStart =  (id) => {
//    navigate(`/oral-testing/${id}`)
   
//   }

//   const handleCloseModal = () => {
//     setSelectedTest(null);
//   };
//   return (
//     <>
//       <div className="container-fluid mt-4">
//         <h2>List of Patient</h2>
//         <div className="" style={{ maxHeight: "700px", overflowY: "auto" }}>
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Patient UHID </th>
//                 <th>Patient Name </th>
//                 <th> Age </th>
//                 <th> Gender </th>
//                 <th>Branch Name </th>
//                 <th>Assigned Doctor Name</th>
//                 <th>Created Date</th>
//                 <th>Patient Tests </th>
//                 <th>Tests Status </th>
             
//               </tr>
//             </thead>
//             <tbody>
//               {patientDetails.map((patient, index) => (
//                 <tr key={patient.id}>
//                   <td>{index + 1}</td>
//                   <td>{patient.patient_uhid}</td>
//                   <td>{patient.patient_name}</td>
//                   <td>{patient.age}</td>
//                   <td>{patient.gender}</td>
//                   <td>{patient.assigned_doctor_name}</td>
//                   <td>{patient.branch_name}</td>
//                   <td>{moment(patient.created_date).format("DD/MM/YYYY")}</td>
            
//                   <td>
//                     <button
//                       className="btn btn-danger"
//                       style={{
//                         '--bs-btn-padding-y': '.25rem',
//                         '--bs-btn-padding-x': '.5rem',
//                         '--bs-btn-font-size': '.75rem',
//                         fontSize: '.75rem', // Additional style
//                         marginRight: '5px', // Additional style
//                       }}
//                     >
//                       {patient.test_status}
//                     </button>
//                   </td>
// <td>
// {patientDetails.map((patient, index) => (
//         <div key={index}>
//           {getTestArray(patient.test).map((test, i) => (
//             <Button
//               key={i}
//               className="mx-2"
//               variant="primary"
//               onClick={() => setSelectedTest({ test, patientId: patient.id })}
//             >
//               {test}
//             </Button>
//           ))}
//         </div>
//       ))}
// </td>
            
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
       


//       {/* Render modal based on selectedTest */}
//       {selectedTest && (
//         <Modal show={true} onHide={handleCloseModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Test Details</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>{selectedTest.test}</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Close
//             </Button>
//             <Button
//               variant="success"
//               onClick={() => handleStart(selectedTest.patientId)}
//             >
//               Start
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//       </div>
//     </>
//   );
// }

// export default TableData;



import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import styled from "styled-components";

// function TableData() {
//   const [patientDetails, setPatientDetails] = useState([]);
//   const [selectedTest, setSelectedTest] = useState(null);
//   const navigate = useNavigate();

//   const handleTopPageLink = () => {
//     window.scrollTo(0, 0);
//   };

//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://dentalgurulab.doaguru.com/api/lab/get-patient-details`
//         );
//         setPatientDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching patient details:", error);
//       }
//     };

//     fetchPatientDetails();
//   }, []);

//   const getTestArray = (testString) => {
//     return testString.split(",").map((item) => item.trim());
//   };

//   const handleStart = (id , test) => {
//     navigate(`/oral-testing/${id}`, { state: { test } });
//     handleTopPageLink();
//   };

//   const handleCloseModal = () => {
//     setSelectedTest(null);
//   };

 

//   return (
//     <>
//       <div className="container-fluid mt-4">
//         <h2>List of Patients</h2>
//         <div className="" style={{ maxHeight: "700px", overflowY: "auto" }}>
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Patient UHID </th>
//                 <th>Patient Name </th>
//                 <th> Age </th>
//                 <th> Gender </th>
//                 <th>Branch Name </th>
//                 <th>Assigned Doctor Name</th>
//                 <th>Created Date</th>
//                 <th>Patient Tests </th>
//                 <th>Tests Status </th>
//               </tr>
//             </thead>
//             <tbody>
//               {patientDetails.map((patient, index) => (
//                 <tr key={patient.testid}>
//                   <td>{index + 1}</td>
//                   <td>{patient.patient_uhid}</td>
//                   <td>{patient.patient_name}</td>
//                   <td>{patient.age}</td>
//                   <td>{patient.gender}</td>
//                   <td>{patient.assigned_doctor_name}</td>
//                   <td>{patient.branch_name}</td>
//                   <td>{moment(patient.created_date).format("DD/MM/YYYY")}</td>
//                   <td>
//                     {getTestArray(patient.test).map((test, i) => (
//                       <Button
//                         key={i}
//                         className="mx-2"
//                         variant="primary"
//                         onClick={() =>
//                           setSelectedTest({ test, patientId: patient.testid })
//                         }
//                       >
//                         {test}
//                       </Button>
//                     ))}
//                   </td>
//                   <td>
//                     <Button
//                       className="btn-danger"
//                       variant="danger"
//                       style={{
//                         '--bs-btn-padding-y': '.25rem',
//                         '--bs-btn-padding-x': '.5rem',
//                         '--bs-btn-font-size': '.75rem',
//                         fontSize: '.75rem',
//                         marginRight: '5px',
//                       }}
//                     >
//                       {patient.test_status}
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Render modal based on selectedTest */}
//       {selectedTest && (
//         <Modal show={true} onHide={handleCloseModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Test Details</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>{selectedTest.test}</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Close
//             </Button>
//             <Button
//               variant="success"
//               onClick={() => handleStart(selectedTest.patientId,selectedTest.test)}
//             >
//               Start
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </>
//   );
// }


function TableData() {
  const [patientDetails, setPatientDetails] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const navigate = useNavigate();
  const handleTopPageLink = () => {
        window.scrollTo(0, 0);
      };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/get-patient-details`
        );
        setPatientDetails(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);

  const getTestArray = (testString) => {
    return testString.split(",").map((item) => item.trim());
  };

  const handleStart = async(id , test) => {

    try{
     
      navigate(`/Payment-test/${id}`, { state: { test } });
      handleTopPageLink()
      
    }catch(error){
console.log("Error " , error);
    }
    
  };

  const handleCloseModal = () => {
    setSelectedTest(null);
  };

  const filteredPatients = patientDetails.filter(patient => {
    const fullName = `${patient.patient_name} ${patient.assigned_doctor_name}`.toLowerCase();
    const formattedDate = moment(patient.created_date).format("YYYY-MM-DD");
    return fullName.includes(searchQuery.toLowerCase()) && (!dateFilter || formattedDate === dateFilter);
  });

  return (
    <Wrapper>
      <div className="container-fluid ">
        <h2 style={{color:"#213555"}}>List of Patients</h2>
        <div className="mb-3">
        <div className="row">
          <div className="col-lg-2">
          <input
            type="text"
            placeholder="Search by name or doctor"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control  mb-lg-0 mb-md-2"
          />
          </div>
          <div className="col-lg-2">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="form-control"
          />
          </div>
        </div>
         
        
        </div>
        <div className="" style={{ maxHeight: "700px", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient UHID </th>
                <th>Patient Name </th>
                <th> Age </th>
                <th> Gender </th>
                <th>Branch Name </th>
                <th>Assigned Doctor Name</th>
                <th>Lab Name</th>
                <th>Created Date</th>
                <th>Patient Tests </th>

                <th>Tests Status </th>
              </tr>
            </thead>
            {/* <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={patient.testid}>
                  <td>{index + 1}</td>
                  <td>{patient.patient_uhid}</td>
                  <td>{patient.patient_name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.assigned_doctor_name}</td>
                  <td>{patient.branch_name}</td>
                  <td>{moment(patient.created_date).format("DD/MM/YYYY")}</td>
                  <td>
                    {getTestArray(patient.test).map((test, i) => (
                      <Button
                        key={i}
                        className="mx-2"
                        variant="primary"
                        onClick={() =>
                          setSelectedTest({ test, patientId: patient.testid })
                        }
                      >
                        {test}
                      </Button>
                    ))}
                  </td>
                  <td>
                    <Button
                      className="btn-danger"
                      variant="danger"
                      style={{
                        '--bs-btn-padding-y': '.25rem',
                        '--bs-btn-padding-x': '.5rem',
                        '--bs-btn-font-size': '.75rem',
                        fontSize: '.75rem',
                        marginRight: '5px',
                      }}
                    >
                      {patient.test_status}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody> */}

<tbody>
  {filteredPatients.map((patient, index) => (
    <>
      {patient.test_status === "pending" && (
      <tr key={patient.testid}>
        <td>{index + 1}</td>
        <td>{patient.patient_uhid}</td>
        <td>{patient.patient_name}</td>
        <td>{patient.age}</td>
        <td>{patient.gender}</td>
        <td>{patient.branch_name}</td>

        <td>{patient.assigned_doctor_name}</td>
        <td>{patient.lab_name}</td>
        <td>{moment(patient.created_date).format("DD/MM/YYYY")}</td>
      
          <td>
            {getTestArray(patient.test).map((test, i) => (
              <Button
                key={i}
                className="mx-2"
                variant="primary"
                onClick={() =>
                  setSelectedTest({ test, patientId: patient.testid })
                }
              >
                {test}
              </Button>
            ))}
          </td>
    
        <td>
          <Button
            className="btn-danger"
            variant="danger"
            style={{
              '--bs-btn-padding-y': '.25rem',
              '--bs-btn-padding-x': '.5rem',
              '--bs-btn-font-size': '.75rem',
              fontSize: '.75rem',
              marginRight: '5px',
            }}
          >
            {patient.test_status}
          </Button>
        </td>
      </tr>
    )}
    </>
    // Wrap the entire row inside a conditional statement based on test status
  
  ))}
</tbody>


          </table>
        </div>
      </div>

      {/* Render modal based on selectedTest */}
      {selectedTest && (
        <Modal show={true} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Test Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedTest.test}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => handleStart(selectedTest.patientId,selectedTest.test)}
            >
              Start
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Wrapper>
  );
}




export default TableData;
const Wrapper  = styled.div`
th{
  background-color: #213555;
    color: white;
}

`

