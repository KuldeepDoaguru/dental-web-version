import "./App.css";
import Registration from "./components/receptionist/Registration";
import Login from "./components/receptionist/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/superAdmin/Dashboard";
import UniversalLogin from "./pages/UniversalLogin";
import DoctorDashboard from "./pages/DoctorPage/DoctorDashboard";
import Card from "./components/Doctor/Card/Card";
import Profile from "./components/Doctor/Profile/Profile";
import ProfileDashboard from "./components/Doctor/Profile/ProfileDashboard";
import AppointTable from "./components/Doctor/Tables/AppointTable";
import AllAppoint from "./components/Doctor/Appointment/AllAppoint";
import PatientProfile from "./pages/DoctorPage/PatientProfile";
import AllPatient from "./pages/DoctorPage/AllPatient";
import ExaminationDashBoard from "./components/Doctor/Examination/ExaminationDashBoard";

function App() {
  return (
    <Routes>
      <Route path="/receptionist_login" element={<Login />} />
      <Route path="/receptionist_registration" element={<Registration />} />
      <Route path="/superadmin-dashboard" element={<Dashboard />} />
      <Route path="/" element={<UniversalLogin />} />

      {/* Doctor Routes start here  */}
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/card" element={<Card />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profileDashboard" element={<ProfileDashboard />} />
      <Route path="/appointTable" element={<AppointTable />} />
      <Route path="/appointTable" element={<AppointTable />} />
      <Route path="/all-appoint" element={<AllAppoint />} />
      <Route path="/Patient-profile" element={<PatientProfile />} />
      <Route path="/all-patient" element={<AllPatient />} />
      <Route path="/examination-Dashboard" element={<ExaminationDashBoard />} />
      {/* Doctor Routes end here  */}
    </Routes>
  );
}

export default App;
