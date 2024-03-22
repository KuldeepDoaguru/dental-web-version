import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/receptionist/Header'
import Sider from '../../components/receptionist/Sider'
import { Link } from 'react-router-dom'
import { Table, Input, Button, Form } from "react-bootstrap";
import { useDispatch ,useSelector} from 'react-redux';
import axios from 'axios'
import EditInquiry from '../../components/receptionist/ReceptioinstDashboard/EditInquiry';
import { toggleTableRefresh } from '../../redux/user/userSlice';
import moment from 'moment'
import cogoToast from 'cogo-toast'
function Inquiry() {

  const user = useSelector((state) => state.user);
  const {refreshTable} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const  branch = user.currentUser.branch_name;
  const [inquiries,setInquiries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors,setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({
    doctorId: "",
    doctorName : ""
  }); // State to store the selected Doctor

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState("");

  const getDoctors = async ()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-doctors/${branch}`);
      setDoctors(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }
  const getInquiries = async ()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-inquiries/${branch}`);
      setInquiries(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    
    getDoctors();
    getInquiries();
  
  },[]);
  useEffect(()=>{
    
  
    getInquiries();
  
  },[refreshTable]);

  const [formData,setFormData] = useState({
    branch : branch,
    patientName : "",
    mobile : "",
    email: "",
    gender : "",
    age : "",
    address : "",
    notes : ""


  })



  // Searching function
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page when searching

    const filteredResults = inquiries.filter((row) =>
      row.patient_name.toLowerCase().includes(searchTerm) || row.mobile.includes(searchTerm)
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
const currentRows = searchTerm ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : inquiries.slice(indexOfFirstRow, indexOfLastRow);


const totalPages = Math.ceil(inquiries.length / rowsPerPage);

const paginate = (pageNumber) => {
  if (pageNumber > 0 && pageNumber <= totalPages) {
    setCurrentPage(pageNumber);
  }
};

const pageNumbers = [];
for (let i = 1; i <= Math.ceil(inquiries.length / rowsPerPage); i++) {
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

const handleDoctorChange = (e)=>{
  const { value } = e.target;

  // Assuming the value format is "Doctor Name - Doctor ID"
  const [doctorName, doctorId] = value.split(' - ');

  setSelectedDoctor({
    doctorName,
    doctorId
  });
}
console.log(selectedDoctor)

const handleChange = (e)=>{
    const {name,value} = e.target;

    setFormData({...formData,
    [name]: value})
}

const handleSubmit =async (e)=>{
  e.preventDefault();

  const newData = {
    ...formData,
    ...selectedDoctor

  }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/receptionist/add-inquiry', newData);
      console.log(response);
      if (response.data.success) {
       cogoToast.success(response?.data?.message);
        // dispatch(toggleTableRefresh());
        setFormData({
          branch:branch,
          patientName: "",
          mobile: "",
          email: "",
          gender: "",
          age: "",
          address: "",
          notes: ""
        })

        getInquiries();
      }
      
     else {
    cogoToast.error(response?.data?.message);
  }

}
 catch(error){
   console.log(error)
      cogoToast.error(error?.response?.data?.message);

 }
  
};

const handleEdit = (inquiry)=>{
  setSelectedInquiry(inquiry)
  setShowEditPopup(true);
}
const handleDelete = async (id)=>{
  
 
  try {
    const response = await axios.delete(`http://localhost:4000/api/v1/receptionist/delete-inquiry/${id}`);
    console.log(response);
    if (response.data.success) {
        dispatch(toggleTableRefresh());
      cogoToast.success(response?.data?.message);
      
      
     

      
    }
    
   else {
 cogoToast.error(response?.data?.message);
}

}
catch(error){
 console.log(error)
    cogoToast.error(error?.response?.data?.message);

}
}


  return (
    <Wrapper>
        <Header/>
      
        <div className="row flex-nowrap ">
    <div className="col-lg-1 col-1" id='hd'>
   <Sider/>
    </div>
    <div className="col-lg-11 mt-2" id='set'>
        <div className='row mb-5 inquiry-form w-75'>
            <div className='col-12'>
                <h5 className='text-center'>Add Inquiry</h5>
            <form onSubmit={handleSubmit}>
  <div className='row justify-content-center'>
    <div className='col-5'>
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Patient Name</label>
    <input type="text" class="form-control" onChange={handleChange} value={formData.patientName} required name="patientName" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>
  </div>
  <div className='col-5'>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Mobile</label>
    <input type="text" maxLength={10} minLength={10}  onChange={handleChange} value={formData.mobile} required class="form-control" name="mobile" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>
    </div>
    </div>              
  <div className='row justify-content-center'>
    <div className='col-5'>
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" value={formData.email} onChange={handleChange} name="email" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>
  </div>
  <div className='col-5'>
  <div class="mb-3">
  <label className="form-label" htmlFor="">Gender</label>
    <select className="form-select" value={formData.gender} id="gender" name="gender"  onChange={handleChange}  >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
     
    </select>
  
  </div>
    </div>
    </div>  
  <div className='row justify-content-center'>
    <div className='col-5'>
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Age</label>
    <input type="text" class="form-control" value={formData.age} name="age" id="exampleInputEmail1"  onChange={handleChange} aria-describedby="emailHelp"/>
  
  </div>
  </div>
  <div className='col-5'>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Inquiry for Doctor</label>
    <select className="form-select" id="gender"  name="doctorName"  onChange={handleDoctorChange}>
    <option value="">Select Doctor</option>
      {doctors?.map((doctor) => (
            <option value={`${doctor.employee_name} - ${doctor.employee_ID}`}>{doctor.employee_name}</option>
      ))}
      
      
     
    </select>
  
  </div>
    </div>
    </div> 
    <div className='row justify-content-center'>
    <div className='col-5'>
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Address</label>
    <input type="text" class="form-control" value={formData.address} onChange={handleChange} name="address" id="exampleInputEmail1" aria-describedby="emailHelp"/>
     
  </div>
  </div>
  <div className='col-5'>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Notes</label>
    <input type="text" class="form-control" value={formData.notes} name="notes" required onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>
    </div>
    </div>  
            
 
  
 <div className='text-center'>
 <button type="submit" class="btn btn-primary">Submit</button>
 </div>
 
</form>
            </div>
        </div>
      <div className="row" >
   <div className="col-lg-12" id='head'>
   <nav class="navbar navbar-light bg-light">
            <h6 className='mx-3 my-0'>Search By Patient</h6>
  <div class="container-fluid" id='cont'>
    <form class="navbar1 " >
      <input className="form-control me-2 rounded-5" type="search" placeholder="Enter Patient Name Or Mobile" aria-label="Search" onChange={handleSearch}
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
    <div><h5>Total Patients - {inquiries.length}</h5></div>
    
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
                    
                    
                    <div className="table-responsive" style={{ overflowX: "auto" }}>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Patient Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Inquiry for Doctor</th>
                            <th>Notes</th>
                            <th>Created At</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRows.map((data,index)=>(
                             <tr key={index}>
                             <td>{data.id}</td>
                             <td>{data.patient_name	}</td>
                             <td>{data.mobile}</td>
                             <td>{data.email}</td>
 
                             <td>{data.gender}</td>
                             <td>
                             {data.address}
                             </td>
                             <td>{data.doctorName}</td>
                             <td>{data.notes}</td>
                             <td>{moment(data?.created_at).format('DD/MM/YYYY') }</td>
                             <td><div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul className="dropdown-menu">
    
  <li><a className="dropdown-item mx-0" onClick={() => handleEdit(data)}>Edit </a></li> 
  <li><a className="dropdown-item mx-0"  onClick={() => handleDelete(data.id)}>Delete</a></li>
  
  
  
  </ul>
</div> </td>
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
                       {searchTerm ?<> Showing Page {currentPage} of {totalPages} from {filteredData?.length} entries (filtered from {inquiries?.length} total entries) </> : <>Showing Page {currentPage} of {totalPages} from {inquiries?.length} entries</> }  

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
                          disabled={indexOfLastRow >= inquiries.length}
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
   {showEditPopup && (
        <EditInquiry onClose={() => setShowEditPopup(false)} inquiryInfo={selectedInquiry}/>
      )} 
 
    </Wrapper>
  )
}

export default Inquiry;
const Wrapper = styled.div`
overflow: hidden;
.navbar1{
  display: flex;
  width: 25%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
/* .table{
  overflow: scroll;
} */
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
   
  }
}
.inquiry-form{
   padding: 20px;
   background-color: #f2f2f2;
   margin: auto;
   
}
th{
    background-color: teal;
  }

`