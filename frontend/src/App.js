import "./App.css";
import Registration from "./components/receptionist/Registration";
import Login from "./components/receptionist/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/superAdmin/Dashboard";
import UniversalLogin from "./pages/UniversalLogin";
import DoctorDashboard from "./pages/DoctorPage/DoctorDashboard";
import ProfileDashboard from "./components/Doctor/Profile/ProfileDashboard";
import PatientProfile from "./pages/DoctorPage/PatientProfile";
import AllPatient from "./pages/DoctorPage/AllPatient";
import ExaminationDashBoard from "./components/Doctor/Examination/ExaminationDashBoard";
import ExaminationDashBoardPatient from "./components/Doctor/Examination/ExaminationDashBoardPatient";
import ExaminationDashBoardPediatric from "./components/Doctor/Examination/ExaminationDashBoardPediatric";
import TreatmentDashBoard from "./components/Doctor/Treatment/TreatmentDashBoard";
import PrescriptionDashBoard from "./components/Doctor/Prescription/PrescriptionDashBoard";
import TPrescription from "./components/Doctor/Prescription/TreatmentPrescription/TPrescription";
import TPrescriptionDash from "./components/Doctor/Prescription/TreatmentPrescription/TPrescriptionDash";
import DoctorLogin from "./components/Doctor/Login/DoctorLogin";
import NewTreatment from "./components/Doctor/Treatment/NewTreatment";
import TreatmentForm from "./components/Doctor/Treatment/TreatmentForm";
import TreatmentDashTwo from "./components/Doctor/Treatment/TreatmentDashTwo";
import NewTreatPrescription from "./components/Doctor/Prescription/TreatmentPrescription/NewTreatPrescription";
import ViewTreatPrescription from "./components/Doctor/Prescription/TreatmentPrescription/ViewTreatPrescription";
import TreatSuggestDashs from "./components/Doctor/Treatment Suggestion/TreatSuggestDashs";
import SecurityAmount from "./components/Doctor/Treatment Suggestion/SecurityAmount";
import PrintSecurityAmt from "./components/Doctor/Treatment Suggestion/PrintSecurityAmt";
import CreatePrescrip from "./components/Doctor/Prescription/CreatePrescrip";

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
      <Route path="/examination-Dashboard/:id" element={<ExaminationDashBoard />} />
      <Route path="/ExaminationDashBoardPatient/:id" element={<ExaminationDashBoardPatient />} />
      <Route path="/ExaminationDashBoardPediatric/:id" element={<ExaminationDashBoardPediatric />} />
      <Route path="/treatmentSuggestion/:id" element={<TreatSuggestDashs />} />
      <Route path="/SecurityAmount/:id" element={<SecurityAmount />} />
      <Route path="/print-security-bill/:sa_id" element={<PrintSecurityAmt />} />
      <Route path="/TreatmentDashBoard/:id" element={<TreatmentDashBoard />} />
      <Route path="/NewTreatment/:id" element={<NewTreatment />} />
      <Route path="/treatProducer/:id/:appointment_id" element={<TreatmentForm />} />
      <Route path="/treatmentDashTwo/:id/:appointment_id" element={<TreatmentDashTwo />} />
      <Route path="/NewTreatPrescription/:id" element={<NewTreatPrescription />} />
      <Route path="/PrescriptionDashBoard" element={<PrescriptionDashBoard />} />
      <Route path="/TPrescription" element={<TPrescription />} />
      <Route path="/TPrescriptionDash/:id" element={<TPrescriptionDash />} />
      <Route path="/ViewTreatPrescription/:id" element={<ViewTreatPrescription />} />
      <Route path="/CreatePrescrip" element={<CreatePrescrip />} />
      <Route path="/profileDashboard" element={<ProfileDashboard />} /> 
      <Route path="/Patient-profile/:uhid" element={<PatientProfile />} />
      <Route path="/all-patient" element={<AllPatient />} />

      {/* ****************** Doctor Routes End Here ******************* */}
    </Routes>
  );
}

export default App;
