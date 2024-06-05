import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { utils, writeFile } from "xlsx";
import moment from "moment";


const OpdReport = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
 
  const branch = user.branch_name;
  console.log(`User Name: ${branch.name}`);
  const [opdBills, setOpdBills] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [toDate, setToDate] = useState("");

  const getBillDetailsList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getAppointmentData/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      console.log(data);
      setOpdBills(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  

  const goBack = () => {
    window.history.go(-1);
  };

  const todayDate = new Date();

  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate.slice(0, 7));
  console.log(opdBills);

  const filterOpd = opdBills?.filter((item) => {
    return item.treatment_provided === "OPD";
  });

  console.log(filterOpd);

  const filterBillDataByMonth = filterOpd?.filter((item) => {
    return (
      item.appointment_dateTime?.split("T")[0].slice(0, 7) ===
      formattedDate.slice(0, 7)
    );
  });

  console.log(filterBillDataByMonth);

  const downloadBillingData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/downloadOPDReportByTime/${branch}`,
        { fromDate: fromDate, toDate: toDate },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);

      if (Array.isArray(data)) {
        const workbook = utils.book_new();
        const worksheet = utils.json_to_sheet(data);
        utils.book_append_sheet(workbook, worksheet, `Billing Report`);
        writeFile(workbook, `${fromDate} - ${toDate}-billing-report.xlsx`);
        console.log(data);
      } else {
        console.error("data is not an array");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBillDetailsList();
  }, [branch.name]);

  console.log(fromDate, toDate);

  return (
    <>
      <Container>
        <div className="container-fluid">
          <div class=" mt-4">
            <div className="d-flex justify-content-between mb-2">
              <form onSubmit={downloadBillingData}>
                <div className="d-flex justify-content-between">
                  <div>
                    <input
                      type="date"
                      name=""
                      id=""
                      className="p-2 rounded"
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
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-warning mx-2" type="submit">
                    Download Report
                  </button>
                </div>
              </form>
            </div>
            <div className="container-fluid mt-3">
             
                  <div class="table-responsive rounded">
                    <table class="table table-bordered rounded shadow">
                      <thead className="table-head">
                        <tr>
                          <th className="table-sno sticky">Appointment ID</th>
                          <th className="sticky">Appointment Date & Time</th>
                          <th className="table-small sticky">Patient UHID</th>
                          <th className="table-small sticky">Patient Name</th>
                          <th className="table-small sticky">Patient Mobile</th>
                          <th className="table-small sticky">OPD Amount</th>
                          <th className="sticky">Payment Status</th>
                          <th className="sticky">Payment Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fromDate !== "" && toDate !== ""
                          ? filterOpd
                              ?.filter((item) => {
                                const billDate =
                                  item.appointment_dateTime?.split("T")[0];
                                if (fromDate && toDate) {
                                  return (
                                    billDate >= fromDate && billDate <= toDate
                                  );
                                } else {
                                  return true;
                                }
                              })
                              .map((item) => (
                                <>
                                  <tr className="table-row">
                                    <td className="table-sno">
                                      {item.appoint_id}
                                    </td>
                                    <td className="table-small">
                                      {item.appointment_dateTime?.split("T")[0]}
                                    </td>
                                    <td className="table-small">{item.uhid}</td>
                                    <td className="table-small">
                                      {item.patient_name}
                                    </td>
                                    <td>{item.mobileno}</td>
                                    <td className="table-small">
                                      {item.opd_amount}
                                    </td>
                                    <td>{item.payment_Status}</td>
                                    <td>
                                      {item?.appointment_dateTime
                                        ? moment(
                                            item?.appointment_dateTime,
                                            "YYYY-MM-DDTHH:mm"
                                          ).format("DD/MM/YYYY hh:mm A")
                                        : "--"}
                                    </td>
                                  </tr>
                                </>
                              ))
                          : filterBillDataByMonth
                              ?.filter((item) => {
                                const billDate = item.bill_date?.split("T")[0];
                                if (fromDate && toDate) {
                                  return (
                                    billDate >= fromDate && billDate <= toDate
                                  );
                                } else {
                                  return true;
                                }
                              })
                              .map((item) => (
                                <>
                                  <tr className="table-row">
                                    <td className="table-sno">
                                      {item.appoint_id}
                                    </td>
                                    <td className="table-small">
                                      {item.appointment_dateTime?.split("T")[0]}
                                    </td>
                                    <td className="table-small">{item.uhid}</td>
                                    <td className="table-small">
                                      {item.patient_name}
                                    </td>
                                    <td>{item.mobileno}</td>
                                    <td className="table-small">
                                      {item.opd_amount}
                                    </td>
                                    <td>{item.payment_Status}</td>
                                    <td>
                                      {item?.appointment_dateTime
                                        ? moment(
                                            item?.appointment_dateTime,
                                            "YYYY-MM-DDTHH:mm"
                                          ).format("DD/MM/YYYY hh:mm A")
                                        : "--"}
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
      </Container>
    </>
  );
};

export default OpdReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #1abc9c;
    font-weight: bold;
    color: white;
  }

  .table-responsive {
    height: 30rem;
  }

  th {
    background-color: #1abc9c;
    color: white;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }
  .sticky {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1;
  }
`;
