import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoArrowBackSharp } from "react-icons/io5";
import { SiMoneygram } from "react-icons/si";
import { MdOutlineNextWeek } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";

import { GiFrontTeeth } from "react-icons/gi";
import { useSelector } from "react-redux";
const ReportCardPage = () => {
  const [testCounts, setTestCounts] = useState({
    oral: 0,
    pathology: 0,
    radiology: 0,
    doneTest: 0,
    pendingTest: 0
  });

  const currentUser = useSelector(state => state.auth.user);
  
  const token = currentUser?.token;


  useEffect(() => {
    const fetchTestCounts = async () => {
      try {
        const response = await axios.get("https://dentalgurulab.doaguru.com/api/lab/get-patient-details",{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        });
        if (response.status === 200) {
          const data = response.data.result;
          // Filter data for oral, pathology, and radiology tests
          const oralTests = data.filter(item => item.lab_name === "oral");
          const pathologyTests = data.filter(item => item.lab_name === "pathology");
          const radiologyTests = data.filter(item => item.lab_name === "radiology");
          // Count done and pending tests
          const doneTests = data.filter(item => item.test_status === "done").length;
          const pendingTests = data.filter(item => item.test_status === "pending").length;
          // Update state with test counts
          setTestCounts({
            oral: oralTests.length,
            pathology: pathologyTests.length,
            radiology: radiologyTests.length,
            doneTest: doneTests,
            pendingTest: pendingTests
          });
        } else {
          console.error("Failed to fetch test counts");
        }
      } catch (error) {
        console.error("Error fetching test counts:", error);
      }
    };

    fetchTestCounts();
  }, []);

  return (
    <Wrapper>
    

      <div className=" d-flex justify-content-around mt-5">
                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <Link to="/OralTest" style={{ textDecoration: "none" }}>
                        <div className="card-body d-flex justify-content-center flex-column mb-3">
                          <div className="text-light fs-1">
                            <GiFrontTeeth />
                          </div>
                          <div className="cardtext">
                            <h5 className="card-title text-light">
                              Oral Test
                            </h5>
                            <p className="card-text">{testCounts.oral}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <Link to="/pathologyTest" style={{ textDecoration: "none" }}>
                        <div className="card-body d-flex justify-content-center flex-column mb-3">
                          <div className="text-light fs-1">
                            <SiMoneygram />
                          </div>
                          <div className="cardtext">
                            <h5 className="card-title text-light">
                              Pathology Test
                            </h5>
                            <p className="card-text">{testCounts.pathology}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <Link
                        to="/RadiologyTest"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="card-body d-flex justify-content-center flex-column mb-3">
                          <div className="text-light fs-1">
                            <MdOutlineNextWeek />
                          </div>
                          <div className="cardtext">
                            <h5 className="card-title text-light">
                              Radiology Test
                            </h5>
                            <p className="card-text">{testCounts.radiology}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <Link
                        to="/PendingTest"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="card-body d-flex justify-content-center flex-column mb-3">
                          <div className="text-light fs-1">
                            <GiMoneyStack />
                          </div>
                          <div className="cardtext">
                            <h5 className="card-title text-light">
                              Pending Test
                            </h5>
                            <p className="card-text">{testCounts.pendingTest}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <Link to="/Compleated" style={{ textDecoration: "none" }}>
                        <div className="card-body d-flex justify-content-center flex-column mb-3">
                          <div className="text-light fs-1">
                            <GiTakeMyMoney />
                          </div>
                          <div className="cardtext">
                            <h5 className="card-title text-light">
                            Done Test
                            </h5>
                            <p className="card-text">{testCounts.doneTest}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
    </Wrapper>
  );
};

export default ReportCardPage;


const Wrapper = styled.div`
  ul {
    text-align: left;
  }
  li {
    list-style: none;
  }
  tbody {
    border: 1px solid #00000038;
  }
  th {
    padding: 10px 0;
    font-size: 18px;
  }
  .maintainceList {
    transform: translateX(20%);
  }
  table {
    width: 100%;
    margin-bottom: 50px;
  }
  .mainHead {
    font-size: 30px;
  }
  tr td {
    padding: 10px 0;
  }
  .clinik {
    height: 100px;
    border: 1px solid #0000000f;
    background-color: #00ffff26;
  }
  .boxes-container {
    display: flex;
    gap: 30px;
    justify-content: center;
    padding: 20px 10px;
  }
  .boxes {
    width: 160px;
    height: 100px;
    background-color: #b7787840;
  }

  .card {
    background: #213555;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: #264679;
    }
  }

  .icon {
    font-size: 40px;
    color: white;
  }
  .card-body {
    text-align: center;
    padding: 5px;
  }
  .card-link {
    text-decoration: none;
    font-size: small;
  }

  .cardtext {
    h5 {
      color: white;
    }
    p {
      color: white;
    }
  }
  .report-date-column {
    width: 30%;
  }
  .custom-cursor-pointer {
    cursor: pointer;
  }
  .btn1 {
    background-color: #213555;
  }
`;


