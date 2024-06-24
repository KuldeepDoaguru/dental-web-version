import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeadBar from "../../components/Doctor/HeadBar";
import Sider from "../../components/Doctor/SideBar";
import Lottie from "react-lottie";
import { IoMdArrowRoundBack } from "react-icons/io";
import animationData from "../../animation/loading-effect.json";
import axios from "axios";
import { useSelector } from "react-redux";
import cogoToast from "cogo-toast";

const PrescriptionDetails = () => {
  const [loading, setLoading] = useState(false);
  const { refreshTable } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  console.log(user.currentUser.token);
  const branch = user.currentUser.branch_name;
  const token = user.currentUser.token;
  const doctorId = user.currentUser.employee_ID;
  const [presData, setPresData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState(false);
  const [patName, setPatName] = useState("");

  const differenceError = () => {
    const from = new Date(fromDate).getTime();
    const to = new Date(toDate).getTime();
    const differenceInMilliseconds = to - from;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    if (differenceInDays >= 30) {
      setError(true);
      cogoToast.error(
        "The difference between the dates should be less than 30 days"
      );
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    differenceError();
  }, [toDate, fromDate]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getPrescriptrionData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/prescriptionList/${branch}/${doctorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setPresData(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrescriptrionData();
  }, []);

  console.log(presData);

  const patientUniqueNames = [
    ...new Set(presData?.map((item) => item.patient_name)),
  ];

  console.log(patientUniqueNames);

  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <Container>
        <HeadBar />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">{<Sider />}</div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <div className="container-fluid">
                    <button className="btn btn-success" onClick={goBack}>
                      <IoMdArrowRoundBack /> Back
                    </button>
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Prescription Report</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container">
                        <div class="mt-4">
                          <div className="">
                            <form>
                              <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                  <div className="d-flex justify-content-start align-items-center">
                                    <div>
                                      <input
                                        type="date"
                                        name=""
                                        id=""
                                        required
                                        className="p-2 rounded"
                                        onChange={(e) =>
                                          setFromDate(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="mx-2">To</div>
                                    <div>
                                      <input
                                        type="date"
                                        name=""
                                        id=""
                                        required
                                        className="p-2 rounded"
                                        onChange={(e) =>
                                          setToDate(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="d-flex flex-column">
                                      {presData.length === 0 ? (
                                        <button
                                          className="btn btn-warning mx-2"
                                          type="submit"
                                          disabled
                                        >
                                          Download Report
                                        </button>
                                      ) : (
                                        <button
                                          className="btn btn-warning mx-2"
                                          type="submit"
                                          disabled={error}
                                        >
                                          Download Report
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                  <div className="d-flex justify-content-end align-items-center">
                                    <h5 className="w-100 text-end">
                                      Sort By Patient Name :{" "}
                                    </h5>
                                    <select
                                      className="form-select mx-1"
                                      value={patName}
                                      onChange={(e) =>
                                        setPatName(e.target.value)
                                      }
                                    >
                                      <option value="">-select patient-</option>
                                      {patientUniqueNames?.map((item) => (
                                        <>
                                          <option value={item}>{item}</option>
                                        </>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="mt-3">
                            {loading ? (
                              <Lottie
                                options={defaultOptions}
                                height={300}
                                width={400}
                                style={{ background: "transparent" }}
                              ></Lottie>
                            ) : (
                              <>
                                <div class="table-responsive rounded">
                                  <table class="table table-bordered rounded shadow">
                                    <thead className="table-head">
                                      <tr>
                                        <th className="table-sno sticky">
                                          Appointment ID
                                        </th>
                                        <th className="sticky">Patient UHID</th>

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
                                          Appointment Date & Time
                                        </th>
                                        <th className="table-small sticky">
                                          Treatment
                                        </th>
                                        <th className="table-small sticky">
                                          Sitting Number
                                        </th>
                                        <th className="table-small sticky">
                                          View Prescription
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {presData
                                        ?.filter((item) => {
                                          const billDate =
                                            item.appointment_dateTime?.split(
                                              "T"
                                            )[0];
                                          if (fromDate && toDate) {
                                            return (
                                              billDate >= fromDate &&
                                              billDate <= toDate
                                            );
                                          } else {
                                            return true;
                                          }
                                        })
                                        .filter((item) => {
                                          if (patName) {
                                            return (
                                              item.patient_name === patName
                                            );
                                          } else {
                                            return true;
                                          }
                                        })
                                        .map((item) => (
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
                                                {
                                                  item.appointment_dateTime?.split(
                                                    "T"
                                                  )[0]
                                                }{" "}
                                                {
                                                  item.appointment_dateTime?.split(
                                                    "T"
                                                  )[1]
                                                }
                                              </td>
                                              <td>{item.dental_treatment}</td>
                                              <td>{item.sitting_number}</td>
                                              <td>
                                                <button className="btn btn-success">
                                                  View Prescription
                                                </button>
                                              </td>
                                            </tr>
                                          </>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrescriptionDetails;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  .table-responsive {
    height: 30rem;
  }

  th {
    background-color: #0dcaf0;
    color: white;
  }
  .sticky {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1;
  }
`;
