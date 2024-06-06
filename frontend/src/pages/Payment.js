import React from "react";
import styled from "styled-components";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcAmex } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcDiscover } from "react-icons/fa6";

const Payment = () => {
  return (
    <>
      <Container>
        <div class="container">
          <div class="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="d-flex justify-content-center ">
                <div class="col-xxl-3 col-xl-4 col-lg-3 col-md-4 col-sm-4 mb-3 me-4">
                  <div class="card p-3">
                    <div class="img-box">
                      <img
                        src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png"
                        alt=""
                      />
                    </div>
                    <div class="number">
                      <label class="fw-bold" for="">
                        **** **** **** 1060
                      </label>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <small>
                        <span class="fw-bold">Expiry date:</span>
                        <span>10/16</span>
                      </small>
                      <small>
                        <span class="fw-bold">Name:</span>
                        <span>Kumar</span>
                      </small>
                    </div>
                  </div>
                </div>
                <div class="col-xxl-3 col-xl-4 col-lg-3 col-md-4 col-sm-4 ms-4 mb-3 me-4">
                  <div class="card p-3">
                    <div class="img-box">
                      <img
                        src="https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png"
                        alt=""
                      />
                    </div>
                    <div class="number">
                      <label class="fw-bold">**** **** **** 1060</label>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <small>
                        <span class="fw-bold">Expiry date:</span>
                        <span>10/16</span>
                      </small>
                      <small>
                        <span class="fw-bold">Name:</span>
                        <span>Kumar</span>
                      </small>
                    </div>
                  </div>
                </div>
                <div class="col-xxl-3 col-xl-4 col-lg-3 col-md-4 col-sm-4 ms-4 mb-3 mb-3 ms-2">
                  <div class="card p-3">
                    <div class="img-box">
                      <img
                        src="https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png"
                        alt=""
                      />
                    </div>
                    <div class="number">
                      <label class="fw-bold">**** **** **** 1060</label>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <small>
                        <span class="fw-bold">Expiry date:</span>
                        <span>10/16</span>
                      </small>
                      <small>
                        <span class="fw-bold">Name:</span>
                        <span>Kumar</span>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="d-flex justify-content-center ">
                <div class="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 mt-4">
                  <div class="card p-3">
                    <p class="mb-0 fw-bold h4">Payment Methods</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="d-flex justify-content-center ">
                <div class="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
                  <div class="card px-1">
                    <div class="card-body border px-1 py-2">
                      <p>
                        <a
                          class="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between"
                          data-bs-toggle="collapse"
                          href="#collapseExample"
                          role="button"
                          aria-expanded="true"
                          aria-controls="collapseExample"
                        >
                          <span class="fw-bold ms-4 py-2">PayPal</span>
                          <span className="me-3">
                            <FaCcPaypal />
                          </span>
                        </a>
                      </p>
                      <div class="collapse p-3 pt-0" id="collapseExample">
                        <div class="row">
                          <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8">
                            <p class="h4 mb-0 mt-3">Summary</p>
                            <p class="mb-0 mt-2">
                              <span class="fw-bold mt-1 ms-1">Treatment :</span>
                              <span class="c-green"> Payment</span>
                            </p>
                            <p class="mb-0">
                              <span class="fw-bold ms-1">Price :</span>
                              <span class="c-green"> ₹ 2,425.00</span>
                            </p>
                            <p class="mb-0 mt-1 ms-1">
                              This Amount is for the Treatment of Braces.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="card-body border px-1 py-2">
                      <p>
                        <a
                          class="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                          data-bs-toggle="collapse"
                          href="#collapseExample"
                          role="button"
                          aria-expanded="true"
                          aria-controls="collapseExample"
                        >
                          <span class="fw-bold ms-3 ">Credit Card</span>
                          <span class="me-2">
                            <span class="me-2">
                              {" "}
                              <FaCcAmex />
                            </span>
                            <span class="me-2">
                              <FaCcMastercard />
                            </span>
                            <span>
                              <FaCcDiscover />
                            </span>
                          </span>
                        </a>
                      </p>
                      <div class="collapse show p-3 pt-0" id="collapseExample">
                        <div class="row">
                          <div class="col-lg-5 mb-lg-0 mb-3">
                            <p class="h4 mb-0 mt-3">Summary</p>
                            <p class="mb-0 mt-2">
                              <span class="fw-bold mt-1 ms-1">Product :</span>
                              <span class="c-green mt-1 ms-1">
                                Name of product
                              </span>
                            </p>
                            <p class="mb-0 mt-1">
                              <span class="fw-bold mt-1 ms-1">Price :</span>
                              <span class="c-green mt-1 ms-1">$452.90</span>
                            </p>
                            <p class="mb-0 mt-1 ms-1">
                              This Amount is for the Treatment of Braces.
                            </p>
                          </div>
                          <div class="col-lg-7">
                            <form action="" class="form">
                              <div class="row">
                                <div class="col-12 mt-3">
                                  <div class="form__div">
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder=" "
                                    />
                                    <label for="" class="form__label">
                                      Card Number
                                    </label>
                                  </div>
                                </div>

                                <div class="col-6">
                                  <div class="form__div">
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder=" "
                                    />
                                    <label for="" class="form__label">
                                      MM / yy
                                    </label>
                                  </div>
                                </div>

                                <div class="col-6">
                                  <div class="form__div">
                                    <input
                                      type="password"
                                      class="form-control"
                                      placeholder=" "
                                    />
                                    <label for="" class="form__label">
                                      cvv code
                                    </label>
                                  </div>
                                </div>
                                <div class="col-12">
                                  <div class="form__div">
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder=" "
                                    />
                                    <label for="" class="form__label">
                                      name on the card
                                    </label>
                                  </div>
                                </div>
                                <div class="col-12">
                                  <div class="btn btn-success px-4 py-1">
                                    Submit
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="d-flex justify-content-center ">
                <div class="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
                  <div class="btn btn-primary payment">Make Payment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Payment;
const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  .container {
    margin: 30px auto;
  }

  .container .card {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: #fff;
    border-radius: 0px;
  }

  body {
    background: #eee;
  }

  .btn.btn-primary {
    background-color: #ddd;
    color: black;
    box-shadow: none;
    border: none;
    font-size: 20px;
    width: 100%;
    height: 100%;
  }

  .btn.btn-primary:focus {
    box-shadow: none;
  }

  .container .card .img-box {
    width: 80px;
    height: 50px;
  }

  .container .card img {
    width: 100%;
    object-fit: fill;
  }

  .container .card .number {
    font-size: 24px;
  }

  .container .card-body .btn.btn-primary .fab.fa-cc-paypal {
    font-size: 32px;
    color: #3333f7;
  }

  .fab.fa-cc-amex {
    color: #1c6acf;
    font-size: 32px;
  }

  .fab.fa-cc-mastercard {
    font-size: 32px;
    color: red;
  }

  .fab.fa-cc-discover {
    font-size: 32px;
    color: orange;
  }

  .c-green {
    color: green;
  }

  .box {
    height: 40px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ddd;
  }

  .btn.btn-primary.payment {
    background-color: #1c6acf;
    color: white;
    border-radius: 0px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }

  .form__div {
    height: 50px;
    position: relative;
    margin-bottom: 24px;
  }

  .form-control {
    width: 100%;
    height: 45px;
    font-size: 14px;
    border: 1px solid #dadce0;
    border-radius: 0;
    outline: none;
    padding: 2px;
    background: none;
    z-index: 1;
    box-shadow: none;
  }

  .form__label {
    position: absolute;
    left: 16px;
    top: 10px;
    background-color: #fff;
    color: #80868b;
    font-size: 16px;
    transition: 0.3s;
    text-transform: uppercase;
  }

  .form-control:focus + .form__label {
    top: -8px;
    left: 12px;
    color: #1a73e8;
    font-size: 12px;
    font-weight: 500;
    z-index: 10;
  }

  .form-control:not(:placeholder-shown).form-control:not(:focus)
    + .form__label {
    top: -8px;
    left: 12px;
    font-size: 12px;
    font-weight: 500;
    z-index: 10;
  }

  .form-control:focus {
    border: 1.5px solid #1a73e8;
    box-shadow: none;
  }
`;
