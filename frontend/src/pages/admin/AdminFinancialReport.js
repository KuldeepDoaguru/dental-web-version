import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaCommentsDollar } from "react-icons/fa6";

const AdminFinancialReport = () => {
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid mt-2">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow rounded">
                      <div class="container d-flex justify-content-center">
                        <h2 className="text-dark text-center">
                          Financial Report
                        </h2>
                      </div>
                    </nav>
                  </div>
                  {/* <FinancialReports />
                  <FinancialCard />
                  <FinancialTables /> */}
                </div>
                <div className="container-fluid">
                  <div class="row mt-4">
                    <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="round-circle">
                            <FaHandHoldingDollar className="ficon" />
                          </div>

                          <h3 className="text-light mt-4">INR 25000</h3>
                          <h4 className="text-light">EARNINGS</h4>
                        </div>
                      </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="round-circle">
                            <LiaFileInvoiceDollarSolid className="ficon" />
                          </div>

                          <h3 className="text-light mt-4">INR 25000</h3>
                          <h4 className="text-light">EARNINGS</h4>
                        </div>
                      </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="round-circle">
                            <FaCommentsDollar className="ficon" />
                          </div>
                          <h3 className="text-light mt-4">INR 25000</h3>
                          <h4 className="text-light">EARNINGS</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row mt-2 g-5">
                    <div className="col-sm-12 col-md-11 col-lg-6 col-xl-6">
                      <div className="d-flex justify-content-between">
                        <button class="btn btn-outline-success fs-3 shadow">
                          Earning
                        </button>
                        <button className="btn btn-info fw-bold">
                          Download
                        </button>
                      </div>
                      <div class="table-responsive mt-2">
                        <table class="table table-bordered">
                          <thead className="table-head">
                            <tr>
                              <th>S.No.</th>
                              <th>ReceiptId</th>
                              <th>Amount</th>
                              <th>Entry By</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>R26661</td>
                              <td>3000</td>
                              <td>receptionist</td>
                              <td>23 feb 2023</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>R26661</td>
                              <td>3000</td>
                              <td>receptionist</td>
                              <td>23 feb 2023</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>R26661</td>
                              <td>3000</td>
                              <td>receptionist</td>
                              <td>23 feb 2023</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-11 col-lg-6 col-xl-6">
                      <div className="d-flex justify-content-between">
                        <button class="btn btn-outline-success fs-3 shadow">
                          Expenses
                        </button>
                        <button className="btn btn-info fw-bold">
                          Download
                        </button>
                      </div>
                      <div class="table-responsive mt-2">
                        <table class="table table-bordered">
                          <thead className="table-head">
                            <tr>
                              <th scope="col">S.No.</th>
                              <th scope="col">Title</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Entry By</th>
                              <th scope="col">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Equpments</td>
                              <td>5500</td>
                              <td>receptionist</td>
                              <td>22 feb 2023</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Medicine</td>
                              <td>2000</td>
                              <td>receptionist</td>
                              <td>22 feb 2023</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Rct chair</td>
                              <td>5000</td>
                              <td>receptionist</td>
                              <td>22 feb 2023</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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

export default AdminFinancialReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  .card-body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .ficon {
    font-size: 5rem;
    color: #225f5c;
  }

  .card {
    background-color: #1abc9c;
    border: none;
    box-shadow: 1px 1px 10px #1abc9c;
  }

  .round-circle {
    background-color: white;
    padding: 1rem;
    border-radius: 50%;
    box-shadow: 1px 1px 40px #00ffcd;
  }

  th {
    background-color: #1abc9c;
  }
`;
