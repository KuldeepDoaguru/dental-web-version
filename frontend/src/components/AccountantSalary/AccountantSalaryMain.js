import React from "react";
import Header from "../Header";
import Sider from "../Sider";
import RightSider from "../RightSider";
import AccountantsSalary from "./AccountantsSalary";

const AccountantSalaryMain = () => {
  return (
    <>
      <Header />
      <div className="main">
        <div className="container-fluid">
          <div className="row d-flex justify-content-between">
            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 p-0">
              <Sider />
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8">
              <AccountantsSalary />
            </div>
            <div className="col-2 p-0">
              <RightSider />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountantSalaryMain;
