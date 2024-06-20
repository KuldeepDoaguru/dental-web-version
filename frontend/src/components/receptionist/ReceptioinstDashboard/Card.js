import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import moment from "moment";
import { clearUser } from '../../../redux/user/userSlice';
import cogoToast from "cogo-toast";


function Card() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [patients, setPatients] = useState([]);
  const [newpatients, setNewPatients] = useState([]);
  const {refreshTable,currentUser} = useSelector((state) => state.user);
  const  branch = currentUser.branch_name;
  const [opdData, setOpdData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString()?.split('T')[0]); // Initialize with today's date
  const [opdAmount,setOpdAmount] = useState(0);
  const [appointmentData,setAppointmentsData] = useState([]);
  const token = currentUser?.token;

  const [missedAppointments,setMissedAppointments] = useState(0);
  const [checkInAppointments,setCheckInAppointments] = useState(0);
  const [upcomingAppointments,setUpcomingAppointments] = useState(0);
  const [completeAppointments,setCompleteAppointments] = useState(0);
  const [cancelAppointments,setCancelAppointments] = useState(0);


  const getAppointments = async ()=>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-appointments/${branch}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });

      
      const filteredPatients = response?.data?.data.filter(patient => patient.appointment_dateTime.includes(selectedDate));
      setAppointmentsData(filteredPatients)
    }
    catch(error){
      console.log(error)
    }
  }
 
  const getAppointmentsForOpd = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-appointments/${branch}` ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      
      const filteredPatients = response?.data?.data.filter(patient => patient?.payment_Status === "paid" && patient.created_at.includes(selectedDate));
      setOpdData(filteredPatients);
    } catch (error) {
      console.log(error);
      if(error?.response?.status == 401){
        // alert("Your token is expired please login again")
         cogoToast.info("Your token is expired please login again")
        dispatch(clearUser())
        navigate('/receptionist_login');
      }
    }
  };

  const getNewPatient = async () =>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-Patients/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      console.log(response);
      const todayDate = moment().format('YYYY-MM-DD'); // Get today's date
      const filteredPatients = response?.data?.data.filter(patient => moment(patient.created_at).format('YYYY-MM-DD') === todayDate);
      setNewPatients(filteredPatients);
     }
     catch(error){
        console.log(error)
     }
    
  }
  
  const getPatient = async () =>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-Patients/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      console.log(response);
      setPatients(response?.data?.data)
     }
     catch(error){
        console.log(error)
     }
    
  }

  useEffect(()=>{
    getNewPatient();
    getPatient();
    getAppointmentsForOpd();
    calculateOpdAmount();
    getAppointments();
    
 },[refreshTable]);


  useEffect(()=>{
    
    calculateOpdAmount();
    
 },[opdData]);


  useEffect(()=>{
    
    calculateAppointmentData();
    
 },[appointmentData]);

 const calculateOpdAmount = () =>{
      let totalAmount = 0;
         
         opdData.forEach((data) => {
          // Check if the OPD amount is a valid number
          const opdAmount = parseInt(data?.opd_amount);
          if (!isNaN(opdAmount)) {
            totalAmount += opdAmount;
          }
        });
        setOpdAmount(totalAmount);
 }

 const calculateAppointmentData = () =>{
  const currentDateAndTime = new Date();
  
  // Adjusting the time zone offset for Indian Standard Time (IST)
  const ISTOffset = 330; // Offset in minutes (5 hours 30 minutes)
  const indianTime = new Date(currentDateAndTime.getTime() + (ISTOffset * 60000)).toISOString();
  let missedApp = 0;
  let cancelApp = 0;
  let upcomingApp = 0;
  let completeApp = 0;
  let checkInApp = 0;
  console.log(indianTime)
  appointmentData.forEach((data) => {
    // Check if the OPD amount is a valid number
    let appStatus = data?.appointment_status;
    let appDateAndTime = data?.appointment_dateTime;
    
    if (appDateAndTime < indianTime && appStatus === "Appoint") {
        missedApp +=1;
    }
    else if ( appStatus === "Cancel") {
      cancelApp +=1;
    }
    else if ( appDateAndTime > indianTime && appStatus === "Appoint") {
      upcomingApp +=1;
    }
    else if (  appStatus === "Complete") {
      completeApp +=1;
    }
    else if (  appStatus === "Check-In") {
      checkInApp +=1;
    }
  });
  setMissedAppointments(missedApp);
  setCancelAppointments(cancelApp);
  setCheckInAppointments(checkInApp);
  setCompleteAppointments(completeApp);
  setUpcomingAppointments(upcomingApp);

 }


  return (
    <Wrapper>
      <div className="row">
        <div className="col-lg-11 col-md-11">
          <div className="card shadow" id="card1">
            <div className="card-body">
              <h6 className="card-title appointment" style={{ color: "black " }}>
                Today's Appointments
              </h6>
              <p className="card-text">
                <ul className="sec" id="section1">
                  <div className="data">
                    <li className="dotrem h6 ">Missed</li>

                    <li className="dotrem1  text-bg-danger rounded-5">{missedAppointments}</li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6">Checked in</li>
                    <li className="dotrem1    text-bg-success rounded-5 ">
                      {checkInAppointments}
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6  ">Upcoming</li>
                    <li className="dotrem1   text-bg-warning rounded-5  text-white">
                      {upcomingAppointments}
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6 ">Complete</li>
                    <li className="dotrem1  text-bg-primary rounded-5 ">
                      {completeAppointments}
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6 ">Cancel</li>
                    <li className="dotrem1 text-bg-secondary rounded-5 ">{cancelAppointments}</li>
                  </div>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-11 col-md-11">
          <div className="card shadow" id="card2">
            <div className="card-body d-flex justify-content-between">
              <i className="bi bi-person h1 icon"></i>
              <div className="">
                <h6 className="card-title" style={{ color: "black " }}>
                  New Patient
                </h6>

                <p className=" h6 text-center text-dark">{newpatients?.length}</p>

                <p className="view"><Link to="/new_patient" className=" text-decoration-none" style={{color:"black"}}>View Detail</Link></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-11 col-md-11">
          
          <div className="card shadow" id="card3">
            <div className="card-body d-flex justify-content-between">
            <i className="bi bi-currency-rupee h1 float-end icon"></i>
            
              <div className="">
                <h6 className="card-title" style={{ color: "black " }}>
               OPD Collection
                </h6>

                <p className=" h6 text-center text-dark">  <i className="bi bi-currency-rupee"></i>{opdAmount}</p>

                <p className="view"><Link to="/opd_collection" className=" text-decoration-none" style={{color:"black"}} >View Detail</Link></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-11 col-md-11">
          <div className="card shadow" id="card4">
            <div className="card-body d-flex justify-content-between">
              <i className="bi bi-people-fill h1 icon"></i>
              <div className="">
                <h6 className="card-title">All Patient</h6>

                <p className=" h6 text-center text-dark">{patients?.length}</p>

                <p className="view"><Link to="/all_patient" className=" text-decoration-none" style={{color:"black"}}>View Detail</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Card;

const Wrapper = styled.div`

  .sec{
    padding: 0;
  }
  .dotrem {
    list-style-type: none;
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
       font-size: small;
       white-space: nowrap;
   
  }
  }
  .dotrem1 {
    list-style-type: none;
    width: 30px;
   
    text-align: center;
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
       
       
   
  }
   
  
  }

  .icon{
    @media screen and (min-width: 1020px) and (max-width: 1250px) {
       font-size: x-large;
      
       
   
  }
  }

.data{
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
  color: black;
    font-size: larger;
    
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
       font-size: small;
      
       
   
  }

 
}

  #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width : 110%;
    height: 13rem;
    /* @media screen and (max-width: 768px) {
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    } */
    @media screen and (min-width: 1020px) and (max-width: 1550px) {
       font-size: small;
   
  }
  .appointment{
    @media screen and (min-width: 1450px) and (max-width: 1550px) {
       white-space: nowrap;
   
  }
  }

  .card-title{
    @media screen and (min-width: 1020px) and (max-width: 1200px) {
       font-size: small;
      
   
  }
}

  

  
    /* @media screen and (min-width: 1020px) and (max-width: 1500px) {
    width: 10rem;
  }
    @media screen and (min-width: 1500px) and (max-width: 1700px) {
    width: 13rem;
  } */
  }
  #card2 {
    width: 110%;
    height: 6rem;
    margin-top: 5px;

    background-image: linear-gradient(#fff0b4, #ffb4ee);

    @media screen and (min-width: 1020px) and (max-width: 1500px) {
       font-size: small;
   
  }
  .card-title{
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
       font-size: small;
       white-space: nowrap;
   
  }
  }
/*     
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1700px) {
    width: 13rem;
  } */
  }
  #card3 {
    width: 110%;
    height: 6rem;

    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    margin-top: 5px;
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
       font-size: small;
   
  }
  .card-title{
    @media screen and (min-width: 1020px) and (max-width: 1200px) {
       font-size: 11px;
       white-space: nowrap;
   
  }
    @media screen and (min-width: 1200px) and (max-width: 1500px) {
       font-size: small;
       white-space: nowrap;
   
  }
  }
    /* @media screen and (max-width: 768px) {
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1700px) {
    width: 13rem;
  } */
  }
  #card4 {
    width: 110%;
    height: 6rem;

    background-image: linear-gradient(#fff0b4, #ffb4ee);

    margin-top: 5px;
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
       font-size: small;
   
  }
  .card-title{
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
       font-size: small;
       white-space: nowrap;
   
  }
  }
    /* @media screen and (max-width: 768px) {
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1700px) {
    width: 13rem;
  } */
  }

  .view {
   
    @media screen and (min-width: 1200px) and (max-width: 2000px) {
      text-align: end;
     
   
  }
    @media screen and (min-width: 1020px) and (max-width: 1200px) {
      white-space: nowrap;
     
   
  }
    
    
    
  }
`;
