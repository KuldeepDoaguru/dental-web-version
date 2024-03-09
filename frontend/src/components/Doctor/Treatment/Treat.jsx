import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdArrowDropright } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Treat = () => {
  const { id } = useParams();
  console.log(id);
  const [getPatientData, setGetPatientData] = useState([]);
  const [getExamTeeth, setGetExamTeeth] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [inputValues, setInputValues] = useState();
  const navigate = useNavigate();

  const options = [
    "Dental Cleanings",
    "Dental Examinations",
    "Dental Sealants",
    "Fluoride Treatments",
    "Crowns (Caps)",
    "Bridges",
    "Dentures (Partial or Full)",
    "Dental Implants",
    "Root Canal Treatment (RCT)",
    "Root Canal Retreatment (Re-Root Canal)",
    "Apicoectomy (Endodontic Surgery)",
    "Scaling and Root Planing (Deep Cleaning)",
    "Periodontal Maintenance",
    "Gum Graft Surgery",
    "Periodontal Flap Surgery",
    "Teeth Whitening (Bleaching)",
    "Dental Bonding",
    "Porcelain Veneers",
    "Inlays and Onlays",
    "Orthodontic Treatments (Braces, Clear Aligners)",
    "Tooth Extractions (Simple and Surgical)",
    "Wisdom Tooth Extraction",
    "Dental Implant Surgery",
    "Jaw Surgery (Orthognathic Surgery)",
    "Complete Dentures",
    "Partial Dentures",
    "Dental Bridges",
    "Dental Implant Restorations",
    "Dental Sealants",
    "Fluoride Treatments",
    "Pediatric Dental Cleanings",
    "Dental Fillings for Children",
    "Traditional Braces",
    "Clear Aligners (Invisalign, ClearCorrect)",
    "Retainers",
    "Orthodontic Appliances",
    "Treatment for Dental Trauma",
    "Emergency Tooth Extractions",
    "Pain Management",
    "Temporary Dental Repairs",
  ];

  // Get Treatment List START
  const getTreatmentList = async () => {
    try {
      const res = await axios.get(`http://localhost:8888/api/doctor/treatmentLists`);
      // console.log(res.data.data);
      setTreatments(res.data.data);
    } catch (error) {
      console.log('Error fetching treatments:', error);
    }
  };

  useEffect(() => {
    getTreatmentList();
  }, [])
  // first function
  // const handleTreatmentChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedTreatment(selectedValue);

  //   const selectedTreatmentData = treatments.find(t => t.treatment_name === selectedValue);
  //   if (selectedTreatmentData) {
  //     setInputValues({
  //       cost: selectedTreatmentData.treatment_cost,
  //       discount: selectedTreatmentData.treatment_discount
  //     });
  //   }
  // }

  const handleTreatmentChange = (e, index) => {
    const selectedValue = e.target.value;
    const updatedSelectedTreatments = [...selectedTreatment];
    updatedSelectedTreatments[index] = selectedValue;
    setSelectedTreatment(updatedSelectedTreatments);

    const selectedTreatmentData = treatments.find(t => t.treatment_name === selectedValue);
    if (selectedTreatmentData) {
      const updatedInputValues = [...inputValues];
      updatedInputValues[index] = {
        cost: selectedTreatmentData.treatment_cost,
        discount: updatedInputValues[index]?.discount || selectedTreatmentData.treatment_discount // Use treatment discount if not already set
      };
      setInputValues(updatedInputValues);
    }

  };

  useEffect(() => {
    setInputValues(Array(getExamTeeth.length).fill({ cost: '', discount: '' }));
  }, [getExamTeeth]);

  const handleDiscountChange = (e, index) => {
    const { value } = e.target;
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = {
      ...updatedInputValues[index],
      discount: value
    };
    setInputValues(updatedInputValues);
  };

  // Get Treatment List END

  // Calculate  Discount and Cost START

  const calculateTotal = (index) => {
    // Get the input values for the specific tooth using the index
    const cost = parseFloat(inputValues[index]?.cost || 0);
    const discount = parseFloat(inputValues[index]?.discount || 0);

    // Calculate total after discount for the specific tooth
    const totalAfterDiscount = cost - discount;

    // Return total after discount for the specific tooth
    return totalAfterDiscount.toFixed(2);
  };


  // Calculate  Discount and Cost END

  // Get Patient Details START
  const getPatientDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${id}`);
      setGetPatientData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientDetail();
  }, []);
  // Get Patient Details END

  // Get Examintion Teeth Details START

  const getExamintionTeeth = async () => {
    try {
      const res = await axios.get(`http://localhost:8888/api/doctor/getDentalDataByID/${id}`);
      setGetExamTeeth(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getExamintionTeeth();
  }, []);


  // Get Examintion Teeth Details END

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      // Map the inputValues array to the format expected by the backend
      const treatmentData = getExamTeeth.map((item, index) => ({
        dental_treatment: selectedTreatment[index],
        no_teeth: item.selected_teeth,
        qty: inputValues[index]?.quantity, // Assuming you have a quantity property in inputValues
        cost_amt: inputValues[index]?.cost,
        disc_amt: inputValues[index]?.discount,
        total_amt: calculateTotal(index),
        note: '', // Add note here if available
      }));

      const response = await axios.post(`http://localhost:8888/api/doctor/insertTreatmentData/${id}`, treatmentData);
      console.log(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center">
              <p className="fs-1 shadow-none p-2 mb-4 bg-light rounded">Treatment Procedure</p>
            </div>
          </div>
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
          {/* <div className="row shadow-sm p-4 mb-3 bg-white rounded" >
            <form>
          {getExamTeeth.map((item, index)=>{
            <div key={index}>
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="row">
                  <div
                    className="col-md-4 w-100"
                    style={{ position: "relative" }}
                  >
                    <select className="shadow-none p-1 bg-light rounded border-0" value={selectedTreatment} onChange={handleTreatmentChange}>
                      <option value="" disabled selected>Choose Treatment</option>
                      {Array.isArray(treatments) && treatments.map(treatment => (
                        <option key={treatment.treatment_id} value={treatment.treatment_name}>{treatment.treatment_name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="input2"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={item.selected_teeth}                      
                      placeholder="Teeth Number"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="input3"
                      className="shadow-none p-1 bg-light rounded border-0"
                      // value={inputs.input3}                      
                      readOnly
                      placeholder="Quantity"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="input4"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={inputValues.cost}
                      placeholder="Cost Amount"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="input5"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={inputValues.discount}
                      onChange={(e) => setInputValues({ ...inputValues, discount: e.target.value })}
                      placeholder="Discount Amount"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="input6"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={calculateTotal()}                     
                      placeholder="Total Amount"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-evenly align-items-center p-2">
                <div className="row">
                  <div className="col-md-8">
                    <textarea
                      type="text"
                      name="input7"
                      className="shadow-none p-1 bg-light rounded border-0"
                      // value={inputs.input7}                    
                      placeholder="Add some more details"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-info text-light">
                  Continue <IoMdArrowDropright size={25} />
                </button>
              </div>
              </div>
          })}
            </form>
          </div> */}
          <div className="row shadow-sm p-4 mb-3 bg-light rounded">
            <form onSubmit={handleSubmit}>
              {getExamTeeth.map((item, index) => (
                <div className="shadow-sm p-3 mb-5 bg-white rounded" key={index}>
                  <div className="d-flex justify-content-between align-items-center p-2">
                    <div className="row">
                      <div className="col-md-4 w-100" style={{ position: "relative" }}>
                        <select name="dental_treatment" className="shadow-sm p-1 bg-light rounded border-0" value={selectedTreatment[index] || ''} onChange={(e) => handleTreatmentChange(e, index)}>
                          <option value="" disabled selected>Choose Treatment</option>
                          {Array.isArray(treatments) && treatments.map(treatment => (
                            <option key={treatment.treatment_id} value={treatment.treatment_name}>{treatment.treatment_name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="no_teeth"
                          className="shadow-none p-1 bg-light rounded border-0"
                          value={item.selected_teeth}
                          placeholder="Teeth Number"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="qty"
                          className="shadow-none p-1 bg-light rounded border-0"
                          readOnly
                          placeholder="Quantity"
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
                          value={inputValues[index]?.cost || ''}
                          placeholder="Cost Amount"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="disc_amt"
                          className="shadow-none p-1 bg-light rounded border-0"
                          value={inputValues[index]?.discount || ''}
                          onChange={(e) => handleDiscountChange(e, index)}
                          placeholder="Discount Amount"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="total_amt"
                          className="shadow-none p-1 bg-light rounded border-0"
                          value={calculateTotal(index)}
                          placeholder="Total Amount"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-evenly align-items-center p-2">
                    <div className="row">
                      <div className="col-md-8">
                        <textarea
                          type="text"
                          name="note"
                          className="shadow-none p-1 bg-light rounded border-0"
                          // value={inputs.input7}
                          placeholder="Add some more details"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-info text-light">
                      Continue <IoMdArrowDropright size={25} />
                    </button>
                  </div>
                </div>
              ))}
            </form>
          </div>

          <div className="row">
            <div className="shadow-sm p-4 bg-white rounded">
              <table class="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Note</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                  <tr>
                    <th>RCT</th>
                    <td>Note</td>
                    <td>10</td>
                    <td>2000</td>
                    <td>100</td>
                    <td>1900</td>
                    <td colspan="2">
                      <button className="btn btn-primary"><CiEdit size={25} /></button>
                      &nbsp;
                      <button className="btn btn-danger mx-1"><MdDeleteOutline size={25} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-info text-light" onClick={() => navigate("/TPrescriptionDash")}>
                  Next <GrFormNextLink size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Treat;
const Wrapper = styled.div`
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
