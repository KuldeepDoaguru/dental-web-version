
// function TableData() {
//   const [patientDetails, setPatientDetails] = useState([]);
//   const [selectedTest, setSelectedTest] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dateFilter, setDateFilter] = useState("");

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
//         setPatientDetails(response.data.result);
//         console.log(response.data.result);
//       } catch (error) {
//         console.error("Error fetching patient details:", error);
//       }
//     };

//     fetchPatientDetails();
//   }, []);

//   console.log(patientDetails);

//   const getTestArray = (testString) => {
//     return testString.split(",").map((item) => item.trim());
//   };

//   const filteredPatients = patientDetails?.filter((patient) => {
//     const fullName =
//       `${patient.patient_name} ${patient.assigned_doctor_name}`.toLowerCase();
//     const formattedDate = moment(patient.created_date).format("YYYY-MM-DD");
//     return (
//       fullName.includes(searchQuery.toLowerCase()) &&
//       (!dateFilter || formattedDate === dateFilter)
//     );
//   });

//   const handleStart = async (id, test) => {
//     try {
//       navigate(`/Payment-test/${id}`, { state: { test } });
//       handleTopPageLink();
//     } catch (error) {
//       console.log("Error ", error);
//     }
//   };

//   const handleCloseModal = () => {
//     setSelectedTest(null);
//   };

//   return (
//     <Wrapper>
//       <div className="container-fluid ">
//         <h2 style={{ color: "#213555" }}>List of Patients</h2>
//         <div className="mb-3">
//           <div className="row">
//             <div className="col-lg-2">
//               <input
//                 type="text"
//                 placeholder="Search by Patient UHID"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="form-control  mb-lg-0 mb-md-2"
//               />
//             </div>
//             <div className="col-lg-2">
//               <input
//                 type="date"
//                 value={dateFilter}
//                 onChange={(e) => setDateFilter(e.target.value)}
//                 className="form-control"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="">
//           <table className="table table-bordered">
//             {/* Table headings */}
//             <thead>
//               <tr>
//               <th>S.no </th>
//               <th>Patient UHID </th>
//                  <th>Patient Name </th>
//                  <th> Moblie Number </th>
//                  <th> Email Id </th>
//                  <th> Age </th>
//                  <th> Gender </th>
//                  <th> Weight </th>
//                  <th>Branch Name </th>
//                  <th>Assigned Doctor Name</th>
//                  <th>Lab Name</th>
//                  <th>Created Date</th>
//                  <th>Patient Tests </th>
//                  <th>Patient Status </th>
//               </tr>
//             </thead>

//               <tbody>
//                 {filteredPatients.map((patient, index) => (
//                   <>
//                    {patient.test_status === "pending" && (
//                   <tr key={patient.testid}>
//                        <td>{index + 1}</td>
//                        <td>{patient.patient_uhid}</td>
//                        <td>{patient.patient_name}</td>
//                        <td>{patient.mobileno}</td>
//                        <td>{patient.emailid}</td>
//                        <td>{patient.age}</td>
//                        <td>{patient.gender}</td>
//                        <td>{patient.weight}</td>
//                        <td>{patient.branch_name}</td>

//                        <td>{patient.assigned_doctor_name}</td>
//                        <td>{patient.lab_name}</td>
//                     <td>{moment(patient.created_date).format("DD/MM/YYYY")}</td>
//                     <td>
//                       {getTestArray(patient.test).map((test, i) => (
//                         <Button
//                           key={i}
//                           className="mx-2"
//                           variant="primary"
//                           onClick={() =>
//                             setSelectedTest({
//                               test,
//                               patientId: patient.testid,
//                             })
//                           }
//                         >
//                           {test}
//                         </Button>
//                       ))}
//                     </td>
//                     <td>
//                       <Button
//                         className="btn-danger"
//                         variant="danger"
//                         style={{
//                           "--bs-btn-padding-y": ".25rem",
//                           "--bs-btn-padding-x": ".5rem",
//                           "--bs-btn-font-size": ".75rem",
//                           fontSize: ".75rem",
//                           marginRight: "5px",
//                         }}
//                       >
//                         {patient.test_status}
//                       </Button>
//                     </td>
//                   </tr>
//                       )}
//                   </>

//                 ))}

//             </tbody>
//           </table>
//         </div>
//         {/* Pagination */}
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
//               onClick={() =>
//                 handleStart(selectedTest.patientId, selectedTest.test)
//               }
//             >
//               Start
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </Wrapper>
//   );
// }

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// import { Button, Modal } from "react-bootstrap";
// import styled from "styled-components";
// import { useSelector } from "react-redux";

// function TableData() {
//   const [patientDetails, setPatientDetails] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedTest, setSelectedTest] = useState(null);
//   const [dateFilter, setDateFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const navigate = useNavigate();
//   const handleTopPageLink = () => {
//     window.scrollTo(0, 0);
//   };

//   const currentUser = useSelector(state => state.auth.user);
  
//   const token = currentUser?.token;
//   console.log(token);
//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://dentalgurulab.doaguru.com/api/lab/get-patient-details` ,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//           }
//           });
        
//         setPatientDetails(response.data.result);
//       } catch (error) {
//         console.error("Error fetching patient details:", error);
//       }
//     };

//     fetchPatientDetails();

//     // Set up interval to fetch data every X seconds
//     const interval = setInterval(() => {
//       fetchPatientDetails();
//     }, 3000); // Fetch data every 5 seconds (adjust as needed)

//     // Clear interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   const getTestArray = (testString) => {
//     return testString.split(",").map((item) => item.trim());
//   };

//   const handleStart = async (id, test) => {
//     try {
//       navigate(`/Payment-test/${id}`, { state: { test } });
//       handleTopPageLink();
//     } catch (error) {
//       console.log("Error ", error);
//     }
//   };

//   const handleCloseModal = () => {
//     setSelectedTest(null);
//   };

//   const filteredPatients = patientDetails?.filter((patient) => {
//     const fullName = `${patient.patient_name}`.toLowerCase();
//     const formattedDate = moment(patient.created_date).format("YYYY-MM-DD");
//     return (
//       fullName.includes(searchQuery.toLowerCase()) &&
//       (!dateFilter || formattedDate === dateFilter)
//     );
//   });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredPatients?.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <Wrapper>
//       <div className="container-fluid">
//         <h2 style={{ color: "#213555" }}>List of Tests </h2>
//         <div className="mb-3">
//           <div className="row">
//             <div className="col-lg-2">
//               <input
//                 type="text"
//                placeholder="Search by Patient Name"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="form-control  mb-lg-0 mb-md-2"
//               />
//             </div>
//             <div className="col-lg-2">
//               <input
//                 type="date"
//                 value={dateFilter}
//                 onChange={(e) => setDateFilter(e.target.value)}
//                 className="form-control"
//               />
//             </div>
//           </div>
//         </div>
//         <div className=""style={{overflowX:"scroll" }}>
//           <table className="table table-bordered" >
//             <thead>
//               <tr>
//                 <th>S.no</th>
//                 <th>Patient UHID</th>
//                 <th>Patient Name</th>
//                 <th>Mobile Number</th>
//                 <th>Email Id</th>
//                 <th>Age</th>
//                 <th>Gender</th>
//                 <th>Weight</th>
//                 <th>Branch Name</th>
//                 <th>Assigned Doctor Name</th>
//                 <th>Lab Name</th>
//                 <th>Created Date</th>
//                 <th>Test Name</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((patient, index) => (
//                 <>
//                   {patient.test_status === "pending" && (
//                     <tr key={index}>
//                       <td>{indexOfFirstItem + index + 1}</td>
//                       <td>{patient.patient_uhid}</td>
//                       <td>{patient.patient_name}</td>
//                       <td>{patient.mobileno}</td>
//                       <td>{patient.emailid}</td>
//                       <td>{patient.age}</td>
//                       <td>{patient.gender}</td>
//                       <td>{patient.weight}</td>
//                       <td>{patient.branch_name}</td>
//                       <td>{patient.assigned_doctor_name}</td>
//                       <td>{patient.lab_name}</td>
//                       <td>
//                         {moment(patient.created_date).format("DD/MM/YYYY")}
//                       </td>
//                       <td>{patient.test}</td>
//                       <td className=" text-danger fw-bold"> 
                     
//                           {patient.test_status}
                   
//                       </td>
//                       <td>
//                         {getTestArray(patient.test).map((test, i) => (
//                           <button
//                             key={i}
//                             className="btn btn-primary mx-2"
//                             onClick={() =>
//                               setSelectedTest({
//                                 test,
//                                 patientId: patient.testid,
//                               })
//                             }
//                           >
//                             Start Test
//                           </button>
//                         ))}
//                       </td>
//                     </tr>
//                   )}
//                 </>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {/* Pagination */}
//         <nav>
//           <ul className="pagination">
//             <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//               <button
//                 className="page-link"
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
//             </li>
//             {Array.from(
//               { length: Math.ceil(filteredPatients.length / itemsPerPage) },
//               (_, i) => (
//                 <li
//                   key={i}
//                   className={`page-item ${
//                     currentPage === i + 1 ? "active" : ""
//                   }`}
//                 >
//                   <button className="page-link" onClick={() => paginate(i + 1)}>
//                     {i + 1}
//                   </button>
//                 </li>
//               )
//             )}
//             <li
//               className={`page-item ${
//                 currentPage ===
//                 Math.ceil(filteredPatients.length / itemsPerPage)
//                   ? "disabled"
//                   : ""
//               }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={
//                   currentPage ===
//                   Math.ceil(filteredPatients.length / itemsPerPage)
//                 }
//               >
//                 Next
//               </button>
//             </li>
//           </ul>
//         </nav>

//         {selectedTest && (
//           <Modal show={true} onHide={handleCloseModal}>
//             <Modal.Header closeButton>
//               <Modal.Title>Test Details</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>{selectedTest.test}</Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseModal}>
//                 Close
//               </Button>
//               <Button
//                 variant="success"
//                 onClick={() =>
//                   handleStart(selectedTest.patientId, selectedTest.test)
//                 }
//               >
//                 Start
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         )}
//       </div>
//     </Wrapper>
//   );
// }

// export default TableData;
// const Wrapper = styled.div`
//   th {
//     background-color: #213555;
//     color: white;
//     white-space: nowrap;
//   }
//   td {
//     white-space: nowrap;
   
//   }
  
// `;


import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

function TableData() {
  const [patientDetails, setPatientDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();
  const handleTopPageLink = () => {
    window.scrollTo(0, 0);
  };

  const currentUser = useSelector((state) => state.auth.user);
  const token = currentUser?.token;
  console.log(token);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/get-patient-details`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPatientDetails(response.data.result);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();

    // Set up interval to fetch data every X seconds
    const interval = setInterval(() => {
      fetchPatientDetails();
    }, 3000); // Fetch data every 3 seconds (adjust as needed)

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [token]);

  const getTestArray = (testString) => {
    return testString.split(",").map((item) => item.trim());
  };

  const handleStart = async (id, test) => {
    try {
      navigate(`/Payment-test/${id}`, { state: { test } });
      handleTopPageLink();
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedTest(null);
  };

  // Filter the patient details to include only those with a "pending" status
  const pendingPatients = patientDetails?.filter(patient => patient.test_status === "pending");

  // Apply search and date filters to the pending patients
  const filteredPatients = pendingPatients?.filter((patient) => {
    const fullName = patient.patient_name.toLowerCase().trim();
    const lowerSearchQuery = searchQuery.toLowerCase().trim();
    const formattedDate = moment(patient.created_date).format("YYYY-MM-DD");

    return (
      (fullName.includes(lowerSearchQuery) ||
        patient.patient_uhid.toLowerCase().trim().includes(lowerSearchQuery) ||
        patient.mobileno.trim().includes(lowerSearchQuery)) &&
      (!dateFilter || formattedDate === dateFilter)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPatients?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Wrapper>
      <div className="container-fluid">
        <h2 style={{ color: "#213555" }}>List of Tests </h2>
        <div className="mb-3">
          <div className="row">
            <div className="col-lg-5">
              <div className="d-flex">
              <input
                type="text"
                placeholder="Search by Patient Name or UHID or mobile number "
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to the first page on search
                  }}
                  className="form-control mb-lg-0 mb-md-2 searchbar"
                  />
               
                </div>
           
            </div>
            <div className="col-lg-2">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setCurrentPage(1); // Reset to the first page on date filter change
                }}
                className="form-control "
              />

            </div>
          </div>
        </div>
        {currentItems?.length === 0 ? (
          <div className='mb-5 fs-4 fw-bold text-center'>No tests available</div>
        ) : (
          <>
            <div className="" style={{ overflowX: "scroll" }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Patient UHID</th>
                    <th>Patient Name</th>
                    <th>Mobile Number</th>
                    <th>Email Id</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Weight</th>
                    <th>Branch Name</th>
                    <th>Assigned Doctor Name</th>
                    <th>Lab Name</th>
                    <th>Created Date</th>
                    <th>Test Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((patient, index) => (
                    <tr key={index}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{patient.patient_uhid}</td>
                      <td>{patient.patient_name}</td>
                      <td>{patient.mobileno}</td>
                      <td>{patient.emailid}</td>
                      <td>{patient.age}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.weight}</td>
                      <td>{patient.branch_name}</td>
                      <td>{patient.assigned_doctor_name}</td>
                      <td>{patient.lab_name}</td>
                      <td>{moment(patient.created_date).format("DD/MM/YYYY")}</td>
                      <td>{patient.test}</td>
                      <td className="text-danger fw-bold">{patient.test_status}</td>
                      <td>
                        {getTestArray(patient.test).map((test, i) => (
                          <button
                            key={i}
                            className="btn btn-primary mx-2"
                            onClick={() => setSelectedTest({ test, patientId: patient.testid })}
                          >
                            Start Test
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from(
                  { length: Math.ceil(filteredPatients.length / itemsPerPage) },
                  (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => paginate(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    currentPage === Math.ceil(filteredPatients.length / itemsPerPage) ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredPatients.length / itemsPerPage)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
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
                onClick={() => handleStart(selectedTest.patientId, selectedTest.test)}
              >
                Start
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </Wrapper>
  );
}

export default TableData;

const Wrapper = styled.div`
  th {
    background-color: #213555;
    color: white;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }
  .searchbar{
    @media (min-width: 1024px) and (max-width: 1280px) {
      width: 100%;
    }
    @media (min-width: 1281px) and (max-width: 2000px) {
      width: 100%;
    }
  }
`;

