import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";


function Registration() {
  return (
   <>
   <Wrapper>
   <section className="vh-100" >
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius:"25px" , backgroundColor: "#eee"}} >
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2">

                <p className="text-center h4 fw-bold  mb-4 mx-1 mx-md-4 mt-3">Receptionist Registration</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example1c">Your Name</label>
                      <input type="text" id="form3Example1c" className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example3c">Your Email</label>
                      <input type="email" id="form3Example3c" className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-3">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <label className="form-label" for="form3Example4c">Password</label>
                      <input type="password" id="form3Example4c" className="form-control" />
                    </div>
                  </div>

            
                  
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-3">
                    <button type="button" className="btn btn-primary btn-lg">Register</button>
                  </div>
                  <div className='col-sm-12 col-md-10 text-center ms-4'><p>Already have an account? <Link to="/receptionist_login"> Login here </Link></p></div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</Wrapper>
   
   </>
  )
}

export default Registration

const Wrapper = styled.div`


`;