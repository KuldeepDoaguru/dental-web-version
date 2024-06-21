import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sider from '../../components/receptionist/Sider'
import Header from '../../components/receptionist/Header'
import { Link } from 'react-router-dom'
import { Table, Input, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import Toast from 'react-bootstrap/Toast';
import moment from 'moment';
import Lottie from "react-lottie";
import animationData from "../../images/animation/loading-effect.json";

function DoctorSection() {

  const {refreshTable,currentUser} = useSelector((state) => state.user);
  const  branch = currentUser.branch_name;
  const token = currentUser?.token;
  const [branchDetail,setBranchDetail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors,setDoctors] = useState([]);
  
  const [doctorWithLeave,setDoctorWithLeave] = useState([]);
  const [doctorWithUpcommingLeave,setDoctorWithUpcommingLeave] = useState([]);
  const todayDate = moment().format('YYYY-MM-DD');
  const [loadingEffect, setLoadingEffect] = useState(false);
  console.log(todayDate)
  
 
  const getDoctorsWithLeave = async ()=>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors-with-leave/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      setDoctorWithLeave(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const getDoctors = async ()=>{
    setLoadingEffect(true)
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      setDoctors(response?.data?.data)
      setLoadingEffect(false)
    }
    catch(error){
      console.log(error)
      setLoadingEffect(false)
    }
  }

  const getBranchDetail = async ()=>{
    try{
       const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branch-detail/${branch}`)
       console.log(response)
       setBranchDetail(response.data.data)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
     
     getDoctors();
     
     getDoctorsWithLeave();
     getBranchDetail();
    
     
  },[]);

  const getDoctorWithUpcommingLeave = () =>{
    const filterDoctors =  doctorWithLeave?.filter((doctor)=>{
    return  new Date(doctor?.leave_dates) >= new Date(todayDate)
    
            
    })
    setDoctorWithUpcommingLeave(filterDoctors);
   
 
 }

  useEffect(()=>{
    getDoctorWithUpcommingLeave();
  },[doctorWithLeave])

  console.log(doctorWithLeave)
  console.log(doctorWithUpcommingLeave);

  // Function to convert 24-hour time to AM/PM format
const convertToAMPM = (time) => {
  const [hours, minutes] = time?.split(':');
  let suffix = 'AM';
  let formattedHours = parseInt(hours, 10);

  if (formattedHours >= 12) {
    suffix = 'PM';
    formattedHours = formattedHours !== 12 ? formattedHours - 12 : formattedHours;
  }

  return `${formattedHours}:${minutes} ${suffix}`;
};



    // Searching function
    const handleSearch = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      setSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to the first page when searching
  
      const filteredResults = doctors.filter((row) =>
        row.employee_name.toLowerCase().includes(searchTerm.trim()) || row.employee_mobile.includes(searchTerm.trim())
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
  const currentRows = searchTerm ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : doctors.slice(indexOfFirstRow, indexOfLastRow);


  const totalPages = Math.ceil(doctors.length / rowsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(doctors.length / rowsPerPage); i++) {
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

   // Define a function to format the date
const formatDate = (dateString) => {
  // Parse the date string using Moment.js
  const dateObject = moment(dateString, 'YYYY-MM-DD');

  // Format the date using the desired format
  const formattedDate = dateObject.format('DD-MM-YYYY');

  return formattedDate;
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
    <Wrapper>
      <div className='header'>
      <Header/>
      </div>
      <div className="row flex-nowrap">
        <div className="col-lg-1 col-1 " id="sider">
          <Sider />
        </div>
        <div className="col-lg-11 mt-2" id='set'>
        <div className='text-center'>
      <h3>All Doctors</h3>
    </div>
          <div className="row" id="row1">
            <div className="col-lg-12">
            <div className="col-lg-12" id='head'>
   <nav class="shadow rounded navbar navbar-light bg-light">
            <h6 className='mx-3 my-1 my-md-0'>Search By Doctor</h6>
  <div class="container-fluid" id='cont'>
    <div class="navbar1" >
      <input className="form-control me-2 rounded-5" type="search" placeholder="Enter Doctor Name Or Mobile" aria-label="Search" onChange={handleSearch}
        value={searchTerm}/>
      {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
    </div>
    <div>
    <Form.Group
                      controlId="rowsPerPageSelect"
                      style={{ display: "flex" }}
                    >
                      <h6 className="d-flex align-items-center"> Rows Per Page :{" "}</h6>
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
    <div><h5>Total Doctors - {doctors.length}</h5></div>
    
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
             
              <div className="widget-area-2 proclinic-box-shadow  mt-5" id="tableres">
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
                        <th>Id</th>
                        <th>Doctor Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Shift</th>
                        <th>Leave Dates</th>
                      </tr>
                    </thead>
                    {  currentRows.length === 0 ? (
              <div className="no-data-container">
              <h4>No Data Found</h4>
            </div>
            ) : (
                    <tbody>
                      {currentRows?.map((data, index) => (
                        <tr key={index}>
                          <td>{data.employee_ID}</td>
                          <td className="text-capitalize">{"Dr. "} {data.employee_name}</td>
                          <td>{data.employee_mobile}</td>
                          <td>{data.employee_email}</td>

                          <td>{data?.gender}</td>
                          <td>{data.address}</td>
                          <td>
                            Morning :{" "}
                            <span>
                              {" "}
                              {convertToAMPM(
                                data.morning_shift_start_time
                              )} to {convertToAMPM(data.morning_shift_end_time)}
                            </span>
                            <span className="d-block">
                              Evening :{" "}
                              {convertToAMPM(data.evening_shift_start_time)} to{" "}
                              {convertToAMPM(data.evening_shift_end_time)}
                            </span>{" "}
                          </td>
                          {/* <td><Link to='/doctor_profile'>View Details</Link></td> */}
                          <td>
                          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    View Leave
  </button> 
  <ul className="dropdown-menu">
    {/* {doctorWithLeave
      .filter((doctor) => doctor.employee_ID === data.employee_ID)
      .map((doctor) => 
        doctor.leave_dates.split(",").filter((leaveDate) => new Date(leaveDate) >= new Date(todayDate)).map((leaveDate, index) => (
          leaveDate ?
          <li key={index}>
             {formatDate(leaveDate)}
          </li>
          :
        
          <li key={index}>
             No leave
          </li>
        
        ))
      )
    } */}
    {doctorWithUpcommingLeave
  ?.filter((doctor) => doctor?.employee_ID === data?.employee_ID)
  ?.map((doctor) => 
            <>
          <li key={index}>
            {formatDate(doctor?.leave_dates)}
          </li>
          </>
        ) 
}
    {doctorWithUpcommingLeave?.filter((doctor) => doctor?.employee_ID === data?.employee_ID)?.length === 0 && (
      <li>No leave</li>
    )}
  </ul>

  
                          
                          </td>
                        </tr>
                      ))}
                    </tbody>
            )}
                  </table>
                </div>
          )}
                <div className="container mt-3 mb-3">
                  <div className="row">
                    <div className="col-lg-10 col-xl-8 col-md-12 col-sm-12 col-8">
                      {" "}
                      <h4
                        style={{
                          color: "black",
                          marginLeft: "5px",
                          marginRight: "5px",
                          fontSize: "1.1rem",
                        }}
                      >
                        {/* Showing Page {currentPage} of {totalPages} from {data?.length} entries */}
                        {searchTerm ? (
                          <>
                            {" "}
                            Showing Page {currentPage} of {totalPages} from{" "}
                            {filteredData?.length} entries (filtered from{" "}
                            {doctors?.length} total entries){" "}
                          </>
                        ) : (
                          <>
                            Showing Page {currentPage} of {totalPages} from{" "}
                            {doctors?.length} entries
                          </>
                        )}
                      </h4>
                    </div>
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
                          disabled={indexOfLastRow >= doctors.length}
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
    </Wrapper>
  );
}

export default DoctorSection
const Wrapper = styled.div`
overflow: hidden;
/* #row1{
  @media screen and (max-width: 768px) {
    width: 22rem;
    margin-left: 0.7rem;
  }
} */
#sider{
  padding-top: 60px; /* Height of header */
  min-height: 100vh;
  position: fixed;
  
  
 

}
#tableres{
  @media screen and (max-width: 768px) {
    width: auto;
    margin: auto;
   
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
    width: auto;
   margin: auto;
  }
  @media screen and (min-width: 1500px) and (max-width: 2000px) {
     width: 98%;
  
}
@media screen and (min-width: 2000px) and (max-width: 2500px) {
     width: 98%;
  
}
}

#head{
  
  @media screen and (max-width: 768px) {
  width: 98%;
  /* margin-left: 1.2rem; */
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
   margin-left: 1rem;
   
   margin: auto;
  }
  @media screen and (min-width: 1500px) and (max-width: 2000px) {
     width: 98%;
  
}
@media screen and (min-width: 2000px) and (max-width: 2500px) {
     width: 98%;
  
}
}

#set{

margin-left: -4.5rem;
padding-left: 150px; /* Width of sidebar */
padding-top: 90px; /* Height of header */
flex-grow: 1;
overflow-y: auto;

@media screen and (max-width: 768px) {
  margin-left: -2rem;
}
@media screen and (min-width: 768px) and (max-width : 1020px) {
  margin-left: -2rem;
  
}
@media screen and (min-width: 1020px) and (max-width: 1500px) {
  margin-left: -2rem;
  
}
@media screen and (min-width: 1500px) and (max-width: 1700px) {
  margin-left: -1.9rem;
  
}
@media screen and (min-width: 1700px) and (max-width: 2000px) {
  margin-left: -1rem;
  
}

  @media screen and (min-width: 2000px) and (max-width: 2500px) {
   margin-left: 0rem;
    
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

  .header{
  position: fixed;
  min-width: 100%;
  z-index: 100;
}
.navbar1{
  display: flex;
  width: 25%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
.table-responsive {
  position: relative;
  min-height: 10rem;
}

.loading-container,
.no-data-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px; /* Adjust as necessary */
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.no-data-container h4 {
  margin: 0;
}

`