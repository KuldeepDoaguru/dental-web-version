import logo from "./logo.svg";
import "./App.css";
import React from 'react'
import Registration from "./components/receptionist/Registration";
import Login from "./components/receptionist/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/superAdmin/Dashboard";
import UniversalLogin from "./pages/UniversalLogin";


import Receptionistdash from './pages/receptionist/Receptioinstdash'
import PatientProfile from './pages/receptionist/PatientProfile'
import AllPatient from './pages/receptionist/AllPatient'
import AppointmentSection from './pages/receptionist/AppointmentSection'
import EditPopup from './components/receptionist/Appointment/EditPopup'
import ModifyPopup from './components/receptionist/Appointment/ModifyPopup'
import DeletePopup from './components/receptionist/Appointment/DeletePopup'
import BillSection from './pages/receptionist/BillSection'
import DoctorSection from './pages/receptionist/DoctorSection'
import Doctorprofile from './components/receptionist/DoctorSection/Doctorprofile'
import VideoSection from './pages/receptionist/VideoSection'
import LabSection from './pages/receptionist/LabSection'
import ReportSection from './pages/receptionist/ReportSection'
import NewPatient from './pages/receptionist/NewPatient'

function App() {
  return (
    <Routes>
      
      <Route path="/superadmin-dashboard" element={<Dashboard />} />
      <Route path="/" element={<UniversalLogin />} />

      {/* receptionist routes start */}
      <Route path="/receptionist_login" element={<Login />} />
      <Route path="/receptionist_registration" element={<Registration />} />
      <Route path='/receptionist-dashboard' Component={Receptionistdash}/>
    <Route path='/all_patient' Component={AllPatient}/>
    <Route path='/patient_profile' Component={PatientProfile}/>
    <Route path='/appointment' Component={AppointmentSection}/>
    <Route path='/edit_appointment' Component={EditPopup}/>
    <Route path='/modify_appointment' Component={ModifyPopup}/>
    <Route path='/delete_appointment' Component={DeletePopup}/>
    <Route path='/bill_section' Component={BillSection}/>
    <Route path='/doctor_section' Component={DoctorSection}/>
    <Route path='/doctor_profile' Component={Doctorprofile}/>
    <Route path='/video' Component={VideoSection}/>
    <Route path='/lab' Component={LabSection}/>
    <Route path='/report' Component={ReportSection}/>
    <Route path='/new_patient' Component={NewPatient}/>

    {/* receptionist routes end */}
    </Routes>
  );
}

export default App;
