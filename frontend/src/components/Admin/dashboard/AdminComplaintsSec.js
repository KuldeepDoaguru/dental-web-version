import React from "react";
import styled from "styled-components";

const AdminComplaintsSec = () => {
  return (
    <>
      <Container>
        <div className="container-fluid main-cont">
          <h3 className="text-center">Employees Complaints</h3>
          <div class="table-responsive rounded">
            <table class="table table-bordered rounded shadow">
              <thead className="table-head">
                <tr>
                  <th className="table-sno">EMP_id</th>
                  <th className="table-small">Employee Name</th>
                  <th className="table-small">Complain Message</th>
                  <th className="table-small">Complain Date & Time</th>
                  <th>Status</th>
                  <th className="table-small">Solution Date</th>
                  <th className="table-small">Pending Since</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
                <tr className="table-row">
                  <td className="table-sno">1</td>

                  <td className="table-small">Shubham patel</td>
                  <td className="table-small">
                    We are not getting tea 10 times in a day
                  </td>
                  <td className="table-small">12/12/2024 12:00pm</td>
                  <td>solved</td>
                  <td>12/12/2024</td>
                  <td>9 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminComplaintsSec;
const Container = styled.div`
  .main-cont {
    .table-responsive {
      height: 32rem;
      overflow: auto;
    }
  }

  th {
    background-color: #1abc9c;
    color: white;
  }
`;
