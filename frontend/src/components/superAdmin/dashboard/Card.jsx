import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Card({ title, link, logo, info }) {
  return (
    <>
      <Wrapper>
        <div className="card">
          <div className="icon">{logo}</div>
          <div className="card-body ">
            <h6 className="card-title">{title}</h6>
            <h5 className="card-subtitle mb-2">{info}</h5>

            {/* <Link to={""} className="card-link">View Details</Link> */}
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default Card;

const Wrapper = styled.div`
  .card {
    background: #004aad;
    padding: 1rem;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: black;
    }
  }
  .icon {
    text-align: center;
    color: white;
  }
  .card-body {
    text-align: center;
    padding: 5px;
  }
  .card-title {
    color: white;
  }
  .card-subtitle {
    color: white;
  }
  .card-link {
    text-decoration: none;
    font-size: small;
  }
`;
