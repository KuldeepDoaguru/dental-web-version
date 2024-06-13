import axios from 'axios'
import cogoToast from 'cogo-toast'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment';
import Header from '../MainComponents/Header';
import Sider from '../MainComponents/Sider';
import { IoArrowBackSharp } from 'react-icons/io5';
// import signature from "../BloodTest/signature_maker_after_.webp";
import signature from "../../Pages/BloodTestExternal/signature_maker_after_.webp";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PrintHeader from '../MainComponents/PrintHeader';
import PrintFooter from '../MainComponents/PrintFooter';

function Print_Oral_Blood() {
  // const [patientDetails, setPatientDetails] = useState([]);
  const [patientbill_no , setPatientbill_no] = useState('')
  const [patientUHID , setPatientUHID] = useState('')
  const [patientName , setPatientName] = useState('')
  const [patientage , setPatientage] = useState('')
  const [patientgender , setPatientgender] = useState('')
  const [patientbranch_name , setPatientbranch_name] = useState('')
  const [patientAssigned_Doctor_Name , setPatientAssigned_Doctor_Name] = useState('')
  const [patienttest , setPatienttest] = useState('')
  const [patientresult , setPatientresult] = useState('')
  const [patientunit , setPatientunit] = useState('')
  const [patientcost, setPatientcost] = useState("");
  const [patientcollection_date , setPatientcollection_date] = useState('')
  const [patientauthenticate_date , setPatientauthenticate_date] = useState('')
  const [patienttid , setPatienttid] = useState('')
  
  const [notes, setNotes] = useState([]);
  const [labName, setLabName] = useState("");
 const navigate = useNavigate();
 const userName = useSelector(state => state.auth.user);
 
 const currentUser = useSelector(state => state.auth.user);
  
 const token = currentUser?.token;

 const branch = currentUser.branch_name
 const address = currentUser.address

  const goBack = () => {
    window.history.go(-1);
  };

  const {id} = useParams();

  
 

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
         setPatientage(response.data[0].age)
         setPatientgender(response.data[0].gender)
         setPatientbranch_name(response.data[0].branch_name)
         setPatientAssigned_Doctor_Name(response.data[0].assigned_doctor_name)
         setLabName(response.data[0].lab_name);
         setPatienttid(response.data[0].tpid)

        
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);

  useEffect(() => {
    const fetchPatientTestDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab//get-patient-test-details-by-id/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }}
        );
        setPatienttest(response.data[0].test)
         setPatientresult(response.data[0].result)
         setPatientunit(response.data[0].unit)
         setPatientcost(response.data[0].cost);
         setPatientcollection_date(response.data[0].collection_date)
         setPatientauthenticate_date(response.data[0].authenticate_date)
         


        
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientTestDetails();
  }, []);


  useEffect(() => {
        
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`https://dentalgurulab.doaguru.com/api/lab/getpatienttest-notes/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});
  
        if (response.status === 200) {
          setNotes(response.data);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
        },[]);




const handleprint = () =>{

  window.print();
}



const parsedCollection_Date = moment(patientcollection_date);

// Add one day to the parsed date
const adjustedCollection_Date = parsedCollection_Date.add(1, 'days');

// Format the adjusted date as a string in the desired format (YYYY-MM-DD)
const formattedAdjustedCollection_Date = adjustedCollection_Date.format('DD-MM-YYYY');
 

const parsedAuthenticate_Date = moment(patientauthenticate_date);

// Add one day to the parsed date
const adjustedAuthenticate_Date = parsedAuthenticate_Date.add(1, 'days');

// Format the adjusted date as a string in the desired format (YYYY-MM-DD)
const formattedAdjustedAuthenticate_Date = adjustedAuthenticate_Date.format('DD-MM-YYYY');


  return (
   <Wrapper>
    <IoArrowBackSharp
            className="fs-1 text-black d-print-none btn-print"
            onClick={goBack}
            style={{ cursor: "pointer" }}
          />
      <PrintHeader/>
    
     {/* <div className="d-print-none">
          <Header />
        </div>
            */}
                  <div clasNameName="main">
          <div className="">
          <div className="row flex-nowrap ">
              {/* <div className="col-xxl-1 col-xl-1 col-lg-1 d-print-none col-sm-1 p-0">
                <Sider />

                </div> */}
              {/* <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 p-0" style={{marginTop:"5rem"}}> */}
              <div className="">
             

               
               
            <div className="mx-4">
                  <div className="row">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
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
                          {/* <div className="text-center mt-2 footer ">
                            <img
                              className="ms-4"
                              src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
                              alt="Logo"
                              width="100"
                              height="85"
                            />
                            <h3 className="ms-2">Dental Guru</h3>
                          </div> */}
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
                      <div class="table-responsive rounded">
                        <table class="table tables table-bordered rounded shadow">
                     
                          <tbody>
                            <tr className="table-row">
                      
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Bill No. :  {patientbill_no}        
                
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                UHID : {patientUHID}
                         
                              </td>
                            </tr>
                          </tbody>

                     

                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                              Treatment Id :{patienttid}
                    
                              
                                
                                
                              </td>

                              <td
                                colSpan="2"
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Patient Name : {patientName}
                                 
                          
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
                                Advised By : {patientAssigned_Doctor_Name}
                     
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Collection Date : {formattedAdjustedCollection_Date}
                              </td>
                            </tr>
                          </tbody>

                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Center Name : {patientbranch_name}
                                
                           
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Authenticate Date: {formattedAdjustedAuthenticate_Date}
                             
                              </td>
                            </tr>
                          </tbody>

                    
                         
                        </table>
                      </div>
                    </div>
                  </div>


                
               
               

                <div className="">
                    <div className="row">
                      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <table className=" bg-white text-center table table-borderless">
                          <thead className="border ">
                            <th className="p-3">Test</th>
                            <th className="p-3">Result</th>
                            {labName === "oral" && (
                      <>
                        <th className="p-3">Unit</th>{" "}
                        <th className="p-3">Range</th>
                      </>
                    )}
                    {labName === "pathology" && (
                      <>
                        <th className="p-3">Unit</th>{" "}
                        <th className="p-3">Range</th>
                      </>
                    )}

                    {labName === "radiology" && <th className="p-3">Cost</th>}
                            
                          </thead>
                          <tbody>
                            
                              <tr>
                                <td>{patienttest}</td>
                                <td>{patientresult}</td>
                                {labName === "oral" && <td>{patientunit}</td>}
                      {labName === "pathology" && <td>{patientunit}</td>}
                      {labName === "oral" && (
                        <>
                          <td>40 - 59</td>
                        </>
                      )}
                      {labName === "pathology" && (
                        <>
                          <td>40 - 59</td>
                        </>
                      )}
                      {labName === "radiology" && <td>{patientcost}</td>}
                              </tr>
                           
                          </tbody>

                        
                        </table>
                      </div>
                  <div className="note mt-3">
              <h5 className=" fw-bold">Notes:-</h5>

              <ul>
                {notes.map((note) => (
                  <li key={note.id}>
                    {note.note_text}
                    <p>{note.additional_info}</p>
                  </li>
                ))}
              </ul>
            </div>
                    </div>
                  </div>


                  <div className="">
                  <div className="row  mt-5">
                    <div className="d-flex justify-content-between">
                      <div className="col-lg-4 form-group">
                        <div className="text-center">
                         
                        </div>
                        <h4 className=" text-center fs-5 fw-bold">
                        {userName.employee_name}
                        </h4>
                        <h6 className=" text-center">LAB ATTENDANT</h6>
                      </div>

                      <div className="col-lg-4 form-group">
                        <div className="text-center">
                         
                        </div>
                        <h4 className=" text-center fs-5 fw-bold">
                          {patientAssigned_Doctor_Name}
                        </h4>
                        <h6 className=" text-center">ASSIGNED BY DOCTOR</h6>
                      </div>
                    </div>
                  </div>
                </div>


<div className="text-center">
  <button className='btn btn-success mb-2  mt-5 btn-print' onClick={handleprint}>Print page</button>
</div>

             </div>  
                 </div>
                  </div>
          </div>
        </div>


     
      <PrintFooter/>
   </Wrapper>
  )
}

export default Print_Oral_Blood

const Wrapper  = styled.div`
  
  .btn-print {
    @media print {
      display: none;
    }
  }
  .btn-print-block {
    display: none;
    @media print {
      display: block;
    }
  }
  .footerimage{
    @media print {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
`