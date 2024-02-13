import React from "react";
import styled from "styled-components";
import HeadBar from "../HeadBar";
import SideBar from "../SideBar";
import Profile from "./Profile";
import Card from "../Card/Card";

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
                <div className="col-12 col-md-4 ">
                  <h3> Welcome to Dental Guru</h3>
                  <p>Clinic Doctor Dashboard</p>
                </div>
                <div className="col-12 col-md-4 my-3">
                  <form className="d-flex ms-auto my-sm" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-primary" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <div className="row d-flex justify-content-around ms-4">
                {/* <Card /> */}
                {/* <div className="col-8 col-md-2 my-3 p-0">
                  <Card
                    title={"Total Patient"}
                    info={"250"}
                    logo={
                      <i
                        className="bi bi-people-fill"
                        style={{ fontSize: "30px" }}
                      ></i>
                    }
                    link={""}
                  />
                </div>

                <div className="col-8 col-md-2 my-3 p-0">
                  <Card
                    title={"New Patient"}
                    info={"25"}
                    logo={
                      <i
                        className="bi bi-people-fill"
                        style={{ fontSize: "30px" }}
                      ></i>
                    }
                    link={""}
                  />
                </div>

                <div className="col-8 col-md-2 my-3 p-0">
                  <Card
                    title={"Earnings"}
                    info={"25000"}
                    logo={
                      <i
                        className="bi bi-people-fill"
                        style={{ fontSize: "30px" }}
                      ></i>
                    }
                    link={""}
                  />
                </div>

                <div className="col-8 col-md-2 my-3 p-0">
                  <Card
                    title={"Total Doctors"}
                    info={"15"}
                    logo={
                      <i
                        className="bi bi-people-fill"
                        style={{ fontSize: "30px" }}
                      ></i>
                    }
                    link={""}
                  />
                </div>

                <div className="col-8 col-md-2 my-3 p-0">
                  <Card
                    title={"Appointments"}
                    info={"56"}
                    logo={
                      <i
                        className="bi bi-people-fill"
                        style={{ fontSize: "30px" }}
                      ></i>
                    }
                    link={""}
                  />
                </div> */}
              </div>
              <div className="row">
                <Profile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

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
  /* #hd {
    height: 44rem;

    @media screen and (max-width: 768px) {
      height: 68rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      height: 58rem;
    }
  } */
`;