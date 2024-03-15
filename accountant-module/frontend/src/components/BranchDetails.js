import React from "react";
import styled from "styled-components";

const BranchDetails = () => {
  return (
    <>
      <Container>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-md-4 mt-4">
            <div>
              <h5>Branch : Madan Mahal</h5>
            </div>
            <div className="mt-2">
              <h3> Welcome to Dental Guru! </h3>
            </div>
            <div className="mt-3">
              <h6>Accountant Dashboard</h6>
            </div>
          </div>

          <div className="col-12 col-md-4 me-2 mt-5">
            <form className="d-flex ms-auto my-sm" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-primary border-none"
                style={{ backgroundColor: "#201658" }}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BranchDetails;
const Container = styled.div`
  .border-none {
    border: none;
  }
`;
