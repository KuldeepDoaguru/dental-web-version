import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sider from "../components/Sider";
import BranchDetails from "../components/BranchDetails";
import MakeRefund from "../components/btModal/MakeRefund";
import { Link } from "react-router-dom";

const SecurityAmount = () => {
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
                <div className="container">
                  <h2 className="text-center mt-5">Submit Security Amount</h2>
                  <hr />
                  <form
                    action=""
                    className=""
                    enctype="multipart/form-data"
                    // onSubmit={addPurchaseDetails}
                  >
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                          <div class="input-group mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Date
                            </label>
                            <input
                              type="date"
                              class="p-1 w-100 rounded"
                              name="item_code"
                              placeholder="appointment ID"
                              // value={recData.item_code}
                              // onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                          <div class="input-group mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Appointment ID
                            </label>
                            <input
                              type="text"
                              class="p-1 w-100 rounded"
                              name="item_code"
                              placeholder="appointment ID"
                              // value={recData.item_code}
                              // onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                          <div class="input-group mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label rounded"
                            >
                              UHID
                            </label>
                            <input
                              type="text"
                              class="p-1 w-100 rounded"
                              placeholder="UHID"
                              name="item_name"
                              // value={recData.item_name}
                              // onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                          <div class="input-group mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Patient Name
                            </label>
                            <input
                              type="text"
                              class="p-1 w-100 rounded"
                              placeholder="Patient Name"
                              name="HSN_code"
                              // value={recData.HSN_code}
                              // onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                          <div class="input-group mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Patient Mobile
                            </label>
                            <input
                              type="text"
                              class="p-1 w-100 rounded"
                              placeholder="Patient Name"
                              name="HSN_code"
                              // value={recData.HSN_code}
                              // onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                          <div class="input-group mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Assigned Doctor
                            </label>
                            <input
                              type="text"
                              class="p-1 w-100 rounded"
                              placeholder="Patient Name"
                              name="HSN_code"
                              // value={recData.HSN_code}
                              // onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                          <div class="input-group mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Security Amount
                            </label>
                            <input
                              type="number"
                              class="p-1 w-100 rounded"
                              placeholder="Security Amount"
                              name="HSN_code"
                              // value={recData.HSN_code}
                              // onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                          <button
                            className="btn btn-info btnbox fw-bold shadow p-1 w-100 rounded"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <hr />
                  <div className="container-fluid">
                    <div class="table-responsive mt-4">
                      <table class="table table-bordered">
                        <thead className="table-head">
                          <tr>
                            <th>Date</th>
                            <th>Appointment ID</th>
                            <th>UHID</th>
                            <th>Patient Name</th>
                            <th>Patient Number</th>
                            <th>Assigned Doctor</th>
                            <th>Security Amount</th>
                            <th>Payment Status</th>
                            <th>Refund</th>
                            <th>Print</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td>07/04/2024</td>
                            <td>1</td>
                            <td>DHID007</td>
                            <td>Shubham Singh</td>
                            <td>8602161019</td>
                            <td>Mohit sahu</td>
                            <td>8000</td>
                            <td>Success</td>
                            <td>
                              <MakeRefund />
                            </td>
                            <td>
                              <Link to="/security-amount-reciept">
                                <button className="btn btn-success">
                                  Print
                                </button>
                              </Link>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td>07/04/2024</td>
                            <td>1</td>
                            <td>DHID007</td>
                            <td>Shubham Singh</td>
                            <td>8602161019</td>
                            <td>Mohit sahu</td>
                            <td>8000</td>
                            <td>Success</td>
                            <td>
                              <MakeRefund />
                            </td>
                            <td>
                              <Link to="/security-amount-reciept">
                                <button className="btn btn-success">
                                  Print
                                </button>
                              </Link>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td>07/04/2024</td>
                            <td>1</td>
                            <td>DHID007</td>
                            <td>Shubham Singh</td>
                            <td>8602161019</td>
                            <td>Mohit sahu</td>
                            <td>8000</td>
                            <td>Success</td>
                            <td>
                              <MakeRefund />
                            </td>
                            <td>
                              <Link to="/security-amount-reciept">
                                <button className="btn btn-success">
                                  Print
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
        </div>
      </Container>
    </>
  );
};

export default SecurityAmount;
const Container = styled.div`
  .table-head {
    th {
      background-color: #201658;
      color: white;
    }
  }

  .btnbox {
    margin-top: 2rem;
  }
`;
