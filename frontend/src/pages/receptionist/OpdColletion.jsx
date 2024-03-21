import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/receptionist/Header";
import Sider from "../../components/receptionist/Sider";
import { Link } from "react-router-dom";
import { Table, Input, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import EditPatientDetails from "../../components/receptionist/AllPatients/EditPatientDetails";
import moment from "moment";
function OpdCollection() {
  const { refreshTable, currentUser } = useSelector((state) => state.user);
  const branch = currentUser.branch_name;
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Initialize with today's date
  const [appointmentsData, setAppointmentData] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDateChange = (increment) => {
    return () => {
      const currentDate = new Date(selectedDate);
      currentDate.setDate(currentDate.getDate() + increment);
      setSelectedDate(currentDate.toISOString().split('T')[0]);
    };
  };

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/receptionist/get-appointments/${branch}`
      );
     
      const filteredPatients = response?.data?.data.filter(patient =>  patient.created_at.includes(selectedDate));
      setAppointmentData(filteredPatients);
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    getAppointments();
  }, [refreshTable,selectedDate]);

  // Searching function
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page when searching

    const filteredResults = appointmentsData.filter(
      (row) =>
        row.patient_name.toLowerCase().includes(searchTerm) ||
        row.mobileno.includes(searchTerm) ||
        row.uhid.toLowerCase().includes(searchTerm)
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
  const currentRows = searchTerm
    ? filteredData.slice(indexOfFirstRow, indexOfLastRow)
    : appointmentsData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(appointmentsData.length / rowsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(appointmentsData.length / rowsPerPage); i++) {
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
    else if (
      index === pageNumbers.length - 3 &&
      currentPage < pageNumbers.length - 2
    ) {
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
console.log(appointmentsData)
  return (
    <Wrapper>
      <Header />

      <div className="row flex-nowrap ">
        <div className="col-lg-1 col-1" id="hd">
          <Sider />
        </div>
        <div className="col-lg-11 mt-2" id="set">
          <div className="row">
            <div className="col-lg-12" id="head">
              <nav class="navbar navbar-light bg-light">
                <h6 className="mx-3 my-0">Search By Patient</h6>
                <div class="container-fluid" id="cont">
                  <form class="navbar1 ">
                    <input
                      className="form-control me-2 rounded-5"
                      type="search"
                      placeholder="Enter Patient Name Or Moblie"
                      aria-label="Search"
                      onChange={handleSearch}
                      value={searchTerm}
                    />
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
                  <div className="d-flex align-items-center">
                  <FaArrowCircleLeft style={{ fontSize: '35px' , padding: "3px",cursor:"pointer" }} onClick={handleDateChange(-1)} />
        <input type="date" className="form-control "   value={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)}/>
        <FaArrowCircleRight style={{ fontSize: '35px',  padding: "3px" ,cursor:"pointer"}} onClick={handleDateChange(1)}/>
                  </div>
                  <div>

                    <h5>Total Patients - {appointmentsData.length}</h5>
                  </div>

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
              <div
                className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
                id="tableres"
              >
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>App. Id</th>
                        <th>UHID</th>
                        <th>Patient Name</th>
                        <th>Phone Number</th>
                        <th>App. Timing</th>
                        <th>Doctor Name</th>
                        <th>App. Status</th>
                        <th>OPD Amount</th>
                        <th>Payment Mode</th>
                        <th>Transaction Id</th>
                        <th>Payment Status</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((data, index) => (
                        <tr key={index}>
                          <td>{data.appoint_id}</td>
                          <td>
                            <Link to={`/patient_profile/${data.uhid}`}>
                              {data.uhid}
                            </Link>
                          </td>
                          <td>{data.patient_name}</td>
                          <td>{data.mobileno}</td>
                          <td>
                            {moment(
                              data?.appointment_dateTime,
                              "YYYY-MM-DDTHH:mm"
                            ).format("DD/MM/YYYY hh:mm A")}
                          </td>

                          <td>{data.assigned_doctor_name}</td>
                          <td>{data.appointment_status}</td>
                          <td>{data.opd_amount}</td>
                          <td>{data.payment_Mode}</td>
                          <td>{data.transaction_Id}</td>
                          <td>{data.payment_Status}</td>
                          <td>
                            {moment(data?.created_at).format("DD/MM/YYYY")}
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
                            {appointmentsData?.length} total entries){" "}
                          </>
                        ) : (
                          <>
                            Showing Page {currentPage} of {totalPages} from{" "}
                            {appointmentsData?.length} entries
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
                          disabled={indexOfLastRow >= appointmentsData.length}
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

export default OpdCollection;
const Wrapper = styled.div`
  .navbar1 {
    display: flex;
    width: 25%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  #cont {
    display: flex;
    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }
  #drop {
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  #head {
    @media screen and (max-width: 768px) {
      width: 85%;
      margin-left: 1.2rem;
    }
  }
  #hd {
    height: 44rem;
    @media screen and (max-width: 768px) {
      height: 68rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      height: 58rem;
    }
  }
  #tableres {
    @media screen and (max-width: 768px) {
      width: 21rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 42rem;
    }
  }
`;
