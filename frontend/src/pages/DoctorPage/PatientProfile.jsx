import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeadBar from "../../components/Doctor/HeadBar";
import Sider from "../../components/Doctor/SideBar";
import Navbar from "../../components/Doctor/PatientProfile/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";

const PatientProfile = () => {
  const { uhid } = useParams();
  const navigate = useNavigate();
  console.log(uhid);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.currentUser.token;
  const branch = user.currentUser.branch_name;
  console.log(`User Branch: ${branch}`);

  const [patientData, setPatientData] = useState([]);
  const [ongoing, setOngoing] = useState([]);

  const getPatientDetails = async () => {
    try {
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/get-Patient-by-id/${uhid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.data);
      setPatientData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onGoingTreat = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getTreatmentViaUhid/${branch}/${uhid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setOngoing(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(ongoing);
  const filterForOngoing = ongoing?.filter((item) => {
    return item.treatment_status === "ongoing";
  });

  console.log(filterForOngoing);
  useEffect(() => {
    onGoingTreat();
    getPatientDetails();
  }, []);

  const goBack = (event) => {
    event.preventDefault(); // Prevent default action to avoid page refresh
    navigate(-1); // This goes back to the previous page
  };

  return (
    <Wrapper>
      <HeadBar />

      <div className="row mrgnzero">
        <div
          className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-11 col-1"
          id="sider"
        >
          <Sider />
        </div>
        <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11 p-0">
          <div className="container-fluid mt-3">
            <div className="d-flex justify-content-between">
              {/* <BranchSelector /> */}
            </div>
          </div>
          <div className="row g-1 px-0">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <button className="btn btn-success" onClick={goBack}>
                <IoMdArrowRoundBack /> Back
              </button>
              <h1 className="mt-3">{patientData?.patient_name}</h1>

              <div className="mt-5">
                <div className="p-2 bg-light w-100 rounded">
                  <h6 className="fw-bold mt-2">Basic Info</h6>
                </div>
                <div className="container">
                  <ul className="list-unstyled w-100">
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>UHID :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData.uhid}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Gender :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.gender}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Mobile :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.mobileno}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Email :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span
                              className=""
                              style={{ overflowWrap: "anywhere" }}
                            >
                              {patientData?.emailid}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>DOB :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.dob}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Age</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.age}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Address :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.address}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Adhaar Number :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.aadhaar_no}</span>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Blood Group :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.bloodgroup}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>weight</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.weight}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Patient Type :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">
                              {patientData?.patient_type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Contact Person :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">
                              {patientData?.contact_person}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Contact Person Name :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">
                              {patientData?.contact_person_name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Allergy :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.allergy}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>disease :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.disease}</span>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Branch :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData?.branch_name}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="p-2 bg-light rounded">
                  <h6 className="fw-bold fs-5 mt-2">Ongoing Treatment</h6>
                  <ul>
                    {filterForOngoing?.map((item) => (
                      <>
                        <li>{item.treatment_name}</li>
                      </>
                    ))}
                  </ul>
                </div>
                <div className="container">
                  <ul className=" list-unstyled">
                    {/* {filterForOngoingTreat?.map((item) => (
                      <>
                        <li>
                          <p className="fw-bold">{item.treatment}</p>
                        </li>
                      </>
                    ))} */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 col-sm-12">
              <div className="mrgtop">
                <Navbar uhid={uhid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PatientProfile;
const Wrapper = styled.div`
  overflow: hidden;
  .list-unstyled {
    line-height: 1.9rem;
  }
  #sider {
    @media screen and (max-width: 768px) {
      height: 118rem;
    }
  }
`;
