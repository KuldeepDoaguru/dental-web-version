import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBranch } from "../redux/slices/BranchSlicer";
import { setUser } from "../redux/slices/UserSlicer";

const UniversalLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`branch Name: ${branch?.name}`);
  const [branchList, setBranchList] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(selectedBranch);

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

  const branchData = {
    branch:
      selectedBranch ||
      (branchList?.length > 0 ? branchList[0].branch_name : ""),
  };
  localStorage.setItem("branchName", JSON.stringify(branchData));
  dispatch(setBranch({ branch: selectedBranch }));

  const accountantLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/api/v1/accountant/accountantLoginUser",
        {
          email,
          password,
          branch_name: selectedBranch,
        }
      );
      console.log(response.data.user);
      const userData = {
        name: response.data.user.email,
        id: response.data.user.employee_ID,
        branch: response.data.user.branch,
        employee_name: response.data.user.employee_name,
        employee_mobile: response.data.user.employee_mobile,
        employee_designation: response.data.user.employee_designation,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(setUser(userData));
      cogoToast.success("Login Successful");
      navigate("/accountant-dashboard");
    } catch (error) {
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
        <section className="">
          <div className="container box-cont">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="">
                <div className="text-black cardstyle shadow">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-6 col-lg-6 col-xl-6">
                        <div className="d-flex justify-content-center align-items-center">
                          <img
                            src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708075638/dental%20guru/Login-page_1_cwadmt.png"
                            className="img-fluid"
                            alt="Sample"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-6">
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
                          Accountant Login
                        </p>

                        <form
                          className="mx-1 mx-md-4"
                          onSubmit={accountantLogin}
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
                                name="password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="password"
                              />
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
                            >
                              Login
                            </button>
                            {/* <Link to="/accountant-dashboard">
                              <button
                                type="button"
                                className="btn btn-primary btn-lg"
                              >
                                Login
                              </button>
                            </Link> */}
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

  .box-cont {
    margin-top: 2rem;
  }
`;
