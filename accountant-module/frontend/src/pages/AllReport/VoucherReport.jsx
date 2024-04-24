import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import BranchDetails from "../../components/BranchDetails";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import * as XLSX from "xlsx";

const VoucherReport = () => {
  const user = useSelector((state) => state.user);
  console.log("User State:", user);
  const [vlist, setVlist] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

  const handleDownload = () => {
    const filteredData = vlist.filter((item) => {
      const date = moment(item.voucher_date).format("YYYY-MM-DD");
      return moment(date).isBetween(fromDate, toDate, null, "[]");
    });

    const formattedData = filteredData.map((item) => ({
      SN: item.voucher_id,
      Name: item.for_name,
      For: item.for_use,
      Amount: item.voucher_amount,
      Date: moment(item.voucher_date).format("YYYY-MM-DD"),
      "Created by": item.created_by,
      // Add more fields as needed
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Report");
    XLSX.writeFile(wb, "voucherReport.xlsx");
  };

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
                <div className="container-fluid mt-3">
                  <div className="">
                    <BranchDetails />
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
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Voucher Reports</h2>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div class="table-responsive mt-4">
                    <div className="d-flex justify-content-between mb-2">
                      <form>
                        <div className="d-flex justify-content-between">
                          <div>
                            <input
                              type="date"
                              name=""
                              id=""
                              className="p-2 rounded"
                              value={fromDate}
                              onChange={(e) => setFromDate(e.target.value)}
                            />
                          </div>
                          <div className="mx-2">To</div>
                          <div>
                            <input
                              type="date"
                              name=""
                              id=""
                              className="p-2 rounded"
                              value={toDate}
                              onChange={(e) => setToDate(e.target.value)}
                            />
                          </div>
                          <button
                            className="btn btn-warning mx-2"
                            onClick={handleDownload}
                          >
                            Download Report
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="container-fluid mt-1 rounded">
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

export default VoucherReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
  th {
    background-color: #201658;
    color: white;
  }
`;
