import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiFastBackwardButton } from "react-icons/gi";
import axios from "axios";
import { useParams } from "react-router-dom";

const TreatSuggest = () => {
    const { id } = useParams();
    console.log(id);
    const [treatments, setTreatments] = useState([]);
    const [getPatientData, setGetPatientData] = useState([]);
    const [currentForm, setCurrentForm] = useState(1); // State to track current form
    const [formData, setFormData] = useState({
        appoint_id: id,
        p_uhid: "",
        treatment_name: "",
        treatment_sitting: "",
        consider_sitting: "",
        sitting_result: ""
    });

    console.log(formData);

    const getTreatmentList = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8888/api/doctor/treatmentLists`
            );
            console.log(res.data.data);
            setTreatments(res.data.data);
        } catch (error) {
            console.log("Error fetching treatments:", error);
        }
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

            const uhid = res.data.result[0]?.uhid; // Assuming you get only one patient data
            setFormData(prevState => ({
                ...prevState,
                p_uhid: uhid || "" // Set uhid in the form state as p_uhid
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPatientDetail();
    }, []);

    // Get Patient Details END

    const handleSubmitForm = async (e) => {
        e.preventDefault();
    
        let sitting_result = 0;
    
        if (formData.consider_sitting === "YES") {
            sitting_result = formData.treatment_sitting - 1;
        } else {
            sitting_result = formData.treatment_sitting;
        }
    
        const forms = {
            appoint_id: id,
            p_uhid: formData.p_uhid,
            treatment_name: formData.treatment_name,
            treatment_sitting: formData.treatment_sitting,
            consider_sitting: formData.consider_sitting,
            sitting_result: sitting_result,
        };
    
        if (currentForm < 3) {
            setCurrentForm(currentForm + 1); // Move to the next form
        } else {
            try {
                const res = await axios.post(
                    `http://localhost:8888/api/doctor/insertTreatSuggest`,
                    forms
                );
                alert("Successfully added!");
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
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
                    <div className="row shadow-sm p-3 mb-5 bg-body rounded">
                        <form onSubmit={handleSubmitForm}>
                            {currentForm === 1 && (
                                <div className="">
                                    <div className="text-center">
                                        <label className="label">Select Treatment ?</label>
                                    </div>
                                    <div className="d-flex justify-content-center align-item-center text-center">
                                        <select
                                            className="form-select text-center w-25"
                                            name="treatment_name"
                                            aria-label="Default select example"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    treatment_name: e.target.value,
                                                })
                                            }
                                            value={formData.treatment_name}
                                        >
                                            <option selected>Choose Treatment</option>
                                            {treatments.map((item, index) => (
                                                <option key={index}>{item.treatment_name}</option>
                                            ))}
                                        </select>
                                        <div className="m-2">
                                            <button type="submit" className="btn btn-primary">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {currentForm === 2 && (
                                <div className="text-center">
                                    <label className="label">
                                        How Many Sitting Are Required ?
                                    </label>
                                    <div className="d-flex justify-content-center align-item-center">
                                        <input
                                            type="number"
                                            className="form-control w-25"
                                            name="sittings_required"
                                            placeholder="Answer...."
                                            onChange={(e) => setFormData({ ...formData, treatment_sitting: e.target.value })}
                                            value={formData.treatment_sitting}
                                        />
                                        <div className="m-2">
                                            <button type="submit" className="btn btn-primary">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {currentForm === 3 && (
                                <div className="d-flex flex-column align-items-center mt-3 mb-3">
                                    <label className="label">
                                        Consider this is first Sitting ?
                                    </label>
                                    <div className="d-flex justify-content-evenly">
                                        <input type="radio" name="first_sitting" value="YES"
                                            onChange={(e) => setFormData({ ...formData, consider_sitting: e.target.value })}
                                            checked={formData.consider_sitting === "YES"} />
                                        <label htmlFor="yes">YES</label>
                                        &nbsp;
                                        <input type="radio" name="first_sitting" value="NO" onChange={(e) => setFormData({ ...formData, consider_sitting: e.target.value })}
                                            checked={formData.consider_sitting === "NO"} />
                                        <label htmlFor="no">NO</label>
                                    </div>
                                    <div className="m-2">
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
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
