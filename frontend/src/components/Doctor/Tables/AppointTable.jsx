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
import animationData from "../../../animation/animation-four.json";
import Lottie from "lottie-react";

const AppointTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [treatData, setTreatData] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [filterTableData, setFilterTableData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const dispatch = useDispatch();
  const { refreshTable } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  console.log(user.currentUser.token);
  const doctor = user.currentUser.employee_name;
  const doctorId = user.currentUser.employee_ID;
  const branch = user.currentUser.branch_name;
  const token = user.currentUser.token;
  // console.log(branch);
  // const [selectedActions, setSelectedActions] = useState({});

  const handleDateChange = (increment) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + increment);
    setSelectedDate(currentDate.toISOString().split("T")[0]);
  };
  // console.log(selectedDate === "");
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getAppointmentsWithPatientDetailsTreatSugg/${doctorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setLoading(false);
      setAppointments(data);
    } catch (error) {
      // setLoading(false);
      // console.error("Error fetching appointments:", error.message);
    }
  };

  console.log(appointments);

  const filteredData = appointments?.filter((item) => {
    return item.appointment_dateTime?.split("T")[0] === selectedDate;
  });

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
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
        `https://dentalgurudoctor.doaguru.com/api/doctor/getTreatPackageViaTpidUhid/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTreatData(data);
    } catch (error) {
      // console.log(error);
    }
  };

  console.log(treatData);

  useEffect(() => {
    getTreatPackageData();
  }, []);

  // const joinTables =

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

      await axios.put(
        `https://dentalgurudoctor.doaguru.com/api/doctor/upDateAppointmentStatus`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (action === "in treatment") {
        timelineForStartTreat(uhid);

        const filterForPendingTp = treatData?.filter((item) => {
          return item.tp_id === tpid && item.package_status === "ongoing";
        });
        // alert(filterForPendingTp.length);
        console.log(filterForPendingTp.length);

        const filterForGoingTp = treatData?.filter((item) => {
          return item.tp_id === tpid && item.package_status === "started";
        });

        console.log(filterForGoingTp);
        if (filterForPendingTp.length > 0) {
          navigate(`/TreatmentDashBoard/${tpid}/${appointId}`);
        } else if (filterForGoingTp.length > 0) {
          const appointFilter = appointments?.filter((tad) => {
            return tad.appoint_id === appointId;
          });
          navigate(appointFilter[0]?.current_path);
        } else {
          navigate(`/examination-Dashboard/${appointId}/${uhid}`);
        }
        window.scrollTo(0, 0);
      }
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/appointtreatSitting?date=${selectedDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data.result);
      setFilterTableData(res.data.result);
      // setSelectedActions({ ...selectedActions, [appointId]: action });
    } catch (error) {
      // setLoading(false);
      // console.error("Error updating appointment status:", error.message);
    }
  };

  console.log(filteredData);

  const handleSearch = (e) => {
    setkeyword(e.target.value);
  };

  const trimmedKeyword = keyword.trim().toLowerCase();
  console.log(trimmedKeyword);

  return (
    <Wrapper>
      <div className="container-fluid pt-4">
        <div className="widget-area-2 proclinic-box-shadow" id="tableres">
          <div className="mb-3 widget-header appointMain">
            <div className="row">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                {" "}
                <h5 className="widget-title m-0 pt-2" id="title">
                  Current Appointment : Total - {filteredData.length}
                </h5>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                {" "}
                <div className="d-flex justify-content-center align-items-center">
                  <div className="pt-2">
                    <FaArrowCircleLeft
                      // style={{ fontSize: "35px", cursor: "pointer" }}
                      className="arrow"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDateChange(-1)}
                    />
                  </div>
                  <input
                    type="date"
                    className="form-control inputDate mx-2"
                    value={selectedDate}
                    style={{ cursor: "pointer" }}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <div className="pt-1">
                    <FaArrowCircleRight
                      // style={{ fontSize: "35px", cursor: "pointer" }}
                      className="arrow"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDateChange(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="d-flex justify-content-end align-items-center">
                  <h5>Search Patient :</h5>
                  <input
                    type="text"
                    placeholder="Search Name or Number"
                    className=" mx-1 p-1 rounded searchint"
                    value={keyword}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
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
                            ?.includes(trimmedKeyword) ||
                          val.mobileno?.includes(trimmedKeyword)
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
                          <td>
                            {item.treatment_names === null
                              ? item.treatment_provided
                              : item.treatment_names}
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
                                      {/* <li>
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
                                      </li> */}
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
                        <>
                          {filteredData
                            ?.filter((val) => {
                              if (keyword === "") {
                                return true;
                              } else if (
                                val.patient_name
                                  ?.toLowerCase()
                                  .includes(trimmedKeyword) ||
                                val.mobileno?.includes(trimmedKeyword)
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
                                  <small>
                                    {item.treatment_provided !== "OPD"
                                      ? item.treatment_names === null
                                        ? item.treatment_provided
                                        : item.treatment_names
                                      : item.treatment_provided}
                                  </small>
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
                                    {item.appointment_status === "Complete" ||
                                    item.appointment_status === "Check Out" ||
                                    item.appointment_status === "Appoint" ? (
                                      <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        disabled
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        Action
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        Action
                                      </button>
                                    )}

                                    {/* Option 1 */}
                                    <ul className="dropdown-menu">
                                      {item.appointment_status !== "Complete" &&
                                        item.appointment_status !==
                                          "Check Out" &&
                                        item.appointment_status !==
                                          "Appoint" && (
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
                                            {/* <li>
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
                                          </li> */}
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
                        </>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <hr />
                  <h5>No Appointments Today</h5>
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

  .widget-header {
    h5 {
      @media screen and (min-width: 750px) and (max-width: 850px) {
        font-size: 10px;
      }
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
        font-size: 10px;
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

  .searchint {
    width: 100%;
    @media screen and (min-width: 851px) and (max-width: 1024px) {
      width: 50% !important;
    }
  }
`;
