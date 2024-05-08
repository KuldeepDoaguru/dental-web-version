import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/MainComponents/Header";
import Sider from "../../components/MainComponents/Sider";
import { IoArrowBackSharp } from "react-icons/io5";
import { Button } from "react-bootstrap";

const History = ({ data }) => {
  const goBack = () => {
    window.history.go(-1);
  };

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/BloodTest/${id}`);
  };

  const equipmentList = [
    {
      id: 1,
      idx: "1",
      uhid: "44FF78",
      name: "Pragya",
      testperform: "Allergy Test",
      status: "Mohit Sahu",
      Drname: "Dr.Rohit Patel",
      CallectionDate: ["18/04/2024"],
      TestedDate: ["20/04/2024"],
      ReportDate: ["22/04/2024"],
    },
    {
      id: 2,
      idx: "2",
      uhid: "74GG54",
      name: "Vinay Dhariya",
      testperform: "CBC Test",
      status: "Mohit Sahu",
      Drname: "Dr.Rama Patel",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },

    {
      id: 3,
      idx: "3",
      uhid: "External",
      name: "Sourabh Mishra",
      testperform: "Allergy Test",
      status: "Raja Ram Patel",
      Drname: " ",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },
    {
      id: 4,
      idx: "4",
      uhid: "External",
      name: "Shubhanshu JAiswal",
      testperform: "Bitewing X-rays",
      status: "Mohit Sahu",
      Drname: " ",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },
    {
      id: 5,
      idx: "5",
      uhid: "65DC85",
      name: "Shivansh Sen",
      testperform: "M C H C Test",
      status: "Anurag Dubey",
      Drname: "Aman Sharma",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },
    {
      id: 6,
      idx: "6",
      uhid: "87TG55",
      name: "shubham Yadav",
      testperform: "Allergy Test",
      status: "Anurag Dubey",
      Drname: "Dr. Raja Patel",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },
    {
      id: 7,
      idx: "7",
      uhid: "98DG56",
      name: "Satyam ",
      testperform: "Bitewing X-rays",
      status: "Raja Ram Patel",
      Drname: "Dr.Abhishek Gupta",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },
    {
      id: 8,
      idx: "8",
      uhid: "33KM78",
      name: "Durga Sen",
      testperform: "Cone Beam Computed Tomography (CBCT)",
      status: "Anurag Dubey",
      Drname: "Dr.Amit Kewat",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },
    {
      id: 9,
      idx: "9",
      uhid: "96JK32",
      name: "Gouri ",
      testperform: "Bitewing X-rays",
      status: "Mohit Sahu",
      Drname: "Dr.Amit Kewat",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },
    {
      id: 10,
      idx: "10",
      uhid: "65JH25",
      name: "Shubhanshu JAiswal",
      testperform: "Sencivity",
      status: "Raja Ram Patel",
      Drname: "Dr.A Sharma",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },
    {
      id: 11,
      idx: "11",
      uhid: "87YU45",
      name: "Alka Patel",
      Drname: "Aman Sharma",
      testperform: "M C H C Test",
      status: "Raja Ram Patel",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },
    {
      id: 12,
      idx: "12",
      uhid: "54TG74",
      name: "Arun Gupta",
      Drname: "Aman Sharma",
      testperform: "CBC Test",
      status: "Anurag Dubey",
      CallectionDate: ["20/04/2024"],
      TestedDate: ["21/04/2024"],
      ReportDate: ["22/04/2024"],
    },
  ];
  const [sorted, setSorted] = useState(equipmentList);
  const [inp, setInp] = useState();

  const handleSearch = () => {
    let newArr = sorted.filter((patient) => {
      let searchWork = inp.toLowerCase();
      for (let prop in patient) {
        let word = patient[prop].toString().toLowerCase();
        if (word.includes(searchWork)) {
          return true;
        }
      }
      return false;
    });
    setSorted(newArr);
  };

  const handleSort = () => {
    let newArr = [...sorted].sort((a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    setSorted(newArr);
  };

  return (
    <>
      <Wrapper>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-1 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 p-0">
                <IoArrowBackSharp
                  className="fs-1 text-black d-print-none"
                  onClick={goBack}
                />
                <div className="container">
                  <div className="row mt-4">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h2 className="mt-4 "> All Reports </h2>
                      </div>
                      <div>
                        {" "}
                        <th className="d-flex gap-2">
                          <input
                            className="rounded"
                            onChange={(e) => setInp(e.target.value)}
                            value={inp}
                          />
                          <button
                            type="button"
                            class="btn text-light"
                            style={{ backgroundColor: "#213555" }}
                            onClick={handleSearch}
                          >
                            search
                          </button>
                          <button
                            type="button"
                            class="btn py-2 px-4 text-light"
                            style={{ backgroundColor: "#213555" }}
                            onClick={handleSort}
                          >
                            sort
                          </button>
                        </th>
                      </div>
                    </div>

                    <table className="table tables table-bordered shadow text-center mt-4">
                      <thead className="table-primary  rounded">
                        <tr>
                          <th scope="col" style={{ width: "5%" }}>
                            Sr.
                          </th>
                          <th
                            scope="col"
                            style={{ width: "15%" }}
                            onClick={handleSort}
                          >
                            UHID / External
                          </th>

                          <th
                            scope="col"
                            style={{ width: "20%" }}
                            onClick={handleSort}
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            style={{ width: "20%" }}
                            onClick={handleSort}
                          >
                            DR. Assigned By
                          </th>

                          <th scope="col" style={{ width: "15%" }}>
                            Test perform
                          </th>
                          <th scope="col" style={{ width: "15%" }}>
                            Test perform By
                          </th>

                          <th scope="col" style={{ width: "10%" }}>
                            Report Date
                          </th>
                          <th scope="col" style={{ width: "10%" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sorted.map((patient, index) => (
                          <tr
                            className="custom-cursor-pointer"
                            key={patient.id}
                            onClick={() => handleClick(patient.id)}
                          >
                            <td>{index + 1}</td>
                            <td>{patient.uhid}</td>
                            <td>{patient.name}</td>
                            <td>{patient.Drname}</td>
                            <td>{patient.testperform}</td>
                            <td>{patient.status}</td>
                            <td>{patient.ReportDate}</td>
                            <td>
                              <Button
                                className="mx-2 d-print-none py-2 px-4"
                                style={{ backgroundColor: "#213555" }}
                                // onClick={() => editEntry(item, index)}
                              >
                                Print
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default History;

const Wrapper = styled.div`
  .container {
    cursor: pointer;
    height: 42%;
    overflow-y: auto;
  }
`;
