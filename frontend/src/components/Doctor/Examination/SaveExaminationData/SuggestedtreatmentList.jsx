import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SittingProcessModal from "./SittingProcessModal";
import EditAppointment from "../../Treatment Suggestion/EditAppointment";

const SuggestedtreatmentList = ({ tpid, getPatientData }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { refreshTable, currentUser } = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  const [treatList, setTreatList] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [showBookPopup, setShowBookPopup] = useState(false);


  const getListTreatment = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getTreatList/${branch}/${tpid}`
      );
      setTreatList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListTreatment();
  }, [refreshTable]);

  console.log(treatList);

  const handleShowTreatProcess = (item) => {
    setSelectedData(item);
    setShowEditPopup(true);
  };

  const openBookAppoint = () =>{
    setShowEditPopup(false);
    setShowBookPopup(true);
  }

  return (
    <>
      <Container>
        <div className="box">
          <div className="table-responsive">
            <table
              className="table table-bordered table-striped border"
              style={{ overflowX: "scroll" }}
            >
              <thead>
                <tr>
                  <th>TS_ID</th>
                  <th>TP_ID</th>
                  <th>Appoint ID</th>
                  <th>UHID</th>
                  <th>Treatment</th>
                  <th>Total Cost</th>
                  <th>Current Sitting</th>
                  <th>Total Req. Sitting</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {treatList?.map((item) => (
                  <>
                    <tr>
                      <td>{item.ts_id}</td>
                      <td>{item.tp_id}</td>
                      <td>{item.appoint_id}</td>
                      <td>{item.p_uhid}</td>
                      <td>{item.treatment_name}</td>
                      <td>{item.totalCost}</td>
                      <td>{item.treatment_sitting}</td>
                      <td>{item.total_sitting}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleShowTreatProcess(item)}
                        >
                          Start
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          {showEditPopup && (
            <SittingProcessModal
              onClose={() => setShowEditPopup(false)}
              selectedData={selectedData}
              openBookAppoint={openBookAppoint}
            />
          )}
          {showBookPopup && <EditAppointment onClose={() => setShowBookPopup(false)} getPatientData={getPatientData} />}
        </div>
      </Container>
    </>
  );
};

export default SuggestedtreatmentList;
const Container = styled.div``;
