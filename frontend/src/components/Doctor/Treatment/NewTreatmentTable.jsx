import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";

const NewTreatmentTable = () => {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [treatmentData, setTreatmentData] = useState([]);
    const [modalIndex, setModalIndex] = useState(null);
    const [formData, setFormData] = useState({
        dental_treatment: "",
        no_teeth: "",
        qty: "",
        cost_amt: "",
        original_cost_amt: "",
        disc_amt: "",
        total_amt: "",
        note: ""
    });

    const fetchTreatmentData = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getTreatmentData/${id}`);
            setTreatmentData(res.data.data)
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTreatmentData();
    }, []);

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8888/api/doctor/updateTreatmentData/${id}`, formData);
            window.location.reload();
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleModalOpen = (index) => {
        // Set formData with values of the item being edited
        const item = treatmentData[index];
        setFormData({
            dental_treatment: item.dental_treatment,
            no_teeth: item.no_teeth,
            qty: item.qty,
            cost_amt: item.cost_amt,
            original_cost_amt: item.original_cost_amt,
            disc_amt: item.disc_amt,
            total_amt: item.total_amt,
            note: item.note
        });
        // Set the modalIndex to manage which modal is open
        setModalIndex(index);
    };

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?"); // Show confirmation dialog

            if (confirmed) {
                const res = await axios.delete(`http://localhost:8888/api/doctor/deleteTreatmentData/${id}`);
                console.log(res.data); // Log response data

                setTreatmentData(treatmentData.filter(item => item.id !== id)); // Remove deleted item from data
            }
        } catch (error) {
            console.log(error);
            // Optionally, provide feedback to the user
            window.alert("An error occurred while deleting the item.");
        }
    }

    const handleNavigate = () =>{
        navigate(`/NewTreatPrescription/${id}`)
    }


    return (
        <>
            <Wrapper>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <p className="fs-1 shadow-none p-2 mb-4 bg-light rounded">Treatment Table </p>
                        </div>
                    </div>
                    <table class="table table-bordered table-striped border">
                        <thead>
                            <tr>
                                <th>Treatment</th>
                                <th>Teeth No.</th>
                                <th>Qty</th>
                                <th>Treatment Cost</th>
                                <th>Cost * Qty</th>
                                <th>Discount %</th>
                                <th>Final Cost</th>
                                <th>Note</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {treatmentData?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.dental_treatment}</td>
                                    <td>{item.no_teeth}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.original_cost_amt}</td>
                                    <td>{item.cost_amt}</td>
                                    <td>{item.disc_amt}</td>
                                    <td>{item.total_amt}</td>
                                    <td>{item.note}</td>
                                    <td><button className="btn btn-primary justify-content-end" data-bs-toggle="modal" data-bs-target={`#exampleModal-${index}`} onClick={() => handleModalOpen(index)}><MdEdit size={25} /></button></td>
                                    <div className="modal fade" id={`exampleModal-${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${index}`} aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id={`exampleModalLabel-${index}`}>Update Data</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={(e) => handleSubmit(e, item.id)}>
                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id={`dental_treatment-${index}`}
                                                                name="dental_treatment" value={formData.dental_treatment} class="form-control" onChange={handleChange} placeholder="Dental Treatment" readOnly />
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id={`no_teeth-${index}`}
                                                                name="no_teeth" value={formData.no_teeth} class="form-control" onChange={handleChange} placeholder="Teeth No." />
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id={`qty-${index}`}
                                                                name="qty" value={formData.qty} class="form-control" onChange={handleChange} placeholder="Quantity" />
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id={`original_cost_amt-${index}`}
                                                                name="original_cost_amt" value={formData.original_cost_amt} class="form-control" onChange={handleChange} placeholder="Teeth Cost" />
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id={`disc_amt-${index}`}
                                                                name="disc_amt" value={formData.disc_amt} class="form-control" onChange={handleChange} placeholder="Discount %" />
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id={`total_amt-${index}`}
                                                                name="total_amt" value={formData.total_amt} class="form-control" onChange={handleChange} placeholder="Final Cost" />
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id={`note-${index}`}
                                                                name="note" value={formData.note} class="form-control" onChange={handleChange} placeholder="Note" />
                                                        </div>

                                                        <div className="text-center">
                                                            <button class="btn btn-secondary" data-bs-dismiss="modal">Update</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <td><button className="btn btn-danger" onClick={() => handleDelete(item.id)}><FaPrescriptionBottleMedical size={25} /></button></td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <button className="btn btn-info fs-5 text-light" onClick={handleNavigate}>Save & Continue <FaLocationArrow size={25}/></button>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default NewTreatmentTable;
const Wrapper = styled.div``;