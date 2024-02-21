import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";

function FinancialReports() {
  return (
    <>
      <Container>
        <div className="container-fluid">
          <div className="row">
            <div className="col-1"></div>

            <div className="col-11 mt-3">
              <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#"></a>
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>

                  <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul class="navbar-nav me-auto ">
                      <li class="nav-items">
                        <form class="d-flex" role="search">
                          <input
                            class="form-control me-2 rounded-pill"
                            type="text"
                            placeholder="Enter Patient Name"
                            aria-label="Search"
                          />
                        </form>
                      </li>

                      <li class="nav-item ms-2">
                        <select
                          className="form-control rounded-pill"

                          // className="form-select select_style"
                          // aria-label="Default select example"
                          // name="dept"
                          // value={data.dept}
                          // onChange={handleInputChange}
                          // required
                        >
                          {" "}
                          <IoMdArrowDropdownCircle />
                          <option value="">Select Doctor</option>
                          <option value="Cardiac Care">
                            Dr.Mahesh Kuldeep
                          </option>
                          <option value="Preventive Medicine">
                            Dr Dev Tiwari
                          </option>
                          <option value="Diabetes Care">Dr Umer Qureshi</option>
                          <option value="Critical Care">Dr.Mohit</option>
                          <option value="Orthopedic Care">Dr.Sonam</option>
                          <option value="Neurological Care">
                            Dr.Sadab Ali
                          </option>
                          <option value="Gynecologist Care">
                            Dr.Mohan Chacha
                          </option>
                        </select>
                      </li>

                      <li class="nav-item ms-3">
                        <select
                          className="form-control rounded-pill"

                          // className="form-select select_style"
                          // aria-label="Default select example"
                          // name="dept"
                          // value={data.dept}
                          // onChange={handleInputChange}
                          // required
                        >
                          {" "}
                          <IoMdArrowDropdownCircle />
                          <option value="">Dua Date</option>
                          <option value="Cardiac Care">
                            Dr.Mahesh Kuldeep
                          </option>
                          <option value="Preventive Medicine">
                            Dr Dev Tiwari
                          </option>
                          <option value="Diabetes Care">Dr Umer Qureshi</option>
                          <option value="Critical Care">Dr.Mohit</option>
                          <option value="Orthopedic Care">Dr.Sonam</option>
                          <option value="Neurological Care">
                            Dr.Sadab Ali
                          </option>
                          <option value="Gynecologist Care">
                            Dr.Mohan Chacha
                          </option>
                        </select>
                      </li>

                      <li class="nav-item ms-3">
                        <select
                          className="form-control rounded-pill"

                          // className="form-select select_style"
                          // aria-label="Default select example"
                          // name="dept"
                          // value={data.dept}
                          // onChange={handleInputChange}
                          // required
                        >
                          {" "}
                          <IoMdArrowDropdownCircle />
                          <option value="">Status</option>
                          <option value="Cardiac Care">
                            Dr.Mahesh Kuldeep
                          </option>
                          <option value="Preventive Medicine">
                            Dr Dev Tiwari
                          </option>
                          <option value="Diabetes Care">Dr Umer Qureshi</option>
                          <option value="Critical Care">Dr.Mohit</option>
                          <option value="Orthopedic Care">Dr.Sonam</option>
                          <option value="Neurological Care">
                            Dr.Sadab Ali
                          </option>
                          <option value="Gynecologist Care">
                            Dr.Mohan Chacha
                          </option>
                        </select>
                      </li>
                    </ul>

                    {/* <div className="List me-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Newest to Oldest
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Oldest to Newest
                        </label>
                      </div>
                    </div> */}

                    <form class="d-flex me-4 nav-items" role="search">
                      <button class="btn btn-outline-light mb-1" type="Search">
                        <FaSearch />
                      </button>
                    </form>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default FinancialReports;

const Container = styled.div`
  nav {
    background-color: #004aad;
  }

  .nav-item {
    @media only screen and (min-width: 279px) and (max-width: 1024px) {
      margin-top: 1.5rem;
    }
  }
  .nav-items {
    @media only screen and (min-width: 279px) and (max-width: 1024px) {
      margin-top: 1.5rem;
      margin-left: 1rem;
    }
  }
`;
