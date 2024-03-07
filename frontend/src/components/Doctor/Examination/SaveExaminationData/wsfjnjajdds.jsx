import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MdEdit, MdDelete } from 'react-icons/md';

const SaveData = ({ id }) => {
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
            console.log(formData);
            // Close the modal
            document.getElementById(`exampleModal-${modalIndex}`).classList.remove('show');
            document.getElementById(`exampleModal-${modalIndex}`).setAttribute('aria-hidden', 'true');
            document.getElementById(`exampleModal-${modalIndex}`).style.display = 'none';
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
                                <div className="px-2">
                                    {`SELECTED TEETH : ${item.selected_teeth}, DISEASE : ${item.disease}, CHIEF COMPLAIN : ${item.chief_complain}, ADVICE : ${item.advice}, ON EXAMINATION : ${item.on_examination}`}
                                </div>
                                <br />
                                <button type="button" className="btn btn-primary" onClick={() => handleModalOpen(index)}>
                                    <MdEdit size={20} />
                                </button>
                                <button className="btn btn-danger mx-1"><MdDelete size={20} /></button>
                                <div className="modal fade" id={`exampleModal-${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${index}`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id={`exampleModalLabel-${index}`}>Update Data</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={(e) => handleSubmit(item.id, e)}>
                                                    {/* Populate the form fields with formData */}
                                                    <input type="text" name="selectedTeeth" value={formData.selectedTeeth} onChange={handleChange} />
                                                    <input type="text" name="disease" value={formData.disease} onChange={handleChange} />
                                                    <input type="text" name="chiefComplain" value={formData.chiefComplain} onChange={handleChange} />
                                                    <input type="text" name="advice" value={formData.advice} onChange={handleChange} />
                                                    <input type="text" name="onExamination" value={formData.onExamination} onChange={handleChange} />
                                                    <button className="btn btn-primary">Update</button>
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
