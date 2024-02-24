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
   <Header/>
   
   <div className="row flex-nowrap">
    <div className="col-lg-1 col-1" id='sider'>
   <Sider/>
    </div>
    <div className="col-lg-11 mt-2" id='set'>
      <div className="row">
   <div className="col-lg-2 cards" >
    <Card/>
   </div>
   <div className="col-lg-4">
    <Form/>
   </div>
   
   <div className="col-lg-3 me-3">

  <Doctor/>
</div>
 
   <div className="col-lg-3 calender">

    <Calender1/>
</div>
  <div className="col-lg-12">
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
.cards{
  width: 15%;
  @media screen and (max-width: 768px) {
 width: 95%;
}


}
.calender{
 
}
#set{

  margin-left: -4.5rem;
@media screen and (max-width: 768px) {
  margin-left: 1.5rem;
}
  @media screen and (min-width: 1020px) and (max-width: 1700px) {
    margin-left: -1.9rem;
    
  }
}

#sider{
  height: 62rem;
  
 

}
`



