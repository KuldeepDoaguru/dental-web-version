import React from "react";
import styled from "styled-components";
import SiderAdmin from "../../../pages/admin/SiderAdmin";
import HeaderAdmin from "../../../pages/admin/HeaderAdmin";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const AdminComplaintPage = () => {
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <button className="btn btn-success shadow" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <h3 className="text-center">Complaint Details</h3>
                  <div className="container-fluid mt-3">
                    <div className="container box-com shadow">
                      <h2>Employee Name : Shubham Singh</h2>
                      <p>
                        <strong>Complaint : </strong>I am having so many bugs in
                        my code I am having so many bugs in my code I am having
                        so many bugs in my code I am having so many bugs in my
                        code I am having so many bugs in my code I am having so
                        many bugs in my code I am having so many bugs in my code
                        I am having so many bugs in my code I am having so many
                        bugs in my code I am having so many bugs in my code I am
                        having so many bugs in my code I am having so many bugs
                        in my code I am having so many bugs in my code I am
                        having so many bugs in my code I am having so many bugs
                        in my code I am having so many bugs in my code I am
                        having so many bugs in my code I am having so many bugs
                        in my code I am having so many bugs in my code I am
                        having so many bugs in my code I am having so many bugs
                        in my code I am having so many bugs in my code I am
                        having so many bugs in my code I am having so many bugs
                        in my code I am having so many bugs in
                      </p>
                      <h4>Received ON : 12/12/2024 12:00PM</h4>
                      <h4>Status : Solved</h4>
                      <h4>Pending Since : 9 Days</h4>
                      <button className="btn btn-warning fw-bold fs-4">
                        update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminComplaintPage;
const Container = styled.div`
  .box-com {
    background-color: #1abc9c;
    padding: 3rem;
    border-radius: 0.5rem;
  }

  p {
    font-size: 1.5rem;
  }
`;
