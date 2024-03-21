import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import { Link } from "react-router-dom";
const AddPatientBill = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <div className=" d-flex justify-content-between">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="mt-5">
                      <div className="mt-5">
                        <h5>Branch : Madan Mahal</h5>
                      </div>
                      <form className="d-flex ms-auto my-sm">
                        <h6>Addresh : </h6>
                        <h6 className="ms-2">
                          128,Near Gwarighat Jabalpur M.p (482001)
                        </h6>
                      </form>
                    </div>
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-end">
                    <div className="mt-5 me-5">
                      <form className="d-flex ms-auto my-sm mt-1">
                        <h5>Email id : </h5>
                        <h5 className="ms-2">DentalGuru@Gmail.com</h5>
                      </form>

                      <form className="d-flex ">
                        <h4>Contact Number : </h4>
                        <h4>+91-7000000058 </h4>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 ms-5">
                  <form className="d-flex justify-content-center mt-4">
                    <h2>Patient`s Bills </h2>
                  </form>
                  <hr
                    className="mt-4"
                    style={{
                      color: "Grey",
                      height: "2px",
                    }}
                  />
                </div>

                <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 mt-4 ms-5">
                  <div class="table-responsive rounded  ">
                    <table class="table table-bordered rounded shadow">
                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "20%" }}>
                            <h5>Bill No:</h5>
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            <input
                              class="py-1 border-0"
                              type="text"
                              placeholder="Bill Number"
                              required
                              style={{ width: "100%" }}
                            />
                          </td>
                          <td className="table-sno" style={{ width: "20%" }}>
                            <h5>Bill Date:</h5>
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            <input
                              class="py-1 border-0"
                              type="date"
                              required
                              style={{ width: "100%" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "20%" }}>
                            <h5>Name of Patient:</h5>
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            <input
                              class="py-1 border-0"
                              type="text"
                              placeholder="Patients Full Name"
                              required
                              style={{ width: "100%" }}
                            />
                          </td>

                          <td className="table-sno" style={{ width: "20%" }}>
                            <h5> Age / Sex</h5>
                          </td>
                          <td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              <input
                                className="py-1 btn"
                                type="number"
                                placeholder="Age"
                                required
                                style={{ width: "100%" }}
                              />
                            </td>

                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              <div className="input-group d-flex">
                                <input
                                  className="px-1 btn"
                                  type="button"
                                  value="Enter Patient Sex"
                                  data-bs-toggle="dropdown"
                                  required
                                  style={{ width: "100%" }}
                                  aria-expanded="false"
                                />

                                <ul className="dropdown-menu">
                                  <li>
                                    <Link className="dropdown-item" to="#">
                                      Male
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="dropdown-item" to="#">
                                      Female
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="dropdown-item" to="#">
                                      Other
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </td>
                        </tr>
                      </tbody>

                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "20%" }}>
                            <h5>Patient's Email Id</h5>
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            <input
                              class="py-1 border-0"
                              type="text"
                              placeholder="Inter Patient's Email Id"
                              required
                              style={{ width: "100%" }}
                            />
                          </td>

                          <td className="table-sno" style={{ width: "20%" }}>
                            <h5>Contact Number:</h5>
                          </td>

                          <td className="table-small" style={{ width: "20%" }}>
                            <input
                              class="py-1 border-0"
                              type="number"
                              placeholder="Inter Patient Number"
                              required
                              style={{ width: "100%" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "20%" }}>
                            <h5>Patients Addresh</h5>
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            <input
                              class="py-1 border-0"
                              type="text"
                              placeholder="Inter Patient's Adresh"
                              required
                              style={{ width: "100%" }}
                            />
                          </td>

                          <td className="table-sno" style={{ width: "20%" }}>
                            <h5> Village / Calony:</h5>
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            <input
                              class="py-1 border-0"
                              type="number"
                              placeholder="Inter"
                              required
                              style={{ width: "100%" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "20%" }}>
                            <h5>City</h5>
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            <input
                              class="py-1 border-0"
                              type="text"
                              placeholder="Inter Patient's City"
                              required
                              style={{ width: "100%" }}
                            />
                          </td>

                          <td className="table-sno" style={{ width: "20%" }}>
                            <h5> Pincode</h5>
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            <input
                              class="py-1 border-0"
                              type="number"
                              placeholder="Inter"
                              required
                              style={{ width: "100%" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 mt-4 ms-5">
                  <div class="table-responsive rounded">
                    <table class="table table-bordered rounded shadow">
                      <thead className="table-head">
                        <tr>
                          <th className="table-sno" style={{ width: "15%" }}>
                            Service
                          </th>
                          <th className="table-small" style={{ width: "30%" }}>
                            {" "}
                            Date & Time
                          </th>

                          <th className="table-small" style={{ width: "40%" }}>
                            Particulars
                          </th>
                          <th className="table-small" style={{ width: "10%" }}>
                            Rate
                          </th>
                          <th className="table-small" style={{ width: "15%" }}>
                            Units
                          </th>
                          <th className="table-small" style={{ width: "10%" }}>
                            Amount
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "20%" }}>
                            Consultancy Fee
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            14-02-23 12:30 Pm
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            Root Canal
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            ₹ 200.00
                          </td>
                          <td className="table-small" style={{ width: "25%" }}>
                            1
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            200
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "20%" }}>
                            Treatment Charge
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            14-02-23 01:30 Pm
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            Root Canal
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            ₹ 3500.00
                          </td>
                          <td className="table-small" style={{ width: "25%" }}>
                            2
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            7000
                          </td>
                        </tr>
                      </tbody>

                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "20%" }}>
                            Radiology
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            14-02-23 01:00 Pm
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            X-ray
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            ₹ 500.00
                          </td>
                          <td className="table-small" style={{ width: "25%" }}>
                            2
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            1000
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "20%" }}>
                            Pathology Charges
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            14-02-23 03:00 Pm
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            X-ray
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            ₹ 850.00
                          </td>
                          <td className="table-small" style={{ width: "25%" }}>
                            1
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            850
                          </td>
                        </tr>
                      </tbody>

                      {/* <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "20%" }}>
                            House Rent Allowance
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            ₹ 16,667.00
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            Provident Fund
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            ₹ 4,000.00
                          </td>
                        </tr>
                      </tbody> */}

                      {/* <tbody>
                        <tr className="table-row">
                          <td
                            className="table-sno"
                            style={{ width: "10%" }}
                          ></td>
                          <td
                            className="table-small"
                            style={{ width: "20%" }}
                          ></td>
                          <td className="table-small" style={{ width: "20%" }}>
                            Professional Tax
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            ₹ 2,00.00
                          </td>
                        </tr>
                      </tbody> */}

                      {/* <tbody>
                        <tr className="table-row">
                          <td className="table-sno" style={{ width: "10%" }}>
                            Gross Earnings
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            ₹ 50,000.00
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            Total Deductions
                          </td>
                          <td className="table-small" style={{ width: "20%" }}>
                            ₹ 4,200.00
                          </td>
                        </tr>
                      </tbody> */}
                    </table>
                  </div>
                </div>

                <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 mt-4 ms-5">
                  <div class="row">
                    <div class="col-xl-8">
                      <p class="ms-3">
                        Add additional notes and payment information
                      </p>
                    </div>
                    <div class="col-xl-3">
                      <ul class="list-unstyled">
                        <li class="text-muted ms-3">
                          <span class="text-black me-4">SubTotal</span>$1110
                        </li>
                        <li class="text-muted ms-3 mt-2">
                          <span class="text-black me-4">Tax(15%)</span>$111
                        </li>
                      </ul>
                      <p class="text-black float-start">
                        <span class="text-black me-3"> Total Amount</span>
                        <span className="fs-5"> $1221</span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-xl-8 ms-4">
                      <p>Thank you for your purchase</p>
                    </div>
                    <div class="col-xl-3 ms-4">
                      <button
                        type="button"
                        class="btn btn-primary text-capitalize"
                        style={{ backgroundColor: "#60bdf3" }}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 p-0">
                  <div className="col-lg-6 d-flex">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3 mx-3 "></div>
                  </div>

                  <div className="container d-flex justify-content-start m-5">
                    <div className="innercontainer1 w-100 d-flex justify-content-between ">
                      <div className="row  w-100 mt-1 ">
                        <table className="table border">
                          {/* <thead>
                          <tr>
                            <th className="col ">Description</th>
                            <th className="col text-center">Amount</th>
                          </tr>
                        </thead> */}

                          <tbody>
                            <tr>
                              {/* <th scope="row">1</th> */}
                              {/* <td>Consultation Fee</td> */}
                              {/* <td>
                              <input
                                class=" col border border-0  w-100 text-center "
                                type="text"
                                placeholder="Rs."
                                required
                              />
                            </td> */}
                            </tr>
                            <tr>
                              {/* <th scope="row">2</th> */}
                              <td>Treatment Fee</td>
                              <td>
                                {" "}
                                <input
                                  class=" col border border-0  w-100 text-center "
                                  type="text"
                                  placeholder="Rs."
                                  required
                                />
                              </td>
                            </tr>
                            <tr>
                              {/* <th scope="row">3</th> */}
                              <td>Radiology Fee</td>
                              <td>
                                {" "}
                                <input
                                  class=" col border border-0  w-100 text-center "
                                  type="text"
                                  placeholder="Rs."
                                  required
                                />
                              </td>
                            </tr>
                            <tr>
                              {/* <th scope="row">4</th> */}
                              <td>Pathology Fee</td>
                              <td>
                                {" "}
                                <input
                                  class=" col border border-0  w-100 text-center "
                                  type="text"
                                  placeholder="Rs."
                                  required
                                />
                              </td>
                            </tr>
                            <tr>
                              {/* <th scope="row">5</th> */}
                              <td>Pharmacy Charges</td>
                              <td>
                                {" "}
                                <input
                                  class=" col border border-0  w-100 text-center "
                                  type="text"
                                  placeholder="Rs."
                                  required
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Previous Payment</td>
                              <td>
                                {" "}
                                <input
                                  class=" col border border-0  w-100 text-center "
                                  type="text"
                                  placeholder="Rs."
                                  required
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Paid Amount</td>
                              <td>
                                {" "}
                                <input
                                  class=" col border border-0  w-100 text-center "
                                  type="text"
                                  placeholder="Rs."
                                  required
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Payment Reference</td>
                              <td>
                                {" "}
                                <input
                                  class=" col border border-0  w-100 text-center "
                                  type="text"
                                  placeholder="Rs."
                                  required
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="innercontainer2 w-100 mx-5">
                        <div className="Row  w-100 mt-1 ">
                          <table class="table border">
                            <tbody>
                              <tr>
                                <th scope="row">Subtotal</th>
                                <td>
                                  {" "}
                                  <input
                                    class=" col border border-0  w-100 text-center "
                                    type="text"
                                    placeholder="Rs."
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Discount</th>
                                <td>
                                  {" "}
                                  <input
                                    class=" col border border-0  w-100 text-center "
                                    type="text"
                                    placeholder="Rs."
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">GST</th>
                                <td>
                                  {" "}
                                  <input
                                    class=" col border border-0  w-100 text-center "
                                    type="text"
                                    placeholder="%"
                                    required
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Total</th>
                                <td>
                                  {" "}
                                  <input
                                    class=" col border border-0  w-100 text-center "
                                    type="text"
                                    placeholder="Rs."
                                    required
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-lg-1">
                          <button
                            type="button"
                            className="btn btn-primary mx-5   px-3"
                          >
                            Status
                          </button>
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

export default AddPatientBill;
const Container = styled.div`
  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }
`;
