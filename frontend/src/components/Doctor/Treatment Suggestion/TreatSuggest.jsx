import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiFastBackwardButton } from "react-icons/gi";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditAppointment from "./BookSittingAppointment";
import { toggleTableRefresh } from "../../../redux/user/userSlice";
import SuggestedtreatmentList from "../Examination/SaveExaminationData/SuggestedtreatmentList";

const TreatSuggest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  const { id, tpid } = useParams();
  console.log(id, tpid);
  const [treatments, setTreatments] = useState([]);
  const [getPatientData, setGetPatientData] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [value, setValue] = useState(0); // State to track current form
  const [formData, setFormData] = useState({
    appoint_id: id,
    branch: branch,
    p_uhid: "",
    tp_id: tpid,
    treatment_name: "",
    total_sitting: "",
    total_cost: "",
  });

  console.log(getPatientData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update formData with the new value
    setFormData((prevInputItem) => ({
      ...prevInputItem,
      [name]: value,
    }));

    // Access the updated formData in the callback
    setFormData((prevInputItem) => {
      const treatment = treatments.find(
        (treatment) => treatment.treatment_name === prevInputItem.treatment_name
      );
      return {
        ...prevInputItem,
        total_cost: treatment?.treatment_cost,
      };
    });
  };

  console.log(formData);

  const getTreatmentList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/treatmentLists`
      );
      console.log(data);
      setTreatments(data.data);
    } catch (error) {
      console.log("Error fetching treatments:", error);
    }
  };

  console.log(treatments);
  const handleEditAppointment = () => {
    setShowEditPopup(true);
  };

  useEffect(() => {
    getTreatmentList();
  }, []);

  // Get Patient Details START

  const getPatientDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${id}`
      );
      setGetPatientData(res.data.result);
      console.log(res.data.result);

      const uhid = res.data.result[0]?.uhid;
      setFormData((prevState) => ({
        ...prevState,
        p_uhid: uhid || "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientDetail();
  }, []);

  const timelineForTreatSuggest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8888/api/doctor/insertTimelineEvent",
        {
          type: "Treatment Suggest",
          description: "Select Treatment Plan",
          branch: branch,
          patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalCost = () => {
    let uniqueTreatments = formData.treatment_name;

    const treatment = treatments.find(
      (treatment) => treatment.treatment_name === uniqueTreatments
    );

    return treatment?.treatment_cost;
  };

  useEffect(() => {
    const calculatedValue = calculateTotalCost();
    setValue(calculatedValue);
  }, []);

  const forms = {
    appoint_id: id,
    branch: branch,
    p_uhid: formData.p_uhid,
    tp_id: tpid,
    treatment_name: formData.treatment_name,
    totalCost: formData.total_cost,
    total_sitting: formData.total_sitting,
  };

  console.log(forms);

  //form number one
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8888/api/doctor/insertTreatSuggest`,
        forms
      );
      alert("Successfully added!");
      console.log(res.data);
      timelineForTreatSuggest();
      setFormData({
        ...formData,
        treatment_name: "",
        total_sitting: "",
        total_cost: "",
      });
      dispatch(toggleTableRefresh());
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleNavigate = () => {
    navigate(`/TreatmentDashBoard/${id}`);
  };

  const handleCollect = () => {
    navigate(`/SecurityAmount/${id}/${tpid}`);
  };

  return (
    <>
      <Wrapper>
        <div className="container main">
          <div className="row justify-content-center ">
            <div className="text-start">
              <button
                className="btn btn-secondary mb-2"
                onClick={() => window.history.back()}
              >
                <GiFastBackwardButton size={22} />
              </button>
              <p className="fs-1 shadow-none p-2 bg-light rounded text-center">
                Treatment Suggestion
              </p>
            </div>
          </div>
        </div>
        <div className="container patient">
          <div className="row shadow-sm p-3 mb-3 bg-body rounded">
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
        <div className="container mainbody">
          <div className="row shadow-sm p-3 mb-2 bg-body rounded">
            <form onSubmit={handleSubmitForm}>
              <div className="container">
                <div className="row">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="">
                      <div className="d-flex justify-content-between">
                        <div className="">
                          <div className="text-center">
                            <label className="label">Select Treatments</label>
                          </div>
                          <select
                            className="form-select text-center w-100"
                            name="treatment_name"
                            aria-label="Default select example"
                            onChange={handleChange}
                            value={formData.treatment_name}
                          >
                            <option value="">-select treatment-</option>
                            {treatments.map((item, index) => (
                              <option key={index}>{item.treatment_name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="text-start">
                          <label className="label">Total Cost</label>
                          <input
                            type="text" // Change the input type to text for now
                            className="form-control w-100"
                            name="total_cost"
                            value={
                              formData.treatment_name ? formData.total_cost : ""
                            }
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="text-center">
                      <label className="label">
                        How Many Sitting Are Required ?
                      </label>
                      <div className="d-flex justify-content-center align-item-center">
                        <input
                          type="number"
                          className="form-control w-100"
                          name="total_sitting"
                          placeholder="Answer...."
                          onChange={handleChange}
                          value={formData.total_sitting}
                          min="1"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                    <div className="h-100 d-flex justify-content-center align-items-center">
                      <button
                        type="submit"
                        className="btn btn-info text-light mt-5"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  {/* <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="d-flex flex-column align-items-center mt-3 mb-3">
                      <label className="label">
                        Consider this is first Sitting ?
                      </label>
                      <div className="d-flex justify-content-evenly">
                        <input
                          type="radio"
                          name="first_sitting"
                          value="YES"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              consider_sitting: e.target.value,
                            })
                          }
                          checked={formData.consider_sitting === "YES"}
                        />
                        <label htmlFor="yes"> &nbsp;YES</label>
                        &nbsp; &nbsp; &nbsp;
                        <input
                          type="radio"
                          name="first_sitting"
                          value="NO"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              consider_sitting: e.target.value,
                            })
                          }
                          checked={formData.consider_sitting === "NO"}
                        />
                        <label htmlFor="no"> &nbsp;NO</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="d-flex flex-column align-items-center mt-3 mb-3">
                      <label className="label">Book Next Sitting Date</label>
                      <div className="d-flex justify-content-evenly">
                        {formData.treatment_sitting === "1" &&
                        formData.consider_sitting === "YES" ? (
                          "-"
                        ) : (
                          <>
                          <button type="button" className="btn btn-success" onClick={handleEditAppointment}>Book Sitting</button>
                          {showEditPopup && (
        <EditAppointment getPatientData={getPatientData} onClose={() => setShowEditPopup(false)}/>
      )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="d-flex flex-column align-items-center mt-3 mb-3">
                      <label className="label">Add Note</label>
                      <div className="d-flex justify-content-evenly">
                        <input
                          type="text"
                          className="form-control"
                          name="note"
                          placeholder="Note for Patient"
                          onChange={(e) =>
                            setFormData({ ...formData, note: e.target.value })
                          }
                          value={formData.note}
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="container p-0">
          <SuggestedtreatmentList tpid={tpid} getPatientData={getPatientData} />
        </div>

        <div className="container">
          <div className="row shadow-sm p-3 mb-5 bg-body rounded">
            <div className="d-flex justify-content-center align-items-center">
              <button
                className="btn btn-info text-light mx-2"
                onClick={handleNavigate}
              >
                Start Treatment
              </button>
              <button
                type="button"
                className="btn btn-info text-light"
                onClick={handleCollect}
              >
                Collect Security Money
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default TreatSuggest;
const Wrapper = styled.div`
  .main {
    margin-top: 1rem;
    @media (min-width: 767px) and (max-width: 913px) {
      width: 37rem;
    }
    @media (min-width: 992px) and (max-width: 1024px) {
      width: 47rem;
    }
  }
  .mainbody {
    @media (min-width: 767px) and (max-width: 913px) {
      width: 37rem;
    }
    @media (min-width: 992px) and (max-width: 1024px) {
      width: 47rem;
    }
  }
  .form {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0 20px 0;
  }
  .label {
    margin-inline: 1rem;
    font-weight: 500;
    font-size: 1.2rem;
    padding: 1rem;
  }
`;
