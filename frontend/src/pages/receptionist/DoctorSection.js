import React, { useState } from 'react'
import styled from 'styled-components'
import Sider from '../../components/receptionist/Sider'
import Header from '../../components/receptionist/Header'
import { Link } from 'react-router-dom'
import { Table, Input, Button, Form } from "react-bootstrap";

function DoctorSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");



  const Table_data = [
    { uid :"1", doctor_name:"Mohit Sahu",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"2", doctor_name:"Rahul sen",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"3", doctor_name:"Umer khan",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"4", doctor_name:"Shadab Ali",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"5", doctor_name:"Saket Agrawal",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"6", doctor_name:"Mohit Sahu",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"1", doctor_name:"Mohit Sahu",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"2", doctor_name:"Rahul sen",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"3", doctor_name:"Umer khan",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"4", doctor_name:"Shadab Ali",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"5", doctor_name:"Saket Agrawal",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"6", doctor_name:"Mohit Sahu",mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    

  ];

    // Searching function
    const handleSearch = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      setSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to the first page when searching
  
      const filteredResults = Table_data.filter((row) =>
        row.doctor_name.toLowerCase().includes(searchTerm)
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
  const currentRows = searchTerm ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : Table_data.slice(indexOfFirstRow, indexOfLastRow);


  const totalPages = Math.ceil(Table_data.length / rowsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Table_data.length / rowsPerPage); i++) {
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
           <div className="row flex-nowrap">
    <div className="col-lg-1 col-1 " id='sider'>
   <Sider/>
   </div>
   <div className="col-lg-11">
    <div className="row" id='row1'>
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
    <input type="search" id="form1" className="form-control" placeholder='Search here' onChange={handleSearch}
        value={searchTerm} />
    
  </div>
  
  


 
</div>
          <div className="widget-area-2 proclinic-box-shadow" id='tableres'>
                   
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
                            <th>Appointment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRows.map((data,index) => (
                                  <tr key={index}>
                                  <td>{data.uid}</td>
                                <td> {data.doctor_name}</td>
                                  <td>{data.mobile}</td>
                                  <td>{data.email}</td>
      
                                  <td>{data.gender}</td>
                                  <td>
                                   {data.address}
                                  </td>
                                  <td><Link to='/doctor_profile'>View Details</Link></td>
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
                       {searchTerm ?<> Showing Page {currentPage} of {totalPages} from {filteredData?.length} entries (filtered from {Table_data?.length} total entries) </> : <>Showing Page {currentPage} of {totalPages} from {Table_data?.length} entries</> }  

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
                          disabled={indexOfLastRow >= Table_data.length}
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
  )
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