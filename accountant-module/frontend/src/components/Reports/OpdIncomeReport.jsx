import React from "react";
import styled from "styled-components";

const OpdIncomeReport = () => {
  return (
    <>
      <Container>
        <div className="container">
          <div className="container">
            <div class="table-responsive mt-4">
              <div className="d-flex justify-content-between mb-2">
                <form>
                  <div className="d-flex justify-content-between">
                    <div>
                      <input
                        type="date"
                        name=""
                        id=""
                        className="p-2 rounded"
                        // onChange={(e) =>
                        //   setFromDate(e.target.value)
                        // }
                      />
                    </div>
                    <div className="mx-2">To</div>
                    <div>
                      <input
                        type="date"
                        name=""
                        id=""
                        className="p-2 rounded"
                        // onChange={(e) => setToDate(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-warning mx-2">
                      Download Report
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="container-fluid mt-1 rounded"
                style={{ overflowX: "auto" }}
              >
                <div class="table-responsive rounded">
                  <table class="table table-bordered rounded shadow">
                    <thead className="table-head">
                      <tr>
                        <th className="thead">ID</th>
                        <th className="thead">Bill Date</th>
                        <th className="thead">UHID</th>
                        <th className="thead">Branch</th>
                        <th className="thead">Patient Name</th>
                        <th className="thead">Patient Number</th>
                        <th className="thead">Assigned Doctor</th>
                        <th className="thead">Treatment</th>
                        <th className="thead">Total Amount</th>
                        <th className="thead">Paid Amount</th>
                        <th className="thead">Pending Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-row">
                        <td className="thead">1</td>
                        <td className="thead">18-03-2024</td>
                        <td className="thead">1</td>
                        <td className="thead">DHID001</td>
                        <td className="thead">Shubham Singh</td>
                        <td className="thead">8602161019</td>
                        <td className="thead">Mohit</td>
                        <td className="thead">10000</td>
                        <td className="thead">Paid</td>
                        <td className="thead">5000</td>
                        <td className="thead">0</td>
                      </tr>
                      <tr className="table-row">
                        <td className="thead">1</td>
                        <td className="thead">18-03-2024</td>
                        <td className="thead">1</td>
                        <td className="thead">DHID001</td>
                        <td className="thead">Shubham Singh</td>
                        <td className="thead">8602161019</td>
                        <td className="thead">Mohit</td>
                        <td className="thead">10000</td>
                        <td className="thead">Paid</td>
                        <td className="thead">5000</td>
                        <td className="thead">0</td>
                      </tr>
                    </tbody>
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

export default OpdIncomeReport;
const Container = styled.div``;
