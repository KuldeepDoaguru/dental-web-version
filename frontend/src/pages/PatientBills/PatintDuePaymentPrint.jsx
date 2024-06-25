import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import Header from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import cogoToast from "cogo-toast";
import HeadBar from "../../components/Doctor/HeadBar";

const PatintDuePaymentPrint = () => {
  const navigate = useNavigate();
  const { tpid } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  const userToken = useSelector((state) => state.user);
  const token = userToken.currentUser.token;
  console.log(token);
  console.log(user);
  const [branchData, setBranchData] = useState([]);
  const [billAmount, setBillAmount] = useState([]);
  const [saAmt, setSaAmt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getTreatData, setGetTreatData] = useState([]);
  const [data, setData] = useState({
    payment_mode: "",
    transaction_Id: "",
    note: "",
  });
  console.log(tpid);
  console.log(data);

  const goBack = () => {
    window.history.go(-1);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setData({ ...data, [name]: value });
  };

  const getBranchDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getBranchDetails/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setBranchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(branchData[0]?.hospital_name);

  const secuirtyAmtBytpuhid = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getSecurityAmountDataByTPUHID/${tpid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setSaAmt(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(saAmt);
  const getBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getPatientBillsAndSecurityAmountByBranch/${user.branch_name}/${tpid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBillAmount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTreatDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getTreatmentDetailsViaTpid/${tpid}/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGetTreatData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getTreatData);

  useEffect(() => {
    getBranchDetails();
    getBillDetails();
    secuirtyAmtBytpuhid();
    getTreatDetail();
  }, []);

  console.log(branchData);
  console.log(billAmount);

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const date = String(todayDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate);

  console.log(billAmount[0]?.paid_amount, billAmount[0]?.pay_by_sec_amt);
  console.log(billAmount[0]?.total_amount);

  const dueAmt =
    billAmount[0]?.total_amount -
    (billAmount[0]?.paid_amount + Number(billAmount[0]?.pay_by_sec_amt));

  let totalPaidAmount = 0;
  if (dueAmt >= 0) {
    if (
      dueAmt >= (saAmt[0]?.remaining_amount ? saAmt[0]?.remaining_amount : 0)
    ) {
      totalPaidAmount = saAmt[0]?.remaining_amount
        ? saAmt[0]?.remaining_amount
        : 0;
    } else {
      totalPaidAmount = dueAmt;
    }
  } else if (
    dueAmt <= (saAmt[0]?.remaining_amount ? saAmt[0]?.remaining_amount : 0)
  ) {
    totalPaidAmount = dueAmt;
  }

  const remainingSecurityAmount =
    (saAmt[0]?.remaining_amount ? saAmt[0]?.remaining_amount : 0) -
    totalPaidAmount;

  console.log(remainingSecurityAmount);

  // If dueAmt is negative, meaning there is an overpayment, we set totalPaidAmount to 0
  if (dueAmt < 0) {
    totalPaidAmount = 0;
  }

  const finalAmt = dueAmt - totalPaidAmount;
  console.log(dueAmt);
  console.log(finalAmt);

  console.log("Total Paid Amount:", totalPaidAmount);
  console.log("Remaining Security Amount:", remainingSecurityAmount);

  const updatedPay_by_sec_amt =
    billAmount[0]?.pay_by_sec_amt +
    ((saAmt[0]?.remaining_amount ? saAmt[0]?.remaining_amount : 0) -
      remainingSecurityAmount);

  const updatedPaidAmt = billAmount[0]?.paid_amount + finalAmt;
  console.log(updatedPaidAmt);

  const updateRemainingSecurity = async () => {
    console.log(remainingSecurityAmount);
    try {
      console.log(remainingSecurityAmount);
      const response = await axios.put(
        `https://dentalgurudoctor.doaguru.com/api/doctor/updateRemainingSecurityAmount/${tpid}`,
        {
          remaining_amount: remainingSecurityAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      cogoToast.success("update remaining Successfully amt");
      secuirtyAmtBytpuhid();
      console.log(remainingSecurityAmount);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(updatedPaidAmt, updatedPay_by_sec_amt);

  const upDueValAmount = () => {
    const gettea = updatedPaidAmt + updatedPay_by_sec_amt;
    if (gettea >= billAmount[0]?.due_amount) {
      return 0;
    } else {
      return (
        billAmount[0]?.due_amount - (updatedPaidAmt + updatedPay_by_sec_amt)
      );
    }
  };

  const callDue = upDueValAmount();
  console.log(callDue);

  const BillInput = {
    paid_amount: updatedPaidAmt,
    payment_status: "paid",
    payment_date_time: formattedDate,
    payment_mode: data.payment_mode,
    transaction_Id: data.transaction_Id,
    note: data.note,
    receiver_name: user.employee_name,
    receiver_emp_id: user.employee_ID,
    pay_by_sec_amt: updatedPay_by_sec_amt,
    due_amount: finalAmt,
  };

  console.log(BillInput);

  const makePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://dentalgurudoctor.doaguru.com/api/doctor/makeBillPayment/${tpid}/${user.branch_name}`,
        BillInput,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setLoading(false);
        cogoToast.success("payment successful");
        // completeTreatment();
        // secuirtyAmtBytpuhid();
        getBillDetails();
        console.log(response.data);
        updateRemainingSecurity();
        setData({
          payment_mode: "",
          transaction_Id: "",
          note: "",
        });
        // window.location.reload();

        // navigate(`/ViewPatientTotalBill/${tpid}`);
      } else {
        cogoToast.success("Failed to paid bill");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const contentToPrint =
      document.getElementById("printableContent").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = contentToPrint;

    window.print();
    window.location.reload();
    document.body.innerHTML = originalContent;
  };

  console.log(saAmt[0]?.remaining_amount);

  const completeTreatment = async () => {
    try {
      const res = await axios.put(
        `https://dentalgurudoctor.doaguru.com/api/doctor/updateTreatmentStatus/${user.branch_name}/${tpid}`,
        { finalStats: "completed" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      cogoToast.success("Treatment Completed");
      // navigate("/doctor-dashboard");
      navigate(`/ViewPatientTotalBill/${tpid}`);
    } catch (error) {
      console.log(error.response.data.message);
      cogoToast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Container>
        <HeadBar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <IoArrowBackSharp
                className="fs-1 mt-2 text-black"
                onClick={goBack}
              />
              <div className="row mt-5" id="printableContent">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="d-flex justify-content-center">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <div className="">
                        <div>
                          <h4>Branch : {branchData[0]?.branch_name}</h4>

                          <form className="d-flex ">
                            <h6>Addresh </h6>
                            <h6>: {branchData[0]?.branch_address}</h6>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <div className="d-flex justify-content-end">
                        <div>
                          <form className="d-flex">
                            {/* <h5>Email id : </h5> */}
                            <h3 className="">
                              {branchData[0]?.hospital_name.toUpperCase()}
                            </h3>
                          </form>

                          <form className="d-flex ">
                            <h4>Contact Number : </h4>
                            <h4> {branchData[0]?.branch_contact}</h4>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                    <div className="">
                      <div className="">
                        <div className="row mt-2 d-flex justify-content-between">
                          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-5">
                            <div class=" rounded mt-4">
                              <h4>PATIENT SUMMARY </h4>
                              <div className="d-flex ">
                                <h6>Patient Name </h6>
                                <h6 className="ms-1">
                                  {" "}
                                  : {billAmount[0]?.patient_name}{" "}
                                </h6>
                              </div>
                              <div className="d-flex">
                                <h6>Patient id </h6>
                                <h6 className="ms-1">
                                  {" "}
                                  : {billAmount[0]?.uhid}{" "}
                                </h6>
                              </div>
                              <div className="d-flex ">
                                <h6> Invoice Number </h6>
                                <h6 className="ms-1">
                                  {" "}
                                  : {billAmount[0]?.bill_id}{" "}
                                </h6>
                              </div>
                              <div className="d-flex">
                                <h6> Invoice Date </h6>
                                <h6 className="ms-1">
                                  {" "}
                                  : {
                                    billAmount[0]?.bill_date.split("T")[0]
                                  }{" "}
                                </h6>
                              </div>
                            </div>
                          </div>

                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <div class=" rounded d-flex justify-content-end mt-5">
                              <div class="card cardwid">
                                <div className="ms-4 mt-2">
                                  <h1> ₹{billAmount[0]?.total_amount}</h1>
                                  <h5 className="text-danger">
                                    Total Treatment Amount
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <form className="d-flex justify-content-center mt-4">
                      <h2> Due Payment Description</h2>
                    </form>

                    <hr className="mt-5" />
                  </div>
                </div>
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                  <div className="d-flex justify-content-center mt-4">
                    <div className="d-xxl-none d-xl-none d-lg-none col-md-1 col-sm-1"></div>
                    <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-10 col-sm-10">
                      <table class="table table-bordered shadow">
                        <thead class="table-primary  rounded">
                          <tr>
                            <th scope="col" className="desc-width">
                              Payment Details
                            </th>
                            <th scope="col" className="amount-width">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* <tr>
                            <td className="text-end"></td>
                            <td></td>
                          </tr> */}
                          <tr>
                            <td className="desc-width">
                              <h6>
                                <span class="spaces"></span>
                                Total Treatments Amount
                              </h6>
                            </td>

                            <td className="fw-bolder amount-width">
                              ₹{billAmount[0]?.total_amount}
                            </td>
                          </tr>
                          <tr>
                            <td className="desc-width">
                              <h6>
                                <span class="spaces"></span>Previous Paid By
                                Direct Amount
                              </h6>
                            </td>
                            <td className="fw-bolder amount-width">
                              ₹ {billAmount[0]?.paid_amount}
                            </td>
                          </tr>
                          <tr>
                            <td className="desc-width">
                              <h6>
                                <span class="spaces"></span>Previous Paid By
                                Secuirty Amount
                              </h6>
                            </td>
                            <td className="fw-bolder amount-width">
                              ₹ {billAmount[0]?.pay_by_sec_amt}
                            </td>
                          </tr>
                          <tr>
                            <td className="desc-width">
                              <h6>
                                <span class="spaces"></span>Total Due Amount
                              </h6>
                            </td>
                            <td className="fw-bolder amount-width">
                              ₹ {dueAmt}
                            </td>
                          </tr>
                          <tr>
                            <td className="desc-width">
                              <h6>
                                <span class="spaces"></span>
                                Remaining Secuirty Amount
                              </h6>
                            </td>

                            <td className="fw-bolder amount-width">
                              ₹
                              {saAmt[0]?.remaining_amount
                                ? saAmt[0]?.remaining_amount
                                : 0}
                            </td>
                          </tr>
                          <tr>
                            <td className="desc-width">
                              <h6>
                                <span class="spaces"></span>Refundable Amount
                              </h6>
                            </td>
                            <td className="fw-bolder amount-width">
                              ₹{remainingSecurityAmount}
                            </td>
                          </tr>
                          <tr>
                            <td className="desc-width">
                              <h6>
                                <span class="spaces"></span>Final Due Amount
                              </h6>
                            </td>
                            <td className="fw-bolder amount-width">
                              ₹{finalAmt}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* <div className="d-flex justify-content-between">
                        <h4 className="">Thank you </h4>
                        <h4 className="">Auth. signature</h4>
                      </div> */}
                    </div>
                    <div className="d-xxl-none d-xl-none d-lg-none col-md-1 col-sm-1"></div>
                  </div>
                </div>
              </div>

              <div>
                <div className="container d-flex justify-content-center mb-3">
                  {" "}
                  {dueAmt <= 0 ? (
                    <>
                      <button
                        type="button"
                        class="btn btn-primary hide-during-print text-white shadow"
                        style={{
                          backgroundColor: "#0dcaf0",
                          border: "#0dcaf0",
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Update Payment Details
                      </button>
                      {billAmount[0]?.payment_status === null ||
                      billAmount[0]?.payment_status === "pending" ? (
                        <button
                          type="button"
                          className="btn btn-warning ms-2 shadow"
                          disabled
                        >
                          Mark Treatment Complete
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-warning ms-2"
                          onClick={completeTreatment}
                        >
                          Mark Treatment Complete
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {finalAmt === 0 ? (
                        <>
                          <button
                            class="btn btn-primary hide-during-print"
                            onClick={makePayment}
                            disabled={loading}
                          >
                            {loading ? "Pay now..." : "Pay Now"}
                          </button>
                        </>
                      ) : (
                        <>
                          {" "}
                          <button
                            type="button"
                            class="btn btn-primary hide-during-print"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Pay Now
                          </button>
                        </>
                      )}
                    </>
                  )}
                  {/* <button
                    class="btn btn btn-success dum text-capitalize mx-2 hide-during-print"
                    onClick={handlePrint}
                  >
                    Print
                  </button> */}
                </div>
              </div>
            </div>
            <span className="text-danger fw-bold text-center mb-2">
              Note : Please Mark Treatment Completed After Payment
            </span>
          </div>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    class="modal-title fs-5 text-center"
                    id="exampleModalLabel"
                  >
                    {dueAmt <= 0
                      ? `Add Payment Details`
                      : `Do you want to make payment`}
                  </h1>
                </div>
                <div className="modal-body">
                  <form>
                    {dueAmt > 0 ? (
                      <>
                        {" "}
                        <div data-mdb-input-init class="form-outline mb-4">
                          <label class="form-label" for="form1Example1">
                            Due Amount
                          </label>
                          <input
                            name="note"
                            type="text"
                            id="form1Example2"
                            class="form-control"
                            value={finalAmt}
                            readOnly
                          />
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label" for="form1Example1">
                        Payment Mode
                      </label>
                      <select
                        name="payment_mode"
                        value={data.payment_mode}
                        onChange={(e) => handleChange(e)}
                        className="p-1 w-100 rounded"
                        required
                      >
                        <option value="" selected>
                          Select Payment Method
                        </option>
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                      </select>
                    </div>

                    {data.payment_mode === "online" && (
                      <div data-mdb-input-init class="form-outline mb-4">
                        <label class="form-label" for="form1Example2">
                          Transaction ID
                        </label>
                        <input
                          type="text"
                          id="form1Example2"
                          class="form-control"
                          name="transaction_Id"
                          value={data.transaction_Id}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    )}

                    <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label" for="form1Example2">
                        Note
                      </label>
                      <input
                        name="note"
                        type="text"
                        id="form1Example2"
                        class="form-control"
                        value={data.note}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  {dueAmt <= 0 ? (
                    <>
                      <button
                        type="button"
                        class="btn btn-success text-white shadow"
                        style={{
                          backgroundColor: "#0dcaf0",
                          border: "#0dcaf0",
                        }}
                        data-bs-dismiss="modal"
                        onClick={makePayment}
                        disabled={loading}
                      >
                        {loading
                          ? "Update Payment Details..."
                          : "Update Payment Details"}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        class="btn btn-success text-white shadow"
                        style={{
                          backgroundColor: "#0dcaf0",
                          border: "#0dcaf0",
                        }}
                        data-bs-dismiss="modal"
                        onClick={makePayment}
                        disabled={loading}
                      >
                        {loading
                          ? "Pay/update payment..."
                          : "Pay/update payment"}
                      </button>
                    </>
                  )}
                  {/* <button
                    type="button"
                    class="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={makePayment}
                    disabled={loading}
                  >
                    {loading ? "Pay/update payment..." : "Pay/update payment"}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PatintDuePaymentPrint;
const Container = styled.div`
  .space {
    margin-right: 23.4rem;
  }
  .spaces {
    /* margin-right: 45rem; */
  }
  @media print {
    .hide-during-print {
      display: none !important;
    }
  }

  .amount-width {
    width: 10%;
  }

  .desc-width {
    width: 90%;
  }

  .cardwid {
    width: 50%;
    @media screen and (min-width: 750px) and (max-width: 1100px) {
      width: 80%;
    }
  }
`;
