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
import cogoToast from 'cogo-toast';

function EditPatientDetails({ onClose, patientInfo, allPatientData }) {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const {currentUser,refreshTable} = useSelector((state) => state.user);
  const branch = currentUser.branch_name
  const token = currentUser?.token;
  const [show, setShow] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState([]);
  const [inputDisease, setInputDisease] = useState('');
  const [disease, setDisease] = useState([]);

  const timelineData = async (id) => {
  
    try {
      
      const response = await axios.post(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/insertTimelineEvent",
        {
          type: "Patient Profile",
          description: "Patient Profile Updated",
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
     const response = await axios.get('https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-disease');
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
  if (patientInfo.disease && patientInfo.disease?.length > 0) {
    const disease = patientInfo.disease?.split(",");
    const selected = disease?.map(d => ({
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
  if(data.dob){
    calculateAge(data.dob);
  }
  
},[data.dob])

 // Function to format date in YYYY-MM-DD format
 const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

 const handleChangeDisease = (newValue, actionMeta) => {
  
    setSelectedDisease(newValue);
    
    if (actionMeta.action === 'create-option') {
      // If a new option is created, add it to the list of options
      const newOption = { value: newValue[newValue?.length - 1].value, label: newValue[newValue?.length - 1].label };
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
    disease: selectedDisease?.map((option) => option.value).toString()
  };
   
  try{
    setLoading(true);
    const response = await axios.put('https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/update-patient-details', updatedData ,
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
      timelineData(patientInfo.uhid);
      onClose();
     }
     else{
      setLoading(false);
      cogoToast.error(response?.data?.message || "Failed to edit details");
     }

 }
 catch(error){
  setLoading(false);
   console.log(error)
      cogoToast.error(error?.response?.data?.message || "Failed to edit details");

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
          <label className="form-label" for="name1">
                            Patient name
                          </label>
                          <input
                            type="text"
                            id="name1"
                            className="form-control"
                            name="patient_Name"
                            onChange={handleChange}
                            value={data.patient_Name}
                            required
                            pattern="[A-Za-z\s]*"
                            title="Text should contain only letters"
                            placeholder="Enter full name"
                            maxLength={100}

                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="mobile">
                            Moblie
                          </label>
                          <input
                           id='mobile'
                            required
                            type="text"
                            className="form-control"
                            value={data.mobile}
                            name="mobile"
                            placeholder="Enter 10-digit mobile number"
                    pattern="[0-9]{10}"
                    title="Mobile number should be 10 digits"
                            maxLength={10}
                            minLength={10}
                            onChange={handleChange}

                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="email">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            value={data.email}
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" htmlFor="gender">Gender</label>
    <select className="form-select" value={data.gender} id="gender" name="gender"  required onChange={handleChange}>
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
     
    </select>
          </div>
          <div class="mb-3">
          <label className="form-label" for="address">
                            Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            className="form-control"
                            name="address"
                            onChange={handleChange}
                            required
                            value={data.address}
                            placeholder="Enter address"
                            maxLength={250}
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="aadhaar_no">
                           Aadhaar No.
                          </label>
                          <input
                            type="text"
                            id="aadhaar_no"
                            className="form-control"
                            name="aadhaar_no"
                            onChange={handleChange}
                            value={data.aadhaar_no}
                            placeholder="Enter 12-digit aadhaar number"
                    pattern="[0-9]{12}"
                    title="Aadhaar number should be 12 digits"
                    maxLength={12}
                    minLength={12}
                          
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" htmlFor="contact_Person">Contact Person</label>
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
          <label className="form-label" for="contact_Person_Name">
                            Cont. Per. Name
                          </label>
                          <input
                            type="text"
                            id="contact_Person_Name"
                            name="contact_Person_Name"
                            className="form-control"
                            onChange={handleChange}
                            value={data.contact_Person_Name}
                            disabled={data.contact_Person == "Self"}
                            pattern="[A-Za-z\s]*"
                            title="Text should contain only letters"
                            placeholder="Enter contact person name"
                            maxLength={100}
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" htmlFor="blood_Group">Blood Group</label>
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
                            for="dob"
                            
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            id="dob"
                            className="form-control"
                            name="dob"
                            max={formatDate(new Date())}
                            value={data.dob}
                            onChange={(e) => {
                              handleChange(e)
                            }}
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="age">
                            Age
                          </label>

                          <input
                            type="text"
                            id="age"
                            className="form-control"
                            name="age"
                            onChange={handleChange}
                            value={data.age ? data.age : ""}
                            required
                            placeholder="Enter age in years"
                            pattern="[0-9]*"
                            title="Age should contain only numbers"
                            maxLength={3}
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="weight">
                            Weight
                          </label>

                          <input
                            type="text"
                            id="weight"
                            className="form-control"
                            name="weight"
                            onChange={handleChange}
                            required
                            value={data.weight}
                            placeholder="Enter weight in kg"
                            pattern="[0-9]*"
                            title="weight should contain only numbers"
                            maxLength={3}
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="allergy">
                         Have any allergy
                          </label>

                          <input
                            type="text"
                            id="allergy"
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
          <label className="form-label" for="patientType">
                         Patient Type
                          </label>

                          <select className="form-select" id="patientType" name="patientType" value={data.patientType} required onChange={handleChange}>
      <option value="">Select Patient Type</option>
      <option value="General">General</option>
      <option value="CGHS(Serving)">CGHS(Serving)</option>
      <option value="CGHS(Pensioner)">CGHS(Pensioner)</option>
      <option value="CSMA">CSMA</option>
  
     
    </select>
          </div>
         
        <button type="submit" class="btn btn-primary" disabled={loading}> { loading ? "Loading..." : "Submit"}</button>
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