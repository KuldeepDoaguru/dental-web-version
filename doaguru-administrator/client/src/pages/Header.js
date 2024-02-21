import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <div className="left">
        <img
          src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
          alt="logo"
          className="imgheight"
        />
      </div>
    </Container>
  );
};

export default Header;
const Container = styled.div`
  background: #92c3f0;
  .imgheight {
    height: 5rem;
    margin-left: 2rem;
  }
  .left {
    background-color: transparent;
  }
`;
