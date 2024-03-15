import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaMoneyBill } from "react-icons/fa";
import { MdOutlineNextWeek } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import BranchDetails from "./BranchDetails";
const OpdIncome = () => {
  return (
    <Container>
      <BranchDetails />

      <div className="Heading mt-4 d-flex justify-content-center">
        <h2>OPD INCOME</h2>
      </div>

      <div className="row d-flex justify-content-around mt-4">
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
                <h5 className="card-title text-light">Monthly income</h5>
                <p className="card-text text-light fw-semibold">15</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
          <div className="card">
            <div className="card-body d-flex justify-content-center flex-column">
              <div>
                <GiTakeMyMoney className="text-light fs-1" />
              </div>

              <div className="cardtext">
                <h5 className="card-title text-light">Yearly income</h5>
                <p className="card-text text-light fw-semibold">09</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4">
        <div className="row flex-nowrap">
          <div className="col-xxl-12 col-xl-12 col-lg-12 col-12 ps-0">
            <div className="container mt-4">
              <h2 className="text-center">
                All Received Action For OPD Payment
              </h2>
              <div className="container mt-5">
                <div class="table-responsive rounded">
                  <table class="table table-bordered rounded shadow">
                    <thead className="table-head">
                      <tr>
                        <th className="table-sno" style={{ width: "10%" }}>
                          SN
                        </th>
                        <th className="table-small" style={{ width: "18%" }}>
                          Patient Name
                        </th>

                        <th className="table-small" style={{ width: "15%" }}>
                          Doctor Name
                        </th>

                        <th className="table-small" style={{ width: "15%" }}>
                          Consultation Fee
                        </th>

                        <th className="table-small" style={{ width: "15%" }}>
                          Date
                        </th>
                        <th className="table-small" style={{ width: "10%" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-row">
                        <td className="table-sno" style={{ width: "10%" }}>
                          1
                        </td>

                        <td className="table-small" style={{ width: "20%" }}>
                          Shubham patel
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          Dr.Rahul Gupta
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          200
                        </td>

                        <td className="table-small" style={{ width: "10%" }}>
                          01/04/2024
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          <Link to="/OpdBills">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FFA600",
                              }}
                            >
                              Get Action
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
                        <td className="table-small" style={{ width: "20%" }}>
                          Prince Soni
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          Dr.Ahmad Khan
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          200
                        </td>

                        <td className="table-small" style={{ width: "10%" }}>
                          01/02/2024
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          <Link to="/OpdBills">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FFA600",
                              }}
                            >
                              Get Action
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
                        <td className="table-small" style={{ width: "20%" }}>
                          Raju Jhariya
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          Dr. Deepak Rajak
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          200
                        </td>

                        <td className="table-small" style={{ width: "10%" }}>
                          01/04/2024
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          <Link to="/OpdBills">
                            <button
                              className="btn"
                              style={{
                                backgroundColor: "#FFA600",
                              }}
                            >
                              Get Action
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
  );
};

export default OpdIncome;

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
