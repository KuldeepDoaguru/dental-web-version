import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
import { loginUser, setUser } from "../redux/user/userSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoEye, IoEyeOffOutline } from "react-icons/io5";


const LabAttendant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localhost, setLocalhost] = useState([]);
  const [braches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);

   
  const currentUser = useSelector(state => state.auth.user);
  
  const token = currentUser?.token;


  const getBranches = async () => {

    
    try {
      const response = await axios.get(
        "https://dentalgurulab.doaguru.com/api/lab/get-branches",
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }}
      );
      console.log(response);
      setBranches(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getBranches();
  }, []);

  const handleSelectBranch = (e) => {
    setSelectedBranch(e.target.value);
  };

  console.log(selectedBranch);
  const receptionistLogin = async (e) => {


    e.preventDefault();
    try {
      setloading(true)
      const response = await axios.post(
        "https://dentalgurulab.doaguru.com/api/lab/lab-attendant-login",
        {
          email,
          password,
          branch_name: selectedBranch,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }}
      );

      console.log(response.data);

      // cogoToast.success(response.data.message);
      setLocalhost(response.data);
      if (response.data.success === "true") {
        cogoToast.success(response.data.message);
        dispatch(loginUser(response.data.user));
        console.log(loginUser);
        navigate("/dashboard");
      } else {
        cogoToast.error(response.data.message);
      }
    } catch (error) {
      console.log("Axios error:", error);
      // cogoToast.error("Axios error:", error)
      setloading(false)

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If there is a response object and it contains a message property
        cogoToast.info(error.response.data.message);
      } else {
        // If there is no response object or no message property
        cogoToast.error("An error occurred while processing your request.");
      }
    }
  };
   
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
                            name="branch_name"
                            id=""
                            className="p-2 rounded shadow select-style"
                            onChange={handleSelectBranch}
                          >
                            <option value="">Select Branch</option>
                            {braches?.map((branch) => {
                              return (
                                <option
                                  value={branch.branch_name}
                                  key={branch.branch_id}
                                >
                                  {branch.branch_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Laboratory Login
                        </p>

                        <form
                          className="mx-1 mx-md-4"
                          onSubmit={receptionistLogin}
                        >
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
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label
                                className="form-label"
                                for="form3Example4c"
                              >
                                Password
                              </label>
                              <div className="input-container">
                              <input
                                name="password"
                                type={show ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Password"
                                required
                              />
                              <div className="eye-icon">
                                  {show ? (
                                    <IoEye onClick={() => setShow(false)} />
                                  ) : (
                                    <IoEyeOffOutline
                                      onClick={() => setShow(true)}
                                    />
                                  )}
                                </div>
                                </div>
                            </div>
                          </div>
                          <div className="col-5 ms-3">
                            <p>
                              <Link to="/password-reset">
                                Forgot Password?
                              </Link>
                            </p>
                          </div>


                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                              disabled = {loading}
                            >
                             
                              {loading ? "Loding..." : "Login"}
                            </button>
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

export default LabAttendant;
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
  .input-container {
    display: flex;
    align-items: center;
    position: relative;
  }

  .eye-icon {
    position: absolute;
    right: 10px; /* Adjust the value to your preference */
    cursor: pointer;
  }
`;
