import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaMoneyBill } from "react-icons/fa";
import { SiMoneygram } from "react-icons/si";
import { MdOutlineNextWeek } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import BranchDetails from "./BranchDetails";

const PharmacyIncome = () => {
  return (
    <>
      <Container>
        <BranchDetails />

        <div className="Heading mt-4 d-flex justify-content-center">
          <h2>PHARMACY INCOME</h2>
        </div>

        <div className="row d-flex justify-content-around mt-5">
          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <FaMoneyBill />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Today Income</h5>
                  <p className="card-text text-light fw-semibold">5000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <SiMoneygram />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Yesterday Income</h5>
                  <p className="card-text text-light fw-semibold">250000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <MdOutlineNextWeek />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Weekly Income</h5>
                  <p className="card-text text-light fw-semibold">2500</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <GiMoneyStack />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Montly Income</h5>
                  <p className="card-text text-light fw-semibold">15</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
                <div>
                  <GiTakeMyMoney className="fs-1 text-light" />
                </div>

                <div className="cardtext">
                  <h5 className="card-title text-light">Yearly Income</h5>
                  <p className="card-text text-light fw-semibold">09</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row flex-nowrap ">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-12 ps-0">
              <div className="container mt-5 ms-3">
                <h2 className="text-center">
                  All Received Action For Pharmacy Payment
                </h2>
                <div className="container mt-5">
                  <div class="table-responsive rounded">
                    <table class="table table-bordered rounded shadow">
                      <thead className="table-head">
                        <tr>
                          <th className="table-sno" style={{ width: "10%" }}>
                            SN
                          </th>
                          <th className="table-small" style={{ width: "15%" }}>
                            Patient Name
                          </th>
                          <th className="table-small" style={{ width: "25%" }}>
                            Medicine
                          </th>

                          <th className="table-small" style={{ width: "10%" }}>
                            Prices
                          </th>

                          <th className="table-small" style={{ width: "10%" }}>
                            Gst %
                          </th>
                          <th className="table-small" style={{ width: "15%" }}>
                            Discount
                          </th>
                          <th className="table-small" style={{ width: "10%" }}>
                            Net Price
                          </th>
                          <th className="table-small" style={{ width: "10%" }}>
                            Date
                          </th>
                          <th className="table-small" style={{ width: "15%" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "10%" }}>
                            1
                          </td>
                          <td className="table-small" style={{ width: "15%" }}>
                            Mohan Chacha
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            Fioricet , Fioricet , Colgate , toothbrush .
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            690
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            18%
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            15%
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            660
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            01/04/2024
                          </td>
                          <td className="table-small" style={{ width: "15%" }}>
                            <Link to="/PharmacyBills">
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "#FFA600",
                                }}
                              >
                                Get
                              </button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "10%" }}>
                            2
                          </td>
                          <td className="table-small" style={{ width: "15%" }}>
                            Mohini Sahu
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            Fioricet with Codeine , Vinmek
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            493
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            18%
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            10%
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            550
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            01/02/2024
                          </td>
                          <td className="table-small" style={{ width: "15%" }}>
                            <Link to="/PharmacyBills">
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "#FFA600",
                                }}
                              >
                                Get
                              </button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "10%" }}>
                            3
                          </td>
                          <td className="table-small" style={{ width: "15%" }}>
                            Raj Patel
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            anesthesia , medications , ciprofloxacin,
                            metronidazole
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            993
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            18%
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            20%
                          </td>
                          <td className="table-small" style={{ width: "10%" }}>
                            986
                          </td>

                          <td className="table-small" style={{ width: "10%" }}>
                            01/04/2024
                          </td>
                          <td className="table-small" style={{ width: "15%" }}>
                            <Link to="/PharmacyBills">
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "#FFA600",
                                }}
                              >
                                Get
                              </button>
                            </Link>
                          </td>
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

export default PharmacyIncome;

const Container = styled.div`
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
