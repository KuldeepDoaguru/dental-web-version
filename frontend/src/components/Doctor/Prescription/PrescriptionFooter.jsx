import React from 'react';
import styled from "styled-components";

const PrescriptionFooter = () => {
  return (
    <>
    <Wrapper>
        <div className="container-fluid m-0 p-0">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className='prescpFooter text-center'>
                        <h5>Wright Town, Jabalpur, Madhya Pradesh 482002</h5>
                        <h5>Timing: 8am to 1pm & 4pm to 10pm</h5>
                    </div>
                </div>
            </div>
        </div>
    </Wrapper>
    </>
  )
}

export default PrescriptionFooter;
const Wrapper = styled.div`
.prescpFooter{
    padding: 0.7rem;
    background-color: #454d7c;
}
h5{
    color: white;
}
`;