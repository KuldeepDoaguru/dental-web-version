import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./components/receptionist/Login";
// import Apointment from "./pages/accountant/Apointment";
// import AllBills from "./pages/accountant/AllBills";
// import Registration from "./components/receptionist/Registration";
// import Accountant from "./components/Accountant/Home";
// import Card from "./components/accountant/Card";
// import NewPurchase from "./components/Expenses/NewPurchase";
// import StaffSalary from "./components/Expenses/StaffSalary";
// import WeeklyIncome from "./components/TotalIncome/WeeklyIncome";
// import Yearly from "./components/TotalIncome/Yearly";
// import Monthly from "./components/TotalIncome/Monthly";
// import IncomeReports from "./pages/AllReport/OpdReportDownload";
// import ClinicSetting from "./pages/accountant/ClinicSetting";
import Dashboard from "./pages/accountant/Dashboard";
import UniversalLogin from "./pages/UniversalLogin";
import PharmacyMainIncome from "./components/Income/PharmacyMainIncome";
import TreatmentMainInCome from "./components/Income/TreatmentMainInCome";
import VoucherCreater from "./components/Expenses/VoucherCreater";
import VoucherList from "./components/Expenses/VoucherList";
import TodayIncome from "./components/TotalIncome/TodayIncome";
import RightSider from "./components/RightSider";
import AccountantsSalary from "./components/AccountantSalary/AccountantsSalary";
import AccountantSalaryMain from "./components/AccountantSalary/AccountantSalaryMain";
import ReceptionistSalary from "./components/ReceptionistSalary/ReceptionistSalary";
import ReceptionistSalaryMain from "./components/ReceptionistSalary/ReceptionistSalaryMain";
import NurseMainSalary from "./components/Nurse/NurseMainSalary";
import NurseSalary from "./components/Nurse/NurseSalary";
import OtherMainSalary from "./components/Other/OtherMainSalary";
import OtherSalary from "./components/Other/OtherSalary";
import OpdMainIncome from "./components/Income/OpdMainIncome";
import OpdINcome from "./components/OpdIncome";
import AllStaffSalar from "./components/Expenses/AllStaffSalar";
import DoctorSalary from "./components/DoctorSalary/DoctorSalary";
import DoctorMainSalary from "./components/DoctorSalary/DoctorMainSalary";
import DueByUs from "./components/SalaryDueourPaid/DueByUs";
import PaidByUs from "./components/SalaryDueourPaid/PaidByUs";
import PatientsDue from "./components/PatientsDueOurPaid/PatientsDue";
import PatientsPaid from "./components/PatientsDueOurPaid/PatientsPaid";
import TreatmentIncome from "./components/TreatmentIncome";
import LabMainIncome from "./components/Income/LabMainIncome";
import LabIncome from "./components/LabIncome";
import MedicalInvoice from "./pages/MedicalInvoice";
import PharmacyBills from "./pages/PharmacyBills";
import OpdBills from "./pages/OpdBills";
import PatientsLabBills from "./pages/PatientsLabBills";
import TreatmentBills from "./pages/TreatmentBills";
import PaySlip from "./pages/PaySlip";
import AllDuaAmount from "./pages/AllDuaAmount";
import VoucherPaid from "./pages/VoucherPaid";
import VoucherPaidListPrint from "./pages/VoucherPaidListPrint";
import AddPatientBill from "./components/AddPatintsBills/AddPatientBill";
import PatientHomeProfile from "./pages/PatientProfile/PatientHomeProfile";
import Navbar from "./pages/PatientProfile/Navbar";
import PatintDuePaymentPrint from "./pages/PatintDuePaymentPrint";
import PatintPaidPaymentPrint from "./pages/PatintPaidPaymentPrint";
import Payment from "./pages/Payment";
import Cards from "./components/Accountant/Cards";
// import ErrorPage from "./pages/ErrorPage";
import TotalIncome from "./pages/TotalIncome";
import AccountantProfile from "./pages/AccountantProfile";
import SecurityAmount from "./pages/SecurityAmount";
import AccountReportDash from "./pages/AccountReportDash";
import SecAmountReport from "./pages/AllReport/SecAmountReport";
import InvoiceReport from "./pages/AllReport/InvoiceReport";
import OpdReportDownload from "./pages/AllReport/OpdReportDownload";
import TreatIncomeDownload from "./pages/AllReport/TreatIncomeDownload";
import DuePaymentReport from "./pages/AllReport/DuePaymentReport";
import PaidPaymentReport from "./pages/AllReport/PaidPaymentReport";
import StaffSalaryReport from "./pages/AllReport/StaffSalaryReport";
import VoucherReport from "./pages/AllReport/VoucherReport";
import PurchaseReport from "./pages/AllReport/PurchaseReport";
import AttendanceLeave from "./pages/AttendanceLeave";
import PasswordReset from "./pages/PasswordReset";
import SecurityAmtPrint from "./pages/SecurityAmtPrint";
import PatientBillsByTpid from "./pages/BillPage/PatientBillsByTpid";
import { useSelector } from "react-redux";
import BranchInfo from "./pages/BranchInfo";
import LabPatientReport from "./components/LabReports/LabPatientReport";
import OralTest from "./components/LabReports/OralTest";
import BloodTest from "./components/LabReports/BloodTest";
import RadiologyTest from "./components/LabReports/RadiologyTest";
import PendingTest from "./components/LabReports/PendingTest";
import Compleated from "./components/LabReports/Compleated";
import ErrorPage from "./pages/Error-Page/ErrorPage";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        {/* Accountant routes start  */}

        {/* <Route path="/receptionist_login" element={<Login />} /> */}
        {/* <Route path="/receptionist_registration" element={<Registration />} /> */}
        {/* <Route path="/Accountant" element={<Accountant />} /> */}
        {/* <Route path="/super-admin-appointment" element={<Apointment />} /> */}
        {/* <Route path="/bill_section" element={<AllBills />} /> */}
        {/* <Route path="/NewPurchase" element={<NewPurchase />} /> */}
        {/* <Route path="/StaffSalary" element={<StaffSalary />} /> */}
        {/* <Route path="/WeeklyIncome" element={<WeeklyIncome />} />
      <Route path="/Yearly" element={<Yearly />} /> */}
        {/* <Route path="/Monthly" element={<Monthly />} /> */}
        <Route
          path="/"
          element={user.employee_name ? <Dashboard /> : <UniversalLogin />}
        />
        <Route
          path="/accountant-dashboard"
          element={
            user.employee_name === null ? <UniversalLogin /> : <Dashboard />
          }
        />
        {/* <Route path="/clinic-setting" element={<ClinicSetting />} /> */}
        <Route
          path="/Card"
          element={user.employee_name === null ? <UniversalLogin /> : <Cards />}
        />
        <Route
          path="/treatment-income"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <TreatmentMainInCome />
            )
          }
        />
        {/* <Route
          path="/VoucherCreater"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <VoucherCreater />
            )
          }
        /> */}
        {/* <Route
          path="/VoucherList"
          element={
            user.employee_name === null ? <UniversalLogin /> : <VoucherList />
          }
        /> */}
        <Route
          path="/TodayIncome"
          element={
            user.employee_name === null ? <UniversalLogin /> : <TodayIncome />
          }
        />
        <Route
          path="/RightSider"
          element={
            user.employee_name === null ? <UniversalLogin /> : <RightSider />
          }
        />
        <Route
          path="/DoctorSalary"
          element={
            user.employee_name === null ? <UniversalLogin /> : <DoctorSalary />
          }
        />
        <Route
          path="/DoctorMainSalary"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <DoctorMainSalary />
            )
          }
        />
        <Route
          path="/AccountantsSalary"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <AccountantsSalary />
            )
          }
        />
        <Route
          path="/AccountantSalaryMain"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <AccountantSalaryMain />
            )
          }
        />
        <Route
          path="/ReceptionistSalary "
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <ReceptionistSalary />
            )
          }
        />
        <Route
          path="/NurseMainSalary"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <NurseMainSalary />
            )
          }
        />
        <Route
          path="/NurseSalary"
          element={
            user.employee_name === null ? <UniversalLogin /> : <NurseSalary />
          }
        />
        <Route
          path="/OtherMainSalary"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <OtherMainSalary />
            )
          }
        />
        <Route
          path="/OtherSalary"
          element={
            user.employee_name === null ? <UniversalLogin /> : <OtherSalary />
          }
        />
        <Route
          path="/OpdMainIncome"
          element={
            user.employee_name === null ? <UniversalLogin /> : <OpdMainIncome />
          }
        />
        <Route
          path="/OpdINcome"
          element={
            user.employee_name === null ? <UniversalLogin /> : <OpdINcome />
          }
        />
        <Route
          path="/AllStaffSalar"
          element={
            user.employee_name === null ? <UniversalLogin /> : <AllStaffSalar />
          }
        />
        <Route
          path="/DueByUs"
          element={
            user.employee_name === null ? <UniversalLogin /> : <DueByUs />
          }
        />
        <Route
          path="/PaidByUs"
          element={
            user.employee_name === null ? <UniversalLogin /> : <PaidByUs />
          }
        />
        <Route
          path="/PatientsDue"
          element={
            user.employee_name === null ? <UniversalLogin /> : <PatientsDue />
          }
        />
        <Route
          path="/PatientsPaid"
          element={
            user.employee_name === null ? <UniversalLogin /> : <PatientsPaid />
          }
        />
        <Route
          path="/TreatmentIncome"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <TreatmentIncome />
            )
          }
        />
        <Route
          path="/LabMainIncome"
          element={
            user.employee_name === null ? <UniversalLogin /> : <LabMainIncome />
          }
        />
        <Route
          path="/PharmacyMainIncome"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <PharmacyMainIncome />
            )
          }
        />
        <Route
          path="/LabIncome"
          element={
            user.employee_name === null ? <UniversalLogin /> : <LabIncome />
          }
        />
        <Route
          path="/ReceptionistSalaryMain"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <ReceptionistSalaryMain />
            )
          }
        />
        <Route
          path="/MedicalInvoice"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <MedicalInvoice />
            )
          }
        />
        <Route
          path="/PharmacyBills"
          element={
            user.employee_name === null ? <UniversalLogin /> : <PharmacyBills />
          }
        />
        <Route
          path="/OpdBills/:bid"
          element={
            user.employee_name === null ? <UniversalLogin /> : <OpdBills />
          }
        />
        <Route
          path="/PatientsLabBills"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <PatientsLabBills />
            )
          }
        />
        <Route
          path="/TreatmentBills/:bid/:uhid"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <TreatmentBills />
            )
          }
        />
        <Route
          path="/PaySlip/:slid"
          element={
            user.employee_name === null ? <UniversalLogin /> : <PaySlip />
          }
        />
        <Route
          path="/AllDuaAmount"
          element={
            user.employee_name === null ? <UniversalLogin /> : <AllDuaAmount />
          }
        />
        <Route
          path="/VoucherPaid"
          element={
            user.employee_name === null ? <UniversalLogin /> : <VoucherPaid />
          }
        />
        <Route
          path="/VoucherPaidListPrint/:vid"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <VoucherPaidListPrint />
            )
          }
        />
        <Route
          path="/AddPatientBill"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <AddPatientBill />
            )
          }
        />
        <Route
          path="/PatientHomeProfile"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <PatientHomeProfile />
            )
          }
        />
        <Route
          path="/Navbar"
          element={
            user.employee_name === null ? <UniversalLogin /> : <Navbar />
          }
        />
        <Route
          path="/PatintDuePaymentPrint/:bid/:tpid/:uhid"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <PatintDuePaymentPrint />
            )
          }
        />
        <Route
          path="/PatintPaidPaymentPrint/:bid"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <PatintPaidPaymentPrint />
            )
          }
        />
        <Route
          path="/Payment"
          element={
            user.employee_name === null ? <UniversalLogin /> : <Payment />
          }
        />
        <Route
          path="/total-income"
          element={
            user.employee_name === null ? <UniversalLogin /> : <TotalIncome />
          }
        />
        <Route
          path="/accountant-profile"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <AccountantProfile />
            )
          }
        />
        <Route
          path="/security-amount"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <SecurityAmount />
            )
          }
        />
        <Route
          path="/account-report-dashboard"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <AccountReportDash />
            )
          }
        />
        <Route
          path="/security-amount-report"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <SecAmountReport />
            )
          }
        />
        <Route
          path="/invoice-report"
          element={
            user.employee_name === null ? <UniversalLogin /> : <InvoiceReport />
          }
        />
        <Route
          path="/opd-income-report"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <OpdReportDownload />
            )
          }
        />
        <Route
          path="/treat-income-report"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <TreatIncomeDownload />
            )
          }
        />
        <Route
          path="/due-payment-report"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <DuePaymentReport />
            )
          }
        />
        <Route
          path="/paid-payment-report"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <PaidPaymentReport />
            )
          }
        />
        <Route
          path="/staff-salary-report"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <StaffSalaryReport />
            )
          }
        />
        <Route
          path="/voucher-report"
          element={
            user.employee_name === null ? <UniversalLogin /> : <VoucherReport />
          }
        />
        <Route
          path="/purchase-report"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <PurchaseReport />
            )
          }
        />
        <Route
          path="/attendance-leave"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <AttendanceLeave />
            )
          }
        />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route
          path="/patient-bill/:billid/:tpid"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <PatientBillsByTpid />
            )
          }
        />
        <Route
          path="/security-amount-reciept/:sid"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <SecurityAmtPrint />
            )
          }
        />

        <Route
          path="/lab-patient-report"
          element={
            user.employee_name === null ? (
              <UniversalLogin />
            ) : (
              <LabPatientReport />
            )
          }
        />

        <Route
          path="/OralTest"
          element={
            user.employee_name === null ? <UniversalLogin /> : <OralTest />
          }
        />
        <Route
          path="/BloodTest"
          element={
            user.employee_name === null ? <UniversalLogin /> : <BloodTest />
          }
        />
        <Route
          path="/RadiologyTest"
          element={
            user.employee_name === null ? <UniversalLogin /> : <RadiologyTest />
          }
        />
        <Route
          path="/PendingTest"
          element={
            user.employee_name === null ? <UniversalLogin /> : <PendingTest />
          }
        />
        <Route
          path="/Compleated"
          element={
            user.employee_name === null ? <UniversalLogin /> : <Compleated />
          }
        />

        <Route
          path="/view-clinic-details"
          element={
            user.employee_name === null ? <UniversalLogin /> : <BranchInfo />
          }
        />
        {/* <Route path="/view-clinic-details" element={<BranchInfo />} /> */}
        <Route path="*" element={<ErrorPage />} />
        {/*Acountend  routes end  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
