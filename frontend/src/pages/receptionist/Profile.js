import React from "react";
import styled from "styled-components";

import Sider from "../../components/receptionist/Sider";
import Header from "../../components/receptionist/Header";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";

const Profile = () => {

    const {refreshTable,currentUser} = useSelector((state) => state.user);
  const  branch = currentUser?.branch_name;
    // Function to convert 24-hour time to AM/PM format
const convertToAMPM = (time) => {
    const [hours, minutes] = time?.split(':');
    let suffix = 'AM';
    let formattedHours = parseInt(hours, 10);
  
    if (formattedHours >= 12) {
      suffix = 'PM';
      formattedHours = formattedHours !== 12 ? formattedHours - 12 : formattedHours;
    }
  
    return `${formattedHours}:${minutes} ${suffix}`;
  };
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
                        <h3>Employee Profile</h3>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <img src={currentUser?.employee_picture} alt="profile" className="img-fluid rounded"/>
                </div>
                <div className="col-lg-8">
                    <div className="row mb-3">
                        <div className="col-lg-4">
                            <label className="text">Employee ID</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.employee_ID}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text">Employee Name</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.employee_name}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text">Email</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.employee_email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-4">
                            <label className="text">Gender</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.gender}</p>
                            </div>
                        </div>
                       
                        <div className="col-lg-4">
                        <label className="text">Address</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.address}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label className="text">Designation</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.employee_designation}</p>
                            </div>
                        </div>
                    </div>
                  
                    <div className="row mb-3">
                        
                       
                        <div className="col-lg-4">
                        <label className="text">Mobile No.</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.employee_mobile}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text">Working Days</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.working_days}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text">Employee Role</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0 text-wrap">{currentUser?.employee_role}</p>

                            </div>
                        </div>
                        
                    </div>
                    {/* <div className="row mb-3">
                        
                  
                    <div className="col-lg-4">
                        <label className="text">Morning Shift Start Time</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{convertToAMPM(currentUser?.morning_shift_start_time)}</p>
                            </div>
                        </div>
                    <div className="col-lg-4">
                        <label className="text">Morning Shift End Time</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{convertToAMPM(currentUser?.morning_shift_end_time)}</p>
                            </div>
                        </div>
                    <div className="col-lg-4">
                        <label className="text">Evening Shift Start Time</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{convertToAMPM(currentUser?.evening_shift_start_time)}</p>
                            </div>
                        </div>
                       
                       
                    </div> */}
                    <div className="row mb-3">
                        
                  
                    {/* <div className="col-lg-4">
                        <label className="text">Evening Shift End Time</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{convertToAMPM(currentUser?.evening_shift_end_time)}</p>
                            </div>
                        </div> */}
                    <div className="col-lg-4">
                        <label className="text">All Day Shift Start Time</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{convertToAMPM(currentUser?.allday_shift_start_time)}</p>
                            </div>
                        </div>
                    <div className="col-lg-4">
                        <label className="text">All Day Shift End Time</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{convertToAMPM(currentUser?.allday_shift_end_time)}</p>
                            </div>
                        </div>
                       
                       
                    </div>
                   
                   
                </div>
            </div>
        </div>
        </div>
        </div>

      </Wrapper>
    </>
  );
};

export default Profile;
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

  @media screen and (min-width: 2000px) and (max-width: 2500px) {
   margin-left: 0rem;
    
  }
}
.text{
    color: teal;
    font-weight: 500;
}
`;