import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sider from "../components/Sider";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import cogoToast from "cogo-toast";
import moment from "moment";

const PatintDuePaymentPrint = () => {
  const navigate = useNavigate();
  const { bid, tpid, uhid } = useParams();
  const user = useSelector((state) => state.user);
  const token = user.token;
  console.log(token);
  console.log(user);
  const [branchData, setBranchData] = useState([]);
  const [billAmount, setBillAmount] = useState([]);
  const [saAmt, setSaAmt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    payment_mode: "",
    transaction_Id: "",
    note: "",
  });
  console.log(bid, tpid, uhid);
  console.log(data);

  const goBack = () => {
    window.history.go(-1);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setData({ ...data, [name]: value });
  };

  const branchDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getBranchDetailsByBranch/${user.branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBranchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const secuirtyAmtBytpuhid = async () => {
    try {
      const res = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getSecurityAmountDataByTPUHID/${tpid}/${uhid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setSaAmt(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getPatientBillsAndSecurityAmountByBranch/${user.branch}/${bid}`,
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

  useEffect(() => {
    branchDetails();
    getBillDetails();
    secuirtyAmtBytpuhid();
  }, []);

  console.log(branchData);
  console.log(billAmount);

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const date = String(todayDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate);

  const dueAmt =
    Number(billAmount[0]?.total_amount) -
    (Number(billAmount[0]?.paid_amount) +
      Number(billAmount[0]?.pay_by_sec_amt));

  let totalPaidAmount = 0;
  if (dueAmt >= 0) {
    if (
      dueAmt >=
      (Number(saAmt[0]?.remaining_amount)
        ? Number(saAmt[0]?.remaining_amount)
        : 0)
    ) {
      totalPaidAmount = Number(saAmt[0]?.remaining_amount)
        ? Number(saAmt[0]?.remaining_amount)
        : 0;
    } else {
      totalPaidAmount = dueAmt;
    }
  } else if (
    dueAmt <=
    (Number(saAmt[0]?.remaining_amount)
      ? Number(saAmt[0]?.remaining_amount)
      : 0)
  ) {
    totalPaidAmount = dueAmt;
  }

  const remainingSecurityAmount =
    (Number(saAmt[0]?.remaining_amount)
      ? Number(saAmt[0]?.remaining_amount)
      : 0) - totalPaidAmount;

  // If dueAmt is negative, meaning there is an overpayment, we set totalPaidAmount to 0
  if (dueAmt < 0) {
    totalPaidAmount = 0;
  }

  const finalAmt = dueAmt - totalPaidAmount;

  console.log("Total Paid Amount:", totalPaidAmount);
  console.log("Remaining Security Amount:", remainingSecurityAmount);

  const updatedPay_by_sec_amt =
    Number(billAmount[0]?.pay_by_sec_amt) +
    ((Number(saAmt[0]?.remaining_amount)
      ? Number(saAmt[0]?.remaining_amount)
      : 0) -
      remainingSecurityAmount);

  const updatedPaidAmt = billAmount[0]?.paid_amount + finalAmt;

  const updateRemainingSecurity = async () => {
    console.log(remainingSecurityAmount);
    try {
      console.log(remainingSecurityAmount);
      const response = await axios.put(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/updateRemainingSecurityAmount/${tpid}/${uhid}`,
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
      console.log(remainingSecurityAmount);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async () => {
    if (!validateForm()) {
      cogoToast.error("Please fill all the required fields.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/makeBillPayment/${user.branch}/${bid}`,
        {
          paid_amount: updatedPaidAmt,
          payment_status: "paid",
          payment_date_time: formattedDate,
          payment_mode: data.payment_mode,
          transaction_Id: data.transaction_Id,
          note: data.note,
          receiver_name: user.employee_name,
          receiver_emp_id: user.id,
          pay_by_sec_amt: updatedPay_by_sec_amt,
        },
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
        completeTreatment();
        getBillDetails();
        console.log(response.data);
        updateRemainingSecurity();
        setData({
          payment_mode: "",
          transaction_Id: "",
          note: "",
        });
        navigate(`/patient-bill/${bid}/${tpid}`);
      } else {
        cogoToast.success("Failed to paid bill");
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  const validateForm = () => {
    if (!data.payment_mode) return false;
    if (data.payment_mode === "online" && !data.transaction_Id) return false;
    return true;
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
        `https://dentalgurudoctor.doaguru.com/api/doctor/updateTreatmentStatus/${user.branch}/${tpid}`,
        [],
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      cogoToast.success("Treatment Completed");
    } catch (error) {
      console.log(error.response.data.message);
      cogoToast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Container>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-10 col-sm-12 col-12">
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
                            <h6>Address </h6>
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
                    <div className="d-flex justify-content-center">
                      <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-11 col-sm-11">
                        <div className="row  mt-2 d-flex justify-content-between">
                          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-5">
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
                                  {/* {" "}
                                  : {
                                    billAmount[0]?.bill_date.split("T")[0]
                                  }{" "} */}
                                  {billAmount[0]?.bill_date.split
                                    ? moment(
                                        billAmount[0]?.bill_date.split
                                      ).format("DD/MM/YYYY")
                                    : ""}
                                </h6>
                              </div>
                            </div>
                          </div>

                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <div class=" rounded d-flex justify-content-end mt-5 me-5">
                              <div class="card" style={{ width: "18rem" }}>
                                <div className="ms-4 mt-2">
                                  <h1>
                                    {" "}
                                    ₹
                                    {Number(billAmount[0]?.total_amount)
                                      ? Number(billAmount[0]?.total_amount)
                                      : 0}
                                  </h1>
                                  <h5 className="text-danger ms-4">
                                    Patient Net Due
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
                    <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-11 col-sm-11">
                      <div className="table-responsive">
                        <table class="table table-bordered shadow">
                          <thead class="table-primary  rounded">
                            <tr>
                              <th scope="col">Payment Details</th>
                              <th scope="col">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr></tr>
                            <tr>
                              <td colspan="1">
                                <h6>
                                  <span class=""></span>
                                  Total Treatments Amount
                                </h6>
                              </td>

                              <td className="fw-bolder">
                                ₹ {billAmount[0]?.total_amount}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="1">
                                <h6>
                                  <span class=""></span>Previous Paid By Direct
                                  Amount
                                </h6>
                              </td>
                              <td className="fw-bolder">
                                ₹ {billAmount[0]?.paid_amount}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="1">
                                <h6>
                                  <span class=""></span>Previous Paid By
                                  Secuirty Amount
                                </h6>
                              </td>
                              <td className="fw-bolder">
                                ₹ {billAmount[0]?.pay_by_sec_amt}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="1">
                                <h6>
                                  <span class=""></span>Total Due Amount
                                </h6>
                              </td>
                              <td className="fw-bolder">
                                ₹ {dueAmt ? dueAmt : 0}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="1">
                                <h6>
                                  <span class=""></span>
                                  Remaining Secuirty Amount
                                </h6>
                              </td>

                              <td className="fw-bolder">
                                ₹{" "}
                                {saAmt[0]?.remaining_amount
                                  ? saAmt[0]?.remaining_amount
                                  : 0}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="1">
                                <h6>
                                  <span class=""></span>Refundable Security
                                  Amount
                                </h6>
                              </td>
                              <td className="fw-bolder">
                                ₹ {remainingSecurityAmount}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="1">
                                <h6>
                                  <span class=""></span>Final Due Amount
                                </h6>
                              </td>
                              <td className="fw-bolder">
                                ₹ {finalAmt ? finalAmt : 0}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/*                    
                      <div className="d-flex justify-content-between">
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
                  {dueAmt <= 0 ? (
                    <>
                      <button
                        type="button"
                        class="btn btn-primary hide-during-print"
                        disabled
                      >
                        Pay Now
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning ms-2"
                        onClick={completeTreatment}
                      >
                        Mark Treatment Complete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        class="btn btn-primary hide-during-print"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Pay Now"}
                      </button>
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
                    Do you want to make payment
                  </h1>
                </div>
                <div className="modal-body">
                  <form>
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
                          --Select Payment Method--
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
                        required
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
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={makePayment}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Pay Now"}
                  </button>
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
    margin-right: 45rem;
  }
  @media print {
    .hide-during-print {
      display: none !important;
    }
  }
`;
