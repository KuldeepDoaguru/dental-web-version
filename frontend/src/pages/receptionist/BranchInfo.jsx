import React, { useEffect, useState } from 'react'
import Header from '../../components/receptionist/Header';
import Sider from '../../components/receptionist/Sider';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Lottie from "react-lottie";
import animationData from "../../images/animation/loading-effect.json";
import { IoMdArrowRoundBack } from "react-icons/io";

const BranchInfo = () => {
    const [branchDetail,setBranchDetail] = useState([]);
    const [branchHolidays,setBranchHolidays] = useState([]);

    const {refreshTable,currentUser} = useSelector((state) => state.user);
    const  branch = currentUser?.branch_name;
    const token = currentUser?.token;
    const [loadingEffect, setLoadingEffect] = useState(false);
    const getBranchDetail = async ()=>{
        try{
           const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branch-detail/${branch}`)
           console.log(response)
           setBranchDetail(response.data.data)
        }
        catch(error){
          console.log(error)
        }
      }
    
      const getBranchHolidays = async ()=>{
        setLoadingEffect(true);
        try{
           const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branch-holidays/${branch}` ,
           {
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
           }
           })
           console.log(response)
           setBranchHolidays(response.data.data)
           setLoadingEffect(false);
        }
        catch(error){
          console.log(error)
          setLoadingEffect(false);
        }
      }
  useEffect(()=>{
    getBranchDetail()
    getBranchHolidays()

  },[])
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      
    },
  };

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
      <button className="btn btn-success no-print" onClick={() => window.history.go(-1)}>
  <IoMdArrowRoundBack />  Back
            </button>
            <div className="container-fluid  shadow p-3 mt-3 bg-body rounded">
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
                                <label className="text">Clinic Name</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.hospital_name}</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <label className="text">Clinic Id</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.hospital_id}</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <label className="text">Branch Name</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.branch_name}</p>
                                </div>
                            </div>
                         
                           
                        </div>
                        <div className="row mb-3">
                               <div className="col-lg-4">
                            <label className="text">Branch Id</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.branch_id}</p>
                                </div>
                            </div>
                           
                            <div className="col-lg-4">
                            <label className="text">Address</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.branch_address}</p>
                                </div>
                            </div>
                       
                            <div className="col-lg-4">
                                <label className="text">Contact Number</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.branch_contact}</p>
                                </div>
                            </div>
                           
                           
                          
                        </div>
                      
                        <div className="row mb-3">
                            
                           
                            <div className="col-lg-4">
                            <label className="text">Email</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.branch_email}</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                            <label className="text">Open Time</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.open_time ? moment(branchDetail[0]?.open_time, 'HH:mm:ss.SSSSSS').format('hh:mm A') : ""} </p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                            <label className="text">Close Time</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.close_time ? moment(branchDetail[0]?.close_time, 'HH:mm:ss.SSSSSS').format('hh:mm A') : ""}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            
                           
                            <div className="col-lg-4">
                            <label className="text">Week Off</label>
                                <div className="shadow-none p-1 bg-light rounded">
                                    <p className="m-0">{branchDetail[0]?.week_off}</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                            <label className="text">Slot Duration</label>
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
                    
   {loadingEffect ? (
            
            <Lottie
                          options={defaultOptions}
                          height={300}
                          width={400}
                          style={{ background: "transparent" }}
                        ></Lottie>
          
          ) : (
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
                        {  branchHolidays?.length === 0 ? (
              <div className="no-data-container">
              <h4>No Data Found</h4>
            </div>
            ) : (
                        <tbody>
                          {branchHolidays?.map((data,index)=>(
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
            )}
                      </table>
                    </div>
          )}
                
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
@media screen and (min-width: 1500px) and (max-width: 1800px) {
  margin-left: -1.9rem;
  
}

  @media screen and (min-width: 1800px) and (max-width: 2500px) {
   margin-left: 0rem;
    
  }
}
#tableres{
  
  @media screen and (max-width: 768px) {
    width: auto;
   margin: auto;
   
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
.table-responsive {
  position: relative;
  min-height: 10rem;
}

.loading-container,
.no-data-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px; /* Adjust as necessary */
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.no-data-container h4 {
  margin: 0;
}
.text{
  color: teal;
  font-weight: 500;
}
`;