

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Input, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTableRefresh } from '../../../redux/user/userSlice';
import EditAppointment from './EditAppointment';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import moment from 'moment';
import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom';
import CancleAppointment from './CancelAppointment';
import Lottie from "react-lottie";
import animationData from "../../../images/animation/loading-effect.json";

const AppointTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { refreshTable, currentUser } = useSelector((state) => state.user);
  const token = currentUser?.token;
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString()?.split('T')[0]); // Initialize with today's date
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);



  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const branch = currentUser.branch_name;
  const [appointmentsData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEffect, setLoadingEffect] = useState(true);

  const [selectedDateAppData, setSelectedDateAppData] = useState([]);
  const [doctors,setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store the selected Doctor

  const getDoctors = async ()=>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      setDoctors(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const timelineData = async (id) => {

    try {
      const response = await axios.post(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/insertTimelineEvent",
        {
          type: "Appointment",
          description: "Appointment Cancel",
          branch: branch,
          patientId: id,
        }
        ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const timelineDataForCheckIn = async (id) => {

    try {
      const response = await axios.post(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/insertTimelineEvent",
        {
          type: "Appointment",
          description: "Patient Check-In",
          branch: branch,
          patientId: id,
        }
        ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


console.log(appointmentsData);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(toggleTableRefresh());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

   

 // previous code 1
 
  // useEffect(() => {
  //   const sortedAppointments = appointmentsData.sort((a, b) => {
  //     return a.appointment_dateTime.localeCompare(b.appointment_dateTime);
  //   });

  //   const filteredResults = sortedAppointments.filter((row) =>

  //     row.appointment_dateTime.includes(selectedDate)
  //   );
  //   setSelectedDateAppData(filteredResults)
  //   handleSearch({ target: { value: searchTerm } });
  // }, [appointmentsData, selectedDate])


 // previous code 2

  // useEffect(() => {
  //   const sortedAppointments = appointmentsData.sort((a, b) => a.appointment_dateTime.localeCompare(b.appointment_dateTime));
  //   const filteredResults = sortedAppointments.filter((row) =>
  //     row.appointment_dateTime.includes(selectedDate) &&
  //     (!selectedDoctor || row.assigned_doctor_id === selectedDoctor)
  //   );
  //   setSelectedDateAppData(filteredResults)
  //   handleSearch({ target: { value: searchTerm } });
  // }, [appointmentsData, selectedDate, selectedDoctor]);
  useEffect(() => {
    const sortedAppointments = appointmentsData.sort((a, b) => a.appointment_dateTime.localeCompare(b.appointment_dateTime));
    const filteredResults = sortedAppointments.filter((row) =>
      row.appointment_dateTime.includes(selectedDate) &&
      (!selectedDoctor || row.assigned_doctor_id === selectedDoctor)
    );
    setSelectedDateAppData(filteredResults)
    
    handleSearch({ target: { value: searchTerm } });
  }, [ selectedDate, selectedDoctor]);
  useEffect(() => {
    const sortedAppointments = appointmentsData.sort((a, b) => a.appointment_dateTime.localeCompare(b.appointment_dateTime));
    const filteredResults = sortedAppointments.filter((row) =>
      row.appointment_dateTime.includes(selectedDate) &&
      (!selectedDoctor || row.assigned_doctor_id === selectedDoctor)
    );
    setSelectedDateAppData(filteredResults)

    const filteredResult = appointmentsData.filter((row) =>
      (row.patient_name.toLowerCase().includes(searchTerm.trim()) || row.mobileno.includes(searchTerm.trim()) || row.uhid.toLowerCase().includes(searchTerm.trim()) || row.appointment_status.toLowerCase().includes(searchTerm.trim()) )
      && row.appointment_dateTime.includes(selectedDate) &&
      (!selectedDoctor || row.assigned_doctor_id === selectedDoctor)
    );

    setFilteredData(filteredResult);

    
    
  }, [ appointmentsData]);

  const getAppointments = async () => {
    
    try {
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-appointments/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      setAppointmentData(response?.data?.data)
      setLoadingEffect(false)
      // paginate(currentPage)
      
    }
    catch (error) {
      console.log(error)
      setLoadingEffect(false)
    }
  }

  console.log(appointmentsData);

  useEffect(() => {
    getAppointments();
     
  }, [refreshTable])
  useEffect(() => {
    getDoctors();
     
  }, [])



  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment)
    setShowEditPopup(true);
  }
  const handleCancelAppointment = (appointment) => {
    setSelectedAppointment(appointment)
    setShowCancelPopup(true);
  }


  const handleDateChange = (increment) => {
    return () => {
      if(selectedDate){
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() + increment);
        setSelectedDate(currentDate.toISOString()?.split('T')[0]);
      }
      
    };
  };
  // Add an async function to handle status change
  const handleStatusChange = async (appointmentId, patient_uhid, newStatus) => {
    try {
      setLoadingEffect(true)
      setLoading(true);
      // Send a PUT request to your backend endpoint to update the status
      await axios.put(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/update-appointment-status`, { status: newStatus, appointmentId: appointmentId, appointment_updated_by: currentUser.employee_name, appointment_updated_by_emp_id: currentUser.employee_ID } ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      // Optionally, you can re-fetch appointments after successful update
      setLoading(false);
      getAppointments();
      dispatch(toggleTableRefresh());
      timelineDataForCheckIn(patient_uhid);
      cogoToast.success(`Patient Successfully ${newStatus}`)
      
    } catch (error) {
      setLoading(false);
      setLoadingEffect(false)
      console.error('Error updating status:', error);
      cogoToast.error("Error updating status")
    }
  };
  const handleStatusCancel = async (appointmentId, patient_uhid, newStatus) => {

    //  // If the action is 'cancel_treatment', add the reason to the request body
    let reason;
    const cancelReason = prompt("Please provide a reason for cancellation:");
    if (cancelReason !== null) { // User provided a reason
      reason = cancelReason;
      if (!reason) {
        cogoToast.error("Please provide a reason for cancellation")
        return;
      }
    }
    else {
      return;
    }



    try {
      // Send a PUT request to your backend endpoint to update the status
      await axios.put(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/update-appointment-status-cancel`, {
        status: newStatus,
        cancelReason: reason, appointmentId: appointmentId, appointment_updated_by: currentUser.employee_name, appointment_updated_by_emp_id: currentUser.employee_ID
      } ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      // Optionally, you can re-fetch appointments after successful update
      getAppointments();
      dispatch(toggleTableRefresh());
      timelineData(patient_uhid);
      cogoToast.success("Appointment successfully canceled")
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };





  // const handleChange = (e) => {
  //   setSearchInput(e.target.value);
  // };

  // const filteredTable_data = Table_data.filter((data) => {
  //   return data.patient.toLowerCase().includes(searchInput.toLowerCase());
  // });


  // Searching function
  // const handleSearch = (event) => {
  //   const searchTerm = event.target.value.toLowerCase();
  //   setSearchTerm(searchTerm);
  //   setCurrentPage(1); // Reset to the first page when searching

  //   const filteredResults = appointmentsData.filter((row) =>
  //     (row.patient_name.toLowerCase().includes(searchTerm.trim()) || row.mobileno.includes(searchTerm.trim()) || row.uhid.toLowerCase().includes(searchTerm.trim()) || row.appointment_status.toLowerCase().includes(searchTerm.trim()) )
  //     && row.appointment_dateTime.includes(selectedDate)
  //   );

  //   setFilteredData(filteredResults);
  // };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1);
    

    const filteredResults = appointmentsData.filter((row) =>
      (row.patient_name.toLowerCase().includes(searchTerm.trim()) || row.mobileno.includes(searchTerm.trim()) || row.uhid.toLowerCase().includes(searchTerm.trim()) || row.appointment_status.toLowerCase().includes(searchTerm.trim()) )
      && row.appointment_dateTime.includes(selectedDate) &&
      (!selectedDoctor || row.assigned_doctor_id === selectedDoctor)
    );

    setFilteredData(filteredResults);
  };



  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Pagination functions
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = searchTerm ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : selectedDateAppData.slice(indexOfFirstRow, indexOfLastRow);


  const totalPages = Math.ceil(selectedDateAppData.length / rowsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(selectedDateAppData.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers?.map((number, index) => {
    // Display the first two page numbers
    if (index < 2) {
      return (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </Button>
      );
    }
    // Display an ellipsis for the first middle section
    else if (index === 2 && currentPage > 3) {
      return (
        <Button key={number} disabled>
          ...
        </Button>
      );
    }
    // Display the current page and the two adjacent pages
    else if (
      (index >= currentPage - 1 && index <= currentPage + 1) ||
      (index === 2 && currentPage <= 3)
    ) {
      return (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </Button>
      );
    }
    // Display an ellipsis for the last middle section
    else if (index === pageNumbers.length - 3 && currentPage < pageNumbers.length - 2) {
      return (
        <Button key={number} disabled>
          ...
        </Button>
      );
    }
    // Display the last two page numbers
    else if (index >= pageNumbers.length - 2) {
      return (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </Button>
      );
    }
    return null;
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      
    },
  };

  return (
    <Wrapper>
      <div className=''>



        <div className="widget-area-2 proclinic-box-shadow" id="tableres">
          <div className="d-lg-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className=" me-4  widget-title" id="title">
                Appointment for

              </h5>
              <FaArrowCircleLeft style={{ fontSize: '35px', padding: "3px", cursor: "pointer" }} onClick={handleDateChange(-1)} />
              <input type="date" className="form-control w-50" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              <FaArrowCircleRight style={{ fontSize: '35px', padding: "3px", cursor: "pointer" }} onClick={handleDateChange(1)} />
            </div>

            <div className='mt-sm-2 mt-lg-0'>
            <select className="form-select text-capitalize" onChange={(e) => setSelectedDoctor(e.target.value)} id='form2' style={{ cursor: "pointer"}}>
                  <option value="">All Doctors</option>
      {doctors?.map((doctor) => (
       
        <option value={doctor.employee_ID} className="text-capitalize">{"Dr. "}{doctor.employee_name}</option>
      ))} 
      {/* <option value="Dr. Ajay">Dr. Ajay</option>
      <option value="Dr. Vijay">Dr. Vijay</option>
      <option value="Dr. Mohit">Dr. Mohit</option> */}
      
     
    </select>
            </div>
            <Form.Group
              controlId="rowsPerPageSelect"
              style={{ display: "flex", justifyContent: "center" }}
            >
             
               <h5  className="d-flex  align-items-center row-per-page "> Rows Per Page :{" "} </h5>
              
              <Form.Control
                as="select"
                value={rowsPerPage}
                className="m-2"
                style={{ width: "auto" ,cursor: "pointer"}}
                onChange={handleRowsPerPageChange}
              >

                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <div className='d-flex flex-row'>



              <input
                type="search"
                placeholder="Enter Patient Name or Mobile or UHID"
                onChange={handleSearch}
                value={searchTerm}
                className='mb-2 rounded-5 p-2 form-control'
                id="form1"
              />
            </div>
          </div>
          {loadingEffect ? (
            
            <Lottie
                          options={defaultOptions}
                          height={300}
                          width={400}
                          style={{ background: "transparent" }}
                        ></Lottie>
          
          ) : (
          
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>App. Id</th>
                  <th>UHID</th>
                  <th>Patient Name</th>
                  <th>Mobile</th>
                  <th>Timing</th>
                  <th>Treatment</th>
                  <th>Doctor Name</th>
                  <th>Blood Group</th>
                  <th>Age</th>
                  <th>Weight</th>
                  <th>Patient Type</th>
                  <th>Note</th>
                  <th>Status</th>
                  <th>Action</th>

                </tr>
              </thead>
               {  currentRows.length === 0 ? (
              <div className="no-data-container">
              <h4>No Data Found</h4>
            </div>
            ) : (
              <tbody>
                {currentRows?.map((patient, index) => { 
                   const appointmentDate = new Date(patient?.appointment_dateTime?.split("T")[0]);
                   appointmentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate comparison
                   return( 
                  <tr key={index}>
                    <td>{patient.appoint_id}</td>
                    <td><Link to={`/patient_profile/${patient.uhid}`}>{patient.uhid}</Link></td>
                    <td className="text-capitalize">{patient.patient_name}</td>
                    <td>{patient.mobileno}</td>
                    <td>{selectedDate ? moment(patient?.appointment_dateTime, 'YYYY-MM-DDTHH:mm').format('hh:mm A') : moment(
                            patient?.appointment_dateTime,
                            "YYYY-MM-DDTHH:mm"
                          ).format("DD/MM/YYYY hh:mm A")}</td>
                    <td>{patient.treatment_provided
                    }</td>
                    <td className="text-capitalize"> {"Dr. "}{patient.assigned_doctor_name
                    }</td>
                    <td>{patient.bloodgroup}</td>
                    <td>{patient.age}</td>
                    <td>{patient.weight}</td>
                    <td>{patient.
                      patient_type
                    }</td>
                    <td>{patient.notes}</td>
                    <td className="text-capitalize">{patient.appointment_status
                    }</td>

                    <td><div className="dropdown">
                      {!(patient.appointment_status == "in treatment" || patient.appointment_status == "Complete" || patient.appointment_status == "Cancel") ? <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Action
                      </button> : <button className="btn btn-primary dropdown-toggle" type="button" disabled data-bs-toggle="dropdown" aria-expanded="false">
                        Action
                      </button>}

                      {/* <ul className="dropdown-menu drop-pointer">
                        {(patient.appointment_status !== "Check-In" && patient.appointment_status !== "Cancel" && patient.appointment_dateTime.split("T")[0] == todayDate) && <li><a className="dropdown-item mx-0" onClick={() => handleStatusChange(patient.appoint_id, patient.uhid, 'Check-In')}>Check-In</a></li>}
                        {(patient.appointment_status == "Check-In" && patient.appointment_status !== "Cancel" && patient.appointment_dateTime.split("T")[0] == todayDate) && <li><a className="dropdown-item mx-0" onClick={() => handleStatusChange(patient.appoint_id, patient.uhid, 'Appoint')}>Change Status to "Appoint"</a></li>}
                        
                        {(patient.appointment_status == "Appoint" && patient.appointment_status !== "Cancel") && <li><a className="dropdown-item mx-0" onClick={() => handleEditAppointment(patient)}>Edit Appointment</a></li>}
                        {patient.appointment_status == "Check-In" || patient.appointment_status !== "Cancel" && <li><a className="dropdown-item mx-0" onClick={() => handleCancelAppointment(patient)}>Cancel Appointment</a></li>}
                      </ul> */}

<ul className="dropdown-menu">
  {(patient.appointment_status !== "Check-In" && patient.appointment_status !== "Cancel" && appointmentDate <= todayDate) && (
   <li className='text-center'> <button className={`btn btn-info mx-2 my-1 ${loading ? 'disabled' : ''}`}>
      <a onClick={!loading ? () => handleStatusChange(patient.appoint_id, patient.uhid, 'Check-In') : null}>Check-In</a>
    </button>
    </li>
  )}
  {(patient.appointment_status === "Check-In" && patient.appointment_status !== "Cancel" && appointmentDate <= todayDate) && (
   <li className='text-center'> <button className={`btn btn-warning mx-2 my-1 ${loading ? 'disabled' : ''}`}>
      <a onClick={!loading ? () => handleStatusChange(patient.appoint_id, patient.uhid, 'Appoint') : null}>Change Status to "Appoint"</a>
    </button>
    </li>
  )}
  {/* {(patient.appointment_status !== "Check-In" && patient.appointment_status !== "Cancel") && (
    <li className={`dropdown-item mx-0 ${loading ? 'disabled' : ''}`}>
      <a onClick={!loading ? () => handleStatusChange(patient.appoint_id, patient.uhid, 'Check-In') : null}>Check-In</a>
    </li>
  )}
  {(patient.appointment_status === "Check-In" && patient.appointment_status !== "Cancel") && (
    <li className={`dropdown-item mx-0 ${loading ? 'disabled' : ''}`}>
      <a onClick={!loading ? () => handleStatusChange(patient.appoint_id, patient.uhid, 'Appoint') : null}>Change Status to "Appoint"</a>
    </li>
  )} */}
  {(patient.appointment_status === "Appoint" && patient.appointment_status !== "Cancel") && (
   <li className='text-center'><button className={`btn btn-success  mx-2 my-1 ${loading ? 'disabled' : ''}`}>
      <a onClick={!loading ? () => handleEditAppointment(patient) : null}>Edit Appointment</a>
    </button>
    </li> 
  )}
  {(patient.appointment_status === "Check-In" || patient.appointment_status !== "Cancel") && (
   <li className='text-center'> <button className={`btn btn-danger mx-2 my-1 ${loading ? 'disabled' : ''}`}>
      <a onClick={!loading ? () => handleCancelAppointment(patient) : null}>Cancel Appointment</a>
    </button>
    </li>
  )}
</ul>
                    </div></td>
                  </tr>
                   )
})}
              </tbody>
)}
            </table>
          </div>
            
          )}
          <div className="container mt-3 mb-3">
            <div className="row">
              <div className="col-lg-10 col-xl-8 col-md-12 col-sm-12 col-8">  <h4
                style={{
                  color: "black",
                  marginLeft: "5px",
                  marginRight: "5px",
                  fontSize: "1.1rem"
                }}

              >
                {/* Showing Page {currentPage} of {totalPages} from {data?.length} entries */}
                {searchTerm ? <> Showing Page {currentPage} of {totalPages} from {filteredData?.length} entries (filtered from {selectedDateAppData?.length} total entries) </> : <>Showing Page {currentPage} of {totalPages} from {selectedDateAppData?.length} entries</>}

              </h4></div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="d-flex justify-content-evenly">
                  <Button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="warning"
                  >
                    Previous
                  </Button>
                  {renderPageNumbers}

                  <Button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastRow >= selectedDateAppData.length}
                    variant="success"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEditPopup && (
        <EditAppointment onClose={() => setShowEditPopup(false)} appointmentInfo={selectedAppointment} allAppointmentData={appointmentsData} />
      )}
      {showCancelPopup && (
        <CancleAppointment onClose={() => setShowCancelPopup(false)} appointmentInfo={selectedAppointment} allAppointmentData={appointmentsData} />
      )}

    </Wrapper>
  );
};

export default AppointTable;
const Wrapper = styled.div`
 

  #title {

    white-space: nowrap; /* Prevent text wrapping */
  
    @media screen and (max-width: 768px) {
      margin-top: 20px;
    }
  }

  #btn1 {
    width: 100%;

    @media screen and (min-width: 1600px) and (max-width: 3700px) {
      width: 75%;
    }
  }

  th{
    background-color: teal;
    color: white;
    white-space: nowrap;
  }
  td{
    white-space: nowrap;
  }
  .table-responsive{
    min-height: 10rem;
  }
  .dropdown-item {
  
  }
  .drop-pointer{
    cursor: pointer;
  }
  .dropdown-item.disabled {
  pointer-events: none;
  opacity: 0.6;
}
.table-responsive {
  position: relative;
}

.loading-container,
.no-data-container {
  display: flex;
  justify-content: center;
  align-items: end;
  height: 100px; /* Adjust as necessary */
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.no-data-container h4 {
  margin: 0 20px;
}
#form1{
  width: 350px;
  @media screen and (max-width: 1200px) {
     width: 100%;
    }
  @media screen and (min-width: 1100px) and (max-width : 1300px) {
     width: auto;
    }
 
}
#form2{
  @media screen and (max-width: 1200px) {
     
     
    }
}
  
`;