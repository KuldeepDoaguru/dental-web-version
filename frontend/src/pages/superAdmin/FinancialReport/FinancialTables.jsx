import React from "react";
import styled from "styled-components";

export const FinancialTables = () => {
  return (
    <>
      <Container>
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-1"></div>
            <div className="col-11">
              <div className="row">
                <div className="col-sm-11 col-md-11 col-lg-6 col-xl-6">
                  <table class="table table-bordered border-primary">
                    <div className="d-flex justify-content-center">
                      <button type="button" class="btn btn-outline-primary">
                        Earning
                      </button>
                    </div>

                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">S.No.</th>
                          <th scope="col">ReceiptId</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Entry By</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>R26661</td>
                          <td>3000</td>
                          <td>receptionist</td>
                          <td>23 feb 2023</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>R26661</td>
                          <td>3000</td>
                          <td>receptionist</td>
                          <td>23 feb 2023</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>R26661</td>
                          <td>3000</td>
                          <td>receptionist</td>
                          <td>23 feb 2023</td>
                        </tr>
                      </tbody>
                    </table>
                  </table>
                </div>

                <div className="col-sm-11 col-md-11 col-lg-6 col-xl-6">
                  <table class="table table-bordered border-primary">
                    <div className="d-flex justify-content-center">
                      <button type="button" class="btn btn-outline-primary">
                        Expenses
                      </button>
                    </div>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">S.No.</th>
                          <th scope="col">Title</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Entry By</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Equpments</td>
                          <td>5500</td>
                          <td>receptionist</td>
                          <td>22 feb 2023</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Medicine</td>
                          <td>2000</td>
                          <td>receptionist</td>
                          <td>22 feb 2023</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Rct chair</td>
                          <td>5000</td>
                          <td>receptionist</td>
                          <td>22 feb 2023</td>
                        </tr>
                      </tbody>
                    </table>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FinancialTables;

const Container = styled.div`
  nav {
    background-color: #e3f2fd;
  }
`;
