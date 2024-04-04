import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import CreatableSelect from 'react-select/creatable';
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';

const NewTreatPrescription = () => {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const branch = user.currentUser.branch_name;
      console.log(branch);
    const [getPatientData, setGetPatientData] = useState([]);
    const [getExaminData, setGetExaminData] = useState([]);
    const [getTreatData, setGetTreatData] = useState([]);
    const [prescriptionData, setPrescriptionData] = useState({
        patient_uhid: null,
        medicine_name: [],
        dosage: '',
        frequency: '',
        duration: '',
        note: ''
    });
    const [medicineOptions, setMedicineOptions] = useState([]);
    const [getTreatMedicine, setGetTreatMedicine] = useState([]);
    const [getSum, setGetSum] = useState(0);

    const [getlab, setGetlab] = useState([]);
    const [getTreatSug, setGetTreatSug] = useState([]);
    console.log(getlab);
    // console.log(prescriptionData)

    // Get Patient Details START
    const getPatientDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${id}`);

            const uhid = res.data.result.length > 0 ? res.data.result[0].uhid : null;
            setPrescriptionData(prevInputItem => ({
                ...prevInputItem,
                patient_uhid: uhid
            }));

            setGetPatientData(res.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPatientDetail();
    }, []);
    // Get Patient Details END

    // Get Patient Examintion Details START
    const getExaminDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getDentalDataByID/${id}`);
            setGetExaminData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getExaminDetail();
    }, []);
    // Get Patient Examintion Details END

    // Get Patient Treatment Details START
    const getTreatDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getTreatmentData/${id}`);
            setGetTreatData(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

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
                    description: "Add Medicine",
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
        try {
            const response = await axios.post(`http://localhost:8888/api/doctor/insertTreatPrescription/${id}`, prescriptionData);
            console.log(response.data);
            timelineForMedical();
            window.location.reload();
            // setGetTreatMedicine([...getTreatMedicine, response.data]);
            // Handle success, maybe show a success message
            setPrescriptionData({
                medicine_name: [],
                dosage: '',
                frequency: '',
                duration: '',
                note: ''
            })
        } catch (error) {
            console.error('Error:', error.response.data);
            alert('Error:', error.response.data)
            // Handle error, maybe show an error message
        }
    };

    const handleMedicineChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setPrescriptionData({ ...prescriptionData, medicine_name: selectedValues });
    };


    const handleCreateMedicine = (newValue) => {
        const newOption = { value: newValue, label: newValue };
        setMedicineOptions([...medicineOptions, newOption]);
        setPrescriptionData({ ...prescriptionData, medicine_name: [...prescriptionData.medicine_name, newValue] });
    };

    useEffect(() => {
        const fetchMedicineOptions = async () => {
            try {
                const response = await axios.get('http://localhost:8888/api/doctor/getMedicineData');
                const options = response.data.map(medicine => ({ value: medicine, label: medicine }));
                setMedicineOptions(options);
            } catch (error) {
                console.error('Error fetching medicine options:', error);
            }
        };
        fetchMedicineOptions();
    }, []);
    // Insert Medical Prescription Data END

    // Get Treatment Medical Prescription Data START
    const getTreatPrescriptionByAppointId = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getTreatPrescriptionByAppointId/${id}`);
            setGetTreatMedicine(res.data);
            console.log(res.data);
            setGetSum(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTreatPrescriptionByAppointId()
    }, [])
    // Get Treatment Medical Prescription Data END

    // Get lab test Data START
    const getlabByAppointId = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/lab-data/${id}`);
            setGetlab(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    
    useEffect(() => {
        getlabByAppointId()
    }, [])
    // Get lab test Data END

     // Get Treatment Suggest START
     const getTreatmentSuggestAppointId = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getTreatSuggest/${id}`);
            setGetTreatSug(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTreatmentSuggestAppointId()
    }, [])
     // Get Treatment Suggest END

    const handledelete = async (id) => {
        console.log(id);
        try {
            const confirmed = window.confirm("Are you sure you want to delete?"); // Show confirmation dialog

            if (confirmed) {
                const res = await axios.delete(`http://localhost:8888/api/doctor/deleteTreatPrescriptionById/${id}`);
                console.log(res.data); // Log response data

                setGetTreatMedicine(getTreatMedicine.filter(item => item.id !== id)); // Remove deleted item from data
            }
        } catch (error) {
            console.log(error);
            // Optionally, provide feedback to the user
            window.alert("An error occurred while deleting the item.");
        }
    }

    const timelineForBill = async () => {

        try {
            const response = await axios.post(
                "http://localhost:8888/api/doctor/insertTimelineEvent",
                {
                    type: "Bill Data",
                    description: "Add Bill Data Patient Table",
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
            const billResponse = await axios.get(`http://localhost:8888/api/doctor/bill-patient-data/${id}`);
            console.log('Bill data fetched successfully');
            timelineForBill();
    
            // Check if bill data was fetched successfully
            if (billResponse.data.success) {
                navigate(`/ViewTreatPrescription/${id}`);
            } else {
                console.error('Error fetching bill data:', billResponse.data.message);
            }
        } catch (error) {
            console.error('fetching bill data:', error);
        }
    };
    

    const grandTotal = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getTreatmentDatasum/${id}`);
            setGetSum(res.data.total_amount);
        } catch (error) {
            console.log(error);
        }
    }

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
                <div className="container">
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        <legend className="">Patient Details</legend>
                        {getPatientData?.map((item, index) => (
                            <>
                                <div key={index} className="col-lg-12 d-flex justify-content-between align-items-center">
                                    <div className="col-lg-4">
                                        <p><strong>Appoint ID</strong> : {item.appoint_id}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p><strong>Patient Name</strong> : {item.patient_name}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p><strong>Patient Mobile No.</strong> : {item.mobileno}</p>
                                    </div>
                                </div>
                                <div key={index + 'secondRow'} className="col-lg-12 d-flex justify-content-between align-items-center">
                                    <div className="col-lg-4">
                                        <p className="mb-0"><strong>Blood Group</strong> : {item.bloodgroup}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="mb-0"><strong>Disease</strong> : {item.disease}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="mb-0"><strong>Allergy</strong> : {item.allergy}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div className="container">
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        <fieldset>
                            <legend className="">Patient Examination Details</legend>
                            <div className="d-flex justify-content-between align-items-center col-lg-12 " style={{ background: "#0dcaf0", borderRadius: "5px" }}>
                                <div className="col-lg-2 d-flex flex-column text-center">
                                    <label>Seleted Teeth</label>

                                </div>
                                <div className="col-lg-2 d-flex flex-column text-center">
                                    <label>Disease</label>

                                </div>
                                <div className="col-lg-2 d-flex flex-column text-center">
                                    <label>Chief Complain</label>

                                </div>
                                <div className="col-lg-3 d-flex flex-column text-center">
                                    <label>On Exmination</label>

                                </div>
                                <div className="col-lg-3 d-flex flex-column text-center">
                                    <label>Advice</label>
                                </div>
                            </div>
                            {getExaminData.map((item, index) => (
                                <>
                                    <div key={index} className="d-flex justify-content-between align-items-center col-lg-12">
                                        <div className="col-lg-2 d-flex flex-column text-center">

                                            <p>{item.selected_teeth}</p>
                                        </div>
                                        <div className="col-lg-2 d-flex flex-column text-center">

                                            <p>{item.disease}</p>
                                        </div>
                                        <div className="col-lg-2 d-flex flex-column text-center">

                                            <p>{item.chief_complain}</p>
                                        </div>
                                        <div className="col-lg-3 d-flex flex-column text-center">

                                            <p>{item.on_examination}</p>
                                        </div>
                                        <div className="col-lg-3 d-flex flex-column text-center">

                                            <p>{item.advice}</p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </fieldset>
                    </div>
                </div>
                <div className="container">
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        <fieldset>
                            <legend className="">Treatment Suggest</legend>
                            <div className="d-flex justify-content-evenly align-items-center col-lg-12 " style={{ background: "#0dcaf0", borderRadius: "5px" }}>
                                <div className="col-lg-2 d-flex flex-column text-center">
                                    <label>Treatment Name</label>

                                </div>
                                <div className="col-lg-2 d-flex flex-column text-center">
                                    <label>Note</label>

                                </div>
                            </div>
                            {getTreatSug?.map((item, index) => (
                                <>
                                    <div key={index} className="d-flex justify-content-evenly align-items-center col-lg-12">
                                        <div className="col-lg-2 d-flex flex-column text-center">

                                            <p>{item.treatment_name}</p>
                                        </div>
                                        <div className="col-lg-2 d-flex flex-column text-center">

                                            <p>{item.note}</p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </fieldset>
                    </div>
                </div>
                <div className="container">
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        <fieldset>
                            <legend className="">Patient Laboratory Test</legend>
                            <div className="d-flex justify-content-evenly align-items-center col-lg-12 " style={{ background: "#0dcaf0", borderRadius: "5px" }}>
                                <div className="col-lg-2 d-flex flex-column text-center">
                                    <label>Lab Test</label>

                                </div>
                                <div className="col-lg-2 d-flex flex-column text-center">
                                    <label>Date</label>

                                </div>
                            </div>
                            {getlab?.map((item, index) => (
                                <>
                                    <div key={index} className="d-flex justify-content-evenly align-items-center col-lg-12">
                                        <div className="col-lg-2 d-flex flex-column text-center">

                                            <p>{item.test_name}</p>
                                        </div>
                                        <div className="col-lg-2 d-flex flex-column text-center">

                                            <p>{item.date}</p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </fieldset>
                    </div>
                </div>
                <div className="container">
                    <div className="row shadow-sm p-3 mb-1 bg-body rounded">
                        <fieldset>
                            <legend className="">Patient Treatment Details</legend>
                            <div className="d-flex justify-content-between align-items-center col-lg-12 " style={{ background: "#0dcaf0", borderRadius: "5px" }}>
                                <div className="col-lg-3 d-flex flex-column text-center">
                                    <label>Dental Treatment</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Teeth</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Qty</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Cost</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Cst * Qty</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Disc %</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Final Cost</label>

                                </div>
                                <div className="col-lg-3 d-flex flex-column text-center">
                                    <label>Note</label>

                                </div>
                            </div>
                            {getTreatData.map((item, index) => (
                                <>
                                    <div key={index} className="d-flex justify-content-between align-items-center col-lg-12">
                                        <div className="col-lg-3 d-flex flex-column text-center">
                                            <p>{item.dental_treatment}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.no_teeth}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.qty}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.original_cost_amt}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.cost_amt}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.disc_amt}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.total_amt}</p>
                                        </div>
                                        <div className="col-lg-3 d-flex flex-column text-center">

                                            <p>{item.note}</p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </fieldset>
                    </div>
                    <div className="row shadow-sm mb-3 bg-body rounded">
                        <div className="d-flex justify-content-evenly align-items-center">
                            <p className="m-0 fs-5 fw-bold">Grand Total: </p>
                            <p className="m-0 fs-5 fw-bold">{getSum} </p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                        <label>Medicine Name</label>
                                        <CreatableSelect
                                            options={medicineOptions}
                                            isMulti
                                            onChange={handleMedicineChange}
                                            onCreateOption={handleCreateMedicine}
                                            value={prescriptionData?.medicine_name?.map(medicine => ({ value: medicine, label: medicine }))}
                                            placeholder="Select medicine..."
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                        <label>Dosage</label>
                                        <input type="text" id="dosage" className="form-control" name="dosage" value={prescriptionData?.dosage} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                        <label>Frequency</label>
                                        <select id="frequency" className="form-control" name="frequency" value={prescriptionData?.frequency} onChange={handleChange}>
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
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                        <label>Duration</label>
                                        <select id="duration" className="form-control" name="duration" value={prescriptionData.duration} onChange={handleChange}>
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
                                <div className="col">
                                    <div data-mdb-input-init className="form-outline">
                                        <label>Note</label>
                                        <input type="text" id="note" className="form-control" name="note" value={prescriptionData.note} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-secondary fs-5 mt-4" type="submit">Add<IoMdAdd size={20} /></button>
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
                            <thead className='table-success rounded'>
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
                                        <td><button className="btn btn-danger" onClick={() => handledelete(item.id)}><FaPrescriptionBottleMedical size={22} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="text-center mb-3">
                    <button className="btn btn-info fs-5 text-light" onClick={handleNavigate}>Save & Continue <FaLocationArrow size={25} /></button>
                </div>
                {/* )} */}
            </Wrapper>
        </>
    )
}

export default NewTreatPrescription;
const Wrapper = styled.div`
legend{
    font-size: 2.0rem;
   
}
label{
    font-size: 1.2rem;
    font-weight: 500;
}
p{
    white-space: nowrap;
}
`;