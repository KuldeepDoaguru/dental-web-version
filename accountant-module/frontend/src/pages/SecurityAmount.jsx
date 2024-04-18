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
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [patData, setPatData] = useState([]);
  const [securityList, setSecurityList] = useState([]);
  const [refAmount, setRefAmount] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showEditSecAmount, setShowEditSecAmount] = useState(false);
  const [showPaySecAmount, setShowPaySecAmount] = useState(false);
  const [outStanding, setOutStanding] = useState([]);
  const [selected, setSelected] = useState();
  // const [refAmount, setRefAmount] = useState();
  const [addSecurityAmount, setAddSecurityAmount] = useState({
    branch_name: user.branch,
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

  const date = new Date();
  console.log(date);

  const [refund, setRefund] = useState({
    refund_date: date,
    refund_by: user.name,
    payment_status: "Refunded",
  });

  const [data, setData] = useState({
    payment_status: "Success",
    payment_Mode: "",
    transaction_Id: "",
    notes: "",
    received_by: user.name,
  });
  console.log(data);

  const handlePaySecChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  console.log(data);

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

  console.log(refund);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setRefund({ ...refund, [name]: value !== "" ? parseFloat(value) : "" });
  // };

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
        `http://localhost:8888/api/v1/accountant/getSecurityAmountDataByBranch/${user.branch}`
      );
      setSecurityList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const makePaymentNow = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8888/api/v1/accountant/updateSecurityAmount/${id}`
      );
      getSecurityAmountList();
    } catch (error) {
      console.log(error);
    }
  };

  const openSecAmountSubPopup = (id) => {
    setShowEditSecAmount(true);
    getTotaloutstanding(id);
    setSelected(id);
  };

  const closeUpdatePopup = () => {
    setShowEditSecAmount(false);
    setShowPaySecAmount(false);
  };

  const openSecurityAmtPay = (id) => {
    setShowPaySecAmount(true);
    setSelected(id);
  };

  useEffect(() => {
    getSecurityAmountList();
  }, []);

  console.log(securityList);
  console.log(selected);
  // alert(selected);

  const filterForSecAmountDef = securityList.filter((item) => {
    return item.sa_id === selected;
  });

  console.log(filterForSecAmountDef);

  const getTotaloutstanding = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getSecurityAmountDataBySID/${id}`
      );
      console.log(data);
      setOutStanding(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(outStanding);
  const filterForOut = outStanding?.filter((item) => {
    return item.payment_status !== "success";
  });

  console.log(filterForOut);

  const totalPrice = () => {
    try {
      let total = 0;
      filterForOut.forEach((item) => {
        total = total + parseFloat(item.total_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalValue = totalPrice();
  console.log(totalValue);

  const MakeRefund = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8888/api/v1/accountant/updateRefundAmount/${selected}`,
        {
          refund_date: date,
          refund_by: user.name,
          payment_status: "Refunded",
          refund_amount: refAmount,
        }
      );
      cogoToast.success("Amount Refunded Successfully");
      getSecurityAmountList();
      closeUpdatePopup();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(refAmount);

  const makeRefData = () => {
    if (outStanding.length === 0) {
      return filterForSecAmountDef[0]?.amount;
    } else {
      return outStanding[0]?.amount - totalValue;
    }
  };

  const amtRefund = makeRefData();
  console.log(amtRefund);
  useEffect(() => {
    setRefAmount(amtRefund);
  }, [amtRefund]);

  const paySecurityCash = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8888/api/v1/accountant/updatePatientSecurityAmt/${selected}`,
        data
      );
      cogoToast.success("Amount Paid Successfully");
      getSecurityAmountList();
      closeUpdatePopup();
    } catch (error) {
      console.log(error);
    }
  };

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
                  <h2 className="text-center mt-5">Security Amount Details</h2>
                  <hr />
                  {/* <form action="" className="" onSubmit={insertSecurityAmount}>
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
                  <hr /> */}
                  <div className="container-fluid">
                    <div>
                      <label>search by patient name :</label>
                      <input
                        type="text"
                        placeholder="search by patient name"
                        className="mx-3 p-1 rounded"
                        value={keyword}
                        onChange={(e) =>
                          setKeyword(e.target.value.toLowerCase())
                        }
                      />
                    </div>
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
                            <th>Action</th>
                            <th>Print</th>
                          </tr>
                        </thead>
                        <tbody>
                          {securityList
                            ?.filter((val) => {
                              if (keyword === "") {
                                return true;
                              } else if (
                                val.patient_name
                                  .toLowerCase()
                                  .includes(keyword.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((item) => (
                              <>
                                <tr className="table-row">
                                  <td>{item.date.split("T")[0]}</td>
                                  <td>{item.appointment_id}</td>
                                  <td>{item.uhid}</td>
                                  <td>{item.patient_name}</td>
                                  <td>{item.patient_number}</td>
                                  <td>{item.assigned_doctor}</td>
                                  <td>{item.amount}</td>
                                  <td>{item.payment_Mode}</td>
                                  <td>{item.transaction_Id}</td>
                                  <td>
                                    <div className="d-flex">
                                      <h6>{item.payment_status}</h6>
                                      {item.payment_status === "Pending" ? (
                                        <>
                                          <button
                                            className="mx-2 btn btn-info"
                                            onClick={() =>
                                              openSecurityAmtPay(item.sa_id)
                                            }
                                          >
                                            Pay now
                                          </button>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    <button
                                      className={`mx-2 btn btn-warning ${
                                        item.payment_status === "Pending"
                                          ? "disabled"
                                          : ""
                                      } `}
                                      onClick={() =>
                                        openSecAmountSubPopup(item.sa_id)
                                      }
                                    >
                                      Make Refund
                                    </button>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/security-amount-reciept/${item.sa_id}`}
                                    >
                                      <button className="btn btn-success">
                                        Print
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ***************************************************************************************************** */}

          {/* pop-up for refund amount */}
          <div
            className={`popup-container${showEditSecAmount ? " active" : ""}`}
          >
            <div className="popup">
              <h4 className="text-center">Refund Amount</h4>
              <hr />
              <form className="d-flex flex-column" onSubmit={MakeRefund}>
                <div className="container">
                  <div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Security Amount Submitted -{" "}
                        {outStanding.length === 0
                          ? filterForSecAmountDef[0]?.amount
                          : outStanding[0]?.amount}
                      </label>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Total Outstanding - {totalValue}
                      </label>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Refund Amount :
                        {outStanding.length === 0
                          ? filterForSecAmountDef[0]?.amount
                          : outStanding[0]?.amount - totalValue}
                      </label>
                      {/* <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter Amount"
                        name="refund_amount"
                        value={
                          outStanding.length === 0
                            ? filterForSecAmountDef[0]?.amount
                            : outStanding[0]?.amount - totalValue
                        }
                        onChange={handleInputChange}
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success mt-2">
                    Refund
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 mx-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for refund amount */}
          {/* ************************************************************************************* */}

          {/* ***************************************************************************************************** */}

          {/* pop-up for Pay security amount */}
          <div
            className={`popup-container${showPaySecAmount ? " active" : ""}`}
          >
            <div className="popup">
              <h4 className="text-center">Pay Security Amount</h4>
              <hr />
              <form className="d-flex flex-column" onSubmit={paySecurityCash}>
                <div className="container">
                  <div>
                    <div class="mb-3">
                      <label className="form-label" htmlFor="">
                        Payment Mode
                      </label>
                      <select
                        className="form-select"
                        id="payment_Mode"
                        name="payment_Mode"
                        value={data.payment_Mode}
                        required
                        onChange={handlePaySecChange}
                      >
                        <option value="">Select</option>
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                      </select>
                    </div>

                    {data.payment_Mode === "online" && (
                      <div class="mb-3">
                        <label className="form-label" for="form6Example1">
                          Transaction Id
                        </label>
                        <input
                          type="text"
                          id="form6Example1"
                          className="form-control"
                          name="transaction_Id"
                          onChange={handlePaySecChange}
                          value={data.transaction_Id}
                          required
                        />
                      </div>
                    )}

                    <div class="mb-3">
                      <label className="form-label" for="form6Example1">
                        Notes
                      </label>
                      <input
                        type="text"
                        id="form6Example1"
                        className="form-control"
                        name="notes"
                        onChange={handlePaySecChange}
                        value={data.notes}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success mt-2">
                    Pay
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 mx-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for Pay security amount */}
          {/* ************************************************************************************* */}
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
      white-space: nowrap;
    }
    td {
      white-space: nowrap;
    }
  }

  button {
    white-space: nowrap;
  }

  .btnbox {
    margin-top: 2rem;
  }

  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: scroll;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    height: auto;
    width: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
