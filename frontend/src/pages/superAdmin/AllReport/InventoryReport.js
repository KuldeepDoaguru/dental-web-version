import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../../../components/Header";
import Sider from "../../../components/Sider";
import { IoMdArrowRoundBack } from "react-icons/io";

const InventoryReport = () => {
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <h6>Select Branch : </h6>
                      </div>
                      <div>
                        <select name="branch" id="branch" className="mx-2">
                          <option value="Madan Mahal">Madan Mahal</option>
                          <option value="Madan Mahal">Ranjhi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Inventory Reports</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container">
                        <div class="table-responsive mt-4">
                          <div className="d-flex justify-content-between mb-2">
                            <div className="d-flex justify-content-between">
                              <div>
                                <input
                                  type="date"
                                  name=""
                                  id=""
                                  className="p-2 rounded"
                                />
                              </div>
                              <div className="mx-2">To</div>
                              <div>
                                <input
                                  type="date"
                                  name=""
                                  id=""
                                  className="p-2 rounded"
                                />
                              </div>
                            </div>
                            <button className="btn btn-warning">
                              Download Report
                            </button>
                            <div className="d-flex justify-content-between">
                              <div>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>select year</option>
                                  <option value="1">2024</option>
                                  <option value="2">2023</option>
                                  <option value="3">2022</option>
                                </select>
                              </div>
                              <div>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>select Month</option>
                                  <option value="1">Jan</option>
                                  <option value="2">Feb</option>
                                  <option value="3">Mar</option>
                                  <option value="1">Apr</option>
                                  <option value="2">May</option>
                                  <option value="3">June</option>
                                  <option value="1">July</option>
                                  <option value="2">Aug</option>
                                  <option value="3">Sept</option>
                                  <option value="1">Oct</option>
                                  <option value="2">Nov</option>
                                  <option value="3">Dec</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <table class="table table-bordered">
                            <thead className="table-head">
                              <tr>
                                <th>Purchase ID</th>
                                <th>Branch</th>
                                <th>Item Name</th>
                                <th>Item Type</th>
                                <th>MRP</th>
                                <th>Quantity</th>
                                <th>Distributor</th>
                                <th>Total Amount</th>
                                <th>Paid Amount</th>
                                <th>Bill Date</th>
                                <th>Bill time</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="table-row">
                                <td>pur_01</td>
                                <td>Madan Mahal</td>
                                <td>
                                  Tablet 10 mg Item Code - 101 HSN Code - 101
                                </td>
                                <td>Drug</td>
                                <td>100</td>
                                <td>10</td>
                                <td>Ahuja Medicose</td>
                                <td>10000</td>
                                <td>10000</td>
                                <td>13/02/2024</td>
                                <td>12:00 pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>pur_01</td>
                                <td>Madan Mahal</td>
                                <td>
                                  Tablet 10 mg Item Code - 101 HSN Code - 101
                                </td>
                                <td>Drug</td>
                                <td>100</td>
                                <td>10</td>
                                <td>Ahuja Medicose</td>
                                <td>10000</td>
                                <td>10000</td>
                                <td>13/02/2024</td>
                                <td>12:00 pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>pur_01</td>
                                <td>Madan Mahal</td>
                                <td>
                                  Tablet 10 mg Item Code - 101 HSN Code - 101
                                </td>
                                <td>Drug</td>
                                <td>100</td>
                                <td>10</td>
                                <td>Ahuja Medicose</td>
                                <td>10000</td>
                                <td>10000</td>
                                <td>13/02/2024</td>
                                <td>12:00 pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>pur_01</td>
                                <td>Madan Mahal</td>
                                <td>
                                  Tablet 10 mg Item Code - 101 HSN Code - 101
                                </td>
                                <td>Drug</td>
                                <td>100</td>
                                <td>10</td>
                                <td>Ahuja Medicose</td>
                                <td>10000</td>
                                <td>10000</td>
                                <td>13/02/2024</td>
                                <td>12:00 pm</td>
                              </tr>
                              <tr className="table-row">
                                <td>pur_01</td>
                                <td>Madan Mahal</td>
                                <td>
                                  Tablet 10 mg Item Code - 101 HSN Code - 101
                                </td>
                                <td>Drug</td>
                                <td>100</td>
                                <td>10</td>
                                <td>Ahuja Medicose</td>
                                <td>10000</td>
                                <td>10000</td>
                                <td>13/02/2024</td>
                                <td>12:00 pm</td>
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
        </div>
      </Container>
    </>
  );
};

export default InventoryReport;
const Container = styled.div``;
