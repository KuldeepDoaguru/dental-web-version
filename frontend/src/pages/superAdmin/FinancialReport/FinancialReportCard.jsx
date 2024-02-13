import React from "react";
import FinancialReportHead from "./FinancialReportHead";
import FinancialReports from "./FinancialReports";
import FinancialCard from "./FinancialCard";
import FinancialTables from "./FinancialTables";
import styled from "styled-components";
import Header from "../../../components/Header";
import Sider from "../../../components/Sider";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const FinancialReportCard = () => {
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };

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
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> */}
                    </div>
                  </div>
                </div>

                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <FinancialReportHead />
                  <FinancialReports />
                  <FinancialCard />
                  <FinancialTables />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FinancialReportCard;
const Container = styled.div``;
