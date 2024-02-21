import React from "react";
import styled from "styled-components";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaCommentsDollar } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

export const FinancialCard = () => {
  return (
    <>
      <Container>
        <div className="container-fluid">
          <div className="row">
            <div className="col-1"></div>

            <div className="col-11 mt-4">
              <div class="row d-flex justify-content-between">

                <div class="col-xl-3 col-lg-3 col-md-5 card mt-4">
                  <div className="icon fs-1 text-light">
                    <FaHandHoldingDollar /></div>
                  <div class="card-body fs-1 text-light ms-5">INR 25000</div>

                  <div class="card-footer text-light"> EARNINGS</div>
                </div>

                <div class=" col-xl-3 col-lg-3 col-md-6 card  mt-4">
                  <div className="icon fs-1 text-light">
                    <LiaFileInvoiceDollarSolid />
                  </div>
                  <div class="card-body fs-1 ms-5 text-light">INR 15000</div>
                  <div class="card-footer text-light"> EXPENSES</div>
                </div>

                <div class="col-xl-3 col-lg-3 col-md-6  me-xl-5 card  mt-4">
                  <div className="icon fs-1 text-light">
                    <FaCommentsDollar />
                  </div>
                  <div class="card-body fs-1 ms-5 text-light">+INR 10000</div>

                  <div class="card-footer text-light">NET PROFIT/ LOSS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-1"></div>
            <div className="col-11 d-flex justify-content-center">
              <div className="List me-3 report px-4  rounded-pill">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    class="form-check-label text-light"
                    for="flexRadioDefault1"
                  >
                    Newest to Oldest
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                  />
                  <label
                    class="form-check-label text-light"
                    for="flexRadioDefault2"
                  >
                    Oldest to Newest
                  </label>
                </div>
              </div>

              <form class="d-flex me-4 mt-1" role="search">
                <button class="btn btn-outline-light mb-1 report" type="Search">
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FinancialCard;

const Container = styled.div`
  .report {
    background-color: #004aad;
  }

  .card {
    background-color: #004aad;
  }
`;
