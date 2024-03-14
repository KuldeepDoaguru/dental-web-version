import React from "react";
import styled from "styled-components";
import { PiStethoscopeBold } from "react-icons/pi";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import { LiaMicroscopeSolid } from "react-icons/lia";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <>
      <Container>
        <div className="row d-flex justify-content-around">
          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <PiStethoscopeBold />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">OPD Income</h5>
                  <p className="card-text text-light fw-semibold">5000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <MdOutlineLocalPharmacy />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Pharmacy Income</h5>
                  <p className="card-text text-light fw-semibold">250000</p>
                </div>
              </div>
            </div>
          </div>

      

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <LiaFileInvoiceDollarSolid />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Expenses</h5>
                  <p className="card-text text-light fw-semibold">15</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <Link to="/AddPatientBill" className="noUnderline">
              <div className="card">
                <div className="card-body d-flex justify-content-center flex-column">
                  <div>
                    <TbReportSearch className="bi bi-people-fill icon" />
                  </div>

                  <div className="cardtext">
                    <h5 className="card-title text-light">Add Bills</h5>
                    <p className="card-text text-light fw-semibold">09</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cards;

const Container = styled.div`
  .card {
    background: #201658;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background:  black;
    }
  }

  .icon {
    font-size: 40px;
    /* align-items: start; */
    color: white;
    /* display: flex; */
  }
  .card-body {
    text-align: center;
    padding: 5px;
  }
  .card-link {
    text-decoration: none;
    font-size: small;
  }

  .cardtext {
    h5 {
      color: white;
    }
    p {
      color: white;
    }
  }
  .noUnderline {
    text-decoration: none;
    /* Add any other styles you want for the link here */
  }
`;
