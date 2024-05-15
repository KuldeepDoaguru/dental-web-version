import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/MainComponents/Header';
import Sider from '../../components/MainComponents/Sider';
import { IoArrowBackSharp } from 'react-icons/io5';
import moment  from 'moment';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function YesterdayTest() {
  const navigate =   useNavigate();
  const [testData, setTestData] = useState([]);

  const goBack = () => {
    navigate('/');
      };

  useEffect(() => {
    const fetchYesterdayTest = async () => {
      try {
        const response = await axios.get('https://dentalgurulab.doaguru.com/api/lab/get-patient-test-details');
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayTests = response.data.filter(test => new Date(test.created_date).toDateString() === yesterday.toDateString());
        setTestData(yesterdayTests);
      } catch (error) {
        console.error('Error fetching yesterday test data:', error);
      }
    };

    fetchYesterdayTest();
  }, []);
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
    <div>
    <div className="d-print-none">
        <Header />
      </div>
      <div className="row flex-nowrap ">
            <div className="col-xxl-1 col-xl-1 col-lg-1 d-print-none col-sm-1 p-0">
              <Sider />

              </div>
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 p-0" style={{marginTop:"5rem"}}>
              
            <IoArrowBackSharp
            className="fs-1 text-black d-print-none"
            onClick={goBack}
            style={{ cursor: "pointer" }}
          /> 
              
              <div className="container-fluid">
<h2 className='mx-2 mt-2'>Yesterday Test Data</h2>
<div className="mx-2" style={{ maxHeight: "700px", overflow: "auto" }}>
<table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Paitent Test Id </th>
          <th>Patient UHID</th>
          <th>Patient Name</th>
          <th>Test</th>
          <th>Date</th>
          <th>Action</th>
         
        </tr>
      </thead>
      <tbody>
        {testData.map((test, index) => (
          <tr key={test.id}>
            <td>{index + 1}</td>
            <td>{test.testid}</td>
            <td>{test.patient_uhid}</td>
            <td>{test.patient_name}</td>
            <td>{test.test}</td>
            <td>{moment(test.created_date).format("DD/MM/YYYY")}</td>  

          
            <td><div className=""> <Link to={`/final-oral-testing/${test.testid}`}>
                    <button className="btn btn-success m-1">View</button>
                  </Link>
                 <button className="btn btn-danger mx-sm-0 mx-lg-2 m-1" onClick={() => handleDelete(test.testid)}>Delete</button>
</div></td> 
          </tr>
        ))}
      </tbody>
    </table>
    </div>
</div>

  
 </div>
 </div>



   
  </div>
  );
}

export default YesterdayTest;
