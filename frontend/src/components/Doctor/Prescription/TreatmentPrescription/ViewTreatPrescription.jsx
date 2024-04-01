import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
import { setUser } from '../../../../redux/user/userSlice';

const ViewTreatPrescription = () => {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [getPatientData, setGetPatientData] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser); 
    const [getExaminData, setGetExaminData] = useState([]);
    const [getTreatData, setGetTreatData] = useState([]);
    const [getTreatMedicine, setGetTreatMedicine] = useState([]);

    // Get Patient Details START
    const getPatientDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${id}`);
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

    // Get Treatment Medical Prescription Data START
    const getTreatPrescriptionByAppointId = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getTreatPrescriptionByAppointId/${id}`);
            setGetTreatMedicine(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTreatPrescriptionByAppointId()
    }, [])
    // Get Treatment Medical Prescription Data END

    const handleButton = async() =>{
        console.log(id);
        try {
            // Make the API call to update sitting count
            console.log(id);
            await axios.get(`http://localhost:8888/api/doctor/updateSittingCount/${id}`);
            console.log(id);
            console.log('Sitting count updated successfully');
            window.print();
        } catch (error) {
            console.log('Error updating sitting count', error); 
        }
    }

    return (
        <>
            <Wrapper>
                <div className="container-fluid m-0 p-1 h-100">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="doctor-detail">
                                {currentUser && (
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="text-start">
                                            <h2>Dr. {currentUser.employee_name}</h2>
                                            <p className="fs-5">({currentUser.employee_designation})</p>
                                        </div>
                                        <div className="text-start">
                                            <h5>Mobile Number</h5>
                                            <p className='m-0 fs-5'>{currentUser.employee_mobile}</p>
                                            <p className='m-0 fs-5'>{currentUser.email}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <table className="table table-bordered border">
                                <tbody >
                                    {getPatientData.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <th scope="row">Appoint ID</th>
                                                <td>{item.appoint_id}</td>
                                                <th scope="row">Blood Group</th>
                                                <td>{item.bloodgroup}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Patient Name</th>
                                                <td>{item.patient_name}</td>
                                                <th scope="row">Disease</th>
                                                <td>{item.disease}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Patient Mobile No.</th>
                                                <td>{item.mobileno}</td>
                                                <th scope="row">Allergy</th>
                                                <td>{item.allergy}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                            <div className="diagnosis">
                                <p className="text-start fs-3 fw-normal">Diagnosis</p>
                                <table className="table table-bordered border">
                                    <thead>
                                        <tr>
                                            <th>Seleted Teeth</th>
                                            <th>Disease</th>
                                            <th>Chief Complain</th>
                                            <th>On Exmination</th>
                                            <th>Advice</th>
                                        </tr>
                                    </thead>
                                    {getExaminData.map((item, index) => (
                                        <tbody>
                                            <React.Fragment>
                                                <tr>
                                                    <td>{item.selected_teeth}</td>
                                                    <td>{item.disease}</td>
                                                    <td>{item.chief_complain}</td>
                                                    <td>{item.on_examination}</td>
                                                    <td>{item.advice}</td>
                                                </tr>
                                            </React.Fragment>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                            <div className="Treatment">
                                <p className="text-start fs-3 fw-normal">Treatment Advice</p>
                                <table className="table table-bordered border">
                                    <thead>
                                        <tr>
                                            <th>Dental Treatment</th>
                                            <th>Teeth</th>
                                            <th>Qty</th>
                                            <th>Cost</th>
                                            <th>Cst * Qty</th>
                                            <th>Disc %</th>
                                            <th>Final Cost</th>
                                            <th>Note</th>
                                        </tr>
                                    </thead>
                                    {getTreatData.map((item, index) => (
                                        <tbody>
                                            <React.Fragment>
                                                <tr>
                                                    <td>{item.dental_treatment}</td>
                                                    <td>{item.no_teeth}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.original_cost_amt}</td>
                                                    <td>{item.cost_amt}</td>
                                                    <td>{item.disc_amt}</td>
                                                    <td>{item.total_amt}</td>
                                                    <td>{item.note}</td>
                                                </tr>
                                            </React.Fragment>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                            <div className="Medicine">
                                <p className="text-start fs-3 fw-normal">Drug Category</p>
                                <table className="table table-bordered border">
                                    <thead>
                                        <tr>
                                            <th>Medicine Name</th>
                                            <th>Dosage</th>
                                            <th>Frequency</th>
                                            <th>Duration</th>
                                            <th>Note</th>
                                        </tr>
                                    </thead>
                                    {getTreatMedicine.map((item, index) => (
                                        <tbody>
                                            <React.Fragment>
                                                <tr>
                                                    <td>{item.medicine_name}</td>
                                                    <td>{item.dosage}</td>
                                                    <td>{item.frequency}</td>
                                                    <td>{item.duration}</td>
                                                    <td>{item.note}</td>
                                                </tr>
                                            </React.Fragment>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-success no-print mx-3 no-print" onClick={handleButton}>Complete & Print</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default ViewTreatPrescription;
const Wrapper = styled.div`
overflow: hidden;
background-color: white;
height: 100%;
.doctor-detail{
    margin-bottom: 0.5rem;
}
@media print {
  @page {
    margin: 0; /* Remove default page margins */
  }

  body {
    margin: 0; /* Ensure no margin on the body */
  }

  .container-fluid {
    width: 100%; /* Optionally set the width */
    margin: 0; /* Remove margin */
    padding: 0; /* Remove padding */
    page-break-before: auto;
  }
}
@media print {
  .no-print {
    display: none !important;
  }
}
`;