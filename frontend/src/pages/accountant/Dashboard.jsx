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
import animationData from "../../pages/loading-effect.json";
import Lottie from "react-lottie";

const Accountant_Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const token = user.token;
  console.log(token);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [billList, setBillList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);

  const getTodaysBill = async () => {
    setLoading(true);
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
      setLoading(false);
      setBillList(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(billList);

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
    setLoading(true);
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
      setLoading(false);
      console.log(response);
      setAppointmentList(response.data);
    } catch (error) {
      setLoading(false);
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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
                  <h5>Todays Bill </h5>
                  <div className="table-responsive" id="table">
                    {/* {loading ? (
                      <Lottie
                        options={defaultOptions}
                        height={300}
                        width={400}
                      ></Lottie>
                    ) : (
                      <>
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th className="sticky">Bill Id</th>
                              <th className="sticky">Bill Date</th>
                              <th className="sticky">Patient UHID</th>
                              <th className="sticky">Patient Name</th>
                              <th className="sticky">Patient Mobile</th>
                              <th className="sticky">Patient Email</th>
                              <th className="sticky">Assigned Doctor</th>
                              <th className="sticky">Total Amount</th>
                              <th className="sticky">Paid Amount</th>
                              <th className="sticky">Payment Mode</th>
                              <th className="sticky">Transaction ID</th>
                              <th className="sticky">Payment Status</th>
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
                                  <td>{item.assigned_doctor_name}</td>
                                  <td>{item.total_amount}</td>
                                  <td>{item.paid_amount}</td>
                                  <td>{item.payment_mode}</td>
                                  <td>{item.transaction_Id}</td>
                                  <td>{item.payment_status}</td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )} */}
                    {loading ? (
                      <Lottie
                        options={defaultOptions}
                        height={300}
                        width={400}
                      />
                    ) : (
                      <>
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th className="sticky">Bill Id</th>
                              <th className="sticky">Bill Date</th>
                              <th className="sticky">Patient UHID</th>
                              <th className="sticky">Patient Name</th>
                              <th className="sticky">Patient Mobile</th>
                              <th className="sticky">Patient Email</th>
                              <th className="sticky">Assigned Doctor</th>
                              <th className="sticky">Total Amount</th>
                              <th className="sticky">Paid Amount</th>
                              <th className="sticky">Payment Mode</th>
                              <th className="sticky">Transaction ID</th>
                              <th className="sticky">Payment Status</th>
                            </tr>
                          </thead>
                          {filterForBillToday?.length === 0 ? (
                            <div className="nodata">
                              <p> No data found</p>
                            </div>
                          ) : (
                            <tbody>
                              {filterForBillToday?.map((item) => (
                                <tr key={item.bill_id}>
                                  <td>{item.bill_id}</td>
                                  <td>{item.bill_date?.split("T")[0]}</td>
                                  <td>{item.uhid}</td>
                                  <td>{item.patient_name}</td>
                                  <td>{item.patient_mobile}</td>
                                  <td>{item.patient_email}</td>
                                  <td>{item.assigned_doctor_name}</td>
                                  <td>{item.total_amount}</td>
                                  <td>{item.paid_amount}</td>
                                  <td>{item.payment_mode}</td>
                                  <td>{item.transaction_Id}</td>
                                  <td>{item.payment_status}</td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                        </table>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="">
                <div
                  className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
                  id="tableres"
                >
                  <h5>Todays Appointment</h5>
                  <div className="table-responsive" id="table">
                    {loading ? (
                      <Lottie
                        options={defaultOptions}
                        height={300}
                        width={400}
                      />
                    ) : (
                      <>
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th className="table-sno sticky">
                                Appointment ID
                              </th>
                              <th className="table-small sticky">
                                Patient UHID
                              </th>

                              <th className="table-small sticky">
                                Patient Name
                              </th>
                              <th className="table-small sticky">
                                Contact Number
                              </th>
                              <th className="table-small sticky">
                                Assigned Doctor
                              </th>

                              <th className="table-small sticky">
                                Appointed by
                              </th>
                              <th className="table-small sticky">Updated by</th>
                              <th className="table-small sticky">
                                Appointment Date & Time
                              </th>
                              <th className="table-small sticky">
                                Appointment Status
                              </th>
                              <th className="table-small sticky">
                                Cancel Reason
                              </th>
                            </tr>
                          </thead>
                          {filterForBillToday?.length === 0 ? (
                            <div className="nodata">
                              <p> No data found</p>
                            </div>
                          ) : (
                            <tbody>
                              {filterForAppointmentToday?.map((item) => (
                                <>
                                  <tr className="table-row">
                                    <td className="table-sno">
                                      {item.appoint_id}
                                    </td>
                                    <td className="table-small">
                                      {item.patient_uhid}
                                    </td>
                                    <td>{item.patient_name}</td>
                                    <td className="table-small">
                                      {item.mobileno}
                                    </td>
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
                          )}
                        </table>
                      </>
                    )}
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
  .table-responsive {
    height: 22rem;
    overflow: auto;
    position: relative;
  }
  th {
    background-color: #201658;
    color: white;
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
  .nodata {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #333;
    position: absolute;
    top: 0;
    left: 0;
    height: 150px;
    width: 100%;
    margin-top: 1rem;
  }
`;
