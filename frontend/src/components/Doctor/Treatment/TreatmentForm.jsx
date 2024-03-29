import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTooth } from "react-icons/fa";


const TreatmentForm = () => { 
    const { id, appointment_id } = useParams(); 
    console.log(id);
    console.log(appointment_id);
    const navigate = useNavigate();
    const [getPatientData, setGetPatientData] = useState([]);

    // Access teeth number from location state --START--
    const locationState = useLocation().state;
    console.log(locationState);

    // Extract teeth number from location state
    const teethNumber = locationState && typeof locationState.selected_teeth === 'object'
        ? locationState.selected_teeth.selected_teeth
        : locationState.selected_teeth;
    console.log(teethNumber);

    const teethNumberLength = teethNumber ? teethNumber.split(',').length : 0;
    console.log('Length:', teethNumberLength);

    // Access teeth number & Quantity --END--

    const [treatments, setTreatments] = useState([]);
    const [formData, setFormData] = useState({
        patient_uhid: null,
        dental_treatment: '',
        no_teeth: teethNumber || '',
        qty: teethNumberLength.toString() || '',
        cost_amt: '',
        disc_amt: '',
        total_amt: '',
        note: ''
    });

    console.log(formData);

    // Send Treatment Data to the Server....

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8888/api/doctor/insertTreatmentData/${id}/${appointment_id}`, formData);
            if (res.status >= 200 && res.status < 300) {
                console.log('Treatment details inserted successfully');
                // Optionally, you can reset the form fields after successful submission
                setFormData({
                    dental_treatment: '',
                    no_teeth: '',
                    qty: '',
                    cost_amt: '',
                    original_cost_amt: '',
                    disc_amt: '',
                    total_amt: '',
                    note: ''
                });
                navigate(`/TreatmentDashBoard/${appointment_id}`)
            } else {
                console.error('Failed to insert treatment details. Server returned status:', res.status);
            }
        } catch (error) {
            console.error('Failed to insert treatment details:', error);
        }
    };

    // Get Treatment List START
    const getTreatmentList = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/treatmentLists`);
            console.log(res.data.data);
            setTreatments(res.data.data);
        } catch (error) {
            console.log('Error fetching treatments:', error);
        }
    };

    useEffect(() => {
        getTreatmentList();
    }, [])

    // const handleTreatmentSelect = (e) => {
    //     const selectedTreatment = e.target.value;
    //     const selectedTreatmentObject = treatments.find(treatment => treatment.treatment_name === selectedTreatment)
    //     if (selectedTreatmentObject) {
    //         const costAmt = parseFloat(selectedTreatmentObject.treatment_cost || 0);
    //         const discAmt = parseFloat(selectedTreatmentObject.treatment_discount || 0);
    //         const newTotalAmt = (costAmt - discAmt).toString();
    //         setFormData({
    //             ...formData,
    //             dental_treatment: selectedTreatmentObject.treatment_name,
    //             cost_amt: selectedTreatmentObject.treatment_cost,
    //             disc_amt: selectedTreatmentObject.treatment_discount,
    //             total_amt: newTotalAmt
    //         });
    //     }
    // }

    const handleTreatmentSelect = (e) => {
        const selectedTreatment = e.target.value;
        const selectedTreatmentObject = treatments.find(treatment => treatment.treatment_name === selectedTreatment)
        if (selectedTreatmentObject) {
            const costAmt = parseFloat(selectedTreatmentObject.treatment_cost || 0);
            const discPercentage = parseFloat(selectedTreatmentObject.treatment_discount || 0);
            const qty = parseFloat(formData.qty || 0);
            // const newCostAmt = (qty * costAmt).toString(); // Multiply quantity with cost amount
            // const originalCostAmt = selectedTreatmentObject.treatment_cost;
            // const newTotalAmt = (newCostAmt - discAmt).toString();
            const discAmt = (costAmt * (discPercentage / 100)) * qty;

            // Calculate the new cost amount after applying the discount
            const newCostAmt = (qty * costAmt).toString(); // Multiply quantity with cost amount

            // Calculate the total amount after discount
            const newTotalAmt = (newCostAmt - discAmt).toString();
            setFormData({
                ...formData,
                dental_treatment: selectedTreatmentObject.treatment_name,
                original_cost_amt: selectedTreatmentObject.treatment_cost,
                cost_amt: newCostAmt,
                disc_amt: selectedTreatmentObject.treatment_discount,
                total_amt: newTotalAmt
            });
        }
    }

     // Get Patient Details START
     const getPatientDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${appointment_id}`);
            
            const uhid = res.data.result.length > 0 ? res.data.result[0].uhid : null;
            setFormData(prevInputItem => ({
                ...prevInputItem,
                patient_uhid: uhid
            }));
            setGetPatientData(res.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPatientDetail();
    }, []);
    // Get Patient Details END

    return (
        <>
            <Wrapper>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <p className="fs-1 shadow-none p-2 mb-4 bg-light rounded">Treatment Procedure</p>
                        </div>
                    </div>

                    <div className="container patient">
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        {getPatientData.map((item, index) => (
                            <>
                                <div key={index} className="col-lg-12 d-flex justify-content-between align-items-center">
                                    <div className="col-lg-4">
                                        <p><strong>Appoint ID</strong> : {item.appoint_id}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p><strong>Patient Name</strong> : {item.patient_name}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p><strong>Patient Mobile No.</strong> : {item.mobileno}</p>
                                    </div>
                                </div>
                                <div key={index + 'secondRow'} className="col-lg-12 d-flex justify-content-between align-items-center">
                                    <div className="col-lg-4">
                                        <p className="mb-0"><strong>Blood Group</strong> : {item.bloodgroup}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="mb-0"><strong>Disease</strong> : {item.disease}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="mb-0"><strong>Allergy</strong> : {item.allergy}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>

                    <div className="row shadow-sm p-4 mb-3 bg-white rounded" >
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-between align-items-center p-2">
                                <div className="row">
                                    <div
                                        className="col-md-4 w-100"
                                        style={{ position: "relative" }}
                                    >
                                        {/* <input
                                            type="text"
                                            name="dental_treatment"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            value={formData.dental_treatment}
                                            placeholder="Treatment Name"
                                            onChange={handleChange}
                                        /> */}

                                        <select name="dental_treatment" className="form-select shadow-none p-1 bg-light rounded border-0" value={formData.dental_treatment}
                                            onChange={handleTreatmentSelect}>
                                            <option value="" className="text-center">--Choose Treatment--</option>
                                            {treatments.map((treatment => (
                                                <option className="text-center" key={treatment.id} value={treatment.treatment_name}>{treatment.treatment_name}</option>
                                            )))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="no_teeth"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            value={teethNumber}
                                            placeholder="Teeth Number"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="qty"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            value={teethNumberLength}
                                            placeholder="Quantity"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center p-2">
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="cost_amt"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            value={`Original: ${formData.original_cost_amt}`} // Displaying both values
                                            placeholder="Cost Amount"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="cost_amt"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            value={formData.cost_amt}
                                            placeholder="Cost Amount"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="disc_amt"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            value={formData.disc_amt}
                                            placeholder="Discount Amount"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-evenly align-items-center p-2">
                                <div className="row">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="total_amt"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            value={formData.total_amt}
                                            placeholder="Total Amount"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <textarea
                                            type="text"
                                            name="note"
                                            className="shadow-none p-1 bg-light rounded border-0"
                                            value={formData.note}
                                            placeholder="Add some more details"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="submit" className="btn btn-info text-light">
                                    Treatment Done <FaTooth size={22} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Wrapper>
        </>
    )
};

export default TreatmentForm;
const Wrapper = styled.div`
.sc-eKzuse{
    width: 100%;
}
.list-group {
    position: absolute;
    z-index: 10;
    height: 200px;
    width: 180px;
    overflow-y: auto;
  }
  input {
    width: 22rem;
    @media (min-width: 280px) and (max-width: 460px) {
      width: 5rem;
    }
    @media (min-width: 461px) and (max-width: 820px) {
      width: 13rem;
    }
    @media (min-width: 821px) and (max-width: 1024px) {
      width: 17rem;
    }
  }
  select{
    width: 22rem;
    @media (min-width: 280px) and (max-width: 460px) {
      width: 5rem;
    }
    @media (min-width: 461px) and (max-width: 820px) {
      width: 13rem;
    }
    @media (min-width: 821px) and (max-width: 1024px) {
      width: 17rem;
    }
  }
  textarea {
    width: 52rem;
    @media (min-width: 280px) and (max-width: 460px) {
      width: 13rem;
    }
    @media (min-width: 461px) and (max-width: 1024px) {
      width: 25rem;
    }
  }
  .ProfileDetailsMain,
  p {
    @media (min-width: 280px) and (max-width: 460px) {
      font-size: 8px;
    }
  }
`;

