import axios from 'axios';
import React, { useEffect, useState } from 'react'
import moment from "moment";
import Header from '../../components/MainComponents/Header';
import Sider from '../../components/MainComponents/Sider';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function HistoryTest() {
 
const [patientDetails, setPatientDetails] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
 
  
  const currentUser = useSelector(state => state.auth.user);
  
  const token = currentUser?.token;

 
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/get-patient-details`
          ,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
          });
        setPatientDetails(response.data.result);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);

const filteredPatients = patientDetails.filter(patient => {
     const fullName = `${patient.patient_name}`.toLowerCase();
    const formattedDate = moment(patient.created_date).format("YYYY-MM-DD");
    return fullName.includes(searchQuery.toLowerCase()) && (!dateFilter || formattedDate === dateFilter);
  });


  const goBack = () => {
    window.history.go(-1);
  };


  const handleDelete = async (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this patient detail ?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `https://dentalgurulab.doaguru.com/api/lab/patent-details/${id}`
        );

        if (response.status === 200) {
          console.log("Patient Lab detail deleted successfully");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting Patient Lab detail:", error);
      }
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
              <IoArrowBackSharp  className="fs-1 text-black d-print-none" onClick={goBack}   style={{cursor:"pointer"}}/>

               
    <div className=" mt-4 mx-3">
        <h2 style={{color:"#213555"}}>List of  Tests</h2>
        <div className="mb-3">
        <div className="row">
          <div className="col-lg-2">
          <input
            type="text"
            placeholder="Search by Patient Name"
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
                <th> Age </th>
                <th> Gender </th>
                <th>Branch Name </th>
                <th>Assigned Doctor Name</th>
                <th>Lab Name</th>
                <th>Created Date</th>
                <th>Tests Name </th>
                <th>Status </th>
                <th>Action </th>
              </tr>
            </thead>
       

<tbody>
  {filteredPatients.map((patient, index) => (
    <>
      {patient.test_status === "done" && (
      <tr key={patient.testid}>
        <td>{index + 1}</td>
        <td>{patient.patient_uhid}</td>
        <td>{patient.patient_name}</td>
        <td>{patient.age}</td>
        <td>{patient.gender}</td>
        <td>{patient.branch_name}</td>

        <td>{patient.assigned_doctor_name}</td>
        <td>{patient.lab_name}</td>
        <td>{moment(patient.created_date).format("DD/MM/YYYY")}</td>
        <td>{patient.test}</td>
      
        <td className=" text-success fw-bold"> {patient.test_status}
       
          </td>
        
       <td><div className=""> <Link to={`/final-oral-testing/${patient.testid}`}>
                    <button className="btn btn-success m-1">View</button>
                  </Link>
                 <button className="btn btn-danger mx-sm-0 mx-lg-2 m-1" onClick={() => handleDelete(patient.testid)}>Delete</button>
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

export default HistoryTest


const Wrapper  = styled.div`

width: 100%;
  th{
  background-color: #213555;
    color: white;
}
`