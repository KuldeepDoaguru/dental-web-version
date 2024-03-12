import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";

const NewTreatPrescription = () => {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [getPatientData, setGetPatientData] = useState([]);
    const [getExaminData, setGetExaminData] = useState([]);
    const [getTreatData, setGetTreatData] = useState([]);

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

    // Get Patient Examintion Details START
    const getExaminDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getDentalDataByID/${id}`);
            setGetExaminData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getExaminDetail();
    }, []);
    // Get Patient Examintion Details END

    // Get Patient Treatment Details START
    const getTreatDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/getTreatmentData/${id}`);
            setGetTreatData(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTreatDetail();
    }, []);
    // Get Patient Treatment Details END
    return (
        <>
            <Wrapper>
                <div className="container">
                    <div className="row">
                        <div className="text-center fs-1 shadow-none p-1 mt-4 mb-4 bg-light rounded">
                            <p>Medical Prescription</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        <legend className="">Patient Details</legend>
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
                <div className="container">
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        <fieldset>
                            <legend className="">Patient Examination Details</legend>
                            <div className="d-flex justify-content-between align-items-center col-lg-12 " style={{ background: "#0dcaf0", borderRadius: "5px" }}>
                                <div className="col-lg-2 d-flex flex-column text-center">
                                    <label>Seleted Teeth</label>

                                </div>
                                <div className="col-lg-2 d-flex flex-column text-center">
                                    <label>Disease</label>

                                </div>
                                <div className="col-lg-2 d-flex flex-column text-center">
                                    <label>Chief Complain</label>

                                </div>
                                <div className="col-lg-3 d-flex flex-column text-center">
                                    <label>On Exmination</label>

                                </div>
                                <div className="col-lg-3 d-flex flex-column text-center">
                                    <label>Advice</label>
                                </div>
                            </div>
                            {getExaminData.map((item, index) => (
                                <>
                                    <div key={index} className="d-flex justify-content-between align-items-center col-lg-12">
                                        <div className="col-lg-2 d-flex flex-column text-center">

                                            <p>{item.selected_teeth}</p>
                                        </div>
                                        <div className="col-lg-2 d-flex flex-column text-center">

                                            <p>{item.disease}</p>
                                        </div>
                                        <div className="col-lg-2 d-flex flex-column text-center">

                                            <p>{item.chief_complain}</p>
                                        </div>
                                        <div className="col-lg-3 d-flex flex-column text-center">

                                            <p>{item.on_examination}</p>
                                        </div>
                                        <div className="col-lg-3 d-flex flex-column text-center">

                                            <p>{item.advice}</p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </fieldset>
                    </div>
                </div>
                <div className="container">
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        <fieldset>
                            <legend className="">Patient Treatment Details</legend>
                            <div className="d-flex justify-content-between align-items-center col-lg-12 " style={{ background: "#0dcaf0", borderRadius: "5px" }}>
                                <div className="col-lg-3 d-flex flex-column text-center">
                                    <label>Dental Treatment</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Teeth</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Qty</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Cost</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Cst * Qty</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Disc %</label>

                                </div>
                                <div className="col-lg-1 d-flex flex-column text-center">
                                    <label>Final Cost</label>

                                </div>
                                <div className="col-lg-3 d-flex flex-column text-center">
                                    <label>Note</label>

                                </div>
                            </div>
                            {getTreatData.map((item, index) => (
                                <>
                                    <div key={index} className="d-flex justify-content-between align-items-center col-lg-12">
                                        <div className="col-lg-3 d-flex flex-column text-center">
                                            <p>{item.dental_treatment}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.no_teeth}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.qty}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.original_cost_amt}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.cost_amt}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.disc_amt}</p>
                                        </div>
                                        <div className="col-lg-1 d-flex flex-column text-center">
                                            <p>{item.total_amt}</p>
                                        </div>
                                        <div className="col-lg-3 d-flex flex-column text-center">

                                            <p>{item.note}</p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </fieldset>
                    </div>
                </div>
                <div className="container">
                    <div className="row shadow-sm p-3 mb-3 bg-body rounded">
                        <form>
                            <div class="row">
                                <div class="col">
                                    <div data-mdb-input-init class="form-outline">
                                        <label class="form-label" htmlFor="medicineName">Medicine Name</label>
                                        <input type="text" id="medicineName" class="form-control" name="medicineName" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div data-mdb-input-init class="form-outline">
                                        <label class="form-label" htmlFor="dosage">Dosage</label>
                                        <input type="text" id="dosage" class="form-control" name="dosage" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div data-mdb-input-init class="form-outline">
                                        <label class="form-label" htmlFor="frequency">Frequency</label>
                                        <select id="frequency" class="form-control" name="frequency">
                                            <option value="">Choose frequency</option>
                                            <option value="1-1-1(TDS)">1-1-1(TDS)</option>
                                            <option value="1-1-0(BD)">1-1-0(BD)</option>
                                            <option value="0-1-1(BD)">0-1-1(BD)</option>
                                            <option value="1-0-1(BD)">1-0-1(BD)</option>
                                            <option value="0-0-1(HS)">0-0-1(HS)</option>
                                            <option value="0-1-0(OD)">0-1-0(OD)</option>
                                            <option value="1-0-0(BM)">1-0-0(BM)</option>
                                            <option value="SOS">SOS</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div data-mdb-input-init class="form-outline">
                                        <label class="form-label" htmlFor="duration">Duration</label>
                                        <select id="duration" class="form-control" name="duration">
                                            <option value="">Choose duration</option>
                                            <option value="1 day">1 day</option>
                                            <option value="2 days">2 days</option>
                                            <option value="3 days">3 days</option>
                                            <option value="4 days">4 days</option>
                                            <option value="5 days">5 days</option>
                                            <option value="6 days">6 days</option>
                                            <option value="1 week">1 week</option>
                                            <option value="2 weeks">2 weeks</option>
                                            <option value="3 weeks">3 weeks</option>
                                            <option value="1 Month">1 Month</option>
                                            <option value="3 Months">3 Months</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div data-mdb-input-init class="form-outline">
                                        <label class="form-label" htmlFor="note">Note</label>
                                        <input type="text" id="note" class="form-control" name="note" />
                                    </div>
                                </div>
                            </div>
                            <button className='btn btn-secondary fs-5 mt-4'>Add<IoMdAdd size={20} /></button>
                        </form>
                    </div>
                </div>
                {/* {loading ? (
          <>
            <div className='text-center'><RiLoader2Fill size={35} className="spin" /></div>
          </>
        ) : ( */}
          <div className="container">
            <div className="row">
              <table class="table">
                <thead className='table-success rounded'>
                  <tr>
                    <th scope="col">Medicine Name</th>
                    <th scope="col">Dosage</th>
                    <th scope="col">Frequency</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Note</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  
                </tbody>
              </table>
            </div>
          </div>
        {/* )} */}
            </Wrapper>
        </>
    )
}

export default NewTreatPrescription;
const Wrapper = styled.div`
legend{
    font-size: 2.0rem;
   
}
label{
    font-size: 1.2rem;
    font-weight: 500;
}
p{
    white-space: nowrap;
}
`;