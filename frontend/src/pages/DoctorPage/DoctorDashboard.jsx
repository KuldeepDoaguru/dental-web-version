import React from "react";
import styled from "styled-components";
// import Card from "../../components/superAdmin/dashboard/Card";
import HeadBar from "../../components/Doctor/HeadBar";
import SideBar from "../../components/Doctor/SideBar";
import Card from "../../components/Doctor/Card/Card";
import AppointTable from "../../components/Doctor/Tables/AppointTable";
import AveragePatientChart from "../../components/Doctor/Charts/AveragePatientChart";

const DoctorDashboard = () => {
  return (
    <Wrapper>
      <HeadBar/>

      <div className="main">
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-lg-1 col-1 p-0">
              <SideBar />
            </div>
            <div className="col-lg-11 col-11 ps-0">
              <div className="row d-flex justify-content-between mx-3">
                {/* <div className="col-12 col-md-4 "> */}
                <div className="col-12 col-lg-12 text-center mt-3">
                  <h3> Welcome To Dental Guru</h3>
                  <p> Doctor Dashboard</p>
                </div>
                {/* <div className="col-12 col-md-4 my-3">
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
                </div> */}
              </div>
              <div className="row d-flex justify-content-around ms-4">
                {/* <Card /> */}
              </div>
              <div className="row ms-3 w-100">
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
.sc-jiaSJS{
  @media (min-width: 1024px){
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
 h3{
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
 }
 p{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
 }
`;

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

{/* <div className="row ms-5">
                <div className="col-lg-11 col-md-12 col-sm-12">
                  <div className="shadow-sm bg-white rounded mt-5 d-flex flex-column ">
                  <h6 className='ms-4 text-center'>Average Patients Visits</h6>
                  <AveragePatientChart />
                  </div>
                </div>
              </div> */}
