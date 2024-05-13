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


function Refund({ onClose, patientInfo}) {
  const dispatch = useDispatch();
  const {currentUser,refreshTable} = useSelector((state) => state.user);
  const branch = currentUser.branch_name;
  const token = currentUser?.token;
  const [show, setShow] = useState(false);

  const timelineData = async (id) => {
  
    try {
      const response = await axios.post(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/insertTimelineEvent",
        {
          type: "Security Amount",
          description: "Security Amount Received",
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
    
 

  const [data, setData] = useState({
    sa_id :patientInfo.sa_id ,
    patientId : patientInfo.uhid,
    patient_Name: patientInfo.patient_name,
    mobile: patientInfo.patient_number,
    amount : patientInfo.amount,
    payment_status : "success",
    payment_Mode : "",
    transaction_Id	: "",
    notes : "",

    received_by: currentUser.employee_name,
    
    
  }); 
  console.log(data)

  
   

 
 






    
    
    

  const handleChange = (e) => {
    const {name,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

 const handleSubmit = async (e)=>{
  e.preventDefault();
    

   
  try{
    const response = await axios.put('https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/updatePatientSecurityAmt', data  ,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    });
    console.log(response);
    if(response.data.success){
      cogoToast.success(response?.data?.message);
      dispatch(toggleTableRefresh());
      timelineData(patientInfo.uhid);
      onClose();
     }
     else{
      cogoToast.error(response?.data?.message);
     }

 }
 catch(error){
   console.log(error)
      cogoToast.error(error?.response?.data?.message);
      
 }
 }
   
 

  return (
    <>
   <Wrapper className="container">
   <>
    
     
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make Payment</Modal.Title>
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
                            readOnly
                          />
          </div>
          <div class="mb-3">
          <label className="form-label" for="form6Example1">
                            Amount
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            name="patient_Name"
                            onChange={handleChange}
                            value={data.amount}
                            required
                            readOnly
                          />
          </div>
     

          <div class="mb-3">
          <label className="form-label" htmlFor="">Payment Mode</label>
    <select className="form-select" id="payment_Mode" name="payment_Mode" value={data.payment_Mode} required onChange={handleChange}>
      <option value="">Select</option>
      <option value="cash">Cash</option>
      <option value="online">Online</option>
    
     
    </select>
          </div>

         {data.payment_Mode === "online" &&  <div class="mb-3">
          <label className="form-label" for="form6Example1">
                            Transaction Id
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            name="transaction_Id"
                            onChange={handleChange}
                            value={data.transaction_Id}
                            required
                          />
          </div>
          }

<div class="mb-3">
          <label className="form-label" for="form6Example1">
                            Notes
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            name="notes"
                            onChange={handleChange}
                            value={data.notes}
                           
                          />
          </div>


         
         
        
         
         
        
        
         
          
         
        
         
         
         
         
        <button type="submit" class="btn btn-primary">Submit</button>
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

export default Refund;
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