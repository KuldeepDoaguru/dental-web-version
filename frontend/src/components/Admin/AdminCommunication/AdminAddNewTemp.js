import React from "react";
import styled from "styled-components";

const AdminAddNewTemp = () => {
  return (
    <>
      <Container>
        <h1>Add New Template</h1>
        <div className="container-fluid">
          <form action="">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Template Name
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="write template name"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Message
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                placeholder="write here..."
                rows="3"
              ></textarea>
            </div>
            <button className="btn btn-info fs-1">Save</button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AdminAddNewTemp;
const Container = styled.div`
  .btn-info {
    background-color: #1abc9c;
    font-weight: bold;
  }
`;
