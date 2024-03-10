import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewTreatment = () => {
    const { id } = useParams();
    console.log(id);
    const [getPatientData, setGetPatientData] = useState([]);
    const [getExamTeeth, setGetExamTeeth] = useState([]);
    const navigate = useNavigate();

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

    // Get Examintion Teeth Details START

    const getExamintionTeeth = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getDentalDataByID/${id}`);
            setGetExamTeeth(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getExamintionTeeth();
    }, []);


    // Get Examintion Teeth Details END

    const handleNavigate = (id, appointment_id, selected_teeth) => {
        navigate(`/treatProducer/${id}/${appointment_id}`, {state: { selected_teeth } });
    }

    return (
        <>
            <Wrapper>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <p className="fs-1 shadow-none p-2 mb-4 bg-light rounded">Treatment Procedure</p>
                        </div>
                    </div>
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        {getPatientData.map((item, index) => (
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
                    <div className="row shadow-sm p-3 mt-5 mb-3 bg-dark rounded">
                        <div className="col-lg-12 d-flex justify-content-between align-items-center">
                            <div className="col-lg-4">
                                <p className="text-light text-center mb-0 fs-4">Teeth Number</p>
                            </div>
                            <div className="col-lg-4">
                                <p className="text-light text-center mb-0 fs-4">Disease</p>
                            </div>
                            <div className="col-lg-4">
                                <p className="text-light text-center mb-0 fs-4">Procedure Start</p>
                            </div>
                        </div>
                    </div>
                    {getExamTeeth.map((item, index) => (
                        <div key={index} className="row shadow-sm p-3 mt-3 mb-3 bg-light rounded">
                            <div className="col-lg-12 d-flex justify-content-between align-items-center">
                                <div className="col-lg-4">
                                    <p className="text-dark text-center mb-0 fs-4">{item.selected_teeth}</p>
                                </div>
                                <div className="col-lg-4">
                                    <p className="text-dark text-center mb-0 fs-4">{item.disease}</p>
                                </div>
                                <div className="col-lg-4 text-center">
                                    <button className="btn btn-secondary" onClick={() => handleNavigate(item.id, item.appointment_id, item.selected_teeth
)}>Start</button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </Wrapper>
        </>
    )
}

export default NewTreatment;
const Wrapper = styled.div`
`;