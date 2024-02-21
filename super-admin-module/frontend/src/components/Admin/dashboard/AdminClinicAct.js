import React, { useState } from "react";
import styled from "styled-components";
import { FcAlarmClock } from "react-icons/fc";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaDotCircle } from "react-icons/fa";

const AdminClinicAct = () => {
  const [showCalender, setShowCalender] = useState(false);

  const handleCalender = () => {
    setShowCalender(!showCalender);
  };
  return (
    <>
      <Container>
        <div className="container-fluid">
          <div className="clinic-act-heading">
            <div>
              <h5>
                <FcAlarmClock /> Clinic Activity for 09/02/2024
              </h5>
            </div>
            <div>
              <h5>
                09/02/2024 <IoIosArrowDropdownCircle onClick={handleCalender} />
              </h5>
              {showCalender ? (
                <>
                  <input type="date" />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="container-fluid mt-2">
          <ul class="nav nav-pills mb-3 ms-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-python-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-python"
                type="button"
                role="tab"
                aria-controls="pills-python"
                aria-selected="true"
              >
                All
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-java-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-java"
                type="button"
                role="tab"
                aria-controls="pills-java"
                aria-selected="false"
              >
                Appointment
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-treatment-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-treatment"
                type="button"
                role="tab"
                aria-controls="pills-treatment"
                aria-selected="false"
              >
                Treatment
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-billing-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-billing"
                type="button"
                role="tab"
                aria-controls="pills-billing"
                aria-selected="false"
              >
                Billing
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-Patient-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-Patient"
                type="button"
                role="tab"
                aria-controls="pills-Patient"
                aria-selected="false"
              >
                Patient
              </button>
            </li>
          </ul>

          {/* tab button end */}

          <div
            className="tab-content border ms-3 me-3 my-3 mb-5"
            id="pills-tabContent"
          >
            <div
              className="container-fluid pe-5 ps-5 my-3 mb-3 py-4 pb-4 tab-pane fade show active"
              id="pills-python"
              role="tabpanel"
              aria-labelledby="pills-python-tab"
            >
              <ul>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade"
              id="pills-java"
              role="tabpanel"
              aria-labelledby="pills-java-tab"
            >
              <ul>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div
              className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade"
              id="pills-treatment"
              role="tabpanel"
              aria-labelledby="pills-treatment-tab"
            >
              <ul>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div
              className="container-fluid pe-5 ps-5 mb-3 py-4 pb-4 tab-pane fade"
              id="pills-billing"
              role="tabpanel"
              aria-labelledby="pills-billing-tab"
            >
              <ul>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div
              className="container-fluid pe-5 mb-3 py-4 pb-4 tab-pane fade"
              id="pills-Patient"
              role="tabpanel"
              aria-labelledby="pills-Patient-tab"
            >
              <ul>
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4>
                        <FaDotCircle className="mx-1" /> Welcome to Dental Guru!
                      </h4>
                    </div>
                    <div>
                      <p>10 hours ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminClinicAct;
const Container = styled.div`
  .nav-link {
    color: #1abc9c;
    font-weight: bold;
  }

  .nav-pills .nav-link.active {
    background-color: #1abc9c;
  }

  ul {
    li {
      list-style-type: none;
    }
  }

  .tab-content {
    height: 32rem;
    overflow: auto;
  }
`;
