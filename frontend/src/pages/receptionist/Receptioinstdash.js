import React from 'react'
import Header from '../../components/receptionist/Header'
import Sider from '../../components/receptionist/Sider'
import Card from '../../components/receptionist/ReceptioinstDashboard/Card'
import Form from '../../components/receptionist/ReceptioinstDashboard/Form'
import AppointTable from '../../components/receptionist/ReceptioinstDashboard/AppointTable'
import Doctor from '../../components/receptionist/ReceptioinstDashboard/Doctor'
import Calender1 from '../../components/receptionist/ReceptioinstDashboard/Calender1'
import styled from 'styled-components'

function Receptioinstdash() {
  return (
    <Wrapper>
      <div className='header'>
      <Header/>
      </div>
   
   
   <div className="row flex-nowrap">
    <div className="col-lg-1 col-1" id='sider'>
   <Sider/>
    </div>
    <div className="col-lg-11 mt-2" id='set'>
      <div className="row">
   <div className="col-lg-2 cards" >
    <Card/>
   </div>
   <div className="col-lg-4 form">
    <Form/>
   </div>
   
   <div className="col-lg-3 me-3">

  <Doctor/>
</div>
 
   <div className="col-lg-3 calender">

    <Calender1/>
</div>
  <div className="col-lg-12 mt-4 appointment">
    <AppointTable/>
  </div>


  </div>
   </div>
   </div>
   
   
      
    </Wrapper>
  )
}

export default Receptioinstdash
const Wrapper=styled.div`
overflow: hidden;

.cards{
  width: 15%;

  @media screen and (max-width: 768px) {
 width: 50%;
 text-align: center;
 margin: auto;
 
}
@media screen and (min-width: 768px) and (max-width : 1020px) {
  width: 50%;
 text-align: center;
 margin: auto;
}




}
.calender{
  @media screen and (max-width: 768px) {
    width: 75%;
   margin: auto;
}
@media screen and (min-width: 768px) and (max-width : 1020px) {
   width: 75%;
   margin: auto;
}
}

.appointment{
  @media screen and (max-width: 768px) {
    width: 75%;
   margin: auto;
}
@media screen and (min-width: 768px) and (max-width : 1020px) {
   width: 75%;
   margin: auto;
}
}

#set{

  margin-left: -4.5rem;
  padding-left: 150px; /* Width of sidebar */
  padding-top: 90px; /* Height of header */
  flex-grow: 1;
  overflow-y: auto;
 
@media screen and (max-width: 768px) {
  /* margin-left: 1.5rem; */
  margin: 2rem;
  padding-left: 0px; /* Width of sidebar */
}
@media screen and (min-width: 768px) and (max-width : 1020px) {
  margin: 2rem;
  padding-left: 0px; /* Width of sidebar */
}
  @media screen and (min-width: 1020px) and (max-width: 1500px) {
    margin-left: -2rem;
    
  }
  @media screen and (min-width: 1500px) and (max-width: 1800px) {
    margin-left: -1.9rem;
    
  }
  @media screen and (min-width: 1800px) and (max-width: 2000px) {
   margin-left: -1rem;
    
  }
  @media screen and (min-width: 2000px) and (max-width: 2500px) {
   margin-left: 0rem;
    
  }
}
.header{
  position: fixed;
  min-width: 100%;
  z-index: 100;
}
#sider{
  padding-top: 60px; /* Height of header */
  min-height: 100vh;
  position: fixed;
  
  
 

}
`



