import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import CreatableSelect from "react-select/creatable";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const NewTreatPrescription = () => {
  const { tsid, id, tpid, sitting, treatment } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  const [getPatientData, setGetPatientData] = useState([]);
  const [getExaminData, setGetExaminData] = useState([]);
  const [getTreatData, setGetTreatData] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState({
    branch_name: branch,
    patient_uhid: "",
    desease: "",
    treatment: "",
    medicine_name: "",
    dosage: "",
    frequency: "",
    duration: "",
    note: "",
  });
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [getTreatMedicine, setGetTreatMedicine] = useState([]);
  const [getSum, setGetSum] = useState(0);

  const [getlab, setGetlab] = useState([]);
  const [getTreatSug, setGetTreatSug] = useState([]);
  console.log(getlab);
  // console.log(prescriptionData)

  const getTreatmentList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getExaminedataByIdandexamine/${tsid}/${tpid}`
      );
      console.log(data);
      setTreatments(data);
    } catch (error) {
      console.log("Error fetching treatments:", error);
    }
  };

  console.log(treatments[0]?.disease);

  // Get Patient Details START
  const getPatientDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${tpid}`
      );
      setGetPatientData(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientDetail();
    getTreatmentList();
  }, []);
  // Get Patient Details END

  // Get Patient Examintion Details START
  const getExaminDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8888/api/doctor/getDentalDataByTpid/${tpid}/${branch}`
      );
      setGetExaminData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExaminDetail();
  }, []);

  console.log(getExaminData);
  // Get Patient Examintion Details END

  // Get Patient Treatment Details START
  const getTreatDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getTreatList/${branch}/${tpid}`
      );
      setGetTreatData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getTreatData);
  useEffect(() => {
    getTreatDetail();
  }, []);
  // Get Patient Treatment Details END

  // Insert Medical Prescription Data START
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData({ ...prescriptionData, [name]: value });
  };

  const timelineForMedical = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8888/api/doctor/insertTimelineEvent",
        {
          type: "Medical Prescription",
          description: "Medicine Added Successfully",
          branch: branch,
          patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const medicineInput = {
    branch_name: branch,
    patient_uhid: getPatientData[0]?.uhid,
    desease: treatments[0]?.disease,
    treatment: treatment,
    medicine_name: prescriptionData.medicine_name,
    dosage: prescriptionData.dosage,
    frequency: prescriptionData.frequency,
    duration: prescriptionData.duration,
    note: prescriptionData.note,
  };

  console.log(medicineInput);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8888/api/doctor/insertTreatPrescription/${id}/${tpid}/${sitting}`,
        medicineInput
      );
      console.log(response.data);
      timelineForMedical();
      getTreatPrescriptionByAppointId();
      setPrescriptionData({
        desease: "",
        treatment: "",
        medicine_name: "",
        dosage: "",
        frequency: "",
        duration: "",
        note: "",
      });
    } catch (error) {
      console.error("Error:", error.response.data);
      alert("Error:", error.response.data);
      // Handle error, maybe show an error message
    }
  };

  const handleMedicineChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setPrescriptionData({ ...prescriptionData, medicine_name: selectedValues });
  };

  const handleCreateMedicine = (newValue) => {
    const newOption = { value: newValue, label: newValue };
    setMedicineOptions([...medicineOptions, newOption]);
    setPrescriptionData({
      ...prescriptionData,
      medicine_name: [...prescriptionData.medicine_name, newValue],
    });
  };

  const fetchMedicineOptions = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8888/api/doctor/getMedicineData"
      );
      setMedicineOptions(data);
    } catch (error) {
      console.error("Error fetching medicine options:", error);
    }
  };

  useEffect(() => {
    fetchMedicineOptions();
  }, []);
  // Insert Medical Prescription Data END

  // Get Treatment Medical Prescription Data START
  const getTreatPrescriptionByAppointId = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getTreatPrescriptionByAppointId/${id}/${tpid}/${treatment}`
      );
      setGetTreatMedicine(data);
      console.log(data);
      setGetSum(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatPrescriptionByAppointId();
  }, []);
  // Get Treatment Medical Prescription Data END

  // Get lab test Data START
  const getlabByAppointId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8888/api/doctor/lab-data/${id}`
      );
      setGetlab(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getlabByAppointId();
  }, []);
  // Get lab test Data END

  // Get Treatment Suggest START
  const getTreatmentSuggestAppointId = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getTreatmentData/${id}/${tpid}/${branch}/${sitting}/${treatment}`
      );
      setGetTreatSug(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentSuggestAppointId();
  }, []);

  console.log(getTreatSug);
  // Get Treatment Suggest END

  const handledelete = async (id) => {
    console.log(id);
    try {
      const confirmed = window.confirm("Are you sure you want to delete?"); // Show confirmation dialog

      if (confirmed) {
        const res = await axios.delete(
          `http://localhost:8888/api/doctor/deleteTreatPrescriptionById/${id}`
        );
        console.log(res.data); // Log response data

        setGetTreatMedicine(getTreatMedicine.filter((item) => item.id !== id)); // Remove deleted item from data
      }
    } catch (error) {
      console.log(error);
      // Optionally, provide feedback to the user
      window.alert("An error occurred while deleting the item.");
    }
  };

  const timelineForBill = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8888/api/doctor/insertTimelineEvent",
        {
          type: "Bill Data",
          description: "Bill Generated for the sitting",
          branch: branch,
          patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = async () => {
    try {
      // Make the API call to fetch bill data
      const billResponse = await axios.get(
        `http://localhost:8888/api/doctor/bill-patient-data/${id}`
      );
      console.log("Bill data fetched successfully");
      timelineForBill();

      // Check if bill data was fetched successfully
      if (billResponse.data.success) {
        navigate(`/ViewTreatPrescription/${tpid}/${sitting}/${treatment}`);
      } else {
        console.error("Error fetching bill data:", billResponse.data.message);
      }
    } catch (error) {
      console.error("fetching bill data:", error);
    }
  };

  const grandTotal = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8888/api/doctor/getTreatmentDatasum/${id}`
      );
      setGetSum(res.data.total_amount);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getTreatMedicine);

  useEffect(() => {
    grandTotal(id);
  }, []);

  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row">
            <div className="text-center fs-1 shadow-none p-1 mt-4 mb-4 bg-light rounded">
              <p>Medical Prescription</p>
            </div>
          </div>
        </div>
        {/* patient details */}
        <div className="container">
          <div className="row shadow-sm p-3 mb-3 bg-body rounded">
            <legend className="">Patient Details</legend>
            <p></p>
            {getPatientData?.map((item, index) => (
              <>
                <div key={index} className="col-lg-12">
                  <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p>
                        <strong>Treatment Package :{tpid}</strong>
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

        {/* Patient Examination Details */}
        <div className="container">
          <legend className="">Patient Examination Details</legend>
          <div className="table-responsive rounded">
            <table
              className="table table-bordered table-striped border"
              style={{ overflowX: "scroll" }}
            >
              <thead>
                <tr>
                  <th>Seleted Teeth</th>
                  <th>Desease</th>
                  <th>Chief Complain</th>
                  <th>On Exmination</th>
                  <th>Advice</th>
                </tr>
              </thead>
              <tbody>
                {getExaminData?.map((item) => (
                  <>
                    <tr>
                      <td>{item.selected_teeth}</td>
                      <td>{item.disease}</td>
                      <td>{item.chief_complain}</td>
                      <td>{item.on_examination}</td>
                      <td>{item.advice}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patient Treatment Details */}
        <div className="container">
          <legend className="">Patient Treatment Details</legend>
          <div className="table-responsive rounded">
            <table
              className="table table-bordered table-striped border"
              style={{ overflowX: "scroll" }}
            >
              <thead>
                <tr>
                  <th>Sitting Number</th>
                  <th>Dental Treatment</th>
                  <th>Teeth</th>
                  <th>Teeth Quantity</th>
                  <th>Cost</th>
                  <th>Total Cost</th>
                  <th>Discount %</th>
                  <th>Net Amount</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {getTreatSug?.map((item) => (
                  <>
                    <tr>
                      <td>{item.sitting_number}</td>
                      <td>{item.dental_treatment}</td>
                      <td>{item.no_teeth}</td>
                      <td>{item.qty}</td>
                      <td>{item.cost_amt}</td>
                      <td>{item.total_amt}</td>
                      <td>{item.disc_amt}</td>
                      <td>{item.net_amount}</td>
                      <td>{item.note}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Medicine section starts */}
        <div className="container">
          <div className="row shadow-sm p-3 mb-3 bg-body rounded">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                  <div className="form-outline">
                    <label>Treatment</label>
                    {/* <select
                      className="form-select w-100"
                      name="treatment"
                      aria-label="Default select example"
                      onChange={handleChange}
                      value={prescriptionData.treatment}
                    >
                      <option value="">-select treatment-</option>
                      {getTreatData.map((item, index) => (
                        <option key={index} value={item.treatment_name}>
                          {item.treatment_name}
                        </option>
                      ))}
                    </select> */}
                    <input
                      type="text"
                      value={treatment}
                      readOnly
                      className="rounded"
                    />
                  </div>
                </div>
                <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                  <div className="form-outline">
                    <label>Desease</label>
                    <input
                      type="text"
                      value={treatments[0]?.disease}
                      readOnly
                      className="rounded"
                    />
                  </div>
                </div>
                <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                  <div className="form-outline">
                    <label>Medicine Name</label>
                    <select
                      className="form-select w-100"
                      name="medicine_name"
                      aria-label="Default select example"
                      onChange={handleChange}
                      value={prescriptionData.medicine_name}
                    >
                      <option value="">-select medicine-</option>
                      {medicineOptions.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                  <div data-mdb-input-init className="form-outline">
                    <label>Dosage</label>
                    <input
                      type="text"
                      id="dosage"
                      placeholder="dosage"
                      className="form-control"
                      name="dosage"
                      value={prescriptionData.dosage}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                  <div data-mdb-input-init className="form-outline">
                    <label>Frequency</label>
                    <select
                      id="frequency"
                      className="form-control"
                      name="frequency"
                      value={prescriptionData?.frequency}
                      onChange={handleChange}
                    >
                      <option value="">Choose frequency</option>
                      <option value="1-1-1(TDS)">1-1-1(TDS)</option>
                      <option value="1-1-0(BD)">1-1-0(BD)</option>
                      <option value="0-1-1(BD)">0-1-1(BD)</option>
                      <option value="1-0-1(BD)">1-0-1(BD)</option>
                      <option value="0-0-1(HS)">0-0-1(HS)</option>
                      <option value="0-1-0(OD)">0-1-0(OD)</option>
                      <option value="1-0-0(BM)">1-0-0(BM)</option>
                      <option value="SOS">SOS</option>
                    </select>
                  </div>
                </div>
                <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                  <div data-mdb-input-init className="form-outline">
                    <label>Duration</label>
                    <select
                      id="duration"
                      className="form-control"
                      name="duration"
                      value={prescriptionData.duration}
                      onChange={handleChange}
                    >
                      <option value="">Choose duration</option>
                      <option value="1 day">1 day</option>
                      <option value="2 days">2 days</option>
                      <option value="3 days">3 days</option>
                      <option value="4 days">4 days</option>
                      <option value="5 days">5 days</option>
                      <option value="6 days">6 days</option>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="3 weeks">3 weeks</option>
                      <option value="1 Month">1 Month</option>
                      <option value="3 Months">3 Months</option>
                    </select>
                  </div>
                </div>
                <div className="col-xxl-4 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                  <div data-mdb-input-init className="form-outline">
                    <label>Note</label>
                    <textarea
                      type="text"
                      id="note"
                      className="form-control"
                      placeholder="write note"
                      name="note"
                      value={prescriptionData.note}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <button
                      className="btn btn-secondary fs-5 mt-4"
                      type="submit"
                    >
                      Add
                      <IoMdAdd size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* {loading ? (
          <>
            <div className='text-center'><RiLoader2Fill size={35} className="spin" /></div>
          </>
        ) : ( */}
        <div className="container">
          <div className="row">
            <table class="table">
              <thead className="table-success rounded">
                <tr>
                  <th scope="col">Medicine Name</th>
                  <th scope="col">Dosage</th>
                  <th scope="col">Frequency</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Note</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {getTreatMedicine?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.medicine_name}</td>
                    <td>{item.dosage}</td>
                    <td>{item.frequency}</td>
                    <td>{item.duration}</td>
                    <td>{item.note}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handledelete(item.id)}
                      >
                        <FaPrescriptionBottleMedical size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-center mb-3">
          <button
            className="btn btn-info fs-5 text-light"
            onClick={handleNavigate}
          >
            Save & Continue <FaLocationArrow size={25} />
          </button>
        </div>
        {/* )} */}
      </Wrapper>
    </>
  );
};

export default NewTreatPrescription;
const Wrapper = styled.div`
  legend {
    font-size: 2rem;
  }
  label {
    font-size: 1.2rem;
    font-weight: 500;
  }
  p {
    white-space: nowrap;
  }
  th {
    background-color: #0dcaf0;
  }
`;
