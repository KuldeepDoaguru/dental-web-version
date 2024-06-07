import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/receptionist/Header'
import Sider from '../../components/receptionist/Sider'
import { Table, Input, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EditPatientDetails from '../../components/receptionist/AllPatients/EditPatientDetails'
import moment from 'moment'
import MakePayment from '../../components/receptionist/SecurityAmount/MakePayment';
import cogoToast from 'cogo-toast';
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../images/animation/loading-effect.json";

function 
PatientsDue() {
  
  const {refreshTable,currentUser} = useSelector((state) => state.user);
  const  branch = currentUser.branch_name;
  const token = currentUser?.token;
  const [loadingEffect, setLoadingEffect] = useState(false);

  
  const [patBill, setPatBill] = useState([]);

  const getPatBills = async () => {
    setLoadingEffect(true);
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getPatientBillsByBranch/${branch}`
        ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      setPatBill(data);
      setLoadingEffect(false);
    } catch (error) {
      console.log(error);
      setLoadingEffect(false);
    }
  };

  console.log(patBill);
  const filterForUnPaidBills = patBill?.filter((item) => {
    return item.payment_status !== "paid" &&  (item.total_amount - (item.paid_amount + item.pay_by_sec_amt)) !== 0;
  });



  useEffect(() => {
    getPatBills();
  }, []);

  console.log(patBill);










//   const [showEditPatientPopup, setShowEditPatientPopup] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");



  // Searching function
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page when searching

    const filteredResults = filterForUnPaidBills.filter((row) =>
      row?.patient_name.toLowerCase().includes(searchTerm.trim()) || row?.patient_mobile.includes(searchTerm.trim()) || row?.uhid.toLowerCase().includes(searchTerm.trim())
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
const currentRows = searchTerm ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : filterForUnPaidBills.slice(indexOfFirstRow, indexOfLastRow);


const totalPages = Math.ceil(filterForUnPaidBills.length / rowsPerPage);

const paginate = (pageNumber) => {
  if (pageNumber > 0 && pageNumber <= totalPages) {
    setCurrentPage(pageNumber);
  }
};

const pageNumbers = [];
for (let i = 1; i <= Math.ceil(filterForUnPaidBills.length / rowsPerPage); i++) {
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
      
        <div className="row flex-nowrap ">
    <div className="col-lg-1 col-1" id='hd'>
   <Sider/>
    </div>
    <div className="col-lg-11 mt-2" id='set'>
    <div className='text-center'>
      <h3>All Patients Due Data</h3>
    </div>
      <div className="row" >
   <div className="col-lg-12" id='head'>
   <nav class="shadow rounded navbar navbar-light bg-light">
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
    <div><h5>Total Patients - {filterForUnPaidBills.length}</h5></div>
    
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
   <div className="widget-area-2 proclinic-box-shadow  mt-5" id='tableres'>
                    
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
                                  <th className="table-sno sticky">TPID</th>
                                  <th className="sticky">Patient UHID</th>
                                  <th className=" sticky">Patients Name</th>
                                  <th className=" sticky">Patients Mobile</th>
                                  <th className=" sticky">Patients Email</th>
                                  <th className=" sticky">Doctor Name</th>
                                  <th className=" sticky">Total Amount</th>
                                  <th className=" sticky">
                                    Paid By Direct Amount
                                  </th>
                                  <th className=" sticky">
                                    Paid By Secuirty Amt
                                  </th>
                                  <th className=" sticky">Due Amount</th>
                                  <th className=" sticky">Bill Date</th>
                                  <th className=" sticky">Action</th>
                                </tr>
                        </thead>
                        {  currentRows.length === 0 ? (
              <div className="no-data-container">
              <h4>No Data Found</h4>
            </div>
            ) : (
                        <tbody>
                        {currentRows?.map((item) => (
                                  <>
                                    <tr className="table-row">
                                      <td className="table-sno">
                                        {item.tp_id}
                                      </td>
                                      <td><Link to={`/patient_profile/${item.uhid}`}>{item.uhid}</Link></td>
                                      <td>{item.patient_name}</td>
                                      <td>{item.patient_mobile}</td>
                                      <td>{item.patient_email}</td>
                                      <td>{item.assigned_doctor_name}</td>
                                      <td>{item.total_amount}</td>
                                      <td>{item.paid_amount}</td>
                                      <td>{item.pay_by_sec_amt}</td>
                                      <td>
                                        {item.total_amount -
                                          (item.paid_amount +
                                            item.pay_by_sec_amt)}
                                      </td>
                                      <td>{moment(item.bill_date.split("T")[0]).format('DD/MM/YYYY')}</td>
                                      <td>
                                          <Link
                                            to={`/PatintDuePaymentPrint/${item.bill_id}/${item.tp_id}/${item.uhid}`}
                                          >
                                            <button
                                              className="btn"
                                              style={{
                                                backgroundColor: "#FFA600",
                                              }}
                                            >
                                              Pay Now
                                            </button>
                                          </Link>
                                        
                                      </td>
                                    </tr>
                                  </>
                                ))}
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
                       {searchTerm ?<> Showing Page {currentPage} of {totalPages} from {filteredData?.length} entries (filtered from {filterForUnPaidBills?.length} total entries) </> : <>Showing Page {currentPage} of {totalPages} from {filterForUnPaidBills?.length} entries</> }  

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
                          disabled={indexOfLastRow >= filterForUnPaidBills.length}
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

export default PatientsDue;
const Wrapper = styled.div`
overflow: hidden;
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
#hd{
  padding-top: 60px; /* Height of header */
  min-height: 100vh;
  position: fixed;
  @media screen and (max-width: 768px) {
   height: 68rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
   height: 58rem;
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
#tableres{
  @media screen and (max-width: 768px) {
    width: 21rem;
   
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
th{
  background-color: teal;
  color: white;
  white-space: nowrap;
  
}
td{
  white-space: nowrap;
}

.popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: scroll;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
    z-index: 200;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    height: auto;
    width: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    
  }
  .header{
  position: fixed;
  min-width: 100%;
  z-index: 100;
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
