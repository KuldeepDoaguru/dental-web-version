import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sider from "../components/Sider";
import BranchDetails from "../components/BranchDetails";

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
                            <th>Treatment Income</th>
                            <th>Radiology Income</th>
                            <th>Pathology Income</th>
                            <th>Pharmacy Income</th>
                            <th>Total Income</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td>07/04/2024</td>
                            <td>28000</td>
                            <td>350000</td>
                            <td>42000</td>
                            <td>64000</td>
                            <td>280000</td>
                            <td>872000</td>
                          </tr>
                          <tr className="table-row">
                            <td>14/04/2024</td>
                            <td>28000</td>
                            <td>350000</td>
                            <td>42000</td>
                            <td>64000</td>
                            <td>280000</td>
                            <td>872000</td>
                          </tr>
                          <tr className="table-row">
                            <td>21/04/2024</td>
                            <td>28000</td>
                            <td>350000</td>
                            <td>42000</td>
                            <td>64000</td>
                            <td>280000</td>
                            <td>872000</td>
                          </tr>
                          <tr className="table-row">
                            <td>28/04/2024</td>
                            <td>28000</td>
                            <td>350000</td>
                            <td>42000</td>
                            <td>64000</td>
                            <td>280000</td>
                            <td>872000</td>
                          </tr>
                          <tr className="table-row">
                            <td>30/04/2024</td>
                            <td>8000</td>
                            <td>100000</td>
                            <td>12000</td>
                            <td>16000</td>
                            <td>80000</td>
                            <td>216000</td>
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
