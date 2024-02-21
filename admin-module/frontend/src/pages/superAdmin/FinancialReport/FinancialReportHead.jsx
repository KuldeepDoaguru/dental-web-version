import React from "react";
import styled from "styled-components";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const FinancialReportHead = () => {
  return (
    <>
      <Container>
        <div className="container-fluid">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11">
              <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container d-flex justify-content-center ms-lg-5">
                  <h2 className="text-dark text-center">Financial Report</h2>
                </div>

                <ul class="navbar-nav mb-2 mb-lg-0 me-5 d-none">
                  <li class="nav-item ms-2 ">
                    <select className="form-control rounded-pill">
                      {" "}
                      <IoMdArrowDropdownCircle />
                      <option value="">Date</option>
                      <option value="Cardiac Care">from to from</option>
                      <option value="Preventive Medicine">
                        01 April to 30 April
                      </option>
                      <option value="Diabetes Care">01 May to 31st May</option>
                      <option value="Critical Care">01 June to 30 June </option>
                      <option value="Orthopedic Care">
                        01 July to 31st July
                      </option>
                      <option value="Neurological Care">
                        01 August to 31st August
                      </option>
                      <option value="Gynecologist Care">
                        01 Sep to 30 sep
                      </option>
                    </select>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FinancialReportHead;
const Container = styled.div`
  nav {
    background-color: #004aad;
  }
`;
