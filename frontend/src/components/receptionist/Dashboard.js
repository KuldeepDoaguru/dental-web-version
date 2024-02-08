import {React,useEffect} from 'react'
import styled from "styled-components";
import Navbar from './Navbar';



function Dashboard() {
    

  return (
    <>
    <Wrapper>
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-2 d-none d-sm-inline  ">Dental Guru</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                   
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline text-white">Dashboard</span> </a>
                       
                    </li>
                    <li>
                        <a href="#" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline text-white">Appointment Management</span></a>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                            <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline text-white">Billing & Payment Management</span></a>
                      
                    </li>
                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline text-white">Inquiry Management</span> </a>
                           
                    </li>
                    <li>
                        <a href="#" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi bi-gear"></i> <span className="ms-1 d-none d-sm-inline text-white">Settings</span> </a>
                    </li>
                </ul>
                <hr/>
                {/* <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"/>
                        <span class="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider"/>
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div> */}
            </div>
        </div>
        <div class="col py-3">
           <Navbar/>
           {/* <div className='col-6'>
           <div class="card text-center">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" aria-current="true" href="#">Appointments</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Check Ins</a>
      </li>
     
    </ul>
  </div>
  <div ></div>
  <div className="card-body">
    <h5 className="card-title">Special title treatment</h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
           </div> */}
           <div className='col-12 col-md-4' >
           <div class="card">
           <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Appointments</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Check Ins</button>
  </li>
  
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
  <ul class="list-group">
  <li class="list-group-item">
  <i class="bi bi-activity"></i> <span className='text-danger fw-bolder'> Amit Shukla</span><span className='float-end'>  <i class="bi bi-clock"></i><span className='text-primary' > 09:00</span> </span>
  </li>

  <li class="list-group-item "><i class="bi bi-activity"></i> <span className='text-danger fw-bolder'>Rajesh Gupta</span><span className='float-end'> <i class="bi bi-clock"></i> 09:00</span></li>
  <li class="list-group-item "><i class="bi bi-activity"></i> <span className='text-danger fw-bolder' >Sahil Khare</span><span className='float-end'> <i class="bi bi-clock"></i> 10:00</span></li>
  <li class="list-group-item "><i class="bi bi-activity"></i><span className='text-danger fw-bolder'>Devansh dubey</span><span className='float-end'> <i class="bi bi-clock"></i> 10:30</span></li>
  <li class="list-group-item "><i class="bi bi-activity"></i><span className='text-danger fw-bolder'>Kushagra Mishra</span><span className='float-end'> <i class="bi bi-clock"></i> 11:00</span></li>

 
</ul>
  </div>
  <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
  <ul class="list-group">
  <li class="list-group-item">A simple default list group item</li>

  <li class="list-group-item ">A simple primary list group item</li>
  <li class="list-group-item ">A simple secondary list group item</li>
  <li class="list-group-item ">A simple success list group item</li>
  <li class="list-group-item ">A simple danger list group item</li>

 
</ul>
    </div>

</div>
</div> 
</div> 
        </div>
        
    </div>
    
</div>

</Wrapper>
   
    </>
  )
}

export default Dashboard;

const Wrapper = styled.div`
 

`;
