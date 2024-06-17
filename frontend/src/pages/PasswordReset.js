import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(true);
  const [showVerify, setShowVerify] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/sendOtp",
        {
          email,
        }
      );
      console.log(response);
      cogoToast.success("OTP sent to your email");
      setLoading(false);
      setShowOtp(false);
      setShowVerify(true);
      setShowReset(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      cogoToast.error(error?.response?.data?.message
        || "Something went wrong");
    }
  };

  const verifyOtpAdmin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/verifyOtp",
        {
          email,
          otp,
        }
      );
      console.log(response);
      setLoading(false);
      setShowOtp(false);
      setShowVerify(false);
      setShowReset(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
      cogoToast.error("Wrong OTP!");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/resetPassword",
        {
          email,
          password: newPassword,
        }
      );
      setLoading(false);
      console.log(response);
      cogoToast.success("password update successfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      cogoToast.error(error?.response?.data?.message || "Something went wrong")
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <div className="text-black cardstyle shadow">
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 col-12 order-2">
                <div className="d-flex justify-content-end"></div>
                <p className="text-center h4 fw-bold mb-5 mx-1 mt-4">
                  Password Reset
                </p>
                {showOtp && (
                  <form className="mx-1 sendOtp" onSubmit={sendOtp}>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" for="form3Example3c">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="email"
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                       {loading ? "Loading..." : "Send OTP"} 
                      </button>
                    </div>
                  </form>
                )}

                {/* **************************************** */}
                {showVerify && (
                  <form className="mx-1 verify-otp" onSubmit={verifyOtpAdmin}>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" for="form3Example3c">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="email"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      {" "}
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" for="form3Example3c">
                          OTP
                        </label>
                        <input
                          type="text"
                          name="otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="form-control"
                          placeholder="otp"
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                       {loading ? "Loading..." : "Verify OTP" } 
                      </button>
                    </div>
                  </form>
                )}

                {/* ************************************************ */}
                {showReset && (
                  <form className="mx-1 reset" onSubmit={changePassword}>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" for="form3Example3c">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="form-control"
                          placeholder="password"
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                        {loading ? "Loading..." : "Reset Password"} 
                      </button>
                    </div>
                  </form>
                )}
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1">
                <img
                  src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708075638/dental%20guru/Login-page_1_cwadmt.png"
                  className="img-fluid img-fr"
                  alt="Sample"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PasswordReset;
const Container = styled.div`
  .cardstyle {
    border-radius: 25px;
    height: 100%;
    width: 80%;
    margin-top: 2rem;
    margin-bottom: 2rem;
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

  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
    z-index: 1;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .img-fr {
    height: 100%;
    width: auto;
  }
`;