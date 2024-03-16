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
      <div className="px-0" id="sidebar">
        <div className="d-flex flex-column align-items-center pt-2">
          <ul className="nav nav-pills nav-dash" id="menu">
            <li class="nav-item link-div">
              <Link
                to="/accountant-dashboard"
                class="nav-link px-0 align-middle"
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

            <li className="">
              <a
                href="#submenu2"
                data-bs-toggle="collapse"
                className="nav-link px-0 align-middle"
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
                  <Link to="/OpdMainIncome" className="nav-link px-0">
                    <span className="text-center text-light fs-6">
                      OPD Income
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link to="/TreatmentMainInCome" className="nav-link px-0">
                    <span className="text-center text-light fs-6">
                      Treatment Income
                    </span>
                  </Link>
                  <hr />
                </li>

                {/* <li>
                  <Link to="/LabMainIncome" className="nav-link px-0">
                    <span className="text-center text-light fs-6">
                      Lab Income
                    </span>
                  </Link>
                  <hr />
                </li> */}

                <li>
                  <Link to="/PharmacyMainIncome" className="nav-link px-0">
                    <span className="d-none d-sm-inline text-light fs-6">
                      Pharmacy Income
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link to="/PatientsDue" className="nav-link px-0">
                    <span className="d-none d-sm-inline text-light fs-6">
                      Due Payment
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link to="/PatientsPaid" className="nav-link px-0">
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
                class="nav-link px-0 align-middle "
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
                  <Link to="/StaffSalary" class="nav-link px-0">
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
                  <Link to="/VoucherCreater" class="nav-link px-0">
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
                  <Link to="/VoucherList" class="nav-link px-0">
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
                  <Link to="/NewPurchase" class="nav-link px-0">
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      New Purchase
                    </span>
                  </Link>
                  <hr />
                </li>

                {/* <li>
                  <Link to="/DueByUs" class="nav-link px-0">
                    
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      Due Payment
                    </span>
                  </Link>
                  <hr />
                </li> */}

                {/* <li>
                  <Link to="/PaidByUs" class="nav-link px-0">
                    
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      Paid Payment
                    </span>
                  </Link>
                  <hr />
                </li> */}
              </ul>
            </li>
            <hr />

            {/* <li className="">
              <Link
                to="#submenu4"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle"
              >
                <div className="link-div">
                  <FaCommentsDollar className="fs-1 bi bi-house-door-fill" />
                </div>
                <h3 class="d-none d-sm-inline fs-6 text-light">
                  Total Income <IoMdArrowDropdown />
                </h3>
              </Link>
              <ul
                class="collapse nav flex-column ms-1"
                id="submenu4"
                data-bs-parent="#menu"
              >
                <li class="w-100">
                  <Link to="/TodayIncome" class="nav-link px-0">
                    
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      Today Income
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link to="/WeeklyIncome" class="nav-link px-0">
                    
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      Weekly Income
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link to="/Monthly" class="nav-link px-0">
                    
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      Monthly Income
                    </span>
                  </Link>
                  <hr />
                </li>

                <li>
                  <Link to="/Yearly" class="nav-link px-0">
                    
                    <span
                      class="d-none d-sm-inline text-light fs-6"
                      target="_blank"
                    >
                      Annual Income
                    </span>
                  </Link>
                  <hr />
                </li>
              </ul>
            </li>
            <hr /> */}

            <li class="nav-item link-div">
              <Link to="/total-income" class="nav-link px-0 align-middle">
                <div className="link-div">
                  <FaCommentsDollar className="fs-1 bi bi-house-door-fill" />
                </div>
                <h3 class="d-none d-sm-inline fs-6 text-light">Total Income</h3>
              </Link>
            </li>
            <hr />

            <li className="">
              <Link to="/bill_section" class="nav-link px-0 align-middle ">
                <div className="link-div">
                  <i className="fs-2 bi bi-receipt-cutoff ms-3"></i>
                </div>
                <h3 class="d-none d-sm-inline fs-6 text-light">
                  Create Invoice
                </h3>
              </Link>
            </li>
            <hr />

            <li className="">
              <div className={`link-div ${"/settings"}`}>
                <Link to="/clinic-setting" class="nav-link px-0 align-middle ">
                  <div className="link-div">
                    <div className="">
                      <i className="fs-2 bi bi-gear"></i>
                    </div>
                    <div>
                      <h3 className=" d-none d-sm-inline fs-6 text-light">
                        Settings
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
`;
