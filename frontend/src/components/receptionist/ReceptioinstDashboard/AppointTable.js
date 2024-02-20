

import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Input, Button, Form } from "react-bootstrap";

const AppointTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const Table_data = [
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"2", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"3", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"4", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"5", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"6", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"7", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"8", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"9", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"10", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"11", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"12", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"13", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"14", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"15", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"16", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"17", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"18", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"19", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"20", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"2", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"3", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"4", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"5", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"6", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"7", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"8", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"9", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"10", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"11", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"12", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"13", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"14", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"15", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"16", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"17", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"18", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"19", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"20", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"2", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"3", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"4", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"5", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"6", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"7", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"8", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"9", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"10", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"11", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"12", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"13", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"14", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"15", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"16", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"17", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"18", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"19", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"20", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    
  ];

  // const handleChange = (e) => {
  //   setSearchInput(e.target.value);
  // };

  // const filteredTable_data = Table_data.filter((data) => {
  //   return data.patient.toLowerCase().includes(searchInput.toLowerCase());
  // });


    // Searching function
    const handleSearch = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      setSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to the first page when searching
  
      const filteredResults = Table_data.filter((row) =>
        row.patient.toLowerCase().includes(searchTerm)
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
    <div className=''>
     

  
      <div className="widget-area-2 proclinic-box-shadow" id="tableres">
       <div className="d-flex justify-content-between align-items-center">
        
         <h5 className="widget-title" id="title">
        Appointment for 16-10-2023
        
        </h5>
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
        
                <div className='d-flex flex-row'>
                 
                
        
        <input
        type="search"
        placeholder="Search here"
        onChange={handleSearch}
        value={searchTerm}
        className='mb-2 rounded-5 p-2 form-control'
        id="form1"
      />
      </div>
      </div>
        
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
          <thead>
          <tr>
            <th>Uid</th>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Treatment</th>
            <th>Mobile</th>
            <th>Timing</th>
            <th>Status</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {currentRows.map((country, index) => (
            <tr key={index}>
              <td>{country.uid}</td>
              <td>{country.patient}</td>
              <td>{country.doctor}</td>
              <td>{country.treatment}</td>
              <td>{country.mobile}</td>
              <td>{country.timing}</td>
              <td>{country.status}</td>
              <td><div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul className="dropdown-menu">
  <li><a className="dropdown-item mx-0" href="#">Checked-In</a></li>
  <li><a className="dropdown-item mx-0" href="#">Checked-Out</a></li>
  <li><a className="dropdown-item mx-0" href="#">Complete</a></li>
  <li><a className="dropdown-item mx-0" href="#">Edit Appointment</a></li>
    <li><a className="dropdown-item mx-0" href="#">Cancle Appointment</a></li>
  
    <li><a className="dropdown-item mx-0" href="#"></a></li>
 
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
    </Wrapper>
  );
};

export default AppointTable;
const Wrapper = styled.div`
  #tableres {
    margin-top: 0rem;
    @media screen and (max-width: 768px) {
      width: 20rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
  }
  #title {
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
  }
`;