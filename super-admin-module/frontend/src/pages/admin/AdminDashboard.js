import React from "react";
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
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";
import AdminCards from "../../components/Admin/dashboard/AdminCards";
import TreatmentTMAdmin from "../../components/Admin/admin-charts/TreatmentTMAdmin";
import PatientVisTMAdmin from "../../components/Admin/admin-charts/PatientVisTMAdmin";
import TotalApsTMAdmin from "../../components/Admin/admin-charts/TotalApsTMAdmin";
import NewPatientTMAdmin from "../../components/Admin/admin-charts/NewPatientTMAdmin";
import EarnTMAdmin from "../../components/Admin/admin-charts/EarnTMAdmin";
import ExpenseTMAdmin from "../../components/Admin/admin-charts/ExpenseTMAdmin";
import AdminClinicAct from "../../components/Admin/dashboard/AdminClinicAct";
import AdminComplaintsSec from "../../components/Admin/dashboard/AdminComplaintsSec";

const AdminDashboard = () => {
  return (
    <Wrapper>
      <HeaderAdmin />

      <div className="main">
        <div className="container-fluid">
          <div className="row flex-nowrap ">
            <div className="col-lg-1 col-1 p-0">
              <SiderAdmin />
            </div>
            <div className="col-lg-11 col-11 ps-0">
              <div className="row d-flex justify-content-between mx-3">
                <div className="col-12 col-md-4 mt-4">
                  <h3> Welcome to DentalGuru! </h3>
                  <p className="fs-4 fw-bold">
                    Admin Dashboard - Madan Mahal Branch
                  </p>
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
                      style={{ backgroundColor: "#1abc9c", border: "none" }}
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
              <AdminCards />
              <div className="container-fluid pb-3">
                <div className="row g-5 mt-3">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <h3 className="text-center">Treatment this month</h3>
                    <TreatmentTMAdmin />
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <h3 className="text-center">Patient visits this month</h3>
                    <PatientVisTMAdmin />
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <h3 className="text-center">
                      Total appointments this month
                    </h3>
                    <TotalApsTMAdmin />
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <h3 className="text-center">
                      New Registered Patient this Month
                    </h3>

                    <NewPatientTMAdmin />
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <h3 className="text-center">Earning report this month</h3>
                    <EarnTMAdmin />
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <h3 className="text-center">Expense report this month</h3>
                    <ExpenseTMAdmin />
                  </div>
                </div>
                {/* <div className="row g-5 mt-3"></div> */}
              </div>
              <div className="container-fluid mt-3">
                <div className="row">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <AdminClinicAct />
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <AdminComplaintsSec />
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

export default AdminDashboard;

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
`;
