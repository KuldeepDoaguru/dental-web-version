const express = require("express");
const multer = require("multer");
const {
  getValue,
  accountantLoginUser,
  sendOtp,
  verifyOtp,
  resetPassword,
  getOPDDetailsByBranch,
  getTreatmentDetailsByBranch,
  voucherCreate,
  getVoucherListByBranch,
  getPatientBillsByBranch,
  getBillsByBranch,
  getPurInventoryByBranch,
  appointmentData,
  addSecurityAmount,
  //   getAppointmentDetailsViaID,
  getSecurityAmountDataByBranch,
  updateSecurityAmount,
  getSecurityAmountDataBySID,
  updateRefundAmount,
  updatePatientSecurityAmt,
  getBranchDetailsByBranch,
  getAppointmentDetailsViaIDForOPD,
  //   getTreatmentAmountByBranch,
  getPatientBillsAndSecurityAmountByBranch,
  makeBillPayment,
  paidBillLIst,
  paidBillDetails,
  getEmployeeListByBranch,
  addEmployeeSalary,
  MarkAttendanceLogin,
  MarkAttendanceLogout,
  getTodayAttendance,
  getAttendancebyempId,
  getLeaves,
  applyLeave,
  getAppointmentById,
  getVoucherDataByBranchID,
  getTreatmentTotal,
  getTreatmentTotalById,
  getSecurityAmountDataByTPUHID,
  updateRemainingAmount,
  updateRemainingSecurityAmount,
  billDetailsViaTpid,
  getTreatSuggestViaTpid,
  getTreatPrescriptionByTpid,
  getTreatmentDetailsViaTpid,
  getDentalDataByTpid,
  getAppointmentsWithPatientDetailsById,
  getEmployeeDetails,
  getEmployeeListByBranchByID,
  updateTreatmentStatus,
  getBranchDetail,
  getBranchHoliday,
  getPatientLabTest,
  getPatientLabTestByPatientId,
  getPatientLabTestCompleted,
  getPatients,
  getPatientById,
  getTreatmentViaUhid,
  getPrescriptionViaUhid,
  getBillViaUhid,
  getExaminationViaUhid,
  getAllAppointmentByPatientId,
  getPatientTimeline,
  appointmentDataopd,
  getDoctorDataByBranch,
} = require("../controllers/accountantController");
// const {
//   getEmployeeListByBranchByID,
// } = require("../controllers/employeeController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/home", getValue);
// router.get("/home", (req, res) => {
//   res.send("<h1>Welcome to dev guru</h1>");
// });

router.post("/accountantLoginUser", accountantLoginUser);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.put("/resetPassword", resetPassword);

router.get(
  "/getOPDDetailsByBranch/:branch",
  authenticate,
  getOPDDetailsByBranch
);
router.get(
  "/getTreatmentDetailsByBranch/:branch",
  authenticate,
  getTreatmentDetailsByBranch
);
router.post("/voucherCreate", authenticate, voucherCreate);
router.get(
  "/getVoucherListByBranch/:branch",
  authenticate,
  getVoucherListByBranch
);

router.get(
  "/getPatientBillsByBranch/:branch",
  authenticate,
  getPatientBillsByBranch
);
router.get("/getBillsByBranch/:branch", authenticate, getBillsByBranch);
router.get(
  "/getPurInventoryByBranch/:branch",
  authenticate,
  getPurInventoryByBranch
);
router.get("/getAppointmentData/:branch", authenticate, appointmentData);
router.get("/appointmentDataopd/:branch", authenticate, appointmentDataopd);
router.post("/addSecurityAmount", authenticate, addSecurityAmount);
// router.get("/getAppointmentDetailsViaID/:id", getAppointmentDetailsViaID);
router.get(
  "/getAppointmentDetailsViaIDOPD/:id",
  authenticate,
  getAppointmentDetailsViaIDForOPD
);
router.get(
  "/getSecurityAmountDataByBranch/:branch",
  authenticate,
  getSecurityAmountDataByBranch
);

router.put("/updateSecurityAmount/:sid", authenticate, updateSecurityAmount);
router.get(
  "/getSecurityAmountDataBySID/:sid",
  authenticate,
  getSecurityAmountDataBySID
);
router.put("/updateRefundAmount/:sid", authenticate, updateRefundAmount);
router.put(
  "/updatePatientSecurityAmt/:sid",
  authenticate,
  updatePatientSecurityAmt
);
router.get(
  "/getBranchDetailsByBranch/:branch",
  authenticate,
  getBranchDetailsByBranch
);
// router.get("/getTreatmentAmountByBranch/:branch", getTreatmentAmountByBranch);
router.get(
  "/getPatientBillsAndSecurityAmountByBranch/:branch/:bid",
  authenticate,
  getPatientBillsAndSecurityAmountByBranch
);

router.put("/makeBillPayment/:branch/:bid", authenticate, makeBillPayment);
router.get("/paidBillLIst/:branch", authenticate, paidBillLIst);
router.get("/getEmployeeDetails/:branch/:id", authenticate, getEmployeeDetails);
router.get("/paidBillDetails/:branch/:bid", authenticate, paidBillDetails);
router.get(
  "/getEmployeeListByBranch/:branch",
  authenticate,
  getEmployeeListByBranch
);
router.post("/addEmployeeSalary/:branch", authenticate, addEmployeeSalary);
router.get(
  "/getEmployeeListByBranchByID/:branch/:slid",
  authenticate,
  getEmployeeListByBranchByID
);

// // start working

router.post("/markAttendanceLogin", authenticate, MarkAttendanceLogin);
router.put("/markAttendanceLogout", authenticate, MarkAttendanceLogout);
router.get(
  "/getTodayAttendance/:branch/:employee_ID/:date",
  authenticate,
  getTodayAttendance
);
router.get(
  "/getAttendancebyempId/:branch/:employee_ID",
  authenticate,
  getAttendancebyempId
);
router.post("/apply-leave", authenticate, applyLeave);
router.get("/get-leaves/:branch/:employee_Id", authenticate, getLeaves);
router.get(
  "/get-appointment-by-id/:branch/:appointmentId",
  authenticate,
  getAppointmentById
);
router.get("/voucher/:branch/:id", authenticate, getVoucherDataByBranchID);
router.get("/getTreatmentTotal/:branch", authenticate, getTreatmentTotal);
router.get(
  "/getTreatmentTotal/:appointID/:uhid",
  authenticate,
  getTreatmentTotalById
);
router.get(
  "/getSecurityAmountDataByTPUHID/:tpid/:uhid",
  authenticate,
  getSecurityAmountDataByTPUHID
);
router.put(
  "/updateRemainingAmount/:tp_id/:uhid",
  authenticate,
  updateRemainingAmount
);
router.put(
  "/updateRemainingSecurityAmount/:tp_id/:uhid",
  authenticate,
  updateRemainingSecurityAmount
);

router.get("/get-branch-detail/:branch", getBranchDetail);
router.get("/get-branch-holidays/:branch", authenticate, getBranchHoliday);

// // Final Bill routers

router.get("/billDetailsViaTpid/:tpid", authenticate, billDetailsViaTpid);
router.get(
  "/getTreatSuggestViaTpid/:tpid/:branch",
  authenticate,
  getTreatSuggestViaTpid
);
router.get(
  "/getTreatPrescriptionByTpid/:tpid/:branch",
  authenticate,
  getTreatPrescriptionByTpid
);
router.get(
  "/getTreatmentDetailsViaTpid/:tpid/:branch",
  authenticate,
  getTreatmentDetailsViaTpid
);
router.get(
  "/getDentalDataByTpid/:tpid/:branch",
  authenticate,
  getDentalDataByTpid
);
router.get(
  "/getAppointmentsWithPatientDetailsById/:tpid",
  authenticate,
  getAppointmentsWithPatientDetailsById
);
router.put(
  "/updateTreatmentStatus/:branch/:tpid",
  authenticate,
  updateTreatmentStatus
);
router.get("/getPatientLabTest", authenticate, getPatientLabTest);
router.get(
  "/getPatientLabTestByPatientId/:pid",
  authenticate,
  getPatientLabTestByPatientId
);
router.get(
  "/getPatientLabTestCompleted",
  authenticate,
  getPatientLabTestCompleted
);

// Patient Profile API's-------

router.get("/get-Patients/:branch", getPatients);
router.get("/get-Patient-by-id/:branch/:patientId", getPatientById);
router.get("/getTreatmentViaUhid/:branch/:uhid", getTreatmentViaUhid);
router.get("/getPrescriptionViaUhid/:branch/:uhid", getPrescriptionViaUhid);
router.get("/getBillsViaUhid/:branch/:uhid", getBillViaUhid);
router.get("/getExaminationViaUhid/:branch/:uhid", getExaminationViaUhid);
router.get(
  "/getAllAppointmentByPatientId/:branch/:patientId",
  getAllAppointmentByPatientId
);
router.get("/getPatientTimeline/:branch/:patientId", getPatientTimeline);

router.get("/get-doctors/:branch", getDoctorDataByBranch);

module.exports = router;
