import React from 'react'
import styled from "styled-components";
import Card from '../../components/superAdmin/dashboard/Card';
import AveragePatientChart from '../../components/superAdmin/dashboard/Charts/AveragePatientChart';
import PatientStatisticChart from '../../components/superAdmin/dashboard/Charts/PatientStatisticChart';
import Header from '../../components/Header';
import Sider from '../../components/Sider';



function Dashboard() {
  return (
    <Wrapper>
      <Header/>
    
        <div className='main'>
    <div className='container-fluid'>
      <div className="row flex-nowrap ">
        <div className='col-lg-1 col-1 p-0'>
       
      
   <Sider/>
    
      </div>
      <div className='col-lg-11 col-11 ps-0'>
     
        <div className='row d-flex justify-content-between mx-3'>
          
            <div className='col-12 col-md-4 ' >
               <h3> Welcome to Dental Guru! </h3>
               <p>Clinic Super Admin Dashboard</p> 
            </div>
            <div className='col-12 col-md-4 my-3'>
            <form className="d-flex ms-auto my-sm" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-primary" type="submit">Search</button>
        </form>

            </div>
        </div>
        <div  className='row d-flex justify-content-around ms-4'>
            <div className='col-8 col-md-2 my-3 p-0'>
              <Card title={"Total Patient"} info={"250"} logo={<i className="bi bi-people-fill" style={{fontSize: "30px"}}></i>} link={""}/>
            </div>
           
            <div className='col-8 col-md-2 my-3 p-0'>
              <Card title={"New Patient"} info={"25"} logo={<i className="bi bi-people-fill" style={{fontSize: "30px"}}></i>} link={""}/>
            </div>
           
            
            <div className='col-8 col-md-2 my-3 p-0'>
              <Card title={"Earnings"} info={"25000"} logo={<i className="bi bi-people-fill" style={{fontSize: "30px"}}></i>} link={""}/>
            </div>
            
            
            <div className='col-8 col-md-2 my-3 p-0'>
              <Card title={"Total Doctors"} info={"15"} logo={<i className="bi bi-people-fill" style={{fontSize: "30px"}}></i>} link={""}/>
            </div>
            
            
            <div className='col-8 col-md-2 my-3 p-0'>
              <Card title={"Appointments"} info={"56"} logo={<i className="bi bi-people-fill" style={{fontSize: "30px"}}></i>} link={""}/>
            </div>
            
        </div>
        <div className='row text-center d-flex justify-content-center'>
            <div className='col-12 col-md-5 mt-4 ms-4  chart' >
            <h6 className='ms-4'>Average Patients Visits</h6>
              <AveragePatientChart/>
              
            
            </div>
            <div className='col-12 col-md-5 mt-4 ms-4  chart'>
            <h6 className='ms-4'>Patient Statistic</h6>
              <PatientStatisticChart/>
              
            
            </div>
        </div>

        <div className='row text-center d-flex justify-content-center'>
            <div className='col-12 col-md-5 mt-4 ms-4  chart'>
            <h6 className='ms-4'>Average Patients Visits</h6>
              <AveragePatientChart/>
              
            
            </div>
            <div className='col-12 col-md-5 mt-4 ms-4  chart'>
            <h6 className='ms-4'>Patient Statistic</h6>
              <PatientStatisticChart/>
              
            
            </div>
        </div>


        </div>

      </div>
      
       
    </div>
    </div>
   
    
    </Wrapper>
  )
}

export default Dashboard

const Wrapper = styled.div`
.main{
    height: 100%;
    background-color: #e6ecf1;
}
.chart{
  background-color: white;
  border-radius: 5px; 
  

}
#hd{
  height:44rem;
  
  @media screen and (max-width: 768px) {
   height: 68rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
   height: 58rem;
  }
}

 

`;