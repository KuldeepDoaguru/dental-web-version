import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ComplaintPage = () => {
  const cid = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [complain, setComplain] = useState([]);

  console.log(cid.cid);

  const getComplaints = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getComplainById/${cid.cid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setComplain(data);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    window.history.go(-1);
  };

  useEffect(() => {
    getComplaints();
  }, []);

  console.log(complain);
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
                  <button className="btn btn-success shadow" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <h3 className="text-center">Complaint Details</h3>
                  <div className="container-fluid mt-3">
                    <div className="container box-com shadow">
                      <h2>Employee Name : {complain[0]?.employee_name}</h2>
                      <p>
                        <strong>Complaint : </strong>
                        {complain[0]?.complain}
                      </p>
                      <h4>
                        Received ON : {complain[0]?.rec_on.split("T")[0]} -{" "}
                        {complain[0]?.rec_on
                          .split("T")[1]
                          .split(".")[0]
                          .slice(0, 5)}
                      </h4>
                      <h4>Status : {complain[0]?.status}</h4>
                      <h4>Pending Since : {complain[0]?.pending_since}</h4>
                      <button className="btn btn-warning fw-bold fs-4">
                        update Status
                      </button>
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

export default ComplaintPage;
const Container = styled.div`
  .box-com {
    background-color: #1abc9c;
    padding: 3rem;
    border-radius: 0.5rem;
  }

  p {
    font-size: 1.5rem;
  }
`;
