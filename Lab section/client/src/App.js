
import { Navigate, Route, Routes } from "react-router-dom";
import Deshboard from "./Pages/DeshBoard/Deshboard";
import CBCTest from "./Pages/BloodTestExternal/CBCTest";
import OPGXRay from "./Pages/RadiologyExternal/OPGXRay";
import History from "./Pages/History/History";
import PAyment from "./Pages/Payment/Payment";

import Logout from "./Pages/Logout/Logout";


import Compleated from "./Pages/AllTest/Compleated";
import OralTest from "./Pages/AllTest/OralTest";
import PendingTest from "./Pages/AllTest/PendingTest";
import RadiologyTest from "./Pages/AllTest/RadiologyTest";
import Popup from "./components/InternalComponent/popup";
import LabAttendant from "./Login/LabAttendant";
import { useSelector } from "react-redux";
import TodayTest from "./Pages/DeshBoard/TodayTest";
import YesterdayTest from "./Pages/DeshBoard/YesterdayTest";
import Weekly from "./Pages/DeshBoard/WeeklyTest";
import WeeklyTest from "./Pages/DeshBoard/WeeklyTest";
import MonthlyTest from "./Pages/DeshBoard/MonthlyTest";
import YearlyTest from "./Pages/DeshBoard/YearlyTest";
import Oral_Blood_Tests from "./components/InternalOral&BloodTestPage/Oral_Blood_Tests";
import Print_Oral_Blood from "./components/InternalOral&BloodTestPage/Print_Oral_Blood";
import HistoryTest from "./Pages/History/HistoryTest";
import Edit_Patient_test from "./components/InternalOral&BloodTestPage/Edit_Patient_test";
import FinalOral_Blood_Test from './components/InternalOral&BloodTestPage/FinalOral_Blood_Test';
import CreateNotes from "./components/InternalOral&BloodTestPage/CreateNotes";
import DeleteNotes from "./components/InternalOral&BloodTestPage/DeleteNotes";
import EditNotes from "./components/InternalOral&BloodTestPage/EditNotes";
import Sencivity from "./Pages/OralTestExternal/Sencivity";
import Payment from "./Pages/Payment/Payment";
import PaymentTest from "./Pages/Payment/PaymentTest";
import PasswordReset from "./Login/PasswordReset";
import PaymentHistory from "./Pages/Payment/PaymentHistory";
import PrintPagePayment from "./Pages/Payment/PrintPagePayment";
import AttendanceLeave from "./Pages/AttendanceLeave";
import BranchInfo from "./Pages/BranchInfo";
import Profile from "./Pages/Profile";
import BloodTest from "./Pages/AllTest/BloodTest";
import AllTests from "./Pages/AllTest/AllTests";
import './font.css';
function App() {

  const user = useSelector(state => state.auth.user);
 
  return (
    <>
    <div className="div" style={{overflow:"hidden"}}>
      <Routes>

        <Route path="/" element={user ? <Deshboard />:<LabAttendant/>} />
    
       
        <Route path="/dashboard" element={user ? <Deshboard />:<Navigate to="/" />} />
        <Route path="/attendance-leave" element={user ? <AttendanceLeave />:<Navigate to="/" />} />
        <Route path="/branch-details" element={user ? <BranchInfo />:<Navigate to="/" />} />
        <Route path="/lab-attendant-profile" element={user ? <Profile />:<Navigate to="/" />} />
         
       

        <Route path="/Sencivity" element={user?<Sencivity />: <Navigate to = "/"/>} />
        <Route path="/CBCTest" element={user?<CBCTest />: <Navigate to = '/'/>} />
        <Route path="/OPGXRay" element={user?<OPGXRay />: <Navigate to = '/'/>} />
        <Route path="/history" element={user?<HistoryTest />: <Navigate to = '/'/>} />
        <Route path="/payment-history" element={user?<PaymentHistory />: <Navigate to = '/'/>} />
        <Route path="/payment-test/:id" element={user ? <PaymentTest /> : <Navigate to='/'/>} />
        <Route path="/payment-print/:id" element={user ? <PrintPagePayment /> : <Navigate to='/'/>} />
        <Route path="/all-test" element={user?<AllTests/> :  <Navigate to='/'/>} />
        <Route path="/logout" element={user? <Logout />: <Navigate to='/'/>} />
        <Route path="/pathology-test" element={user ? <BloodTest /> : <Navigate to='/'/>} />
        <Route path="/done-test" element={user ?<Compleated />  : <Navigate to='/'/>} />
        <Route path="/oral-test" element={user ?<OralTest /> : <Navigate to='/'/>} />
        <Route path="/pending-test" element={user ?<PendingTest /> : <Navigate to='/'/>} />
        <Route path="/radiology-test" element={user ?<RadiologyTest /> : <Navigate to='/'/>} />
        <Route path="/Popup" element={user ?<Popup /> : <Navigate to='/'/>} />
        <Route path="/today-test" element={user ?<TodayTest /> : <Navigate to='/'/>} />
        <Route path="/yesterday-test" element={user ?<YesterdayTest /> : <Navigate to='/'/>} />
        <Route path="/weekly-test" element={user ?<WeeklyTest /> : <Navigate to='/'/>} />
        <Route path="/monthly-test" element={user ?<MonthlyTest /> : <Navigate to='/'/>} />
        <Route path="/yearly-test" element={user ?<YearlyTest /> : <Navigate to='/'/>} />
        <Route path="/oral-testing/:id" element={user ?<Oral_Blood_Tests /> : <Navigate to='/'/>} />
        <Route path="/final-oral-testing/:id" element={user ?<FinalOral_Blood_Test /> : <Navigate to='/'/>} />
        <Route path="/print-oral-testing/:id" element={user ?<Print_Oral_Blood /> : <Navigate to='/'/>} />
        <Route path="/update-patient-test-data/:id" element={user ?<Edit_Patient_test /> : <Navigate to='/'/>} />
        <Route path="/create-patient-notes/:id" element={user ?<CreateNotes /> : <Navigate to='/'/>} />
        <Route path="/delete-patient-notes/:id" element={user ?<DeleteNotes /> : <Navigate to='/'/>} />
        <Route path="/edit-patient-notes/:id" element={user ?<EditNotes /> : <Navigate to='/'/>} />

        <Route path="/password-reset" element={<PasswordReset />} />
        
      </Routes>
      </div>
    </>
  );
}

export default App;
