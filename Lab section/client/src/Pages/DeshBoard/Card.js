import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaMoneyBill } from "react-icons/fa";
import { SiMoneygram } from "react-icons/si";
import { MdOutlineNextWeek } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import axios from "axios";
import { useSelector } from "react-redux";

const Card = () => {
  const [testCounts, setTestCounts] = useState({
    today: 0,
    yesterday: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0
  });

  
  const currentUser = useSelector(state => state.auth.user);
  
  const token = currentUser?.token;

  useEffect(() => {
    const getTestCounts = async () => {
      try {
        const response = await axios.get("https://dentalgurulab.doaguru.com/api/lab/get-patient-test-details" ,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        });
        if (response.status === 200) {
          const data = response.data;
          // Process the data and extract test counts
          const todayCount = data.filter(item => isToday(item.created_date)).length;
          const yesterdayCount = data.filter(item => isYesterday(item.created_date)).length;
          const weeklyCount = data.filter(item => isWithinLastNDays(item.created_date, 7)).length;
          const monthlyCount = data.filter(item => isWithinLastNDays(item.created_date, 30)).length;
          const yearlyCount = data.filter(item => isWithinLastNDays(item.created_date, 365)).length;
          // Update the test counts state
          setTestCounts({
            today: todayCount,
            yesterday: yesterdayCount,
            weekly: weeklyCount,
            monthly: monthlyCount,
            yearly: yearlyCount
          });
        } else {
          console.error("Failed to fetch test counts");
        }
      } catch (error) {
        console.error("Error fetching test counts:", error);
      }
    };

    getTestCounts();
  }, []);

  // Helper functions to check date conditions
  const isToday = date => new Date(date).toDateString() === new Date().toDateString();
  const isYesterday = date => new Date(date).toDateString() === new Date(Date.now() - 86400000).toDateString();
  const isWithinLastNDays = (date, days) => new Date(date) > new Date(Date.now() - days * 86400000);

  return (
    <CardContainer>
      <div className="d-flex justify-content-around mt-5">
        <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
         
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <FaMoneyBill />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Today Test</h5>
                  <p className="card-text text-light fw-semibold">{testCounts.today}</p>
                </div>
              </div>
            </div>
         
        </div>
        <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
         
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  < SiMoneygram  />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Yesterday Test</h5>
                  <p className="card-text text-light fw-semibold">{testCounts.yesterday}</p>
                </div>
              </div>
            </div>
      
        </div>
        <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
         
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <MdOutlineNextWeek />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Weekly Test</h5>
                  <p className="card-text text-light fw-semibold">{testCounts.weekly}</p>
                </div>
              </div>
            </div>
        
        </div>
        <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
         
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  < GiMoneyStack />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Monthly Test</h5>
                  <p className="card-text text-light fw-semibold">{testCounts.monthly}</p>
                </div>
              </div>
            </div>
         
        </div>
        <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
        
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <  GiTakeMyMoney />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Yearly Test</h5>
                  <p className="card-text text-light fw-semibold">{testCounts.yearly}</p>
                </div>
              </div>
            </div>
         
        </div>
        {/* Repeat similar code for other test categories */}
      </div>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  .card {
    background: #213555;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: #264679;
    }
  }

  .icon {
    font-size: 40px;
    color: white;
  }
  .card-body {
    text-align: center;
    padding: 5px;
  }
  .card-link {
    text-decoration: none;
    font-size: small;
  }

  .cardtext {
    h5 {
      color: white;
    }
    p {
      color: white;
    }
  }
`;
