import logo from "./logo.svg";
import "./App.css";
import Registration from "./components/receptionist/Registration";
import Login from "./components/receptionist/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ClinicSetAdmin from "./pages/admin/ClinicSetAdmin";
import AdminProfile from "./components/Admin/AdminProfile";
import AdminNotify from "./pages/admin/AdminNotify";
import AdminApointment from "./pages/admin/AdminApointment";
import AdminBillList from "./pages/admin/AdminBillList";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminAddInventory from "./pages/admin/AdminAddInventory";
import AdminEditInventory from "./pages/admin/AdminEditInventory";
import AdminDocSection from "./pages/admin/AdminDocSection";
import AdminDocProfile from "./pages/admin/AdminDocProfile";
import AdminManageStaff from "./pages/admin/AdminManageStaff";
import AdminLabSetting from "./pages/admin/AdminLabSetting";
import AdminReportDash from "./pages/admin/AdminReportDash";
import AdminFinancialReport from "./pages/admin/AdminFinancialReport";
import AdminAppointmentReport from "./pages/admin/All-Report/AdminAppointmentReport";
import AdminBillingReport from "./pages/admin/All-Report/AdminBillingReport";
import AdminInventoryReport from "./pages/admin/All-Report/AdminInventoryReport";
import AdminEmpAttendReport from "./pages/admin/All-Report/AdminEmpAttendReport";
import AdminEmpDetailReport from "./pages/admin/All-Report/AdminEmpDetailReport";
import AdminLabDetailsRepo from "./pages/admin/All-Report/AdminLabDetailsRepo";
import AdminLabTestRepo from "./pages/admin/All-Report/AdminLabTestRepo";
import AdminLabTaskRepo from "./pages/admin/All-Report/AdminLabTaskRepo";
import AdminCalenderSetting from "./pages/admin/AdminClinicSetting/AdminCalenderSetting";
import AdminDrugSetting from "./pages/admin/AdminClinicSetting/AdminDrugSetting";
import AdminCommunicationSetting from "./pages/admin/AdminClinicSetting/AdminCommunicationSetting";
import AdminPrescriptTemp from "./pages/admin/AdminClinicSetting/AdminPrescriptTemp";
import AdminTreatSetting from "./pages/admin/AdminClinicSetting/AdminTreatSetting";
import AdminComplaintPage from "./components/Admin/dashboard/AdminComplaintPage";
import ComplaintPage from "./pages/superAdmin/ComplaintPage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/UserSlicer";
import PasswordReset from "./pages/admin/PasswordReset";
import { setBranch } from "./redux/slices/BranchSlicer";
import AdminPatientLIst from "./pages/admin/AdminPatientLIst";
import AdminPatientProfile from "./pages/admin/AdminPatientProfile";

const App = () => {
  const storedUserData = localStorage.getItem("userData");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    dispatch(setUser(userData));
  }

  const selectedBranch = localStorage.getItem("branchName");
  const branch = useSelector((state) => state.name);

  if (selectedBranch) {
    const branch = JSON.parse(selectedBranch);
    dispatch(setBranch(branch));
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UniversalLogin />} />{" "}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-clinic-setting" element={<ClinicSetAdmin />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-notification" element={<AdminNotify />} />
        <Route path="/admin-appointment" element={<AdminApointment />} />
        <Route path="/admin-bill_section" element={<AdminBillList />} />
        <Route path="/admin-inventory" element={<AdminInventory />} />
        <Route path="/admin-add-invetory" element={<AdminAddInventory />} />
        <Route
          path="/admin-edit-invetory/:pid"
          element={<AdminEditInventory />}
        />
        <Route path="/admin-doctor_section" element={<AdminDocSection />} />
        <Route path="/admin-doctor-profile" element={<AdminDocProfile />} />
        <Route path="/admin-manage-staff" element={<AdminManageStaff />} />
        <Route path="/admin-lab-setting" element={<AdminLabSetting />} />
        <Route path="/admin-reports-dashboard" element={<AdminReportDash />} />
        <Route
          path="/admin-finance-reports"
          element={<AdminFinancialReport />}
        />
        <Route
          path="/admin-appointment-report"
          element={<AdminAppointmentReport />}
        />
        <Route path="/admin-Billing-report" element={<AdminBillingReport />} />
        <Route
          path="/admin-inventory-report"
          element={<AdminInventoryReport />}
        />
        <Route
          path="/admin-employee-attendance-report"
          element={<AdminEmpAttendReport />}
        />
        <Route
          path="/admin-employee-details-report"
          element={<AdminEmpDetailReport />}
        />
        <Route
          path="/admin-lab-details-report"
          element={<AdminLabDetailsRepo />}
        />
        <Route path="/admin-lab-test-report" element={<AdminLabTestRepo />} />
        <Route path="/admin-lab-task-report" element={<AdminLabTaskRepo />} />
        <Route
          path="/admin-calender-setting"
          element={<AdminCalenderSetting />}
        />
        <Route path="/admin-drug-setting" element={<AdminDrugSetting />} />
        <Route
          path="/admin-communication-setting"
          element={<AdminCommunicationSetting />}
        />
        <Route
          path="/admin-prescription-templates"
          element={<AdminPrescriptTemp />}
        />
        <Route
          path="/admin-treatment-setting"
          element={<AdminTreatSetting />}
        />
        <Route path="/admin-complaint-page" element={<AdminComplaintPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/patient-list" element={<AdminPatientLIst />} />
        <Route path="/patient-profile/:pid" element={<AdminPatientProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
