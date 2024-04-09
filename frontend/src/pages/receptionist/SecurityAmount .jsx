import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/receptionist/Header'
import Sider from '../../components/receptionist/Sider'
import { Link } from 'react-router-dom'
import { Table, Input, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EditPatientDetails from '../../components/receptionist/AllPatients/EditPatientDetails'
import moment from 'moment'
import MakePayment from '../../components/receptionist/SecurityAmount/MakePayment';
import cogoToast from 'cogo-toast';

function SecurityAmount() {
  
  const {refreshTable,currentUser} = useSelector((state) => state.user);
  const  branch = currentUser.branch_name
  const [patients, setPatients] = useState([]);
  
  const [showEditPatientPopup, setShowEditPatientPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const [showEditSecAmount, setShowEditSecAmount] = useState(false);
  const [outStanding, setOutStanding] = useState([]);
  const [selected, setSelected] = useState();
  const date = new Date();
  const [refAmount, setRefAmount] = useState("");

  const filterForSecAmountDef = patients.filter((item) => {
    return item.sa_id === selected;
  });

  

  

  const MakeRefund = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/receptionist/updateRefundAmount/${selected}`,
        {
          refund_date: date,
          refund_by: currentUser.employee_name,
          payment_status: "Refunded",
          refund_amount: refAmount,
        }
      );
      cogoToast.success("Amount Refunded Successfully");
      getPatient();
      closeUpdatePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const openSecAmountSubPopup = (id) => {
    setShowEditSecAmount(true);
    getTotaloutstanding(id);
    setSelected(id);
  };

  const closeUpdatePopup = () => {
    setShowEditSecAmount(false);
    
  };



  const getTotaloutstanding = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/receptionist/getSecurityAmountDataBySID/${id}`
      );
      console.log(data);
      setOutStanding(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterForOut = outStanding?.filter((item) => {
    return item.payment_status !== "success";
  });

  const totalPrice = () => {
    try {
      let total = 0;
      filterForOut.forEach((item) => {
        total = total + parseFloat(item.total_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
 
  const totalValue = totalPrice();



  const makeRefData = () => {
    if (outStanding.length === 0) {
      return filterForSecAmountDef[0]?.amount;
    } else {
      return outStanding[0]?.amount - totalValue;
    }
  };
  console.log(totalValue)
  const amtRefund = makeRefData();
  console.log(amtRefund);
  useEffect(() => {
    setRefAmount(amtRefund);
  }, [amtRefund]);

  const getPatient = async () =>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/patient-securityAmt/${branch}`);
      console.log(response);
      setPatients(response?.data?.data)
     }
     catch(error){
        console.log(error)
     }
    
  }

  console.log(patients)

  useEffect(()=>{
    getPatient();
    
    
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
      row?.patient_name.toLowerCase().includes(searchTerm) || row?.patient_number.includes(searchTerm) || row?.uhid.toLowerCase().includes(searchTerm)
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
       <div className='header'>
      <Header/>
      </div>
      
        <div className="row flex-nowrap ">
    <div className="col-lg-1 col-1" id='hd'>
   <Sider/>
    </div>
    <div className="col-lg-11 mt-2" id='set'>
    <div className='text-center'>
      <h3>Security Amount</h3>
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
   <div className="widget-area-2 proclinic-box-shadow  mt-5" id='tableres'>
                    
                    
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                          <th>Date</th>
                            <th>App. ID</th>
                            <th>UHID</th>
                            <th>Patient Name</th>
                            <th>Mobile</th>
                            <th>Doctor</th>
                            <th>Security Amount</th>
                            <th>Payment Status</th>
                            <th>Payment Mode</th>
                            <th>Transaction Id</th>
                            <th>Payment Date</th>
                            <th>Refund Date</th>
                            <th>Refund Amount</th>

                            <th>Notes</th>
                            <th>Action</th>
                            <th>Print</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRows.map((data,index)=>(
                             <tr key={index}>
                             <td>{data?.date ? moment(data?.date, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY') : ""}</td>
                             <td>{data.appointment_id}</td>
                             <td><Link to={`/patient_profile/${data.uhid}`}>{data.uhid}</Link></td>
                             <td>{data.patient_name}</td>
                             <td>{data.patient_number}</td>
                             <td>{data.assigned_doctor}</td>
 
                             <td>{data.amount}</td>
                             <td>{data.payment_status}</td>
                             <td>{data.payment_Mode}</td>
                             <td>{data.transaction_Id}</td>
                             <td>{data.payment_date ? moment(data?.payment_date).format('DD/MM/YYYY') : ""}</td>
                             <td>{data?.refund_date ? moment(data?.refund_date, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY') : ""}</td>
                             <td>{data?.refund_amount}</td>
                             <td>{data.notes}</td>
                             
                           
                            
                             <td ><div className='dropdown'>
                             <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul className="dropdown-menu">
   
 {data.payment_status === "success" &&  <li><a className="dropdown-item mx-0"  onClick={() =>
                                        openSecAmountSubPopup(data.sa_id)
                                      }>Rufund</a></li> } 
 {data.payment_status === "pending" &&  <li><a className="dropdown-item mx-0" onClick={()=>handleEditPatient(data)}>Make Payment</a></li> } 
 
 
  
 
  </ul>
  </div></td>
  <td> {data.payment_status === "success" ? (<Link to={`/print_security_amount/${data.sa_id}`}>  <button type="button" className="btn btn-primary">Print</button> </Link>) : (  <button type="button" className="btn btn-primary" disabled>Print</button>)} </td>
                           </tr>
                          ))}
                          
                          
                         
                        </tbody>
                      </table>
                    </div>
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
                       {searchTerm ?<> Showing Page {currentPage} of {totalPages} from {filteredData?.length} entries (filtered from {patients?.length} total entries) </> : <>Showing Page {currentPage} of {totalPages} from {patients?.length} entries</> }  

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


   {/* pop-up for refund amount */}
   <div
            className={`popup-container${showEditSecAmount ? " active" : ""}`}
          >
            <div className="popup">
              <h4 className="text-center">Refund Amount</h4>
              <hr />
              <form className="d-flex flex-column" onSubmit={MakeRefund}>
                <div className="container">
                  <div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Security Amount Submitted -{" "}
                        {outStanding.length === 0
                          ? filterForSecAmountDef[0]?.amount
                          : outStanding[0]?.amount}
                      </label>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Total Outstanding - {totalValue}
                      </label>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Refund Amount :
                        {outStanding.length === 0
                          ? filterForSecAmountDef[0]?.amount
                          : outStanding[0]?.amount - totalValue}
                      </label>
                      {/* <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter Amount"
                        name="refund_amount"
                        value={
                          outStanding.length === 0
                            ? filterForSecAmountDef[0]?.amount
                            : outStanding[0]?.amount - totalValue
                        }
                        onChange={handleInputChange}
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success mt-2">
                    Refund
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 mx-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>



   {showEditPatientPopup && (
        <MakePayment onClose={() => setShowEditPatientPopup(false)} patientInfo={selectedPatient} />
      )} 
 
    </Wrapper>
  )
}

export default SecurityAmount;
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
@media screen and (min-width: 1500px) and (max-width: 2000px) {
  margin-left: -1.9rem;
  
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

`
