import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Overview = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);

  const branch = user.currentUser.branch_name;
  const token = user.currentUser?.token;

  const [patAppointDetails, setPatAppointDetails] = useState([]);

  const [nextAppoint, setNextAppoint] = useState(null);
  const [prevAppoint, setPrevAppoint] = useState(null);
  const [sortedAppointments, setSortedAppointments] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [bills, setBills] = useState([]);
  const [examinations, setExaminations] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  console.log(treatments);

  const getTreatmentsDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getTreatmentViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTreatments(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPrescriptionDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getPrescriptionViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPrescriptions(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getBillsViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBills(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getExaminationDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getExaminationViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExaminations(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointDetailsPat = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getAllAppointmentByPatientId/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setPatAppointDetails(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(pid);
  useEffect(() => {
    getAppointDetailsPat();
    getTreatmentsDetails();
    getBillDetails();
    getExaminationDetails();
    getPrescriptionDetails();
  }, []);

  const filterForPendingAmount = bills?.filter((item) => {
    return item.payment_status === "Pending";
  });
  const total = filterForPendingAmount?.reduce((accumulator, item) => {
    return accumulator + item.total_amount;
  }, 0);

  const todayDate = new Date();

  console.log(total);

  useEffect(() => {
    // Sort appointments by date
    const sortedAppointments = patAppointDetails.sort((a, b) => {
      return (
        new Date(a.appointment_dateTime) - new Date(b.appointment_dateTime)
      );
    });
    setSortedAppointments(sortedAppointments);
    // Find last and next appointment
    let prevAppointment = null;
    let nextAppointment = null;
    for (let i = 0; i < sortedAppointments?.length; i++) {
      const appointmentDate = new Date(
        sortedAppointments[i].appointment_dateTime
      );
      if (appointmentDate < todayDate) {
        prevAppointment = sortedAppointments[i];
      } else if (appointmentDate >= todayDate && !nextAppointment) {
        nextAppointment = sortedAppointments[i];
        break;
      }
    }

    console.log(sortedAppointments);
    console.log("Next Appointment:", nextAppointment);

    const nextAppointDate = nextAppointment
      ? moment(
          nextAppointment?.appointment_dateTime,
          "YYYY-MM-DDTHH:mm"
        ).format("DD/MM/YYYY hh:mm A")
      : null;
    const prevAppointDate = prevAppointment
      ? moment(
          prevAppointment?.appointment_dateTime,
          "YYYY-MM-DDTHH:mm"
        ).format("DD/MM/YYYY hh:mm A")
      : null;

    // Set state variables for next and previous appointments
    setNextAppoint(nextAppointDate);
    setPrevAppoint(prevAppointDate);
  }, [patAppointDetails]);

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-4" id="tableresponsive1">
            <div className="d-flex justify-content-center align-item-center mt-2 h-100 w-100 shadow rounded">
              <div className="mt-3">
                <p className="text-center">Last Appointment</p>
                <h5>{prevAppoint}</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-4" id="tableresponsive1">
            {" "}
            <div className="d-flex justify-content-center align-item-center mt-2 h-100 w-100 shadow rounded">
              <div className="mt-3">
                <p className="text-center">Next Appointment</p>
                <h5>{nextAppoint}</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-4" id="tableresponsive1">
            {" "}
            <div className="d-flex justify-content-center align-item-center mt-2 h-100 w-100 shadow rounded">
              <div className="mt-3">
                <p className="text-center">Payment Pending</p>
                <h5 className="text-center">INR {total}</h5>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-8" id="tableresponsive">
              <div className="table-responsive">
                <h5>Appointments</h5>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th >Doctor Name</th>
                      <th>Treatment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAppointments?.slice(-3)?.map((item) => (
                      <>
                        <tr>
                          <td>
                            {moment(
                              item?.appointment_dateTime,
                              "YYYY-MM-DDTHH:mm"
                            ).format("DD/MM/YYYY hh:mm A")}
                          </td>
                          <td className="text-capitalize">
                            {"Dr. "}
                            {item.assigned_doctor_name}
                          </td>
                          <td>{item.treatment_provided}</td>
                          <td className="text-capitalize">{item.appointment_status}</td>
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
                      {/* <th>Date & Time</th> */}
                      <th>TPID</th>
                      <th>Disease</th>
                      <th>Treatment</th>
                      <th>Total Sitting</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatments?.slice(-3)?.map((item) => (
                      <tr>
                        {/* <td>{moment(item?.appointment_dateTime, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY hh:mm A')}</td> */}
                        <td>{item.tp_id}</td>
                        <td>{item.desease}</td>
                        <td>{item.treatment_name}</td>
                        <td>{item.total_sitting}</td>
                        <td className="text-capitalize">{item.treatment_status}</td>
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
                      <th>Direct Paid Amount</th>
                      <th>Pay by Security Amount</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills?.slice(-3)?.map((item) => (
                      <>
                        <tr>
                          <td>
                            {item?.bill_date
                              ? moment(
                                  item?.bill_date,
                                  "DD-MM-YYYYTHH:mm:ss"
                                ).format("DD/MM/YYYY hh:mm A")
                              : ""}
                          </td>
                          <td>{item.total_amount}</td>
                          <td>{item.paid_amount}</td>
                          <td>{item.pay_by_sec_amt}</td>
                          <td className="text-capitalize">{item.payment_status}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-responsive">
                <h5>Clinical Examine</h5>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Disease</th>
                      <th>Chief Complaint</th>
                      <th>Tooth</th>
                      <th>Diagnosis</th>
                      <th>On Examination</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examinations?.slice(-3)?.map((item) => (
                      <>
                        <tr>
                          <td>
                            {item?.date
                              ? moment(
                                  item?.date,
                                  "DD-MM-YYYYTHH:mm:ss"
                                ).format("DD/MM/YYYY hh:mm A")
                              : ""}
                          </td>
                          <td>{item.disease}</td>
                          <td>{item.chief_complain}</td>

                          <td>{item.selected_teeth}</td>
                          <td>{item.diagnosis_category}</td>
                          <td>{item.on_examination}</td>
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
                      <th>Treatment</th>
                      <th>Medicine Name</th>
                      <th>Duration</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions?.slice(-6)?.map((item) => (
                      <>
                        <tr>
                          <td>
                            {item?.date
                              ? moment(
                                  item?.date,
                                  "DD-MM-YYYYTHH:mm:ss"
                                ).format("DD/MM/YYYY hh:mm A")
                              : ""}
                          </td>
                          <td>{item.treatment}</td>
                          <td>{item.medicine_name}</td>
                          <td>{item.duration}</td>
                          <td>{item.note}</td>
                        </tr>
                      </>
                    ))}
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
                  {sortedAppointments?.slice(-3)?.map((item) => (
                    <>
                      {item.notes && (
                        <tr>
                          <td>{item.notes}</td>
                        </tr>
                      )}
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
      width: 95%;
    }
  }
  #tableresponsive1 {
    @media screen and (max-width: 768px) {
      width: 95%;
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
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
