import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import PatientBillsByTpid from "./pages/PatientBills/PatientBillsByTpid";
import AttendanceLeave from "./pages/DoctorPage/AttendanceLeave";
import PatintDuePaymentPrint from "./pages/PatientBills/PatintDuePaymentPrint";
import PasswordReset from "./pages/PasswordReset";
import ScrollToTop from "./components/ScrollToTop";
import Print_Oral_Blood from "./pages/DoctorPage/Print_Oral_Blood";
import { useEffect, useState } from "react";
import axios from "axios";
import { clearUser, toggleTableRefresh } from "./redux/user/userSlice";
import animationData from "./animation/animation-four.json";
import Lottie from "lottie-react";
import PrescriptionDetails from "./pages/DoctorPage/PrescriptionDetails";
import ViewTreatPrescriptionList from "./components/Doctor/Prescription/TreatmentPrescription/ViewTreatPrescriptionList";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.currentUser);
  const [attend, setAttend] = useState(true);
  const [todayAttendance, setTodayAttendance] = useState([]);
  console.log(user);
  const { refreshTable } = useSelector((state) => state.user);
  const date = new Date().toISOString().slice(0, 10);
  const [loading, setLoading] = useState(false);

  const logoutHandleByToken = () => {
    // alert("Token Expired! You have been logged out");
    dispatch(clearUser());
    navigate("/");
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // const getTodayAttendance = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `https://dentalgurudoctor.doaguru.com/api/doctor/getTodayAttendance/${user.branch_name}/${user.employee_ID}/${date}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );
  //     setLoading(false);
  //     setTodayAttendance(response?.data?.data);
  //   } catch (error) {
  //     setLoading(false);
  //     if (error.response && error.response.status === 401) {
  //       const errorMessage = error.response.data.message;
  //       if (errorMessage === "Unauthorized - Token expired") {
  //         logoutHandleByToken();
  //       } else {
  //         console.log("Unauthorized access:", errorMessage);
  //       }
  //     } else {
  //       setLoading(false);
  //       console.log("An error occurred:", error.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getTodayAttendance();
  //   const interval = setInterval(() => {
  //     dispatch(toggleTableRefresh());
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //     // console.log("Interval cleared.");
  //   };
  // }, [refreshTable]);

  const getTodayAttendance = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getTodayAttendance/${user.branch_name}/${user.employee_ID}/${date}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTodayAttendance(response?.data?.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Unauthorized - Token expired") {
          logoutHandleByToken();
        } else {
          console.log("Unauthorized access:", errorMessage);
        }
      } else {
        console.log("An error occurred:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getTodayAttendance();
    }
  }, [user]);

  console.log(todayAttendance.length);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ************** Doctor Routes Start Here ******************* */}

        <Route
          path="/"
          element={user === null ? <DoctorLogin /> : <DoctorDashboard />}
        />
        {/* <Route
          path="/doctor-dashboard"
          element={
            user === null ? (
              <DoctorLogin />
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <DoctorDashboard />
            )
          }
        /> */}

        <Route
          path="/doctor-dashboard"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <DoctorDashboard />
            )
          }
        />
        <Route
          path="/examination-Dashboard/:id/:uhid"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <ExaminationDashBoard />
            )
          }
        />
        <Route
          path="/ExaminationDashBoardPatient/:id/:dcat/:tpid"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <ExaminationDashBoardPatient />
            )
          }
        />
        <Route
          path="/ExaminationDashBoardPediatric/:id/:dcat/:tpid"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <ExaminationDashBoardPediatric />
            )
          }
        />
        <Route
          path="/treatmentSuggestion/:id/:tpid"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <TreatSuggestDashs />
            )
          }
        />
        <Route
          path="/SecurityAmount/:id/:tpid"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <SecurityAmount />
            )
          }
        />
        <Route
          path="/print-security-bill/:sa_id/:tpid"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <PrintSecurityAmt />
            )
          }
        />
        <Route
          path="/TreatmentDashBoard/:tpid/:appoint_id"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <TreatmentDashBoard />
            )
          }
        />
        <Route
          path="/NewTreatment/:id/:tpid"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <NewTreatment />
            )
          }
        />
        <Route
          path="/treatProducer/:id/:appointment_id"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <TreatmentForm />
            )
          }
        />
        <Route
          path="/treatmentDashTwo/:tsid/:appoint_id/:tp_id/:treatment"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <TreatmentDashTwo />
            )
          }
        />
        <Route
          path="/NewTreatPrescription/:id"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <NewTreatPrescription />
            )
          }
        />
        <Route
          path="/PrescriptionDashBoard"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <PrescriptionDashBoard />
            )
          }
        />
        <Route
          path="/TPrescription"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <TPrescription />
            )
          }
        />
        <Route
          path="/TPrescriptionDash/:tsid/:appoint_id/:tpid/:sitting/:treatment"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <TPrescriptionDash />
            )
          }
        />
        <Route
          path="/ViewTreatPrescription/:tpid/:appoint_id/:sitting/:treatment"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <ViewTreatPrescription />
            )
          }
        />

        <Route
          path="/ViewTreatPrescriptionlist/:tpid/:appoint_id/:sitting/:treatment"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <ViewTreatPrescriptionList />
            )
          }
        />

        <Route
          path="/ViewPatientTotalBill/:tpid"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <PatientBillsByTpid />
            )
          }
        />
        {/* <Route
          path="/CreatePrescrip"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <CreatePrescrip />
            )
          }
        /> */}
        <Route
          path="/profileDashboard"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <ProfileDashboard />
            )
          }
        />
        <Route
          path="/Patient-profile/:uhid"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <PatientProfile />
            )
          }
        />
        <Route
          path="/all-patient"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <AllPatient />
            )
          }
        />

        <Route
          path="/attendance-dashboard"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <AttendanceLeave />
            )
          }
        />

        <Route
          path="/patient-due-payment-print/:tpid"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <PatintDuePaymentPrint />
            )
          }
        />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route
          path="/print-oral-testing/:id"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <Print_Oral_Blood />
            )
          }
        />

        <Route
          path="/prescription-details"
          element={
            user === null ? (
              <DoctorLogin />
            ) : loading ? (
              <>
                {" "}
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                  style={{ background: "transparent" }}
                ></Lottie>
              </>
            ) : todayAttendance.length === 0 ? (
              <AttendanceLeave />
            ) : (
              <PrescriptionDetails />
            )
          }
        />

        {/* ****************** Doctor Routes End Here ******************* */}

        {/* <Route path="/receptionist_login" element={<Login />} />
      <Route path="/receptionist_registration" element={<Registration />} />
      <Route path="/superadmin-dashboard" element={<Dashboard />} />
      <Route path="/UniversalLogin" element={<UniversalLogin />} /> */}
      </Routes>
    </>
  );
}

export default App;
