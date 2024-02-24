import React from 'react';
import styled from "styled-components";

const PrescriptionTypes = () => {
    return (
        <>
            <Wrapper>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
                            <div className="">
                                <div className="d-flex">
                                    <label className='lable' title='Chief Complaint'>C/C</label>
                                    <p className='mx-4 drRx'><span>-</span> The main reason or primary medical issue for which a patient is seeking medical attention.</p>
                                </div>
                                <div className="d-flex">
                                    <label className='lable' title='Medical History'>M/H</label>
                                    <p className='mx-4 drRx'><span>-</span>Information about a patient's past illnesses, surgeries, medications, and other relevant medical information.</p>
                                </div>
                                <div className="d-flex">
                                    <label className='lable' title='Dental History'>D/H</label>
                                    <p className='mx-4 drRx'><span>-</span>Information about a patient's past and current medication usage, including any allergies or adverse reactions to medications.</p>
                                </div>
                                <div className="d-flex">
                                    <label className='lable' title='On Examination'>O/E</label>
                                    <p className='mx-4 drRx'><span>-</span>Findings or observations noted during a physical examination of the patient.</p>
                                </div>
                                <div className="d-flex">
                                    <label className='lable' title='Advice'>Adv</label>
                                    <p className='mx-4 drRx'><span>-</span>Recommendations or guidance provided to the patient regarding their medical condition or treatment.</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <label className='lable' title='Medical Prescription'>Rx</label>
                                    <p className='mx-4 drRx'><span>-</span> Instructions written by a healthcare provider for the preparation and administration of a medication or treatment</p>
                                    <p className='mx-4 drRx'><span>-</span> Instructions written by a healthcare provider for the preparation and administration of a medication or treatment</p>
                                    <p className='mx-4 drRx'><span>-</span> Instructions written by a healthcare provider for the preparation and administration of a medication or treatment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default PrescriptionTypes;
const Wrapper = styled.div`
.lable{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.4rem;
}
.drRx{
    font-size: 1.4rem;
    font-family: "Kalam", cursive;
    font-weight: 500;
    font-style: normal;
}
`;