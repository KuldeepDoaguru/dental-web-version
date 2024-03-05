import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Select from 'react-select';

function EditAppointment({ onClose, appointmentInfo }) {
  const [show, setShow] = useState(false);
  const [searchDoctor, setSearchDoctor] = useState(appointmentInfo.assigned_doctor_name);
  const [showDoctorList,setShowDoctorList] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(); // State to store the selected Doctor
  const [selectedTreatment, setSelectedTreatment] = useState([appointmentInfo.treatment_provided]);
  const [treatments,setTreatment] = useState([]);
  const [doctors,setDoctors] = useState([]);
  const  branch = "Madan Mahal"

  const getTreatment = async () =>{
    try{
     const response = await axios.get('http://localhost:4000/api/v1/receptionist/get-treatments');
     console.log(response);
     setTreatment(response?.data?.data)
    }
    catch(error){
       console.log(error)
    }
   

 }

 const getDoctors = async ()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-doctors/${branch}`);
      setDoctors(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
     
     getTreatment();
     getDoctors();
  },[]);

  useEffect(() => {
    // Find the doctor object that matches the assigned doctor name or id from the appointmentInfo
    const selectedDoctorInfo = doctors.find(doctor => 
      doctor.employee_name === appointmentInfo.assigned_doctor_name ||
      doctor.employee_ID === appointmentInfo.assigned_doctor_id
    );
  
    // Set the selected doctor if found
    if (selectedDoctorInfo) {
      setSelectedDoctor(selectedDoctorInfo);
      setSearchDoctor(selectedDoctorInfo.employee_name);
    }
  }, [doctors, appointmentInfo]);

  const handleChangeTreatment = (selectedOption) => {
    setSelectedTreatment(selectedOption.value);
  };


  const [data,setData] = useState({
    appoint_id : appointmentInfo.appoint_id,
    patient_name : appointmentInfo.patient_name,
    appointment_dateTime:appointmentInfo.appointment_dateTime,
    assigned_doctor_name:appointmentInfo.assigned_doctor_name,
    treatment_provided:appointmentInfo.treatment_provided,
    notes:appointmentInfo.notes,
    appointment_status:appointmentInfo.appointment_status,
    appointment_updated_by:"mohit",
    appointment_updated_by_emp_id: "20"

  });

  console.log(data)

  const [appointment_data,setAppointmentData] = useState([
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau", doctorId:"1",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau", doctorId:"1" ,doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T11:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T12:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T15:00",status:"Missed",action:"edit"},
    

    
  ]);

  const handleChange = (e) => {
    const {name,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

  const handleSubmit = (e) =>{
     
  }

  const [filteredDoctor,setFilteredDoctor] = useState([]);

  useEffect(() => {
    // Filter patients based on the search query if there's a search query, otherwise set an empty array
    const filtered = showDoctorList
      ? doctors.filter((doctor) =>
          doctor.employee_name.toLowerCase().includes(searchDoctor.toLowerCase())
        )
      : [];
    setFilteredDoctor(filtered);
  }, [searchDoctor]);

  const handleSearchDoctor = (e) => {
    setShowDoctorList(true)
    setSearchDoctor(e.target.value);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor); // Set the selected patient when it's clicked
    setShowDoctorList(false)
    setSearchDoctor(doctor.employee_name); // Reset the search query to close the search list
  };

  const handleEditAppointment = async (e) =>{
    
    e.preventDefault();
  
     // Check if the selected doctor is null
     if (!selectedDoctor) {
        alert("Please select a doctor");
      console.log("Please select a doctor");
      return;
    }
  
     // Convert appointment time to Date object
  const selectedDateTime = new Date(data.appointment_dateTime);
  
  // Check if the selected doctor is available during the appointment time
  const isDoctorAvailable = (selectedDateTime) => {
    const morningStart = new Date(selectedDateTime);
    morningStart.setHours(selectedDoctor.morning_shift_start_time.split(":")[0], selectedDoctor.morning_shift_start_time.split(":")[1]);
    const morningEnd = new Date(selectedDateTime);
    morningEnd.setHours(selectedDoctor.morning_shift_end_time.split(":")[0], selectedDoctor.morning_shift_end_time.split(":")[1]);
    const eveningStart = new Date(selectedDateTime);
    eveningStart.setHours(selectedDoctor.evening_shift_start_time.split(":")[0], selectedDoctor.evening_shift_start_time.split(":")[1]);
    const eveningEnd = new Date(selectedDateTime);
    eveningEnd.setHours(selectedDoctor.evening_shift_end_time.split(":")[0], selectedDoctor.evening_shift_end_time.split(":")[1]);
    
    return (
      (selectedDateTime >= morningStart && selectedDateTime <= morningEnd) ||
      (selectedDateTime >= eveningStart && selectedDateTime <= eveningEnd)
    );
  };
  
   
    const isSlotAvailable = appointment_data.every((appointment) => {
      // Check if the appointment is for the selected doctor and if it falls within the same datetime range
      const appointmentDate = new Date(appointment.timing);
      const selectedDate = new Date(data.appDateTime);
      
      return !(appointment.doctorId === selectedDoctor.employee_ID && appointmentDate.getTime() === selectedDate.getTime());
    });
  
     // Check if the selected appointment date matches with the doctor's block day
    //  const blockDays = selectedDoctor.scheduleBlockDays; // Assuming scheduleBlockDays is an array of dates
  
    //  // Convert appointment date to the same format as block days
    //  const selectedDate = new Date(bookData.appDateTime);
    //  const formattedSelectedDateTime = selectedDate.toLocaleDateString("en-US");
     
    //  // Check if the appointment date matches any of the block days
    //  const isBlockDayMatched = blockDays.some((blockDay) => {
    //    const formattedBlockDay = new Date(blockDay).toLocaleDateString("en-US");
    //    return formattedBlockDay === formattedSelectedDateTime;
    //  });
     
    //  if(isBlockDayMatched){
    //   alert ("Doctor is not available in this day");
    //   return
    //  }
  
    if (isSlotAvailable) {
      // Slot is available, proceed with booking
      const newAppointment = {

        appoint_id : appointmentInfo.appoint_id,
        patient_name : appointmentInfo.patient_name,
        appDateTime:data.appointment_dateTime,
        doctor_name:selectedDoctor.employee_name,
        doctorId : selectedDoctor.employee_ID,
        treatment:selectedTreatment,
        notes:data.notes,
        appointment_updated_by:"mohit",
        appointment_updated_by_emp_id: "20"
      };
    
  
      if (!isDoctorAvailable(selectedDateTime)) {
        // Doctor is not available at the specified time
  
  
        const confirmation = window.confirm("The selected doctor is not available at the specified time. Do you want to proceed with booking?");
        if (!confirmation) {
          return; // If the user cancels, return early
        }
  
      }
  
      try{
        const response = await axios.put('http://localhost:4000/api/v1/receptionist/update-appointment',newAppointment);
        console.log(response);
        if(response.data.success){
          alert(response?.data?.message);
         }
         else{
          alert(response?.data?.message);
         }
  
     }
     catch(error){
       console.log(error)
          alert(error?.response?.data?.message);
  
     }
      // setAppointmentData([...appointment_data,newAppointment]);
      // Reset form data
      
  
      // Reset selected doctor
      // setSelectedDoctor(null);
  
      // console.log("Appointment booked successfully!");
      // alert("Appointment booked successfully!");
    } else {
      // Slot is not available
      alert("The selected doctor's slot is already booked at the specified time");
      console.log("The selected doctor's slot is already booked at the specified time");
    }
   }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(appointmentInfo)

  return (
    <>
   <Wrapper className="container">
   <>
    

      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form onSubmit={handleEditAppointment}>
        <div class="mb-3">
            <label for="recipient-id" class="col-form-label">Appointment Id:</label>
            <input type="text" value={data.appoint_id} readOnly class="form-control" id="recipient-id"/>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Patient Name:</label>
            <input type="text" value={data.patient_name} readOnly class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Date & Time:</label>
            <input type="datetime-local" value={data.appointment_dateTime} onChange={handleChange} name='appointment_dateTime'  className="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Doctor:</label>
            <input type="text" value={searchDoctor}
                    onChange={handleSearchDoctor}
                    required  name='assigned_doctor_name' class="form-control" id="recipient-name"/>
                     <DoctorList>
                          <div >
                          
                          <ul className="list-group">
                      {filteredDoctor.map((doctor) => (
                        <li key={doctor.employee_ID}
                        className={`list-group-item ${selectedDoctor && selectedDoctor.employee_ID === doctor.employee_ID ? "active" : ""}`} // Add 'active' class if the patient is selected
            onClick={() => handleDoctorSelect(doctor)} // Call handlePatientSelect function when the patient is clicked 
                        >
                          {doctor.employee_name} {"-"} Id: {doctor.employee_ID}
                          {/* Display other patient details as needed */}
                        </li>
                      ))}
                    </ul>

                    </div>
                    </DoctorList>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Treatment:</label>
            <Select
        id="treatment"
        name="treatment"
        options={treatments}
        value={selectedTreatment ? { value: selectedTreatment, label: selectedTreatment } : selectedTreatment}
        onChange={handleChangeTreatment}
        required
      />
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Notes:</label>
            <input type="text" value={data.notes} class="form-control" name='notes' onChange={handleChange}  id="recipient-name"/>
          </div>
          {/* <div class="mb-3">
            <label for="message-text" class="col-form-label">Status:</label>
            <input type="text" value={data.appointment_status} onChange={handleChange} name='appointment_status'  class="form-control" id="recipient-name"/>
          </div> */}
        <button type="submit" class="btn btn-primary">Edit Appointment</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
  
        </Modal.Footer>
      </Modal>
    </>
        
   </Wrapper>
  
    </>
  )
}

export default EditAppointment
const Wrapper = styled.div`



`
const DoctorList = styled.div`
  position: absolute;
  z-index: 999; /* Set a high z-index to ensure the list is displayed above other elements */
  width: 100%;
  overflow-y: auto;
  max-height: 400px;
 
  /* Your additional styling for the doctor list */
`;