import React from 'react'
import styled from 'styled-components'
import Header from '../../components/receptionist/Header'
import Sider from '../../components/receptionist/Sider'
import { Link } from 'react-router-dom'
function NewPatient() {




  return (
    <Wrapper>
        <Header/>
      
        <div className="row flex-nowrap ">
    <div className="col-lg-1 col-1" id='hd'>
   <Sider/>
    </div>
    <div className="col-lg-11 mt-2" id='set'>
      <div className="row" >
   <div className="col-lg-12" id='head'>
   <nav class="navbar navbar-light bg-light">
            <h6 className='mx-3'>Search By Patient</h6>
  <div class="container-fluid" id='cont'>
    <form class="navbar1 " >
      <input class="form-control me-2" type="search" placeholder="Enter Patient Name Or Moblie Or Email" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>

  </div>
</nav>  
   </div>
   <div className="col-lg-12">
   <div className="widget-area-2 proclinic-box-shadow mx-3 mt-5" id='tableres'>
                    <h5 className="widget-title" id='title'>Appointment of New Patient</h5>

                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Patient Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Appointment</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>P459</td>
                            <td>Umer Qureshi</td>
                            <td>934839222</td>
                            <td>Umer@gmail.com</td>

                            <td>Male</td>
                            <td>
                            Raintal Gate no.4 Jabalpur
                            </td>
                            <td>Last Appointment-15 feb 2023</td>
                            <td>View Bills </td>
                          </tr>
                          <tr>
                            <td>P459</td>
                            <td>Umer Qureshi</td>
                            <td>934839222</td>
                            <td>Umer@gmail.com</td>

                            <td>Male</td>
                            <td>
                            Raintal Gate no.4 Jabalpur
                            </td>
                            <td>Last Appointment-15 feb 2023</td>
                            <td>View Bills </td>
                          </tr>
                          <tr>
                            <td>P459</td>
                            <td>Umer Qureshi</td>
                            <td>934839222</td>
                            <td>Umer@gmail.com</td>

                            <td>Male</td>
                            <td>
                            Raintal Gate no.4 Jabalpur
                            </td>
                            <td>Last Appointment-15 feb 2023</td>
                            <td>View Bills </td>
                          </tr>
                          <tr>
                            <td>P459</td>
                            <td>Umer Qureshi</td>
                            <td>934839222</td>
                            <td>Umer@gmail.com</td>

                            <td>Male</td>
                            <td>
                            Raintal Gate no.4 Jabalpur
                            </td>
                            <td>Last Appointment-15 feb 2023</td>
                            <td>View Bills </td>
                          </tr>
                          <tr>
                            <td>P459</td>
                            <td>Umer Qureshi</td>
                            <td>934839222</td>
                            <td>Umer@gmail.com</td>

                            <td>Male</td>
                            <td>
                            Raintal Gate no.4 Jabalpur
                            </td>
                            <td>Last Appointment-15 feb 2023</td>
                            <td>View Bills </td>
                          </tr>
                          <tr>
                            <td>P459</td>
                            <td>Umer Qureshi</td>
                            <td>934839222</td>
                            <td>Umer@gmail.com</td>

                            <td>Male</td>
                            <td>
                            Raintal Gate no.4 Jabalpur
                            </td>
                            <td>Last Appointment-15 feb 2023</td>
                            <td>View Bills </td>
                          </tr>
                         <tr>
                            <td>P459</td>
                            <td>Umer Qureshi</td>
                            <td>934839222</td>
                            <td>Umer@gmail.com</td>

                            <td>Male</td>
                            <td>
                            Raintal Gate no.4 Jabalpur
                            </td>
                            <td>Last Appointment-15 feb 2023</td>
                            <td>View Bills </td>
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

export default NewPatient
const Wrapper = styled.div`
.navbar1{
  display: flex;
  width: 25%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
#cont{
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
}
#drop{
  @media screen and (max-width: 768px) {
   width: 100%;
  }
}
#head{
  
  @media screen and (max-width: 768px) {
  width: 85%;
  margin-left: 1.2rem;
  }
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
#tableres{
  @media screen and (max-width: 768px) {
    width: 21rem;
   
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
   width: 42rem;
  }
}

`
