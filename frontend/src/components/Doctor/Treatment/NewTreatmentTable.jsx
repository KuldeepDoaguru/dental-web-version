import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const NewTreatmentTable = () => {
  const { id, tpid } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [treatmentData, setTreatmentData] = useState([]);
  const [modalIndex, setModalIndex] = useState(null);
  const [getExamTeeth, setGetExamTeeth] = useState([]);
  const [getPatientData, setGetPatientData] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  const doctor = user.currentUser.employee_name;
  console.log(branch);
  console.log(doctor);

  // Get Patient Details START
  const getPatientDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${tpid}`
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
        `http://localhost:8888/api/doctor/getTreatmentDataViaBranchAndTpid/${tpid}/${branch}`
      );
      setTreatmentData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(treatmentData);
  const totalFinalBillPrice = () => {
    try {
      let total = 0;
      treatmentData.forEach((item) => {
        total = total + parseFloat(item.net_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalFinalBillValue = totalFinalBillPrice();
  console.log(totalFinalBillValue);

  const billInputField = {
    uhid: getPatientData[0]?.uhid,
    tp_id: tpid,
    branch_name: getPatientData[0]?.branch_name,
    patient_name: getPatientData[0]?.patient_name,
    patient_mobile: getPatientData[0]?.mobileno,
    patient_email: getPatientData[0]?.emailid,
    assigned_doctor_name: doctor,
    total_amount: totalFinalBillValue,
  };

  const generateFinalBill = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8888/api/doctor/generateFinalBillwithTpid",
        billInputField
      );
      console.log(res);
      alert("bill generated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = async () => {
    navigate(`/ViewPatientTotalBill/${tpid}`);
  };

  const getExamintionTeeth = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8888/api/doctor/getExaminedataById/${tpid}`
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
  const filterTreatmentStats = getExamTeeth?.filter((item) => {
    if (item.treatment_status === "ongoing") {
      return true;
    }
  });

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
                <th>Note</th>
                <th>Delete</th>
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
                        <div className="modal-body">
                          {/* <form>
                            <div data-mdb-input-init class="form-outline mb-4">
                              <input
                                type="text"
                                id={`dental_treatment-${index}`}
                                name="dental_treatment"
                                value={formData.dental_treatment}
                                class="form-control"
                                onChange={handleChange}
                                placeholder="Dental Treatment"
                                readOnly
                              />
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                              <input
                                type="text"
                                id={`no_teeth-${index}`}
                                name="no_teeth"
                                value={formData.no_teeth}
                                class="form-control"
                                onChange={handleChange}
                                placeholder="Teeth No."
                              />
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                              <input
                                type="text"
                                id={`qty-${index}`}
                                name="qty"
                                value={formData.qty}
                                class="form-control"
                                onChange={handleChange}
                                placeholder="Quantity"
                              />
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                              <input
                                type="text"
                                id={`original_cost_amt-${index}`}
                                name="original_cost_amt"
                                value={formData.original_cost_amt}
                                class="form-control"
                                onChange={handleChange}
                                placeholder="Teeth Cost"
                              />
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                              <input
                                type="text"
                                id={`disc_amt-${index}`}
                                name="disc_amt"
                                value={formData.disc_amt}
                                class="form-control"
                                onChange={handleChange}
                                placeholder="Discount %"
                              />
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                              <input
                                type="text"
                                id={`total_amt-${index}`}
                                name="total_amt"
                                value={formData.total_amt}
                                class="form-control"
                                onChange={handleChange}
                                placeholder="Final Cost"
                              />
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                              <input
                                type="text"
                                id={`note-${index}`}
                                name="note"
                                value={formData.note}
                                class="form-control"
                                onChange={handleChange}
                                placeholder="Note"
                              />
                            </div>

                            <div className="text-center">
                              <button
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Update
                              </button>
                            </div>
                          </form> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <td>
                    {/* <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaPrescriptionBottleMedical size={25} />
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            {filterTreatmentStats.length > 0 ? (
              <button className="btn btn-info fs-5 text-light" disabled>
                Save & Continue <FaLocationArrow size={25} />
              </button>
            ) : (
              <button
                className="btn btn-info fs-5 text-light"
                onClick={generateFinalBill}
              >
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
