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
  const token = user.currentUser.token;
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = user.currentUser.branch_name;

  const [treatDetails, setTreatDetails] = useState([]);

  const getAppointDetailsPat = async () => {
    console.log(uhid);
    try {
      console.log(uhid);
      // const { data } = await axios.get(
      //   `http://localhost:7777/api/v1/super-admin/getAppointmentByBranchAndId/${pid}`
      // );

      const resps = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getTreatmentViaUhid/${branch}/${uhid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
                    <th>TPID</th>
                    <th>Disease</th>
                    <th>Treatment</th>
                    <th>Total Sitting</th>
                    <th>Current Sitting</th>
                    <th>Current Sitting Status</th>
                    <th>Treatment Status</th>
                    {/* <th>Payment Status</th> */}
                  </tr>
                </thead>
                <tbody>
                  {treatDetails?.map((item) => (
                    <>
                      <tr>
                        <td>{item.tp_id}</td>
                        <td>{item.desease}</td>
                        <td>{item.treatment_name}</td>
                        <td>{item.total_sitting}</td>
                        <td>{item.current_sitting}</td>
                        <td>{item.current_sitting_status}</td>
                        <td>{item.treatment_status}</td>
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
