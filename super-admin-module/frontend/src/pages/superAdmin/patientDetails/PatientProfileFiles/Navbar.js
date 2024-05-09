import React from "react";
import styled from "styled-components";
import Appointment from "./Appointment";
import Treatment from "./Treatment";
import Bill from "./Bill";
import Payment from "./Payment";
import Clinic_Examin from "./Clinic_Examin";
import Prescription from "./Prescription";
import Sms from "./Sms";
import Email from "./Email";
import Timeline from "./Timeline";
import Lab from "./Lab";
import Files from "./Files";
import Overview from "./Overview";

const Navbar = () => {
  return (
    <Wrapper>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            Overview
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="false"
          >
            Appointment
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab1"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane1"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane1"
            aria-selected="false"
          >
            Treatment
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab2"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane2"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane2"
            aria-selected="false"
          >
            Billing
          </button>
        </li>
        {/* <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab3"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane3"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane3"
            aria-selected="false"
          >
            Payment
          </button>
        </li> */}
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab4"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane4"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane4"
            aria-selected="false"
          >
            Clinical Examin
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab1"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane5"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane5"
            aria-selected="false"
          >
            Prescription
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab1"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane6"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane6"
            aria-selected="false"
          >
            Lab
          </button>
        </li>
        {/* <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab1"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane7"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane7"
            aria-selected="false"
          >
            Files
          </button>
        </li> */}
        {/* <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab1"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane8"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane8"
            aria-selected="false"
          >
            Sms
          </button>
        </li> */}
        {/* <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab1"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane9"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane9"
            aria-selected="false"
          >
            Email
          </button>
        </li> */}
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="profile-tab1"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane10"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane10"
            aria-selected="false"
          >
            TimeLine
          </button>
        </li>

        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Overview />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item" id="app">
                <Appointment />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane1"
            role="tabpanel"
            aria-labelledby="profile-tab1"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Treatment />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane2"
            role="tabpanel"
            aria-labelledby="profile-tab2"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Bill />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane3"
            role="tabpanel"
            aria-labelledby="profile-tab3"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Payment />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane4"
            role="tabpanel"
            aria-labelledby="profile-tab4"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Clinic_Examin />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane5"
            role="tabpanel"
            aria-labelledby="profile-tab5"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Prescription />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane6"
            role="tabpanel"
            aria-labelledby="profile-tab6"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Lab />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane7"
            role="tabpanel"
            aria-labelledby="profile-tab7"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Files />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane8"
            role="tabpanel"
            aria-labelledby="profile-tab8"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Sms />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane9"
            role="tabpanel"
            aria-labelledby="profile-tab9"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Email />
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane10"
            role="tabpanel"
            aria-labelledby="profile-tab10"
            tabindex="0"
          >
            <ul className="list-group">
              <li className="list-group-item">
                <Timeline />
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </Wrapper>
  );
};

export default Navbar;
const Wrapper = styled.div`
  #tableresponsive {
    @media screen and (max-width: 768px) {
      width: 73%;
    }
  }
  #tableresponsive1 {
    @media screen and (max-width: 768px) {
      width: 70%;
    }
  }
  #myTab {
    @media screen and (max-width: 768px) {
      width: 90%;
      margin-left: 1.2rem;
    }
  }
  /* #app {
    width: 75rem;
  } */

  .nav-link {
    background-color: #22a6b3;
    color: #000;
    margin-left: 1px;
  }
`;
