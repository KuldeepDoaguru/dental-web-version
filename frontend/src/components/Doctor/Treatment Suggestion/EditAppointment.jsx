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

function EditAppointment({ onClose, getPatientData }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const branch = user.currentUser.branch_name;
    console.log(branch);
 
    const [show, setShow] = useState(false);
    const [treatments,setTreatment] = useState([]);
    const [branchHolidays,setBranchHolidays] = useState([]);
    const [branchDetail,setBranchDetail] = useState([]);
    console.log(getPatientData);

  return (
    <>
   <Wrapper className="container">
   <>
    

      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Next Sitting</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
        <div class="mb-3">
            <label for="recipient-id" class="col-form-label">Examination Unique ID:</label>
            <input type="text" readOnly class="form-control" id="recipient-id"/>
          </div>
        <div class="mb-3">
            <label for="recipient-id" class="col-form-label">Appointment ID:</label>
            <input type="text" readOnly class="form-control" id="recipient-id"/>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Patient Name:</label>
            <input type="text" readOnly class="form-control" id="recipient-name"/>
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
        
        className="form-control"
        // onChange={(e) => setSelectedDate(e.target.value)}
        // onChange={handleDateChange}
        // min={formatDate(new Date())}
        required
      />
                         
                        </div>
          </div>
          <div class="mb-3">
          <div className="form-outline">
                        
                        <label  className="form-label" for="form6Example2">Appointment Time</label>
      {/* <Select
        options={timeSlots}
        required
        value={timeSlots.find(slot => slot.value === data.appointment_dateTime.split('T')[1])}
        onChange={(selectedOption) => setData({ ...data, appointment_dateTime: ${selectedDate}T${selectedOption.value} })}
      /> */}
                         
                        </div>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Doctor:</label>
            <input type="text" 
            
                    // onChange={handleSearchDoctor}
                    required  name='assigned_doctor_name' class="form-control" id="recipient-name"/>
                     {/* <DoctorList> */}
                          <div >
                          
                         

                    </div>
                    {/* </DoctorList> */}
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Treatment:</label>
            <Select
        id="treatment"
        name="treatment"
        options={treatments}
        // value={selectedTreatment ? { value: selectedTreatment, label: selectedTreatment } : selectedTreatment}
        // onChange={handleChangeTreatment}
        required
      />
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Sitting Number:</label>
            <input type="text"  class="form-control" name='notes'   id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Notes:</label>
            <input type="text"  class="form-control" name='notes'   id="recipient-name"/>
          </div>
          {/* <div class="mb-3">
            <label for="message-text" class="col-form-label">Status:</label>
            <input type="text" value={data.appointment_status} onChange={handleChange} name='appointment_status'  class="form-control" id="recipient-name"/>
          </div> */}
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </Modal.Body>
      
      </Modal>
    </>
        
   </Wrapper>
  
    </>
  )
}

export default EditAppointment;
const Wrapper = styled.div``;
