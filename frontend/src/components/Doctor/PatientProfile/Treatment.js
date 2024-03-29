import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Treatment = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const { uhid } = useParams();
  console.log(uhid);
  const user = useSelector((state) => state.user);
  // console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  // console.log("User State:", user);
  const branch = useSelector((state) => state.branch);

  const [treatDetails, setTreatDetails] = useState([]);

  const getAppointDetailsPat = async () => {
    console.log(uhid);
    try {
      console.log(uhid);
      // const { data } = await axios.get(
      //   `http://localhost:7777/api/v1/super-admin/getAppointmentByBranchAndId/${pid}`
      // );

      const resps = await axios.get(
        `http://localhost:8888/api/doctor/treatPatientProfile/${uhid}`
      );
      console.log(resps.data);
      setTreatDetails(resps.data);
      console.log(uhid);
    } catch (error) {
      console.log(error);
    }
    console.log(uhid);
  };

  useEffect(() => {
    getAppointDetailsPat();
  }, []);

  console.log(treatDetails);

  return (
    <Wrapper>
      <div className="container cont-box">
        <div className="" id="tabb">
          <div className="widget-area-2 proclinic-box-shadow mx-3 mt-5">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Treatment</th>
                    <th>Consultant</th>
                    <th>Cost</th>
                    <th>Treatment Note</th>
                    {/* <th>Payment Status</th> */}
                  </tr>
                </thead>
                <tbody>
                  {treatDetails?.map((item) => (
                    <>
                      <tr>
                        <td>{item.date?.split("T")[0]}</td>
                        <td>{item.dental_treatment}</td>
                        <td>{item.assigned_doctor_name}</td>
                        <td>{item.total_amt}</td>
                        <td>{item.note}</td>
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

export default Treatment;
const Wrapper = styled.div`
  #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 15rem;
    height: 22rem;
    @media screen and (max-width: 768px) {
      width: 91%;
      margin-left: -0.5rem;
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
  .cal {
    @media screen and (max-width: 768px) {
      width: 19.5rem;
    }
  }

  #tabb {
    @media screen and (max-width: 768px) {
      width: 25rem;
      margin-left: -1.5rem;
    }
  }

  .cont-box {
    width: 68rem;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;