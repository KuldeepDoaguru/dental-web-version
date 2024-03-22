import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sider from "../components/Sider";
import BranchDetails from "../components/BranchDetails";
import MakeRefund from "../components/btModal/MakeRefund";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";

const SecurityAmount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [patData, setPatData] = useState([]);
  const [securityList, setSecurityList] = useState([]);
  const [addSecurityAmount, setAddSecurityAmount] = useState({
    branch_name: branch.name,
    date: "",
    appointment_id: "",
    uhid: "",
    patient_name: "",
    patient_number: "",
    assigned_doctor: "",
    amount: "",
    payment_status: "",
    received_by: user.name,
  });

  const handleInput = async (event) => {
    const { name, value } = event.target;
    if (name === "appointment_id") {
      try {
        const { data } = await axios.get(
          `http://localhost:8888/api/v1/accountant/getAppointmentDetailsViaID/${value}`
        );
        console.log(data);
        if (data) {
          setAddSecurityAmount((prevData) => ({
            ...prevData,
            uhid: data[0]?.patient_uhid,
            patient_name: data[0]?.patient_name,
            patient_number: data[0]?.mobileno,
            assigned_doctor: data[0]?.assigned_doctor_name,
            appointment_id: value,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // For other input fields, update the state as before
      setAddSecurityAmount((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  console.log(addSecurityAmount);

  const insertSecurityAmount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/api/v1/accountant/addSecurityAmount",
        addSecurityAmount
      );
      console.log(response);
      cogoToast.success("Security Amount Submitted Successfully");
    } catch (error) {
      console.log(error);
      cogoToast.success("failed to submit security amount");
    }
  };

  const getSecurityAmountList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getSecurityAmountDataByBranch/${branch.name}`
      );
      setSecurityList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSecurityAmountList();
  }, []);

  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>

              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <BranchDetails />
                <div className="container">
                  <h2 className="text-center mt-5">Submit Security Amount</h2>
                  <hr />
                  <form action="" className="" onSubmit={insertSecurityAmount}>
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
                              type="date"
                              class="p-1 w-100 rounded"
                              placeholder="appointment ID"
                              name="date"
                              required
                              value={addSecurityAmount.date}
                              onChange={handleInput}
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
                              name="appointment_id"
                              value={addSecurityAmount.appointment_id}
                              onChange={handleInput}
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
                              value={addSecurityAmount.uhid}
                              onChange={handleInput}
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
                              value={addSecurityAmount.patient_name}
                              onChange={handleInput}
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
                              value={addSecurityAmount.patient_number}
                              onChange={handleInput}
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
                              value={addSecurityAmount.assigned_doctor}
                              onChange={handleInput}
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
                              value={addSecurityAmount.amount}
                              onChange={handleInput}
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
                            {/* <input
                              type="number"
                              class="p-1 w-100 rounded"
                              placeholder="Payment Status"
                              name="payment_status"
                              value={addSecurityAmount.payment_status}
                              onChange={handleInput}
                            /> */}

                            <select
                              name="payment_status"
                              onChange={handleInput}
                              id=""
                              class="p-1 w-100 rounded"
                            >
                              <option value="">select-status</option>
                              <option value="pending">Pending</option>
                              <option value="success">Success</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                          <button
                            className="btn btn-info btnbox fw-bold shadow p-1 w-100 rounded"
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
                          <tr className="table-row">
                            <td>07/04/2024</td>
                            <td>1</td>
                            <td>DHID007</td>
                            <td>Shubham Singh</td>
                            <td>8602161019</td>
                            <td>Mohit sahu</td>
                            <td>8000</td>
                            <td>Success</td>
                            <td>
                              <MakeRefund />
                            </td>
                            <td>
                              <Link to="/security-amount-reciept">
                                <button className="btn btn-success">
                                  Print
                                </button>
                              </Link>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td>07/04/2024</td>
                            <td>1</td>
                            <td>DHID007</td>
                            <td>Shubham Singh</td>
                            <td>8602161019</td>
                            <td>Mohit sahu</td>
                            <td>8000</td>
                            <td>Success</td>
                            <td>
                              <MakeRefund />
                            </td>
                            <td>
                              <Link to="/security-amount-reciept">
                                <button className="btn btn-success">
                                  Print
                                </button>
                              </Link>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td>07/04/2024</td>
                            <td>1</td>
                            <td>DHID007</td>
                            <td>Shubham Singh</td>
                            <td>8602161019</td>
                            <td>Mohit sahu</td>
                            <td>8000</td>
                            <td>Success</td>
                            <td>
                              <MakeRefund />
                            </td>
                            <td>
                              <Link to="/security-amount-reciept">
                                <button className="btn btn-success">
                                  Print
                                </button>
                              </Link>
                            </td>
                          </tr>
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
      background-color: #201658;
      color: white;
    }
  }

  .btnbox {
    margin-top: 2rem;
  }
`;
