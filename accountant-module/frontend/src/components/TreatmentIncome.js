import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaMoneyBill } from "react-icons/fa";
import { SiMoneygram } from "react-icons/si";
import { MdOutlineNextWeek } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import BranchDetails from "./BranchDetails";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

const TreatmentIncome = () => {
  const user = useSelector((state) => state.user);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [treatAmount, setTreatAmount] = useState([]);
  const [keyword, setKeyword] = useState("");

  const getTreatmentAmt = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getTreatmentTotal/${user.branch}`
      );
      setTreatAmount(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentAmt();
  }, []);

  console.log(treatAmount);

  const filterForOpdList = treatAmount.filter((item) => {
    return item.dental_treatment !== "OPD";
  });

  console.log(filterForOpdList);

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const date = String(todayDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate.slice(0, 4));

  //********************************************************************************************************** */
  //filter for today's opd income
  const filterForOpdToday = treatAmount.filter((item) => {
    return (
      item.dental_treatment !== "OPD" &&
      item.appointment_dateTime?.split("T")[0] === formattedDate
    );
  });

  console.log(filterForOpdToday);

  console.log(filterForOpdToday);
  const totalOpdTodayPrice = () => {
    try {
      let total = 0;
      filterForOpdToday.forEach((item) => {
        let amt = item.net_amount;
        total = amt ? (total = total + parseFloat(item.net_amount)) : total;
        // total = total + parseFloat(item.net_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalOpdTodayValue = totalOpdTodayPrice();
  console.log(totalOpdTodayValue);
  //*********************************************************************************** */
  //********************************************************************************************************** */
  //filter for today's opd income

  const todayDateYes = new Date();
  todayDateYes.setDate(todayDateYes.getDate() - 1); // Subtract one day
  const yearYes = todayDateYes.getFullYear();
  const monthYes = String(todayDateYes.getMonth() + 1).padStart(2, "0");
  const dateYes = String(todayDateYes.getDate()).padStart(2, "0");
  const yesterdayDate = `${yearYes}-${monthYes}-${dateYes}`;

  console.log(yesterdayDate);

  const filterForOpdYesterday = treatAmount.filter((item) => {
    return (
      item.dental_treatment !== "OPD" &&
      item.appointment_dateTime?.split("T")[0] === yesterdayDate
    );
  });

  console.log(filterForOpdYesterday);
  const totalOpdYesterdayPrice = () => {
    try {
      let total = 0;
      filterForOpdYesterday.forEach((item) => {
        let amt = item.net_amount;
        total = amt ? (total = total + parseFloat(item.net_amount)) : total;
        // total = total + parseFloat(item.net_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalOpdYesterdayValue = totalOpdYesterdayPrice();
  console.log(totalOpdYesterdayValue);
  //*********************************************************************************** */

  //********************************************************************************************************** */
  //filter for monthly opd income
  const filterForOpdMonthly = treatAmount.filter((item) => {
    return (
      item.dental_treatment !== "OPD" &&
      item.appointment_dateTime?.split("T")[0].slice(0, 7) ===
        formattedDate.slice(0, 7)
    );
  });

  console.log(filterForOpdMonthly);
  const totalOpdMonthlyPrice = () => {
    try {
      let total = 0;
      filterForOpdMonthly.forEach((item) => {
        let amt = item.net_amount;
        total = amt ? (total = total + parseFloat(item.net_amount)) : total;

        // total = total + parseFloat(item.net_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalOpdMonthlyValue = totalOpdMonthlyPrice();
  console.log(totalOpdMonthlyValue);
  //*********************************************************************************** */

  //********************************************************************************************************** */
  //filter for monthly opd income
  const filterForOpdYearly = treatAmount.filter((item) => {
    return (
      item.dental_treatment !== "OPD" &&
      item.appointment_dateTime?.split("T")[0].slice(0, 4) ===
        formattedDate.slice(0, 4)
    );
  });

  console.log(filterForOpdYearly);
  const totalOpdYearlyPrice = () => {
    try {
      let total = 0;
      filterForOpdYearly.forEach((item) => {
        let amt = item.net_amount;
        total = amt ? (total = total + parseFloat(item.net_amount)) : total;
        // total = total + parseFloat(item.net_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalOpdYearlyValue = totalOpdYearlyPrice();
  console.log(totalOpdYearlyValue);
  //*********************************************************************************** */

  const [selectedData, setSelectedData] = useState(filterForOpdToday);

  const handleChangeSelect = (e) => {
    const { value } = e.target;
    if (value === "today") {
      setSelectedData(filterForOpdToday);
    } else if (value === "yesterday") {
      setSelectedData(filterForOpdYesterday);
    } else if (value === "monthly") {
      setSelectedData(filterForOpdMonthly);
    } else if (value === "yearly") {
      setSelectedData(filterForOpdYearly);
    }
  };
  useEffect(() => {
    const setData = () => {
      setSelectedData(filterForOpdToday);
    };
    setData();
  }, [treatAmount]);

  return (
    <>
      <Container>
        <BranchDetails />

        <div className="Heading mt-4 d-flex justify-content-center">
          <h2>TREATMENT INCOME</h2>
        </div>

        <div className="row d-flex justify-content-around mt-4">
          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column ">
                <div className="text-light fs-1">
                  <FaMoneyBill />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Today Income</h5>
                  <p className="card-text text-light fw-semibold">
                    {totalOpdTodayValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <SiMoneygram />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Yesterday Income</h5>
                  <p className="card-text text-light fw-semibold">
                    {totalOpdYesterdayValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <MdOutlineNextWeek />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Weekly Income</h5>
                  <p className="card-text text-light fw-semibold">2500</p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <GiMoneyStack />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Monthly Income</h5>
                  <p className="card-text text-light fw-semibold">
                    {totalOpdMonthlyValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
                <div>
                  <GiTakeMyMoney className="text-light fs-1" />
                </div>

                <div className="cardtext">
                  <h5 className="card-title text-light">Yearly Income</h5>
                  <p className="card-text text-light fw-semibold">
                    {totalOpdYearlyValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row flex-nowrap ">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-12 ps-0">
              <div className="container mt-5">
                {/* <h2 className="text-center">Treatment Payment</h2> */}
                <div className="container mt-5">
                  <div className="row mb-2">
                    <div className="d-flex justify-content-evenly align-items-center">
                      <div className="col-6">
                        <label>search by patient name :</label>
                        <input
                          type="text"
                          placeholder="search by patient name"
                          className="mx-3 p-1 rounded"
                          value={keyword}
                          onChange={(e) =>
                            setKeyword(e.target.value.toLowerCase())
                          }
                        />
                      </div>
                      <div className="col-6 Heading d-flex">
                        {/* <h2>Weekly Income</h2> */}
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <lable className="fs-5">Select Period :</lable>
                          </div>

                          <div className="mx-2">
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              // value={designation}
                              onChange={handleChangeSelect}
                            >
                              {/* <option value="">Select-period</option> */}
                              <option value="today" selected>
                                Today
                              </option>
                              <option value="yesterday">Yesterday</option>
                              <option value="monthly">Monthly</option>
                              <option value="yearly">Yearly</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive rounded">
                    <table class="table table-bordered rounded shadow">
                      <thead className="table-head">
                        <tr>
                          <th className="sticky">Appointment ID</th>
                          <th className="sticky">Appointment Date</th>
                          <th className="sticky">Patient UHID</th>
                          <th className="sticky">Patient Name</th>
                          <th className="sticky">Contact</th>
                          <th className="sticky">Doctor Name</th>
                          <th className="sticky">Doctor ID</th>
                          <th className="sticky">Treatment</th>
                          <th className="sticky">Treatment Fee</th>
                          {/* <th className="sticky">Payment Mode</th> */}
                          <th className="sticky">Payment Date</th>
                          <th className="sticky">Payment Status</th>
                          <th className="sticky">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedData
                          ?.filter((val) => {
                            const name = val.patient_name.toLowerCase();
                            const lowerKeyword = keyword.toLowerCase();
                            if (keyword === "") {
                              return true;
                            } else {
                              if (name.startsWith(lowerKeyword)) {
                                return true;
                              } else {
                                if (name.includes(lowerKeyword)) {
                                  return true;
                                }
                              }
                            }
                          })

                          .map((item) => (
                            <>
                              <tr className="table-row">
                                <td>{item.appoint_id}</td>
                                <td>
                                  {moment(item.appointment_dateTime).format(
                                    "YYYY-MM-DD h:mm A"
                                  )}
                                </td>
                                <td>{item.uhid}</td>
                                <td>{item.patient_name}</td>
                                <td>{item.mobileno}</td>
                                <td>{item.assigned_doctor_name}</td>
                                <td>{item.assigned_doctor_id}</td>
                                <td>{item.dental_treatment}</td>
                                <td>{item.net_amount}</td>
                                {/* <td>{item.payment_Mode}</td> */}
                                <td>{item.date.split("T")[0]}</td>
                                <td>{item.sitting_payment_status}</td>
                                <td>
                                  {item.payment_Status !== "Pending" &&
                                  item.payment_Status !== "" ? (
                                    <Link
                                      to={`/TreatmentBills/${item.appoint_id}/${item.uhid}`}
                                    >
                                      <button
                                        className="btn"
                                        style={{ backgroundColor: "#FFA600" }}
                                      >
                                        View Receipt
                                      </button>
                                    </Link>
                                  ) : (
                                    <span>
                                      <button
                                        className="btn btn-secondary disabled"
                                        disabled
                                      >
                                        View Receipt
                                      </button>
                                    </span>
                                  )}
                                </td>
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
      </Container>
    </>
  );
};

export default TreatmentIncome;

const Container = styled.div`
  .card {
    background: #201658;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: #9b59b6;
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

  .table-responsive {
    max-height: 30rem;
    overflow: auto;
  }

  th {
    background-color: #201658;
    color: #fff;
    font-weight: bold;
    position: sticky;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }

  .sticky {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1;
  }
`;
