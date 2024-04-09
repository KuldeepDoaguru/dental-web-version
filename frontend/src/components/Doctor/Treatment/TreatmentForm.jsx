import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTooth } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const TreatmentForm = () => {
  const { tsid } = useParams();
  const { appoint_id } = useParams();
  const { tp_id, treatment } = useParams();

  console.log(tsid, appoint_id, tp_id, treatment);
  const navigate = useNavigate();
  const [getPatientData, setGetPatientData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  const [treatments, setTreatments] = useState([]);

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
    note: "",
  });

  //   console.log(formData);

  const getTreatmentList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getExaminedataByIdandexamine/${tsid}/${tp_id}`
      );
      console.log(data);
      setTreatments(data);
    } catch (error) {
      console.log("Error fetching treatments:", error);
    }
  };
  useEffect(() => {
    getPatientDetail();
    getTreatmentList();
  }, []);

  // Send Treatment Data to the Server....
  console.log([treatments[0]?.selected_teeth]);
  const totalTeeth = treatments[0]?.selected_teeth;
  const dataArray = totalTeeth?.split(", ").map(Number);
  console.log(dataArray?.length);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      desease: treatments[0]?.desease || "",
      no_teeth: treatments[0]?.selected_teeth || "",
      qty: treatments[0]?.selected_teeth
        ? treatments[0]?.selected_teeth.split(", ").length
        : "",
      cost_amt: treatments[0]?.totalCost || "",
      total_amt: treatments[0]?.totalCost
        ? treatments[0]?.totalCost *
          treatments[0]?.selected_teeth.split(", ").length
        : "",
      net_amt:
        treatments[0]?.totalCost && treatments[0]?.selected_teeth
          ? calculateNetAmount(
              treatments[0].totalCost,
              treatments[0].selected_teeth,
              prevData.disc_amt
            )
          : 0,
    }));
  };

  const calculateNetAmount = (totalCost, selectedTeeth, discount) => {
    const dataArray = selectedTeeth.split(", ").map(Number);
    const discountedAmount = (totalCost * dataArray.length * discount) / 100;
    return totalCost * dataArray.length - discountedAmount;
  };

  console.log(formData);

  const timelineForTreatForm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8888/api/doctor/insertTimelineEvent",
        {
          type: "Treatment Producer",
          description: "Treatment Start",
          branch: branch,
          patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDetails = {
      patient_uhid: formData.patient_uhid,
      desease: treatments[0]?.desease,
      dental_treatment: treatment,
      no_teeth: treatments[0]?.selected_teeth,
      qty: dataArray?.length,
      cost_amt: "",
      disc_amt: "",
      total_amt: "",
      net_amt: "",
      note: "",
    };
    try {
      const res = await axios.post(
        `http://localhost:8888/api/doctor/insertTreatmentData/${tsid}/${appoint_id}`,
        formDetails
      );
      if (res.status >= 200 && res.status < 300) {
        timelineForTreatForm();
        console.log("Treatment details inserted successfully");
        // Optionally, you can reset the form fields after successful submission
        setFormData({
          dental_treatment: "",
          no_teeth: "",
          qty: "",
          cost_amt: "",
          original_cost_amt: "",
          disc_amt: "",
          total_amt: "",
          note: "",
        });
        // navigate(`/TreatmentDashBoard/${appoint_id}`);
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
        `http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${appoint_id}`
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

  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center mt-4">
              <p className="fs-1 shadow-none p-2 mb-4 bg-light rounded">
                Treatment Procedure
              </p>
            </div>
          </div>

          <div className="container patient">
            <div className="row shadow-sm p-3 mb-3 bg-body rounded">
              <div className="d-flex justify-content-between">
                <p>
                  <strong>Treatment Package ID</strong> : {tp_id}
                </p>
                <p>
                  <strong>Current Sitting</strong> :{" "}
                  {treatments[0]?.current_sitting}
                </p>
              </div>
              <hr />

              {getPatientData.map((item, index) => (
                <>
                  <div
                    key={index}
                    className="col-lg-12 d-flex justify-content-between align-items-center"
                  >
                    <div className="col-lg-4">
                      <p>
                        <strong>Appoint ID</strong> : {item.appoint_id}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <p>
                        <strong>Patient Name</strong> : {item.patient_name}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <p>
                        <strong>Patient Mobile No.</strong> : {item.mobileno}
                      </p>
                    </div>
                  </div>
                  <div
                    key={index + "secondRow"}
                    className="col-lg-12 d-flex justify-content-between align-items-center"
                  >
                    <div className="col-lg-4">
                      <p className="mb-0">
                        <strong>Blood Group</strong> : {item.bloodgroup}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <p className="mb-0">
                        <strong>Disease</strong> : {item.disease}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <p className="mb-0">
                        <strong>Allergy</strong> : {item.allergy}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="row shadow-sm p-4 mb-3 bg-white rounded">
            <form onSubmit={handleSubmit}>
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
                        value={treatments[0]?.desease}
                        placeholder="Desease"
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        SELECT Treatment
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
                        value={treatments[0]?.selected_teeth}
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
                        value={treatments[0]?.totalCost} // Displaying both values
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
                        value={treatments[0]?.totalCost * dataArray?.length}
                        placeholder="Cost Amount"
                        // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Discount Amount %
                      </label>
                      <input
                        type="text"
                        name="disc_amt"
                        className="shadow-none p-1 bg-light rounded border-0 w-75"
                        value={formData.disc_amt}
                        placeholder="Discount percentages"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div class="mb-3">
                      <label htmlFor="" class="form-label fw-bold">
                        Net Amount
                      </label>
                      <input
                        type="text"
                        name="total_amt"
                        className="shadow-none p-1 bg-light rounded border-0 w-75"
                        value={
                          treatments[0]?.totalCost &&
                          dataArray?.length &&
                          formData.disc_amt
                            ? treatments[0]?.totalCost * dataArray?.length -
                              (treatments[0]?.totalCost *
                                dataArray?.length *
                                formData.disc_amt) /
                                100
                            : ""
                        }
                        placeholder="Total Amount"
                        onChange={handleChange}
                      />
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
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div></div>
                <button type="submit" className="btn btn-info text-light">
                  Treatment Done <FaTooth size={22} />
                </button>
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
