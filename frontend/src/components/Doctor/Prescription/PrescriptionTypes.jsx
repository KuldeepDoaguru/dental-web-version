import React from 'react';
import styled from "styled-components";

const PrescriptionTypes = ({cc, mh, dh, oe, adv, rx}) => {
    return (
        <>
            <Wrapper>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
                            <div className="">
                                <div className="d-flex">
                                    <label className='lable' title='Chief Complaint'>C/C</label>
                                    <p className='mx-4 drRx'><span>-</span>{cc}</p>
                                </div>
                                <div className="d-flex">
                                    <label className='lable' title='Medical History'>M/H</label>
                                    <p className='mx-4 drRx'><span>-</span>{mh}</p>
                                </div>
                                <div className="d-flex">
                                    <label className='lable' title='Dental History'>D/H</label>
                                    <p className='mx-4 drRx'><span>-</span>{dh}</p>
                                </div>
                                <div className="d-flex">
                                    <label className='lable' title='On Examination'>O/E</label>
                                    <p className='mx-4 drRx'><span>-</span>{oe}</p>
                                </div>
                                <div className="d-flex">
                                    <label className='lable' title='Advice'>Adv</label>
                                    <p className='mx-4 drRx'><span>-</span>{adv}</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <label className='lable' title='Medical Prescription'>Rx</label>
                                    <p className='mx-4 drRx'><span>-</span>{rx}</p>
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
    font-size: 1.2rem;
}
.drRx{
    font-size: 1rem;
    font-family: "Kalam", cursive;
    font-weight: 500;
    font-style: normal;
}
`;