import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Sider() {
  return (
    <Wrapper> 
    <div className=" px-sm-2 px-0 mt-1 " id="sidebar" >
  <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2">

                
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li>
                    <Link to="/"> <a
                     
                    
                    >
                      <i className="fs-4 bi bi-house-door-fill"></i>
                      <br />
                      <span className=" d-none d-sm-inline " id="navleft1">
                    Dashboard 
                      </span>{" "}
                    </a></Link>
                  </li>
                  <li> <Link to='/appointment'>
                    <a className="nav-link px-0 align-middle">
                      <i className="fs-4 bi bi-table"></i>{" "}
                      <br />
                      <span className=" d-none d-sm-inline " id="navleft2">
                       Appointment
                      </span>
                    </a>
                 </Link> </li>
                  <li>
                   <Link to='/bill_section'><a
                    
                      
                    >
                     <i className="fs-4 bi bi-receipt-cutoff"></i>
                      <br />
                      <span className=" d-none d-sm-inline " id="navleft">
                        Billing
                      </span>
                    </a></Link> 
                  </li>
                  <li>
                    <Link to='/doctor_section'>
                    <a
                   
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 bi bi-person-fill"></i>
                      <br />
                      <span className=" d-none d-sm-inline" id="navleft">
                        Doctor
                      </span>{" "}
                    </a>
                    </Link>
                  </li>
               
                  <li>
                    <Link to="/lab">
                    <a
                     
                      className="nav-link px-0 align-middle"
                    >
                      <i className="fs-4 bi bi-file-medical"></i>
                      <br />
                      <span className=" d-none d-sm-inline " id="navleft">
                        Lab
                      </span>{" "}
                    </a></Link>
                  </li>
                  {/* <li>
                    <Link to='/report'>
                    <a
                     
                      className="nav-link px-0 align-middle"
                    >
                    <i className="fs-4 bi bi-clipboard-pulse"></i>
                      <br />
                      <span className=" d-none d-sm-inline " id="navleft">
                        Report
                      </span>{" "}
                    </a></Link>
                  </li> */}
                     <li>
                    <Link to='/video'>
                    <a
                     
                      className="nav-link px-0 align-middle"
                    >
                     <i className="fs-4 bi bi-camera-video"></i>
                      <br />
                      <span className=" d-none d-sm-inline " id="navleft" >
                        Video
                      </span>{" "}
                    </a>
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="nav-link px-0 align-middle">
                      <i className="fs-4 bi bi-gear"></i>{" "}
                      <br />
                      <span className=" d-none d-sm-inline " id="navleft">
                        Settings
                      </span>{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#submenu3"
                      data-bs-toggle="collapse"
                      className="nav-link px-0 align-middle"
                    >
                     <i className="fs-4 bi bi-power"></i>
                      <br />
                      <span className=" d-none d-sm-inline " id="navleft">
                        Logout
                      </span>{" "}
                    </a>
                  </li>
                </ul>
              </div>
  </div>
  
    </Wrapper>
  )
}

export default Sider
const Wrapper=styled.div`

 
  #navleft1{
    font-size: 12px;
    margin-left: -0.8rem;
    color:white;
  }
  #navleft2{
    font-size: 12px;
    margin-left: -1.2rem;
    color:white;

  }
  #navleft{
    font-size: 12px;
    margin-left: -0.2rem;
    color:white;

  }
  #sidebar{
    width: 5rem;
    height: 79rem;
    background-color:#004aad;
    @media screen and (max-width: 768px){
      width: 3rem;
      height: 212rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 5rem;
      height: 151rem;    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
   height: 62rem;
  }
  }
  .bi{
  color: white;
  }
 
li:hover{
  color: red;
}

`