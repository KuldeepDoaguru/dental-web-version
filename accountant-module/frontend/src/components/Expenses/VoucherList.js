import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import { Link } from "react-router-dom";
import BranchDetails from "../BranchDetails";
import { useSelector } from "react-redux";
import axios from "axios";
const VoucherList = () => {
  const user = useSelector((state) => state.user);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [vlist, setVlist] = useState([]);

  const getVoucherList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getVoucherListByBranch/${user.branch}`
      );
      setVlist(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVoucherList();
  }, []);

  console.log(vlist);
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <div className="container-fluid">
                  <BranchDetails />
                  <div className="container mt-4">
                    <h2 className="text-center">All Voucher's List</h2>
                    <div className="container mt-5">
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th className="table-sno">SN</th>
                              <th className="table-small">Name</th>
                              <th className="table-small">For</th>
                              <th className="table-small">Amount</th>
                              <th className="table-small">Date</th>
                              <th>Created by</th>
                              <th className="table-small">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vlist?.map((item) => (
                              <>
                                <tr className="table-row">
                                  <td className="table-sno">
                                    {item.voucher_id}
                                  </td>
                                  <td className="table-small">
                                    {item.for_name}
                                  </td>
                                  <td className="table-small">
                                    {item.for_use}
                                  </td>
                                  <td className="table-small">
                                    {item.voucher_amount}
                                  </td>

                                  <td className="table-small">
                                    {item.voucher_date.split("T")[0]}
                                  </td>
                                  <td className="table-small">
                                    {item.created_by}
                                  </td>
                                  <td className="table-small">
                                    <Link
                                      to={`/VoucherPaidListPrint/${item.voucher_id}`}
                                    >
                                      <button
                                        className="btn fw-medium fs-5  px-4 py-1 text-white"
                                        style={{
                                          backgroundColor: "#201658",
                                        }}
                                      >
                                        View Details
                                      </button>
                                    </Link>
                                  </td>
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
      </Container>
    </>
  );
};

export default VoucherList;

const Container = styled.div``;
