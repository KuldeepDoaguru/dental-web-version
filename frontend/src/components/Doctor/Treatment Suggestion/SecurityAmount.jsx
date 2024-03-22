import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import cogoToast from "cogo-toast";
import Sider from "../SideBar";
import HeadBar from "../HeadBar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSlice";

const SecurityAmount = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [getPatientData, setGetPatientData] = useState();
  const [getTSData, setGetTStData] = useState();
  const [securityAmt, setSecurityAmt] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    branch_name: "",
    date: "",
    appointment_id: id,
    uhid: "",
    patient_name: "",
    patient_number: "",
    assigned_doctor: currentUser ? currentUser.employee_name : "",
    amount: "",
    payment_status: "",
    received_by: currentUser ? currentUser.employee_name : "",
  });

  console.log(formData);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${id}`
      );
      //   const { mobileno, uhid, patient_name } = res.data.result;
      //   setFormData({
      //     ...formData,
      //     uhid,
      //     patient_name,
      //     patient_number: mobileno, // Assuming mobileno is equivalent to patient_number
      //   });
      if (Array.isArray(res.data.result) && res.data.result.length > 0) {
        const { patient_name, uhid, mobileno } = res.data.result[0]; // Extract values from the first element of the array
        setFormData({
          ...formData,
          uhid,
          patient_name,
          patient_number: mobileno,
        });
        console.log(res.data.result[0]);
        setGetPatientData(res.data.result[0]);
      } else {
        console.log("No data received from the API");
      }
      console.log(res.data.result);
      setGetPatientData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchTreatSuggest = async () => {
    try {
      const resps = await axios.get(
        `http://localhost:8888/api/doctor/getTreatSuggestById/${id}`
      );
    //   const { totalCost } = resps.data.data;
    //   setFormData({
    //     ...formData,
    //     amount: totalCost,
    //   });
    //   console.log(resps.data.data);
    //   setGetTStData(resps.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTreatSuggest();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertCorrectData();
      alert("Security Amount Submitted Successfully");
      setFormData({
        branch_name: "",
        date: "",
        appointment_id: id,
        // uhid: '',
        // patient_name: '',
        // patient_number: '',
        assigned_doctor: currentUser ? currentUser.employee_name : "",
        // amount: "",
        payment_status: "",
        received_by: currentUser ? currentUser.employee_name : "",
      });
    } catch (error) {
      console.error("Error submitting security amount:", error);
      alert("An error occurred while submitting security amount");
    }
  };

  const insertCorrectData = async () => {
    try {
      const formsCorrect = {
        branch_name: "",
        date: formData.date,
        appointment_id: id,
        uhid: formData.uhid,
        patient_name: formData.patient_name,
        patient_number: formData.patient_number,
        assigned_doctor: formData.assigned_doctor,
        amount: formData.amount,
        payment_status: formData.payment_status,
        received_by: formData.received_by,
      };

      const resp = await axios.post(
        `http://localhost:8888/api/doctor/addSecurityAmount`,
        formsCorrect
      );

      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSecurityAmt = async () =>{
    try {
        const resdata = await axios.get(`http://localhost:8888/api/doctor/getSecurityAmountByAppointmentId/${id}`);
        setSecurityAmt(resdata.data.data);
        console.log(resdata.data.data);
     } catch (error) {
        console.log(error);
    }
  };

  useEffect(()=>{
    getSecurityAmt();
  }, []);

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
                  <form action="" className="" onSubmit={handleSubmit}>
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                          <div class="input-group mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Date
                            </label>
                            <input
                              type="datetime-local"
                              class="p-1 w-100 rounded"
                              placeholder="appointment ID"
                              name="date"
                              required
                              value={formData.date}
                              onChange={handleChange}
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
                            <th>Payment Status</th>
                            <th>Refund</th>
                            <th>Print</th>
                          </tr>
                        </thead>
                        <tbody>
                            {securityAmt.map((item, index)=>(
                          <tr className="table-row" key={index}>
                            <td>{item.date}</td>
                            <td>{item.appointment_id}</td>
                            <td>{item.uhid}</td>
                            <td>{item.patient_name}</td>
                            <td>{item.patient_number}</td>
                            <td>{item.assigned_doctor}</td>
                            <td>{item.amount}</td>
                            <td>{item.payment_status}</td>
                            <td>{/* <MakeRefund /> */}</td>
                            <td>
                              <Link to="/security-amount-reciept">
                                <button className="btn btn-success">
                                  Print
                                </button>
                              </Link>
                            </td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
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
