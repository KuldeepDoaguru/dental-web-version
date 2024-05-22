import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { FaCommentsDollar } from "react-icons/fa6";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import BranchSelector from "../../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { utils, writeFile } from "xlsx";
// import * as XLSX from "xlsx";
import moment from 'moment';


const FinalFinancialReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const location = useLocation();
  const [earnBill, setEarnBill] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [expensesfromDate, setExpensesFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [expensestoDate, setExpensesToDate] = useState("");
  const [selectedEarn, setSelectedEarn] = useState([]);
  const [selectedExpen, setSelectedExpen] = useState([]);

  const getBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getBillsByBranch/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
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
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPurInventoryByBranch/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAppointmentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(appointmentList);

  const goBack = () => {
    window.history.go(-1);
  };

  useEffect(() => {
    getBillDetails();
    getPurchaseList();
  }, [branch.name]);

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
      // (item.payment_date_time ? moment(item.payment_date_time?.split("T")[0],'YYYY-MM-DD').format('DD-MM-YYYY'): "")
    );
  });

  console.log(filterForPaidBills);

  //filterforexpenses
  const filterForExpenses = appointmentList?.filter((item) => {
    return (
      item.purchase_date?.split("T")[0].slice(0, 7) === formattedDate.slice(0, 7)
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
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/downloadEarnReportByTime/${branch.name}`,
        { fromDate: fromDate, toDate: toDate },
        {
          headers: {
            "Content-Type": "application/json",
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
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/downloadExpenseReportByTime/${branch.name}`,
        { expensesfromDate: expensesfromDate, expensestoDate: expensestoDate },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setSelectedExpen(data);
      if (Array.isArray(data)) {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the report data to worksheet format
        const worksheet = utils.json_to_sheet(data);

        utils.book_append_sheet(workbook, worksheet, `Expense Report`);
        writeFile(workbook, `${expensesfromDate} - ${expensestoDate}-expense-report.xlsx`);
        console.log(data);
      } else {
        console.error("data is not an array");
      }
    } catch (error) {
      console.log(error);
    }
  };

//   const downloadExpenseData = async (e) => {
//     e.preventDefault();
//     if (!expensesfromDate || !expensestoDate) {
//       alert("Please select Date");
//       return;
//     }
//     const filteredData = vlist.filter((item) => {
//       const date = moment(item.voucher_date).format("YYYY-MM-DD"); 
//       return moment(date).isBetween(fromDate, toDate, null, "[]");
//     });

//     const formattedData = filteredData.map((item) => ({
//       SN: item.voucher_id,
//       Name: item.for_name,
//       For: item.for_use,
//       Amount: item.voucher_amount,
//       Date: moment(item.voucher_date).format("YYYY-MM-DD"),
//       "Created by": item.created_by,
//       // Add more fields as needed
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(formattedData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, worksheet, "Report");
//     XLSX.writeFile(wb, "voucherReport.xlsx");
//   };
    
  



  console.log(`${fromDate} - ${toDate}`);
  console.log(`${expensesfromDate} - ${expensestoDate}`);
  console.log(filterForExpenses);

  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <BranchSelector />
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
                              <th>Treatment Package ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterForPaidBills
                              ?.filter((item) => {
                                // const billDate =
                                //   item.payment_date_time?.split("T")[0];
                                const billDate =
                                moment(item.payment_date_time.split("T")[0],'YYYY-MM-DD').add(1, 'days').format('DD-MM-YYYY')


                                  //  if (fromDate && toDate) {
                                  // return (
                                  //   billDate >= fromDate && billDate <= toDate
                                  // );
                                   if (fromDate && toDate) {
                                  return (
                                    billDate >=  moment(fromDate,'YYYY-MM-DD').format('DD-MM-YYYY')    && billDate <= moment(toDate,'YYYY-MM-DD').format('DD-MM-YYYY')
                                  );
                                } else {
                                  return true; // If no date range is selected, show all items
                                }
                              })
                              .map((item) => (
                                <>
                                  <tr>
                                    <td>{item.bill_id}</td>
                                    <td>
                                      {moment(item.payment_date_time.split("T")[0],'YYYY-MM-DD').add(1, 'days').format('DD-MM-YYYY')}
                                      
                                    </td>
                                    <td>{item.paid_amount}</td>
                                    <td>{item.patient_name}</td>
                                    <td>{item.tp_id}</td>
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
                                onChange={(e) => setExpensesFromDate(e.target.value)}
                              />
                            </div>
                            <p className="mx-2">To</p>
                            <div>
                              <input
                                type="date"
                                required
                                className="p-1 rounded"
                                onChange={(e) => setExpensesToDate(e.target.value)}
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
                            {filterForExpenses
                              ?.filter((item) => {
                                const billDate =
                                  item.purchase_date?.split("T")[0]; // Extracting the date part
                                if (expensesfromDate && expensestoDate) {
                                  return (
                                    billDate >= expensesfromDate && billDate <= expensestoDate
                                  );
                                } else {
                                  return true; // If no date range is selected, show all items
                                }
                              })
                              .map((item) => (
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

export default FinalFinancialReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #004aad;
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
    background-color: #004aad;
    border: none;
    box-shadow: 1px 1px 10px #004aad;
  }

  .round-circle {
    background-color: white;
    padding: 1rem;
    border-radius: 50%;
    box-shadow: 1px 1px 40px #004aad;
  }

  th {
    background-color: #004aad;
    color: white;
  }
  .negative {
    color: red;
  }
`;
