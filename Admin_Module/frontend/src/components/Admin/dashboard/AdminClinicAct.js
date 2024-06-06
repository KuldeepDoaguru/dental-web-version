import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FcAlarmClock } from "react-icons/fc";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AdminClinicAct = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [showCalender, setShowCalender] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [patDetails, setPatDetails] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [timeDifference, setTimeDifference] = useState(null);
  const [todayDate, setTodayDate] = useState("");
  const [treatValue, setTreatValue] = useState([]);

  const handleCalender = () => {
    setShowCalender(!showCalender);
  };

  const getAppointList = async () => {
    // console.log(user.branch_name);
    try {
      const response = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getAppointmentData/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAppointmentList(response.data);
    } catch (error) {
      // console.log(error);
    }
  };

  console.log(appointmentList[0]?.appointment_dateTime?.split("T")[0]);

  useEffect(() => {
    const date = new Date();
    setTodayDate(date.toISOString());
  }, []);

  const getPatdetailsByBranch = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getPatientDetailsByBranch/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(data);
      setPatDetails(data);
    } catch (error) {
      // console.log(error);
    }
  };

  console.log(patDetails);

  const getTime = new Date();
  const hours = ("0" + (getTime.getHours() - 5)).slice(-2);
  const minutes = ("0" + getTime.getMinutes()).slice(-2);

  // If hours is negative, adjust it to the previous day
  if (hours < 0) {
    // Add 24 to make it positive
    hours = ("0" + (hours + 24)).slice(-2);
  }

  const formattedTime = `${hours}`;

  // console.log(formattedTime);

  const getLife = appointmentList?.map((item) => {
    // Log the values involved in the subtraction
    // console.log("Formatted Time:", typeof formattedTime);
    // console.log(
    //   "Appointment Time:",
    //   item?.appointment_dateTime?.split("T")[1]?.split(":")[0]
    // );

    const difference =
      formattedTime - item?.appointment_dateTime?.split("T")[1]?.split(":")[0];
    // console.log("Difference:", difference); // Log the difference
    return difference.toString();
  });

  // console.log(getLife);
  // console.log(
  //   appointmentList[0]?.appointment_dateTime?.split("T")[1]?.split(":")[0]
  // );

  //patient details
  const getPatientDet = patDetails?.map((item) => {
    // Log the values involved in the subtraction
    // console.log("Formatted Time:", typeof formattedTime);
    // console.log(
    //   "Appointment Time:",
    //   item?.regdatetime?.split("T")[1]?.split(":")[0]
    // );

    const difference =
      formattedTime - item?.regdatetime?.split("T")[1]?.split(":")[0];
    // console.log("Difference:", difference); // Log the difference
    return difference.toString();
  });

  // console.log(patDetails);
  // console.log(
  //   appointmentList[0]?.appointment_dateTime?.split("T")[1]?.split(":")[0]
  // );

  const getTreatmentValues = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getTreatSuggest/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setTreatValue(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(treatValue);

  useEffect(() => {
    getAppointList();
    getPatdetailsByBranch();
    getTreatmentValues();
  }, [user.branch_name]);

  // console.log(currentDate);

  //filter for day wise Appointment
  const filterAppointment = appointmentList?.filter((item) => {
    if (currentDate) {
      return item.appointment_dateTime?.split("T")[0] === currentDate;
    } else {
      return (
        item.appointment_dateTime?.split("T")[0] === todayDate?.split("T")[0]
      );
    }
  });

  console.log(filterAppointment);

  //filter for day wise Treatment
  const filterTreatment = appointmentList?.filter((item) => {
    if (currentDate) {
      return item.appointment_dateTime?.split("T")[0] === currentDate;
    } else {
      return (
        item.appointment_dateTime?.split("T")[0] === todayDate?.split("T")[0]
      );
    }
  });

  console.log(filterTreatment);

  //filter for day wise billing
  const filterBilling = treatValue?.filter((item) => {
    if (currentDate) {
      return (
        item.bill_date?.split("T")[0] === currentDate &&
        item.payment_status === "paid"
      );
    }
    return (
      item.bill_date?.split("T")[0] === todayDate?.split("T")[0] &&
      item.payment_status === "paid"
    );
  });

  // console.log(filterBilling);

  // console.log(
  //   filterAppointment[5]?.appointment_dateTime?.split("T")[1]?.split(":")[0],
  //   formattedTime
  // );

  //filter for day wise patient registeration
  const filterPatient = patDetails?.filter((item) => {
    if (currentDate) {
      return item.created_at?.split("T")[0] === currentDate;
    }
    return item.created_at?.split("T")[0] === todayDate?.split("T")[0];
  });

  // console.log(filterPatient);

  const tdate = new Date();

  // Get year, month, and date
  const year = tdate.getFullYear();
  const month = String(tdate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(tdate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${date}`;

  

  // console.log(formattedDate);
  return (
    <>
      <Container>
        <div className="container-fluid">
          <div className="clinic-act-heading">
            <div>
              <h5>
                <FcAlarmClock /> Clinic Activity for{" "}
                {currentDate ? currentDate : todayDate?.split("T")[0]}
              </h5>
            </div>
            <div>
              <h5>
                {currentDate ? currentDate : todayDate?.split("T")[0]}
                <IoIosArrowDropdownCircle onClick={handleCalender} />
              </h5>
              {showCalender ? (
                <>
                  <input
                    type="date"
                    name="currentDate"
                    onChange={(e) => setCurrentDate(e.target.value)}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="container-fluid mt-2">
          <ul class="nav nav-pills mb-3 ms-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-java-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-java"
                type="button"
                role="tab"
                aria-controls="pills-java"
                aria-selected="true"
              >
                Appointment
              </button>
            </li>
            <li class="nav-item mx-2" role="presentation">
              <button
                class="nav-link"
                id="pills-treatment-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-treatment"
                type="button"
                role="tab"
                aria-controls="pills-treatment"
                aria-selected="false"
              >
                Treatment
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-billing-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-billing"
                type="button"
                role="tab"
                aria-controls="pills-billing"
                aria-selected="false"
              >
                Billing
              </button>
            </li>
            <li class="nav-item mx-2" role="presentation">
              <button
                class="nav-link"
                id="pills-Patient-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-Patient"
                type="button"
                role="tab"
                aria-controls="pills-Patient"
                aria-selected="false"
              >
                Patient
              </button>
            </li>
          </ul>

          {/* tab button end */}

          <div
            className="tab-content border ms-3 me-3 my-3 mb-5"
            id="pills-tabContent"
          >
            <div
              className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade show active"
              id="pills-java"
              role="tabpanel"
              aria-labelledby="pills-java-tab"
            >
              <ul style={{maxHeight:"50rem" , overflow:"scroll"}}>
                {filterAppointment?.map((item) => (
                  <>
                    <li >
                      <div className="d-flex justify-content-between" >
                        <div>
                          <h4>
                            <FaDotCircle className="mx-1" /> Appointment of{" "}
                            {item.patient_name} has been scheduled by{" "}
                            {item.appointment_created_by} at {item.branch_name}{" "}
                            Branch
                          </h4>
                        </div>
                        <div>
                          {item.appointment_dateTime?.split("T")[0] ===
                          formattedDate ? (
                            <>
                              <p className="fw-bold">
                                {formattedTime >=
                                item.appointment_dateTime
                                  .split("T")[1]
                                  ?.split(":")[0]
                                  ? formattedTime -
                                    item.appointment_dateTime
                                      .split("T")[1]
                                      ?.split(":")[0]
                                  : "--:--"}{" "}
                                Hours ago
                              </p>
                            </>
                          ) : (
                            <>
                              <p>{item.appointment_dateTime?.split("T")[0]}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                    <hr />
                  </>
                ))}
              </ul>
            </div>

            <div
              className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade"
              id="pills-treatment"
              role="tabpanel"
              aria-labelledby="pills-treatment-tab"
            >
              <ul style={{maxHeight:"40rem" , overflow:"scroll"}}>
                {filterTreatment?.map((item) => (
                  <>
                    <li>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h4>
                            <FaDotCircle className="mx-1" />{" "}
                            {item.treatment_provided} Treatment provided to{" "}
                            patient {item.patient_name} by Dr.{" "}
                            {item.assigned_doctor_name}
                          </h4>
                        </div>
                        <div>
                          {item.appointment_dateTime?.split("T")[0] ===
                          formattedDate ? (
                            <>
                              <p className="fw-bold">
                                {formattedTime >=
                                item.appointment_dateTime
                                  .split("T")[1]
                                  ?.split(":")[0]
                                  ? formattedTime -
                                    item.appointment_dateTime
                                      .split("T")[1]
                                      ?.split(":")[0]
                                  : "--:--"}{" "}
                                Hours ago
                              </p>
                            </>
                          ) : (
                            <>
                              <p>{item.appointment_dateTime?.split("T")[0]}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                    <hr />
                  </>
                ))}
              </ul>
            </div>

            <div
              className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade"
              id="pills-billing"
              role="tabpanel"
              aria-labelledby="pills-billing-tab"
            >
              <ul style={{maxHeight:"40rem" , overflow:"scroll"}}>
                {filterBilling?.map((item) => (
                  <>
                    <li>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h4>
                            <FaDotCircle className="mx-1" /> Patient{" "}
                            {item.patient_name} has paid{" "}
                            {item.paid_amount + item.pay_by_sec_amt}/- for the
                            Treatment.
                          </h4>
                        </div>
                        <div>
                          {item.bill_date?.split("T")[0] === formattedDate ? (
                            <>
                              <p className="fw-bold">
                                {formattedTime >=
                                item.bill_date?.split("T")[1]?.split(":")[0]
                                  ? formattedTime -
                                    item.bill_date?.split("T")[1]?.split(":")[0]
                                  : "--:--"}{" "}
                                Hours ago
                              </p>
                            </>
                          ) : (
                            <>
                              <p>{item.appointment_dateTime?.split("T")[0]}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                    <hr />
                  </>
                ))}
              </ul>
            </div>

            <div
              className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade"
              id="pills-Patient"
              role="tabpanel"
              aria-labelledby="pills-Patient-tab"
            >
              <ul style={{maxHeight:"40rem" , overflow:"scroll"}}>
                {filterPatient?.map((item) => (
                  <>
                    <li>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h4>
                            <FaDotCircle className="mx-1" /> Patient{" "}
                            {item.patient_name} has been registered at{" "}
                            {item.branch_name} Branch.
                          </h4>
                        </div>
                        <div>
                          {item.created_at?.split("T")[0] === formattedDate ? (
                            <>
                              <p className="fw-bold">
                                {formattedTime >=
                                item.created_at?.split("T")[1]?.split(":")[0]
                                  ? formattedTime -
                                    item.created_at
                                      ?.split("T")[1]
                                      ?.split(":")[0]
                                  : "--:--"}{" "}
                                Hours ago
                              </p>
                            </>
                          ) : (
                            <>
                              <p>{item.created_at?.split("T")[0]}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                    <hr />
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminClinicAct;
const Container = styled.div`
  .nav-link {
    color: #1abc9c;
    background: #e0e0e0;
  }

  .nav-pills .nav-link.active {
    background-color: #1abc9c;
  }

  ul {
    li {
      list-style-type: none;
    }
  }

  .tab-content {
    height: 100%;
    overflow: auto;
  }
`;
