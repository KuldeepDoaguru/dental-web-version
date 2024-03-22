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
import Inquiry from "./pages/receptionist/Inquiry";
import { useSelector } from "react-redux";
import PrintOpdBill from "./components/receptionist/ReceptioinstDashboard/PrintOpdBill";
import OpdCollection from "./pages/receptionist/OpdColletion";
import Profile from "./pages/receptionist/Profile";

function App() {

  const user = useSelector((state) => state.user);
  return (
    <Routes>
      
      <Route path="/superadmin-dashboard" element={<Dashboard />} />
      <Route path="/" element={<UniversalLogin />} />

      {/* receptionist routes start */}
      <Route path="/receptionist_login" element={<UniversalLogin/>} />
      <Route path="/receptionist_registration" element={<Registration />} />
      <Route path='/receptionist-dashboard' element={ user.currentUser=== null ? <UniversalLogin/>  : <Receptionistdash/>}/>
    <Route path='/all_patient' element={user.currentUser=== null ? <UniversalLogin/>  :<AllPatient/>}/>
    <Route path='/inquiry' element={user.currentUser=== null ? <UniversalLogin/>  :<Inquiry/>}/>
    <Route path='/patient_profile/:pid' element={user.currentUser=== null ? <UniversalLogin/>  : <PatientProfile/>}/>
    <Route path='/print_Opd_Reciept/:appointmentId' element={user.currentUser=== null ? <UniversalLogin/>  : <PrintOpdBill/>}/>
    <Route path='/appointment' element={user.currentUser=== null ? <UniversalLogin/>  : <AppointmentSection/>}/>
    <Route path='/edit_appointment' element={user.currentUser=== null ? <UniversalLogin/>  : <EditPopup/>}/>
    <Route path='/modify_appointment' element={user.currentUser=== null ? <UniversalLogin/>  : <ModifyPopup/>}/>
    <Route path='/delete_appointment' element={user.currentUser=== null ? <UniversalLogin/>  : <DeletePopup/>}/>
    <Route path='/bill_section' element={user.currentUser=== null ? <UniversalLogin/>  : <BillSection/>}/>
    <Route path='/doctor_section' element={user.currentUser=== null ? <UniversalLogin/>  : <DoctorSection/>}/>
    <Route path='/doctor_profile' element={user.currentUser=== null ? <UniversalLogin/>  : <Doctorprofile/>}/>
    <Route path='/video' element={user.currentUser=== null ? <UniversalLogin/>  : <VideoSection/>}/>
    <Route path='/lab' element={user.currentUser=== null ? <UniversalLogin/>  : <LabSection/>}/>
    <Route path='/report' element={user.currentUser=== null ? <UniversalLogin/>  : <ReportSection/>}/>
    <Route path='/new_patient' element={user.currentUser=== null ? <UniversalLogin/>  : <NewPatient/>}/>
    <Route path='/opd_collection' element={user.currentUser=== null ? <UniversalLogin/>  :<OpdCollection/>}/>
    <Route path='/receptionist_profile' element={ user.currentUser=== null ? <UniversalLogin/>  :<Profile/>}/>

    {/* receptionist routes end */}
    </Routes>
  );
}

export default App;
