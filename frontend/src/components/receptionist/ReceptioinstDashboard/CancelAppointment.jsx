import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTableRefresh } from '../../../redux/user/userSlice';
import cogoToast from 'cogo-toast';

function CancleAppointment({ onClose, appointmentInfo, allAppointmentData }) {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const {currentUser} = useSelector((state) => state.user);
  const token = currentUser?.token;
  const [show, setShow] = useState(false);
  const [searchDoctor, setSearchDoctor] = useState(appointmentInfo.assigned_doctor_name);
  const [showDoctorList,setShowDoctorList] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(); // State to store the selected Doctor
  const [selectedTreatment, setSelectedTreatment] = useState([appointmentInfo.treatment_provided]);
  const [treatments,setTreatment] = useState([]);
  const [doctors,setDoctors] = useState([]);
  const  branch = currentUser.branch_name;
  const [branchHolidays,setBranchHolidays] = useState([]);





  // Remove current appointment data from allAppointmentData
  const filteredAllAppointmentData = allAppointmentData.filter(appointment => appointment.appoint_id !== appointmentInfo.appoint_id);

  const [branchDetail,setBranchDetail] = useState([]);

  const getBranchDetail = async ()=>{
    try{
       const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branch-detail/${branch}`)
       console.log(response)
       setBranchDetail(response.data.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const getBranchHolidays = async ()=>{
    try{
       const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branch-holidays/${branch}` ,
       {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
       }
       })
       console.log(response)
       setBranchHolidays(response.data.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const [weekOffDay,setWeekOffDay] = useState("");

  const  handleWeekOfDay = (day)=>{
        if(day == "sunday"){
          setWeekOffDay(0);
        }
        else if (day == "monday"){
          setWeekOffDay(1);
        }
       
        else if (day == "tuesday"){
          setWeekOffDay(2);
        }
        else if (day == "wednesday"){
          setWeekOffDay(3);
        }
        else if (day == "thursday"){
          setWeekOffDay(4);
        }
        else if (day == "friday"){
          setWeekOffDay(5);
        }
        else if (day == "saturday"){
          setWeekOffDay(6);
        }
        else{
          setWeekOffDay("")
        }
  }

  
  // Generate time slots with 15-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = parseInt(branchDetail[0]?.open_time?.split(":")[0]); hour < parseInt(branchDetail[0]?.close_time?.split(":")[0]); hour++) {
      for (let minute = 0; minute < 60; minute += parseInt(branchDetail[0]?.appoint_slot_duration?.split(" ")[0])) {
          const formattedHour24 = hour.toString().padStart(2, '0');
          const formattedMinute = minute.toString().padStart(2, '0');
  
          // Convert hour to 12-hour format for label
          const period = hour < 12 ? "AM" : "PM";
          const formattedHour12 = ((hour + 11) % 12 + 1).toString().padStart(2, '0');
  
          const time24 = `${formattedHour24}:${formattedMinute}`;
          const time12 = `${formattedHour12}:${formattedMinute} ${period}`;
          
          slots.push({ value: time24, label: time12 });
      }
  }
    return slots;
  };
 
  const timeSlots = generateTimeSlots();

  // Function to format date in YYYY-MM-DD format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date(appointmentInfo.appointment_dateTime)));

  
  useEffect(() => {
    // Extract the time part from the appointment date time and set it as the selected time
    const time = appointmentInfo.appointment_dateTime?.split('T')[1].substring(0, 5);
    setData(prevState => ({
      ...prevState,
      appointment_dateTime: `${selectedDate}T${time}`
    }));
  }, [appointmentInfo.appointment_dateTime]);

  const handleDateChange = (e) => {
    
    const { name, value } = e.target;
    if(!value){
      return
    }
    setData({
      ...data,
      [name]: value,
      appointment_dateTime: `${value}T${data.appointment_dateTime?.split('T')[1]}` // Update the appointment_dateTime with the new date and existing time
    });
    setSelectedDate(value)
  };

  const getTreatment = async () =>{
    try{
     const response = await axios.get('https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-treatments');
     console.log(response);
     setTreatment(response?.data?.data)
    }
    catch(error){
       console.log(error)
    }
   

 }
 const getDoctors = async ()=>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      setDoctors(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
     
     getTreatment();
     getDoctors();
     getDoctorsWithLeave();
     getBranchDetail();
     getBranchHolidays();
  },[]);

  useEffect(()=>{
    handleWeekOfDay(branchDetail[0]?.week_off);
  },[branchDetail]);

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
    status : appointmentInfo.appointment_status,
    opd_amount : appointmentInfo.opd_amount,
    payment_Status : appointmentInfo.payment_Status,
    cancelReason: appointmentInfo.cancel_reason,
    appointment_status:appointmentInfo.appointment_status,
    appointment_updated_by:currentUser.employee_name,
    appointment_updated_by_emp_id: currentUser.employee_ID

  });

 

  

  const handleChange = (e) => {
    const {name,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

 

  const [filteredDoctor,setFilteredDoctor] = useState([]);

  useEffect(() => {
    // Filter patients based on the search query if there's a search query, otherwise set an empty array
    const filtered = showDoctorList
      ? availableDoctorOnDate.filter((doctor) =>
          doctor.employee_name.toLowerCase().includes(searchDoctor.toLowerCase())
        )
      : [];
    setFilteredDoctor(filtered);
  }, [searchDoctor]);



 

  const timelineData = async (id) => {
  
    try {
      const response = await axios.post(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/insertTimelineEvent",
        {
          type: "Cancel Appointment",
          description: "Cancel Appointment",
          branch: branch,
          patientId: id,
        }
        ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [doctorWithLeave,setDoctorWithLeave] = useState([]);
  const getDoctorsWithLeave = async ()=>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors-with-leave/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      setDoctorWithLeave(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }


  const [availableDoctorOnDate,setAvailableDoctorOnDate] = useState([]);

const handleCancelAppointment = async (e)=>{

    e.preventDefault();
    const newAppointment = {
      clinicName : branchDetail[0]?.hospital_name.toUpperCase(),
      clinicContact : branchDetail[0]?.branch_contact,
      clinicAddress : branchDetail[0]?.branch_address,
      clinicEmail : branchDetail[0]?.branch_email,
      patient_name : appointmentInfo.patient_name,
      patient_Email : appointmentInfo.emailid,
      doctor_email : selectedDoctor.employee_email,
      appDateTime:appointmentInfo.appointment_dateTime,
    doctor_name:appointmentInfo.assigned_doctor_name,
    treatment:appointmentInfo.treatment_provided,
        appoint_id : appointmentInfo.appoint_id,
    notes:data.notes,
    status : "Cancel",
    payment_Status : 'Refund',
    cancelReason: data.cancelReason,
    appointment_updated_by:currentUser.employee_name,
    appointment_updated_by_emp_id: currentUser.employee_ID
      };

    //   try {
    //     // Send a PUT request to your backend endpoint to update the status
    //     await axios.put(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/cancel-appointment-status-opd`, newAppointment);
    //     // Optionally, you can re-fetch appointments after successful update
        
    //     dispatch(toggleTableRefresh());
    //     timelineData(appointmentInfo.uhid);
    //     cogoToast.success("Appointment successfully canceled")
    //   } catch (error) {
    //     console.error('Error updating status:', error);
    //   }


      try{
        setLoading(true)
        const response = await axios.put('https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/cancel-appointment-status-opd',newAppointment ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        });
        console.log(response);
        if(response.data.success){
          setLoading(false);
          cogoToast.success(response?.data?.message);
          dispatch(toggleTableRefresh());
          timelineData(appointmentInfo.uhid);
          onClose();
          
         }
         else{
          setLoading(false);
          cogoToast.error(response?.data?.message || "Failed to cancel appointment");
         }
  
     }
     catch(error){
      setLoading(false);
       console.log(error)
          cogoToast.error(error?.response?.data?.message || "Failed to cancel appointment");
  
     }
}


useEffect(()=>{
  setSearchDoctor("")
},[selectedDate])


  console.log(appointmentInfo)

  return (
    <>
   <Wrapper className="container">
   <>
    

      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form onSubmit={handleCancelAppointment}>
        <div class="mb-3">
            <label for="recipient-id" class="col-form-label">Appointment Id:</label>
            <input type="text" value={data.appoint_id} readOnly class="form-control" id="recipient-id"/>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Patient Name:</label>
            <input type="text" value={data.patient_name} readOnly class="form-control text-capitalize" id="recipient-name"/>
          </div>
          {/* <div class="mb-3">
            <label for="message-text" class="col-form-label">Date & Time:</label>
            <input type="datetime-local" value={data.appointment_dateTime} onChange={handleChange} name='appointment_dateTime'  className="form-control" id="recipient-name"/>
          </div> */}
          <div class="mb-3">
          <div className="form-outline">
                     
                          <label className="form-label" for="form6Example2">Appointment Date</label>
      <input
        type="date"
        value={selectedDate}
        className="form-control"
        // onChange={(e) => setSelectedDate(e.target.value)}
        onChange={handleDateChange}
        min={formatDate(new Date())}
        required
        readOnly
      />
                         
                        </div>
          </div>
          {/* <div class="mb-3">
          <div className="form-outline">
                        
                        <label  className="form-label" for="form6Example2">Appointment Time</label>
      <Select
        options={timeSlots}
        required
        readOnly
        value={timeSlots.find(slot => slot.value === data.appointment_dateTime.split('T')[1])}
        onChange={(selectedOption) => setData({ ...data, appointment_dateTime: `${selectedDate}T${selectedOption.value}` })}
      />
       
                         
                        </div>
          </div> */}
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Doctor:</label>
            <input type="text" class="form-control text-capitalize" value={searchDoctor}
            
                    
                  readOnly  required  name='assigned_doctor_name'  id="recipient-name"/>
                   
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Treatment:</label>
            <input type="text" value={selectedTreatment} readOnly class="form-control" name='treatment_provided' onChange={handleChange}  id="recipient-name"/>
      
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Paid Amount for Appointment:</label>
            <input type="text" value={data.opd_amount} readOnly class="form-control" name='opd_amount' onChange={handleChange}  id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Refund Amount:</label>
            <input type="text" value={data.opd_amount} readOnly class="form-control" name='opd_amount' onChange={handleChange}  id="recipient-name"/>

          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Cancel reason:</label>
            <input type="text" value={data.cancelReason}  class="form-control" name='cancelReason' required onChange={handleChange}  id="recipient-name"/>

          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Notes:</label>
            <input type="text" value={data.notes} class="form-control" name='notes' onChange={handleChange}  id="recipient-name"/>
          </div>
          {/* <div class="mb-3">
            <label for="message-text" class="col-form-label">Status:</label>
            <input type="text" value={data.appointment_status} onChange={handleChange} name='appointment_status'  class="form-control" id="recipient-name"/>
          </div> */}
        <button type="submit" class="btn btn-primary" disabled={loading}>{loading ? "Loading..." : "Submit"} </button>
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

export default CancleAppointment
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