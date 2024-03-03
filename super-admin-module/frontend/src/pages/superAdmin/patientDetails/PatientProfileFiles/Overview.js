import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Overview = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [patPendingBill, setPatPendingBill] = useState([]);
  const [patAppointDetails, setPatAppointDetails] = useState([]);
  const [exmData, setExmData] = useState([]);

  const getPendingBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getPatientBillByBranchAndId/${pid}`
      );
      console.log(data);
      setPatPendingBill(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointDetailsPat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getAppointmentByBranchAndId/${pid}`
      );
      console.log(data);
      setPatAppointDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getExamineDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/examinDetailsByPatId/${pid}`
      );
      setExmData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(pid);
  useEffect(() => {
    getPendingBillDetails();
    getAppointDetailsPat();
  }, []);

  useEffect(() => {
    getExamineDetails();
  }, []);

  console.log(patPendingBill);
  console.log(patAppointDetails);
  const filterForPendingAmount = patPendingBill?.filter((item) => {
    return item.payment_status === "Pending";
  });
  const total = filterForPendingAmount?.reduce((accumulator, item) => {
    return accumulator + item.total_amount;
  }, 0);

  console.log(total);
  console.log(filterForPendingAmount);

  const todayDate = new Date();

  // Get year, month, and date
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate);

  const filterForPrevAndNextAppointment = patAppointDetails?.reduce(
    (acc, item) => {
      if (item.apointment_date_time?.split("T")[0] < formattedDate) {
        acc.prevAppointment = item;
      } else if (item.apointment_date_time?.split("T")[0] >= formattedDate) {
        acc.nextAppointment = item;
      }
      return acc;
    },

    { prevAppointment: null, nextAppointment: null }
  );

  console.log(
    "Previous Appointment:",
    filterForPrevAndNextAppointment.prevAppointment
  );
  console.log(
    "Next Appointment:",
    filterForPrevAndNextAppointment.nextAppointment?.apointment_date_time
  );

  const nextAppoint =
    filterForPrevAndNextAppointment.nextAppointment?.apointment_date_time?.split(
      "T"
    )[0];

  const prevAppoint =
    filterForPrevAndNextAppointment.prevAppointment?.apointment_date_time?.split(
      "T"
    )[0];

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-4" id="tableresponsive1">
            <div className="d-flex justify-content-center align-item-center mt-2 h-100 w-100 shadow rounded">
              <div className="mt-3">
                <h5>{prevAppoint}</h5>
                <p>Last Appointment</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4" id="tableresponsive1">
            {" "}
            <div className="d-flex justify-content-center align-item-center mt-2 h-100 w-100 shadow rounded">
              <div className="mt-3">
                <h5>{nextAppoint}</h5>
                <p>Next Appointment</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4" id="tableresponsive1">
            {" "}
            <div className="d-flex justify-content-center align-item-center mt-2 h-100 w-100 shadow rounded">
              <div className="mt-3">
                <h5>INR {total}</h5>
                <p>Payment Pending</p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-8" id="tableresponsive">
              <div className="table-responsive">
                <h5>Appointment</h5>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Doctor Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patAppointDetails?.slice(-3).map((item) => (
                      <>
                        <tr>
                          <td>{item.apointment_date_time?.split("T")[0]}</td>
                          <td>{item.assigned_doctor}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>{" "}
              </div>
              <div className="table-responsive">
                <h5>Treatment</h5>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Treatment</th>
                      <th>Doctor Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patAppointDetails?.slice(-3).map((item) => (
                      <tr>
                        <td>{item.apointment_date_time?.split("T")[0]}</td>
                        <td>{item.treatment_provided}</td>
                        <td>{item.assigned_doctor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-responsive">
                <h5>Bill</h5>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Bill Amount</th>
                      <th>Treatment</th>
                      <th>Doctor Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patPendingBill?.slice(-3).map((item) => (
                      <>
                        <tr>
                          <td>{item.bill_date.split("T")[0]}</td>
                          <td>{item.total_amount}</td>
                          <td>{item.treatment}</td>
                          <td>{item.assigned_doctor}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-responsive">
                <h5>Clinical Examin</h5>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Issue</th>
                      <th>Investigation</th>
                      <th>Tooth</th>
                      <th>Diagnosis</th>
                      <th>Doctor Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exmData?.slice(-3).map((item) => (
                      <>
                        <tr>
                          <td>{item.examin_date?.split("T")[0]}</td>
                          <td>{item.examin_issue}</td>
                          <td>{item.examin_investigation}</td>

                          <td>{item.tooth}</td>
                          <td>{item.diagnosis}</td>
                          <td>{item.doctor_name}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-responsive">
                <h5>Prescription</h5>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Durg</th>
                      <th>Doctor Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>25 April 2023</td>
                      <td>Aceterminophen</td>

                      <td>Dr.Umer Qureshi</td>
                    </tr>
                    <tr>
                      <td>25 April 2023</td>
                      <td>Aceterminophen</td>

                      <td>Dr.Umer Qureshi</td>
                    </tr>
                    <tr>
                      <td>25 April 2023</td>
                      <td>Aceterminophen</td>

                      <td>Dr.Umer Qureshi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-4" id="tableresponsive">
              {/* <h5>Patient Notes</h5>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tooth Decay BY-Dr.Umer Qureshi</td>
                  </tr>
                </tbody>
              </table> */}
              <h5>Medical History Note</h5>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {patAppointDetails?.map((item) => (
                    <>
                      <tr>
                        <td>{item.treatment_provided}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Overview;
const Container = styled.div`
  #tableresponsive {
    @media screen and (max-width: 768px) {
      width: 73%;
    }
  }
  #tableresponsive1 {
    @media screen and (max-width: 768px) {
      width: 70%;
    }
  }
  #myTab {
    @media screen and (max-width: 768px) {
      width: 90%;
      margin-left: 1.2rem;
    }
  }
  #app {
    width: 65rem;
  }
`;
