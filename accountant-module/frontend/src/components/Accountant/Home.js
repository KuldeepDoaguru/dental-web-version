import React from "react";
import styled from "styled-components";
import AveragePatientChart from "../../components/superAdmin/dashboard/Charts/AveragePatientChart";
import PatientStatisticChart from "../../components/superAdmin/dashboard/Charts/PatientStatisticChart";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import AppointmentChart from "../../components/superAdmin/dashboard/Charts/AppointmentChart";
import EarningChart from "../../components/superAdmin/dashboard/Charts/EarningChart";
import ClinicActivity from "../../components/superAdmin/dashboard/ClinicActivity";

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-nowrap ">
            <div className="col-lg-1 col-1 p-0">
              <Sider />
            </div>
            <div className="col-lg-11 col-11 ps-0">
              <div className="row d-flex justify-content-between mx-3">
                <div className="col-12 col-md-4 mt-4">
                  <div className="d-flex">
                    <div>
                      <h6>Branch : Madan Mahal</h6>
                    </div>
                  </div>

                  <h4> Welcome to Dental Guru! </h4>
                  <h6>Accountant </h6>
                </div>

                <div className="col-12 col-md-4 my-3">
                  <form className="d-flex ms-auto my-sm" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button
                      className="btn btn-primary"
                      style={{ backgroundColor: "#004aad" }}
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>

              <div className="container pb-3">
                <div className="row g-5 mt-3">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <h3 className="text-center">Average Patients Visits</h3>
                    <AveragePatientChart />
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <h3 className="text-center">New Patient Visits</h3>
                    <PatientStatisticChart />
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <h3 className="text-center">Day Wise Apointment</h3>
                    <AppointmentChart />
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <h3 className="text-center">Earning Report</h3>
                    <EarningChart />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <ClinicActivity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  .main {
    height: 100%;
    background-color: #e6ecf1;
  }
  .chart {
    background-color: white;
    border-radius: 5px;
  }
  #hd {
    height: 44rem;

    @media screen and (max-width: 768px) {
      height: 68rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      height: 58rem;
    }
  }
  .clinic-act-heading {
    display: flex;
    justify-content: space-between;
  }
`;
