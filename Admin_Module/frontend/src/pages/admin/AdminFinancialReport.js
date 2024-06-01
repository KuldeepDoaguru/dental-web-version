import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaCommentsDollar } from "react-icons/fa6";
// import Sider from "../../../components/Sider";
// import Header from "../../../components/Header";
// import BranchSelector from "../../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { utils, writeFile } from "xlsx";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";

const FinancialReportCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  const location = useLocation();
  const [earnBill, setEarnBill] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedEarn, setSelectedEarn] = useState([]);

  const getBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getBillsByBranch/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setEarnBill(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchaseList = async () => {
    try {
      const response = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/downloadEarnReportByTime/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAppointmentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    window.history.go(-1);
  };

  useEffect(() => {
    getBillDetails();
    getPurchaseList();
  }, [user.branch_name]);

  const todayDate = new Date();

  // Get year, month, and date
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate.slice(0, 7));

  const filterForPaidBills = earnBill?.filter((item) => {
    return (
      item.payment_status === "paid" &&
      item.payment_date_time?.split("T")[0].slice(0, 7) ===
        formattedDate.slice(0, 7)
    );
  });

  console.log(filterForPaidBills);

  //filterforexpenses
  const filterForExpenses = appointmentList?.filter((item) => {
    return (
      item.purchase_date?.split("T")[0].slice(0, 7) ===
      formattedDate.slice(0, 7)
    );
  });

  const totalPrice = () => {
    try {
      let total = 0;
      filterForPaidBills.forEach((item) => {
        total = total + parseFloat(item.paid_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalValue = totalPrice();
  console.log(totalValue);

  const totalPurchasePrice = () => {
    try {
      let total = 0;
      filterForExpenses.forEach((item) => {
        total = total + parseFloat(item.total_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalPurchase = totalPurchasePrice();
  console.log(totalPurchase);

  const proLoss = totalValue - totalPurchase;
  console.log(proLoss);

  const downloadEarningData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/downloadEarnReportByTime/${user.branch_name}`,
        { fromDate, toDate },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setSelectedEarn(data);
      if (Array.isArray(data)) {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the report data to worksheet format
        const worksheet = utils.json_to_sheet(data);

        utils.book_append_sheet(workbook, worksheet, `Earning Report`);
        writeFile(workbook, `${fromDate} - ${toDate}-earning-report.xlsx`);
        console.log(data);
      } else {
        console.error("data is not an array");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downloadExpenseData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/downloadExpenseReportByTime/${user.branch_name}`,
        { fromDate: fromDate, toDate: toDate }
      );
      console.log(data);
      setSelectedEarn(data);
      if (Array.isArray(data)) {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the report data to worksheet format
        const worksheet = utils.json_to_sheet(data);

        utils.book_append_sheet(workbook, worksheet, `Expense Report`);
        writeFile(workbook, `${fromDate} - ${toDate}-expense-report.xlsx`);
        console.log(data);
      } else {
        console.error("data is not an array");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(`${fromDate} - ${toDate}`);

  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  {/* <BranchSelector /> */}
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid mt-2">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow rounded">
                      <div class="container-fluid d-flex justify-content-center">
                        <h2 className="text-dark text-center">
                          Financial Report
                        </h2>
                      </div>
                    </nav>
                  </div>
                  {/* <FinancialReports />
                  <FinancialCard />
                  <FinancialTables /> */}
                </div>
                <div className="container-fluid">
                  <div class="row mt-4">
                    <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="round-circle">
                            <FaHandHoldingDollar className="ficon" />
                          </div>

                          <h3 className="text-light mt-4">INR {totalValue}</h3>
                          <h4 className="text-light">EARNINGS</h4>
                        </div>
                      </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="round-circle">
                            <LiaFileInvoiceDollarSolid className="ficon" />
                          </div>

                          <h3 className="text-light mt-4">
                            INR {totalPurchase}
                          </h3>
                          <h4 className="text-light">EXPENSES</h4>
                        </div>
                      </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="round-circle">
                            <FaCommentsDollar className="ficon" />
                          </div>
                          <h3 className="text-light mt-4">
                            INR{" "}
                            <span class={proLoss < 0 ? "negative" : ""}>
                              {proLoss}
                            </span>
                          </h3>
                          <h4 className="text-light">NET PROFIT/LOSS</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row mt-2 g-5">
                    <div className="col-sm-12 col-md-11 col-lg-6 col-xl-6">
                      <div className="d-flex justify-content-center">
                        <button class="btn btn-outline-success fs-3 shadow">
                          Earning
                        </button>
                      </div>
                      <form onSubmit={downloadEarningData}>
                        <div className="d-flex justify-content-center mt-4">
                          <div className="d-flex">
                            <div>
                              <input
                                type="date"
                                required
                                className="p-1 rounded"
                                onChange={(e) => setFromDate(e.target.value)}
                              />
                            </div>
                            <p className="mx-2">To</p>
                            <div>
                              <input
                                type="date"
                                required
                                className="p-1 rounded"
                                onChange={(e) => setToDate(e.target.value)}
                              />
                            </div>
                          </div>
                          <button
                            className="btn btn-success mx-2"
                            type="submit"
                          >
                            Download
                          </button>
                        </div>
                      </form>

                      <div class="table-responsive mt-2">
                        <table class="table table-bordered">
                          <thead className="table-head">
                            <tr>
                              <th>Bill ID</th>
                              <th>Payment Date</th>
                              <th>Amount</th>
                              <th>Patient Name</th>
                              <th>Receiver's Name</th>
                              <th>Receiver's ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterForPaidBills?.map((item) => (
                              <>
                                <tr>
                                  <td>{item.bill_id}</td>
                                  <td>
                                    {item.payment_date_time?.split("T")[0]}
                                  </td>
                                  <td>{item.paid_amount}</td>
                                  <td>{item.patient_name}</td>
                                  <td>{item.receiver_name}</td>
                                  <td>{item.receiver_emp_id}</td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-11 col-lg-6 col-xl-6">
                      <div className="d-flex justify-content-center">
                        <button class="btn btn-outline-success fs-3 shadow">
                          Expenses
                        </button>
                      </div>
                      <form onSubmit={downloadExpenseData}>
                        <div className="d-flex justify-content-center mt-4">
                          <div className="d-flex">
                            <div>
                              <input
                                type="date"
                                required
                                className="p-1 rounded"
                                onChange={(e) => setFromDate(e.target.value)}
                              />
                            </div>
                            <p className="mx-2">To</p>
                            <div>
                              <input
                                type="date"
                                required
                                className="p-1 rounded"
                                onChange={(e) => setToDate(e.target.value)}
                              />
                            </div>
                          </div>
                          <button
                            className="btn btn-success mx-2"
                            type="submit"
                          >
                            Download
                          </button>
                        </div>
                      </form>
                      <div class="table-responsive mt-2">
                        <table class="table table-bordered">
                          <thead className="table-head">
                            <tr>
                              <th scope="col">Purchase ID</th>
                              <th scope="col">Product Name</th>
                              <th scope="col">Product MRP</th>
                              <th scope="col">Purchase Quantity</th>
                              <th scope="col">Total Amount</th>
                              <th>Purchase Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterForExpenses.map((item) => (
                              <>
                                <tr>
                                  <td>{item.pur_id}</td>
                                  <td>{item.item_name}</td>
                                  <td>{item.item_mrp}</td>
                                  <td>{item.pur_quantity}</td>
                                  <td>{item.total_amount}</td>
                                  <td>{item.purchase_date?.split("T")[0]}</td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
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

export default FinancialReportCard;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #1abc9c;
    font-weight: bold;
    color: white;
  }

  .card-body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .ficon {
    font-size: 5rem;
    color: #225f5c;
  }

  .card {
    background-color: #1abc9c;
    border: none;
    box-shadow: 1px 1px 10px #1abc9c;
  }

  .round-circle {
    background-color: white;
    padding: 1rem;
    border-radius: 50%;
    box-shadow: 1px 1px 40px #1abc9c;
  }

  th {
    background-color: #1abc9c;
    color: white;
  }
  .negative {
    color: red;
  }
`;
