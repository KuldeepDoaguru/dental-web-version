import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../../components/superAdmin/dashboard/Card";
import AveragePatientChart from "../../components/superAdmin/dashboard/Charts/AveragePatientChart";
import PatientStatisticChart from "../../components/superAdmin/dashboard/Charts/PatientStatisticChart";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import AppointmentChart from "../../components/superAdmin/dashboard/Charts/AppointmentChart";
import EarningChart from "../../components/superAdmin/dashboard/Charts/EarningChart";
import { FcAlarmClock } from "react-icons/fc";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import ClinicActivity from "../../components/superAdmin/dashboard/ClinicActivity";
import MostTakenTreat from "../../components/superAdmin/dashboard/Charts/MostTakenTreat";
import NewRegPatient from "../../components/superAdmin/dashboard/Charts/NewRegPatient";
import ExpenseChart from "../../components/superAdmin/dashboard/Charts/ExpenseChart";
import ComplaintsEmp from "../../components/superAdmin/dashboard/ComplaintsEmp";
import BranchSelector from "../../components/BranchSelector";
import axios from "axios";
import { Link, useLocation, useRoutes } from "react-router-dom";
import routesConfig from "../RoutesConfig";

const Dashboard = () => {
  const location = useLocation();
  const [keyword, setkeyword] = useState("");
  const searchData = routesConfig;
  console.log(searchData);

  return (
    <Wrapper>
      <Header />

      <div className="main">
        <div className="container-fluid">
          <div className="row flex-nowrap ">
            <div className="col-lg-1 col-md-2 col-1 p-0">
              <Sider />
            </div>
            <div className="col-lg-11 col-md-9 col-11 ps-0">
              <div className="row d-flex justify-content-between mx-3">
                <div className="col-12 col-md-4 mt-4">
                  <BranchSelector />

                  <h3> Welcome to Dental Guru! </h3>
                  <p>Super Admin Dashboard</p>
                </div>
                <div className="col-12 col-md-4 my-3">
                  <form className="d-flex ms-auto my-sm" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={keyword}
                      onChange={(e) => setkeyword(e.target.value.toLowerCase())}
                    />
                    {/* <button
                      className="btn btn-primary"
                      style={{ backgroundColor: "#004aad" }}
                      type="submit"
                    >
                      Search
                    </button> */}
                    <div>
                      {/* {suggestions.map((suggestion, index) => (
                        <div key={index}>{suggestion}</div>
                      ))} */}
                    </div>
                  </form>
                  <div className="suedo-shado">
                    <ul className="bg-light">
                      {keyword &&
                        searchData
                          ?.filter((val) =>
                            val.title.toLowerCase().includes(keyword)
                          )
                          ?.map((item, index) => (
                            <>
                              <li key={index}>
                                <Link to={item.path}>{item.title}</Link>
                              </li>
                              <hr />
                            </>
                          ))}
                    </ul>
                  </div>
                </div>
              </div>
              <Card />
              <div className="container-fluid pb-3">
                <div className="row g-5 mt-3">
                  <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <h3 className="text-center">Treatment this month</h3>
                    <MostTakenTreat />
                  </div>
                  <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <h3 className="text-center">
                      Patient visits this month(OPD)
                    </h3>
                    <PatientStatisticChart />
                  </div>
                  <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <h3 className="text-center">
                      Total appointments this month
                    </h3>
                    <NewRegPatient />
                  </div>
                  <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <h3 className="text-center">New Patient this Month</h3>

                    <AppointmentChart />
                  </div>
                  <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <h3 className="text-center">Earning report this month</h3>
                    <EarningChart />
                  </div>
                  <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <h3 className="text-center">Expense report this month</h3>
                    <ExpenseChart />
                  </div>
                </div>
                {/* <div className="row g-5 mt-3"></div> */}
              </div>
              <div className="container-fluid mt-3">
                <div className="row">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <ClinicActivity />
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <ComplaintsEmp />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;

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

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  .suedo-shado {
    position: absolute;
    width: 20rem;
    z-index: 9999;
    a {
      text-decoration: none;
      font-weight: bold;
      color: #22a6b3;
    }
    li {
      list-style: none;
    }
  }
`;
