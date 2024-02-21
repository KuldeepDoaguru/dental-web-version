import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";

const AdminNotify = () => {
  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container mt-3">
                  <h3 className="text-center">Notification List</h3>
                  <div className="container mt-3">
                    <ul>
                      <li>
                        <div className="li-div">
                          <Link to="/super-admin-profile">
                            Admin Added New Doctor - Approve the doctor
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className="li-div">
                          <Link to="/super-admin-profile">
                            Admin Added New Doctor - Approve the doctor
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className="li-div">
                          <Link to="/super-admin-profile">
                            Admin Added New Doctor - Approve the doctor
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className="li-div">
                          <Link to="/super-admin-profile">
                            Admin Added New Doctor - Approve the doctor
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className="li-div">
                          <Link to="/super-admin-profile">
                            Admin Added New Doctor - Approve the doctor
                          </Link>
                        </div>
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

export default AdminNotify;
const Container = styled.div`
  th {
    background-color: #004aad;
    color: white;
  }
  .li-div {
    background-color: #c7ecee;
    margin-top: 1rem;
    padding: 1rem;
    border: none;
    box-shadow: 0px 0px 10px darkgrey;
    border-radius: 10px;
    color: #004aad;
    font-weight: bold;
    &:hover {
      background-color: #000;
    }
    a {
      text-decoration: none;
    }
  }

  li {
    list-style: none;
  }
`;
