import React from 'react';
import styled from "styled-components";
import PrescpHead from "../Assest/Rx prescription/dentistry-medicine-dental-clinic-thin-line-banner-vector.jpg";

const PrescriptionHead = () => {
  return (
    <>
    <Wrapper>
        <div className="container-fluid m-0 p-0">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <img src={PrescpHead} alt="Header Prescription" className='img-fluid' />
                </div>
            </div>
        </div>
    </Wrapper>
    </>
  )
}

export default PrescriptionHead;
const Wrapper = styled.div`
img{
    width: 100%;
    height: 16rem;
    @media (min-width: 850px) and (max-width: 1024px){
        height: 12rem;
    }
}
`;