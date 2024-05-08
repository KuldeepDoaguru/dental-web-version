import axios from 'axios';
import React, { useEffect, useState } from 'react'
import moment from "moment";
import Header from '../../components/MainComponents/Header';
import Sider from '../../components/MainComponents/Sider';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

function PaymentHistory() {
 
const [patientDetails, setPatientDetails] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const navigate = useNavigate()
 
 
 
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/get-patient-test-details`
        );
        setPatientDetails(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);

const filteredPatients = patientDetails.filter(patient => {
    const fullName = `${patient.patient_uhid} ${patient.patient_name}`.toLowerCase();
    const formattedDate = moment(patient.created_date).format("YYYY-MM-DD");
    return fullName.includes(searchQuery.toLowerCase()) && (!dateFilter || formattedDate === dateFilter);
  });


  const goBack = () => {
    window.history.go(-1);
  };
  const handleTopPageLink = () => {
    window.scrollTo(0, 0);
  };

  const handlePrintPayment = async(id , test) => {

    try{
     
      navigate(`/Payment-Print/${id}`, { state: { test } });
      handleTopPageLink()
      
    }catch(error){
console.log("Error " , error);
    }
    
  };

  return (
   <Wrapper>
 
          <Header />
       
       



   <div clasNameName="main">
          <div className="container-fluid">
          <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-1 p-0">
                <Sider />

                </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11" style={{marginTop:"5rem"}}>
              <IoArrowBackSharp
                  className="fs-1 text-black d-print-none"
                  onClick={goBack}
                />

               
    <div className=" mt-4 mx-3">
        <h2 style={{color:"#213555"}}>List of Payment History</h2>
        <div className="mb-3">
        <div className="row">
          <div className="col-lg-2">
          <input
            type="text"
            placeholder="Search by UHID or  Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
          </div>
          <div className="col-lg-2">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="form-control"
          />
          </div>
        </div>
         
        
        </div>
        <div className="" style={{ maxHeight: "700px", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient UHID </th>
                <th>Patient Name </th>
                <th> Test Name </th>
                <th> Payment </th>
                <th>Payment Status  </th>
            
                <th>Created Date</th>

                <th>Action </th>
              </tr>
            </thead>
       

<tbody>
  {filteredPatients.map((patient, index) => (
    <>
      {patient.payment_status === "done" && (
      <tr key={patient.testid}>
        <td>{index + 1}</td>
        <td>{patient.patient_uhid}</td>
        <td>{patient.patient_name}</td>
        <td>{patient.test}</td>
        <td>{patient.payment}</td>
        <td><Button
            className="btn-success"
            variant="success"
            style={{
              '--bs-btn-padding-y': '.25rem',
              '--bs-btn-padding-x': '.9rem',
              '--bs-btn-font-size': '.75rem',
              fontSize: '.75rem',
              marginRight: '5px',
            }}
          >{patient.payment_status}</Button></td>
        <td>{moment(patient.created_date).format("DD/MM/YYYY")}</td>
        {/* <td>{patient.test}</td>
      
        <td>  <Button
            className="btn-success"
            variant="success"
            style={{
              '--bs-btn-padding-y': '.25rem',
              '--bs-btn-padding-x': '.9rem',
              '--bs-btn-font-size': '.75rem',
              fontSize: '.75rem',
              marginRight: '5px',
            }}
          >{patient.test_status}
          </Button>
          </td>
        */}
       <td><div className=""> 
                 <button className="btn btn btn-success mx-sm-0 mx-lg-2 m-1"  onClick={() => handlePrintPayment(patient.testid,patient.test)}>View</button>
</div></td>  
       
       
        
      </tr>
    )}
    
    </>
    // Wrap the entire row inside a conditional statement based on test status
  
  ))}
</tbody>


          </table>
        </div>
      </div>
   
   </div>
   </div>
          </div>
        </div>
   </Wrapper>
  )
}

export default PaymentHistory


const Wrapper  = styled.div`

width: 100%;
  th{
  background-color: #213555;
    color: white;
}
`