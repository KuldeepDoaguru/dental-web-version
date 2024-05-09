import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTableRefresh } from "../../../redux/user/userSlice";
import cogoToast from "cogo-toast";
import moment from "moment";

const AppointTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [treatData, setTreatData] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [filterTableData, setFilterTableData] = useState([]);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const dispatch = useDispatch();
  const { refreshTable } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const doctor = user.currentUser.employee_name;
  const doctorId = user.currentUser.employee_ID;
  const branch = user.currentUser.branch_name;
  // console.log(branch);
  // const [selectedActions, setSelectedActions] = useState({});

  const handleDateChange = (increment) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + increment);
    setSelectedDate(currentDate.toISOString().split("T")[0]);
  };
  // console.log(selectedDate === "");
  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getAppointmentsWithPatientDetailsTreatSugg/${doctorId}`
      );
      setAppointments(data);
    } catch (error) {
      // console.error("Error fetching appointments:", error.message);
    }
  };

  console.log(appointments);

  const filteredData = appointments?.filter((item) => {
    return item.appointment_dateTime?.split("T")[0] === selectedDate;
  });
  // setAppointments(appointments);
  // console.log(filteredData);

  useEffect(() => {
    fetchAppointments();
    // Refresh every 5 seconds
    const interval = setInterval(() => {
      dispatch(toggleTableRefresh());
    }, 5000);

    return () => {
      clearInterval(interval);
      // console.log("Interval cleared.");
    };
  }, [selectedDate, searchInput, dispatch, doctor, refreshTable]);

  // console.log(appointments);
  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm);
    setSearchInput(searchTerm);
    const filteredResults = appointments?.filter(
      (row) =>
        row.patient_name?.toLowerCase()?.includes(searchTerm) ||
        row.mobileno?.includes(searchTerm) ||
        (row.appointment_dateTime?.includes(selectedDate) &&
          (row.patient_name?.toLowerCase()?.includes(searchTerm) ||
            row.mobileno?.includes(searchTerm)))
    );
    setFilterTableData(filteredResults);
    // console.log(filteredResults);
  };

  // console.log(filterTableData);

  const timelineForStartTreat = async (uhid) => {
    try {
      const response = await axios.post(
        "https://dentalgurudoctor.doaguru.com/api/doctor/insertTimelineEvent",
        {
          type: "Examiantion",
          description: "Start Examintion",
          branch: branch,
          patientId: uhid,
        }
      );
      // console.log(response);
    } catch (error) {
      // console.log(error);
    }
  };

  const timelineForCancelTreat = async (uhid) => {
    try {
      const response = await axios.post(
        "https://dentalgurudoctor.doaguru.com/api/doctor/insertTimelineEvent",
        {
          type: "Examiantion",
          description: "Cancel Treatment",
          branch: branch,
          patientId: uhid,
        }
      );
      // console.log(response);
    } catch (error) {
      // console.log(error);
    }
  };

  const getTreatPackageData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getTreatPackageViaTpidUhid/${branch}`
      );
      setTreatData(data);
    } catch (error) {
      // console.log(error);
    }
  };

  // const filterForPendingTp = treatData?.filter((item) => {
  //   return item.tp_id === tp_id && item.package_status !== null;
  // });

  // console.log(filterForPendingTp);

  // console.log(treatData);

  useEffect(() => {
    getTreatPackageData();
  }, []);

  const handleAction = async (
    action,
    appointId,
    uhid,
    appointment_status,
    tpid
  ) => {
    // console.log(appointment_status, tpid, uhid);
    try {
      let requestBody = {
        action,
        appointId,
      };

      if (action === "Cancel") {
        // console.log(uhid);
        const cancelReason = prompt(
          "Please provide a reason for cancellation:"
        );
        if (cancelReason !== null) {
          requestBody.reason = cancelReason;
          timelineForCancelTreat(uhid);
          // console.log(uhid);
          cogoToast.success("Patient Appointment Cancel Successfully");
        } else {
          // console.log(uhid);
          return;
        }
      }

      await axios.put(
        `https://dentalgurudoctor.doaguru.com/api/doctor/upDateAppointmentStatus`,
        requestBody
      );

      if (action === "in treatment") {
        timelineForStartTreat(uhid);
        // alert(appointment_status);
        const filterForPendingTp = treatData?.filter((item) => {
          return item.tp_id === tpid && item.package_status === "ongoing";
        });
        if (filterForPendingTp.length > 0) {
          navigate(`/TreatmentDashBoard/${tpid}/${appointId}`);
        } else {
          navigate(`/examination-Dashboard/${appointId}/${uhid}`);
        }
        window.scrollTo(0, 0);
      }

      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/appointtreatSitting?date=${selectedDate}`
      );
      setAppointments(res.data.result);
      setFilterTableData(res.data.result);
      // setSelectedActions({ ...selectedActions, [appointId]: action });
    } catch (error) {
      // console.error("Error updating appointment status:", error.message);
    }
  };

  return (
    <Wrapper>
      <div className="container-fluid pt-4">
        <div className="widget-area-2 proclinic-box-shadow" id="tableres">
          <div className="d-flex justify-content-between mb-3 widget-header appointMain">
            <h5 className="widget-title m-0 pt-2" id="title">
              Current Appointment
              <h5 className="d-inline">Total - {filteredData.length}</h5>
            </h5>

            <div className="pt-1">
              <FaArrowCircleLeft
                // style={{ fontSize: "35px", cursor: "pointer" }}
                className="arrow"
                onClick={() => handleDateChange(-1)}
              />
            </div>
            <input
              type="date"
              className="form-control w-25 inputDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="pt-1 mx-2">
              <FaArrowCircleRight
                // style={{ fontSize: "35px", cursor: "pointer" }}
                className="arrow"
                onClick={() => handleDateChange(1)}
              />
            </div>

            <input
              type="text"
              placeholder="search name or number"
              className="mx-3 p-1 rounded"
              value={keyword}
              onChange={(e) => setkeyword(e.target.value.toLowerCase())}
            />
          </div>
          {selectedDate === "" ? (
            <>
              <div className="table-responsive all-appoint">
                <table
                  className="table table-bordered table-striped border"
                  style={{ overflowX: "scroll" }}
                >
                  <thead>
                    <tr>
                      <th className="sticky">Appointment ID</th>
                      <th className="sticky">UHID</th>
                      <th className="sticky">Patient Name</th>
                      <th className="sticky">Mobile</th>
                      <th className="sticky">Timing</th>
                      <th className="sticky">Treatment</th>
                      <th className="sticky">Blood Group</th>
                      <th className="sticky">DOB</th>
                      <th className="sticky">Age</th>
                      <th className="sticky">Weight</th>
                      <th className="sticky">Allergy</th>
                      <th className="sticky">Disease</th>
                      <th className="sticky">Patient Type</th>
                      <th className="sticky">Note</th>
                      <th className="sticky">Sitting</th>
                      <th className="sticky">Status</th>
                      <th className="sticky">Type of Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments
                      ?.filter((val) => {
                        if (keyword === "") {
                          return true;
                        } else if (
                          val.patient_name
                            ?.toLowerCase()
                            ?.includes(keyword.toLowerCase()) ||
                          val.mobileno?.includes(keyword)
                        ) {
                          return val;
                        }
                      })
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{item.appoint_id}</td>
                          <td>
                            <Link to={`/Patient-profile/${item.patient_uhid}`}>
                              {item.patient_uhid}
                            </Link>
                          </td>
                          <td>{item.patient_name}</td>
                          <td>{item.mobileno}</td>
                          <td>
                            {moment(item?.appointment_dateTime).format(
                              "h:mm A"
                            )}
                          </td>
                          <td>{item.treatment_names}</td>
                          <td>{item.bloodgroup}</td>
                          <td>{item.dob}</td>
                          <td>{item.age}</td>
                          <td>{item.weight}</td>
                          <td>{item.allergy}</td>
                          <td>{item.disease}</td>
                          <td>{item.patient_type}</td>
                          <td>{item.notes}</td>
                          <td>{item.current_sitting + 1}</td>
                          <td>{item.appointment_status}</td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Action
                              </button>
                              {/* Option 1 */}
                              <ul className="dropdown-menu">
                                {item.appointment_status !== "Complete" &&
                                  item.appointment_status !== "Check Out" &&
                                  item.appointment_status !== "Appoint" && (
                                    <>
                                      <li>
                                        <button
                                          className="dropdown-item mx-0"
                                          onClick={() =>
                                            handleAction(
                                              "in treatment",
                                              item.appoint_id,
                                              item.patient_uhid,
                                              item.appointment_status,
                                              item.tp_id
                                            )
                                          }
                                        >
                                          Start Treatment
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          className="dropdown-item mx-0"
                                          onClick={() =>
                                            handleAction(
                                              "Cancel",
                                              item.appoint_id,
                                              item.uhid
                                            )
                                          }
                                        >
                                          Cancel Treatment
                                        </button>
                                      </li>
                                      {/* <li>
                                  <button
                                    className="dropdown-item mx-0"
                                    onClick={() =>
                                      handleAction(
                                        "On Hold",
                                        item.appoint_id,
                                        item.uhid
                                      )
                                    }
                                  >
                                    Hold
                                  </button>
                                </li> */}
                                    </>
                                  )}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              {filteredData.length > 0 ? (
                <>
                  <div className="table-responsive ">
                    <table
                      className="table table-bordered table-striped border"
                      style={{ overflowX: "scroll" }}
                    >
                      <thead>
                        <tr>
                          <th>Appointment ID</th>
                          <th>UHID</th>
                          <th>Patient Name</th>
                          <th>Mobile</th>
                          <th>Timing</th>
                          <th>Treatment</th>
                          <th>Blood Group</th>
                          <th>DOB</th>
                          <th>Age</th>
                          <th>Weight</th>
                          <th>Allergy</th>
                          <th>Disease</th>
                          <th>Patient Type</th>
                          <th>Note</th>
                          <th>Sitting</th>
                          <th>Status</th>
                          <th>Type of Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData
                          ?.filter((val) => {
                            if (keyword === "") {
                              return true;
                            } else if (
                              val.patient_name
                                ?.toLowerCase()
                                ?.includes(keyword.toLowerCase()) ||
                              val.mobileno?.includes(keyword)
                            ) {
                              return val;
                            }
                          })
                          .map((item, index) => (
                            <tr key={index}>
                              <td>{item.appoint_id}</td>
                              <td>
                                <Link
                                  to={`/Patient-profile/${item.patient_uhid}`}
                                >
                                  {item.patient_uhid}
                                </Link>
                              </td>
                              <td>{item.patient_name}</td>
                              <td>{item.mobileno}</td>
                              <td>
                                {moment(item?.appointment_dateTime).format(
                                  "h:mm A"
                                )}
                              </td>
                              <td>
                                {/* {item.treatment_names && item.treatment_names?.split(", ") > 0 {
    for (let i = 0; i < Math.min(treatments.length, maxTreatments); i++) {
        {item.treatment_names?.split(", ")[0]} <br />
    }
}} */}
                                <small>{item.treatment_names}</small>
                              </td>
                              <td>{item.bloodgroup}</td>
                              <td>{item.dob}</td>
                              <td>{item.age}</td>
                              <td>{item.weight}</td>
                              <td>{item.allergy}</td>
                              <td>{item.disease}</td>
                              <td>{item.patient_type}</td>
                              <td>{item.notes}</td>
                              <td>{item.current_sitting + 1}</td>
                              <td>{item.appointment_status}</td>
                              <td>
                                <div className="dropdown">
                                  <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Action
                                  </button>
                                  {/* Option 1 */}
                                  <ul className="dropdown-menu">
                                    {item.appointment_status !== "Complete" &&
                                      item.appointment_status !== "Check Out" &&
                                      item.appointment_status !== "Appoint" && (
                                        <>
                                          <li>
                                            <button
                                              className="dropdown-item mx-0"
                                              onClick={() =>
                                                handleAction(
                                                  "in treatment",
                                                  item.appoint_id,
                                                  item.patient_uhid,
                                                  item.appointment_status,
                                                  item.tp_id
                                                )
                                              }
                                            >
                                              Start Treatment
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              className="dropdown-item mx-0"
                                              onClick={() =>
                                                handleAction(
                                                  "Cancel",
                                                  item.appoint_id,
                                                  item.uhid
                                                )
                                              }
                                            >
                                              Cancel Treatment
                                            </button>
                                          </li>
                                          {/* <li>
                                  <button
                                    className="dropdown-item mx-0"
                                    onClick={() =>
                                      handleAction(
                                        "On Hold",
                                        item.appoint_id,
                                        item.uhid
                                      )
                                    }
                                  >
                                    Hold
                                  </button>
                                </li> */}
                                        </>
                                      )}
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <hr />
                  <p>No Appointments Today</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default AppointTable;

const Wrapper = styled.div`
  overflow-x: hidden;
  #tableres {
    margin-top: 0rem;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
  }
  #title {
    @media screen and (max-width: 768px) {
      margin-top: 20px;
    }
  }

  #btn1 {
    width: 100%;

    @media screen and (min-width: 1600px) and (max-width: 3700px) {
      width: 75%;
    }
  }

  .table-responsive {
    overflow-x: auto;
  }
  th {
    background: #0dcaf0;
    white-space: nowrap;
    @media screen and (min-width: 1999px) and (max-width: 2186px) {
      font-size: 18px;
    }
    @media screen and (min-width: 1024px) and (max-width: 1998px) {
      font-size: 15px;
      width: 5rem;
    }
  }
  .appointMain {
    h5 {
      font-size: 24px;
      margin: 0 0 0 20px;
    }
    .arrow {
      font-size: 35px;
    }
    @media screen and (min-width: 750px) and (max-width: 850px) {
      h5 {
        font-size: 15px;
        margin: 0 0 0 10px;
      }
      .arrow {
        font-size: 25px;
      }
      .inputSearch {
        padding: 0;
        margin: 0;
      }
    }
    @media screen and (min-width: 851px) and (max-width: 1024px) {
      h5 {
        font-size: 15px;
        margin: 0 0 0 10px;
      }
      .arrow {
        font-size: 25px;
      }
      .inputSearch {
        padding: 0;
        margin: 0;
      }
    }
  }

  .table {
    box-shadow: 1px -1px 11px 2px rgba(128, 128, 128, 0.78);
    -webkit-box-shadow: 1px -1px 11px 2px rgba(128, 128, 128, 0.78);
    -moz-box-shadow: 1px -1px 11px 2px rgba(128, 128, 128, 0.78);
  }

  th {
    color: white;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }

  .all-appoint {
    height: 30rem;
    overflow: auto;
  }

  th {
    /* background-color: #1abc9c; */
    /* color: white; */
    position: sticky;
  }

  .sticky {
    position: sticky;
    top: 0;
    /* background-color: #1abc9c;
    color: white; */
    z-index: 1;
  }
`;
