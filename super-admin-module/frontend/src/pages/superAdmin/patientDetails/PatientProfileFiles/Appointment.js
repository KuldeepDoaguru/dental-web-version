import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

const Appointment = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [patAppointDetails, setPatAppointDetails] = useState([]);

  const getAppointDetailsPat = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getAppointmentByBranchAndId/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setPatAppointDetails(data);
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
                          {item.appointment_dateTime
                            ?.split("T")[1]
                            ?.split(".")[0]
                            .slice(0, 5)}
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
