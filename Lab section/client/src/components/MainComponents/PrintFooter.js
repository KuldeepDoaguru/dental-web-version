import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

function PrintFooter() {
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
      {getBranch.foot_img ? (
        <div className="footerimage">
          <img src={getBranch.foot_img} alt="footer" />
        
        </div>
      ) : (
        <div>No Footer image available</div>
      )}
    </Wrapper>
  );
}

export default PrintFooter;

const Wrapper = styled.div`
  .footerimage {
    height: 6rem;
    width: auto;
    img {
      height: 100%;
      width: 100%;
    }
   
    @media print {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
  
  }
`;
