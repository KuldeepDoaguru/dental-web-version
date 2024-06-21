import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
const Treatment = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);

  const branch = user.branch;
  const token = user.token;

  const [treatments, setTreatments] = useState([]);

  const getTreatmentsDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getTreatmentViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTreatments(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentsDetails();
  }, []);

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
                  </tr>
                </thead>
                <tbody>
                  {treatments?.map((item) => (
                    <>
                      <tr>
                        <td>{item.tp_id}</td>
                        <td>{item.desease}</td>
                        <td>{item.treatment_name}</td>
                        <td>{item.total_sitting}</td>
                        <td>{item.current_sitting}</td>
                        <td>{item.current_sitting_status}</td>
                        <td className="text-capitalize">
                          {item.treatment_status}
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
      width: auto;
      /* margin-left: -1.5rem; */
    }
  }

  .cont-box {
    width: 68rem;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
