import React, { useState } from "react";
import styled from "styled-components";
import PrescDoctorDetails from "./PrescDoctorDetails";
import PrescriptionType from "./PrescriptionType";
import PrescriptionTypes from "./PrescriptionTypes";
import PrescriptionFooter from "./PrescriptionFooter";
import PrescriptionHead from "./PrescriptionHead";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";
import { IoPlayBackOutline } from "react-icons/io5";

const CreatePrescrip = () => {
  const [showPrescription, setShowPrescription] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: "",
    patientAgeSex: "",
    dateOfVisit: "",
    cc: "",
    mh: "",
    dh: "",
    oe: "",
    adv: "",
    rx: ""
  });

  const handleInput = (e) => {
    setPrescriptionData({ ...prescriptionData, [e.target.name]: e.target.value });
    console.log(prescriptionData);
  };
  return (
    <>
      <Wrapper>
        {showPrescription ?
          (
            <div>
              <PrescriptionHead />
              <div className="container-fluid m-0 p-0">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="shadow-none p-3">
                      <PrescDoctorDetails />
                      <hr />
                      <PrescriptionType  patientName={prescriptionData.patientName}
                      patientAgeSex={prescriptionData.patientAgeSex}
                      dateOfVisit={prescriptionData.dateOfVisit}/>
                      <PrescriptionTypes cc={prescriptionData.cc} mh= {prescriptionData.mh} dh= {prescriptionData.dh} oe={prescriptionData.oe} adv={prescriptionData.adv} rx={prescriptionData.rx}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prescFooter"><PrescriptionFooter /></div>
              <div className="m-3 text-center">
              <button className="btn btn-primary no-print mx-3" onClick={() => window.print()}><MdLocalPrintshop size={25}/></button>
              <button className="btn btn-secondary no-print mx-3" onClick={() => setShowPrescription(false)}><IoIosArrowRoundBack size={25}/>Edit Prescription</button>
              </div>
            </div>

          ) : (
            <div className="container">
              <div className="row">
                <div className="d-flex justify-content-between mt-4 mb-4">
              <h2 className="text-center">Create Prescription</h2>
                <button className="btn btn-secondary" onClick={()=>window.history.back()}title="Back"><IoPlayBackOutline size={25}/></button>
              </div>
                <form>
                  <div class="row mb-4">
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                        <input type="text" id="" name="patientName" value={prescriptionData.patientName} class="form-control" onChange={handleInput} placeholder="Patient name" />
                      </div>
                    </div>
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                        <input type="text" id="" name="patientAgeSex" class="form-control" value={prescriptionData.patientAgeSex} onChange={handleInput} placeholder="Age/Sex" />
                      </div>
                    </div>
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                        <input type="date" id="" name="dateOfVisit" value={prescriptionData.dateOfVisit} onChange={handleInput} class="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div data-mdb-input-init class="form-outline mb-4">
                      <input type="text" id="" 
                      name="cc" value={prescriptionData.cc} class="form-control" onChange={handleInput} placeholder="Chief Complaint"/>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input type="text" id="" 
                      name="mh" value={prescriptionData.mh} class="form-control" onChange={handleInput} placeholder="Medical History"/>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input type="text" id="" name="dh"  class="form-control" value={prescriptionData.dh} onChange={handleInput} placeholder="Dental History"/>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input type="text" id="" name="oe" class="form-control" value={prescriptionData.oe} onChange={handleInput} placeholder="On Examination"/>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input type="text" id="" 
                      name="adv" value={prescriptionData.adv} class="form-control" onChange={handleInput}  placeholder="Advice"/>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input type="text" id=""
                      value={prescriptionData.rx} class="form-control" name="rx" onChange={handleInput} placeholder="Medical Prescription"/>
                    </div>
                  </div>
                </form>
                <button className="btn btn-secondary w-25" onClick={() => setShowPrescription(true)}>Preview Prescription <IoIosArrowRoundForward size={25}/></button>
              </div>
            </div>
          )}
      </Wrapper>
    </>
  );
};

export default CreatePrescrip;
const Wrapper = styled.div`
@media print {
  .no-print {
    display: none !important;
  }
}
@media print {
  @page {
    margin: 0; /* Remove default page margins */
  }

  body {
    margin: 0; /* Ensure no margin on the body */
  }

  .container-fluid {
    width: 100%; /* Optionally set the width */
    margin: 0; /* Remove margin */
    padding: 0; /* Remove padding */
    page-break-before: auto;
  }
}

/* @media print {
  .container-fluid{
    width: 100%;
    margin: 0 !important;
    padding: 0 !important;
    border: none;
    page-break-before: auto;
  }
} */

@media print {
  .prescFooter{
    width: 100%;
    margin: 0;
    padding: 0;
    position: fixed;
    bottom: 0;
    left: 0;  
  }
}

`;
