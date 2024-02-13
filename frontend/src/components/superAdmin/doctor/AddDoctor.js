import React from "react";
import styled from "styled-components";
import Header from "../../Header";
import Sider from "../../Sider";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const AddDoctor = () => {
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
                <div className="container mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <h6>Select Branch : </h6>
                      </div>
                      <div>
                        <select name="branch" id="branch" className="mx-2">
                          <option value="Madan Mahal">Madan Mahal</option>
                          <option value="Madan Mahal">Ranjhi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <h3 className="text-center">Register Doctor</h3>
                  <div className="container mt-3">
                    <form action="">
                      <div className="d-flex justify-content-center">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Branch Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="branch name"
                          />
                        </div>
                        <div class="mb-3 mx-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Doctor Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="doctor name"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Mobile
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="mobile"
                          />
                        </div>
                        <div class="mb-3 mx-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="email"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Gender
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Gender"
                          />
                        </div>
                        <div class="mb-3 mx-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <div class="mb-3 me-5">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Qualification
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Qualification"
                          />
                        </div>
                        <div class="mb-3 mx-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            class="form-control"
                            placeholder="experience"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Login Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            placeholder="password"
                          />
                        </div>
                        <div class="mb-3 mx-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            placeholder="confirm password"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-info" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
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

export default AddDoctor;
const Container = styled.div``;
