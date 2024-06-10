import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Navbar from "./PatientProfileFiles/Navbar";
// import Header from "../../../components/Header";
// import Sider from "../../../components/Sider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
// import BranchSelector from "../../../components/BranchSelector";
import SiderAdmin from "./SiderAdmin";
import HeaderAdmin from "./HeaderAdmin";
import Navbar from "./patientDetails/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";

const AdminPatientProfile = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [patientData, setPatientData] = useState([]);
  const [ongoingTreat, setOngoingTreat] = useState([]);
  const goBack = () => {
    window.history.go(-1);
  };
  const patientProfileData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getPatientDataByBranchAndId/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getPatientBillByBranchAndId/${user.branch_name}/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  useEffect(() => {
    patientProfileData();
    getOngoingTreat();
  }, []);

  console.log(ongoingTreat);

  console.log(patientData[0]?.patient_name);

  const filterForOngoingTreat = ongoingTreat?.filter((item) => {
    return item.treatment_status === "ongoing";
  });

  console.log(filterForOngoingTreat);
  console.log(patientData);

  return (
    <Wrapper>
      <HeaderAdmin />

      <div className="row mrgnzero">
        <div className="col-lg-1 col-md-2 col-1" id="sider">
          <SiderAdmin />
        </div>
        <div className="col-lg-11 col-md-10 col-11" style={{marginTop:"5rem"}}>
          <div className="container-fluid mt-3">
            <div className="d-flex justify-content-between">
              {/* <BranchSelector /> */}
            </div>
          <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
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
                            <strong>Age</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData[0]?.age}</span>
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
                            <span className="">
                              {patientData[0]?.aadhaar_no}
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
                            <strong>weight</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">{patientData[0]?.weight}</span>
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
                            <strong>Contact Person :</strong>
                          </div>
                          <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                            <span className="">
                              {patientData[0]?.contact_person}
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
                              {patientData[0]?.contact_person_name}
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
                            <span className="">{patientData[0]?.allergy}</span>
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
                            <span className="">{patientData[0]?.disease}</span>
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
                  <h4 className="fw-bold mt-2">Ongoing Treatment</h4>
                  <hr />
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

export default AdminPatientProfile;
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
