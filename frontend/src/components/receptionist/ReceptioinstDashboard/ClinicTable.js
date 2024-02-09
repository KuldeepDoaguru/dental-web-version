import React from 'react'
import styled from 'styled-components'

function ClinicTable() {
  return (
    <Wrapper>
           
                <div className="">
                  <h3 className="hdd">
                    {" "}
                    <i className="bi bi-clock m-2"></i>Clinic Activity For
                    16-10-2023
                  </h3>

                  <div className="card">
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
                          All
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
                          Payment
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
                          Treatment
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
                          Bill
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
                          Sms
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="profile-tab5"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-tab-pane5"
                          type="button"
                          role="tab"
                          aria-controls="profile-tab-pane5"
                          aria-selected="false"
                        >
                          Patient
                        </button>
                      </li>
                    </ul>
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
                            <i className="bi bi-person-fill m-2"></i>
                            New Patient Rahul Added by amit
                            <span className="float-end">
                              {" "}
                              <i className="bi bi-clock"></i> 1 hour ago
                            </span>
                          </li>

                          <li className="list-group-item ">
                            <i className="bi bi-person-fill m-2"></i>
                            New Patient Jay Added by john
                            <span className="float-end">
                              {" "}
                              <i className="bi bi-clock"></i> 2 hour ago
                            </span>
                          </li>
                          <li className="list-group-item ">
                            <i className="bi bi-messenger m-2"></i>
                            Sms Sent to mohitn by amit
                            <span className="float-end">
                              {" "}
                              <i className="bi bi-clock"></i> 3 hour ago
                            </span>
                          </li>
                          <li className="list-group-item ">
                            <i className="bi bi-person-fill m-2"></i>
                            Appointment book Patient Shubhaum by amit
                            <span className="float-end">
                              {" "}
                              <i className="bi bi-clock"></i> 4 hour ago
                            </span>
                          </li>
                          <li className="list-group-item ">
                            <i className="bi bi-currency-rupee m-2"></i>
                            Bill Added Shohan by amit
                            <span className="float-end">
                              {" "}
                              <i className="bi bi-clock"></i> 5 hour ago
                            </span>
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
                          <li className="list-group-item">
                            Appointment book patient Shubhum by amit
                          </li>

                          <li className="list-group-item ">
                            Appointment book patient Shubhum by amit
                          </li>
                          <li className="list-group-item ">
                            Appointment book patient Shubhum by amit
                          </li>
                          <li className="list-group-item ">
                            Appointment book patient Shubhum by amit
                          </li>
                          <li className="list-group-item ">
                            Appointment book patient Shubhum by amit
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
                            Payment Amount Recevied Mohan by amit
                          </li>

                          <li className="list-group-item ">
                            Payment Amount Recevied Mohan by amit
                          </li>
                          <li className="list-group-item ">
                            Payment Amount Recevied Mohan by amit
                          </li>
                          <li className="list-group-item ">
                            Payment Amount Recevied Mohan by amit
                          </li>
                          <li className="list-group-item ">
                            Payment Amount Recevied Mohan by amit
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
                            New treatment amit added by john
                          </li>

                          <li className="list-group-item ">
                            New treatment amit added by john
                          </li>
                          <li className="list-group-item ">
                            New treatment amit added by john
                          </li>
                          <li className="list-group-item ">
                            New treatment amit added by john
                          </li>
                          <li className="list-group-item ">
                            New treatment amit added by john
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
                            New Bill of amit added by john
                          </li>

                          <li className="list-group-item ">
                            New Bill of amit added by john
                          </li>
                          <li className="list-group-item ">
                            New Bill of amit added by john
                          </li>
                          <li className="list-group-item ">
                            New Bill of amit added by john
                          </li>
                          <li className="list-group-item ">
                            New Bill of amit added by john
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
                            Sms Sent to mohitn by amit
                          </li>

                          <li className="list-group-item ">
                            Sms Sent to mohitn by amit
                          </li>
                          <li className="list-group-item ">
                            Sms Sent to mohitn by amit
                          </li>
                          <li className="list-group-item ">
                            Sms Sent to mohitn by amit
                          </li>
                          <li className="list-group-item ">
                            Sms Sent to mohitn by amit
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
                            New Patient Rahul Added by amit
                          </li>

                          <li className="list-group-item ">
                            New Patient Rahul Added by amit
                          </li>
                          <li className="list-group-item ">
                            New Patient Rahul Added by amit
                          </li>
                          <li className="list-group-item ">
                            New Patient Rahul Added by amit
                          </li>
                          <li className="list-group-item ">
                            A simple danger list group item234
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
           
    </Wrapper>
  )
}

export default ClinicTable

const Wrapper = styled.div`

.list-group {
    @media screen and (max-width: 768px) {
      width: 21rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 100%;
    }
  }
  .hdd {
    @media screen and (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
  

  
  
  .tab-pane{
    @media screen and (max-width: 768px){
    width: 90%;
    
    }
  }
  #tab1{
    @media screen and (max-width: 768px){
    margin-left: -1.1rem;
    
    }
  }
  #myTab{
    @media screen and (max-width: 768px){
    margin-left: 0rem;
    
    }

  }  


`