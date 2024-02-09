import React from 'react'
import TreatmentDoc from './TreatmentDoc'
import styled from 'styled-components'

function NavbarDoc() {
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
               Appointment
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
               Treatment
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
            
            

                <div className="row mt-5 " id='row2'>
                  <div className="col-lg-8" id="tableresponsive">
                  <div
        className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
        id="tableres"
      >
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Appointment Time</th>
                <th>Patient Name</th>
                <th>Treatment</th>
               
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25-10-23</td>
                <td>10:00</td>
                <td>Umer Qureshi</td>
                <td>Root Canal</td>
             
                <td>Upcoming</td>
                 <td>
                  {" "}
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Action
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          edit
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item " href="#">
                         View
                        </a>
                      </li>

                      
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>25-10-23</td>
                <td>10:00</td>
                <td>Umer Qureshi</td>
                <td>Root Canal</td>
             
                <td>Upcoming</td>
                 <td>
                  {" "}
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Action
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          edit
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item " href="#">
                         View
                        </a>
                      </li>

                      
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>25-10-23</td>
                <td>10:00</td>
                <td>Umer Qureshi</td>
                <td>Root Canal</td>
             
                <td>Upcoming</td>
                 <td>
                  {" "}
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Action
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          edit
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item " href="#">
                         View
                        </a>
                      </li>

                      
                    </ul>
                  </div>
                </td>
              </tr>

           
            </tbody>
          </table>
        </div>
      </div>
                   
                  
                    </div>
                  <div className="col-lg-4" id="">
                  <div className="card" id="card1">
            <div className="card-body">
              <h6 className="card-title" style={{ color: " #5a626d" }}>
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
                 <TreatmentDoc/>
                  </li>
                </ul>
              </div>
          
            
            </div>
          </ul> 
    </Wrapper>
  )
}

export default NavbarDoc
const Wrapper = styled.div`

#myTab{
     @media screen and (max-width: 768px) {
      width: 90%;
      margin-left: 1.2rem;
      
    }
  }
  #app{
    width: 81rem;



  }
  #home-tab-pane{
    width: 81rem;
  }
  #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 15rem;
    height: 22rem;
    @media screen and (max-width: 768px) {
        width: 95%;

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
  
  #row2{
    @media screen and (max-width: 768px) {
      width: 23rem;

    }
  }
  #tableresponsive{
    @media screen and (max-width: 768px) {
      margin-left: -1.1rem;
      margin-bottom: 5px;


    }
  }
`