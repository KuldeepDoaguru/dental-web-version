import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const PatintPaidPaymentPrint = () => {
  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <Container>
        <Header />
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
              <IoArrowBackSharp
                className="fs-1 mt-2 text-black"
                onClick={goBack}
              />
              <div className="d-flex justify-content-center">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <div className="d-flex justify-content-center">
                    <div>
                      <h5>Branch : Madan Mahal</h5>

                      <form className="d-flex ">
                        <h6>Addresh </h6>
                        <h6>: 128,Near Gwarighat Jabalpur M.p (482001)</h6>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <div className="d-flex justify-content-center">
                    <div>
                      <form className="d-flex">
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
              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                <div className="d-flex justify-content-center">
                  <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-11 col-sm-11">
                    <div className="row  mt-2 d-flex justify-content-between">
                      <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-5">
                        <div class=" rounded mt-4">
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

                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <div class=" rounded d-flex justify-content-end mt-5 me-5">
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
                  </div>
                </div>
              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <form className="d-flex justify-content-center mt-4">
                  <h2> Payment Description</h2>
                </form>
                <hr className="mt-5" />
              </div>
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
                        <th scope="col" style={{ width: "20%" }}>
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
                        <td>Cleaning Teeth</td>
                        <td>500</td>
                      </tr>
                      <tr>
                        <th scope="row">02/04/2023</th>
                        <td>Braces Treatment</td>
                        <td>25000</td>
                      </tr>
                      <tr>
                        <th scope="row" colspan="2">
                          04/04/2023
                        </th>

                        <td>750</td>
                      </tr>

                      <tr>
                        <td colspan="2">
                          <h6>
                            Add additional notes and payment information{" "}
                            <span class="space"></span>
                            SubTotal
                          </h6>
                        </td>

                        <td className="fw-bolder">₹3750</td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <h6>
                            <span class="spaces"></span>Gst(18%)
                          </h6>
                        </td>
                        <td className="fw-bolder">₹ 675</td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <h6>
                            <span class="spaces"></span>Paid Amount
                          </h6>
                        </td>
                        <td className="fw-bolder">₹ 2000</td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <h6>
                            <span class="spaces"></span>Total Amount
                          </h6>
                        </td>
                        <td className="fw-bolder">₹ 2425</td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="row mt-5 d-flex">
                    <div class="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9">
                      <h4 className="d-flex ">Thank you </h4>
                    </div>

                    <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3">
                      <div className="d-flex justify-content-end">
                        <button
                          class="btn btn btn-success dum text-capitalize"
                          onClick={() => window.print()}
                        >
                          Print
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-xxl-none d-xl-none d-lg-none col-md-1 col-sm-1"></div>
              </div>
            </div>

            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
              <div className="d-flex justify-content-center mt-4">
                <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-9">
                  <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 mt-4 ms-5">
                    <div class="row">
                      <div class="col-xl-8"></div>
                      <div class="col-xl-3">
                        <ul class="list-unstyled">
                          <li class="text-muted ms-3"></li>
                          <li class="text-muted ms-3 mt-2">
                            <span class="text-black me-4"></span>
                          </li>
                        </ul>
                        <p class="text-black float-start">
                          <span class="text-black me-3"> </span>
                          <span className="fs-5"> </span>
                        </p>
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

export default PatintPaidPaymentPrint;
const Container = styled.div`
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
