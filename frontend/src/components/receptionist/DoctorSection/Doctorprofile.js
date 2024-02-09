import React from 'react'
import styled from 'styled-components'
import Sider from '../Sider'
import doctor from "../../../images/doctor_profile.png";
import NavbarDoc from './NavbarDoc';


function Doctorprofile() {
  return (
    <Wrapper>
      <div className="row flex-nowrap">
    <div className="col-lg-1 col-1 " id='sider'>
   <Sider/>
   </div>
   <div className="col-lg-11">
    <div className="row">
   
   <div className="col-lg-2 mx-4">
            <h2 className="mt-3">Dr.Mohit Pawar</h2>

            <img
              src={doctor}
              alt=""
              height="160rem"
              className="  rounded-5 mx-4 "
            />

            <div className="d-flex gap-5 mt-5">
              <ul className=" list-unstyled">
                <li>
                  <p>Change</p>
                </li>
                <li>
                  {" "}
                  <div className="hddd bg-light">
                    <h6>Basic Info</h6>
                  </div>
                </li>
                <li>Uid :</li>
                <li>Age :</li>
                <li>Gender :</li>
                <li>Mobile :</li>
                <li>Email :</li>
                <li>Address:</li>
              </ul>
              <ul className=" list-unstyled">
                <li>
                  {" "}
                  <p>Remove</p>
                </li>
                <li>
                  {" "}
                  <a href="">Edit</a>
                </li>
                <li style={{marginTop:"20px"}}>p3224</li>
                <li>28 Years</li>
                <li>Male</li>
                <li>9329801072</li>
                <li>riya@gmail.com</li>
                <li>Ghanta Ghar Jabalpur</li>
              </ul>
            </div>
           
          </div>
          <div className="col-lg-9 col-sm-12">
        <NavbarDoc/>
          
          </div>
          </div>
   </div>
   </div>
    </Wrapper>
  )
}

export default Doctorprofile
const Wrapper = styled.div`
#sider{
  height: 44rem;
  @media screen and (max-width: 768px) {
    height: 46rem;
  }
}

`