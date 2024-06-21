// import React from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";

// const UniversalLogin = () => {
//   return (
//     <>
//       <Container>
//         <section className="vh-100">
//           <div className="container h-100 ">
//             <div className="row d-flex justify-content-center align-items-center h-100">
//               <div className="col-lg-12 col-xl-11">
//                 <div
//                   className="card text-black"
//                   style={{ borderRadius: "25px", backgroundColor: "#eee" }}
//                 >
//                   <div className="card-body p-md-5">
//                     <div className="row justify-content-center">
//                       <div className="col-md-10 col-lg-6 col-xl-5 order-2">
//                         <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">
//                           Receptionist Login
//                         </p>

//                         <form className="mx-1 mx-md-4">
//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <label
//                                 className="form-label"
//                                 for="form3Example3c"
//                               >
//                                 Your Email
//                               </label>
//                               <input
//                                 type="email"
//                                 id="form3Example3c"
//                                 className="form-control"
//                               />
//                             </div>
//                           </div>

//                           <div className="d-flex flex-row align-items-center mb-4">
//                             <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
//                             <div className="form-outline flex-fill mb-0">
//                               <label
//                                 className="form-label"
//                                 for="form3Example4c"
//                               >
//                                 Password
//                               </label>
//                               <input
//                                 type="password"
//                                 id="form3Example4c"
//                                 className="form-control"
//                               />
//                             </div>
//                           </div>

//                           <div className="col-5 ms-3">
//                             <p>
//                               <Link to="/receptionist_registration">
//                                 Forgot Password?
//                               </Link>
//                             </p>
//                           </div>

//                           <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
//                             <Link to="/superadmin-dashboard">
//                               <button
//                                 type="button"
//                                 className="btn btn-primary btn-lg"
//                               >
//                                 Login
//                               </button>
//                             </Link>
//                           </div>
//                           <div className="col-sm-12 col-md-10 text-center ms-4">
//                             <p>
//                               Don't have an account?
//                               <Link to="/receptionist_registration">
//                                 {" "}
//                                 Register here
//                               </Link>
//                             </p>
//                           </div>
//                         </form>
//                       </div>
//                       <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1">
//                         <img
//                           src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
//                           className="img-fluid"
//                           alt="Sample"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Container>
//     </>
//   );
// };

// export default UniversalLogin;
// const Container = styled.div``;



import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from '../redux/user/userSlice';
import cogoToast from "cogo-toast";
import { IoEye, IoEyeOffOutline } from "react-icons/io5";


const UniversalLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [verification, setVerification] = useState(false);
  const [localhost, setLocalhost] = useState([]);
  const [braches,setBranches] = useState([]);
  const [selectedBranch,setSelectedBranch] = useState("");
  const [loading,setLoading] = useState(false);

  // const sendOtp = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:7777/api/v1/super-admin/sendOtp",
  //       {
  //         email,
  //       }
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

const getBranches = async ()=>{
  try{
     const response = await axios.get("https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branches")
     console.log(response)
     setBranches(response.data.data)
  }
  catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  getBranches()
},[]);

const handleSelectBranch = (e)=>{
      setSelectedBranch(e.target.value);
}

console.log(selectedBranch)
  const receptionistLogin = async (e) => {
    e.preventDefault();
    if(!selectedBranch){
      cogoToast.error("Please Select Branch");
      return
    }
    setLoading(true)
    
    try {
      const response = await axios.post(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/receptionist-login",
        { 
          email,
          password,
          branch_name: selectedBranch
        }
      );

      console.log(response.data);
      
      // cogoToast.success(response.data.message);
      setLocalhost(response.data);
      if (response.data.success === "true") {
        // sendOtp();
        cogoToast.success("login successful");
        dispatch(setUser(response.data.user));
        navigate("/receptionist-dashboard");
        // setPopupVisible(true);
        setLoading(false)
      } else {
        setLoading(false)
        cogoToast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false)
      console.log("Axios error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If there is a response object and it contains a message property
         cogoToast.error(error.response.data.message);
      } else {
        // If there is no response object or no message property
         cogoToast.error("An error occurred while processing your request.");
      }
    }
  };

  const closeUpdatePopup = () => {
    setPopupVisible(false);
  };

  // const Popup = ({ email, onClose }) => {
  //   const [otp, setOtp] = useState("");
  //   console.log(email);

  //   const verifyOtpAdmin = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:7777/api/v1/super-admin/verifyOtp",
  //         {
  //           email,
  //           otp,
  //         }
  //       );
  //       console.log(response);
  //       console.log(localhost);
  //       const userData = {
  //         name: localhost.user.email,
  //         id: localhost.user.id,
  //       };
  //       // localStorage.setItem("userData", JSON.stringify(userData));
  //       dispatch(setUser(userData));
  //       navigate("/superadmin-dashboard");
  //       setVerification(true);
  //     } catch (error) {
  //       console.log(error);
  //       // cogoToast.error("Wrong OTP!");
  //     }
  //   };

  //   useEffect(() => {
  //     console.log("Popup visible state updated:", popupVisible);
  //   }, [popupVisible]);

  //   return (
  //     <>
  //       <div>
  //         <div className={`popup-container${popupVisible ? " active" : ""}`}>
  //           <div className="popup">
  //             <form onSubmit={verifyOtpAdmin} className="d-flex flex-column">
  //               <div className="d-flex justify-content-evenly flex-column">
  //                 <label htmlFor="otp" className="fw-bold">
  //                   Enter OTP
  //                 </label>
  //                 <input
  //                   type="text"
  //                   placeholder="Enter OTP"
  //                   className="mb-3 rounded p-1"
  //                   name="otp"
  //                   value={otp}
  //                   onChange={(e) => setOtp(e.target.value)}
  //                 />

  //                 <button type="submit" className="btn btn-success mt-2 mb-2">
  //                   Login
  //                 </button>
  //                 <button
  //                   type="button"
  //                   className="btn btn-danger mt-2"
  //                   onClick={onClose}
  //                 >
  //                   Cancel
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
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
                            required
                            
                          >
                             <option value="">Select Branch</option>
                            {braches?.map((branch)=>{
                              return <option value={branch.branch_name} key={branch.branch_id}>{branch.branch_name}</option> 
                            })}
                           
                          </select>
                        </div>
                        <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                         Receptionist Login
                        </p>

                        <form className="mx-1 mx-md-4" onSubmit={receptionistLogin}>
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
                                placeholder="Email"
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
                              <Link to="/password-reset">
                                Forgot Password?
                              </Link>
                            </p>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            {/* <Link to="/superadmin-dashboard"></Link> */}
                            <button
                              type="submit"
                              disabled={loading}
                              className="btn btn-primary btn-lg"
                            >
                             {loading ? "Loading..." : "Login"}
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
        {/* {popupVisible && <Popup email={email} onClose={closeUpdatePopup} />} */}
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
