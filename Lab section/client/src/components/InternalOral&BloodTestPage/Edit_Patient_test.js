import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';

function Edit_Patient_test() {

    const [patienttest , setPatienttest] = useState('')
    const [patientresult , setPatientresult] = useState('')
    const [patientunit , setPatientunit] = useState('')
    const [patientcost , setPatientcost] = useState('')
    const [patientcollection_date , setPatientcollection_date] = useState('')
    const [patientauthenticate_date , setPatientauthenticate_date] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
      const fetchPatientTestDetails = async () => {
        try {
          const response = await axios.get(
            `https://dentalgurulab.doaguru.com/api/lab//get-patient-test-details-by-id/${id}`
          );
          setPatienttest(response.data[0].test)
           setPatientresult(response.data[0].result)
           setPatientunit(response.data[0].unit)
           setPatientcost(response.data[0].cost)
           setPatientcollection_date(response.data[0].collection_date)
           setPatientauthenticate_date(response.data[0].authenticate_date)
           
  
  
          
        } catch (error) {
          console.error("Error fetching patient details:", error);
        }
      };
  
      fetchPatientTestDetails();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
       
        const response = await axios.put(
          `https://dentalgurulab.doaguru.com/api/lab/update-patent-test-data/${id}`,
          {patient_test: patienttest, 
            test: patienttest , result:patientresult, unit:patientunit,cost:patientcost ,collection_date: patientcollection_date,authenticate_date:patientauthenticate_date}
        );
        if (response.status === 200) {
          setMessage(response.data.message);
          navigate(`/final-oral-testing/${id}`);
        } else {
          setMessage(response.data.error || "Failed to update Patient test data");
        }
      } catch (error) {
        console.error("Error updating Patient test data", error);
       
      }
  
      // Close the modal after saving
      setShowModal(false);
    };
  
    const handleClose = () => {
      setShowModal(false);
      navigate(`/final-oral-testing/${id}`);
    };
  
  return (
   <>
   
   <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Invoice Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formpatienttest">
            <Form.Label>Patient Test</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new Patient Test"
              value={patienttest}
              onChange={(e) => setPatienttest(e.target.value)}
            />
            <Form.Label className="mt-3">Patient result</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new Patient result"
              value={patientresult}
              onChange={(e) => setPatientresult(e.target.value)}
            />
              {patientunit > '' && (
                <>
            <Form.Label className="mt-3">Patient Unit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new Patient Unit"
              value={patientunit}
              onChange={(e) => setPatientunit(e.target.value)}
            />
            
            </>
              )}
             {patientcost > '' && (
                <> <Form.Label className="mt-3">Patient cost</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new Patient cost"
              value={patientcost}
              onChange={(e) => setPatientcost(e.target.value)}
            />
        </>
             )}
            
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
   
    </Modal> 
   
   </>
  )
}

export default Edit_Patient_test