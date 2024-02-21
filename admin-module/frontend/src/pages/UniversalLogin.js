import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UniversalLogin = () => {
  const [role, setRole] = useState("select-role");

  const HandleChange = (event) => {
    setRole(event.target.value);
  };

  console.log(role);

  return (
    <>
      <Container>
        <section className="vh-100">
          <div className="container h-100 ">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="text-black cardstyle shadow">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2">
                        <div className="d-flex justify-content-end">
                          <select
                            name="role"
                            id=""
                            className="p-2 rounded shadow select-style"
                            value={role}
                            onChange={HandleChange}
                          >
                            <option value="select-role">role</option>
                            <option value="super-admin">Super Admin</option>
                            <option value="admin">Admin</option>
                            <option value="receptionist">Receptionist</option>
                            <option value="doctor">Doctor</option>
                            <option value="accountant">Accountant</option>
                          </select>
                        </div>
                        <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Login
                        </p>

                        <form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example3c"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                placeholder="email"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example4c"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="form3Example4c"
                                className="form-control"
                                placeholder="password"
                              />
                            </div>
                          </div>

                          <div className="col-5 ms-3">
                            <p>
                              <Link to="/receptionist_registration">
                                Forgot Password?
                              </Link>
                            </p>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <Link
                              to={
                                (role === "admin" && "/admin-dashboard") ||
                                (role === "super-admin" &&
                                  "/superadmin-dashboard") ||
                                (role === "receptionist" && "*") ||
                                (role === "doctor" && "*") ||
                                (role === "accountant" && "*")
                              }
                            >
                              <button
                                type="button"
                                className="btn btn-primary btn-lg"
                              >
                                Login
                              </button>
                            </Link>
                          </div>
                          <div className="col-sm-12 col-md-10 text-center ms-4">
                            <p>
                              Don't have an account?
                              <Link to="/receptionist_registration">
                                {" "}
                                Register here
                              </Link>
                            </p>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1">
                        <img
                          src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708075638/dental%20guru/Login-page_1_cwadmt.png"
                          className="img-fluid"
                          alt="Sample"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default UniversalLogin;
const Container = styled.div`
  .cardstyle {
    border-radius: 25px;
    background-color: #d7f3f0 !important;
  }

  a {
    text-decoration: none;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
