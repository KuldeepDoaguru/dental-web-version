import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTooth } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import BookSittingAppointment from "../Treatment Suggestion/BookSittingAppointment";
import cogoToast from "cogo-toast";
// import EditAppointment from "./";

const TreatmentForm = () => {
  const { tsid } = useParams();
  const { appoint_id } = useParams();
  const { tp_id, treatment } = useParams();

  console.log(tsid, appoint_id, tp_id, treatment);
  const navigate = useNavigate();
  const [getPatientData, setGetPatientData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user.currentUser.employee_ID);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  const [treatments, setTreatments] = useState([]);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [treatStats, setTreatStats] = useState();
  const [bookingStats, setBookingStats] = useState();
  const [showDirect, setShowDirect] = useState(false);
  const [securityAmt, setSecurityAmt] = useState([]);
  const [paidAmount, setPaidAmount] = useState();
  const [sitCheck, setSitCheck] = useState([]);

  const [formData, setFormData] = useState({
    patient_uhid: "",
    desease: "",
    dental_treatment: treatment,
    no_teeth: "",
    qty: "",
    cost_amt: "",
    disc_amt: "",
    total_amt: "",
    net_amt: "",
    paid_amount: "",
    pending_amount: "",
    sitting_payment_status: "",
    note: "",
  });

  console.log(formData);
  console.log(treatStats);

  const getDentalTreatData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getOnlyExaminv/${tp_id}/${tsid}`
      );
      setSitCheck(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(sitCheck);

  const getTreatmentList = async () => {
    try {
      let endpoint = `https://dentalgurudoctor.doaguru.com/api/doctor/getExaminedataByIdandexamine/${tsid}/${tp_id}`;
      if (sitCheck.length > 0) {
        endpoint = `https://dentalgurudoctor.doaguru.com/api/doctor/getExaminedataByIdandexamineAfterSitOne/${tsid}/${tp_id}`;
      }

      const { data } = await axios.get(endpoint);

      console.log(data);
      setTreatments(data);
    } catch (error) {
      console.log("Error fetching treatments:", error);
    }
  };

  console.log(treatments);
  const lastIndex = treatments.length - 1;
  const lastTreatment = treatments[lastIndex];
  console.log(lastTreatment);
  // Send Treatment Data to the Server....
  console.log([lastTreatment?.selected_teeth]);
  const totalTeeth = lastTreatment?.selected_teeth;
  const dataArray = totalTeeth?.split(", ").map(Number);
  console.log(dataArray?.length);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Calculate netValue
    const netValue =
      lastTreatment?.totalCost * dataArray?.length -
      (lastTreatment?.totalCost * dataArray?.length * parseFloat(value)) / 100;

    // Update formData in a single setFormData call
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      desease: lastTreatment?.desease || "",
      no_teeth: lastTreatment?.selected_teeth || "",
      qty: lastTreatment?.selected_teeth
        ? lastTreatment?.selected_teeth.split(", ").length
        : "",
      cost_amt: lastTreatment?.totalCost || "",
      total_amt: lastTreatment?.totalCost
        ? lastTreatment?.totalCost *
          (lastTreatment?.selected_teeth.split(", ").length || 1)
        : "",
      net_amt: netValue,
    }));
  };

  console.log(formData);

  // Assuming calculateNetAmount function exists

  const calculateNetAmount = (totalCost, selectedTeeth, discount) => {
    const dataArray = selectedTeeth.split(", ").map(Number);
    const discountedAmount = (totalCost * dataArray.length * discount) / 100;
    return totalCost * dataArray.length - discountedAmount;
  };

  console.log(formData);

  const netValueAmount = () => {
    let netValue = 0;

    if (lastTreatment?.disc_amt > 0) {
      netValue =
        lastTreatment?.totalCost * dataArray?.length -
        (lastTreatment?.totalCost *
          dataArray?.length *
          lastTreatment?.disc_amt) /
          100;
    } else if (lastTreatment?.pending_amount > 0) {
      netValue =
        lastTreatment?.totalCost * dataArray?.length -
        (lastTreatment?.totalCost *
          dataArray?.length *
          lastTreatment?.pending_amount) /
          100;
    }

    return netValue;
  };

  const netAmount = netValueAmount();

  const rawNetAmount =
    treatments[0]?.totalCost * dataArray?.length -
    (treatments[0]?.totalCost * dataArray?.length * formData.disc_amt) / 100;

  console.log(rawNetAmount);
  console.log(netAmount);
  console.log(formData.paid_amount);
  const pendingValue = () => {
    if (lastTreatment?.pending_amount > 0) {
      if (formData.sitting_payment_status === "Pending") {
        return lastTreatment?.pending_amount;
      } else {
        return lastTreatment?.pending_amount - formData.paid_amount;
      }
    } else {
      if (formData.sitting_payment_status === "Pending") {
        return lastTreatment?.pending_amount;
      } else {
        return 0;
      }
    }
  };

  console.log(pendingValue());
  useEffect(() => {
    pendingValue();
  }, [formData.paid_amount, formData.sitting_payment_status, showDirect]);

  const pendingAmountValue = pendingValue();

  const timelineForTreatForm = async () => {
    try {
      const response = await axios.post(
        "https://dentalgurudoctor.doaguru.com/api/doctor/insertTimelineEvent",
        {
          type: "Treatment Procedure",
          description:
            treatStats === "completed"
              ? `${treatment} Treatment Done, TPID : ${tp_id}`
              : `Sitting Done, TPID : ${tp_id}`,
          branch: branch,
          patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const partialPay = netAmount - securityAmt[0]?.remaining_amount;
  const directRecAmount = () => {
    if (
      securityAmt[0]?.payment_status === "success" &&
      securityAmt[0]?.remaining_amount <= 0
    ) {
      return netAmount;
    } else if (
      securityAmt[0]?.payment_status === "success" &&
      securityAmt[0]?.remaining_amount < netAmount
    ) {
      return netAmount - securityAmt[0]?.remaining_amount;
    } else {
      return 0;
    }
  };
  console.log("part pay", partialPay);
  const partPay = directRecAmount();
  console.log(partPay);

  const paysecAmt = () => {
    if (lastTreatment?.current_sitting <= 1) {
      if (showDirect) {
        if (rawNetAmount >= formData.paid_amount) {
          return formData.paid_amount;
        } else {
          return rawNetAmount - formData.paid_amount;
        }
      } else {
        if (formData.sitting_payment_status === "Received") {
          return formData.paid_amount;
        } else if (formData.paid_amount === "") {
          return 0;
        } else {
          return 0;
        }
      }
    } else {
      if (showDirect) {
        if (lastTreatment?.pending_amount >= formData.paid_amount) {
          return formData.paid_amount;
        } else {
          return lastTreatment?.pending_amount - formData.paid_amount;
        }
      } else {
        if (formData.sitting_payment_status === "Received") {
          return formData.paid_amount;
        } else if (formData.paid_amount === "") {
          return 0;
        } else {
          return 0;
        }
      }
    }
  };

  const payableAmountafterSecAmount = paysecAmt();
  console.log(payableAmountafterSecAmount);

  const secrecAmount = () => {
    if (lastTreatment?.pending_amount === undefined) {
      if (showDirect) {
        if (securityAmt[0]?.remaining_amount <= formData.paid_amount) {
          return securityAmt[0]?.remaining_amount;
        } else {
          return formData.paid_amount;
        }
      } else if ((formData.paid_amount !== "") & showDirect) {
        if (securityAmt[0]?.remaining_amount <= formData.paid_amount) {
          return securityAmt[0]?.remaining_amount;
        } else {
          return formData.paid_amount;
        }
      } else {
        return 0;
      }
    } else {
      if (showDirect) {
        if (securityAmt[0]?.remaining_amount <= lastTreatment?.pending_amount) {
          return securityAmt[0]?.remaining_amount;
        } else {
          return lastTreatment?.pending_amount;
        }
      } else if ((formData.paid_amount !== "") & showDirect) {
        if (securityAmt[0]?.remaining_amount <= formData.paid_amount) {
          return securityAmt[0]?.remaining_amount;
        } else {
          return formData.paid_amount;
        }
      } else {
        return 0;
      }
    }
  };

  const secRecValue = secrecAmount();
  console.log(secRecValue);
  console.log(pendingAmountValue, secRecValue);

  const formDetails = {
    branch: branch,
    sitting_number: lastTreatment?.current_sitting,
    patient_uhid: formData.patient_uhid,
    desease: lastTreatment?.desease,
    dental_treatment: treatment,
    no_teeth: lastTreatment?.selected_teeth,
    qty: dataArray?.length,
    cost_amt: lastTreatment?.totalCost,
    disc_amt:
      lastTreatment?.current_sitting <= 1
        ? formData.disc_amt
        : lastTreatment?.disc_amt <= 0
        ? formData.disc_amt
        : lastTreatment?.disc_amt,
    total_amt: lastTreatment?.totalCost * dataArray?.length,
    net_amount: lastTreatment?.current_sitting <= 1 ? rawNetAmount : netAmount,
    paid_amount: formData.paid_amount,
    pending_amount:
      lastTreatment?.current_sitting <= 1
        ? rawNetAmount - formData.paid_amount
        : secRecValue < pendingAmountValue
        ? pendingAmountValue - secRecValue
        : pendingAmountValue,
    dir_rec_amt:
      secRecValue <= payableAmountafterSecAmount
        ? payableAmountafterSecAmount - secRecValue
        : formData.sitting_payment_status === "Received"
        ? payableAmountafterSecAmount
        : 0,
    sec_rec_amt: secRecValue,
    dir_rec_doctor_id: user.currentUser.employee_ID,
    sitting_payment_status: formData.sitting_payment_status,
    note: formData.note,
  };
  console.log(formDetails);
  console.log(pendingAmountValue);

  const treatmentStatsUpdate = async () => {
    try {
      const response = await axios.put(
        `https://dentalgurudoctor.doaguru.com/api/doctor/updateTreatSittingStatus/${branch}/${tsid}`,
        { treatment_status: treatStats }
      );
      // alert("treatment status updated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `https://dentalgurudoctor.doaguru.com/api/doctor/insertTreatmentData/${tsid}/${appoint_id}/${tp_id}`,
        formDetails
      );
      if (res.status >= 200 && res.status < 300) {
        timelineForTreatForm();
        console.log("Treatment details inserted successfully");
        // Optionally, you can reset the form fields after successful submission
        setFormData({
          no_teeth: "",
          qty: "",
          cost_amt: "",
          original_cost_amt: "",
          disc_amt: "",
          total_amt: "",
          net_amt: "",
          sitting_payment_status: "",
          note: "",
        });

        treatmentStatsUpdate();
        getPatientDetail();
        getTreatmentList();
        navigate(
          `/TPrescriptionDash/${tsid}/${appoint_id}/${tp_id}/${lastTreatment?.current_sitting}/${treatment}`
        );
        // navigate(`/TreatmentDashBoard/${appoint_id}/${tp_id}`);
      } else {
        console.error(
          "Failed to insert treatment details. Server returned status:",
          res.status
        );
      }
    } catch (error) {
      console.error("Failed to insert treatment details:", error);
    }
  };

  // Get Patient Details START
  const getPatientDetail = async () => {
    try {
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getAppointmentsWithPatientDetailsById/${tp_id}`
      );

      const uhid = res.data.result.length > 0 ? res.data.result[0].uhid : null;
      setFormData((prevInputItem) => ({
        ...prevInputItem,
        patient_uhid: uhid,
      }));
      setGetPatientData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Patient Details END

  console.log(formData);
  console.log(treatments);
  console.log(getPatientData);

  useEffect(() => {
    getPatientDetail();
    getTreatmentList();
    getDentalTreatData();
  }, []);

  const handleSubmitCall = () => {
    handleSubmit();
  };

  const handleTreatSubmit = (e) => {
    e.preventDefault();
    if (bookingStats === "yes") {
      setShowBookingPopup(true);
    } else {
      handleSubmit();
    }
  };

  const handleEditAppointment = () => {
    setShowBookingPopup(true);
  };

  const getSecurityAmt = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getSecurityAmountByAppointmentId/${tp_id}`
      );
      setSecurityAmt(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSecurityAmt();
  }, []);

  console.log(securityAmt[0]?.remaining_amount);
  const securityRemAmt = () => {
    if (
      securityAmt[0]?.payment_status === "success" &&
      formData.paid_amount === ""
    ) {
      if (securityAmt[0]?.remaining_amount < lastTreatment?.pending_amount) {
        return 0;
      } else {
        return securityAmt[0]?.remaining_amount - lastTreatment?.pending_amount;
      }
    } else {
      if (securityAmt[0]?.remaining_amount < formData.paid_amount) {
        return 0;
      } else {
        return securityAmt[0]?.remaining_amount - formData.paid_amount;
      }
    }
  };
  const remaining_amount = securityRemAmt();
  console.log(remaining_amount);

  const updateAmountAfterPayViaSecAmount = async () => {
    try {
      const res = await axios.put(
        `https://dentalgurudoctor.doaguru.com/api/doctor/updateRecSecAmountAfterPayment/${tp_id}`,
        {
          sec_rec_amt:
            lastTreatment?.pending_amount <= 0
              ? securityAmt[0]?.remaining_amount >= netAmount
                ? netAmount
                : securityAmt[0]?.remaining_amount
              : lastTreatment?.pending_amount,
          sitting_payment_status:
            lastTreatment?.pending_amount === undefined
              ? rawNetAmount > securityAmt[0]?.remaining_amount
                ? "pending"
                : "Received"
              : netAmount > securityAmt[0]?.remaining_amount
              ? "pending"
              : "Received",
        }
      );
      console.log(res);
      setPaidAmount(
        securityAmt[0]?.remaining_amount >= netAmount
          ? netAmount
          : securityAmt[0]?.remaining_amount
      );
      cogoToast.success("Amount Paid via Security Amount");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(paidAmount);

  const timelineForMakePayViaSecurity = async () => {
    try {
      const response = await axios.post(
        "https://dentalgurudoctor.doaguru.com/api/doctor/insertTimelineEvent",
        {
          type: "Security Amount Used",
          description: `${
            securityAmt[0]?.remaining_amount - remaining_amount
          } security amount used`,
          branch: branch,
          patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const MakePaymentViaSecurityAmount = async () => {
    if (formData.paid_amount === "") {
      alert("please add paid amount");
    } else {
      try {
        const res = await axios.put(
          `https://dentalgurudoctor.doaguru.com/api/doctor/updateSecurityAmountAfterPayment/${tp_id}`,
          { remaining_amount: remaining_amount }
        );
        console.log(res);

        updateAmountAfterPayViaSecAmount();
        timelineForMakePayViaSecurity();
        setShowDirect(true);
        // updateAmountAfterPayViaSecAmount();
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(showDirect, partPay);
  console.log(lastTreatment?.net_amount);
  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center mt-4">
              <p className="fs-1 shadow-none p-3 mb-4 bg-light rounded">
                Treatment Procedure
              </p>
            </div>
          </div>

          <div className="container-fluid patient">
            <div className="row shadow-sm p-3 mb-3 bg-body rounded">
              <div className="d-flex justify-content-between">
                <p></p>
                <p>
                  <strong>Current Sitting</strong> :{" "}
                  {lastTreatment?.current_sitting}
                </p>
              </div>
              <hr />

              {getPatientData.map((item, index) => (
                <>
                  <div key={index} className="col-lg-12">
                    <div className="row">
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <p>
                          <strong>Treatment Package ID</strong> : {tp_id}
                        </p>
                      </div>
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <p>
                          <strong>Patient Name</strong> : {item.patient_name}
                        </p>
                      </div>
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <p>
                          <strong>Patient Mobile No.</strong> : {item.mobileno}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div key={index + "secondRow"} className="col-lg-12">
                    <div className="row">
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <p className="mb-0">
                          <strong>Blood Group</strong> : {item.bloodgroup}
                        </p>
                      </div>
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <p className="mb-0">
                          <strong>Disease</strong> : {item.disease}
                        </p>
                      </div>
                      <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                        <p className="mb-0">
                          <strong>Allergy</strong> : {item.allergy}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="row shadow-sm p-4 mb-3 bg-white rounded">
            <form onSubmit={handleTreatSubmit}>
              <div className="container">
                <div className="row g-2">
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Desease
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-none p-1 bg-light rounded border-0 w-75"
                        value={lastTreatment?.desease}
                        placeholder="Desease"
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Treatment
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-none p-1 bg-light rounded border-0 w-75"
                        value={formData.dental_treatment}
                        placeholder="Teeth Number"
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Teeth Number
                      </label>
                      <input
                        type="text"
                        // name="no_teeth"
                        className="form-control shadow-none p-1 bg-light rounded border-0 w-75"
                        value={lastTreatment?.selected_teeth}
                        placeholder="Teeth Number"
                        // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Total Teeth
                      </label>
                      <input
                        type="text"
                        // name="qty"
                        className="form-control shadow-none p-1 bg-light rounded border-0 w-75"
                        value={dataArray?.length}
                        placeholder="Quantity"
                        // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Treatment cost per tooth
                      </label>
                      <input
                        type="text"
                        name="cost_amt"
                        className="shadow-none p-1 bg-light rounded border-0 w-75"
                        value={lastTreatment?.totalCost} // Displaying both values
                        placeholder="Cost Amount"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Total Treatment Cost
                      </label>
                      <input
                        type="text"
                        // name="cost_amt"
                        className="shadow-none p-1 bg-light rounded border-0 w-75"
                        value={lastTreatment?.totalCost * dataArray?.length}
                        placeholder="Cost Amount"
                        // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Discount Amount %
                      </label>
                      {lastTreatment?.current_sitting > 1 ? (
                        <>
                          <input
                            type="text"
                            name="disc_amt"
                            required
                            className="shadow-none p-1 bg-light rounded border-0 w-75"
                            value={lastTreatment?.disc_amt}
                            readOnly
                            placeholder="Discount percentages"
                            onChange={handleChange}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          <input
                            type="text"
                            name="disc_amt"
                            required
                            className="shadow-none p-1 bg-light rounded border-0 w-75"
                            value={
                              lastTreatment?.disc_amt > 0
                                ? lastTreatment?.disc_amt
                                : formData.disc_amt
                            }
                            placeholder="Discount percentages"
                            onChange={handleChange}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  {lastTreatment?.current_sitting <= 1 ? (
                    ""
                  ) : (
                    <>
                      <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                        <label htmlFor="" class="form-label fw-bold">
                          Net Amount
                        </label>
                        <p className="text-danger fw-bold">
                          {lastTreatment?.net_amount > 0
                            ? lastTreatment?.net_amount
                            : netAmount}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Paid Amount
                      </label>

                      {/* <input
                        type="text"
                        required
                        name="net_amt"
                        className="shadow-none p-1 bg-light rounded border-0 w-75"
                        value={
                          lastTreatment?.totalCost &&
                          dataArray?.length &&
                          formData.disc_amt
                            ? lastTreatment?.totalCost * dataArray?.length -
                              (lastTreatment?.totalCost *
                                dataArray?.length *
                                formData.disc_amt) /
                                100
                            : ""
                        }
                        placeholder="Net Amount"
                        onChange={handleChange}
                      /> */}
                      {showDirect ? (
                        <input
                          type="text"
                          required
                          name="paid_amount"
                          className="shadow-none p-1 bg-light rounded border-0 w-75"
                          value={formData.paid_amount}
                          readOnly
                          placeholder="Paid Amount"
                          onChange={handleChange}
                        />
                      ) : (
                        <input
                          type="text"
                          required
                          name="paid_amount"
                          className="shadow-none p-1 bg-light rounded border-0 w-75"
                          value={formData.paid_amount}
                          placeholder="Paid Amount"
                          onChange={handleChange}
                        />
                      )}

                      <br />
                      <small style={{ color: "red" }}>
                        Pending Amount :{" "}
                        {lastTreatment?.current_sitting <= 1
                          ? rawNetAmount
                          : lastTreatment?.pending_amount - secRecValue}
                      </small>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Notes
                      </label>
                      <textarea
                        type="text"
                        name="note"
                        className="form-control shadow-none p-1 bg-light rounded border-0 w-75"
                        value={formData.note}
                        placeholder="Add some more details"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Remaining Security Amount :{" "}
                        <strong style={{ color: "red" }}>
                          {securityAmt[0]?.remaining_amount}
                        </strong>
                      </label>
                      <div>
                        {securityAmt[0]?.remaining_amount > 0 &&
                        (formData.disc_amt || lastTreatment?.disc_amt > 0) ? (
                          !showDirect ? (
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={MakePaymentViaSecurityAmount}
                            >
                              Make Payment using security amount
                            </button>
                          ) : (
                            <button
                              className="btn btn-success"
                              type="button"
                              disabled
                            >
                              Payment Successful
                            </button>
                          )
                        ) : (
                          <button
                            type="button"
                            className="btn btn-info"
                            disabled
                          >
                            Make Payment using security amount
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        {!showDirect || partPay > 0
                          ? "Do you want to make payment directly"
                          : "Payment Status"}
                      </label>

                      {!showDirect ? (
                        <>
                          <small className="ms-2" style={{ color: "red" }}>
                            (Remaining Pending Payment :{" "}
                            {lastTreatment?.pending_amount === 0
                              ? netAmount <= 0
                                ? 0
                                : netAmount
                              : lastTreatment?.pending_amount}
                            )
                          </small>
                        </>
                      ) : (
                        <>
                          <small className="ms-2" style={{ color: "red" }}>
                            (Remaining Net Payment :{" "}
                            {lastTreatment?.pending_amount - secRecValue})
                          </small>
                        </>
                      )}
                      <select
                        class="form-control"
                        id=""
                        name="sitting_payment_status"
                        onChange={handleChange}
                        value={formData.sitting_payment_status}
                      >
                        {!showDirect ? (
                          <>
                            {" "}
                            <option value="">-select-</option>
                            <option value="Received">Yes</option>
                            <option value="Pending">No</option>
                          </>
                        ) : (
                          <>
                            {securityAmt[0]?.remaining_amount <=
                            formData.paid_amount ? (
                              <>
                                {" "}
                                <option value="">-select-</option>
                                <option value="Received">Yes</option>
                                <option value="Pending">No</option>
                              </>
                            ) : (
                              <>
                                <option value="">-select-</option>
                                <option value="Recieved">Received</option>
                              </>
                            )}
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-center align-items-center flex-column">
                <div className="d-flex justify-content-center align-items-center">
                  <div>
                    <label htmlFor="" class="form-label fw-bold">
                      Treatment Completed?
                    </label>
                    <select
                      class="form-control"
                      id=""
                      name=""
                      onChange={(e) => setTreatStats(e.target.value)}
                      value={treatStats}
                    >
                      <option value="">-select-</option>
                      <option value="completed">Yes</option>
                      <option value="ongoing">No</option>
                    </select>
                  </div>
                  <div className="ms-2">
                    <label htmlFor="" class="form-label fw-bold">
                      Do you want to book next appointment?
                    </label>
                    <select
                      class="form-control"
                      id=""
                      name=""
                      onChange={(e) => setBookingStats(e.target.value)}
                      value={bookingStats}
                    >
                      <option value="">-select-</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  {showBookingPopup && (
                    <BookSittingAppointment
                      getPatientData={getPatientData}
                      treatment={treatment}
                      tsid={tsid}
                      currentSitting={lastTreatment?.current_sitting}
                      appoint_id={appoint_id}
                      tp_id={tp_id}
                      treatStats={treatStats}
                      onClose={() => setShowBookingPopup(false)}
                      handleSubmit={() => handleSubmit()}
                    />
                  )}
                  {treatStats === "yes" ? (
                    <>
                      <div className="d-flex justify-content-center">
                        {bookingStats === "yes" ? (
                          <>
                            <button
                              type="submit"
                              className="btn btn-info btn text-dark mt-2"
                              // onClick={handleEditAppointment}
                            >
                              Book Next Treatment & Submit
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="submit"
                              className="btn btn-info text-dark mt-2 ms-2"
                            >
                              Treatment Done
                              <FaTooth size={22} />
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-center">
                        {bookingStats === "yes" ? (
                          <button
                            type="submit"
                            className="btn btn-info btn text-dark mt-2"
                            // onClick={handleEditAppointment}
                          >
                            Book Next Sitting & Submit
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-info text-dark mt-2 ms-2"
                          >
                            Sitting Done
                            <FaTooth size={22} />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default TreatmentForm;
const Wrapper = styled.div`
  .sc-eKzuse {
    width: 100%;
  }
  .list-group {
    position: absolute;
    z-index: 10;
    height: 200px;
    width: 180px;
    overflow-y: auto;
  }
  input {
    width: 22rem;
    @media (min-width: 280px) and (max-width: 460px) {
      width: 5rem;
    }
    @media (min-width: 461px) and (max-width: 820px) {
      width: 13rem;
    }
    @media (min-width: 821px) and (max-width: 1024px) {
      width: 17rem;
    }
  }
  select {
    width: 22rem;
    @media (min-width: 280px) and (max-width: 460px) {
      width: 5rem;
    }
    @media (min-width: 461px) and (max-width: 820px) {
      width: 13rem;
    }
    @media (min-width: 821px) and (max-width: 1024px) {
      width: 17rem;
    }
  }
  textarea {
    width: 52rem;
    @media (min-width: 280px) and (max-width: 460px) {
      width: 13rem;
    }
    @media (min-width: 461px) and (max-width: 1024px) {
      width: 25rem;
    }
  }
  .ProfileDetailsMain,
  p {
    @media (min-width: 280px) and (max-width: 460px) {
      font-size: 8px;
    }
  }
`;
