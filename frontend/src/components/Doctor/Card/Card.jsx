import React from "react";
import styled from "styled-components";
import { IoPeople } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-5 col-5">
              <div className="card card1">
                <div className="text-center text-light p-2">
                  <p>Today's Appointments</p>{" "}
                </div>
                <div className="d-flex justify-content-center cardtext">
                  <div className="p-2 text-light">Missed</div>
                  <div className="p-2 text-light">Checked-In</div>
                  <div className="p-2 text-light">Checked-Out</div>
                  <div className="p-2 text-light">Complete</div>
                  <div className="p-2 text-light">Cancel</div>
                </div>
                <div className="d-flex justify-content-center m-1 cardno">
                  <div
                    style={{ paddingInline: "2.2rem" }}
                    className="text-danger fw-bold"
                  >
                    45
                  </div>
                  <div
                    style={{ paddingInline: "2.2rem" }}
                    className="text-success fw-bold"
                  >
                    45
                  </div>
                  <div
                    style={{ paddingInline: "2.2rem" }}
                    className="text-warning fw-bold"
                  >
                    45
                  </div>
                  <div
                    style={{ paddingInline: "2.2rem" }}
                    className="text-light fw-bold"
                  >
                    45
                  </div>
                  <div
                    style={{ paddingInline: "2.2rem" }}
                    className="text-secondary fw-bold"
                  >
                    45
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-lg-3 px-3">
              <Link to="/all-patient">
                <div className="card">
                  <div className="icon">
                    <IoPeople className="fs-1" />
                  </div>
                  <div className="card-body ">
                    <h6 className="card-title">All Patient</h6>
                    {/* <h5 className="card-subtitle mb-2">119</h5> */}
                  </div>
                </div>
              </Link>
            </div>
            {/* <div className="col-lg-3 col-3">
              <div className="card">
                <div className="icon">
                  <FaRegUser className="fs-1" />
                </div>
                <div className="card-body ">
                  <h6 className="card-title">New Patient</h6>
                  <h5 className="card-subtitle mb-2">16</h5>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Card;
const Wrapper = styled.div`
  .card {
    background: #0dcaf0;
    padding: 1rem;
    box-shadow: 1px 2px 8px #ababab;
    border: none;
    &:hover {
      background: black;
    }
  }
  .card-body {
    padding: 0.5rem;
  }
  ul {
    padding: 0;
  }
  li {
    list-style: none;
    text-align: right;
    padding: 0;
    margin: 0;
  }
  .item-para {
    margin: 0;
    padding: 1px;
    text-align: start;
    color: white;
  }
  .icon {
    text-align: center;
    color: white;
  }
  .card-title {
    text-align: center;
    color: white;
  }
  .card-subtitle {
    text-align: center;
    color: white;
  }
  a {
    text-decoration: none;
  }
  .card1 .cardtext {
    @media (min-width: 820px) and (max-width: 1024px) {
      div{
        font-size: 14px;
      }
    }
  }
  .card1 .cardno {
    @media (min-width: 820px) and (max-width: 1024px) {
      div{
        font-size: 14px;
        margin: -6px;
      }
    }
  }
`;

 {/* <div className="d-flex justify-content-center">
                <div className="card">
                  <div className="text-center text-light p-2">
                    Today's Appointments
                  </div>
                  <div className="card-body">
                    <ul>
                      <li>
                        <div className="d-flex justify-content-between p-2">
                          <p className="item-para">Missed</p>&nbsp;
                          <span className="text-danger fw-bold">45</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-between p-2">
                          <p className="item-para">Checked-In</p>&nbsp;
                          <span className="text-success fw-bold">45</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-between p-2">
                          <p className="item-para">Checked-Out</p>&nbsp;
                          <span className="text-warning fw-bold">45</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-between p-2">
                          <p className="item-para">Complete</p>&nbsp;
                          <span className="text-info fw-bold">45</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-between p-2">
                          <p className="item-para">Cancled</p>&nbsp;
                          <span className="text-secondary fw-bold">45</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
