import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Card() {
  return (
    <Wrapper>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="card" id="card1">
            <div className="card-body">
              <h6 className="card-title" style={{ color: "black " }}>
                Today's Appointment
              </h6>
              <p className="card-text">
                <ul className="sec" id="section1">
                  <div className="data">
                    <li className="dotrem h6 ">Missed</li>

                    <li className="dotrem1  text-bg-danger rounded-5">54</li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6">Checked in</li>
                    <li className="dotrem1    text-bg-success rounded-5 ">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6  ">Upcoming</li>
                    <li className="dotrem1   text-bg-warning rounded-5  text-white">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6 ">Complete</li>
                    <li className="dotrem1  text-bg-primary rounded-5 ">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem h6 ">Cancel</li>
                    <li className="dotrem1 text-bg-secondary rounded-5 ">54</li>
                  </div>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="card" id="card2">
            <div className="card-body d-flex justify-content-between">
              <i className="bi bi-person h1"></i>
              <div className="">
                <h6 className="card-title" style={{ color: "black " }}>
                  New Patient
                </h6>

                <p className=" h6 text-center text-dark">19</p>

                <p className="view"><Link to="/new_patient" className=" text-decoration-none" style={{color:"red"}}>View Detail</Link></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          
          <div className="card" id="card3">
            <div className="card-body d-flex justify-content-between">
            <i className="bi bi-currency-exchange  h1 float-end"></i>
              <div className="">
                <h6 className="card-title" style={{ color: "black " }}>
                Collection
                </h6>

                <p className=" h6 text-center text-dark">  <i className="bi bi-currency-rupee"></i>5200</p>

                <p className="view">View Detail</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="card" id="card4">
            <div className="card-body d-flex justify-content-between">
              <i className="bi bi-people-fill h1"></i>
              <div className="">
                <h6 className="card-title">All Patient</h6>

                <p className=" h6 text-center text-dark">256</p>

                <p className="view"><Link to="/all_patient" className=" text-decoration-none" style={{color:"red"}}>View Detail</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Card;

const Wrapper = styled.div`
  .dotrem {
    list-style-type: none;
  }
  .dotrem1 {
    list-style-type: none;
    width: 25px;
    padding-left:4px;
  }

.data{
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
  color: black;
    font-size: larger;

 
}

  #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 18rem;
    height: 13rem;
    @media screen and (max-width: 768px) {
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
    width: 13rem;
  }
  }
  #card2 {
    width: 18rem;
    height: 6rem;
    margin-top: 5px;

    background-image: linear-gradient(#fff0b4, #ffb4ee);
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
    width: 13rem;
  }
  }
  #card3 {
    width: 18rem;
    height: 6rem;

    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    margin-top: 5px;
    @media screen and (max-width: 768px) {
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
    width: 13rem;
  }
  }
  #card4 {
    width: 18rem;
    height: 6rem;

    background-image: linear-gradient(#fff0b4, #ffb4ee);

    margin-top: 5px;
    @media screen and (max-width: 768px) {
      width: 83%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
    width: 13rem;
  }
  }

  .view {
    color: red;
    
    
  }
`;
