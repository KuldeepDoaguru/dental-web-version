import React from "react";
import styled from "styled-components";
import HeadBar from "../HeadBar";
import SideBar from "../SideBar";
import Profile from "./Profile";

const ProfileDashboard = () => {
  return (
    <Wrapper>
      <HeadBar />

      <div className="main">
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-lg-1 col-1 p-0">
              <SideBar />
            </div>
            <div className="col-lg-11 col-11 ps-0">
              <div className="row d-flex justify-content-between mx-3">
                <div className="col-12 col-md-12">
                  <div className="text-center mt-3">
                    <h3 className="head3"> Welcome To Dental Guru</h3>
                    <p className="para">Doctor Dashboard</p>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-around ms-4"></div>
              <div className="row">
                <Profile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfileDashboard;
const Wrapper = styled.div`
  .main {
    height: 100%;
    background-color: #e6ecf1;
  }
  .chart {
    background-color: white;
    border-radius: 5px;
  }
  .blDkbe #sidebar {
    width: 100%;
    height: 54rem;
    background-color: #004aad;
  }
  .head3 {
    font-family: "Poppins", sans-serif;
    font-size: 2.5rem;
  }
  .para {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 1.5rem;
  }
`;
