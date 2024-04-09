import React, { useEffect, useState } from 'react'
import Header from '../../components/receptionist/Header';
import Sider from '../../components/receptionist/Sider';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const BranchInfo = () => {
    const [branchDetail,setBranchDetail] = useState([]);
    const [branchHolidays,setBranchHolidays] = useState([]);

    const {refreshTable,currentUser} = useSelector((state) => state.user);
    const  branch = currentUser?.branch_name;
    const getBranchDetail = async ()=>{
        try{
           const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-branch-detail/${branch}`)
           console.log(response)
           setBranchDetail(response.data.data)
        }
        catch(error){
          console.log(error)
        }
      }
    
      const getBranchHolidays = async ()=>{
        try{
           const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-branch-holidays/${branch}`)
           console.log(response)
           setBranchHolidays(response.data.data)
        }
        catch(error){
          console.log(error)
        }
      }
  useEffect(()=>{
    getBranchDetail()
    getBranchHolidays()

  },[])

  console.log(branchDetail)
    return (
        <>
          <Wrapper>
          <div className='header'>
          <Header/>
          </div>
    
    <div className="row mrgnzero">
      <div className="col-lg-1 col-md-1 col-1" id="sider">
        <Sider />
      </div>
      <div className="col-lg-11 col-md-11 col-11" id="set">
            <div className="container-fluid  shadow p-3 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-lg-12 col-12">
                        <div className="text-start p-2">
                            <h3>Clinic Details</h3>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="row">
                   
                    <div className="col-lg-12">
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <label className="text-info">Clinic Name</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.hospital_name}</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <label className="text-info">Clinic Id</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.hospital_id}</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <label className="text-info">Branch Name</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.branch_name}</p>
                                </div>
                            </div>
                         
                           
                        </div>
                        <div className="row mb-3">
                               <div className="col-lg-4">
                            <label className="text-info">Branch Id</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.branch_id}</p>
                                </div>
                            </div>
                           
                            <div className="col-lg-4">
                            <label className="text-info">Address</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.branch_address}</p>
                                </div>
                            </div>
                       
                            <div className="col-lg-4">
                                <label className="text-info">Contact Number</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.branch_contact}</p>
                                </div>
                            </div>
                           
                           
                          
                        </div>
                      
                        <div className="row mb-3">
                            
                           
                            <div className="col-lg-4">
                            <label className="text-info">Email</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.branch_email}</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                            <label className="text-info">Open Time</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.open_time}</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                            <label className="text-info">Close Time</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.close_time}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            
                           
                            <div className="col-lg-4">
                            <label className="text-info">Week Off</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.week_off}</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                            <label className="text-info">Slot Duration</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.appoint_slot_duration}</p>
                                </div>
                            </div>
                           
                        </div>
                       
                       
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
   <div className="widget-area-2 proclinic-box-shadow  mt-5" id='tableres'>
                    
                    
                    <div className="table-responsive" style={{ overflowX: "auto" }}>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Holiday Id</th>
                            <th>Holiday Name</th>
                            <th>Holiday Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Note</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          {branchHolidays.map((data,index)=>(
                             <tr key={index}>
                             <td>{data.holiday_id}</td>
                             <td>{data.holiday_name	}</td>
                             <td>{moment(data?.holiday_date).format('DD/MM/YYYY') }</td>
                             <td>{data.holiday_start_time	}</td>
 
                             <td>{data.holiday_end_time}</td>
                             <td>{data.notes}</td>
                            
                             
                           
                           </tr>
                          ))}
                          
                          
                         
                        </tbody>
                      </table>
                    </div>
                
                  </div>
   </div>
            </div>
           
            </div>

    
          </Wrapper>
        </>
      );
}

export default BranchInfo

const Wrapper = styled.div`
img{
    
    
}
.mrgnzero {
    margin-right: 0rem;
  }
  #sider {
    padding-top: 60px; /* Height of header */
  min-height: 100vh;
  position: fixed;
  @media screen and (max-width: 768px) {
   height: 68rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
   height: 58rem;
  }
  }
  .header{
  position: fixed;
  min-width: 100%;
  z-index: 100;
}
#set{

margin-left: -4.5rem;
padding-left: 150px; /* Width of sidebar */
padding-top: 90px; /* Height of header */
flex-grow: 1;
overflow-y: auto;

@media screen and (max-width: 768px) {
  margin-left: -2rem;
}
@media screen and (min-width: 768px) and (max-width : 1020px) {
  margin-left: -2rem;
}
@media screen and (min-width: 1020px) and (max-width: 1500px) {
  margin-left: -2rem;
  
}
@media screen and (min-width: 1500px) and (max-width: 2000px) {
  margin-left: -1.9rem;
  
}
}
#tableres{
  
  @media screen and (max-width: 768px) {
    width: 21rem;
   
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
   width: auto;
   margin: auto;
   
  }
}
th{
    background-color: teal;
    color: white;
    white-space: nowrap;
  }
  td{
    white-space: nowrap;
  }
  .header{
  position: fixed;
  min-width: 100%;
  z-index: 100;
}
`;