import React from 'react';
import styled from "styled-components";
import { Helmet } from "react-helmet";

const PrescriptionType = ({ patientName, patientAgeSex, dateOfVisit }) => {
    return (
        <>
            <Wrapper>
                <Helmet>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=La+Belle+Aurore&family=Poppins&family=Roboto+Serif:opsz,wght@8..144,600;8..144,700;8..144,900&family=RocknRoll+One&family=Sofia&family=Vibur&display=swap" rel="stylesheet" />
                </Helmet>
                <div className="constainer-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="d-flex justify-content-center col-lg-4">
                                <label className='lable'>Patient Name: </label>
                                &nbsp;
                                <p className='drRx m-0'><span className='spans'>{patientName}</span></p>
                                </div>
                                <div className="d-flex justify-content-center  col-4">
                                <label className='lable'>Age/Sex: </label>
                                &nbsp;
                                <p className='drRx m-0'><span className='spans'>{patientAgeSex}</span></p>
                                </div>
                                <div className="d-flex justify-content-center col-4">
                                <label className='lable'>Date: </label>
                                &nbsp;
                                <p className='drRx m-0'><span className='spans'>{dateOfVisit}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default PrescriptionType;
const Wrapper = styled.div`
.lable{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
}
.spans{
    border-bottom: 2px dotted black; 
}
.drRx{
    font-size: 1rem;
    font-family: "Kalam", cursive;
    font-weight: 600;
    font-style: normal;
}
`;