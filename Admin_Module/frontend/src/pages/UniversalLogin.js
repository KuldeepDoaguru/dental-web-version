import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoEye, IoEyeOffOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { setBranch } from "../redux/slices/BranchSlicer";
import { setUser } from "../redux/slices/UserSlicer";
import cogoToast from "cogo-toast";

const UniversalLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  // console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  // console.log("User State:", user);
  // const branch = useSelector((state) => state.branch);
  // console.log(`User Name: ${branch.name}`);
  const [branchList, setBranchList] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);

  // const HandleChange = (event) => {
  //   setBranchList(event.target.value);
  // };

  const getBranchList = async () => {
    try {
      const response = await axios.get(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/getBranch"
      );
      console.log(response.data);
      setBranchList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(branchList);
  // const branchData = {
  //   name:
  //     selectedBranch ||
  //     (branchList?.length > 0 ? branchList[0].branch_name : ""),
  // };
  // localStorage.setItem("branchName", JSON.stringify(branchData));
  // dispatch(setBranch(branchData));

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      const response = await axios.post(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/adminLoginUser",
        {
          email,
          password,
          branch_name: selectedBranch,
        }
      );
      // console.log(response.data.user.employee_ID);
      // const userData = {
      //   name: response.data.user.email,
      //   id: response.data.user.employee_ID,
      //   branch: response.data.user.branch,
      //   employee_name: response.data.user.employee_name,
      //   employee_mobile: response.data.user.employee_mobile,
      //   employee_designation: response.data.user.employee_designation,
      // };
      // localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(setUser(response.data.user));
      cogoToast.success("Login Successful");
      navigate("/admin-dashboard");
    } catch (error) {
      setloading(false)
      console.log("Axios error:", error);
      cogoToast.error(error.response.data.message);
    }
  };

  console.log(branchList);
  useEffect(() => {
    getBranchList();
  }, []);

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
                            name="branch"
                            id="branch"
                            className="mx-2 p-2 rounded shadow select-style"
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                          >
                            <option value="" className="fw-bold">
                              select-branch
                            </option>
                            {branchList?.map((branch) => (
                              <option
                                key={branch.branch_name}
                                value={branch.branch_name}
                              >
                                {branch.branch_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Admin Login
                        </p>

                        <form className="mx-1 mx-md-4" onSubmit={adminLogin}>
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
                              <label className="form-label" htmlFor="password">
                                Password
                              </label>
                              <div className="input-container">
                                <input
                                  name="password"
                                  type={show ? "text" : "password"}
                                  id="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="form-control relative"
                                  placeholder="password"
                                  required
                                />
                                {/* <div className="eye-icon">
                                  {show ? (
                                    <IoEye onClick={() => setShow(false)} />
                                  ) : (
                                    <IoEyeOffOutline
                                      onClick={() => setShow(true)}
                                    />
                                  )}
                                </div> */}
                              </div>
                            </div>
                          </div>

                          <div className="col-5 ms-3">
                            <p>
                              <Link to="/password-reset">Forgot Password?</Link>
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
                          {/* <div className="col-sm-12 col-md-10 text-center ms-4">
                            <p>
                              Don't have an account?
                              <Link to="/receptionist_registration">
                                {" "}
                                Register here
                              </Link>
                            </p>
                          </div> */}
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
