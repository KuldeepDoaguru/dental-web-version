import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import { PiStethoscopeBold } from "react-icons/pi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { LiaXRaySolid } from "react-icons/lia";
import { GiMicroscope } from "react-icons/gi";
import { GiMedicines } from "react-icons/gi";
import BranchDetails from "../BranchDetails";

const TodayIncome = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>

              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <BranchDetails />

                <div className="Heading mt-4 d-flex justify-content-center">
                  <h2>Today Income</h2>
                </div>

                <div className="row d-flex justify-content-around mt-4">
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-8 col-8 col-md-4 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <PiStethoscopeBold />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">OPD Income</h5>
                          <p className="card-text text-light fw-semibold">
                            4000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-8 col-8 col-md-4 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <MdOutlineHealthAndSafety />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Treatment Income
                          </h5>
                          <p className="card-text text-light fw-semibold">
                            50000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <LiaXRaySolid />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Radiology Income
                          </h5>
                          <p className="card-text text-light fw-semibold">
                            6000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <GiMicroscope />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Pathology Income
                          </h5>
                          <p className="card-text text-light fw-semibold">
                            8000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-8 col-8 col-md-4 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <GiMedicines />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Pharmacy Income
                          </h5>
                          <p className="card-text text-light fw-semibold">
                            40000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div class="table-responsive mt-4">
                    <table class="table table-bordered">
                      <thead className="table-head">
                        <tr>
                          <th>Date</th>
                          <th>OPD Income</th>
                          <th>Treatment Income</th>
                          <th>Radiology Income</th>
                          <th>Pathology Income</th>
                          <th>Pharmacy Income</th>
                          <th>Total Income</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-row">
                          <td>01/04/2024</td>
                          <td>4000</td>
                          <td>50000</td>
                          <td>6000</td>
                          <td>8000</td>
                          <td>40000</td>
                          <td>108000</td>
                        </tr>
                        <tr className="table-row">
                          <td>02/04/2024</td>
                          <td>4000</td>
                          <td>50000</td>
                          <td>6000</td>
                          <td>8000</td>
                          <td>40000</td>
                          <td>108000</td>
                        </tr>
                        <tr className="table-row">
                          <td>03/04/2024</td>
                          <td>4000</td>
                          <td>50000</td>
                          <td>6000</td>
                          <td>8000</td>
                          <td>40000</td>
                          <td>108000</td>
                        </tr>
                        <tr className="table-row">
                          <td>04/04/2024</td>
                          <td>4000</td>
                          <td>50000</td>
                          <td>6000</td>
                          <td>8000</td>
                          <td>40000</td>
                          <td>108000</td>
                        </tr>
                        <tr className="table-row">
                          <td>05/04/2024</td>
                          <td>4000</td>
                          <td>50000</td>
                          <td>6000</td>
                          <td>8000</td>
                          <td>40000</td>
                          <td>108000</td>
                        </tr>
                        <tr className="table-row">
                          <td>06/04/2024</td>
                          <td>4000</td>
                          <td>50000</td>
                          <td>6000</td>
                          <td>8000</td>
                          <td>40000</td>
                          <td>108000</td>
                        </tr>
                        <tr className="table-row">
                          <td>07/04/2024</td>
                          <td>4000</td>
                          <td>50000</td>
                          <td>6000</td>
                          <td>8000</td>
                          <td>40000</td>
                          <td>108000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TodayIncome;

const Container = styled.div`
  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .card {
    background: #201658;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: #9b59b6;
    }
  }

  .icon {
    font-size: 40px;
    /* align-items: start; */
    color: white;
    /* display: flex; */
  }
  .card-body {
    text-align: center;
    padding: 5px;
  }
  .card-link {
    text-decoration: none;
    font-size: small;
  }

  .cardtext {
    h5 {
      color: white;
    }
    p {
      color: white;
    }
  }

  .editbtn {
    background: #201658;
    color: white;
  }
`;
