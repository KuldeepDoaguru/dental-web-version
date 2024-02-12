import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AppDetail({props}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    
   <Wrapper className="container">

      <Button variant="" onClick={handleShow} id='b1'>
       Detail
      </Button>

      <Modal show={show}  size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Patient Bill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
          <div className='row'>
          <div className="mb-3 d-flex gap-2 col-6">
            <label for="recipient-name" className="col-form-label">Patient name :</label>
           <p className='mt-2'>Amit Kumar </p>
          </div>
          <div className="mb-3 d-flex gap-2 col-6">
            <label for="message-text" className="col-form-label">Patient id :</label>
           <p className='mt-2'>P57789</p>

          </div>
          </div>
          <div className='row'>
          <div className="mb-3 d-flex gap-2 col-6">
            <label for="message-text" className="col-form-label">Patient Mobile:</label>
                <p className='mt-2'>9456687475</p>
          </div>
          <div className="mb-3 d-flex gap-2 col-6">
            <label for="message-text" className="col-form-label">Bill Number:</label>
            <p className='mt-2'>B585858</p>
          </div>
          </div>
          <div className="mb-3 d-flex gap-2">
            <label for="message-text" className="col-form-label">Bill Date:</label>
              <p className='mt-2'>25 oct 2023</p>
          </div>
        </form>
        <div
   className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
   id="tableres"
 >
   <div className="table-responsive">
     <table className="table table-bordered table-striped h-75">
       <thead>
         <tr>
           <th>S.no</th>
           <th>Description</th>
           <th>Dr Name</th>
           <th>Qty</th>
           <th>Cost(INR)</th>
          <th>Discount(INR)</th>
           <th>Tax%</th>
           <th>Total Amount</th>
     
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>1</td>
           <td>Consultation</td>
           <td>Dr.Umer Qureshi</td>
           <td>1</td>
           <td>4000</td>
           <td>0</td>
           <td>0</td>
           <td>2000</td>
          

         </tr>
         
        
        

      
       </tbody>
     </table>
     <p>Total-INR 2000</p>
     <div className="card" id="card4">
            <div className="card-body ">
          
              <div className="">
                <h6 className="card-title text-center">Paid Amounts</h6>

               

              
              </div>
            </div>
            <div className="card-body ">
         
              <div className="">
                <h6 className="card-title text-center">On 25 oct ,2023:-INR 2000/-</h6>

               

              
              </div>
            </div>
            <div className="card-body ">
            
              <div className="">
                <h6 className="card-title text-center">Total Paid:- INR 2000/-</h6>

               

              
              </div>
            </div>
          </div>
   </div>
 </div>
 <button type="button" className="btn btn-primary mt-4 mx-3" id='button1'>Print</button>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
  
        </Modal.Footer>
      </Modal>
    
  
        
   </Wrapper>
  

  )
}

export default AppDetail;
const Wrapper = styled.div`


#button{
    margin: 2rem;
}



   
`


