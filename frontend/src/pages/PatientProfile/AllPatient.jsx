import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Lottie from "react-lottie";
import animationData from "../../pages/loading-effect.json";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import ReactPaginate from "react-paginate";

function AllPatient() {
  const user = useSelector((state) => state.user);
  const branch = user.branch;
  const token = user?.token;
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyword, setkeyword] = useState("");
  const complaintsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const getPatient = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/get-Patients/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setPatients(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatient();
  }, []);

  console.log(patients);

  useEffect(() => {
    setCurrentPage(0);
  }, [keyword]);

  const searchFilter = patients.filter((lab) => {
    const keywordLowerCase = keyword.toLowerCase().trim();
    return (
      lab.patient_name.toLowerCase().includes(keywordLowerCase) ||
      lab.mobileno.toLowerCase().includes(keywordLowerCase) ||
      lab.uhid.toLowerCase().includes(keywordLowerCase)
    );
  });

  const totalPages = Math.ceil(searchFilter.length / complaintsPerPage);

  const filterAppointDataByMonth = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return searchFilter?.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedAppointments = filterAppointDataByMonth();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Wrapper>
      <div className="header">
        <Header />
      </div>

      <div className="row flex-nowrap ">
        <div className="col-lg-1 col-1" id="hd">
          <Sider />
        </div>

        <div className="col-lg-11 mt-2" id="set">
          <div className="text-center">
            <h3>All Patients</h3>
          </div>
          <div className="row">
            <div className="col-lg-12 col-sm-10 " id="head">
              <nav
                class=" shadow rounded
    navbar navbar-light bg-light"
              >
                <h6 className="mx-3 my-1 my-md-0">Search By Patient</h6>
                <div class="container-fluid" id="cont">
                  <form class="navbar1 ">
                    <input
                      className="form-control me-2 rounded-5"
                      type="search"
                      placeholder="Enter Patient Name or Mobile or Id"
                      aria-label="Search"
                      value={keyword}
                      onChange={(e) => setkeyword(e.target.value.toLowerCase())}
                    />
                    {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
                  </form>
                  <div></div>
                  <div>
                    <h5>Total Patients - {patients.length}</h5>
                  </div>
                </div>
              </nav>
            </div>

            <div className="col-lg-12 table">
              <div
                className="widget-area-2 proclinic-box-shadow  mt-5"
                id="tableres"
              >
                {loading ? (
                  <LottieWrapper>
                    <Lottie
                      options={defaultOptions}
                      height={300}
                      width={400}
                      style={{ background: "transparent" }}
                    ></Lottie>
                  </LottieWrapper>
                ) : (
                  <div className="table-responsive">
                    <>
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Patient Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Patient Type</th>
                            <th>Address</th>
                            <th>Created At</th>
                          </tr>
                        </thead>
                        {displayedAppointments.length === 0 ? (
                          <div className="no-data-container">
                            <h4>No Data Found</h4>
                          </div>
                        ) : (
                          <tbody>
                            {displayedAppointments?.map((data, index) => (
                              <tr key={index}>
                                <td>
                                  <Link to={`/patient_profile/${data.uhid}`}>
                                    {data.uhid}
                                  </Link>
                                </td>
                                <td>{data.patient_name}</td>
                                <td>{data.mobileno}</td>
                                <td>{data.emailid}</td>

                                <td>{data.gender}</td>
                                <td>{data.age}</td>
                                <td>{data.patient_type}</td>
                                <td>{data.address}</td>
                                <td>
                                  {moment(data?.created_at).format(
                                    "DD/MM/YYYY"
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </table>
                    </>
                  </div>
                )}
              </div>
            </div>
            <PaginationContainer>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </PaginationContainer>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default AllPatient;
const Wrapper = styled.div`
  overflow: hidden;

  .navbar1 {
    display: flex;
    width: 25%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  #cont {
    display: flex;
    @media screen and (max-width: 768px) {
      /* flex-direction: column; */
      gap: 1rem;
    }
  }
  #drop {
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  #head {
    @media screen and (max-width: 768px) {
      width: 98%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      margin: auto;
      width: 100%;
    }
    @media screen and (min-width: 1500px) and (max-width: 2000px) {
      width: 98%;
    }
    @media screen and (min-width: 2000px) and (max-width: 2500px) {
      width: 98%;
    }
  }

  #set {
    margin-left: -4.5rem;
    padding-left: 150px; /* Width of sidebar */
    padding-top: 90px; /* Height of header */
    flex-grow: 1;
    overflow-y: auto;

    @media screen and (max-width: 768px) {
      margin-left: -2rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      margin-left: -1rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
      margin-left: -1.5rem;
    }
    @media screen and (min-width: 1500px) and (max-width: 1700px) {
      margin-left: 0.1rem;
    }
    @media screen and (min-width: 1700px) and (max-width: 2000px) {
      margin-left: 0.1rem;
    }

    @media screen and (min-width: 2000px) and (max-width: 2500px) {
      margin-left: 0rem;
    }
  }

  #hd {
    padding-top: 60px; /* Height of header */
    min-height: 100vh;
    position: fixed;

    @media screen and (max-width: 768px) {
      height: 68rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      height: 58rem;
    }
  }
  #tableres {
    @media screen and (max-width: 768px) {
      width: auto;
      margin: auto;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: auto;
      margin: auto;
    }
    @media screen and (min-width: 1500px) and (max-width: 2000px) {
      width: 98%;
    }
    @media screen and (min-width: 2000px) and (max-width: 2500px) {
      width: 98%;
    }
  }
  th {
    background-color: #201658;
    color: white;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }

  .pagination {
    background-color: transparent;
  }

  .header {
    position: fixed;
    min-width: 100%;
    z-index: 100;
  }
  .table-responsive {
    position: relative;
    min-height: 10rem;
  }

  .loading-container,
  .no-data-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px; /* Adjust as necessary */
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .no-data-container h4 {
    margin: 0;
  }
`;
const LottieWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  height: 100%;
`;

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
