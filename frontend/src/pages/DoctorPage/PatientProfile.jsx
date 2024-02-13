import React from "react";
import styled from "styled-components";
import HeadBar from "../../components/Doctor/HeadBar";
import Sider from "../../components/Doctor/SideBar";
import Navbar from "../../components/Doctor/PatientProfile/Navbar";

function PatientProfile() {
  return (
    <Wrapper>
      <HeadBar />

      <div className="row flex-nowrap">
        <div className="col-lg-1 col-1 " id="sider">
          <Sider />
        </div>
        <div className="col-lg-11">
          <div className="row">
            <div className="col-lg-2 mx-4">
              <h1 className="mt-3">Riya Joshi</h1>

              {/* <img
              src={doctor}
              alt=""
              height="160rem"
              className="  rounded-5 mx-4 "
            /> */}

              <div className="d-flex gap-5 mt-5">
                <ul className=" list-unstyled">
                  <li>
                    <p>Change</p>
                  </li>
                  <li>
                    {" "}
                    <div className="hddd bg-light">
                      <h6>Basic Info</h6>
                    </div>
                  </li>
                  <li>Uid :</li>
                  <li>Gender :</li>
                  <li>Email :</li>
                  <li>Address:</li>
                </ul>
                <ul className=" list-unstyled">
                  <li>
                    {" "}
                    <p>Remove</p>
                  </li>
                  <li>
                    {" "}
                    <a href="">Edit</a>
                  </li>
                  <li style={{ marginTop: "15px" }}>p3224</li>
                  <li> Female</li>
                  <li>riya@gmail.com</li>
                  <li>Ghanta Ghar Jabalpur</li>
                </ul>
              </div>
              <div className="d-flex gap-5 mt-2">
                <ul className=" list-unstyled">
                  <li>
                    {" "}
                    <div className="hddd bg-light">
                      <h6>Vital Stats</h6>
                    </div>
                  </li>
                  <li>Blood Group:</li>
                  <li>Height :</li>
                  <li>Weight:</li>
                  <li>BMI :</li>
                  <li>BP :</li>
                  <li>Pulse :</li>
                  <li> Respiration : </li>
                  <li>Allergy : </li>
                  <li>Diet :</li>
                </ul>
                <ul className=" list-unstyled">
                  <li>
                    {" "}
                    <a href="">Edit</a>
                  </li>
                  <li>O Positive</li>
                  <li> 169 Cm</li>
                  <li>54 KG</li>
                  <li>18.11</li>
                  <li>180/88</li>
                  <li>BPM</li>
                  <li>22 BPM</li>
                  <li>Dust</li>
                  <li>NA</li>
                </ul>
              </div>
              <ul className=" list-unstyled">
                <li>
                  {" "}
                  <div className="hddd bg-light">
                    <h6>Active Medication</h6>
                  </div>
                  <li>Aceteminophen</li>
                </li>
              </ul>
            </div>
            <div className="col-lg-9 col-sm-12">
              <Navbar />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default PatientProfile;
const Wrapper = styled.div`
  .list-unstyled {
    line-height: 1.9rem;
  }
  #sider {
    @media screen and (max-width: 768px) {
      height: 118rem;
    }
  }
`;
