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
import CreatableSelect from 'react-select/creatable';

function EditPatientDetails({ onClose, patientInfo, allPatientData }) {
  const dispatch = useDispatch();
  const {currentUser,refreshTable} = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState([]);
  const [inputDisease, setInputDisease] = useState('');
  const [disease, setDisease] = useState([]);
    
     
   // Remove current patient data from allAppointmentData
    const filteredPatient = allPatientData.filter(patient => patient.uhid !== patientInfo.uhid)
 console.log(filteredPatient)
  const [data, setData] = useState({
    patientId : patientInfo.uhid,
    patient_Name: patientInfo.patient_name,
    mobile: patientInfo.mobileno,
    email:patientInfo.emailid ,
    gender: patientInfo.gender,
    aadhaar_no: patientInfo.aadhaar_no,
    contact_Person:patientInfo.contact_person,
    contact_Person_Name:patientInfo.contact_person_name ,
    blood_Group: patientInfo.bloodgroup,
    dob: patientInfo.dob,
    age:patientInfo.age,
    weight:patientInfo.weight ,
    allergy: patientInfo.allergy,
    disease: patientInfo.disease,
    patientType:patientInfo.patient_type ,
    address: patientInfo.address,
    patient_updated_by: currentUser.employee_name,
    patient_updated_by_emp_id: currentUser.employee_ID,
  }); 
  console.log(data)

  const getDisease = async () =>{
    try{
     const response = await axios.get('http://localhost:4000/api/v1/receptionist/get-disease');
     console.log(response);
     setDisease(response?.data?.data)
    }
    catch(error){
       console.log(error)
    }
   

 }
 useEffect(()=>{
    getDisease();
 },[])

 useEffect(() => {
  // Initialize selected diseases based on props
  if (patientInfo.disease && patientInfo.disease.length > 0) {
    const disease = patientInfo.disease.split(",");
    const selected = disease.map(d => ({
      value: d, // Assuming 'd' is the value of disease
      label: d // Assuming 'd' is the label of disease
    }));
    setSelectedDisease(selected);
    
    
  }
}, [patientInfo]);

console.log(selectedDisease);

useEffect(()=>{
  const calculateAge = (date) => {
    const dob = new Date(date);
    const now = new Date();
    let years = now.getFullYear() - dob.getFullYear();
    
    // Adjust for leap years
    const dobThisYear = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (now < dobThisYear) {
      years--;
    }
    
    setData({...data, age: years});
  };
  calculateAge(data.dob);
},[data.dob])

 const handleChangeDisease = (newValue, actionMeta) => {
  
    setSelectedDisease(newValue);
    
    if (actionMeta.action === 'create-option') {
      // If a new option is created, add it to the list of options
      const newOption = { value: newValue[newValue.length - 1].value, label: newValue[newValue.length - 1].label };
      disease.push(newOption);
    }
  };

  const handleChange = (e) => {
    const {name,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

 const handleSubmit = async (e)=>{
  e.preventDefault();
    


  const isPatientExist = filteredPatient.some(patient => (
    patient.patient_name === data.patient_Name && patient.mobileno === data.mobile
  ) )

  if (isPatientExist) {
    alert("Patient already exists with the same name and mobile number.");
    return;
  }


   // Updating the data object with the selected diseases
   const updatedData = {
    ...data,
    disease: selectedDisease.map((option) => option.value).toString()
  };
   
  try{
    const response = await axios.put('http://localhost:4000/api/v1/receptionist/update-patient-details', updatedData);
    console.log(response);
    if(response.data.success){
      alert(response?.data?.message);
      dispatch(toggleTableRefresh());
      onClose();
     }
     else{
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
          <Modal.Title>Edit Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Patient Id</label>
            <input type="text" class="form-control" readOnly value={data.patientId} id="recipient-name"/>
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example1">
                            Patient name
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            name="patient_Name"
                            onChange={handleChange}
                            value={data.patient_Name}
                            required
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example1">
                            Moblie
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            value={data.mobile}
                            name="mobile"
                            placeholder=""
                            maxLength={10}
                            minLength={10}
                            onChange={handleChange}

                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="form6Example2"
                            className="form-control"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" htmlFor="">Gender</label>
    <select className="form-select" value={data.gender} id="gender" name="gender"  required onChange={handleChange}>
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
     
    </select>
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example1">
                            Address
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            name="address"
                            onChange={handleChange}
                            required
                            value={data.address}
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example1">
                           Aadhaar No.
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            name="aadhaar_no"
                            onChange={handleChange}
                            value={data.aadhaar_no}
                          
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" htmlFor="">Contact Person</label>
    <select className="form-select" id="contact_Person" name="contact_Person" value={data.contact_Person} required onChange={handleChange}>
      <option value="">Select</option>
      <option value="Self">Self</option>
      <option value="Father">Father</option>
      <option value="Mother">Mother</option>
      <option value="Husband">Husband</option>
      <option value="Wife">Wife</option>
      <option value="Son">Son</option>
      <option value="Daughter">Daughter</option>
      <option value="Other">Other</option>
     
    </select>
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example2">
                            Cont. Per. Name
                          </label>
                          <input
                            type="text"
                            id="contact_Person_Name"
                            name="contact_Person_Name"
                            className="form-control"
                            onChange={handleChange}
                            value={data.contact_Person_Name}
                            required
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" htmlFor="">Blood Group</label>
    <select className="form-select" id="blood_Group" name="blood_Group" onChange={handleChange} value={data.blood_Group}>
      <option value="">Select</option>
      <option value="A+">A+</option>
      <option value="B+">B+</option>
      <option value="O+">O+</option>
      <option value="AB+">AB+</option>
      <option value="A-">A-</option>
      <option value="B-">B-</option>
      <option value="O-">O-</option>
      <option value="AB-">AB-</option>
     
    </select>
          </div>
          <div class="mb-3">
          <label
                            className="form-label"
                            for="form6Example1"
                            
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            id="form6Example1"
                            className="form-control"
                            name="dob"
                            value={data.dob}
                            onChange={(e) => {
                              handleChange(e)
                            }}
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example2">
                            Age
                          </label>

                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                            name="age"
                            onChange={handleChange}
                            value={data.age ? data.age : ""}
                            required
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example2">
                            Weight
                          </label>

                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                            name="weight"
                            onChange={handleChange}
                            required
                            value={data.weight}
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example2">
                         Have any allergy
                          </label>

                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                            name="allergy"
                            onChange={handleChange}
                            value={data.allergy}
                        
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example2">
                         Have any disease
                          </label>
                          <CreatableSelect
        id="disease"
        isMulti
        onChange={handleChangeDisease}
        options={disease}
        value={selectedDisease}
        inputValue={inputDisease}
        onInputChange={setInputDisease}
        placeholder="Select or type to add..."
      />
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example2">
                         Patient Type
                          </label>

                          <select className="form-select" id="patientType" name="patientType" value={data.patientType} required onChange={handleChange}>
      <option value="">Select Patient Type</option>
      <option value="Genral">General</option>
      <option value="CGHS(Serving)">CGHS(Serving)</option>
      <option value="CGHS(Pensioner)">CGHS(Pensioner)</option>
      <option value="CSMA">CSMA</option>
  
     
    </select>
          </div>
         
        <button type="submit" class="btn btn-primary">Edit</button>
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

export default EditPatientDetails
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