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
import PediatricDental from "./components/Doctor/Examination/PediatricDental";
import ExaminationDashTwo from "./components/Doctor/Examination/ExaminationDashTwo";
import ExaminationPatient from "./components/Doctor/Examination/ExaminationPatient";
import ExaminationDashBoardPatient from "./components/Doctor/Examination/ExaminationDashBoardPatient";
import ExaminationDashBoardPediatric from "./components/Doctor/Examination/ExaminationDashBoardPediatric";
import TreatmentDashBoard from "./components/Doctor/Treatment/TreatmentDashBoard";
import PrescriptionDashBoard from "./components/Doctor/Prescription/PrescriptionDashBoard";
import CreatePrescrip from "./components/Doctor/Prescription/CreatePrescrip";
import TPrescription from "./components/Doctor/Prescription/TreatmentPrescription/TPrescription";
import TPrescriptionDash from "./components/Doctor/Prescription/TreatmentPrescription/TPrescriptionDash";
import HistoryDashBoard from "./components/Doctor/HistoryFolder/HistoryDashBoard";
import HeadBar from "./components/Doctor/HeadBar";
import DoctorLogin from "./components/Doctor/Login/DoctorLogin";

function App() {
  return (
    <Routes>
      <Route path="/receptionist_login" element={<Login />} />
      <Route path="/receptionist_registration" element={<Registration />} />
      <Route path="/superadmin-dashboard" element={<Dashboard />} />
      <Route path="/UniversalLogin" element={<UniversalLogin />} />

      {/* ************** Doctor Routes Start Here ******************* */}
      <Route path="/" element={<DoctorLogin />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      
      <Route path="/card" element={<Card />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profileDashboard" element={<ProfileDashboard />} /> 
      <Route path="/appointTable" element={<AppointTable />} />
      <Route path="/all-appoint" element={<AllAppoint />} />
      <Route path="/Patient-profile" element={<PatientProfile />} />
      <Route path="/all-patient" element={<AllPatient />} />
      <Route path="/examination-Dashboard/:id" element={<ExaminationDashBoard />} />
      <Route path="/PediatricDental" element={<PediatricDental />} />
      <Route path="/ExaminationDashTwo" element={<ExaminationDashTwo />} />
      <Route path="/ExaminationPatient" element={<ExaminationPatient />} />
      <Route path="/ExaminationDashBoardPatient/:id" element={<ExaminationDashBoardPatient />} />
      <Route path="/ExaminationDashBoardPediatric/:id" element={<ExaminationDashBoardPediatric />} />
      <Route path="/TreatmentDashBoard/:id" element={<TreatmentDashBoard />} />
      <Route path="/PrescriptionDashBoard" element={<PrescriptionDashBoard />} />
      <Route path="/CreatePrescrip" element={<CreatePrescrip />} />
      <Route path="/TPrescription" element={<TPrescription />} />
      <Route path="/TPrescriptionDash" element={<TPrescriptionDash />} />
      <Route path="/HistoryDashBoard" element={<HistoryDashBoard />} />
      {/* test */}
      <Route path="/HeadBar" element={<HeadBar />} />

      {/* ****************** Doctor Routes End Here ******************* */}
    </Routes>
  );
}

export default App;
