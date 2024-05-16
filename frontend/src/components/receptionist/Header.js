import React from 'react'
import dental_logo from '../../images/dentalnew.png'
import { AiFillBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useDispatch ,useSelector} from "react-redux";
function Header() {
  const {currentUser} = useSelector((state) => state.user);
  const userName = currentUser.employee_name;
  const userId = currentUser.employee_ID;
  return (
    <Wrapper>

      <div className="container-fluid" style={{ backgroundColor: "teal" }}>

        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <Link to='/receptionist-dashboard'><img src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png" alt="Logo" width="75" height="50" style={{ marginLeft: "-1.3rem" }} /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to='/receptionist-dashboard' className="nav-link active text-white mt-2  fs-5" aria-current="page" >Dental Guru</Link>
                </li>
                
               
               
              </ul>
            
              
              <ul className='d-lg-flex d-sm-column'>
              <p className='  text-white   fs-6' style={{marginRight:"100px", marginTop: "1rem",marginBottom : "0"}}>Hello {userName} ({userId})</p>
            
                <li className="nav-item dropdown" id='userid'>
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUserAlt />
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link to='/receptionist_profile' className="dropdown-item">View Profile</Link></li>
                    <li><Link to='/attendanceLeave' className="dropdown-item">View Attendance & Leave</Link></li>
                    <li><Link to='/branch-details' className="dropdown-item">View Clinic Details</Link></li>
                    {/* <li><hr className="dropdown-divider" /></li> */}
                   

                  </ul>
                </li>
                {/* <li className="nav-item" id='bell'>
                  <AiFillBell />
                </li> */}
              </ul>

            </div>
          </div>
        </nav>
      </div>

    </Wrapper>
  )
}

export default Header
const Wrapper = styled.div`
box-shadow: 1px 1px 6px black;

#userid{
    
    margin-left: -5rem;
    list-style-type: none;
    margin-top: 1rem;
    margin-right: 50px;
    @media screen and  (max-width: 1000px) {
        margin-left: 0rem;
        margin-top: 1rem;
    }
}
#bell{
    margin-left: 1rem;
    list-style-type: none;
    @media screen and  (max-width: 768px) {
        margin-left: 0rem;
        margin-top: 1rem;

    }
}
.dropdown-menu{
   margin-left: -8rem;
   @media screen and  (max-width: 1000px) {
        margin-left: 0rem;
        
    }
}

`