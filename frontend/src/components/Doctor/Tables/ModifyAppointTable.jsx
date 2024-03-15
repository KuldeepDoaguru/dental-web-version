import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const ModifyAppointTable = () => {
    const [searchInput, setSearchInput] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [filterTableData, setFilterTableData] = useState([]);
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleDateChange = (increment) => {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() + increment);
        setSelectedDate(currentDate.toISOString().split('T')[0]);
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get(`http://localhost:8888/api/doctor/getAppointmentsWithPatientDetails?date=${selectedDate}`);
                setAppointments(res.data.result);
                const filteredData = res.data.result.filter(item =>
                    item.appointment_dateTime.includes(selectedDate)
                    && item.patient_name.toLowerCase().includes(searchInput.toLowerCase())
                );
                setFilterTableData(filteredData);
                console.log(res.data.result);
            } catch (error) {
                console.error('Error fetching appointments:', error.message);
            }
        };

        fetchAppointments();
    }, [selectedDate, searchInput]);



    const handleChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchInput(searchTerm);
        const filteredResults = appointments.filter(
            (row) =>
                row.patient_name.toLowerCase().includes(searchTerm) ||
                row.mobileno.includes(searchTerm) ||
                (row.appointment_dateTime.includes(selectedDate) &&
                    (row.patient_name.toLowerCase().includes(searchTerm) ||
                        row.mobileno.includes(searchTerm)))
        );
        setFilterTableData(filteredResults);
        console.log(filteredResults);
    };



    const handleAction = async (action, appointId) => {
        try {
            let requestBody = {
                action,
                appointId
            };

            if (action === 'Cancel') {
                const cancelReason = prompt("Please provide a reason for cancellation:");
                if (cancelReason !== null) {
                    requestBody.reason = cancelReason;
                } else {
                    return;
                }
            }

            await axios.put(`http://localhost:8888/api/doctor/upDateAppointmentStatus`, requestBody);

            if (action === 'In Treatment') {
                navigate(`/examination-Dashboard/${appointId}`);
            }

            const res = await axios.get(`http://localhost:8888/api/doctor/getAppointmentsWithPatientDetails?date=${selectedDate}`);
            setAppointments(res.data.result);
            setFilterTableData(res.data.result);
        } catch (error) {
            console.error('Error updating appointment status:', error.message);
        }
    };

    return (
        <Wrapper>
            <div className="container-fluid pt-4">
                <div className="widget-area-2 proclinic-box-shadow" id="tableres">
                    <div className="d-flex justify-content-between mb-3 widget-header">
                        <h5 className="widget-title m-0 pt-2" id="title">
                            Current Appointment
                            <h5 className="d-inline ms-4">
                                Total - {filterTableData.length}
                            </h5>
                        </h5>

                        <div className='pt-1'>
                            <FaArrowCircleLeft
                                style={{ fontSize: '35px', cursor: 'pointer' }}
                                onClick={() => handleDateChange(-1)}
                            />
                        </div>
                        <input
                            type="date"
                            className="form-control w-25"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        <div className='pt-1 mx-2'>
                            <FaArrowCircleRight
                                style={{ fontSize: '35px', cursor: 'pointer' }}
                                onClick={() => handleDateChange(1)}
                            />
                        </div>

                        <input
                            type="search"
                            placeholder="Search here"
                            onChange={handleChange}
                            value={searchInput}
                            className="mb-2 rounded-5 form-control w-25"
                            id="form12"
                        />
                    </div>
                        <div className="table-responsive ">
                            <table className="table table-bordered table-striped border" style={{ overflowX: 'scroll' }}>
                                <thead>
                                    <tr>
                                        <th>A.Id</th>
                                        <th>P.Id</th>
                                        <th>Patient Name</th>
                                        <th>Mobile</th>
                                        <th>Timing</th>
                                        <th>Treatment</th>
                                        <th>Blood Group</th>
                                        <th>DOB</th>
                                        <th>Age</th>
                                        <th>Weight</th>
                                        <th>Allergy</th>
                                        <th>Disease</th>
                                        <th>Patient Type</th>
                                        <th>Note</th>
                                        <th>Status</th>
                                        <th>Type of Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterTableData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.appoint_id}</td>
                                            <td>{item.uhid}</td>
                                            <td>{item.patient_name}</td>
                                            <td>{item.mobileno}</td>
                                            <td>{item.appointment_dateTime}</td>
                                            <td>{item.treatment_provided}</td>
                                            <td>{item.bloodgroup}</td>
                                            <td>{item.dob}</td>
                                            <td>{item.age}</td>
                                            <td>{item.weight}</td>
                                            <td>{item.allergy}</td>
                                            <td>{item.disease}</td>
                                            <td>{item.patient_type}</td>
                                            <td>{item.notes}</td>
                                            <td>{item.appointment_status}</td>
                                            <td>
                                                <div className="dropdown">
                                                    <button
                                                        className="btn btn-secondary dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        Action
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button
                                                                className="dropdown-item mx-0"
                                                                onClick={() => handleAction('In Treatment', item.appoint_id)}
                                                            >
                                                                Start Treatment
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="dropdown-item mx-0"
                                                                onClick={() => handleAction('Cancel', item.appoint_id)}
                                                            >
                                                                Cancel Treatment
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="dropdown-item mx-0"
                                                                onClick={() => handleAction('On Hold', item.appoint_id)}
                                                            >
                                                                Hold
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    
                </div>
            </div>
        </Wrapper>
    );
};

export default ModifyAppointTable;

const Wrapper = styled.div`
  overflow-x: hidden;
  #tableres {
    margin-top: 0rem;
    @media screen and (max-width: 768px) {
      width: 20rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
  }
  #title {
    @media screen and (max-width: 768px) {
      margin-top: 20px;
    }
  }

  #btn1 {
    width: 100%;
    
    @media screen and (min-width: 1600px) and (max-width: 3700px) {
      width: 75%;
    }
  }

  .table-responsive{
    overflow-x: auto;
  }
  th{
    background: #0dcaf0;
    white-space: nowrap;
    @media screen and (min-width: 1999px) and (max-width: 2186px) {
      font-size: 18px;
    }
    @media screen and (min-width: 1024px) and (max-width: 1998px) {
      font-size: 15px;
      width:5rem;
    }
  }
`;
