import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { GiMicroscopeLens } from "react-icons/gi";
import { GiMicroscope } from "react-icons/gi";
import { LiaXRaySolid } from "react-icons/lia";
import { FaHistory } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import Logout from "../../Pages/Logout/Logout";

const Sider = () => {
  const location = useLocation();
  const getSidebarClass = (path) => {
    return location.pathname === path ? "active-nav" : "";
  };
  return (
  
    <Wrapper>
      <div className="px-0 d-print-none" id="sidebar">
        <div className="d-flex flex-column align-items-center pt-2">
          <ul className="nav nav-pills nav-dash" id="menu">
            <li class="nav-item link-div">
              <Link to="/" className={`link-div ${getSidebarClass("/")}`}>
             
                <div className="link-div">
                  <i className="fs-4 bi bi-house-door-fill"></i>
                </div>
                <div d-flex justify-content-center>
                  <h3 class=" d-none d-sm-inline fs-6 text-light">Dashboard</h3>
                </div>
              </Link>
            </li>
     

            <hr />

            <li className="">
              <div>
                <Link to="/history" className={`link-div ${getSidebarClass("/history")}`}>
                  <div className="link-div">
                    <div className="">
                      <FaHistory className="text-light fs-3" />
                    </div>
                    <div>
                      <h3 className=" d-none d-sm-inline fs-6 text-light">
                        History
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
            <hr />

            <li className="">
              <div>
                <Link to="/all-test" className={`link-div ${getSidebarClass("/all-test")}`}>
                  <div className="link-div">
                    <div className="">
                      <TbReportAnalytics className="text-light fs-3" />
                    </div>
                    <div>
                      <h3 className=" d-none d-sm-inline fs-6 text-light">
                        All Test
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
          <hr />

            <li className="">
              <div>
                <Link to="/payment-history" className={`link-div ${getSidebarClass("/payment-history")}`}>
                  <div className="link-div">
                    <div className="">
                      
                      <RiSecurePaymentLine className="text-light fs-3" />
                    </div>
                    <div>
                      <h3 className=" d-none d-sm-inline fs-6 text-light">
                        Payment History
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
            <hr />
            <li className="">
              <div>
                <Link to="/attendance-leave" className={`link-div ${getSidebarClass("/attendance-leave")}`}>
                  <div className="link-div">
                    <div className="">
          
                      <BsFileEarmarkPerson className="text-light fs-3" />
                    </div>
                    <div>
                      <h3 className=" d-none d-sm-inline fs-6 text-light">
                      Attendance
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
            <hr />

            <li className="">
              <div className="link-div">
                <div>
                  <i className="fs-2 bi bi-power"></i>
                </div>
                <div>
                  {/* <button
                    type="submit"
                    className="btn d-none d-sm-inline text-light fs-6"
                    style={{
                      backgroundColor: "#2ecc71",
                    }}
                  >
                    Logout
                  </button> */}
                  <Logout/>
                </div>
              </div>
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
  #sidebar {
    width: 8%;
    height: 100vh;
    background-color: #213555;
    position: fixed;
    margin-top: 4rem;

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

  .link-div {
  }
  a {
    text-decoration: none;
  }

  .nav-dash {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .link-div {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  .nav-link {
    
  }
  .active-nav {
    background-color: #003fa4;
    padding: 1rem;
    box-shadow: 0px 0px 16px #003fa4;
    text-align: center;
  }
`;
