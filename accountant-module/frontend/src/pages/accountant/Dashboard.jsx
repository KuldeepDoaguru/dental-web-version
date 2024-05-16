import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ExpenseChart from "../../components/Accountant/charts/ExpenseChart";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import Cards from "../../components/Accountant/Cards";
import Detail from "../../components/Bill/Details";
import Editbill from "../../components/Bill/Editbill";
import Makepayment from "../../components/Bill/Makepayment";
import BranchDetails from "../../components/BranchDetails";
import MonthIncome from "../../components/Accountant/charts/MonthIncome";
import PurchaseChart from "../../components/Accountant/charts/PurchaseChart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Accountant_Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(`user ${user}`);
  console.log("User State:", user);
  const [billList, setBillList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const token = user.token;
  console.log(token);

  const getTodaysBill = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getBillsByBranch/${user.branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBillList(data);
    } catch (error) {
      console.log(error);
    }
  };

  //filter for patient treated today card
  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = String(getDate.getMonth() + 1).padStart(2, "0");
  const day = String(getDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  console.log(billList[0]?.bill_date);
  const filterForBillToday = billList?.filter(
    (item) => item.bill_date.split("T")[0] === formattedDate
  );

  console.log(filterForBillToday);

  const getAppointList = async () => {
    try {
      const response = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getAppointmentData/${user.branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setAppointmentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterForAppointmentToday = appointmentList?.filter(
    (item) => item.appointment_dateTime.split("T")[0] === formattedDate
  );

  console.log(filterForAppointmentToday);

  useEffect(() => {
    getTodaysBill();
    getAppointList();
  }, []);

  return (
    <Wrapper>
      <Header />
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-nowrap ">
            {/* <div className="col-lg-1  p-0"> */}
            <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
              <Sider />
            </div>
            {/* <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11"> */}
            <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
              <BranchDetails />
              <div className="mt-4">
                <Cards />
              </div>

              <div className="container-fuild px-2">
                <div className="row g-4 mt-3 ">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <h3 className="text-center">Monthly Earning</h3>
                    <MonthIncome />
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <h3 className="text-center">Monthly Expenses</h3>
                    <ExpenseChart />
                  </div>

                  {/* <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <h3 className="text-center">Monthly Purchase</h3>
                    <PurchaseChart />
                  </div> */}
                </div>
              </div>
              <div className="">
                <div
                  className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
                  id="tableres"
                >
                  <div className="table-responsive" id="table">
                    <h5>Todays Bill </h5>
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Bill Id</th>
                          <th>Bill Date</th>
                          <th>Patient UHID</th>
                          <th>Patient Name</th>
                          <th>Patient Mobile</th>
                          <th>Patient Email</th>
                          <th>Assigned Doctor</th>
                          <th>Treatment</th>
                          <th>Treatment Status</th>
                          <th>Total Paid</th>
                          <th>Paid Amount</th>
                          <th>Payment Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterForBillToday?.map((item) => (
                          <>
                            <tr>
                              <td>{item.bill_id}</td>
                              <td>{item.bill_date?.split("T")[0]}</td>
                              <td>{item.uhid}</td>
                              <td>{item.patient_name}</td>
                              <td>{item.patient_mobile}</td>
                              <td>{item.patient_email}</td>
                              <td>{item.assigned_doctor}</td>
                              <td>{item.treatment}</td>
                              <td>{item.treatment_status}</td>
                              <td>{item.net_amount}</td>
                              <td>{item.paid_amount}</td>
                              <td>{item.payment_status}</td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="">
                <div
                  className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
                  id="tableres"
                >
                  <div className="table-responsive" id="table">
                    <h5>Todays Appointment</h5>
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th className="table-sno">Appointment ID</th>
                          <th>Patient UHID</th>

                          <th className="table-small">Patient Name</th>
                          <th className="table-small">Contact Number</th>
                          <th className="table-small">Assigned Doctor</th>

                          <th className="table-small">Appointed by</th>
                          <th className="table-small">Updated by</th>
                          <th className="table-small">
                            Appointment Date & Time
                          </th>
                          <th className="table-small">Appointment Status</th>
                          <th>Cancel Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterForAppointmentToday?.map((item) => (
                          <>
                            <tr className="table-row">
                              <td className="table-sno">{item.appoint_id}</td>
                              <td className="table-small">
                                {item.patient_uhid}
                              </td>
                              <td>{item.patient_name}</td>
                              <td className="table-small">{item.mobileno}</td>
                              <td className="table-small">
                                {item.assigned_doctor_name}
                              </td>

                              <td className="table-small">
                                {item.appointment_created_by}
                              </td>
                              <td className="table-small">
                                {item.updated_by ? item.updated_by : "-"}
                              </td>
                              <td className="table-small">
                                {item.appointment_dateTime?.split("T")[0]}{" "}
                                {item.appointment_dateTime?.split("T")[1]}
                              </td>
                              <td>{item.appointment_status}</td>
                              <td>{item.cancel_reason}</td>
                              {/* <td className="table-small">
                                    <button
                                      className="btn btn-warning"
                                      onClick={() =>
                                        openUpdatePopup(item.appoint_id)
                                      }
                                    >
                                      Edit
                                    </button>
                                  </td>
                                  <td className="table-small">
                                    <button
                                      className="btn btn-danger"
                                      onClick={() =>
                                        deleteAppointment(item.appoint_id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </td> */}
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
    </Wrapper>
  );
};

export default Accountant_Dashboard;

const Wrapper = styled.div`
  .main {
    height: 100%;
    background-color: #e6ecf1;
  }
  .chart {
    background-color: white;
    border-radius: 5px;
  }
  #hd {
    height: 44rem;

    @media screen and (max-width: 768px) {
      height: 68rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      height: 58rem;
    }
  }

  .clinic-act-heading {
    display: flex;
    justify-content: space-between;
  }
  th {
    background-color: #201658;
    color: white;
  }
`;
