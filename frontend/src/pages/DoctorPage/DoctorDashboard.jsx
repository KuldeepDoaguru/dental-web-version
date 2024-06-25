import React from "react";
import styled from "styled-components";
import HeadBar from "../../components/Doctor/HeadBar";
import SideBar from "../../components/Doctor/SideBar";
import AppointTable from "../../components/Doctor/Tables/AppointTable";
import { useDispatch, useSelector } from "react-redux";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(user);
  const branch = user.currentUser.branch_name;
  // console.log(`User Branch: ${branch}`);
  return (
    <Wrapper>
      <HeadBar />
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-2 col-2 p-0">
              <SideBar />
            </div>
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-10 col-10 ps-0">
              <div className="row d-flex justify-content-between mx-3">
                {/* <div className="col-12 col-md-4 "> */}
                <div className="col-12 col-lg-12 text-center mt-3">
                  <h3 style={{ color: "#268ca1" }}> Welcome To DentalGuru</h3>
                  <p> Doctor Dashboard</p>
                  <p>Branch : {branch}</p>
                </div>
              </div>
              <div className="row d-flex justify-content-around ms-4">
                {/* <Card /> */}
              </div>
              <div className="row appointTable">
                <AppointTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default DoctorDashboard;

const Wrapper = styled.div`
  overflow-x: hidden;
  .sc-jiaSJS {
    @media (min-width: 1024px) {
      width: 64rem;
    }
  }
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
  h3 {
    font-family: "Poppins", sans-serif;
    font-size: 2.5rem;
  }
  p {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 1.5rem;
    margin: 0 0 8px;
  }
  .appointTable {
    @media screen and (min-width: 768px) and (max-width: 850px) {
      width: 100%;
      margin-left: 0rem;
    }
    @media screen and (min-width: 851px) and (max-width: 1024px) {
      width: 100%;
      margin-left: 1.1rem;
    }
    @media screen and (max-width: 767px) {
      width: 100%;
      margin-left: 1.5rem;
    }
  }
`;
