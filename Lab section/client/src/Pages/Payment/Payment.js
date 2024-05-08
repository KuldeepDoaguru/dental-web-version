import React from "react";
import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import Sider from "../../components/MainComponents/Sider";
import Header from "../../components/MainComponents/Header";
const Payment = () => {
  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <>
      <Wrapper>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-1 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 p-0" style={{marginTop:"5rem"}}> 
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                  <IoArrowBackSharp
                    className="fs-1 mt-2 text-black d-print-none"
                    onClick={goBack}
                  />{" "}
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 ">
                    <div className="d-flex justify-content-start ms-lg-5 ms-md-1">
                      <div>
                        <h5>Branch : Madan Mahal</h5>

                        <form className="d-flex ">
                          <p>Address </p>
                          <p>: 128,Near Gwarighat Jabalpur M.P.</p>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="d-flex justify-content-end me-lg-5 me-md-1">
                      <div>
                        <form className="d-flex">
                          <h5>Email id : </h5>
                          <h5 className="ms-2">DentalGuru@Gmail.com</h5>
                        </form>

                        <form className="d-flex ">
                          <h5>Contact Number : </h5>
                          <h5>+91-7000000058 </h5>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 rounded mt-4">
                    <div className="d-flex justify-content-start ms-lg-5 ms-md-1">
                      <div>
                        <h4>PATIENT SUMMARY </h4>

                        <div className="d-flex ">
                          <h6>Patient Name </h6>
                          <h6 className="ms-1"> : Vinay Dhariya </h6>
                        </div>

                        <div className="d-flex">
                          <h6>Patient id </h6>
                          <h6 className="ms-1"> : 123 </h6>
                        </div>

                        <div className="d-flex ">
                          <h6> Invoice Number </h6>
                          <h6 className="ms-1"> : 206Mar23 </h6>
                        </div>

                        <div className="d-flex">
                          <h6> Invoice Date </h6>
                          <h6 className="ms-1"> :31/12/2023 </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div class=" rounded d-flex justify-content-end mt-5 me-lg-5 me-md-1">
                      <div class="card" style={{ width: "18rem" }}>
                        <div className="ms-4 mt-2">
                          <h1> ₹2,425.00</h1>
                          <h5 className="text-success ms-4">
                            Patient Net Paid
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <form className="d-flex justify-content-center mt-4">
                    <h2> Payment Description</h2>
                  </form>
                  <hr className="mt-5" />
                </div>

                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                  <div className="d-flex justify-content-center mt-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-11 col-sm-11">
                      <table class="table table-bordered shadow">
                        <thead class="table-primary  rounded">
                          <tr>
                            <th scope="col" style={{ width: "10%" }}>
                              Date
                            </th>
                            <th scope="col" style={{ width: "40%" }}>
                              Description
                            </th>

                            <th scope="col" style={{ width: "20%" }}>
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">01/04/2023</th>
                            <td>Cone Beam Computed Tomography (CBCT)</td>
                            <td>500</td>
                          </tr>
                        </tbody>
                      </table>

                      <div class="table-responsive">
                        <table class="table table-bordered rounded shadow">
                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-sno"
                                style={{ width: "50%", height: "50%" }}
                              >
                                <div className="d-flex h-100">
                                  <textarea
                                    className="form-control"
                                    rows="11"
                                    placeholder="Comments, Notes, and Special Instructions"
                                  ></textarea>
                                </div>{" "}
                              </td>

                              <td
                                className="table-row"
                                style={{ width: "25%", height: "50%" }}
                              >
                                {" "}
                                <td className="d-flex justify-content-between">
                                  <td>SUBTOTAL :</td>
                                  <td className="fw-bolder">
                                    <input
                                      type="number"
                                      className="rounded d-print-none"
                                    />
                                  </td>
                                </td>
                                <hr
                                  style={{
                                    color: "Grey",
                                    height: "0px",
                                  }}
                                />
                                <td className="d-flex justify-content-between">
                                  <td>Gst(18%) :</td>
                                  <td className="fw-bolder">
                                    <input
                                      type="number"
                                      className="rounded d-print-none"
                                    />
                                  </td>
                                </td>
                                <hr
                                  style={{
                                    color: "Grey",
                                    height: "0px",
                                  }}
                                />
                                <td className="d-flex justify-content-between">
                                  <td>Discount Amount :</td>
                                  <td className="fw-bolder">
                                    <input
                                      type="number"
                                      className="rounded d-print-none"
                                    />
                                  </td>
                                </td>
                                <hr
                                  style={{
                                    color: "Grey",
                                    height: "0px",
                                  }}
                                />
                                <td className="d-flex justify-content-between">
                                  <td>Total Amount :</td>
                                  <td>
                                    <input
                                      className="rounded d-print-none"
                                      // value={totalAmount}
                                    />
                                  </td>
                                </td>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class=" mt-5 d-flex">
                  <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-0 col-sm-1"></div>
                  <div class="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-5">
                    <h4 className="d-flex ms-5 ">Thank you </h4>
                  </div>

                  <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3">
                    <div className="d-flex justify-content-end me-4">
                      <button
                        class="btn text-light text-capitalize px-4"
                        style={{ backgroundColor: "#213555" }}
                        onClick={() => window.print()}
                      >
                        Print
                      </button>
                    </div>
                  </div>
                  <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3">
                    <button
                      class="btn text-light text-capitalize px-4"
                      style={{ backgroundColor: "#213555" }}
                      onClick={() => window.print()}
                    >
                      PAY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Payment;

const Wrapper = styled.div`
  .space {
    margin-right: 23.4rem;
  }
  .spaces {
    margin-right: 45rem;
  }
  @media print {
    .dum {
      display: none;
    }
  }
`;
