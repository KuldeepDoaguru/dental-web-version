import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/receptionist/Login";
import Dashboard from "./pages/accountant/Dashboard";
import UniversalLogin from "./pages/UniversalLogin";
import Apointment from "./pages/accountant/Apointment";
import AllBills from "./pages/accountant/AllBills";
import Registration from "./components/receptionist/Registration";
import ClinicSetting from "./pages/accountant/ClinicSetting";
import Accountant from "./components/Accountant/Home";

// import Card from "./components/accountant/Card";
import PharmacyMainIncome from "./components/Income/PharmacyMainIncome";
import TreatmentMainInCome from "./components/Income/TreatmentMainInCome";
import NewPurchase from "./components/Expenses/NewPurchase";
import VoucherCreater from "./components/Expenses/VoucherCreater";
import VoucherList from "./components/Expenses/VoucherList";
import Monthly from "./components/TotalIncome/Monthly";
import TodayIncome from "./components/TotalIncome/TodayIncome";
import WeeklyIncome from "./components/TotalIncome/WeeklyIncome";
import Yearly from "./components/TotalIncome/Yearly";
import RightSider from "./components/RightSider";
import StaffSalary from "./components/Expenses/StaffSalary";
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
import ErrorPage from "./pages/ErrorPage";
import TotalIncome from "./pages/TotalIncome";
import AccountantProfile from "./pages/AccountantProfile";
import SecurityAmount from "./pages/SecurityAmount";

function App() {
  return (
    <Routes>
      {/* Accountant routes start  */}

      <Route path="/receptionist_login" element={<Login />} />
      <Route path="/receptionist_registration" element={<Registration />} />
      <Route path="/accountant-dashboard" element={<Dashboard />} />
      <Route path="/" element={<UniversalLogin />} />
      <Route path="/Accountant" element={<Accountant />} />
      <Route path="/super-admin-appointment" element={<Apointment />} />
      <Route path="/bill_section" element={<AllBills />} />
      <Route path="/clinic-setting" element={<ClinicSetting />} />
      <Route path="/Card" element={<Cards />} />
      <Route path="/TreatmentMainInCome" element={<TreatmentMainInCome />} />
      <Route path="/NewPurchase" element={<NewPurchase />} />
      <Route path="/StaffSalary" element={<StaffSalary />} />
      <Route path="/VoucherCreater" element={<VoucherCreater />} />
      <Route path="/VoucherList" element={<VoucherList />} />
      {/* <Route path="/Monthly" element={<Monthly />} /> */}
      <Route path="/TodayIncome" element={<TodayIncome />} />
      {/* <Route path="/WeeklyIncome" element={<WeeklyIncome />} />
      <Route path="/Yearly" element={<Yearly />} /> */}
      <Route path="/RightSider" element={<RightSider />} />
      <Route path="/DoctorSalary" element={<DoctorSalary />} />
      <Route path="/DoctorMainSalary" element={<DoctorMainSalary />} />
      <Route path="/AccountantsSalary" element={<AccountantsSalary />} />
      <Route path="/AccountantSalaryMain" element={<AccountantSalaryMain />} />
      <Route path="/ReceptionistSalary " element={<ReceptionistSalary />} />
      <Route path="/NurseMainSalary" element={<NurseMainSalary />} />
      <Route path="/NurseSalary" element={<NurseSalary />} />
      <Route path="/OtherMainSalary" element={<OtherMainSalary />} />
      <Route path="/OtherSalary" element={<OtherSalary />} />
      <Route path="/OpdMainIncome" element={<OpdMainIncome />} />
      <Route path="/OpdINcome" element={<OpdINcome />} />
      <Route path="/AllStaffSalar" element={<AllStaffSalar />} />
      <Route path="/DueByUs" element={<DueByUs />} />
      <Route path="/PaidByUs" element={<PaidByUs />} />
      <Route path="/PatientsDue" element={<PatientsDue />} />
      <Route path="/PatientsPaid" element={<PatientsPaid />} />
      <Route path="/TreatmentIncome" element={<TreatmentIncome />} />
      <Route path="/LabMainIncome" element={<LabMainIncome />} />
      <Route path="/PharmacyMainIncome" element={<PharmacyMainIncome />} />
      <Route path="/LabIncome" element={<LabIncome />} />
      <Route
        path="/ReceptionistSalaryMain"
        element={<ReceptionistSalaryMain />}
      />
      <Route path="/MedicalInvoice" element={<MedicalInvoice />} />
      <Route path="/PharmacyBills" element={<PharmacyBills />} />
      <Route path="/OpdBills" element={<OpdBills />} />
      <Route path="/PatientsLabBills" element={<PatientsLabBills />} />
      <Route path="/TreatmentBills" element={<TreatmentBills />} />
      <Route path="/PaySlip" element={<PaySlip />} />
      <Route path="/AllDuaAmount" element={<AllDuaAmount />} />
      <Route path="/VoucherPaid" element={<VoucherPaid />} />
      <Route path="/VoucherPaidListPrint" element={<VoucherPaidListPrint />} />
      <Route path="/AddPatientBill" element={<AddPatientBill />} />
      <Route path="/PatientHomeProfile" element={<PatientHomeProfile />} />
      <Route path="/Navbar" element={<Navbar />} />
      <Route
        path="/PatintDuePaymentPrint"
        element={<PatintDuePaymentPrint />}
      />
      <Route
        path="/PatintPaidPaymentPrint"
        element={<PatintPaidPaymentPrint />}
      />
      <Route path="/Payment" element={<Payment />} />
      <Route path="/total-income" element={<TotalIncome />} />
      <Route path="/accountant-profile" element={<AccountantProfile />} />
      <Route path="/security-amount" element={<SecurityAmount />} />
      <Route path="*" element={<ErrorPage />} />
      {/*Acountend  routes end  */}
    </Routes>
  );
}

export default App;
