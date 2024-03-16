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

function DoctorSection() {

  const {refreshTable,currentUser} = useSelector((state) => state.user);
  const  branch = currentUser.branch_name;
  const [branchDetail,setBranchDetail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors,setDoctors] = useState([]);
  
  const [doctorWithLeave,setDoctorWithLeave] = useState([]);

 
  const getDoctorsWithLeave = async ()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-doctors-with-leave/${branch}`);
      setDoctorWithLeave(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const getDoctors = async ()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-doctors/${branch}`);
      setDoctors(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const getBranchDetail = async ()=>{
    try{
       const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-branch-detail/${branch}`)
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

  console.log(doctorWithLeave)

  // Function to convert 24-hour time to AM/PM format
const convertToAMPM = (time) => {
  const [hours, minutes] = time.split(':');
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
        row.employee_name.toLowerCase().includes(searchTerm)
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

   // Define a function to format the date
const formatDate = (dateString) => {
  // Parse the date string using Moment.js
  const dateObject = moment(dateString, 'YYYY-MM-DD');

  // Format the date using the desired format
  const formattedDate = dateObject.format('DD-MM-YYYY');

  return formattedDate;
};
  
  return (
    <Wrapper>
      <Header />
      <div className="row flex-nowrap">
        <div className="col-lg-1 col-1 " id="sider">
          <Sider />
        </div>
        <div className="col-lg-11">
          <div className="row" id="row1">
            <div className="col-lg-11">
              <div className="input-group mt-4 ">
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
                <div className="form-outline  d-flex align-items-center">
                  <input
                    type="search"
                    id="form1"
                    className="form-control"
                    placeholder="Search here"
                    onChange={handleSearch}
                    value={searchTerm}
                  />
                </div>
              </div>
              <div className="widget-area-2 proclinic-box-shadow" id="tableres">
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
                    <tbody>
                      {currentRows.map((data, index) => (
                        <tr key={index}>
                          <td>{data.employee_ID}</td>
                          <td> {data.employee_name}</td>
                          <td>{data.employee_mobile}</td>
                          <td>{data.employee_email}</td>

                          <td>{data.gender}</td>
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
    {doctorWithLeave
      .filter((doctor) => doctor.employee_ID === data.employee_ID)
      .map((doctor) => 
        doctor.leave_dates.split(",").filter((leaveDate) => new Date(leaveDate) >= new Date()).map((leaveDate, index) => (
          <li key={index}>
             {formatDate(leaveDate)}
          </li>
        ))
      )
    }
    {doctorWithLeave.filter((doctor) => doctor.employee_ID === data.employee_ID).length === 0 && (
      <li>No leave</li>
    )}
  </ul>

  
                          
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="container mt-3 mb-3">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-12">
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
#row1{
  @media screen and (max-width: 768px) {
    width: 22rem;
    margin-left: 0.7rem;
  }
}
#sider{
  @media screen and (max-width: 768px) {
    height: 46rem;
  }
}
td{
  padding: 1rem;
}


`