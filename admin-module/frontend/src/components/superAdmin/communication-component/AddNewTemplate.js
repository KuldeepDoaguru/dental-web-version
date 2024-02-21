import React from "react";
import styled from "styled-components";

const AddNewTemplate = () => {
  return (
    <>
      <Container>
        <h1>Add New Template</h1>
        <div className="container">
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

export default AddNewTemplate;
const Container = styled.div``;
