import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import animationData from "../animation/loading-effect.json";
import Lottie from "react-lottie";


const OpdBills = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const branch = user.branch_name;
  const [loading, setLoading] = useState(false);
  
  const [appointmentList, setAppointmentList] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getAppointList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dentalguruadmin.doaguru.com/api/v1/admin/getAppointmentData/${branch}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setLoading(false);
        setAppointmentList(response.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getAppointList();
  }, [branch]);

 

  const todayDate = new Date();

  // Get year, month, and date
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate.slice(0, 7));

  useEffect(() => {
    setCurrentPage(0);
  }, [keyword]);

  console.log(appointmentList);

  const filterOpd = appointmentList?.filter((item) => {
    return item.treatment_provided === "OPD";
  });

  const searchFilter = filterOpd.filter((lab) =>
    lab.patient_name.toLowerCase().includes(keyword.toLowerCase())
  );

  const billPerPage = 10;

  const totalPages = Math.ceil(searchFilter.length / billPerPage);

  const filterAppointDataByMonth = () => {
    const startIndex = currentPage * billPerPage;
    const endIndex = startIndex + billPerPage;
    return searchFilter?.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const displayedAppointments = filterAppointDataByMonth();

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between">
          <div>
            <input
              type="text"
              placeholder="Search Patient Name"
              className=""
              value={keyword}
              onChange={(e) => setkeyword(e.target.value.toLowerCase())}
            />
          </div>
        </div>

        {loading ? (
            <Lottie options={defaultOptions} height={300} width={400}></Lottie>
          ) : (
            <>
         
            {displayedAppointments?.length > 0 ? (
              <>
                <div class="table-responsive rounded mt-4">
                  <table class="table table-bordered rounded shadow">
                    <thead className="table-head">
                      <tr>
                        <th className="table-sno">Bill ID</th>
                        <th>Bill Date</th>
                        <th className="table-small">Patient UHID</th>
                        <th className="table-small">Patient Name</th>
                        <th className="table-small">OPD Amount</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedAppointments?.map((item) => (
                        <>
                          <tr className="table-row">
                            <td className="table-sno">{item.appoint_id}</td>
                            <td className="table-small">
                              {item.appointment_dateTime?.split("T")[0]}
                            </td>
                            <td className="table-small">
                              <Link
                                to={`/patient-profile/${item.patient_uhid}`}
                                style={{ textDecoration: "none" }}
                              >
                                {item.patient_uhid}
                              </Link>
                            </td>
                            <td className="table-small">{item.patient_name}</td>
                            <td className="table-small">{item.opd_amount}</td>
                            <td>{item.payment_Status}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                <PaginationContainer>
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </PaginationContainer>
              </>
            ) : (
              <>
                <h1>No Bill Found</h1>
              </>
            )}
  </>
          )}

         
      </Container>
    </>
  );
};

export default OpdBills;
const Container = styled.div``;

const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    padding: 10px;
    list-style: none;
    border-radius: 5px;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination li a {
    display: block;
    padding: 8px 16px;
    border: 1px solid black;
    color: #007bff;
    cursor: pointer;
    text-decoration: none;
  }

  .pagination li.active a {
    background-color: #007bff;
    color: white;
    border: 1px solid #007bff;
  }

  .pagination li.disabled a {
    color: #ddd;
    cursor: not-allowed;
  }

  .pagination li a:hover:not(.active) {
    background-color: #ddd;
  }
`;