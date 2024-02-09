import React from 'react'
import styled from 'styled-components'

function TreatmentDoc() {
  return (
    <Wrapper>
       <div className="row mt-5" id='row2'>
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
                <th>Treatment</th>
                <th>Patient Name</th>
               <th>Cost</th>
                <th>Treatment Status</th>
                <th>Bill Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25-10-23</td>
                <td>Root Canal</td>
                <td>Umer Qureshi</td>
                <td>4000</td>
                <td>Upcoming</td>
                <td>Unbilled</td>
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
                <td>Root Canal</td>
                <td>Umer Qureshi</td>
                <td>4000</td>
                <td>Upcoming</td>
                <td>Unbilled</td>
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
                <td>Root Canal</td>
                <td>Umer Qureshi</td>
                <td>4000</td>
                <td>Upcoming</td>
                <td>Unbilled</td>
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
                 Treatment
              </h6>
              <p className="card-text">
                <ul className="sec" id="section1">
                    
                  <div className="data">
                    <li className="dotrem text-black">Missed</li>

                    <li className="dotrem1  text-bg-danger rounded-5">54</li>
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
                  <div className="data">
                    <li className="dotrem text-black">Billed</li>
                    <li className="dotrem1    text-bg-success rounded-5 ">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black">Unbilled</li>
                    <li className="dotrem1    text-bg-success rounded-5 ">
                      54
                    </li>
                  </div>
                </ul>
              </p>
            </div>
          </div>
                
                  </div>
                </div>
    </Wrapper>
  )
}

export default TreatmentDoc
const Wrapper = styled.div`
   #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 15rem;
    height: 22rem;
    @media screen and (max-width: 768px) {
      width:91%;
      margin-left: -0.5rem;
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
`
