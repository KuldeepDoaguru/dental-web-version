import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const OpdBills = () => {
  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <Container>
        <Header />

        <div className="container-fluid">
          <div className="row Button mt-2">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <IoArrowBackSharp className="fs-1 text-black" onClick={goBack} />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="row d-flex justify-content-between mt-3">
                <div className="ms-4">
                  <div className="mt-3">
                    <h5>Branch : Madan Mahal</h5>
                  </div>
                  <form className="d-flex ms-auto my-sm">
                    <h6>Addresh : </h6>
                    <h6 className="ms-2">
                      128,Near Gwarighat Jabalpur M.p (482001)
                    </h6>
                  </form>

                  <form className="d-flex ms-auto my-sm mt-1">
                    <h5>Email id : </h5>
                    <h5 className="ms-2">DentalGuru@Gmail.com</h5>
                  </form>

                  <form className="d-flex ms-auto my-sm mt-1">
                    <h4>Contact Number : </h4>
                    <h4 className="ms-2">+91-7000000058 </h4>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <hr
            style={{
              color: "Grey",
              height: "2px",
            }}
          />

          <div className="container mt-4">
            <div class="table-responsive rounded">
              <table class="table table-bordered rounded shadow">
                <tbody>
                  <tr className="table-row">
                    <td className="table-small" style={{ width: "20%" }}>
                      Patient Name :
                    </td>
                    <td className="table-small" style={{ width: "20%" }}>
                      Date :
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="table-row">
                    <td className="table-small" style={{ width: "20%" }}>
                      Patient Address:
                    </td>
                    <td className="table-small" style={{ width: "10%" }}>
                      Age/Sex :
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="table-row">
                    <td className="table-small" style={{ width: "20%" }}>
                      Phone Number:
                    </td>
                    <td className="table-small" style={{ width: "10%" }}>
                      Consaltant :
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="table-row">
                    <td className="table-small" style={{ width: "20%" }}>
                      Email id:
                    </td>
                    <td className="table-small" style={{ width: "10%" }}>
                      OPD Fee : 200
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-5 mt-3">
          <div className="table-small">
            <button className="btn px-5 py-3" onClick={() => window.print()}>
              Print
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OpdBills;
const Container = styled.div`
  @media print {
    .Button {
      display: none; /* Hide the button when printing */
    }
  }
  .table-small {
    button {
      background: #201658;
      color: white;
    }
  }
`;
