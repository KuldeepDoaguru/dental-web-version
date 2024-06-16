import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import UniversalLogin from "./pages/UniversalLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";
import ClinicSetAdmin from "./pages/admin/ClinicSetAdmin";
import AdminProfile from "./components/Admin/AdminProfile";
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
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/UserSlicer";
import PasswordReset from "./pages/admin/PasswordReset";
import { setBranch } from "./redux/slices/BranchSlicer";
import AdminPatientLIst from "./pages/admin/AdminPatientLIst";
import AdminPatientProfile from "./pages/admin/AdminPatientProfile";
import AdminEmployeeProfile from "./pages/admin/AdminEmployeeProfile";
import AdminNotification from "./pages/admin/AdminNotification";
import AttendanceLeave from "./pages/admin/AttendanceLeave";
import StaffLeave from "./pages/admin/StaffLeave";
import LabPatientReport from "./components/LabReports/LabPatientReport";
import OralTest from "./components/LabReports/OralTest";
import BloodTest from "./components/LabReports/BloodTest";
import RadiologyTest from "./components/LabReports/RadiologyTest";
import PendingTest from "./components/LabReports/PendingTest";
import Compleated from "./components/LabReports/Compleated";
import AdminAllBills from "./pages/AdminAllBills";
import RefundedAmountReport from "./pages/superAdmin/AllReport/RefundedAmountReport";

const App = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <BrowserRouter>
      <div style={{ overflow: "hidden" }}>
        <Routes>
          <Route
            path="/"
            element={user.currentUser ? <AdminDashboard /> : <UniversalLogin />}
          />{" "}
          <Route
            path="/admin-dashboard"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminDashboard />
              )
            }
          />
          <Route
            path="/admin-clinic-setting"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <ClinicSetAdmin />
              )
            }
          />
          <Route
            path="/admin-profile"
            element={
              user.currentUser === null ? <UniversalLogin /> : <AdminProfile />
            }
          />
          <Route
            path="/admin-notification"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminNotification />
              )
            }
          />
          <Route
            path="/admin-appointment"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminApointment />
              )
            }
          />
          {/* <Route
          path="/admin-bill_section"
          element={
            user.currentUser === null ? <UniversalLogin /> : <AdminBillList />
          }
        /> */}
          <Route
            path="/admin-bill_section"
            element={
              user.currentUser === null ? <UniversalLogin /> : <AdminAllBills />
            }
          />
          <Route
            path="/admin-inventory"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminInventory />
              )
            }
          />
          <Route
            path="/admin-add-invetory"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminAddInventory />
              )
            }
          />
          <Route
            path="/admin-edit-invetory/:pid"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminEditInventory />
              )
            }
          />
          <Route
            path="/admin-doctor_section"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminDocSection />
              )
            }
          />
          <Route
            path="/admin-doctor-profile"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminDocProfile />
              )
            }
          />
          <Route
            path="/manage-staff"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminManageStaff />
              )
            }
          />
          <Route
            path="/employee-profile/:eid"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminEmployeeProfile />
              )
            }
          />
          <Route
            path="/admin-lab-setting"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminLabSetting />
              )
            }
          />
          <Route
            path="/admin-reports-dashboard"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminReportDash />
              )
            }
          />
          <Route
            path="/admin-finance-reports"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminFinancialReport />
              )
            }
          />
          <Route
            path="/admin-appointment-report"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminAppointmentReport />
              )
            }
          />
          <Route
            path="/admin-refunded-amount-report"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <RefundedAmountReport />
              )
            }
          />
          <Route
            path="/admin-Billing-report"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminBillingReport />
              )
            }
          />
          <Route
            path="/admin-inventory-report"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminInventoryReport />
              )
            }
          />
          <Route
            path="/admin-employee-attendance-report"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminEmpAttendReport />
              )
            }
          />
          <Route
            path="/admin-employee-details-report"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminEmpDetailReport />
              )
            }
          />
          <Route
            path="/admin-lab-details-report"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminLabDetailsRepo />
              )
            }
          />
          <Route
            path="/admin-lab-test-report"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminLabTestRepo />
              )
            }
          />
          <Route
            path="/admin-lab-task-report"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminLabTaskRepo />
              )
            }
          />
          <Route
            path="/admin-calender-setting"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminCalenderSetting />
              )
            }
          />
          <Route
            path="/admin-drug-setting"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminDrugSetting />
              )
            }
          />
          <Route
            path="/admin-communication-setting"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminCommunicationSetting />
              )
            }
          />
          <Route
            path="/admin-prescription-templates"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminPrescriptTemp />
              )
            }
          />
          <Route
            path="/admin-treatment-setting"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminTreatSetting />
              )
            }
          />
          <Route
            path="/admin-complaint-page"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminComplaintPage />
              )
            }
          />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route
            path="/patient-list"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminPatientLIst />
              )
            }
          />
          <Route
            path="/patient-profile/:pid"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AdminPatientProfile />
              )
            }
          />
          <Route
            path="/attendance-dashboard"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <AttendanceLeave />
              )
            }
          />
          <Route
            path="/leave-management"
            element={
              user.currentUser === null ? <UniversalLogin /> : <StaffLeave />
            }
          />
          <Route
            path="/lab-patient-report"
            element={
              user.currentUser === null ? (
                <UniversalLogin />
              ) : (
                <LabPatientReport />
              )
            }
          />
          <Route
            path="/OralTest"
            element={
              user.currentUser === null ? <UniversalLogin /> : <OralTest />
            }
          />
          <Route
            path="/BloodTest"
            element={
              user.currentUser === null ? <UniversalLogin /> : <BloodTest />
            }
          />
          <Route
            path="/RadiologyTest"
            element={
              user.currentUser === null ? <UniversalLogin /> : <RadiologyTest />
            }
          />
          <Route
            path="/PendingTest"
            element={
              user.currentUser === null ? <UniversalLogin /> : <PendingTest />
            }
          />
          <Route
            path="/Compleated"
            element={
              user.currentUser === null ? <UniversalLogin /> : <Compleated />
            }
          />
          <Route
            path="*"
            element={
              user.currentUser === null ? <UniversalLogin /> : <ErrorPage />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
