import React from 'react';
import styled from "styled-components";

const PrescDoctorDetails = () => {
  return (
    <>
    <Wrapper>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="text-start">
                            <h4>Dr. Abhinav Pandey</h4>
                            <p>(BDS, Dental Surgeon)</p>
                        </div>
                        <div className="text-start">
                            <h4>Mobile Number</h4>
                            <p className='m-0'>8989870070</p>
                            <p className='m-0'>abhi1940@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Wrapper>
    </>
  )
}

export default PrescDoctorDetails;
const Wrapper = styled.div`

`;