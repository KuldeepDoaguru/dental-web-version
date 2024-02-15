import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";

const SuperAdmNotify = () => {
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
                <div className="container mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <h6>Select Branch : </h6>
                      </div>
                      <div>
                        <select name="branch" id="branch" className="mx-2">
                          <option value="Madan Mahal">Madan Mahal</option>
                          <option value="Madan Mahal">Ranjhi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      {/* <Link to="/register-doctor">
                        <button className="btn btn-success">Add Doctor</button>
                      </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container mt-3">
                  <h3 className="text-center">Notification List</h3>
                  <div className="container mt-3">
                    <ul>
                      <li>
                        <Link to="/super-admin-profile">
                          Admin Added New Doctor - Approve the doctor
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/super-admin-profile">
                          Admin Added New Doctor - Approve the doctor
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/super-admin-profile">
                          Admin Added New Doctor - Approve the doctor
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/super-admin-profile">
                          Admin Added New Doctor - Approve the doctor
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/super-admin-profile">
                          Admin Added New Doctor - Approve the doctor
                        </Link>
                      </li>
                    </ul>
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

export default SuperAdmNotify;
const Container = styled.div`
  th {
    background-color: #004aad;
    color: white;
  }
`;
