import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainPage = () => {
  return (
    <>
      <Container>
        <div className="container pt-2">
          <div className="container-fluid ">
            <div className="row mb-3">
              <div className="col-1"></div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                <div class="card">
                  <img
                    src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708511361/dental%20guru/super_m0vslv.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h3 class="card-title fw-bold text-center">
                      Login as Super Admin
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                {" "}
                <div class="card">
                  <img
                    src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708511575/dental%20guru/admin_1_mveanw.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h3 class="card-title fw-bold text-center">
                      Login as Admin
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                {" "}
                <div class="card">
                  <img
                    src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708511754/dental%20guru/doctor_odybyz.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h3 class="card-title fw-bold text-center">
                      Login as Doctor
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                {" "}
                <div class="card">
                  <img
                    src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708511970/dental%20guru/accountant_yhegiu.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title fw-bold text-center">
                      Login as Accountant
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                {" "}
                <div class="card">
                  <img
                    src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708513346/dental%20guru/receptionist_1_elhqg4.png"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h3 class="card-title fw-bold text-center">
                      Login as Receptionist
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="head-sec mt-2 pb-5">
            <img
              src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1708075638/dental%20guru/Login-page_1_cwadmt.png"
              alt=""
              srcset=""
              className="heroImg"
            />
          </div>
          {/* <Link to="/registerwith-super-admin">
            <h5 className="text-center fw-bold mt-2 mb-2">
              Hospital Registeration with Super Admin
            </h5>
          </Link> */}
        </div>
      </Container>
    </>
  );
};

export default MainPage;
const Container = styled.div`
  background: linear-gradient(to top, #dcf5f0, #92c3f0);
  .head-sec {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .heroImg {
    height: 30rem;
    width: auto;
    border-radius: 1rem;
    margin-top: 1rem;
    box-shadow: 0px 0px 15px #59a0d5;
  }

  .card {
    background: linear-gradient(to top, #dcf5f0, #92c3f0);
    border: none;
    box-shadow: 0px 0px 15px #59a0d5;
    border-radius: 1rem;
  }
`;
