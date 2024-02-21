import React from "react";
import styled from "styled-components";
import Header from "../../Header";
import Sider from "../../Sider";
import { useHistory, useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const AddBranch = () => {
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="row d-flex justify-content-between mx-3">
                  <div className="col-12 col-md-12 mt-4">
                    <div className="">
                      <button className="btn btn-success" onClick={goBack}>
                        <IoMdArrowRoundBack /> Back
                      </button>
                      <h2 className="text-center"> Create Branch </h2>
                      <div className="container">
                        <div className="row">
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12"></div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="branch-form rounded shadow">
                              <form action="" className="mt-2 mb-2">
                                <div className="input-div">
                                  <label className="input-group-label">
                                    Branch Name
                                  </label>
                                  <input
                                    type="text"
                                    name="branch-name"
                                    placeholder="write branch name"
                                  />
                                </div>
                                <div className="input-div">
                                  <label>Branch Address</label>
                                  <textarea
                                    name=""
                                    id=""
                                    cols="10"
                                    rows="3"
                                    placeholder="Write Branch Address"
                                  ></textarea>
                                </div>
                                <div className="input-div">
                                  <label>Branch Contact Mobile</label>
                                  <input
                                    type="text"
                                    name="branch-contact"
                                    maxLength={10}
                                    placeholder="write branch contact number"
                                  />
                                </div>
                                <div className="input-div">
                                  <label>Branch Contact Email</label>
                                  <input
                                    type="email"
                                    name="branch-email"
                                    placeholder="write branch contact number"
                                  />
                                </div>
                                <button className="btn btn-success mt-2">
                                  Add Branch
                                </button>
                              </form>
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12"></div>
                        </div>
                      </div>
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

export default AddBranch;
const Container = styled.div`
  .branch-form {
    width: 100%;
    background-color: #004aad;
    padding: 2rem;
  }
  .input-div {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
  label {
    font-weight: bold;
    color: white;
  }
  input {
    border-radius: 10px;
    padding: 0.5rem;
    border: none;
  }
`;
