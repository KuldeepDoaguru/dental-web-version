import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

function PrintHeader() {
  const currentUser = useSelector((state) => state.auth.user);

  const [getBranch, setGetBranch] = useState({});
  const token = currentUser?.token;
  const branch = currentUser?.branch_name;

  const getBranchDetails = async () => {
    if (!branch || !token) return;

    try {
      const { data } = await axios.get(
        `https://dentalgurulab.doaguru.com/api/lab/getBranchDetailsByBranch/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGetBranch(data[0]);
      console.log(getBranch);
    } catch (error) {
      console.log("Error fetching branch details:", error);
    }
  };

  useEffect(() => {
    getBranchDetails();
  }, [branch, token]);

  return (
    <Wrapper>
      {getBranch.head_img ? (
        <div className="headimage">
          <img src={getBranch.head_img} alt="header" />
        </div>
      ) : (
        <div>No header image available</div>
      )}
    </Wrapper>
  );
}

export default PrintHeader;

const Wrapper = styled.div`
  .headimage {
    height: 6rem;
    width: auto;
    img {
      height: 100%;
      width: 100%;
    }
  }
`;
