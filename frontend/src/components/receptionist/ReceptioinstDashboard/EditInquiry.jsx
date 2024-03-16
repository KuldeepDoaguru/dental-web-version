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

function EditInquiry({ onClose, inquiryInfo }) {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
 
  const [selectedDoctor, setSelectedDoctor] = useState({
    doctorId: inquiryInfo.doctorId,
    doctorName : inquiryInfo.doctorName
  }); // State to store the selected Doctor
  
  
  const [doctors,setDoctors] = useState([]);
  const  branch = currentUser.branch_name;
  const [data,setData] = useState({
    id : inquiryInfo.id,
    patientName : inquiryInfo.patient_name,
    mobile : inquiryInfo.mobile,
    email: inquiryInfo.email,
    gender : inquiryInfo.gender,
    age : inquiryInfo.age,
    address : inquiryInfo.address,
    notes : inquiryInfo.notes,
    


  })
  

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
     
     
     getDoctors();
     
    
     
  },[]);

  useEffect(() => {
    setSelectedDoctor({
      doctorId: inquiryInfo.doctorId,
      doctorName: inquiryInfo.doctorName,
    });
  }, [inquiryInfo]); // Update selectedDoctor when inquiryInfo prop changes



  const handleDoctorChange = (selectedOption) => {
    setSelectedDoctor({
        doctorName : selectedOption.label,
        doctorId: selectedOption.value
    });
  };

console.log(data)

 


  const handleChange = (e) => {
    const {name,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

  const handleSubmit = async (e) =>{

    e.preventDefault();
          const updatedInquiry = {
            ...data,
            ...selectedDoctor
          }

          try {
            const response = await axios.put('http://localhost:4000/api/v1/receptionist/update-inquiry', updatedInquiry);
            console.log(response);
            if (response.data.success) {
                dispatch(toggleTableRefresh());
              alert(response?.data?.message);
              onClose();
              
             
      
              
            }
            
           else {
          alert(response?.data?.message);
        }
      
      }
       catch(error){
         console.log(error)
            alert(error?.response?.data?.message);
      
       }
  }

 

  return (
    <>
   <Wrapper className="container">
   <>
    

      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <label for="recipient-id" class="col-form-label">Inquiry Id:</label>
            <input type="text" value={data.id} required readOnly class="form-control"  id="recipient-id"/>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Patient Name:</label>
            <input type="text" name="patientName" value={data.patientName} onChange={handleChange} required class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Mobile</label>
    <input type="text" maxLength={10} minLength={10}  onChange={handleChange} value={data.mobile} required class="form-control" name="mobile" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" value={data.email} onChange={handleChange} name="email" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>

  <div class="mb-3">
  <label className="form-label" htmlFor="">Gender</label>
    <select className="form-select" value={data.gender} id="gender" name="gender"  onChange={handleChange}  >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
     
    </select>
  
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Age</label>
    <input type="text" class="form-control" value={data.age} name="age" id="exampleInputEmail1"  onChange={handleChange} aria-describedby="emailHelp"/>
  
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Inquiry for Doctor</label>
    <Select
                value={{ label: selectedDoctor.doctorName, value: selectedDoctor.doctorId }}
                onChange={handleDoctorChange}
                options={doctors.map((doctor) => ({
                  label: `${doctor.employee_name}`,
                  value: `${doctor.employee_ID}`,
                }))}
              />
  
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Address</label>
    <input type="text" class="form-control" value={data.address} onChange={handleChange} name="address" id="exampleInputEmail1" aria-describedby="emailHelp"/>
     
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Notes</label>
    <input type="text" class="form-control" value={data.notes} name="notes" required onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>
       
        
        
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

export default EditInquiry
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