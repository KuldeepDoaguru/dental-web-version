import React from "react";
import styled from "styled-components";

import Sider from "../../components/receptionist/Sider";
import Header from "../../components/receptionist/Header";
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {

    const {refreshTable,currentUser} = useSelector((state) => state.user);
  const  branch = currentUser?.branch_name;
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
                        <h3>Receptionist Profile</h3>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <img src="https://cirrusindia.co.in/wp-content/uploads/2016/10/dummy-profile-pic-male1.jpg" alt="profile" className="img-fluid rounded"/>
                </div>
                <div className="col-lg-8">
                    <div className="row mb-3">
                        <div className="col-lg-4">
                            <label className="text-info">UserID</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.employee_ID}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">User Name</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.employee_name}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">Email</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.employee_email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-4">
                            <label className="text-info">Sex</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.gender}</p>
                            </div>
                        </div>
                       
                        <div className="col-lg-4">
                        <label className="text-info">Address</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.address}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label className="text-info">Designation</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.employee_designation}</p>
                            </div>
                        </div>
                    </div>
                  
                    <div className="row mb-3">
                        
                       
                        <div className="col-lg-4">
                        <label className="text-info">Mobile No.</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.employee_mobile}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">Working Days</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser?.working_days}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">Working Shift</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">12PM - 2PM</p>
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
}
`;