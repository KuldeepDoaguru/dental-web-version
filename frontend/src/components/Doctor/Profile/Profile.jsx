import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/user/userSlice';

const Profile = () => {
    const currentUser = useSelector(state => state.user.currentUser);
  return (
    <>
      <Wrapper>
        <div className="container shadow p-3 mt-5 bg-body rounded">
            <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="text-start p-2">
                        <h3>Doctor Profile</h3> 
                        <hr />
                    </div>
                </div>
            </div>
            {currentUser && (
            <div className="row">
                <div className="col-lg-4">
                    <img src={currentUser.employee_picture} alt="doctor-profile" className="img-fluid rounded"/>
                </div>
                <div className="col-lg-8">
                    <div className="row mb-3">
                        <div className="col-lg-4">
                            <label className="text-info">UserID</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.employee_ID}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">User Name</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">Dr. {currentUser.employee_name}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">Email</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-lg-4">
                        <label className="text-info">Mobile No.</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.employee_mobile}</p>
                            </div>
                        </div>
                        {/* <div className="col-lg-4">
                            <label className="text-info">Sex</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.gender}</p>
                            </div>
                        </div> */}
                        {/* <div className="col-lg-4">
                        <label className="text-info">Reg.No</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">123</p>
                            </div>
                        </div> */}
                        <div className="col-lg-4">
                            <label className="text-info">Designation</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.employee_designation}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">Address</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.address}</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row mb-3">
                        <div className="col-lg-4">
                            <label className="text-info">Designation</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.employee_designation}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">Specialization</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">Doctor Specialization</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">Pin</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">482002</p>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row mb-3">
                        <div className="col-lg-4">
                        <label className="text-info">Mobile No.</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.employee_mobile}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label className="text-info">Country</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0"></p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">State</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">Madhya Pradesh</p>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="row mb-3">
                        <div className="col-lg-4">
                            <label className="text-info">Experience</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">2 Years</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">Last Degree</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">B.com</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <label className="text-info">College Name</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">Mahakousal</p>
                            </div>
                        </div>
                    </div> */}
                    <div className="row">
                    <div className="col-lg-4">
                        <label className="text-info">Working Days</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.working_days}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label className="text-info">Morning Working Shift</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.morning_shift_start_time} - {currentUser.morning_shift_end_time}</p>
                            </div>
                        </div>
                        
                        <div className="col-lg-4">
                        <label className="text-info">Evening Working Shift</label>
                            <div className="shadow-none p-1 bg-light rounded">
                                <p className="m-0">{currentUser.evening_shift_start_time} - {currentUser.evening_shift_end_time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
      </Wrapper>
    </>
  );
};

export default Profile;
const Wrapper = styled.div`
img{
    width: 100%;
    height: 26rem;
}
`;
