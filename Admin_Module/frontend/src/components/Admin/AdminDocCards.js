import React from "react";
import styled from "styled-components";
import { IoPeople } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";

const AdminDocCards = () => {
  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row mt-4">
            <div className="col-lg-5 col-5">
              <div className="d-flex justify-content-center">
                <div className="card">
                  <div className="text-center text-dark fw-bold p-2">
                    <h4>Today's Appointments</h4>
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
                          <p className="item-para">Completed</p>&nbsp;
                          <span className="text-warning fw-bold">45</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-between p-2">
                          <p className="item-para">Cancelled</p>&nbsp;
                          <span className="text-secondary fw-bold">45</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 px-3">
              <div className="card">
                <div className="icon">
                  <IoPeople className="fs-1" />
                </div>
                <div className="card-body ">
                  <h6 className="card-title">All Patient</h6>
                  <h5 className="card-subtitle mb-2">119</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-3">
              <div className="card">
                <div className="icon">
                  <FaRegUser className="fs-1" />
                </div>
                <div className="card-body ">
                  <h6 className="card-title">New Patient</h6>
                  <h5 className="card-subtitle mb-2">16</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default AdminDocCards;
const Wrapper = styled.div`
  .card {
    background: #1abc9c;
    padding: 1rem;
    border: none;
    width: 100%;
    box-shadow: 1px 2px 8px #1abc9c;
    &:hover {
      background: #3498db;
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
    color: #000;
    font-weight: bold;
  }
  .icon {
    text-align: center;
    color: #000;
    font-weight: bold;
  }
  .card-title {
    text-align: center;
    color: #000;
    font-weight: bold;
  }
  .card-subtitle {
    text-align: center;
    color: #000;
    font-weight: bold;
  }

  .text-danger {
    font-size: 1.5rem;
  }

  .text-secondary {
    font-size: 1.5rem;
  }

  .text-warning {
    font-size: 1.5rem;
    color: #191a7f !important;
  }
`;
