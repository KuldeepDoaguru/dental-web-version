import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/receptionist/Header'
import Sider from '../../components/receptionist/Sider'
import { Link } from 'react-router-dom'
import { Table, Input, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EditPatientDetails from '../../components/receptionist/AllPatients/EditPatientDetails'
function AllPatient() {
  
  const {refreshTable,currentUser} = useSelector((state) => state.user);
  const  branch = currentUser.branch_name
  const [patients, setPatients] = useState([]);
  const [appointmentsData,setAppointmentsData] = useState([]);
  const [showEditPatientPopup, setShowEditPatientPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getPatient = async () =>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-Patients/${branch}`);
      console.log(response);
      setPatients(response?.data?.data)
     }
     catch(error){
        console.log(error)
     }
    
  }

  const getAppointments = async ()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-appointments/${branch}`);
      setAppointmentsData(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getPatient();
    getAppointments();
    
 },[refreshTable]);

 const handleEditPatient = (Patient)=>{
  setSelectedPatient(Patient);
  setShowEditPatientPopup(true);
}





  // Searching function
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page when searching

    const filteredResults = patients.filter((row) =>
      row.patient_name.toLowerCase().includes(searchTerm) || row.mobileno.includes(searchTerm) || row.uhid.toLowerCase().includes(searchTerm)
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
const currentRows = searchTerm ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : patients.slice(indexOfFirstRow, indexOfLastRow);


const totalPages = Math.ceil(patients.length / rowsPerPage);

const paginate = (pageNumber) => {
  if (pageNumber > 0 && pageNumber <= totalPages) {
    setCurrentPage(pageNumber);
  }
};

const pageNumbers = [];
for (let i = 1; i <= Math.ceil(patients.length / rowsPerPage); i++) {
  pageNumbers.push(i);
}

const renderPageNumbers = pageNumbers.map((number, index) => {
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


  return (
    <Wrapper>
        <Header/>
      
        <div className="row flex-nowrap ">
    <div className="col-lg-1 col-1" id='hd'>
   <Sider/>
    </div>
    <div className="col-lg-11 mt-2" id='set'>
      <div className="row" >
   <div className="col-lg-12" id='head'>
   <nav class="navbar navbar-light bg-light">
            <h6 className='mx-3 my-0'>Search By Patient</h6>
  <div class="container-fluid" id='cont'>
    <form class="navbar1 " >
      <input className="form-control me-2 rounded-5" type="search" placeholder="Enter Patient Name Or Moblie" aria-label="Search" onChange={handleSearch}
        value={searchTerm}/>
      {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
    </form>
    <div>
    <Form.Group
                      controlId="rowsPerPageSelect"
                      style={{ display: "flex" }}
                    >
                      <Form.Label className="d-flex align-items-center">
                        Rows Per Page :{" "}
                      </Form.Label>
                      <Form.Control
                        as="select"
                        value={rowsPerPage}
                        className="m-2"
                        style={{ width: "auto" }}
                        onChange={handleRowsPerPageChange}
                      >
                        
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        {/* Add more options as needed */}
                      </Form.Control>
                    </Form.Group>
    </div>
    <div><h5>Total Patients - {patients.length}</h5></div>
    
{/* <div class="dropdown" id='drop'>
  
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  Filter Patient by Bill Status
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Unpaid</a></li>
    <li><a class="dropdown-item" href="#">Partially Paid</a></li>
    <li><a class="dropdown-item" href="#">Paid</a></li>
    <li><a class="dropdown-item" href="#">All</a></li>
  </ul>
</div> */}
  </div>
</nav>  
   </div>

   <div className="col-lg-12">
   <div className="widget-area-2 proclinic-box-shadow mx-3 mt-5" id='tableres'>
                    
                    
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Patient Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Patient Type</th>
                            <th>Address</th>
                            <th>Appointment</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRows.map((data,index)=>(
                             <tr key={index}>
                             <td><Link to={`/patient_profile/${data.uhid}`}>{data.uhid}</Link></td>
                             <td>{data.patient_name}</td>
                             <td>{data.mobileno}</td>
                             <td>{data.emailid}</td>
 
                             <td>{data.gender}</td>
                             <td>{data.age}</td>
                             <td>{data.patient_type}</td>
                             <td>
                             {data.address}
                             </td>
                             <td><div>Last Appointment- {data.last_appointments}</div><div>Upcoming Appointment- {data.last_appointments}</div></td>
                             <td ><div className='dropdown'>
                             <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul className="dropdown-menu">
   
  <li><a className="dropdown-item mx-0" onClick={()=>handleEditPatient(data)}>Edit Patient details</a></li> 
  
 
  </ul>
  </div></td>
                           </tr>
                          ))}
                          
                          
                         
                        </tbody>
                      </table>
                    </div>
                    <div className="container mt-3 mb-3">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-12">  <h4
                          style={{
                            color: "black",
                            marginLeft: "5px",
                            marginRight: "5px",
                            fontSize: "1.1rem"
                          }}
                          
                        >
                         {/* Showing Page {currentPage} of {totalPages} from {data?.length} entries */}
                       {searchTerm ?<> Showing Page {currentPage} of {totalPages} from {filteredData?.length} entries (filtered from {patients?.length} total entries) </> : <>Showing Page {currentPage} of {totalPages} from {patients?.length} entries</> }  

                        </h4></div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
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
                          disabled={indexOfLastRow >= patients.length}
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
   
 


  </div>
   </div>
   </div>
   {showEditPatientPopup && (
        <EditPatientDetails onClose={() => setShowEditPatientPopup(false)} patientInfo={selectedPatient} allPatientData={patients} />
      )} 
 
    </Wrapper>
  )
}

export default AllPatient
const Wrapper = styled.div`
.navbar1{
  display: flex;
  width: 25%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
#cont{
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
}
#drop{
  @media screen and (max-width: 768px) {
   width: 100%;
  }
}
#head{
  
  @media screen and (max-width: 768px) {
  width: 85%;
  margin-left: 1.2rem;
  }
}
#hd{
  height:44rem;
  @media screen and (max-width: 768px) {
   height: 68rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
   height: 58rem;
  }
}
#tableres{
  @media screen and (max-width: 768px) {
    width: 21rem;
   
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
   width: 42rem;
  }
}

`
