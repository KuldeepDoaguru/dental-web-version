import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./PatientProfileFiles/Navbar";
import Header from "../../../components/Header";
import Sider from "../../../components/Sider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import BranchSelector from "../../../components/BranchSelector";

const PatientProfile = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  console.log(pid);
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [patientData, setPatientData] = useState([]);
  const [ongoingTreat, setOngoingTreat] = useState([]);

  const patientProfileData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientDataByBranchAndId/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setPatientData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOngoingTreat = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientBillByBranchAndId/${branch.name}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setOngoingTreat(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(ongoingTreat);

  useEffect(() => {
    patientProfileData();
    getOngoingTreat();
  }, []);

  console.log(patientData[0]?.patient_name);

  const filterForOngoingTreat = ongoingTreat?.filter((item) => {
    return item.treatment_status === "ongoing";
  });

  console.log(filterForOngoingTreat);

  return (
    <Wrapper>
      <Header />

      <div className="row mrgnzero">
        <div className="col-lg-1 col-md-1 col-1" id="sider">
          <Sider />
        </div>
        <div className="col-lg-11 col-md-11 col-11">
          <div className="container-fluid mt-3">
            <div className="d-flex justify-content-between">
              <BranchSelector />
            </div>
          </div>
          <div className="row g-2">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <h1 className="mt-3">{patientData[0]?.patient_name}</h1>

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
                            <span className="">{patientData[0]?.uhid}</span>
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
                            <span className="">{patientData[0]?.gender}</span>
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
                            <span className="">{patientData[0]?.emailid}</span>
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
                            <span className="">{patientData[0]?.dob}</span>
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
                            <span className="">{patientData[0]?.address}</span>
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
                            <span className="">{patientData[0]?.adharno}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Marital Status :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">
                              {patientData[0]?.maritalstatus}
                            </span>
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
                            <span className="">
                              {patientData[0]?.bloodgroup}
                            </span>
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
                            <span className="">{patientData[0]?.mobileno}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Father Name :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">
                              {patientData[0]?.fathername}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Mother Name :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">
                              {patientData[0]?.mothername}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Husband Name :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">
                              {patientData[0]?.husbandname}
                            </span>
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
                              {patientData[0]?.patient_type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                            <strong>Registration Branch :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">
                              {patientData[0]?.branch_name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="p-2 bg-light rounded">
                  <h6 className="fw-bold mt-2">Ongoing Treatment</h6>
                  <ul className="">
                    {filterForOngoingTreat?.map((item) => (
                      <>
                        <li>
                          <p className="">{item.treatment_name}</p>
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 col-sm-12">
              <div className="mrgtop">
                <Navbar />
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
  .list-unstyled {
    line-height: 1.9rem;
  }
  #sider {
    @media screen and (max-width: 768px) {
      height: 118rem;
    }
  }

  strong {
    width: 50%;
  }

  .mrgnzero {
    margin-right: 0rem;
  }
  .mrgtop {
    margin-top: 4rem;
  }
`;
