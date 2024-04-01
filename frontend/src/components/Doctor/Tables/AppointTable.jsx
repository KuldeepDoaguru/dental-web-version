import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTableRefresh } from '../../../redux/user/userSlice';
import cogoToast from "cogo-toast";

const AppointTable = () => {
    const [searchInput, setSearchInput] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [filterTableData, setFilterTableData] = useState([]);
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const dispatch = useDispatch();
    const { refreshTable } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user);
    const doctor = user.currentUser.employee_name;
    const branch = user.currentUser.branch_name;
    console.log(branch);
    // const [selectedActions, setSelectedActions] = useState({});

    const handleDateChange = (increment) => {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() + increment);
        setSelectedDate(currentDate.toISOString().split('T')[0]);
    };

    useEffect(() => {
        console.log("AppointTable is refreshing...");
        const fetchAppointments = async () => {
            try {
                const res = await axios.get(`http://localhost:8888/api/doctor/appointtreatSitting?date=${selectedDate}`);
                setAppointments(res.data.result);
                const filteredData = res.data.result.filter(item =>
                    item.appointment_dateTime.includes(selectedDate)
                    && item.patient_name.toLowerCase().includes(searchInput.toLowerCase())
                    && item.assigned_doctor_name.toLowerCase() === doctor.toLowerCase()
                );
                // setAppointments(appointments);
                setFilterTableData(filteredData);
                console.log(res.data.result);
            } catch (error) {
                console.error('Error fetching appointments:', error.message);
            }
        };

        fetchAppointments();

        // Refresh every 5 seconds
        const interval = setInterval(() => {
            dispatch(toggleTableRefresh());
        }, 5000);

        return () => {
            clearInterval(interval);
            console.log("Interval cleared.");
        };
    }, [selectedDate, searchInput, dispatch, doctor]);



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

    const timelineForStartTreat = async (uhid) => {

        try {
            const response = await axios.post(
                "http://localhost:8888/api/doctor/insertTimelineEvent",
                {
                    type: "Examiantion",
                    description: "Start Examintion",
                    branch: branch,
                    patientId: uhid,
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const timelineForCancelTreat = async (uhid) => {

        try {
            const response = await axios.post(
                "http://localhost:8888/api/doctor/insertTimelineEvent",
                {
                    type: "Examiantion",
                    description: "Cancel Treatment",
                    branch: branch,
                    patientId: uhid,
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };


    const handleAction = async (action, appointId, uhid) => {
        try {
            let requestBody = {
                action,
                appointId
            };

            if (action === 'Cancel') {
                console.log(uhid);
                const cancelReason = prompt("Please provide a reason for cancellation:");
                if (cancelReason !== null) {
                    requestBody.reason = cancelReason;
                    timelineForCancelTreat(uhid);
                    console.log(uhid);
                    cogoToast.success("Patient Appointment Cancel Successfully")
                } else {
                    console.log(uhid);
                    return;
                }
                
            }

            await axios.put(`http://localhost:8888/api/doctor/upDateAppointmentStatus`, requestBody);

            if (action === 'In Treatment') {
                timelineForStartTreat(uhid)
                navigate(`/examination-Dashboard/${appointId}`);
            }

            const res = await axios.get(`http://localhost:8888/api/doctor/appointtreatSitting?date=${selectedDate}`);
            setAppointments(res.data.result);
            setFilterTableData(res.data.result);
            // setSelectedActions({ ...selectedActions, [appointId]: action });
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
                                    <th>Sitting</th>
                                    <th>Status</th>
                                    <th>Type of Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterTableData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.appoint_id}</td>
                                        <td><Link to={`/Patient-profile/${item.uhid}`}>{item.uhid}</Link></td>
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
                                        <td>{item.sitting_result}</td>
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
                                                {/* Option 1 */}
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <button
                                                            className="dropdown-item mx-0"
                                                            onClick={() => handleAction('In Treatment', item.appoint_id, item.uhid)}
                                                        // disabled={selectedActions[item.appoint_id] !== undefined && selectedActions[item.appoint_id] !== 'In Treatment'}
                                                        >
                                                            Start Treatment
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item mx-0"
                                                            onClick={() => handleAction('Cancel', item.appoint_id, item.uhid)}
                                                        // disabled={selectedActions[item.appoint_id] !== undefined && selectedActions[item.appoint_id] !== 'Cancel'}
                                                        >
                                                            Cancel Treatment
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item mx-0"
                                                            onClick={() => handleAction('On Hold', item.appoint_id, item.uhid)}
                                                        // disabled={selectedActions[item.appoint_id] !== undefined && selectedActions[item.appoint_id] !== 'On Hold'}
                                                        >
                                                            Hold
                                                        </button>
                                                    </li>
                                                </ul>
                                                {/* Option 2
                                                 <ul className="dropdown-menu">
                                                    {item.appointment_status !== 'Cancelled' && (
                                                        <li>
                                                            <button
                                                                className="dropdown-item mx-0"
                                                                onClick={() => handleAction('In Treatment', item.appoint_id)}
                                                                disabled={item.appointment_status !== 'Pending'} // Disable if not in 'Pending' status
                                                            >
                                                                Start Treatment
                                                            </button>
                                                        </li>
                                                    )}
                                                    {item.appointment_status !== 'Cancelled' && (
                                                        <li>
                                                            <button
                                                                className="dropdown-item mx-0"
                                                                onClick={() => handleAction('Cancel', item.appoint_id)}
                                                                disabled={item.appointment_status !== 'Pending'} // Disable if not in 'Pending' status
                                                            >
                                                                Cancel Treatment
                                                            </button>
                                                        </li>
                                                    )}
                                                    {item.appointment_status !== 'Cancelled' && (
                                                        <li>
                                                            <button
                                                                className="dropdown-item mx-0"
                                                                onClick={() => handleAction('On Hold', item.appoint_id)}
                                                                disabled={item.appointment_status !== 'In Treatment'} // Disable if not in 'In Treatment' status
                                                            >
                                                                Hold
                                                            </button>
                                                        </li>
                                                    )}
                                                </ul> */}
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

export default AppointTable;

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
  .table{
    box-shadow: 1px -1px 11px 2px rgba(128,128,128,0.78);
-webkit-box-shadow: 1px -1px 11px 2px rgba(128,128,128,0.78);
-moz-box-shadow: 1px -1px 11px 2px rgba(128,128,128,0.78);
  }
`;
