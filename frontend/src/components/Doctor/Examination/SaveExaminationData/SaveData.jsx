import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
// import { useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { toggleDataRefresh } from '../../../../redux/user/userSlice';

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
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:8888/api/doctor/getDentalDataByID/${id}`);
                setData(res.data);

                // Dispatch the action to toggle data refresh
                dispatch(toggleDataRefresh());
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [id, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // Handle Update Data

    const handleSubmit = async (id, e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8888/api/doctor/updatedentalPediatric/${id}`, formData);
            // Handle success
            console.log(response.data);
            window.location.reload();
            // Dispatch the action to toggle data refresh
            // dispatch(toggleDataRefresh());

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

    // Handle Delete Data

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?"); // Show confirmation dialog

            if (confirmed) {
                const res = await axios.delete(`http://localhost:8888/api/doctor/deleteDentalPediatric/${id}`);
                console.log(res.data); // Log response data

                setData(data.filter(item => item.id !== id)); // Remove deleted item from data
            }
        } catch (error) {
            console.log(error);
            // Optionally, provide feedback to the user
            window.alert("An error occurred while deleting the item.");
        }
    }


    return (
        <Wrapper>
            <div className="container">
                <div className="row">
                    <h2>Saved Data</h2>
                    {data.length > 0 ? (
                    <div className="table-responsive ">
                        <table className="table table-bordered table-striped table-secondary border border-secondary">
                            <thead>
                                <tr>
                                    <th>SELECTED TEETH</th>
                                    <th>DISEASE</th>
                                    <th>CHIEF COMPLAIN</th>
                                    <th>ADVICE</th>
                                    <th>ON EXAMINATION</th>
                                    <th>EDIT ACTION</th>
                                    <th>DELETE ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.selected_teeth}</td>
                                        <td>{item.disease}</td>
                                        <td>{item.chief_complain}</td>
                                        <td>{item.advice}</td>
                                        <td>{item.on_examination}</td>
                                        <td> <button type="button" className="btn btn-primary justify-content-end" data-bs-toggle="modal" data-bs-target={`#exampleModal-${index}`} onClick={() => handleModalOpen(index)}>
                                    <MdEdit size={20} />
                                </button></td>
                                        <td><button className="btn btn-danger mx-1 justify-content-end" onClick={()=>handleDelete(item.id)}><MdDelete size={20} /></button></td>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    ): (
                        <p>There is no saved data.</p>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};



export default SaveData;
const Wrapper = styled.div``;