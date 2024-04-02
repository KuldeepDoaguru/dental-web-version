import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaCommentsDollar } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { FaMoneyBills } from "react-icons/fa6";

const Sider = () => {
  const location = useLocation();

  const getSidebarClass = (path) => {
    return location.pathname === path ? "active-nav" : "";
  };
  return (
    <Wrapper>
      <div className="" id="sidebar">
        <div className="d-flex flex-column align-items-center pt-2">
          <ul className="nav nav-pills nav-dash" id="menu">
            <li class="nav-item link-div">
              <Link
                to="/accountant-dashboard"
                class={`nav-link  align-middle ${getSidebarClass(
                  "/accountant-dashboard"
                )}`}
              >
                <div className="link-div">
                  <i className="fs-3 bi bi-house-door-fill"></i>
                </div>
                <div d-flex justify-content-center>
                  <h3 class=" d-none d-sm-inline fs-6 text-light">Dashboard</h3>
                </div>
              </Link>
            </li>
            <hr />
            {/* <li class="nav-item link-div">
              <Link
                to="/AddPatientBill"
                class={`nav-link  align-middle ${getSidebarClass(
                  "/AddPatientBill"
                )}`}
              >
                <div className="link-div">
                  <FaMoneyBills className="bi bi-people-fill icon fs-3 bi bi-house-door-fill" />
                </div>
                <div d-flex justify-content-center>
                  <h3 class=" d-none d-sm-inline fs-6 text-light">
                    Generate Bill
                  </h3>
                </div>
              </Link>
            </li>
            <hr /> */}
            <li className="">
              <Link
                to="/security-amount"
                class={`nav-link  align-middle ${getSidebarClass(
                  "/security-amount"
                )}`}
              >
                <div className="link-div">
                  <MdOutlineSecurity className="fs-3 text-white" />
                </div>
                <h3 class="d-none d-sm-inline fs-6 text-light">
                  Security Amount
                </h3>
              </Link>
            </li>
            <hr />
            {/* <li className="">
              <Link
                to="/bill_section"
                class={`nav-link  align-middle ${getSidebarClass(
                  "/bill_section"
                )}`}
              >
                <div className="link-div">
                  <i className="fs-2 bi bi-receipt-cutoff ms-3"></i>
                </div>
                <h3 class="d-none d-sm-inline fs-6 text-light">
                  Create Invoice
                </h3>
              </Link>
            </li>
            <hr /> */}

            <li className="">
              <a
                href="#submenu2"
                data-bs-toggle="collapse"
                className="nav-link  align-middle"
                role="button"
                aria-expanded="false"
                aria-controls="submenu2"
              >
                <div className="link-div">
                  <FaHandHoldingDollar className="fs-1 bi bi-house-door-fill" />
                </div>
                <h3 className="text-center fs-6 text-light">
                  Earning <IoMdArrowDropdown />
                </h3>
              </a>
              <ul
                className="nav flex-column collapse"
                id="submenu2"
                aria-labelledby="submenu2"
              >
                <li className="w-100">
                  <Link
                    to="/OpdMainIncome"
                    className={`nav-link  ${getSidebarClass("/OpdMainIncome")}`}
                  >
                    <span className="text-center text-light fs-6">
                      OPD Income
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link
                    to="/treatment-income"
                    className={`nav-link  ${getSidebarClass(
                      "/treatment-income"
                    )}`}
                  >
                    <span className="text-center text-light fs-6">
                      Treatment Income
                    </span>
                  </Link>
                  <hr />
                </li>

                {/* <li>
                  <Link to="/LabMainIncome" className="nav-link ">
                    <span className="text-center text-light fs-6">
                      Lab Income
                    </span>
                  </Link>
                  <hr />
                </li> */}

                {/* <li>
                  <Link to="/PharmacyMainIncome" className="nav-link ">
                    <span className="d-none d-sm-inline text-light fs-6">
                      Pharmacy Income
                    </span>
                  </Link>
                  <hr />
                </li> */}

                <li>
                  <Link
                    to="/PatientsDue"
                    className={`nav-link  ${getSidebarClass("/PatientsDue")}`}
                  >
                    <span className="d-none d-sm-inline text-light fs-6">
                      Due Payment
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link
                    to="/PatientsPaid"
                    className={`nav-link  ${getSidebarClass("/PatientsPaid")}`}
                  >
                    <span className="d-none d-sm-inline text-light fs-6">
                      Paid Payment
                    </span>
                  </Link>
                  <hr />
                </li>
              </ul>
            </li>

            <hr />

            <li className="">
              <Link
                to="#submenu3"
                data-bs-toggle="collapse"
                class="nav-link  align-middle "
              >
                <div className="link-div">
                  <LiaFileInvoiceDollarSolid className="fs-1 bi bi-house-door-fill" />
                </div>
                <h3 class="d-none d-sm-inline fs-6 text-light">
                  Expense <IoMdArrowDropdown />
                </h3>
              </Link>
              <ul
                class="collapse nav flex-column"
                id="submenu3"
                data-bs-parent="#submenu3"
              >
                <li class="w-100">
                  <Link
                    to="/StaffSalary"
                    class={`nav-link  ${getSidebarClass("/StaffSalary")}`}
                  >
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      Staff Salary
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link
                    to="/VoucherCreater"
                    class={`nav-link  ${getSidebarClass("/VoucherCreater")}`}
                  >
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      Voucher Create
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link
                    to="/VoucherList"
                    class={`nav-link  ${getSidebarClass("/VoucherList")}`}
                  >
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      Voucher List
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link
                    to="/NewPurchase"
                    class={`nav-link  ${getSidebarClass("/NewPurchase")}`}
                  >
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      New Purchase
                    </span>
                  </Link>
                  <hr />
                </li>
              </ul>
            </li>
            <hr />

            <li class="nav-item link-div">
              <Link
                to="/total-income"
                class={`nav-link  align-middle ${getSidebarClass(
                  "/total-income"
                )}`}
              >
                <div className="link-div">
                  <FaCommentsDollar className="fs-1 bi bi-house-door-fill" />
                </div>
                <h3 class="d-none d-sm-inline fs-6 text-light">Total Income</h3>
              </Link>
            </li>
            <hr />

            <li className="">
              <div className={`link-div ${"/settings"}`}>
                <Link
                  to="/attendance-leave"
                  class={`nav-link  align-middle ${getSidebarClass(
                    "/attendance-leave"
                  )}`}
                >
                  <div className="link-div">
                    <div className="">
                      <BsFileEarmarkPerson className="fs-2 text-white" />
                    </div>
                    <div>
                      <h3 className=" d-none d-sm-inline fs-6 text-light">
                        Attendance
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
            <hr />
            <li className="">
              <div className={`link-div ${"/settings"}`}>
                <Link
                  to="/account-report-dashboard"
                  class={`nav-link  align-middle ${getSidebarClass(
                    "/account-report-dashboard"
                  )}`}
                >
                  <div className="link-div">
                    <div className="">
                      <TbReport className="fs-2 text-white" />
                    </div>
                    <div>
                      <h3 className=" d-none d-sm-inline fs-6 text-light">
                        Reports
                      </h3>
                    </div>
                  </div>
                </Link>
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
    /* width: 150px; */
  }
  a {
    text-decoration: none;
  }

  .nav-dash {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .link-div {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  .nav-link {
    text-align: center;
  }

  hr {
    color: white;
  }

  .active-nav {
    background-color: #201658;
    padding: 1rem;
    box-shadow: 0px 0px 16px #7865e0;
  }
`;
