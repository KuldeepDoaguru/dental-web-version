import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PiStethoscopeBold } from "react-icons/pi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { LiaXRaySolid } from "react-icons/lia";
// import { GiMicroscope } from "react-icons/gi";
// import { GiMedicines } from "react-icons/gi";
import BranchDetails from "../components/BranchDetails";
import Header from "../components/Header";
import Sider from "../components/Sider";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

const TotalIncome = () => {
  const user = useSelector((state) => state.user);
  console.log("User State:", user);
  const [designation, setDesignation] = useState("");
  const [treatAmount, setTreatAmount] = useState([]);
  const [opdAmount, setOpdAmount] = useState([]);
  // const [keyword, setkeyword] = useState("");

  const getTreatmentAmt = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getTreatmentTotal/${user.branch}`
      );
      console.log(data.results);
      setTreatAmount(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getOpdAmt = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getAppointmentData/${user.branch}`
      );
      console.log(data);
      setOpdAmount(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentAmt();
    getOpdAmt();
  }, []);

  // --------------------- ======== Total Income Treatments Start Here =========--------------------
  // console.log(`treatment ${treatAmount}`);
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

  // Filter for this week's Treatment data
  const startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
  const endOfWeek = moment().endOf("week").format("YYYY-MM-DD");
  const filterForOpdThisWeek = treatAmount.filter((item) => {
    const appointmentDate = moment(item.appointment_dateTime).format(
      "YYYY-MM-DD"
    );
    return (
      item.dental_treatment !== "OPD" &&
      moment(appointmentDate).isBetween(startOfWeek, endOfWeek, null, "[]")
    );
  });

  const totalOpdThisWeekPrice = () => {
    try {
      let total = 0;
      filterForOpdThisWeek.forEach((item) => {
        let amt = item.net_amount;
        total = amt ? (total = total + parseFloat(item.net_amount)) : total;
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalOpdThisWeekValue = totalOpdThisWeekPrice();
  console.log(totalOpdThisWeekValue);

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

  // --------------------- ======== Total Income OPD Start Here =========--------------------
  console.log(opdAmount);
  const filterOpdList = opdAmount?.filter((item) => {
    return item.treatment_provided === "OPD";
  });

  console.log(filterOpdList);

  const opdtodayDate = new Date();
  const opdyear = opdtodayDate.getFullYear();
  const opdmonth = String(opdtodayDate.getMonth() + 1).padStart(2, "0");
  const opddate = String(opdtodayDate.getDate()).padStart(2, "0");
  const opdformattedDate = `${opdyear}-${opdmonth}-${opddate}`;

  console.log(opdformattedDate.slice(0, 4));

  //********************************************************************************************************** */

  //filter for today's opd income
  const filterOpdToday = opdAmount.filter((item) => {
    return (
      item.treatment_provided === "OPD" &&
      item.payment_Status === "paid" &&
      item.appointment_dateTime?.split("T")[0] === formattedDate
    );
  });

  console.log(filterOpdToday);
  const opdtotalOpdTodayPrice = () => {
    try {
      let total = 0;
      filterOpdToday.forEach((item) => {
        total = total + parseFloat(item.opd_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const opdtotalOpdTodayValue = opdtotalOpdTodayPrice();
  console.log(opdtotalOpdTodayValue);

  // Filter for this week's opd data
  const opdstartOfWeek = moment().startOf("week").format("YYYY-MM-DD");
  const opdendOfWeek = moment().endOf("week").format("YYYY-MM-DD");
  const opdfilterForOpdThisWeek = opdAmount.filter((item) => {
    const appointmentDate = moment(item.appointment_dateTime).format(
      "YYYY-MM-DD"
    );
    return (
      item.treatment_provided === "OPD" &&
      moment(appointmentDate).isBetween(
        opdstartOfWeek,
        opdendOfWeek,
        null,
        "[]"
      )
    );
  });

  const opdtotalOpdThisWeekPrice = () => {
    try {
      let total = 0;
      opdfilterForOpdThisWeek.forEach((item) => {
        let amt = item.opd_amount;
        total = amt ? (total = total + parseFloat(item.opd_amount)) : total;
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const opdtotalOpdThisWeekValue = opdtotalOpdThisWeekPrice();
  console.log(opdtotalOpdThisWeekValue);

  //filter for monthly opd income
  const filterOpdMonthly = opdAmount.filter((item) => {
    return (
      item.treatment_provided === "OPD" &&
      item.payment_Status === "paid" &&
      item.appointment_dateTime?.split("T")[0].slice(0, 7) ===
        opdformattedDate.slice(0, 7)
    );
  });

  console.log(filterOpdMonthly);
  const opdtotalOpdMonthlyPrice = () => {
    try {
      let total = 0;
      filterOpdMonthly.forEach((item) => {
        total = total + parseFloat(item.opd_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const opdtotalOpdMonthlyValue = opdtotalOpdMonthlyPrice();
  console.log(opdtotalOpdMonthlyValue);
  //*********************************************************************************** */

  //********************************************************************************************************** */
  //filter for monthly opd income
  const filterOpdYearly = opdAmount.filter((item) => {
    return (
      item.treatment_provided === "OPD" &&
      item.payment_Status === "paid" &&
      item.appointment_dateTime?.split("T")[0].slice(0, 4) ===
        opdformattedDate.slice(0, 4)
    );
  });

  console.log(filterOpdYearly);
  const opdtotalOpdYearlyPrice = () => {
    try {
      let total = 0;
      filterOpdYearly.forEach((item) => {
        total = total + parseFloat(item.opd_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const opdtotalOpdYearlyValue = opdtotalOpdYearlyPrice();
  console.log(opdtotalOpdYearlyValue);

  const [selectedData, setSelectedData] = useState(totalOpdTodayValue);
  const [opdselectedData, setOpdSelectedData] = useState(opdtotalOpdTodayValue);

  const handleChangeSelect = (e) => {
    const { value } = e.target;
    if (value === "today") {
      setSelectedData(totalOpdTodayValue);
      setOpdSelectedData(opdtotalOpdTodayValue);
    } else if (value === "weekly") {
      setSelectedData(totalOpdThisWeekValue);
      setOpdSelectedData(opdtotalOpdThisWeekValue);
    } else if (value === "monthly") {
      setSelectedData(totalOpdMonthlyValue);
      setOpdSelectedData(opdtotalOpdMonthlyValue);
    } else if (value === "yearly") {
      setSelectedData(totalOpdYearlyValue);
      setOpdSelectedData(opdtotalOpdYearlyValue);
    }
  };

  useEffect(() => {
    const setData = () => {
      setSelectedData(totalOpdTodayValue);
      setOpdSelectedData(opdtotalOpdTodayValue);
    };
    setData();
  }, [treatAmount, opdAmount]);

  const totalAmount = () => {
    let finalTotal = opdselectedData + selectedData;
    return finalTotal;
  };

  useEffect(() => {
    totalAmount();
  }, [opdselectedData, selectedData]);

  const finalAmount = totalAmount();

  console.log(selectedData);
  console.log(opdselectedData);

  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>

              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <BranchDetails />
                <div className="container Heading mt-4 d-flex justify-content-start">
                  {/* <h2>Weekly Income</h2> */}
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>Select Period :</h4>
                    </div>

                    <div className="mx-2">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        // value={designation}
                        onChange={handleChangeSelect}
                      >
                        {/* <option value="">Select-period</option> */}
                        <option value="today">Today</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-around mt-5">
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-8 col-8 col-md-4 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <PiStethoscopeBold />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">OPD Income</h5>
                          <p className="card-text text-light fw-semibold">
                            {opdselectedData}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-8 col-8 col-md-4 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <MdOutlineHealthAndSafety />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Treatment Income
                          </h5>
                          <p className="card-text text-light fw-semibold">
                            {selectedData}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-8 col-8 col-md-4 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <LiaXRaySolid />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Total Income
                          </h5>
                          <p className="card-text text-light fw-semibold">
                            {finalAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <GiMicroscope />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Pathology Income
                          </h5>
                          <p className="card-text text-light fw-semibold">
                            8000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-8 col-8 col-md-4 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <GiMedicines />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Pharmacy Income
                          </h5>
                          <p className="card-text text-light fw-semibold">
                            40000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* <div className="container">
                  <div class="table-responsive mt-4">
                    <table class="table table-bordered">
                      <thead className="table-head">
                        <tr>
                          <th>Date</th>
                          <th>OPD Income</th>
                          <th>Treatment Income</th>
                          <th>Radiology Income</th>
                          <th>Pathology Income</th>
                          <th>Pharmacy Income</th>
                          <th>Total Income</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-row">
                          <td>07/04/2024</td>
                          <td>28000</td>
                          <td>350000</td>
                          <td>42000</td>
                          <td>64000</td>
                          <td>280000</td>
                          <td>872000</td>
                        </tr>
                        <tr className="table-row">
                          <td>14/04/2024</td>
                          <td>28000</td>
                          <td>350000</td>
                          <td>42000</td>
                          <td>64000</td>
                          <td>280000</td>
                          <td>872000</td>
                        </tr>
                        <tr className="table-row">
                          <td>21/04/2024</td>
                          <td>28000</td>
                          <td>350000</td>
                          <td>42000</td>
                          <td>64000</td>
                          <td>280000</td>
                          <td>872000</td>
                        </tr>
                        <tr className="table-row">
                          <td>28/04/2024</td>
                          <td>28000</td>
                          <td>350000</td>
                          <td>42000</td>
                          <td>64000</td>
                          <td>280000</td>
                          <td>872000</td>
                        </tr>
                        <tr className="table-row">
                          <td>30/04/2024</td>
                          <td>8000</td>
                          <td>100000</td>
                          <td>12000</td>
                          <td>16000</td>
                          <td>80000</td>
                          <td>216000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TotalIncome;

const Container = styled.div`
  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
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
`;
