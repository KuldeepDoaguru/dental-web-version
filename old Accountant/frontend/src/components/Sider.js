import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaCommentsDollar } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const Sider = () => {
  return (
    <Wrapper>
      <div className="px-sm-3 px-0" id="sidebar">
        <div className="d-flex flex-column align-items-center  px-3 pt-2">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li class="nav-item">
              <Link
                to="/superadmin-dashboard"
                class="nav-link px-0 align-middle"
              >
                <div className="d-flex justify-content-center ms-4">
                  <i className="fs-3 bi bi-house-door-fill"></i>
                </div>
                <div d-flex justify-content-center>
                  <h3 class=" d-none d-sm-inline fs-5 text-light ms-4">
                    Dashboard
                  </h3>
                </div>
              </Link>
            </li>
            <hr />

            <li className="ms-3">
              <Link
                to="#submenu2"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle "
              >
                <div className="d-flex justify-content-center ms-4">
                  <FaHandHoldingDollar className="fs-1 bi bi-house-door-fill ms-1" />
                </div>{" "}
                <h3 class="d-none d-sm-inline fs-5 text-light ms-4">
                  Earning <IoMdArrowDropdown />
                </h3>{" "}
              </Link>
              <ul
                class="collapse nav flex-column ms-1"
                id="submenu2"
                data-bs-parent="#menu"
              >
                <li class="w-100">
                  <Link to="/OpdMainIncome" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      OPD Income
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/TreatmentMainInCome" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Treatment Income
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/LabMainIncome" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Lab Income
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/PharmacyMainIncome" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Pharmacy Income
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/PatientsDue" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Due Payment
                    </span>{" "}
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/PatientsPaid" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Paid Payment
                    </span>{" "}
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>
              </ul>
            </li>
            <hr />

            <li className="ms-3">
              <Link
                to="#submenu3"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle "
              >
                <div className="d-flex justify-content-center ms-2">
                  <LiaFileInvoiceDollarSolid className="fs-1 bi bi-house-door-fill" />
                </div>{" "}
                <h3 class="d-none d-sm-inline fs-5 text-light ms-4">
                  Expense <IoMdArrowDropdown />
                </h3>{" "}
              </Link>
              <ul
                class="collapse nav flex-column ms-1"
                id="submenu3"
                data-bs-parent="#menu"
              >
                <li class="w-100">
                  <Link to="/StaffSalary" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Staff Salary
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/VoucherCreater" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Voucher Create
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/VoucherList" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Voucher List
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/NewPurchase" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      New Parchesh
                    </span>{" "}
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/DueByUs" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Due Payment
                    </span>{" "}
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/PaidByUs" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Paid Payment
                    </span>{" "}
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>
              </ul>
            </li>
            <hr />

            <li className="ms-3">
              <Link
                to="#submenu4"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle"
              >
                <div className="d-flex justify-content-center me-3">
                  <FaCommentsDollar className="fs-1 bi bi-house-door-fill" />
                </div>{" "}
                <h3 class="d-none d-sm-inline fs-5 text-light ms-2">
                  Total Income <IoMdArrowDropdown />
                </h3>{" "}
              </Link>
              <ul
                class="collapse nav flex-column ms-1"
                id="submenu4"
                data-bs-parent="#menu"
              >
                <li class="w-100">
                  <Link to="/TodayIncome" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Today Income
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/WeeklyIncome" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Weekly Income
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/Monthly" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Monthly Income
                    </span>
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>

                <li>
                  <Link to="/Yearly" class="nav-link px-0">
                    {" "}
                    <span
                      class="d-none d-sm-inline text-light fs-5"
                      target="_blank"
                    >
                      Annual Income
                    </span>{" "}
                  </Link>
                  <hr
                    style={{
                      color: "white",
                      height: "0px",
                    }}
                  />
                </li>
              </ul>
            </li>
            <hr />

            <li className="ms-2">
              <Link to="/bill_section" class="nav-link px-0 align-middle ">
                <div className="d-flex justify-content-center">
                  <i className="fs-2 bi bi-receipt-cutoff ms-3"></i>
                </div>{" "}
                <h3 class="d-none d-sm-inline fs-5 text-light ms-3">
                  Patents Bills
                </h3>{" "}
              </Link>
            </li>
            <hr />

            <li className="ms-4">
              <div className={`link-div ${"/settings"}`}>
                <Link to="/clinic-setting" class="nav-link px-0 align-middle ">
                  <div className="ms-3">
                    <i className="fs-2 bi bi-gear ms-4"></i>
                  </div>
                  <div>
                    <h3 className=" d-none d-sm-inline fs-5 text-light ms-3">
                      Settings
                    </h3>
                  </div>
                </Link>
              </div>
            </li>
            <hr />

            <li className="ms-3">
              <div className="link-div">
                <div>
                  <i className="fs-2 bi bi-power ms-5"></i>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn d-none d-sm-inline text-light fs-5  ms-3 "
                    style={{
                      backgroundColor: "#2ecc71",
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </li>
            <hr />
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default Sider;
const Wrapper = styled.div`
  #sidebar {
    width: 100%;
    height: 110rem;
    background-color: #201658;

    @media screen and (max-width: 768px) {
      width: 3rem;
      height: 212rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 5rem;
      height: 151rem;
    }
  }
  .bi {
    color: white;
  }

  .link-div {
    width: 150px;
  }
  a {
    text-decoration: none;
  }
`;
