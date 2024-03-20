import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import moment from "moment";


function Card() {

  const [patients, setPatients] = useState([]);
  const [newpatients, setNewPatients] = useState([]);
  const {refreshTable,currentUser} = useSelector((state) => state.user);
  const  branch = currentUser.branch_name;
  const [opdData, setOpdData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Initialize with today's date
  const [opdAmount,setOpdAmount] = useState(0);
 
  const getAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/receptionist/get-appointments/${branch}`
      );
      
      const filteredPatients = response?.data?.data.filter(patient => patient.treatment_provided === "OPD" && patient.created_at.includes(selectedDate));
      setOpdData(filteredPatients);
    } catch (error) {
      console.log(error);
    }
  };

  const getNewPatient = async () =>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-Patients/${branch}`);
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
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-Patients/${branch}`);
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
    getAppointments();
    calculateOpdAmount();
    
 },[refreshTable]);
  useEffect(()=>{
    
    calculateOpdAmount();
    
 },[opdData]);

 const calculateOpdAmount = () =>{
      let totalAmount = 0;
       opdData.forEach((data) => (
        
        totalAmount += Number(data?.opd_amount)
       ))
       setOpdAmount(totalAmount)
 }


  return (
    <Wrapper>
      <div className="row">
        <div className="col-lg-11 col-md-11">
          <div className="card" id="card1">
            <div className="card-body">
              <h6 className="card-title" style={{ color: "black " }}>
                Today's Appointment
              </h6>
              <p className="card-text">
                <ul className="sec" id="section1">
                  <div className="data">
                    <li className="dotrem h6 ">Missed</li>

                    <li className="dotrem1  text-bg-danger rounded-5">54</li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6">Checked in</li>
                    <li className="dotrem1    text-bg-success rounded-5 ">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6  ">Upcoming</li>
                    <li className="dotrem1   text-bg-warning rounded-5  text-white">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6 ">Complete</li>
                    <li className="dotrem1  text-bg-primary rounded-5 ">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6 ">Cancel</li>
                    <li className="dotrem1 text-bg-secondary rounded-5 ">54</li>
                  </div>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-11 col-md-11">
          <div className="card" id="card2">
            <div className="card-body d-flex justify-content-between">
              <i className="bi bi-person h1"></i>
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
          
          <div className="card" id="card3">
            <div className="card-body d-flex justify-content-between">
            <i className="bi bi-currency-exchange  h1 float-end"></i>
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
          <div className="card" id="card4">
            <div className="card-body d-flex justify-content-between">
              <i className="bi bi-people-fill h1"></i>
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
  .dotrem {
    list-style-type: none;
  }
  .dotrem1 {
    list-style-type: none;
    width: 25px;
    padding-left:4px;
  }

.data{
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
  color: black;
    font-size: larger;

 
}

  #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 18rem;
    height: 13rem;
    @media screen and (max-width: 768px) {
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1700px) {
    width: 13rem;
  }
  }
  #card2 {
    width: 18rem;
    height: 6rem;
    margin-top: 5px;

    background-image: linear-gradient(#fff0b4, #ffb4ee);
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1700px) {
    width: 13rem;
  }
  }
  #card3 {
    width: 18rem;
    height: 6rem;

    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    margin-top: 5px;
    @media screen and (max-width: 768px) {
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1700px) {
    width: 13rem;
  }
  }
  #card4 {
    width: 18rem;
    height: 6rem;

    background-image: linear-gradient(#fff0b4, #ffb4ee);

    margin-top: 5px;
    @media screen and (max-width: 768px) {
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1700px) {
    width: 13rem;
  }
  }

  .view {
   
    text-align: end;
    
    
    
  }
`;
