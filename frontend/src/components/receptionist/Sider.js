// import React from 'react'
// import { useDispatch } from 'react-redux'
// import styled from 'styled-components'
// import { clearUser } from '../../redux/user/userSlice';
// import { Link, useLocation, useNavigate } from "react-router-dom";

// function Sider() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const logout = () =>{
//     // Display a confirmation popup
//     const isConfirmed = window.confirm('Are you sure you want to Logout?');
 
//     if (!isConfirmed) {
//       // If the user cancels the deletion, do nothing
//       return;
//     }
 
//      dispatch(clearUser())
//      navigate("/")
//    }
//   return (
//     <Wrapper> 
//     <div className=" px-sm-2 px-0 mt-1 " id="sidebar" >
//   <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2">

                
//                 <ul
//                   className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
//                   id="menu"
//                 >
//                   <li>
//                     <Link to="/receptionist-dashboard"> <a
                     
                    
//                     >
//                       <i className="fs-4 bi bi-house-door-fill"></i>
//                       <br />
//                       <span className=" d-none d-sm-inline " id="navleft1">
//                     Dashboard 
//                       </span>{" "}
//                     </a></Link>
//                   </li>
//                   {/* <li> <Link to='/appointment'>
//                     <a className="nav-link px-0 align-middle">
//                       <i className="fs-4 bi bi-table"></i>{" "}
//                       <br />
//                       <span className=" d-none d-sm-inline " id="navleft2">
//                        Appointment
//                       </span>
//                     </a>
//                  </Link> </li> */}
//                   <li> <Link to='/inquiry'>
//                     <a className="nav-link px-0 align-middle">
//                       <i className="fs-4 bi bi-table"></i>{" "}
//                       <br />
//                       <span className=" d-none d-sm-inline align-middle" id="navleft">
//                       Inquiry
//                       </span>
//                     </a>
//                  </Link> </li>
//                   {/* <li>
//                    <Link to='/bill_section'><a
                    
                      
//                     >
//                      <i className="fs-4 bi bi-receipt-cutoff"></i>
//                       <br />
//                       <span className=" d-none d-sm-inline " id="navleft">
//                         Billing
//                       </span>
//                     </a></Link> 
//                   </li> */}
//                   <li>
//                     <Link to='/doctor_section'>
//                     <a
                   
//                       className="nav-link px-0 align-middle"
//                     >
//                       <i className="fs-4 bi bi-person-fill"></i>
//                       <br />
//                       <span className=" d-none d-sm-inline" id="navleft">
//                         Doctor
//                       </span>{" "}
//                     </a>
//                     </Link>
//                   </li>
               
//                   <li>
//                     <Link to="/lab">
//                     <a
                     
//                       className="nav-link px-0 align-middle"
//                     >
//                       <i className="fs-4 bi bi-file-medical"></i>
//                       <br />
//                       <span className=" d-none d-sm-inline " id="navleft">
//                         Lab
//                       </span>{" "}
//                     </a></Link>
//                   </li>
//                   {/* <li>
//                     <Link to='/report'>
//                     <a
                     
//                       className="nav-link px-0 align-middle"
//                     >
//                     <i className="fs-4 bi bi-clipboard-pulse"></i>
//                       <br />
//                       <span className=" d-none d-sm-inline " id="navleft">
//                         Report
//                       </span>{" "}
//                     </a></Link>
//                   </li> */}
//                      <li>
//                     <Link to='/video'>
//                     <a
                     
//                       className="nav-link px-0 align-middle"
//                     >
//                      <i className="fs-4 bi bi-camera-video"></i>
//                       <br />
//                       <span className=" d-none d-sm-inline " id="navleft" >
//                         Video
//                       </span>{" "}
//                     </a>
//                     </Link>
//                   </li>
//                   <li>
//                     <a href="#" className="nav-link px-0 align-middle">
//                       <i className="fs-4 bi bi-gear"></i>{" "}
//                       <br />
//                       <span className=" d-none d-sm-inline " id="navleft">
//                         Settings
//                       </span>{" "}
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#submenu3"
//                       data-bs-toggle="collapse"
//                       className="nav-link px-0 align-middle"
//                     >
//                      <i className="fs-4 bi bi-power" onClick={logout}></i>
//                       <br />
//                       <span className=" d-none d-sm-inline " id="navleft" onClick={logout}>
//                         Logout
//                       </span>{" "}
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//   </div>
  
//     </Wrapper>
//   )
// }

// export default Sider
// const Wrapper=styled.div`
 
//   #navleft1{
//     font-size: 12px;
//     margin-left: -0.8rem;
//     color:white;
//   }
//   #navleft2{
//     font-size: 12px;
//     margin-left: -1.2rem;
//     color:white;

//   }
//   #navleft{
//     font-size: 12px;
//     margin-left: -0.2rem;
//     color:white;

//   }
//   #sidebar{
//     width: 5rem;
//     height: 79rem;
//     background-color:teal;
//     @media screen and (max-width: 768px){
//       width: 3rem;
//       height: 212rem;
//     }
//     @media screen and (min-width: 768px) and (max-width: 1020px) {
//       width: 5rem;
//       height: 151rem;    }
//     @media screen and (min-width: 1020px) and (max-width: 1600px) {
//    height: 62rem;
//   }
//   }
//   .bi{
//   color: white;
//   }
 
// li:hover{
//   color: red;
// }

// `


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
     
         dispatch(clearUser())
         navigate("/")
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
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft1">
                    Dashboard
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
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft1">
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
                  <h3 className=" d-none d-sm-inline fs-6" id="navleft1">
                  Doctor
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
            <li>
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
          
            <hr />
            
          
            <li>
              <Link>
              <div className="link-div">
                <div>
                  <i className="fs-4 bi bi-power" onClick={logout}></i>
                </div>
                <div className="text-light" onClick={logout}>
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
    font-size: 12px;
    margin-left: 0rem;
    color: white;
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
    height: 75rem;
    background-color: teal;
    @media screen and (max-width: 768px) {
      width: 3rem;
      height: 212rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 5rem;
      height: 151rem;
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