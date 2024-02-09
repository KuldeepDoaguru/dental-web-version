import React from 'react'
import styled from 'styled-components'
import Header from '../../components/receptionist/Header'
import Sider from '../../components/receptionist/Sider'
import EditLab from '../../components/receptionist/LabSection/EditLab'
import AddbLab from '../../components/receptionist/LabSection/AddLab'

function LabSection() {
  return (
    <Wrapper>
        <Header/>
   <div className="row flex-nowrap">
    <div className="col-lg-1 col-1 " id='sider'>
   <Sider/>
   </div>
   <div className="col-lg-11">
    <div className="row">
      <div className="col-lg-10">
      <div className="card" id="card1">
            <div className="card-body">
              <h6 className="card-title" style={{ color: " black" }}>
                 Lab  Job Status
              </h6>
              <p className="card-text">
                <ul className="sec d-flex gap-2" id="section1">
                    
                  <div className="data">
                    <li className="dotrem text-black">Advised</li>

                    <li className="dotrem1  text-bg-danger rounded-5">54</li>
                  </div>
              
                  <div className="data">
                    <li className="dotrem text-black ">Sample Details/Collected</li>
                    <li className="dotrem1   text-bg-warning rounded-5  text-white">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black">Processing/Sent</li>
                    <li className="dotrem1  text-bg-primary rounded-5 ">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black">Completed</li>
                    <li className="dotrem1  text-bg-primary rounded-5 ">
                      54
                    </li>
                  </div>
                 
                </ul>
              </p>
            </div>
          </div>
      </div>
      <div className="col-lg-1">
        <p className='' id='bt'><AddbLab/></p>
      </div>
  
   
            
          <div className="col-lg-11 ">
          <div
        className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
        id="tableres"
      >
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Lab Job Id</th>
                <th>Consultant</th>
                <th>Test/Task</th>
                <th>Patient</th>
                <th>Lab</th>
                <th>Bill</th>
                <th>Due Date</th>
                <th>Reports</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25-10-23</td>
                <td>LAB-5455</td>
                <td>Dr.Umer Qureshi</td>
                <td>Sample Blood Test</td>
                <td>Amit Kumar</td>
                <td>External Lab</td>
                <td>Add Bill</td>
                <td>23 feb 2023</td>
                <td>Add Report</td>
                <td>Advised</td>
                   <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul class="dropdown-menu">
  <li><a class="dropdown-item mx-0" href="#"><EditLab/></a></li>
    <li><a class="dropdown-item mx-0 " href="#">Email Report</a></li>
   
  
  </ul>
</div>
              </tr>
              <tr>
                <td>25-10-23</td>
                <td>LAB-5455</td>
                <td>Dr.Umer Qureshi</td>
                <td>Sample Blood Test</td>
                <td>Amit Kumar</td>
                <td>External Lab</td>
                <td>Add Bill</td>
                <td>23 feb 2023</td>
                <td>Add Report</td>
                <td>Advised</td>
                   <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul class="dropdown-menu">
  <li><a class="dropdown-item mx-0" href="#"><EditLab/></a></li>
    <li><a class="dropdown-item mx-0 " href="#">Email Report</a></li>
   
  
  </ul>
</div>
              </tr>
              <tr>
                <td>25-10-23</td>
                <td>LAB-5455</td>
                <td>Dr.Umer Qureshi</td>
                <td>Sample Blood Test</td>
                <td>Amit Kumar</td>
                <td>External Lab</td>
                <td>Add Bill</td>
                <td>23 feb 2023</td>
                <td>Add Report</td>
                <td>Advised</td>
                   <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul class="dropdown-menu">
  <li><a class="dropdown-item mx-0" href="#"><EditLab/></a></li>
    <li><a class="dropdown-item mx-0 " href="#">Email Report</a></li>
   
  
  </ul>
</div>
              </tr>
              <tr>
                <td>25-10-23</td>
                <td>LAB-5455</td>
                <td>Dr.Umer Qureshi</td>
                <td>Sample Blood Test</td>
                <td>Amit Kumar</td>
                <td>External Lab</td>
                <td>Add Bill</td>
                <td>23 feb 2023</td>
                <td>Add Report</td>
                <td>Advised</td>
                   <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul class="dropdown-menu">
  <li><a class="dropdown-item mx-0" href="#"><EditLab/></a></li>
    <li><a class="dropdown-item mx-0 " href="#">Email Report</a></li>
   
  
  </ul>
</div>
              </tr>
              <tr>
                <td>25-10-23</td>
                <td>LAB-5455</td>
                <td>Dr.Umer Qureshi</td>
                <td>Sample Blood Test</td>
                <td>Amit Kumar</td>
                <td>External Lab</td>
                <td>Add Bill</td>
                <td>23 feb 2023</td>
                <td>Add Report</td>
                <td>Advised</td>
                   <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul class="dropdown-menu">
  <li><a class="dropdown-item mx-0" href="#"><EditLab/></a></li>
    <li><a class="dropdown-item mx-0 " href="#">Email Report</a></li>
   
  
  </ul>
</div>
              </tr>
              <tr>
                <td>25-10-23</td>
                <td>LAB-5455</td>
                <td>Dr.Umer Qureshi</td>
                <td>Sample Blood Test</td>
                <td>Amit Kumar</td>
                <td>External Lab</td>
                <td>Add Bill</td>
                <td>23 feb 2023</td>
                <td>Add Report</td>
                <td>Advised</td>
                   <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul class="dropdown-menu">
  <li><a class="dropdown-item mx-0" href="#"><EditLab/></a></li>
    <li><a class="dropdown-item mx-0 " href="#">Email Report</a></li>
   
  
  </ul>
</div>
              </tr>

           
            </tbody>
          </table>
        </div>
      </div>
         
          </div>
          </div>
   </div>
   </div>
    </Wrapper>
  )
}

export default LabSection
const Wrapper = styled.div`
 #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width:49rem;
    height: 8rem;
    margin-top: 12px;
    
    @media screen and (max-width: 768px) {
      width: 83%;
    margin-left: 20px;
    height: 22rem;

    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
    width: 50rem;
  }
  }

  .dotrem1 {
    list-style-type: none;
    width: 25px;
    padding-left:4px;
  }
  .dotrem {
    list-style-type: none;
    width: 12rem;
    margin-left: -0.5rem;
    @media screen and (max-width: 768px) {
      width: 11rem;

    }
  }
  .data{
  
  color: black;
   

 
}

  #section1{
    @media screen and (max-width: 768px) {
      flex-direction: column;

    }
  }
  #tableres{
    @media screen and (max-width: 768px) {
      width: 85%;
   
    }
  }
  #bt{
    margin-top: 4rem;
    margin-left : -3rem ;
    width: 120%;
    
  }
`