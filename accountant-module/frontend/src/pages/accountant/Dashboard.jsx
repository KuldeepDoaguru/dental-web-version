import React from "react";
import styled from "styled-components";
import ExpenseChart from "../../components/Accountant/charts/ExpenseChart";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import Cards from "../../components/Accountant/Cards";
import Detail from "../../components/Bill/Details";
import Editbill from "../../components/Bill/Editbill";
import Makepayment from "../../components/Bill/Makepayment";
import BranchDetails from "../../components/BranchDetails";

const Accountant_Dashboard = () => {
  return (
    <Wrapper>
      <Header />
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-nowrap ">
            <div className="col-lg-1  p-0">
              <Sider />
            </div>
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11">
              <BranchDetails />

              <div className="d-flex justify-content-center mt-4">
                <h2> TODAY`S OVERVIEW</h2>
              </div>

              <div className="mt-4">
                <Cards />
              </div>

              <div className="container-fuild px-4 me-5">
                <div className="row g-4 mt-3 ">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <h3 className="text-center">Monthly Earning</h3>
                    <ExpenseChart />
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <h3 className="text-center">Monthly Expence</h3>
                    <ExpenseChart />
                  </div>

                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <h3 className="text-center">Monthly Purchase</h3>
                    <ExpenseChart />
                  </div>
                </div>
              </div>
              <div className="">
                <div
                  className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
                  id="tableres"
                >
                  <div className="table-responsive" id="table">
                    <h5>Today Bill </h5>
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>UHID</th>
                          <th>RGID</th>
                          <th>Patient Name</th>
                          <th>Moblie No.</th>
                          <th>Date</th>
                          <th>Treatment Amount</th>
                          <th>Payment Status</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>DH19</td>
                          <td>RG5</td>
                          <td>Mohit Sahu</td>
                          <td>698525455</td>
                          <td>22-1-24</td>
                          <td>1944</td>
                          <td>Pending</td>

                          <td>
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Action
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <Detail />
                                </li>
                                <li>
                                  <Editbill />
                                </li>

                                <li>
                                  <Makepayment />
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>DH19</td>
                          <td>RG5</td>
                          <td>Mohit Sahu</td>
                          <td>698525455</td>
                          <td>22-1-24</td>
                          <td>1944</td>
                          <td>Pending</td>

                          <td>
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Action
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <Detail />
                                </li>
                                <li>
                                  <Editbill />
                                </li>

                                <li>
                                  <Makepayment />
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>DH19</td>
                          <td>RG5</td>
                          <td>Mohit Sahu</td>
                          <td>698525455</td>
                          <td>22-1-24</td>
                          <td>1944</td>
                          <td>Pending</td>

                          <td>
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Action
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <Detail />
                                </li>
                                <li>
                                  <Editbill />
                                </li>

                                <li>
                                  <Makepayment />
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="">
                <div
                  className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
                  id="tableres"
                >
                  <div className="table-responsive" id="table">
                    <h5>Today Appointment</h5>
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>UHID</th>
                          <th>RGID</th>
                          <th>Patient Name</th>
                          <th>Moblie No.</th>
                          <th>Date</th>
                          <th>Treatment Amount</th>
                          <th>Payment Status</th>

                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>DH19</td>
                          <td>RG5</td>
                          <td>Mohit Sahu</td>
                          <td>698525455</td>
                          <td>22-1-24</td>
                          <td>1944</td>
                          <td>Pending</td>

                          <td>
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Action
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <Detail />
                                </li>
                                <li>
                                  <Editbill />
                                </li>

                                <li>
                                  <Makepayment />
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>DH19</td>
                          <td>RG5</td>
                          <td>Mohit Sahu</td>
                          <td>698525455</td>
                          <td>22-1-24</td>
                          <td>1944</td>
                          <td>Pending</td>

                          <td>
                            {" "}
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Action
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <Detail />
                                </li>
                                <li>
                                  <Editbill />
                                </li>

                                <li>
                                  <Makepayment />
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>DH19</td>
                          <td>RG5</td>
                          <td>Mohit Sahu</td>
                          <td>698525455</td>
                          <td>22-1-24</td>
                          <td>1944</td>
                          <td>Pending</td>

                          <td>
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Action
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <Detail />
                                </li>
                                <li>
                                  <Editbill />
                                </li>

                                <li>
                                  <Makepayment />
                                </li>
                              </ul>
                            </div>
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
      </div>
    </Wrapper>
  );
};

export default Accountant_Dashboard;

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
  th {
    background-color: #201658;
    color: white;
  }
`;
