import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
// import { useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const SaveData = ({ id }) => {
    console.log(id);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        selectedTeeth: '',
        disease: '',
        chiefComplain: '',
        advice: '',
        onExamination: ''
    });
    const [modalIndex, setModalIndex] = useState(null); // State to manage which modal is open

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:8888/api/doctor/getDentalDataByID/${id}`);
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (id, e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8888/api/doctor/updatedentalPediatric/${id}`, formData);
            console.log(response.data);
            // Handle success
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    const handleModalOpen = (index) => {
        // Set formData with values of the item being edited
        const item = data[index];
        setFormData({
            id: item.id,
            selectedTeeth: item.selected_teeth,
            disease: item.disease,
            chiefComplain: item.chief_complain,
            advice: item.advice,
            onExamination: item.on_examination
        });
        // Set the modalIndex to manage which modal is open
        setModalIndex(index);
    };

    return (
        <Wrapper>
            <div className="container">
                <div className="row">
                    <h2>Saved Data</h2>
                    <ul className="list">
                        {data.map((item, index) => (
                            <li className="list-item" key={index}>
                                <div className="d-flex justify-content-start px-2">
                                    {`SELECTED TEETH : ${item.selected_teeth}, DISEASE : ${item.disease}, CHIEF COMPLAIN : ${item.chief_complain}, ADVICE : ${item.advice}, ON EXAMINATION : ${item.on_examination}`}
                                </div>
                                <br />
                                <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-primary justify-content-end" data-bs-toggle="modal" data-bs-target={`#exampleModal-${index}`} onClick={() => handleModalOpen(index)}>
                                    <MdEdit size={20} />
                                </button>
                                <button className="btn btn-danger mx-1 justify-content-end"><MdDelete size={20} /></button>
                                </div>
                                <div className="modal fade" id={`exampleModal-${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${index}`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id={`exampleModalLabel-${index}`}>Update Data</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                            <form onSubmit={(e) => handleSubmit(item.id, e)}>
                                                    <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id="form2Example1"
                                                            name="id" value={formData.id} class="form-control" onChange={handleChange} placeholder="id" readOnly/>
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id="form2Example1"
                                                            name="selectedTeeth" value={formData.selectedTeeth} class="form-control" onChange={handleChange} placeholder="Selected Teeth"/>
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id="form2Example2"
                                                            name="disease" value={formData.disease} class="form-control" onChange={handleChange} placeholder="Enter Disease"/>
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id="form2Example2"
                                                            name="chiefComplain" value={formData.chiefComplain} class="form-control" onChange={handleChange} placeholder="Enter Chief Complain"/>
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id="form2Example2"
                                                            name="advice" value={formData.advice} class="form-control" onChange={handleChange} placeholder="Enter Advice "/>
                                                        </div>

                                                        <div data-mdb-input-init class="form-outline mb-4">
                                                            <input type="text" id="form2Example2"
                                                            name="onExamination" value={formData.onExamination} class="form-control" onChange={handleChange} placeholder="Enter ON Examination"/>
                                                        </div>

                                                        <div className="text-center">
                                                        <button class="btn btn-secondary" data-bs-dismiss="modal">Update</button>
                                                        </div>
                                                    </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Wrapper>
    );
};


export default SaveData;
const Wrapper = styled.div``;