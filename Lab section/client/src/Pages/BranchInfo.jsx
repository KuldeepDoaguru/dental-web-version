import React, { useEffect, useState } from 'react'

import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Header from '../components/MainComponents/Header';
import Sider from '../components/MainComponents/Sider';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

const BranchInfo = () => {
    const [branchDetail,setBranchDetail] = useState([]);
    const [branchHolidays,setBranchHolidays] = useState([]);

    const currentUser = useSelector(state => state.auth.user);
    const  branch = currentUser?.branch_name;
     const navigate = useNavigate()

    const goBack = (event) => {
   
      navigate('/'); // This goes back to the previous page
  };
  
  const token = currentUser?.token;

    const getBranchDetail = async ()=>{
        try{
           const response = await axios.get(`https://dentalgurulab.doaguru.com/api/lab/get-branch-detail/${branch}`,
           {
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
           }})
           console.log(response)
           setBranchDetail(response.data.data)
        }
        catch(error){
          console.log(error)
        }
      }
    
      const getBranchHolidays = async ()=>{
        try{
           const response = await axios.get(`https://dentalgurulab.doaguru.com/api/lab/get-branch-holidays/${branch}`,
           {
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
           }})
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
      <div className="col-lg-11 col-md-11 col-11" id="set" style={{marginTop:"3rem"}}>
            <div className="container-fluid  shadow p-3 mt-5 bg-body rounded">
                <div className="row">
                <div className="col-lg-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  </div>
                    <div className="col-lg-12 col-12 mt-4">
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
                                    <p className="m-0">{branchDetail[0]?.open_time ? moment(branchDetail[0]?.open_time, 'HH:mm:ss.SSSSSS').format('hh:mm A') : ""} </p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                            <label className="text-info">Close Time</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.close_time ? moment(branchDetail[0]?.close_time, 'HH:mm:ss.SSSSSS').format('hh:mm A') : ""}</p>
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
                             <td>{data?.holiday_date ? moment(data?.holiday_date).format('DD/MM/YYYY') : ""}</td>
                             <td>{data?.holiday_start_time ? moment(data?.holiday_start_time, 'HH:mm:ss.SSSSSS').format('hh:mm A') : ""}</td>
 
                             <td>{data?.holiday_end_time ? moment(data?.holiday_end_time, 'HH:mm:ss.SSSSSS').format('hh:mm A') : ""}</td>
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


  
  .header{
  position: fixed;
  min-width: 100%;
  z-index: 100;
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
    background-color: #213555;
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