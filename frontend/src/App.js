import "./App.css";
import Registration from "./components/receptionist/Registration";
import Login from "./components/receptionist/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/superAdmin/Dashboard";
import UniversalLogin from "./pages/UniversalLogin";
import DoctorDashboard from "./pages/DoctorPage/DoctorDashboard";

function App() {
  return (
    <Routes>
      <Route path="/receptionist_login" element={<Login />} />
      <Route path="/receptionist_registration" element={<Registration />} />
      <Route path="/superadmin-dashboard" element={<Dashboard />} />
      <Route path="/" element={<UniversalLogin />} />

      {/* Doctor Routes start here  */}
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      {/* Doctor Routes end here  */}
    </Routes>
  );
}

export default App;
