import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "cogo-toast";

const NewTreatmentTable = () => {
  const { id, tpid } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [treatmentData, setTreatmentData] = useState([]);
  const [modalIndex, setModalIndex] = useState(null);
  const [getExamTeeth, setGetExamTeeth] = useState([]);
  const [getPatientData, setGetPatientData] = useState([]);
  const [billData, setBillData] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  const doctor = user.currentUser.employee_name;
  const token = user.currentUser.token;
  console.log(branch);
  console.log(doctor);

  // Get Patient Details START
  const getPatientDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getAppointmentsWithPatientDetailsById/${tpid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.result[0]?.patient_name);
      setGetPatientData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getPatientData);

  const fetchTreatmentData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getTreatmentDataViaBranchAndTpid/${tpid}/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTreatmentData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(treatmentData);

  const netVal = treatmentData?.filter((item) => {
    return item.sitting_number === 1;
  });

  console.log(netVal);

  //total bill amount
  const totalFinalBillPrice = () => {
    try {
      let totalNetAmount = 0;
      let total = 0;

      netVal?.forEach((item) => {
        totalNetAmount += item.net_amount;
      });

      treatmentData.forEach((item) => {
        total = total + parseFloat(item.paid_amount);
      });
      console.log(total);
      console.log(totalNetAmount);

      if (totalNetAmount === total) {
        return total;
      } else {
        return totalNetAmount;
      }
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalFinalBillValue = totalFinalBillPrice();
  console.log(totalFinalBillValue);

  //total paid amount
  const totalPaidAmount = () => {
    try {
      let total = 0;
      treatmentData?.forEach((item) => {
        const dirRecAmt = item.dir_rec_amt || 0;
        total += dirRecAmt;
      });
      console.log(`Final total: ${total}`);
      return total;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };
  const totalPaidValue = totalPaidAmount();
  console.log(totalPaidValue);

  //total security amount used
  const totalSecurityAmountUsed = () => {
    try {
      let total = 0;
      treatmentData.forEach((item) => {
        total = total + parseFloat(Number(item.sec_rec_amt));
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totSecurityAmountUsedValue = totalSecurityAmountUsed();
  console.log(totSecurityAmountUsedValue);

  const billInputField = {
    uhid: getPatientData[0]?.uhid,
    tp_id: tpid,
    branch_name: getPatientData[0]?.branch_name,
    patient_name: getPatientData[0]?.patient_name,
    patient_mobile: getPatientData[0]?.mobileno,
    patient_email: getPatientData[0]?.emailid,
    assigned_doctor_name: doctor,
    total_amount: totalFinalBillValue,
    paid_amount: totalPaidValue,
    due_amount:
      totalFinalBillValue - (totalPaidValue + totSecurityAmountUsedValue),
    pay_by_sec_amt: totSecurityAmountUsedValue,
  };

  console.log(billInputField);

  const timelineForFinalBill = async () => {
    try {
      const response = await axios.post(
        "https://dentalgurudoctor.doaguru.com/api/doctor/insertTimelineEvent",
        {
          type: "Final Bill Generation",
          description: `Final Bill Generated for TPID : ${tpid}`,
          branch: branch,
          patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const generateFinalBill = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://dentalgurudoctor.doaguru.com/api/doctor/generateFinalBillwithTpid",
        billInputField,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setLoading(false);
      setBillData(res.data);
      timelineForFinalBill();
      cogoToast.success("bill generated successfully");
      navigate(`/ViewPatientTotalBill/${tpid}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
      cogoToast.error(error.response.data.message);
    }
  };

  console.log(billData);

  const handleNavigate = async () => {
    navigate(`/ViewPatientTotalBill/${tpid}`);
  };

  const getExamintionTeeth = async () => {
    try {
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getExaminedataById/${tpid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGetExamTeeth(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientDetail();
    getExamintionTeeth();
    fetchTreatmentData();
  }, []);

  console.log(getExamTeeth);

  console.log(treatmentData);
  const filterTreatmentStats = getExamTeeth?.some(
    (item) => item.treatment_status === "completed"
  );

  console.log(filterTreatmentStats);

  return (
    <>
      <Wrapper>
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center mt-4">
              <p className="fs-1 shadow-none p-2 mb-4 bg-light rounded">
                Treatment Table{" "}
              </p>
            </div>
          </div>
          <table class="table table-bordered table-striped border">
            <thead>
              <tr>
                <th>Sitting Number</th>
                <th>Treatment</th>
                <th>Teeth No.</th>
                <th>Qty</th>
                <th>Treatment Cost</th>
                <th>Cost * Qty</th>
                <th>Discount %</th>
                <th>Final Cost</th>
                <th>Sitting Paid Amount</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {treatmentData?.map((item, index) => (
                <tr key={index}>
                  <td>{item.sitting_number}</td>
                  <td>{item.dental_treatment}</td>
                  <td>{item.no_teeth}</td>
                  <td>{item.qty}</td>
                  <td>{item.total_amt}</td>
                  <td>{item.cost_amt}</td>
                  <td>{item.disc_amt}</td>
                  <td>{item.net_amount}</td>
                  <td>{item.paid_amount}</td>
                  <td>{item.note}</td>
                  {/* <td>
                    <button
                      className="btn btn-primary justify-content-end"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal-${index}`}
                      onClick={() => handleModalOpen(index)}
                    >
                      <MdEdit size={25} />
                    </button>
                  </td> */}
                  <div
                    className="modal fade"
                    id={`exampleModal-${index}`}
                    tabIndex="-1"
                    aria-labelledby={`exampleModalLabel-${index}`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id={`exampleModalLabel-${index}`}
                          >
                            Update Data
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            {filterTreatmentStats ? (
              <button
                className="btn btn-info fs-5 text-light"
                onClick={generateFinalBill}
                disabled={loading}
              >
                {loading ? "Save & Continue..." : "Save & Continue"}{" "}
                <FaLocationArrow size={25} />
              </button>
            ) : (
              <button className="btn btn-info fs-5 text-light" disabled>
                Save & Continue <FaLocationArrow size={25} />
              </button>
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default NewTreatmentTable;
const Wrapper = styled.div``;
