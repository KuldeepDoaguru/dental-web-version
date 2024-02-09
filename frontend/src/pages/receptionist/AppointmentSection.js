import React from 'react'
import styled from 'styled-components'
import Sider from '../../components/receptionist/Sider'
import Header from '../../components/receptionist/Header'
import { Link } from 'react-router-dom'
import HeaderApp from '../../components/receptionist/Appointment/AppNavbar/HeaderApp'

function AppointmentSection() {
  return (
    <Wrapper>
      <Header/>
      <div className="row flex-nowrap">
    <div className="col-lg-1 col-1 " id='sider'>
   <Sider/>
   </div>
   <div className="col-lg-11">
    <div className="row">
      <div className="col-lg-9">
         <HeaderApp/>
      </div>
  
   
            
          <div className="col-lg-2 col-sm-12">
  
          <div className="card" id="card1">
            <div className="card-body">
              <h6 className="card-title" style={{ color: "black" }}>
                 Appointment
              </h6>
              <p className="card-text">
                <ul className="sec" id="section1">
                    
                  <div className="data">
                    <li className="dotrem text-black">Missed</li>

                    <li className="dotrem1  text-bg-danger rounded-5">54</li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black">Checked in</li>
                    <li className="dotrem1    text-bg-success rounded-5 ">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black ">Upcoming</li>
                    <li className="dotrem1   text-bg-warning rounded-5  text-white">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black">Complete</li>
                    <li className="dotrem1  text-bg-primary rounded-5 ">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black ">Cancel</li>
                    <li className="dotrem1 text-bg-secondary rounded-5 ">54</li>
                  </div>
                </ul>
              </p>
            </div>
          </div>
          <div className="download mt-3">
          <div className="card" id="card4">
            <div className="card-body d-flex justify-content-between">
            <i class="bi bi-floppy-fill h5"></i>
              <div className="">
                <h6 className="card-title">Print</h6>

               

              
              </div>
            </div>
            <div className="card-body d-flex justify-content-between">
            <i class="bi bi-download h5"></i>
              <div className="">
                <h6 className="card-title">Download</h6>

               

              
              </div>
            </div>
            <div className="card-body d-flex justify-content-between">
            <i className="fs-4 bi bi-gear h5"></i>{" "}
              <div className="">
                <h6 className="card-title">All Patient</h6>

               

              
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

export default AppointmentSection
const Wrapper = styled.div `
 #card1 { 
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 15rem;
    height: 19rem;             
    margin-top: 1rem ;
    @media screen and (max-width: 768px) {
        width: 84%;
        margin-top:12px;
        margin-left: 1.3rem;

    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;           
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
    width: 13rem;
  }
  }
  .dotrem1 {
    list-style-type: none;
    width: 25px;
    padding-left:4px;
  }
    .dotrem {
    list-style-type: none;
  }
  .data{
  
  color: black;
   

 
}
  .download{
    @media screen and (max-width: 768px) {
      width: 84%;
    margin-left: 1.3rem;

    }
  }
  #tableres{
    @media screen and (max-width: 768px) {
      width: 30%;
   
    }
  }
  #sider{
    @media screen and (max-width: 768px) {
      height: 83rem;
   
    }
  }
`