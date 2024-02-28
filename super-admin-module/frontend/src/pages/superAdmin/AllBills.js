import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Dropdown, Nav } from "react-bootstrap";
// import BillTypeData from "../../components/superAdmin/BillType/BillTypeData";
import HospitalPurchaseBills from "../../components/superAdmin/BillType/HospitalPurchaseBills";
import PatientsBills from "../../components/superAdmin/BillType/PatientsBills";
import BranchSelector from "../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
// import "bootstrap/dist/css/bootstrap.min.css";

const AllBills = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [listBills, setListBills] = useState([]);

  const getBillDetailsList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getBillsByBranch/${branch.name}`
      );
      console.log(data);
      setListBills(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBillData = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7777/api/v1/super-admin/deleteBills/${id}`
      );
      console.log(response);
      cogoToast.success("Appointment Deleted Successfully");
      getBillDetailsList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBillDetailsList();
  }, [branch.name]);

  console.log(listBills);
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
                  <h3 className="text-center">Bill List</h3>
                  <div className="container-fluid mt-3">
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">Bill ID</th>
                            <th>Bill Date</th>
                            <th className="table-small">Patient UHID</th>
                            <th className="table-small">Patient Name</th>
                            <th className="table-small">Patient Mobile</th>
                            <th className="table-small">Patient Email</th>
                            <th className="table-small">Treatment</th>
                            <th className="table-small">Treatment Status</th>
                            <th className="table-small">Drugs with Quantity</th>
                            <th className="table-small">Total Amount</th>
                            <th>Paid Amount</th>
                            <th>Payment Status</th>
                            <th>Payment Date & Time</th>
                            <th className="table-small">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listBills?.map((item) => (
                            <>
                              <tr className="table-row">
                                <td className="table-sno">{item.bill_id}</td>
                                <td className="table-small">
                                  {item.bill_date?.split("T")[0]}
                                </td>
                                <td className="table-small">{item.uhid}</td>
                                <td className="table-small">
                                  {item.patient_name}
                                </td>
                                <td>{item.patient_mobile}</td>
                                <td>{item.patient_email}</td>
                                <td>{item.treatment}</td>
                                <td>{item.treatment_status}</td>
                                <td>{item.drugs_quantity}</td>
                                <td className="table-small">
                                  {item.total_amount}
                                </td>
                                <td className="table-small">
                                  {item.paid_amount}
                                </td>
                                <td>{item.payment_status}</td>
                                <td>{item.payment_date_time}</td>
                                <td className="table-small">
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => deleteBillData(item.bill_id)}
                                  >
                                    Delete
                                  </button>
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
      </Container>
    </>
  );
};

export default AllBills;
const Container = styled.div`
  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }

  th {
    background-color: #004aad;
    color: white;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
