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

  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [nextAppoint, setNextAppoint] = useState(null);
  const [prevAppoint, setPrevAppoint] = useState(null);
  const [patPendingBill, setPatPendingBill] = useState([]);
  const [patFinalBills, setPatFinalBills] = useState([]);
  const [patAppointDetails, setPatAppointDetails] = useState([]);
  const [sortedAppointments, setSortedAppointments] = useState([]);
  const [treatData, setTreatData] = useState([]);
  const [exmData, setExmData] = useState([]);

  const [presData, setPresData] = useState([]);

  const getPresDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPrescriptionViaUhid/${branch.name}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPresData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientBillByBranchAndId/${branch.name}/${pid}` , 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setPatPendingBill(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(patPendingBill);

  const getAppointDetailsPat = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getAppointmentByBranchAndId/${pid}` , 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
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
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getExaminationViaUhid/${branch.name}/${pid}` ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setExmData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(exmData);
  useEffect(() => {
    getPendingBillDetails();
    getAppointDetailsPat();
    getPresDetails();
  }, [branch.name]);

  useEffect(() => {
    getExamineDetails();
    getPendingBillDetails();
  }, [branch.name]);

  const fetchLatestTreatPatientData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getTreatmentViaUhid/${branch.name}/${pid}` ,
        {
          headers: {
            "Content-Type": "application/json",
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

  console.log(treatData);
  useEffect(() => {
    fetchLatestTreatPatientData();
  }, [branch.name]);

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

  console.log(treatData);

  const getPatBills = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/get-patientBill-data/${pid}` , 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPatFinalBills(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatBills();
  }, [branch.name]);

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-4" id="tableresponsive1">
            <div className="d-flex justify-content-center align-item-center mt-2 h-100 w-100 shadow rounded">
              <div className="mt-3">
                <p className="text-center">Last Appointment</p>
                <h5 className="text-center">{prevAppoint}</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-4" id="tableresponsive1">
            {" "}
            <div className="d-flex justify-content-center align-item-center mt-2 h-100 w-100 shadow rounded">
              <div className="mt-3">
                <p className="text-center">Next Appointment</p>
                <h5 className="text-center">{nextAppoint}</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-4" id="tableresponsive1">
            {" "}
            <div className="d-flex justify-content-center align-item-center mt-2 h-100 w-100 shadow rounded">
              <div className="mt-3">
                {" "}
                <p className="text-center">Payment Pending</p>
                <h5 className="text-center">INR {total}</h5>
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
                    {treatData?.slice(0, 3).map((item) => (
                      <tr>
                        <td>{item.tp_id}</td>
                        <td>{item.desease}</td>
                        <td>{item.treatment_name}</td>
                        <td>{item.total_sitting}</td>
                        <td>{item.treatment_status}</td>
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
                      <th>Paid Amount</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patFinalBills?.slice(0, 3).map((item) => (
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
                <h5>Clinical Examin</h5>
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
                    {exmData?.slice(0, 3).map((item) => (
                      <>
                        <tr>
                          <td>{item.date.split("T")[0]}</td>
                          <td>{item.disease}</td>
                          <td>{item.chief_complain}</td>
                          <td>{item.selected_teeth}</td>
                          <td>{item.diagnosis_category}</td>{" "}
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
                    {presData?.slice(0, 3).map((item) => (
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
