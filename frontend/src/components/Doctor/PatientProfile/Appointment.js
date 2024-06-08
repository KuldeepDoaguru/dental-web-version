import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

const Appointment = () => {
  const dispatch = useDispatch();
  const { uhid } = useParams();
  const user = useSelector((state) => state.user);
  const token = user.currentUser.token;
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = user.currentUser.branch_name;
  console.log(uhid, branch);
  const [patAppointDetails, setPatAppointDetails] = useState([]);

  const getAppointDetailsPat = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getAllAppointmentByPatientId/${uhid}/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data);
      setPatAppointDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointDetailsPat();
  }, []);

  console.log(patAppointDetails);

  return (
    <Wrapper>
      <div className="container cont-box">
        <div className="" id="tabb">
          <div
            className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
            id="tableres"
          >
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Appointment Time</th>
                    <th>Doctor</th>
                    <th>Treatment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patAppointDetails?.map((item) => (
                    <>
                      <tr>
                        <td>{item.appointment_dateTime?.split("T")[0]}</td>
                        <td>
                          {moment(item.appointment_dateTime).format("hh:mm A")}
                        </td>
                        <td>{item.assigned_doctor_name}</td>
                        <td>{item.treatment_provided}</td>
                        <td>{item.appointment_status}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Appointment;
const Wrapper = styled.div`
  #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 15rem;
    height: 19rem;
    @media screen and (max-width: 768px) {
      width: 31%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
      width: 13rem;
    }
  }

  .dotrem1 {
    list-style-type: none;
    width: 25px;
    padding-left: 4px;
  }
  .dotrem {
    list-style-type: none;
  }
  #tabb {
    @media screen and (max-width: 768px) {
      width: 23rem;
      margin-left: -1rem;
    }
  }
  .cal {
    @media screen and (max-width: 768px) {
      width: 19.5rem;
    }
  }

  .cont-box {
    width: 100%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
