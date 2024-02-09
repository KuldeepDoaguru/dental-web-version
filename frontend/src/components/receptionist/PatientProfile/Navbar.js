import React from 'react'
import styled from 'styled-components'
import Appointment from './Appointment'
import Treatment from './Treatment'
import Bill from './Bill'
import Payment from './Payment'
import Clinic_Examin from './Clinic_Examin'
import Prescription from './Prescription'
import Sms from './Sms'
import Email from './Email'
import Timeline from './Timeline'
import Lab from './Lab'
import Files from './Files'


function Navbar() {
  return (
    <Wrapper>
       <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Overview
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                 Appointment
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab1"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane1"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane1"
                aria-selected="false"
              >
                Treatment
              </button>
            </li>
          
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab2"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane2"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane2"
                aria-selected="false"
              >
              Billing
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab3"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane3"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane3"
                aria-selected="false"
              >
               Payment
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab4"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane4"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane4"
                aria-selected="false"
              >
                Clinical Examin
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab1"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane5"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane5"
                aria-selected="false"
              >
                Prescription
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab1"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane6"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane6"
                aria-selected="false"
              >
                Lab
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab1"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane7"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane7"
                aria-selected="false"
              >
                Files
              </button>
            </li>
             <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab1"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane8"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane8"
                aria-selected="false"
              >
                Sms
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab1"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane9"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane9"
                aria-selected="false"
              >
                Email
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab1"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane10"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane10"
                aria-selected="false"
              >
                TimeLine
              </button>
            </li>
            
            
            

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabindex="0"
              >
                <ul className="list-group">
                  <li className="list-group-item">
                  <div className="row">
            
             
              <div className="col-lg-4" id="tableresponsive1">
                <div className="text-center mt-2 h-100 w-100 border">
                  <div className="mt-3">
                    <h5>15 October</h5>
                  <p>Last Appointment</p></div>
                </div>
              </div>
              <div className="col-lg-4" id="tableresponsive1"> <div className="text-center mt-2 h-100 w-100 border">
                  <div className="mt-3">
                    <h5>30 October</h5>
                  <p>Next Appointment</p></div>
                </div></div>
              <div className="col-lg-4" id="tableresponsive1"> <div className="text-center mt-2 h-100 w-100 border">
                  <div className="mt-3">
                    <h5>INR 5400</h5>
                  <p>Payment Pending</p></div>
                </div></div>

                <div className="row mt-5">
                  <div className="col-lg-8" id="tableresponsive">
                     <div className="table-responsive">
                        <h5>Appointment</h5>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Doctor Name</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>25 April 2023</td>
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                          <tr>
                            <td>25 April 2023</td>
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                          <tr>
                            <td>25 April 2023</td>
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                     
                        </tbody>
                      </table>  </div>
                      <div className="table-responsive">
                      <h5>Treatment</h5>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Treatment</th>
                            <th>Doctor Name</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>25 April 2023</td>
                            <td>Consultation</td>
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                          <tr>
                            <td>25 April 2023</td>
                            <td>Root Canal</td>

                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                          <tr>
                            <td>25 April 2023</td>
                            <td>Consultation</td>

                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                     
                        </tbody>
                      </table>
                      </div>
                      <div className="table-responsive">
                      <h5>Bill</h5>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Payment</th>
                            <th>Treatment</th>
                            <th>Doctor Name</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>25 April 2023</td>
                            <td>INR 5000/-</td>
                            <td>Root Canal</td>
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                          <tr>
                          <td>25 April 2023</td>
                            <td>INR 5000/-</td>
                            <td>Root Canal</td>
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                          <tr>
                          <td>25 April 2023</td>
                            <td>INR 5000/-</td>
                            <td>Root Canal</td>
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                     
                        </tbody>
                      </table>
                      </div>
                      <div className="table-responsive">
                      <h5>Clinical Examin</h5>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Issue</th>
                            <th>Investigation</th>
                            <th>Tooth</th>
                            <th>Diagnosis</th>
                            <th>Doctor Name</th>

                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>25 April 2023</td>
                            <td>Tooth Decay</td>
                            <td>Decayed</td>

                            <td>26 27 28 29</td>
                            <td>Tooth infection</td>
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                          <tr>
                            <td>25 April 2023</td>
                            <td>Tooth Decay</td>
                            <td>Decayed</td>

                            <td>26 27 28 29</td>
                            <td>Tooth infection</td>
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                          <tr>
                            <td>25 April 2023</td>
                            <td>Tooth Decay</td>
                            <td>Decayed</td>
                            <td>26 27 28 29</td>
                            <td>Tooth infection</td>
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                     
                        </tbody>
                      </table>
                      </div>
                      <div className="table-responsive">
                      <h5>Prescription</h5>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Durg</th>
                            <th>Doctor Name</th>

                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>25 April 2023</td>
                            <td>Aceterminophen</td>
                            
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                          <tr>
                          <td>25 April 2023</td>
                            <td>Aceterminophen</td>
                            
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                          <tr>
                          <td>25 April 2023</td>
                            <td>Aceterminophen</td>
                            
                            <td>Dr.Umer Qureshi</td>
                           
                          </tr>
                     
                        </tbody>
                      </table>
                      </div>
                  
                    </div>
                  <div className="col-lg-4" id="tableresponsive">

                  <h5>Patient Remarks</h5>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Detail</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Root Canal Next Week</td>
                            
                           
                          </tr>
                        
                        </tbody>
                      </table>
                      <h5>Patient Notes</h5>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Detail</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Tooth Decay BY-Dr.Umer Qureshi</td>
                            
                           
                          </tr>
                        
                        </tbody>
                      </table>
                      <h5>Medical History Note</h5>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Detail</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Diabties</td>
                            
                           
                          </tr>
                        
                        </tbody>
                      </table>
                  </div>
                </div>
            </div>
                  </li>
                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabindex="0"
              >
                <ul className="list-group">
                  <li className="list-group-item" id='app'>
                  <Appointment/>
                  </li>
                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane1"
                role="tabpanel"
                aria-labelledby="profile-tab1"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item">
                <Treatment/>
                  
   
                  </li>
                  

                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane2"
                role="tabpanel"
                aria-labelledby="profile-tab2"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item">
                
     <Bill/>
   
                  </li>
                  

                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane3"
                role="tabpanel"
                aria-labelledby="profile-tab3"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item">
                
     
   <Payment/>
                  </li>
                  

                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane4"
                role="tabpanel"
                aria-labelledby="profile-tab4"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item">
                
                 <Clinic_Examin/>
   
                  </li>
                  

                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane5"
                role="tabpanel"
                aria-labelledby="profile-tab5"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item">
                
     <Prescription/>
   
                  </li>
                  

                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane6"
                role="tabpanel"
                aria-labelledby="profile-tab6"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item">
                <Lab/>
                    
   
                  </li>
                  

                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane7"
                role="tabpanel"
                aria-labelledby="profile-tab7"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item">
                
     <Files/>
   
                  </li>
                  

                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane8"
                role="tabpanel"
                aria-labelledby="profile-tab8"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item">
                
     <Sms/>
   
                  </li>
                  

                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane9"
                role="tabpanel"
                aria-labelledby="profile-tab9"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item">
                
     <Email/>
   
                  </li>
                  

                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane10"
                role="tabpanel"
                aria-labelledby="profile-tab10"
                tabindex="0"
              >
                <ul className="list-group">
        
                  <li className="list-group-item">
                
     <Timeline/>
   
                  </li>
                  

                </ul>
              </div>
              
            
            </div>
          </ul> 
    </Wrapper>
  )
}

export default Navbar
const Wrapper = styled.div`
#tableresponsive{
    @media screen and (max-width: 768px) {
      width: 73%;
      
    }
  } 
  #tableresponsive1{
    @media screen and (max-width: 768px) {
      width: 70%;
   
      
    }
  }
  #myTab{
     @media screen and (max-width: 768px) {
      width: 90%;
      margin-left: 1.2rem;
      
    }
  }
  #app{
    width: 65rem;
  }
`
