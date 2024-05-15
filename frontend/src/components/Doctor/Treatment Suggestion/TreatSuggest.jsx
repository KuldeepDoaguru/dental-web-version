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
  const employeeName = user.currentUser.employee_name;
  console.log(branch);
  const { id, tpid } = useParams();
  console.log(id, tpid);
  const { refreshTable } = useSelector((state) => state.user);
  const [labList, setLabList] = useState([]);
  const [labTestList, setLabTestList] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [getLabData, setGetLabData] = useState([]);
  const [getPatientData, setGetPatientData] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [procedureTreat, setProcedureTreat] = useState([]);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0); // State to track current form
  const [formData, setFormData] = useState({
    appoint_id: id,
    branch: branch,
    p_uhid: "",
    tp_id: tpid,
    desease: "",
    treatment_procedure: "",
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

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getDentalDataByID/${id}/${tpid}`
      );
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    getLabList();
    getLabTestList();
  }, []);

  console.log(labList);
  console.log(labTestList);

  const diseases = new Set(
    data.flatMap((entry) =>
      entry.disease.split(", ").map((disease) => disease.trim())
    )
  );

  const uniqueDiseases = [...diseases];

  console.log(uniqueDiseases);

  const getTreatmentList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/treatmentLists`
      );
      console.log(data);
      setTreatments(data.data);
    } catch (error) {
      console.log("Error fetching treatments:", error);
    }
  };

  console.log(treatments);

  const getProcedureTreat = async () => {
    try {
      const { data } = await axios.get(
        "https://dentalgurudoctor.doaguru.com/api/doctor/getProcedureList"
      );
      console.log(data);
      setProcedureTreat(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(procedureTreat);
  const handleEditAppointment = () => {
    setShowEditPopup(true);
  };

  useEffect(() => {
    getTreatmentList();
    getProcedureTreat();
  }, []);

  // Get Patient Details START

  const getPatientDetail = async () => {
    try {
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getAppointmentsWithPatientDetailsById/${tpid}`
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

  const getLabAllData = async () => {
    try {
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/lab-details/${tpid}`
      );
      setGetLabData(res.data.lab_details);
      console.log(res.data.lab_details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientDetail();
    getLabAllData();
  }, [refreshTable]);

  const timelineForTreatSuggest = async () => {
    try {
      const response = await axios.post(
        "https://dentalgurudoctor.doaguru.com/api/doctor/insertTimelineEvent",
        {
          type: "Treatment Suggest",
          description: `Select Treatment : ${formData.treatment_name} for desease : ${formData.desease}`,
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

  console.log(getPatientData);

  useEffect(() => {
    const calculatedValue = calculateTotalCost();
    setValue(calculatedValue);
  }, []);

  const forms = {
    appoint_id: id,
    branch: branch,
    p_uhid: getPatientData[0]?.uhid,
    tp_id: tpid,
    desease: formData.desease,
    treatment_procedure: formData.treatment_procedure,
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
        `https://dentalgurudoctor.doaguru.com/api/doctor/insertTreatSuggest`,
        forms
      );
      alert("Successfully added!");
      console.log(res.data);
      timelineForTreatSuggest();
      setFormData({
        ...formData,
        desease: "",
        treatment_procedure: "",
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

  const [labData, setLabData] = useState({
    tpid: tpid,
    patient_uhid: "",
    patient_name: "",
    branch_name: branch,
    assigned_doctor_name: employeeName,
    lab_name: "",
    test: "",
  });

  console.log(labData);

  const handleLabChange = (e) => {
    const { name, value } = e.target;
    setLabData({ ...labData, [name]: value });
  };

  const formsData = {
    tpid: tpid,
    patient_uhid: getPatientData[0]?.uhid,
    patient_name: getPatientData[0]?.patient_name,
    branch_name: branch,
    assigned_doctor_name: employeeName,
    lab_name: labData.lab_name,
    test: labData.test,
  };

  console.log(formsData);

  const handleLabSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://dentalgurudoctor.doaguru.com/api/doctor/insertLab`,
        formsData
      );
      setLabData({
        ...labData,
        lab_name: "",
        test: "",
      });
      dispatch(toggleTableRefresh());
      alert("Successfully added!");
      console.log(response.data);
    } catch (error) {
      console.error("Error inserting data:", error);
      // Handle error, maybe show an error message to the user
    }
  };

  const getLabList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getLab`
      );
      setLabList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLabTestList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getLabTest`
      );
      setLabTestList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const bloodTests = ["M C V", "M C H", "M C H C"];
  const xRayTests = [
    "Periapical X-rays",
    "Panoramic X-rays",
    "Occlusal X-rays",
    "Cone Beam Computed Tomography (CBCT)",
    "Bitewing X-rays",
  ];
  const oralTests = ["Allergy Test", "Saliva Test", "Sensitivity"];
  console.log(labTestList);
  const filter = labTestList?.filter((item) => {
    return item.test_name === labData.lab_name;
  });
  console.log(filter);
  return (
    <>
      <Wrapper>
        <div className="container main">
          <div className="">
            <div className="text-start">
              <button
                className="btn btn-secondary mb-2"
                onClick={() => window.history.back()}
              >
                <GiFastBackwardButton size={22} />
              </button>
            </div>
          </div>
          <p className="fs-1 p-3 bg-light rounded text-center">
            Treatment Suggestion
          </p>
        </div>
        <div className="container patient">
          <div className="row shadow-sm p-3 mb-3 bg-body rounded">
            {getPatientData.map((item, index) => (
              <>
                <div key={index} className="col-lg-12 ">
                  <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p>
                        <strong>Treatment PID</strong> : {tpid}
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
                <div key={index + "secondRow"} className="col-lg-12 ">
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
        <div className="container mainbody">
          <div className="row shadow-sm p-3 mb-2 bg-body rounded">
            <form onSubmit={handleSubmitForm}>
              <div className="container">
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="">
                      <div className="text-start">
                        <label className="label">Select Desease</label>
                      </div>
                      <select
                        className="form-select text-start w-100"
                        name="desease"
                        aria-label="Default select example"
                        onChange={handleChange}
                        value={formData.desease}
                        required
                      >
                        <option value="">-select desease-</option>
                        {uniqueDiseases.map((item, index) => (
                          <option key={index}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="">
                      <div className="text-start">
                        <label className="label">Select Procedure</label>
                      </div>
                      <select
                        className="form-select text-start w-100"
                        name="treatment_procedure"
                        aria-label="Default select example"
                        onChange={handleChange}
                        required
                        value={formData.treatment_procedure}
                      >
                        <option value="">-select treatment-</option>
                        {procedureTreat.map((item, index) => (
                          <option key={index}>
                            {item.treat_procedure_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="">
                      <div className="text-start">
                        <label className="label">Select Treatments</label>
                      </div>
                      <select
                        className="form-select text-start w-100"
                        name="treatment_name"
                        aria-label="Default select example"
                        onChange={handleChange}
                        required
                        value={formData.treatment_name}
                      >
                        <option value="">-select treatment-</option>

                        {treatments
                          ?.filter(
                            (item) =>
                              item.treat_procedure_name ===
                              formData.treatment_procedure
                          )
                          .map((item, index) => (
                            <option key={index}>{item.treatment_name}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="text-start">
                      <label className="label">Total Cost</label>
                      <input
                        type="text" // Change the input type to text for now
                        className="form-control w-100"
                        name="total_cost"
                        required
                        value={
                          formData.treatment_name ? formData.total_cost : ""
                        }
                        // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="text-start">
                      <label className="label">Required Sitting</label>
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
                  <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-12 col-12">
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
            <div className="text-start">
              <h3>Suggested Lab Test</h3>
            </div>
            <div>
              <form onSubmit={handleLabSubmit}>
                <div className="container">
                  <div className="row">
                    <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                      <div className="text-start">
                        <label className="label">Test Name</label>
                        <select
                          name="lab_name"
                          onChange={handleLabChange}
                          value={labData.lab_name}
                          className="form-select text-start"
                        >
                          <option value="">---Select Test Name ---</option>
                          {labList?.map((item) => (
                            <>
                              <option value={item.lab_name}>
                                {item.lab_name}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                      <div className="text-start">
                        <label className="label">Test</label>
                        <div className="d-flex justify-content-center align-item-center">
                          <select
                            name="test"
                            onChange={handleLabChange}
                            value={labData.test}
                            className="form-select text-start"
                          >
                            <option value="">-select-</option>
                            {labTestList
                              ?.filter(
                                (item) => item.default_lab === labData.lab_name
                              )
                              .map((test, index) => (
                                <>
                                  <option key={index} value={test.test_name}>
                                    {test.test_name}
                                  </option>
                                </>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                      <div className="h-100 d-flex justify-content-center align-items-center">
                        <button
                          type="submit"
                          className="btn btn-info text-light mt-5"
                        >
                          Submit Test
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="container">
          <legend className="">Patient Lab Test</legend>
          <div className="table-responsive rounded">
            <table
              className="table table-bordered table-striped border"
              style={{ overflowX: "scroll" }}
            >
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Test</th>
                </tr>
              </thead>
              <tbody>
                {getLabData?.map((item) => (
                  <>
                    <tr>
                      <td>{item.lab_name}</td>
                      <td>{item.test}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="container">
          <div className="row shadow-sm p-3 mb-5 bg-body rounded">
            <div className="d-flex justify-content-center align-items-center">
              {/* <button
                className="btn btn-info text-light mx-2"
                onClick={handleNavigate}
              >
                Start Treatment
              </button> */}
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
    width: 100% !important;
    @media (min-width: 767px) and (max-width: 913px) {
      width: 100%;
    }
    @media (min-width: 992px) and (max-width: 1024px) {
      width: 100%;
    }
  }
  .mainbody {
    @media (min-width: 767px) and (max-width: 913px) {
      width: 100%;
    }
    @media (min-width: 992px) and (max-width: 1024px) {
      width: 100%;
    }
  }
  .form {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0 20px 0;
  }
  .label {
    /* margin-inline: 1rem; */
    font-weight: 500;
    font-size: 1.2rem;
    padding: 0.5rem 0rem;
  }
`;
