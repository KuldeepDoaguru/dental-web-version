import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import BranchSelector from "../../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const LabDetailsReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [labList, setLabList] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);

  const goBack = () => {
    window.history.go(-1);
  };

  const getListLabDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getLabList`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLabList(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(labList);

  useEffect(() => {
    getListLabDetails();
  }, []);
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    <BranchSelector />
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container-fluid d-flex justify-content-center">
                            <h2 className="">Lab Details Report</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container-fluid mt-2">
                        <div className="d-flex justify-content-center mb-2 mt-2">
                          <button className="btn btn-warning mx-2">
                            Download Report
                          </button>
                        </div>
                        <div class="table-responsive mt-2">
                          <table class="table table-bordered">
                            <thead className="table-head">
                              <tr>
                                <th>Lab Name</th>
                                <th>Lab Type</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Lab Address</th>
                              </tr>
                            </thead>
                            <tbody>
                              {labList?.map((item) => (
                                <>
                                  <tr className="table-row">
                                    <td>Inhouse Dental Lab Works</td>
                                    <td>Internal</td>
                                    <td>+91-999965651</td>
                                    <td>maheshkuldeep@gmail.com</td>
                                    <td>Madan Mahal</td>
                                  </tr>
                                </>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LabDetailsReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
