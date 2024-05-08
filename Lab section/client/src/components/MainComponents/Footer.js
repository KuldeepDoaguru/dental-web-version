import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <nav className="footbar footer print-visible">
          <div className="container-fluid">
            <div className="row">
              <h4 className="text-center mt-3 fw-semibold">Consultants</h4>
              <div className="col-3 mt-2">
                <p className="text-center fw-semibold">Dr.Harjeet Kaur</p>
                <p className="text-center fw-semibold"> MBBS , M.D.</p>
              </div>
              <div className="col-3 mt-2">
                <p className="text-center fw-semibold">Dr.Monika Kapoor</p>
                <p className="text-center fw-semibold"> MBBS , DPB</p>
              </div>
              <div className="col-3 mt-2">
                <p className="text-center fw-semibold">Dr.Bharat Punase</p>
                <p className="text-center fw-semibold"> MBBS , DCP</p>
              </div>
              <div className="col-3 mt-2">
                <p className="text-center fw-semibold">Dr.Nimisha Paul</p>
                <p className="text-center fw-semibold"> Ph.D.</p>
              </div>
            </div>
          </div>
        </nav>
      </Wrapper>
    </>
  );
};

export default Footer;

const Wrapper = styled.div`
  .footbar {
    background-color: #213555;
    box-shadow: 1px 1px 6px;
  }
  @media print {
    .fw-semibold {
      font-weight: normal !important; /* Override the font-weight property */
    }
  }

  .footer {
    display: none; /* Hide the footer by default */
  }

  @media print {
    .print-visible {
      display: block !important; /* Show the footer when printing */
    }
  }
`;
