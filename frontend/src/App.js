import logo from "./logo.svg";
import "./App.css";
import Registration from "./components/receptionist/Registration";
import Login from "./components/receptionist/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/superAdmin/Dashboard";
import Chart from "./components/superAdmin/dashboard/Charts/AveragePatientChart";
import Header from "./components/Header";
import Sider from "./components/Sider";
import UniversalLogin from "./pages/UniversalLogin";
import Apointment from "./pages/superAdmin/Apointment";
import Branches from "./pages/Branches";
import AddBranch from "./components/superAdmin/Branches/AddBranch";

function App() {
  return (
    <Routes>
      {/* super admin routes start  */}
      <Route path="/receptionist_login" element={<Login />} />
      <Route path="/receptionist_registration" element={<Registration />} />
      <Route path="/superadmin-dashboard" element={<Dashboard />} />
      <Route path="/" element={<UniversalLogin />} />
      <Route path="/super-admin-appointment" element={<Apointment />} />
      <Route path="/superadmin-branch" element={<Branches />} />
      <Route path="/superadmin-add-branch" element={<AddBranch />} />
      {/* super admin routes end  */}
    </Routes>
  );
}

export default App;
