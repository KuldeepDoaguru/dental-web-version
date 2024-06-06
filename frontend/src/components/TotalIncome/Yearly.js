import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import { PiStethoscopeBold } from "react-icons/pi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { LiaXRaySolid } from "react-icons/lia";
import { GiMicroscope } from "react-icons/gi";
import { GiMedicines } from "react-icons/gi";

const Yearly = () => {
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
                <div className="row d-flex justify-content-between">
                  <div className="col-12 col-md-4 mt-4">
                    <div>
                      <h5>Branch : Madan Mahal</h5>
                    </div>
                    <div className="mt-2">
                      <h3> Welcome to Dental Guru! </h3>
                    </div>
                    <div className="mt-3">
                      <h6>Accountant Dashboard</h6>
                    </div>
                  </div>

                  <div className="col-12 col-md-4 me-2 mt-5">
                    <form className="d-flex ms-auto my-sm" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn btn-primary"
                        style={{ backgroundColor: "#201658" }}
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
                <div className="Heading mt-4 d-flex justify-content-center">
                  <h2>Annual Income</h2>
                </div>

                <div className="row d-flex justify-content-around mt-4">
                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <PiStethoscopeBold />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">OPD Income</h5>
                          <p className="card-text text-light fw-semibold">
                            1104000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
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
                            1800000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
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
                            2160000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
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
                            3264000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
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
                            14400000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container">
                  <div className="row d-flex justify-content-center mt-5">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-8">
                      <div
                      // className={`popup-container${showPopup ? " active" : ""}`}
                      >
                        <div className="popup">
                          <h2 className="d-flex justify-content-center fs-1 mt-5">
                            Total Annual Income
                          </h2>

                          <div className=" d-flex justify-content-center mt-4">
                            <div className="col-xl-6">
                              <form
                                className="d-flex flex-column "
                                // onSubmit={handleNoticeSubmit}
                              >
                                <input
                                  type="text"
                                  placeholder="OPD INCOME"
                                  className="rounded p-2"
                                />
                                <br />
                                <input
                                  type="text"
                                  placeholder="TREATMENT INCOME"
                                  className="rounded p-2"
                                />
                                <br />
                                <input
                                  type="text"
                                  placeholder="LAB INCOME"
                                  className="rounded p-2"
                                />
                                <br />
                                <input
                                  type="text"
                                  placeholder="PATHOLOGY INCOME"
                                  className="rounded p-2"
                                />
                                <br />
                                <input
                                  type="text"
                                  placeholder="PHARMACY INCOME"
                                  className="rounded p-2"
                                />
                                <div className="d-flex justify-content-evenly mt-4 mb-4">
                                  <button
                                    type="submit"
                                    className="btn mt-2"
                                    style={{
                                      backgroundColor: "#201658",
                                    }}
                                  >
                                    Calculate
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="table-responsive mt-5">
                  <table class="table table-bordered">
                    <thead className="table-head">
                      <tr>
                        <th>Year</th>
                        <th>OPD Income</th>
                        <th>Treatment Income</th>
                        <th>Radiology Income</th>
                        <th>Pathology Income</th>
                        <th>Pharmacy Income</th>
                        <th>Total Income</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-row">
                        <td>2022</td>
                        <td>1104000</td>
                        <td>1800000</td>
                        <td>2160000</td>
                        <td>3264000</td>
                        <td>14400000</td>
                        <td>22728000</td>

                        <td>
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#FFA600",
                            }}
                            // onClick={() => openUpdatePopup()}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                      <tr className="table-row">
                        <td>2023</td>
                        <td>1104000</td>
                        <td>1800000</td>
                        <td>2160000</td>
                        <td>3264000</td>
                        <td>14400000</td>
                        <td>22728000</td>

                        <td>
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#FFA600",
                            }}
                            // onClick={() => openUpdatePopup()}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                      <tr className="table-row">
                        <td>2024</td>
                        <td>1104000</td>
                        <td>1800000</td>
                        <td>2160000</td>
                        <td>3264000</td>
                        <td>14400000</td>
                        <td>22728000</td>

                        <td>
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#FFA600",
                            }}
                            // onClick={() => openUpdatePopup()}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                      <tr className="table-row">
                        <td>2025</td>
                        <td>1104000</td>
                        <td>1800000</td>
                        <td>2160000</td>
                        <td>3264000</td>
                        <td>14400000</td>
                        <td>22728000</td>

                        <td>
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#FFA600",
                            }}
                            // onClick={() => openUpdatePopup()}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                      <tr className="table-row">
                        <td>2026</td>
                        <td>1104000</td>
                        <td>1800000</td>
                        <td>2160000</td>
                        <td>3264000</td>
                        <td>14400000</td>
                        <td>22728000</td>

                        <td>
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#FFA600",
                            }}
                            // onClick={() => openUpdatePopup()}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Yearly;

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
`;
