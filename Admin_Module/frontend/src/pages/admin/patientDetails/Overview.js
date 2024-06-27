import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Overview = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  // const { uhid } = useParams();
  // console.log(uhid);
  const user = useSelector((state) => state.user.currentUser);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = user.branch_name;

  const [patPendingBill, setPatPendingBill] = useState([]);
  const [patAppointDetails, setPatAppointDetails] = useState([]);

  const [presData, setPresData] = useState([]);
  const [nextAppoint, setNextAppoint] = useState(null);
  const [prevAppoint, setPrevAppoint] = useState(null);
  const [sortedAppointments, setSortedAppointments] = useState([]);

  const [clinicExam, setClinicExam] = useState([]);
  const [treatData, setTreatData] = useState([]);
  const [prescpData, setPrescpData] = useState([]);
  const [billData, setBillData] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  console.log(treatData);
  console.log(prescpData);
  console.log(billData);

  const getPresDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getPrescriptionDetailsById/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPresData(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const getPendingBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/v1/super-admin/getPatientBillByBranchAndId/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(data);
      setPatPendingBill(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const getAppointDetailsPat = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getAppointmentByBranchAndId/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(data);
      setPatAppointDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(patAppointDetails);
  const getExamineDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/examinDetailsByPatId/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // setExmData(data);
    } catch (error) {
      // console.log(error);
    }
  };

  console.log(pid);
  useEffect(() => {
    getPendingBillDetails();
    getAppointDetailsPat();
    getPresDetails();
  }, []);

  useEffect(() => {
    getExamineDetails();
  }, []);

  const todayDate = new Date();

  useEffect(() => {
    // Sort appointments by date
    const sortedAppointments = patAppointDetails?.sort((a, b) => {
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

    // console.log("Previous Appointment:", prevAppointment);
    // console.log("Next Appointment:", nextAppointment);

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

  const fetchLatestDentalPatientData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getExaminationViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data); // Assuming your API returns the data directly
      setClinicExam(data);
    } catch (error) {
      console.error("Error fetching dental patient data:", error);
    }
  };

  console.log(clinicExam);
  useEffect(() => {
    fetchLatestDentalPatientData();
  }, []);

  const fetchLatestTreatPatientData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getTreatmentViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setTreatData(data);
    } catch (error) {
      console.error("Error fetching dental patient data:", error);
    }
  };

  useEffect(() => {
    fetchLatestTreatPatientData();
  }, []);

  const fetchLatestPrescriptionPatientData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getPrescriptionViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data); // Assuming your API returns the data directly
      setPrescpData(data);
    } catch (error) {
      console.error("Error fetching dental patient data:", error);
    }
  };

  useEffect(() => {
    fetchLatestPrescriptionPatientData();
  }, []);

  const fetchLatestBillPatientData = async () => {
    try {
      const response = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/get-patientBill-data/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data); // Assuming your API returns the data directly
      setBillData(response.data);
    } catch (error) {
      console.error("Error fetching dental patient Bill data:", error);
    }
  };

  console.log(billData);

  const filterForPendingAmount = billData?.filter((item) => {
    return item.payment_status !== "Paid";
  });
  const total = filterForPendingAmount?.reduce((accumulator, item) => {
    return (
      accumulator + item.total_amount - (item.pay_by_sec_amt + item.paid_amount)
    );
  }, 0);

  console.log(total);

  useEffect(() => {
    fetchLatestBillPatientData();
  }, []);

  const onGoingTreat = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/onGoingTreat/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data);
      setOngoing(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGoingTreat();
  }, []);

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
                      <th>Doctor Name</th>
                      <th>Treatment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAppointments?.slice(-3).map((item) => (
                      <>
                        <tr>
                          <td>
                            {moment(
                              item?.appointment_dateTime,
                              "YYYY-MM-DDTHH:mm"
                            ).format("DD/MM/YYYY hh:mm A")}
                          </td>
                          <td>{item.assigned_doctor_name}</td>
                          <td>{item.treatment_provided}</td>
                          <td>{item.appointment_status}</td>
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
                      <th>TPID</th>
                      <th>Disease</th>
                      <th>Treatment</th>
                      <th>Total Sitting</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatData.length >= 0 ? (
                      <>
                        {treatData?.slice(0, 3).map((item) => (
                          <>
                            <tr>
                              <td>{item.tp_id}</td>
                              <td>{item.desease}</td>
                              <td>{item.treatment_name}</td>
                              <td>{item.total_sitting}</td>
                              <td>{item.treatment_status}</td>
                            </tr>
                          </>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan="4">No Treatment data available</td>
                      </tr>
                    )}
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
                      <th>Paid Amount</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billData?.slice(0, 3).map((item) => (
                      <>
                        <tr>
                          <td>{item.bill_date?.split("T")[0]}</td>
                          <td>{item.total_amount}</td>
                          <td>{item.paid_amount}</td>
                          <td>{item.payment_status}</td>
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
                    {clinicExam.length > 0 ? (
                      <>
                        {clinicExam?.slice(0, 3).map((item) => (
                          <>
                            <tr>
                              <td>{item.date?.split("T")[0]}</td>
                              <td>{item.disease}</td>
                              <td>{item.chief_complain}</td>
                              <td>{item.selected_teeth}</td>
                              <td>{item.diagnosis_category}</td>{" "}
                              <td>{item.on_examination}</td>
                              {/* Replace "Doctor Name" with the actual doctor's name */}
                            </tr>
                          </>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan="6">No examination data available</td>
                      </tr>
                    )}
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
                    {prescpData.length > 0 ? (
                      <>
                        {prescpData?.slice(0, 3).map((item) => (
                          <>
                            <tr>
                              <td>{item.date?.split("T")[0]}</td>
                              <td>{item.treatment}</td>
                              <td>{item.medicine_name}</td>
                              <td>{item.duration}</td>
                              <td>{item.note}</td>
                            </tr>
                          </>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan="4">No Treatment data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-4" id="tableresponsive">
              <h5>Medical History Note</h5>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAppointments?.slice(0, 3)?.map((item) => (
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
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
