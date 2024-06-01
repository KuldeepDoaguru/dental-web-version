import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <>
      <Container>
        <div className="error-div">
          <h1>Oops! 404 Page not found</h1>

          <Link to="/">Home</Link>
          {/* <iframe src="https://lottie.host/embed/5cddf3d5-7ee2-4f10-97e9-d5fdb5327cfa/H8lpQ4WGTz.json"></iframe> */}
        </div>
      </Container>
    </>
  );
};

export default ErrorPage;
const Container = styled.div``;
