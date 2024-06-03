import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FcAlarmClock } from "react-icons/fc";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ClinicActivity = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  // console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  // console.log(`User Name: ${branch.name}`);
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
  console.log(appointmentList);
  const getAppointList = async () => {
    // console.log(branch.name);
    try {
      const response = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getAppointmentData/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAppointmentList(response.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const date = new Date();
    setTodayDate(date.toISOString());
  }, []);

  const getPatdetailsByBranch = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientDetailsByBranch/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
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
  //   appointmentList[0]?.appointment_dateTime.split("T")[1]?.split(":")[0]
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
    console.log("Difference:", difference); // Log the difference
    return difference.toString();
  });

  // console.log(patDetails);
  // console.log(
  //   appointmentList[0]?.appointment_dateTime.split("T")[1]?.split(":")[0]
  // );

  const getTreatmentValues = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getTreatSuggest/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
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
  }, [branch.name]);

  // console.log(currentDate);

  // UTC Time Start here

  // const ConvertToIST = ( utcDateString ) => {
  //   // Convert the date string to a Date object
  //   const utcDate = new Date(utcDateString);

  //   // Convert the UTC date to IST by adding 5 hours and 30 minutes
  //   const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
  //   const istDate = new Date(utcDate.getTime() + istOffset);

  //   // Format the IST date
  //   const options = {
  //     timeZone: 'Asia/Kolkata',
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     // hour: '2-digit',
  //     // minute: '2-digit',
  //     // second: '2-digit',
  //   };
  //   const istDateString = new Intl.DateTimeFormat('en-IN', options).format(istDate);

  //   return istDateString;
  // };

  const ConvertToIST = (utcDateString) => {
    // Convert the date string to a Date object
    const utcDate = new Date(utcDateString);

    // Convert the UTC date to IST by adding 5 hours and 30 minutes
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const istDate = new Date(utcDate.getTime() + istOffset);

    // Get the components of the date
    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(istDate.getDate()).padStart(2, "0");

    // Format the IST date as "YYYY-MM-DD"
    const istDateString = `${year}-${month}-${day}`;

    return istDateString;
  };

  //filter for day wise Appointment
  const filterAppointment = appointmentList?.filter((item) => {
    if (currentDate) {
      // return item.created_at?.split("T")[0] === currentDate;
      return ConvertToIST(item.created_at) === currentDate;
    } else {
      return (
        // item.created_at?.split("T")[0] === todayDate?.split("T")[0]
        ConvertToIST(item.created_at) === todayDate?.split("T")[0]
      );
    }
  });

  const getFormattedTimeDifference = (createdAt) => {
    const currentTime = new Date();
    const appointmentTime = new Date(createdAt);

    const timeDifference = Math.abs(currentTime - appointmentTime);
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    return hoursDifference;
  };

  console.log(filterAppointment);
  console.log(appointmentList);
  console.log(currentDate);
  console.log(todayDate?.split("T")[0]);

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

  console.log(filterBilling);
  console.log(patDetails[0]?.created_at?.split(" ")[0]);
  console.log(currentDate);
  console.log(todayDate?.split("T")[0]);
  //filter for day wise patient registeration
  const filterPatient = patDetails?.filter((item) => {
    if (currentDate) {
      return item.created_at?.split(" ")[0] === currentDate;
    }
    return item.created_at?.split(" ")[0] === todayDate?.split("T")[0];
  });

  console.log(filterPatient);

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
            {/* <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-python-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-python"
                type="button"
                role="tab"
                aria-controls="pills-python"
                aria-selected="true"
              >
                All
              </button>
            </li> */}
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
              <ul className="appointHeight">
                {filterAppointment?.map((item) => (
                  <>
                    <li>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>
                            <FaDotCircle className="mx-1" /> Appointment of{" "}
                            {item.patient_name} has been scheduled by{" "}
                            {item.appointed_by} at {item.branch_name} Branch
                          </h5>
                        </div>
                        <div>
                          {/* {item.created_at.split("T")[0] ===
                          formattedDate ? (
                            <>
                              <p className="fw-bold">
                                {formattedTime >=
                                item.created_at
                                  .split("T")[1]
                                  ?.split(":")[0]
                                  ? formattedTime -
                                    item.created_at
                                      .split("T")[1]
                                      ?.split(":")[0]
                                  : "--:--"}{" "}
                                Hours ago
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="fw-bold">{item.created_at.split("T")[0]}</p>
                            </>
                          )} */}
                          {item.created_at.split(" ")[0] === formattedDate ? 
                          // (
                          //   <p className="fw-bold">
                          //     {formattedTime >=
                          //     item.created_at.split(" ")[1]?.split(":")[0]
                          //       ? getFormattedTimeDifference(item.created_at)
                          //       : "--:--"}{" "}
                          //     Hours ago
                          //   </p>
                          // ) 
                          (
                            <p className="fw-bold">
                            
                             {  item.created_at.split(" ")[1] }
                               
                            </p>
                          ) 
                          : (
                            <p className="fw-bold">
                              {item.created_at}
                            </p>
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
              <ul className="appointHeight">
                {filterTreatment?.map((item) => (
                  <>
                    <li>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>
                            <FaDotCircle className="mx-1" />{" "}
                            {item.treatment_provided} Treatment provided to{" "}
                            patient {item.patient_name} by Dr.{" "}
                            {item.assigned_doctor_name}
                          </h5>
                        </div>
                        <div>
                          {item.appointment_dateTime.split("T")[0] ===
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
                                  : "0"}{" "}
                                Hours ago
                              </p>
                            </>
                          ) : (
                            <>
                              <p>{item.appointment_dateTime.split("T")[0]}</p>
                            </>
                          )}
                          {/* {item.created_at.split("T")[0] ===
                          formattedDate ? (
                            <p className="fw-bold">
                              {formattedTime >=
                              item.created_at
                                .split("T")[1]
                                ?.split(":")[0]
                                ? getFormattedTimeDifference(
                                    item.created_at
                                  )
                                : "0"}{" "}
                              Hours ago
                            </p>
                          ) : (
                            <p>{ConvertToIST(item.created_at)}</p>
                          )} */}
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
              <ul className="appointHeight">
                {filterBilling?.map((item) => (
                  <>
                    <li>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>
                            <FaDotCircle className="mx-1" /> Patient{" "}
                            {item.patient_name} has paid {item.paid_amount}/-
                            for the Treatment.
                          </h5>
                        </div>
                        <div>
                          {item.appointment_dateTime?.split("T")[0] ===
                          formattedDate ? (
                            <>
                              <p className="fw-bold">
                                {formattedTime -
                                  item.appointment_dateTime
                                    .split("T")[1]
                                    ?.split(":")[0]}{" "}
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
              <ul className="appointHeight">
                {filterPatient?.map((item) => (
                  <>
                    <li>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>
                            <FaDotCircle className="mx-1" /> Patient{" "}
                            {item.patient_name} has been registered at{" "}
                            {item.branch_name} Branch.
                          </h5>
                        </div>
                        <div>
                          {item?.created_at?.split("T")[0] === formattedDate ? (
                            <>
                              {/* <p className="fw-bold">
                                {formattedTime -
                                  item.created_at
                                    ?.split("T")[1]
                                    ?.split(":")[0]}{" "}
                                Hours ago
                              </p> */}
                              <p className="fw-bold">
                                {formattedTime >=
                                item.created_at.split(" ")[1]?.split(":")[0]
                                  ? formattedTime -
                                    item.created_at.split(" ")[1]?.split(":")[0]
                                  : "0"}{" "}
                                Hours ago
                              </p>
                            </>
                          ) : (
                            <>
                              <p>{item.created_at?.split(" ")[0]}</p>
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

export default ClinicActivity;
const Container = styled.div`
  .nav-link {
    color: #004aad;
    background: #e0e0e0;
  }

  .nav-pills .nav-link.active {
    background-color: #004aad;
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

  .appointHeight {
    height: 15rem;
  }
`;
