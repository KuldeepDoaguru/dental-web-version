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
import AllBills from "./pages/superAdmin/AllBills";
import Inventory from "./pages/superAdmin/Inventory";
import DoctorList from "./pages/superAdmin/DoctorList";
import SuperAdProfile from "./components/superAdmin/SuperAdProfile";
import DoctorProfile from "./components/superAdmin/doctor/DoctorProfile";
import AddInventory from "./components/superAdmin/inventory-comp/AddInventory";
import EditInventory from "./components/superAdmin/inventory-comp/EditInventory";
import AddDoctor from "./components/superAdmin/doctor/AddDoctor";
import ClinicSetting from "./pages/superAdmin/ClinicSetting";
import LabSetting from "./pages/superAdmin/settings/LabSetting";
import FinancialReportCard from "./pages/superAdmin/FinancialReport/FinancialReportCard";
import ManageStaff from "./pages/superAdmin/ManageStaff";
import DrugSetting from "./pages/superAdmin/drug-setting/DrugSetting";
import PrescriptionTemplate from "./pages/superAdmin/Prescription-Templates/PrescriptionTemplate";
import CalenderSetting from "./pages/superAdmin/CalenderSettings/CalenderSetting";
import TreatmentSetting from "./pages/superAdmin/TreatmentSetting/TreatmentSetting";
import CommunicationSetting from "./pages/superAdmin/Communication-setting/CommunicationSetting";
import ReportDash from "./pages/superAdmin/AllReport/ReportDash";
import AppointmentReport from "./pages/superAdmin/AllReport/AppointmentReport";
import BillingReport from "./pages/superAdmin/AllReport/BillingReport";
import InventoryReport from "./pages/superAdmin/AllReport/InventoryReport";
import EmpAttendanceRepo from "./pages/superAdmin/AllReport/EmpAttendanceRepo";
import EmpDetailsRepo from "./pages/superAdmin/AllReport/EmpDetailsRepo";
import LabDetailsReport from "./pages/superAdmin/AllReport/LabDetailsReport";
import LabTestReport from "./pages/superAdmin/AllReport/LabTestReport";
import LabTaskReport from "./pages/superAdmin/AllReport/LabTaskReport";
import SuperAdmNotify from "./pages/superAdmin/SuperAdmNotify";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useState } from "react";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const [role, setRole] = useState("admin");
  return (
    <Routes>
      <Route path="/" element={<UniversalLogin />} />
      {/* ************************************************************************************ */}
      {/* super admin routes start  */}
      {role === "SuperAdmin" ? (
        <>
          <Route path="/receptionist_login" element={<Login />} />
          <Route path="/receptionist_registration" element={<Registration />} />
          <Route path="/superadmin-dashboard" element={<Dashboard />} />
          <Route path="/super-admin-appointment" element={<Apointment />} />
          <Route path="/superadmin-branch" element={<Branches />} />
          <Route path="/superadmin-add-branch" element={<AddBranch />} />
          <Route path="/bill_section" element={<AllBills />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/add-invetory" element={<AddInventory />} />
          <Route path="/edit-invetory" element={<EditInventory />} />
          <Route path="/doctor_section" element={<DoctorList />} />
          <Route path="/register-doctor" element={<AddDoctor />} />
          <Route path="/super-admin-profile" element={<SuperAdProfile />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/clinic-setting" element={<ClinicSetting />} />
          <Route path="/lab-setting" element={<LabSetting />} />
          <Route path="/drug-setting" element={<DrugSetting />} />
          <Route path="/calender-setting" element={<CalenderSetting />} />
          <Route path="/treatment-setting" element={<TreatmentSetting />} />
          <Route
            path="/communication-setting"
            element={<CommunicationSetting />}
          />
          <Route
            path="/prescription-templates"
            element={<PrescriptionTemplate />}
          />
          <Route path="/reports-dashboard" element={<ReportDash />} />
          <Route path="/finance-reports" element={<FinancialReportCard />} />
          <Route path="/appointment-report" element={<AppointmentReport />} />
          <Route path="/Billing-report" element={<BillingReport />} />
          <Route path="/inventory-report" element={<InventoryReport />} />
          <Route
            path="/employee-attendance-report"
            element={<EmpAttendanceRepo />}
          />
          <Route path="/employee-details-report" element={<EmpDetailsRepo />} />
          <Route path="/lab-details-report" element={<LabDetailsReport />} />
          <Route path="/lab-test-report" element={<LabTestReport />} />
          <Route path="/lab-task-report" element={<LabTaskReport />} />
          <Route path="/manage-staff" element={<ManageStaff />} />
          <Route
            path="/super-admin-notification"
            element={<SuperAdmNotify />}
          />
        </>
      ) : (
        <>
          {" "}
          <Route path="*" element={<ErrorPage />} />
        </>
      )}

      {/* super admin routes end  */}
      {/* ************************************************************************************ */}
      {/* super admin routes start  */}
      {role === "admin" ? (
        <>
          {" "}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </>
      ) : (
        <>
          <Route path="*" element={<ErrorPage />} />
        </>
      )}

      {/* super admin routes end  */}
    </Routes>
  );
};

export default App;
