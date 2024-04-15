import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import cogoToast from "cogo-toast";
import Sider from "../SideBar";
import HeadBar from "../HeadBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTableRefresh } from "../../../redux/user/userSlice";
import SecurityAmtUpdateModal from "./SecurityAmtUpdateModal";

const SecurityAmount = () => {
  const { id, tpid } = useParams();
  console.log(id);
  console.log(tpid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState();
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [securityAmt, setSecurityAmt] = useState([]);
  // const [getPatientData, setGetPatientData] = useState([]);
  const [treatList, setTreatList] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { refreshTable } = useSelector((state) => state.user);
  const branch = currentUser.branch_name;
  console.log(branch);
  const [formData, setFormData] = useState({
    tp_id: tpid,
    branch_name: currentUser ? currentUser.branch_name : "",
    appointment_id: id,
    uhid: "",
    patient_name: "",
    patient_number: "",
    treatment: "",
    assigned_doctor: currentUser ? currentUser.employee_name : "",
    amount: "",
    payment_status: "",
    payment_Mode: "",
    transaction_Id: "",
    payment_date: "",
    received_by: currentUser ? currentUser.employee_name : "",
  });

  console.log(formData);

  const newGetFetchData = async () => {
    try {
      const resps = await axios.get(
        `http://localhost:8888/api/doctor/patient-security/${id}/${branch}`
      );
      const { patient_name, uhid, treatment_name, mobileno, totalCost } =
        resps.data.result[0];
      console.log(resps.data.result);
      setFormData({
        ...formData,
        uhid,
        patient_name,
        patient_number: mobileno,
        // treatment: treatment_name,
        // amount: totalCost,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newGetFetchData();
  }, []);

  const getListTreatment = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getTreatList/${branch}/${tpid}`
      );
      console.log(data);
      setTreatList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListTreatment();
  }, [refreshTable]);

  const totalTreatSuggest = () => {
    try {
      let total = 0;
      treatList.forEach((item) => {
        total = total + parseFloat(item.totalCost);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  console.log(treatList);

  const grandTotal = totalTreatSuggest();

  console.log(grandTotal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    // If payment status changes to "success", set the current date
    if (name === "payment_status" && value === "success") {
      updatedFormData = {
        ...updatedFormData,
        payment_date: new Date().toISOString().slice(0, 10), // Set the current date in YYYY-MM-DD format
      };
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertCorrectData();
      alert("Security Amount Added");
      setFormData({
        // branch_name: "",
        date: "",
        appointment_id: id,
        // uhid: '',
        // patient_name: '',
        // patient_number: '',
        assigned_doctor: currentUser ? currentUser.employee_name : "",
        // amount: "",
        payment_status: "",
        payment_Mode: "",
        transaction_Id: "",
        received_by: currentUser ? currentUser.employee_name : "",
      });
    } catch (error) {
      console.error("Error submitting security amount:", error);
      alert("An error occurred while submitting security amount");
    }
  };

  const timelineForSecuirty = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8888/api/doctor/insertTimelineEvent",
        {
          type: "Secuirty Amount",
          description: "Secuirty Amount Added",
          branch: currentUser ? currentUser.branch_name : "",
          patientId: formData.uhid,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const insertCorrectData = async () => {
    try {
      const formsCorrect = {
        tp_id: tpid,
        branch_name: formData.branch_name,
        appointment_id: id,
        uhid: formData.uhid,
        patient_name: formData.patient_name,
        patient_number: formData.patient_number,
        treatment: formData.treatment,
        assigned_doctor: formData.assigned_doctor,
        amount: formData.amount,
        remaining_amount: formData.amount,
        payment_status: formData.payment_status,
        payment_Mode: formData.payment_Mode,
        transaction_Id: formData.transaction_Id,
        payment_date: formData.payment_date,
        received_by: formData.received_by,
      };

      const resp = await axios.post(
        `http://localhost:8888/api/doctor/addSecurityAmount`,
        formsCorrect
      );

      console.log(resp.data);
      timelineForSecuirty();
      dispatch(toggleTableRefresh());
    } catch (error) {
      console.log(error);
    }
  };

  const getSecurityAmt = async () => {
    try {
      const resdata = await axios.get(
        `http://localhost:8888/api/doctor/getSecurityAmountByAppointmentId/${tpid}`
      );
      setSecurityAmt(resdata.data.data);
      console.log(resdata.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSecurityAmt();
  }, [refreshTable]);

  // const handleUpdate = async (e, sa_id) => {
  //   e.preventDefault();

  //   const { refundDate, refundAmount } = updateRefund;

  //   const updatedata = {
  //     refund_by: currentUser ? currentUser.employee_name : "",
  //     refund_date: refundDate,
  //     refund_amount: refundAmount
  //   };

  //   try {
  //     const response = await axios.put(`http://localhost:8888/api/doctor/update-security-amount/${sa_id}`, updatedata);

  //     console.log(response.data);

  //     setUpdateRefund({
  //       refundDate: "",
  //       refundAmount: ""
  //     });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handlePrint = (sa_id) => {
  //   navigate(`/print-security-bill/${sa_id}`)
  // };

  const handleChangePage = () => {
    navigate(`/TreatmentDashBoard/${tpid}`);
  };

  const openSecurityAmountEdit = (item) => {
    setShowEditPopup(true);
    setSelectedData(item);
  };

  return (
    <>
      <Container>
        <HeadBar />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <div className="container">
                  <h2 className="text-center mt-5">Submit Security Amount</h2>
                  <hr />
                  {securityAmt.length > 0 ? (
                    ""
                  ) : (
                    <>
                      <form action="" className="" onSubmit={handleSubmit}>
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Treatment Package ID
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="Treatment"
                                  name="date"
                                  required
                                  value={tpid}
                                  onChange={handleChange}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Appointment ID
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="appointment ID"
                                  id="appointment_id"
                                  name="appointment_id"
                                  value={formData.appointment_id}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label rounded"
                                >
                                  UHID
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="UHID"
                                  name="uhid"
                                  value={formData.uhid}
                                  onChange={handleChange}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Patient Name
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="Patient Name"
                                  name="patient_name"
                                  value={formData.patient_name}
                                  onChange={handleChange}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Patient Mobile
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="Patient Number"
                                  name="patient_number"
                                  value={formData.patient_number}
                                  onChange={handleChange}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Assigned Doctor
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="Patient Name"
                                  name="assigned_doctor"
                                  value={formData.assigned_doctor}
                                  onChange={handleChange}
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Security Amount
                                </label>
                                <input
                                  type="number"
                                  class="p-1 w-100 rounded"
                                  placeholder="Security Amount"
                                  name="amount"
                                  required
                                  value={formData.amount}
                                  onChange={handleChange}
                                />
                                <small style={{ color: "red" }}>
                                  *Suggested Security Amount : {grandTotal}
                                </small>
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Payment Status
                                </label>

                                <select
                                  name="payment_status"
                                  value={formData.payment_status}
                                  onChange={handleChange}
                                  id=""
                                  class="p-1 w-100 rounded"
                                  required
                                >
                                  <option value="">select-status</option>
                                  <option value="pending">Pending</option>
                                  <option value="success">Success</option>
                                </select>
                              </div>
                            </div>
                            {formData.payment_status === "success" && (
                              <>
                                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                                  <div className="input-group mb-3">
                                    <label
                                      htmlFor="exampleFormControlInput2"
                                      className="form-label"
                                    >
                                      Payment Method
                                    </label>
                                    <select
                                      name="payment_Mode"
                                      value={formData.payment_Mode}
                                      onChange={handleChange}
                                      className="p-1 w-100 rounded"
                                      required
                                    >
                                      <option value="">
                                        Select Payment Method
                                      </option>
                                      <option value="cash">Cash</option>
                                      <option value="online">Online</option>
                                    </select>
                                  </div>
                                </div>
                                {formData.payment_Mode === "online" && (
                                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                                    <div className="input-group mb-3">
                                      <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label mx-2"
                                      >
                                        Transaction ID
                                      </label>
                                      <br />
                                      <input
                                        type="text"
                                        name="transaction_Id"
                                        value={formData.transaction_Id}
                                        onChange={handleChange}
                                        className="p-1 w-100 rounded"
                                        placeholder="Enter Transaction ID"
                                        required
                                      />
                                    </div>
                                  </div>
                                )}
                              </>
                            )}

                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <button
                                className="btn btn-primary text-light btnbox fw-bold shadow p-1 w-100 rounded"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <hr />
                    </>
                  )}

                  <div className="container-fluid">
                    <div class="table-responsive mt-4">
                      <table class="table table-bordered">
                        <thead className="table-head">
                          <tr>
                            <th>Date</th>
                            <th>Appointment ID</th>
                            <th>UHID</th>
                            <th>Patient Name</th>
                            <th>Patient Number</th>
                            <th>Assigned Doctor</th>
                            <th>Security Amount</th>
                            <th>Payment Mode</th>
                            <th>Transaction Id</th>
                            <th>Payment Status</th>
                            <th>Print</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {securityAmt.map((item, index) => (
                            <tr className="table-row" key={index}>
                              <td>{item.date}</td>
                              <td>{item.appointment_id}</td>
                              <td>{item.uhid}</td>
                              <td>{item.patient_name}</td>
                              <td>{item.patient_number}</td>
                              <td>{item.assigned_doctor}</td>
                              <td>{item.amount}</td>
                              <td>{item.payment_Mode}</td>
                              <td>{item.transaction_Id}</td>
                              <td>{item.payment_status}</td>
                              <td>
                                {" "}
                                {item.payment_status === "success" ? (
                                  <Link
                                    to={`/print-security-bill/${item.sa_id}/${tpid}`}
                                  >
                                    {" "}
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                    >
                                      Print
                                    </button>{" "}
                                  </Link>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled
                                  >
                                    Print
                                  </button>
                                )}{" "}
                              </td>
                              <td>
                                <button
                                  className="btn btn-info"
                                  onClick={() => openSecurityAmountEdit(item)}
                                >
                                  Update
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-info text-light"
                    onClick={handleChangePage}
                  >
                    Start Treatment
                  </button>
                </div>
                {showEditPopup && (
                  <SecurityAmtUpdateModal
                    onClose={() => setShowEditPopup(false)}
                    selectedData={selectedData}
                    grandTotal={grandTotal}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SecurityAmount;
const Container = styled.div`
  .table-head {
    th {
      background-color: #0dcaf0;
      color: white;
    }
  }

  .btnbox {
    margin-top: 2rem;
  }
`;
