import React from 'react'
import styled from 'styled-components'
import Sider from '../../components/receptionist/Sider'
import Header from '../../components/receptionist/Header'
import { Link } from 'react-router-dom'

function DoctorSection() {
  return (
    <Wrapper>
        <Header/>
           <div className="row flex-nowrap">
    <div className="col-lg-1 col-1 " id='sider'>
   <Sider/>
   </div>
   <div className="col-lg-11">
    <div className="row" id='row1'>
      <div className="col-lg-11">
      <div class="input-group mt-4">
  <div class="form-outline">
    <input type="search" id="form1" class="form-control" />
    <label class="form-label" for="form1">Search</label>
  </div>
  <button type="button" class="btn btn-primary h-100">
  <i class="bi bi-search"></i>
  </button>
</div>
          <div className="widget-area-2 proclinic-box-shadow" id='tableres'>
                   
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Doctor Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Appointment</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>D5676</td>
                          <td> Dr.Mohit Pawar</td>
                            <td>934839222</td>
                            <td>mohitpawar.gmail.com</td>

                            <td>Male</td>
                            <td>
                             Ranital Gate no.4 Jabalpur
                            </td>
                            <td><Link to='/doctor_profile'>View Details</Link></td>
                          </tr>
                          <tr>
                            <td>D5676</td>
                     <td>Dr.Mohit Pawar</td>
                            <td>934839222</td>
                            <td>mohitpawar.gmail.com</td>

                            <td>Male</td>
                            <td>
                             Ranital Gate no.4 Jabalpur
                            </td>
                           <td><Link to='/doctor_profile'>View Details</Link></td>
                          </tr>
                          <tr>
                            <td>D5676</td>
                            <td>Dr.Mohit Pawar</td>
                            <td>934839222</td>
                            <td>mohitpawar.gmail.com</td>

                            <td>Male</td>
                            <td>
                             Ranital Gate no.4 Jabalpur
                            </td>
                           <td><Link to='/doctor_profile'>View Details</Link></td>
                          </tr>
                          <tr>
                            <td>D5676</td>
                            <td>Dr.Mohit Pawar</td>
                            <td>934839222</td>
                            <td>mohitpawar.gmail.com</td>

                            <td>Male</td>
                            <td>
                             Ranital Gate no.4 Jabalpur
                            </td>
                           <td><Link to='/doctor_profile'>View Details</Link></td>
                          </tr>
                          <tr>
                            <td>D5676</td>
                            <td>Dr.Mohit Pawar</td>
                            <td>934839222</td>
                            <td>mohitpawar.gmail.com</td>

                            <td>Male</td>
                            <td>
                             Ranital Gate no.4 Jabalpur
                            </td>
                           <td><Link to='/doctor_profile'>View Details</Link></td>
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

export default DoctorSection
const Wrapper = styled.div`
#row1{
  @media screen and (max-width: 768px) {
    width: 22rem;
    margin-left: 0.7rem;
  }
}
#sider{
  @media screen and (max-width: 768px) {
    height: 46rem;
  }
}
td{
  padding: 2rem;
}

`