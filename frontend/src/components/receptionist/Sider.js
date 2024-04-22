


import React from "react";
import { Link, useLocation,useNavigate  } from "react-router-dom";
import styled from "styled-components";
// import { MdOutlineInventory } from "react-icons/md";



// import { ImLab } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
 import { clearUser } from '../../redux/user/userSlice';
import { useDispatch } from "react-redux";
 // import { useDispatch } from 'react-redux'

const Sider = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () =>{
        // Display a confirmation popup
        const isConfirmed = window.confirm('Are you sure you want to Logout?');
     
        if (!isConfirmed) {
          // If the user cancels the deletion, do nothing
          return;
        }
        navigate("/")
         dispatch(clearUser())
         
       }

  const getSidebarClass = (path) => {
    return location.pathname === path ? "active-nav" : "";
  };

  return (
    <Wrapper>
      <div className="px-sm-2 px-0" id="sidebar">
        <div className="d-flex flex-column align-items-center  px-3 pt-4">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center "
            id="menu"
          >
         

            <li>
              <Link
                to="/receptionist-dashboard"
                className={`link-div ${getSidebarClass("/receptionist-dashboard")}`}
              >
                <div>
                  <i className="fs-4 bi bi-house-door-fill"></i>
                </div>
                <div>
                  <h3 className=" d-none d-sm-inline" id="navleft1">
                    Dashboard
                  </h3>
                </div>
              </Link>
            </li>
          
            <hr />
            <li>
              <Link
                to="/all_patient"
                className={`link-div ${getSidebarClass("/all_patient")}`}
              >
                <div>
                <i className="bi bi-people-fill h1"></i>
                </div>
                <div>
                  <h3 className=" d-none d-sm-inline " id="navleft1">
                  Patients
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to="/inquiry"
                className={`link-div ${getSidebarClass("/inquiry")}`}
              >
                <div>
                <i className="fs-4 bi bi-table"></i>
                </div>
                <div>
                  <h3 className=" d-none d-sm-inline " id="navleft1">
                  Inquiry
                  </h3>
                </div>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to="/doctor_section"
                className={`link-div ${getSidebarClass("/doctor_section")}`}
              >
                <div>
                <i className="fs-4 bi bi-person-fill"></i>
                </div>
                <div>
                  <h3 className=" d-none d-sm-inline" id="navleft1">
                  Doctor
                  </h3>
                </div>
              </Link>
            </li>
          
            <hr />

            <li>
              <Link
                to="/security_amount"
                className={`link-div ${getSidebarClass("/security_amount")}`}
              >
                <div>
                <i class="fs-4 bi bi-currency-rupee"></i>
                </div>
                <div>
                  <h3 className="text-center " id="navleft1">
                  Security Amount
                  </h3>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/due_amount"
                className={`link-div ${getSidebarClass("/due_amount")}`}
              >
                <div>
                <i class="fs-4 bi bi-currency-rupee"></i>
                </div>
                <div>
                  <h3 className="text-center " id="navleft1">
                  Due Amount
                  </h3>
                </div>
              </Link>
            </li>
          
            <hr />
            {/* <li>
              <Link
                to="/lab"
                className={`link-div ${getSidebarClass("/lab")}`}
              >
                <div>
                <i className="fs-4 bi bi-file-medical"></i>
                </div>
                <div>
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft1">
                  Lab
                  </h3>
                </div>
              </Link>
            </li>
          
            <hr /> */}
            {/* <li>
              <Link
                to="/video"
                className={`link-div ${getSidebarClass("/video")}`}
              >
                <div>
                <i className="fs-4 bi bi-camera-video"></i>
                </div>
                <div>
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft1">
                  Videos
                  </h3>
                </div>
              </Link>
            </li>
          
            <hr /> */}
            
          
            <li>
              <Link>
              <div className="link-div">
                <div>
                  <i className="fs-4 bi bi-power" onClick={logout}></i>
                </div>
                <div className="text-light" onClick={logout} id="navleft1">
                  Logout
                  {/* <button className="btn btn-danger d-none d-sm-inline">
                    Logout
                  </button> */}
                </div>
              </div>
              </Link>
            </li>
            <hr />
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default Sider;
const Wrapper = styled.div`
  #navleft1 {
    font-size: 13px;
    margin-left: 0rem;
    color: white;
    @media screen and (max-width : 1200px) {
      font-size: 10px;
    }

  }
  #navleft2 {
    font-size: 12px;
    margin-left: 0rem;
    color: white;
  }
  #navleft {
    font-size: 12px;
    margin-left: -0.2rem;
    color: white;
  }
  #sidebar {
    width: 80%;
    min-height: 100vh;

    
    
    background-color: teal;
    @media screen and (max-width: 768px) {
      width: 3rem;
      height: 212rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 5rem;
      height: 151rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
      width: 96%;
      
    }
  }
  .bi {
    color: white;
   
  }

  li:hover {
    color: #8ae6ff;
  }

  .link-div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  a {
    text-decoration: none;
  }

  .active-nav {
    background-color:  #66b2b2;
    padding: 0.4rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;