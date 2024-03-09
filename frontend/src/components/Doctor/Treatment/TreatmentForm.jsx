import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaTooth } from "react-icons/fa";

const TreatmentForm = () => {
    const { id, appointment_id } = useParams();
    console.log(id);
    console.log(appointment_id);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        dental_treatment: '',
        no_teeth: '',
        qty: '',
        cost_amt: '',
        disc_amt: '',
        total_amt: '',
        note: ''
    });

    // Send Treatment Data to the Server....

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointmentId = 'your_appointment_id_here'; // Replace 'your_appointment_id_here' with the actual appointment ID
        try {
            const response = await axios.post(`http://localhost:8888/api/doctor/insertTreatmentData/${appointmentId}`, formData);
            console.log(response.data); // Log the response from the server
            // Reset form data if needed
            setFormData({
                dental_treatment: '',
                no_teeth: '',
                qty: '',
                cost_amt: '',
                disc_amt: '',
                total_amt: '',
                note: ''
            });
        } catch (error) {
            console.error('Error inserting treatment details:', error);
            // Handle error, display error message to user
        }
    };

    return (
        <>
            <Wrapper>
                <div className="container">
                    <div className="row shadow-sm p-4 mb-3 bg-white rounded" >
                        <form>
                            <div className="d-flex justify-content-between align-items-center p-2">
                                <div className="row">
                                    <div
                                        className="col-md-4 w-100"
                                        style={{ position: "relative" }}
                                    >
                                        <select className="shadow-none p-1 bg-light rounded border-0" >
                                            <option value="" disabled selected>Choose Treatment</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="input2"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            // value={item.selected_teeth}
                                            placeholder="Teeth Number"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="input3"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            // value={inputs.input3}                      
                                            readOnly
                                            placeholder="Quantity"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center p-2">
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="input4"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            // value={inputValues.cost}
                                            placeholder="Cost Amount"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="input5"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            // value={inputValues.discount}
                                            // onChange={(e) => setInputValues({ ...inputValues, discount: e.target.value })}
                                            placeholder="Discount Amount"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="input6"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            // value={calculateTotal()}
                                            placeholder="Total Amount"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-evenly align-items-center p-2">
                                <div className="row">
                                    <div className="col-md-8">
                                        <textarea
                                            type="text"
                                            name="input7"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            // value={inputs.input7}                    
                                            placeholder="Add some more details"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <button className="btn btn-info text-light">
                                    Teeth Treatment Done <FaTooth size={22}/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default TreatmentForm;
const Wrapper = styled.div`
`;