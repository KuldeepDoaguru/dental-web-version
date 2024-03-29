import "./App.css";
import { Route, Routes } from "react-router-dom";
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
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state)=> state.user);
  console.log(user);
  return (
    <Routes>
      {/* ************** Doctor Routes Start Here ******************* */}

      <Route path="/" element={<DoctorLogin />} />
      <Route path="/doctor-dashboard" element={user.currentUser=== null ? <DoctorLogin /> : <DoctorDashboard />} />
      <Route path="/examination-Dashboard/:id" element={user.currentUser=== null ? <DoctorLogin /> : <ExaminationDashBoard />} />
      <Route path="/ExaminationDashBoardPatient/:id" element={user.currentUser=== null ? <DoctorLogin /> : <ExaminationDashBoardPatient />} />
      <Route path="/ExaminationDashBoardPediatric/:id" element={user.currentUser=== null ? <DoctorLogin /> : <ExaminationDashBoardPediatric />} />
      <Route path="/treatmentSuggestion/:id" element={user.currentUser=== null ? <DoctorLogin /> : <TreatSuggestDashs />} />
      <Route path="/SecurityAmount/:id" element={user.currentUser=== null ? <DoctorLogin /> : <SecurityAmount />} />
      <Route path="/print-security-bill/:sa_id" element={user.currentUser=== null ? <DoctorLogin /> : <PrintSecurityAmt />} />
      <Route path="/TreatmentDashBoard/:id" element={user.currentUser=== null ? <DoctorLogin /> : <TreatmentDashBoard />} />
      <Route path="/NewTreatment/:id" element={user.currentUser=== null ? <DoctorLogin /> : <NewTreatment />} />
      <Route path="/treatProducer/:id/:appointment_id" element={user.currentUser=== null ? <DoctorLogin /> : <TreatmentForm />} />
      <Route path="/treatmentDashTwo/:id/:appointment_id" element={user.currentUser=== null ? <DoctorLogin /> : <TreatmentDashTwo />} />
      <Route path="/NewTreatPrescription/:id" element={user.currentUser=== null ? <DoctorLogin /> : <NewTreatPrescription />} />
      <Route path="/PrescriptionDashBoard" element={user.currentUser=== null ? <DoctorLogin /> : <PrescriptionDashBoard />} />
      <Route path="/TPrescription" element={user.currentUser=== null ? <DoctorLogin /> : <TPrescription />} />
      <Route path="/TPrescriptionDash/:id" element={user.currentUser=== null ? <DoctorLogin /> : <TPrescriptionDash />} />
      <Route path="/ViewTreatPrescription/:id" element={user.currentUser=== null ? <DoctorLogin /> : <ViewTreatPrescription />} />
      <Route path="/CreatePrescrip" element={user.currentUser=== null ? <DoctorLogin /> : <CreatePrescrip />} />
      <Route path="/profileDashboard" element={user.currentUser=== null ? <DoctorLogin /> : <ProfileDashboard />} /> 
      <Route path="/Patient-profile/:uhid" element={user.currentUser=== null ? <DoctorLogin /> : <PatientProfile />} />
      <Route path="/all-patient" element={user.currentUser=== null ? <DoctorLogin /> : <AllPatient />} />

      {/* ****************** Doctor Routes End Here ******************* */}

      {/* <Route path="/receptionist_login" element={<Login />} />
      <Route path="/receptionist_registration" element={<Registration />} />
      <Route path="/superadmin-dashboard" element={<Dashboard />} />
      <Route path="/UniversalLogin" element={<UniversalLogin />} /> */}
    </Routes>
  );
}

export default App;
