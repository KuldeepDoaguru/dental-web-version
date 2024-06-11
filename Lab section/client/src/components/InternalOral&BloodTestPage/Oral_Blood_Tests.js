import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Footer from '../MainComponents/Footer'
import Sider from '../MainComponents/Sider'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import signature from "../../Pages/signature_maker_after_.webp";
import Header from '../MainComponents/Header'
import axios from 'axios'
import cogoToast from "cogo-toast";
import styled from 'styled-components'
import { useSelector } from 'react-redux'

function   Oral_Blood_Tests() {
  // const [patientDetails, setPatientDetails] = useState([]);
  const [patientbill_no , setPatientbill_no] = useState('')
  const [patientUHID , setPatientUHID] = useState('')
  const [patientName , setPatientName] = useState('')
  const [patienttid , setPatienttid] = useState('')
  
  const [patientbranch_name , setPatientbranch_name] = useState('')
  const [patientAssigned_Doctor_Name , setPatientAssigned_Doctor_Name] = useState('')
  const [patienttest , setPatienttest] = useState('')
  const [patientresult , setPatientresult] = useState('')
  const [patientunit , setPatientunit] = useState('')
  const [patientcost , setPatientcost] = useState('')
  const [patientcollection_date , setPatientcollection_date] = useState('')
  const [patientauthenticate_date , setPatientauthenticate_date] = useState('')
 
  const [labName , setLabName] = useState('')
  const [labType , setLabType] = useState('Internal')
  const [labtestpayment , setLabtestpayment] = useState(1500);
  const [labtestpaymentstatus , setLabtestpaymentstatus] = useState('done');
  const [loading , setLoading] = useState(false);

  const location = useLocation();
 const navigate = useNavigate();
 const [resultError, setResultError] = useState('');
  const [unitError, setUnitError] = useState('');
 
 const currentUser = useSelector(state => state.auth.user);
  
 const token = currentUser?.token;
 const branch = currentUser.branch_name
 const address = currentUser.address
  const goBack = () => {
   navigate('/')
  };

  

  const {id} = useParams();

  useEffect(() => {
    if (location.state && location.state.test) {
      const { test, cost } = location.state;
      setPatienttest(test);
      setPatientcost(cost); // Set the patient cost if available
    }
  }, [location.state]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/get-patient-details-by-id/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }}
        );
        setPatientbill_no(response.data[0].testid)
         setPatientUHID(response.data[0].patient_uhid)
         setPatientName(response.data[0].patient_name)
         setPatientbranch_name(response.data[0].branch_name)
         setPatientAssigned_Doctor_Name(response.data[0].assigned_doctor_name)
         setLabName(response.data[0].lab_name)
         setPatienttid(response.data[0].tpid)

         console.log(labName);


        
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);

  const handleResultChange = (e) => {
    const value = e.target.value;
    const alphaRegex = /^[A-Za-z\s]*$/;

    if (alphaRegex.test(value)) {
      setResultError('');
      setPatientresult(value);
    } else {
      setResultError('Result should contain only alphabetic characters.');
    }
  };

  const handleUnitChange = (e) => {
    const value = e.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(value)) {
      setUnitError('');
      setPatientunit(value);
    } else {
      setUnitError('Unit should contain only numeric characters.');
    }
  };


const hundleSumbit = async () => {
  
  // Check if all required fields are filled
  if (
    patientcollection_date === ''
  ) {
    alert('Please fill patient collection date.');
    return;
  }
  if (
    patientauthenticate_date === ''
  ) {
    alert('Please fill patient authenticate date.');
    return;
  }
  if (
    patientresult === ''
  ) {
    alert('Please fill patient result .');
    return;
  }
  if (labName==='oral' && patientunit === '') {
    alert('Please fill patient unit .')
    return;
  }
  if (labName==='pathology' && patientunit === '') {
    alert('Please fill patient unit .')
    return;
  }
  if (labName==='radiology' && patientcost === '') {
    alert('Please fill patient cost .')
    return;
  }
 

 

  
  try {
    setLoading(true)
    // Update the test status
    const responsee = await axios.put(`https://dentalgurulab.doaguru.com/api/lab/update-test-status/${id}`,[],
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }});
    if (responsee.status === 200) {
      console.log('Test status successfully updated');
    }

    // Submit the patient test details
    const response = await axios.put(
      `https://dentalgurulab.doaguru.com/api/lab/update-patent-test-data/${patientbill_no}`,
      {
        test: patienttest , result:patientresult, unit:patientunit,cost:patientcost ,collection_date: patientcollection_date,authenticate_date:patientauthenticate_date,
 lab_type:labType
      
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }}
    );

    navigate(`/final-oral-testing/${patientbill_no}`);

    // Check if the submission was successful
    if (response.data.success === true) {
      // Display success message
      cogoToast.success(`${response.data.message}`);
    

      // Fetch the patient test data after submission
    } else {
      console.error('Error uploading patient test data');
    }
  } catch (error) {
    setLoading(false)
    console.error('Server Error:', error.message);
  }
};






  return (
   <Wrapper>
     <div className="">
     <div className="d-print-none">
          <Header />
        </div>
           

          </div>
              
          <div clasNameName="main">
          <div className="container-fluid">
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
                <div className="">
                  <div className="row">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-6 mt-4">
                        <div>
                            <h5>Branch : {branch}</h5>
                          </div>
                          <form className="d-flex fw-semibold">
                            <p>Address </p>
                            <p className="ms-1"> : </p>
                            <p className="ms-2">
                             {address}
                            </p>
                          </form>

                          <form className="d-flex">
                            <h5>Email id : </h5>
                            <h5 className="ms-2">DentalGuru@Gmail.com</h5>
                          </form>

                          <form className="d-flex ms-auto my-sm mt-1">
                            <h5>Contact Number : </h5>
                            <h5 className="ms-2">+91-7000000058 </h5>
                          </form>
                        </div>

                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 mt-4">
                          <div className="text-center mt-2 footer">
                            <img
                              className="ms-4"
                              src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
                              alt="Logo"
                              width="100"
                              height="85"
                            />
                            <h3 className="ms-2">Dental Guru</h3>
                          </div>
                        </div>
                     
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      color: "Grey",
                      height: "2px",
                    }}
                  />

                  <div className="row d-flex justify-content-between ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="col-lg-3 ">
          <label className="form-check-label mb-2">
            Lab Types
            <input
            className='form-control'
              type="text"
              value={labType}
      
             
            />
          </label>
          </div>
                      <div class="table-responsive rounded">
                        <table class="table tables table-bordered rounded shadow">
                     
                          <tbody>
                            <tr className="table-row">
                      
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Bill No. : {patientbill_no}
                               
                        
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                UHID :    {" "}
                               {patientUHID}
                                 
                       
                              </td>
                            </tr>
                          </tbody>

                          {/* <tbody>
                            <tr
                              className="
                            table-row"
                            >
                              <td
                                colSpan="2"
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Patient Name :
                                <input
                                  type="text"
                                  className="border border-0 ms-3 w-50"
                                  value={patientName}
                                  onChange={(e)=>setPatientName(e.target.value)}
                                />
                              </td>
                            </tr>
                          </tbody> */}

                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                              Treatment Id :  {patienttid}
                    
                 
                                
                                
                              </td>

                              <td
                                colSpan="2"
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Patient Name :   {patientName}
                             
                              </td>

                              
                              {/* <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Bill Date :
                                <input
                                  type="date"
                                  className="border border-0 ms-2"

                                />
                              </td> */}
                            </tr>
                          </tbody>
                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Advised By :{" "}
                               {patientAssigned_Doctor_Name}
                                 
                             
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Collection Date :{" "}
                                <input
                                  type="date"
                                  className="border border-0 ms-2"
                                  value={patientcollection_date}
                                  onChange={(e)=>setPatientcollection_date(e.target.value)}
                                  required
                                />
                              </td>
                            </tr>
                          </tbody>

                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Center Name : {" "}
                               {patientbranch_name}
                       
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Authenticate Date:{" "}
                                <input
                                  type="date"
                                  className="border border-0 ms-2"
                                  value={patientauthenticate_date}
                                  onChange={(e)=>setPatientauthenticate_date(e.target.value)}
                                  required
                                />
                              </td>
                            </tr>
                          </tbody>

                          {/* <tbody>
                            <tr className="table-row">
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Patient Type :{" "}
                                <input
                                  type="text"
                                  className="border border-0 ms-2"
                                />
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Printed Date :
                                <input
                                  type="date"
                                  className="border border-0 ms-2"
                                />
                              </td>
                            </tr>
                          </tbody> */}
                         
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="container-fluid">
                    <div className="row d-print-none">
                      <form className="d-flex justify-content-between form">
                        <div className="col-lg-4 form-group">
                          <label className="fw-bold fs-5">
                            Test (Methodology)
                          </label>
                          <input
                            list="TestName"
                         
                            className="form-control mt-2 p-3"
                            name="test"
                            type="text"
disabled
                          value={patienttest}
                          onChange={(e)=>setPatienttest(e.target.value)}
                          />
                        
                        </div>
                        <div className="col-lg-3 form-group">
                        <label className="fw-bold fs-5">Result</label>
                        <input
                          className="form-control mt-2 p-3"
                          name="value"
                          type='text'
                        
                          placeholder="Enter Result"
                          required
                          value={patientresult}
                          onChange={handleResultChange}
                        />
                        {resultError && (
                          <div style={{ color: 'red' }}>{resultError}</div>
                        )}
                      </div>

                        {labName === 'oral' && (
                      
                           <div className="col-lg-4 form-group">
                           <label className="fw-bold fs-5">Unit</label>
                           <input
                           list="unitName"
                           name="unit"
                           className="form-control unit mt-2 p-3"
                           type="text"
                           placeholder="Enter Unit"
                           required
                           value={patientunit}
                            onChange={handleUnitChange}
                         />
                         {unitError && (
                           <div style={{ color: 'red' }}>{unitError}</div>
                         )}
                       </div>
                    ) }
                        {labName === 'pathology' && (
                        <div className="col-lg-4 form-group">
                          <label className="fw-bold fs-5">Unit</label>
                          <input
                            list="unitName"
                            name="unit"
                            className="form-control unit mt-2 p-3"
                            type="text"
                            value={patientunit}
                            onChange={(e)=>setPatientunit(e.target.value)}
                            required
                          />
                         
                        </div>
                    ) }

                        {labName === 'radiology' && (
                        <div className="col-lg-4 form-group">
                          <label className="fw-bold fs-5">Cost</label>
                          <input
                            list="costName"
                            name="cost"
                            className="form-control cost mt-2 p-3"
                            type="number"
                            value={patientcost}
                          disabled
                            required
                          />
                         
                        </div>
                    ) }
                      </form>
                    </div>
                    <div className="d-print-none">
                      <Button
                        className="mt-4 mb-5 px-4 py-2"
                        style={{ backgroundColor: "#213555" }}
                      onClick={hundleSumbit}
                      disabled = {loading}
                      >
                       {loading ? 'Sumbit ...' : 'Sumbit'} 
                      </Button>
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

export default Oral_Blood_Tests

const Wrapper = styled.div`

`