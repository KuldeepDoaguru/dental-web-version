const express = require("express");
const db = require("../connect.js");
const multer = require("multer");
const path = require("path");
const {
  dentalPediatric,
  updateDentalPediatric,
  getDentalDataByID,
  deleteDentalPediatric,
  insertTreatSuggest,
  getTreatSuggestById,
  getPatientDetails,
  getDentalPatientDataByID,
  getDentalPatientByID,
  updateSittingCount,
  addTreatPackageDetails,
  getTreatList,
  updateTreatSitting,
  updateTreatSuggestion,
  updateTreatSittingStatus,
  deleteTreatSuggestion,
  getFilteredTreat,
  getDentalDataByTpid,
  getTreatPackageViaTpidUhid,
  insertLab,
  getLabDetails,
  getPatientLabTestByPatientId,
} = require("../controller/authControl.js");
const {
  getAppointmentsWithPatientDetails,
  getAppointmentsWithPatientDetailsById,
  upDateAppointmentStatus,
  addSecurityAmount,
  getSecurityAmountByAppointmentId,
  getPatientSecurityAmt,
  updatePatientSecurityAmt,
  getAllSecurityAmounts,
  getAppointmentsWithPatientDetailsTreatSugg,
  updateAppointStatus,
  getAllAppointmentByPatientId,
  getAppointmentsViaDocId,
  bookSittingAppointment,
  updateSecurityAmount,
  getExaminedataById,
  getExaminedataByIdandexamine,
  updateSecurityAmountForRemainingAmount,
  updateAppointmentStatusAfterTreat,
  getLabTest,
  getLab,
  getExaminedataByIdandexamineAfterSitOne,
  getOnlyExaminv,
} = require("../controller/authAppointTable.js");
const {
  getBranch,
  LoginDoctor,
  billPatientData,
  billPatientDataByAppId,
  getPatientBillUHID,
  insertTimelineEvent,
  getPatientTimeline,
  getSecurityAmountDataByTPUHID,
  getPatientBillsAndSecurityAmountByBranch,
  updateRemainingSecurityAmount,
  makeBillPayment,
  sendOtp,
  verifyOtp,
  resetPassword,
  getTreatmentViaUhid,
  getExaminationViaUhid,
  getPrescriptionViaUhid,
  updateTreatmentStatus,
} = require("../controller/authBranch.js");
const {
  getTreatmentList,
  insertTreatmentData,
  getExamDataIdbyAppointId,
  getTreatmentData,
  updateTreatmentData,
  deleteTreatmentData,
  insertTreatPrescription,
  getMedicineData,
  getTreatPrescriptionByAppointId,
  deleteTreatPrescriptionById,
  getTreatmentDataSUM,
  getTreatPatientProfile,
  treatPatientUHID,
  getPrescriptionPatientProfile,
  prescripPatientUHID,
  onGoingTreat,
  getProcedureList,
  updateSecurityAmountAfterPayment,
  getTreatmentDetailsViaSitting,
  getTreatmentDataViaBranchAndTpid,
  generateFinalBillwithTpid,
  getTreatmentDetailsViaTpid,
  getTreatPrescriptionByTpid,
  getBranchDetails,
  billDetailsViaTpid,
  updateRecSecAmountAfterPayment,
  getAttendancebyempId,
  getLeaves,
  getTodayAttendance,
  MarkAttendanceLogin,
  MarkAttendanceLogout,
  applyLeave,
  getPatBills,
} = require("../controller/authTreatment.js");
const {
  uploadImage,
  getUploadedImages,
} = require("../controller/authContrimg.js");
const {
  bookAppointment,
  getTreatSuggest,
  insertLabData,
  getLabDataByAppointId,
  getBranchHoliday,
  getBranchDetail,
  getTreatment,
  getDoctorDataByBranchWithLeave,
  getTreatSuggestViaTpid,
  getPatientLabWithPatientDetails,
  patrientDetailbyid,
  patienttestdatabyid,
  getpatienttestnotesbyid,
  purchaseInventory,
} = require("../controller/authBook.js");
const authenticate = require("../middleware/authMiddleware.js");

const router = express.Router();

// Examination  Routes START here......
router.post("/dentalPediatric", authenticate, dentalPediatric);
router.put("/updatedentalPediatric/:id", authenticate, updateDentalPediatric);
router.get(
  "/getDentalDataByID/:appointmentId/:tpid",
  authenticate,
  getDentalDataByID
);
router.get(
  "/getDentalDataByTpid/:tpid/:branch",
  authenticate,
  getDentalDataByTpid
);
router.get(
  "/getDentalPatientDataByID/:patientUHID",
  authenticate,
  getDentalPatientDataByID
);
router.get(
  "/getDentalPatientByID/:patientUHID",
  authenticate,
  getDentalPatientByID
);
router.delete(
  "/deleteDentalPediatric/:id",
  authenticate,
  deleteDentalPediatric
);
// Examination  Routes END here......

// Treatment Suggestion Routes START here......
router.post("/insertTreatSuggest", authenticate, insertTreatSuggest);
router.get("/updateSittingCount/:appoint_id", authenticate, updateSittingCount);
router.post("/addSecurityAmount", authenticate, addSecurityAmount);
router.get(
  "/getTreatSuggestById/:appoint_id",
  authenticate,
  getTreatSuggestById
);
router.get(
  "/getSecurityAmountByAppointmentId/:tpid",
  authenticate,
  getSecurityAmountByAppointmentId
);
// router.get('/patient-security/:appoint_id', getPatientSecurityAmt);
router.get(
  "/patient-security/:appoint_id/:branch_name",
  authenticate,
  getPatientSecurityAmt
);
router.put(
  "/update-security-amount/:sa_id",
  authenticate,
  updatePatientSecurityAmt
);
router.get(
  "/getAllSecurityAmounts/:sa_id/:branch_name",
  authenticate,
  getAllSecurityAmounts
);
router.get("/treatPatientUHID/:patientUHID", authenticate, treatPatientUHID);
router.put("/updateSecurityAmount/:said", authenticate, updateSecurityAmount);
// Treatment Suggestion Routes END here........

// Appointment  Routes START here......
router.get(
  "/getAppointmentsWithPatientDetails",
  authenticate,
  getAppointmentsWithPatientDetails
);
router.get(
  "/getAppointmentsWithPatientDetailsById/:tpid",
  authenticate,
  getAppointmentsWithPatientDetailsById
);
router.put("/upDateAppointmentStatus", authenticate, upDateAppointmentStatus);
router.get(
  "/getAllAppointmentByPatientId/:patientId/:branch",
  authenticate,
  getAllAppointmentByPatientId
);

// just for testing treatment suggest sitting logic
router.get(
  "/getAppointmentsWithPatientDetailsTreatSugg/:doctor_id",
  authenticate,
  getAppointmentsWithPatientDetailsTreatSugg
);
// Appointment Routes END here......

// Branch Routes START here......
router.get("/get-branches", authenticate, getBranch);
router.post("/doctor-login", LoginDoctor);
router.post("/insertTimelineEvent", authenticate, insertTimelineEvent);
router.get(
  "/getPatientTimeline/:branch/:patientId",
  authenticate,
  getPatientTimeline
);
// Branch Routes END here......

// Treatment List Routes START here......
router.get("/treatmentLists", authenticate, getTreatmentList);
router.post(
  "/insertTreatmentData/:exam_id/:appointment_id/:tpid",
  authenticate,
  insertTreatmentData
);
router.get(
  "/getExamDataIdbyAppointId/:id/:appointment_id",
  authenticate,
  getExamDataIdbyAppointId
);
router.get(
  "/getTreatmentData/:appointment_id/:tpid/:branch/:sitting/:treatment",
  authenticate,
  getTreatmentData
);
router.get(
  "/treatPatientProfile/:patientUHID",
  authenticate,
  getTreatPatientProfile
);
router.put("/updateTreatmentData/:id", authenticate, updateTreatmentData);
router.delete("/deleteTreatmentData/:id", authenticate, deleteTreatmentData);

// test purpose
router.get(
  "/getTreatmentDatasum/:appointment_id",
  authenticate,
  getTreatmentDataSUM
);
// Treatment List Routes END here......

// Medical Prescription Routes START here......
router.post(
  "/insertTreatPrescription/:appoint_id/:tpid/:sitting",
  authenticate,
  insertTreatPrescription
);
router.get("/getMedicineData", authenticate, getMedicineData);
router.get(
  "/getPrescriptionPatientProfile/:patientUHID",
  authenticate,
  getPrescriptionPatientProfile
);
router.get(
  "/prescripPatientUHID/:patientUHID",
  authenticate,
  prescripPatientUHID
);
router.get(
  "/getTreatPrescriptionByAppointId/:appoint_id/:tpid/:treatment",
  authenticate,
  getTreatPrescriptionByAppointId
);

router.get(
  "/getTreatPrescriptionByTpid/:tpid/:branch",
  authenticate,
  getTreatPrescriptionByTpid
);
router.delete(
  "/deleteTreatPrescriptionById/:id",
  authenticate,
  deleteTreatPrescriptionById
);
router.put(
  "/updateAppointStatus/:appointId",
  authenticate,
  updateAppointStatus
);
router.get("/onGoingTreat/:patientUHID", authenticate, onGoingTreat);
// Medical Prescription Routes END here......

// Prescription Image Routes START here......
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Define destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post(
  "/uploadImage",
  upload.fields([
    { name: "header", maxCount: 1 },
    { name: "footer", maxCount: 1 },
    { name: "seal", maxCount: 1 },
  ]),
  uploadImage
);

router.get("/getUploadedImages", authenticate, getUploadedImages);
// Prescription Image Routes END here......

// Bill Routes START here......
router.get("/bill-patient-data", authenticate, billPatientData);
router.get(
  "/bill-patient-data/:appoint_id",
  authenticate,
  billPatientDataByAppId
);
router.get(
  "/get-patientBill-data/:patientUHID",
  authenticate,
  getPatientBillUHID
);
// Bill Routes END here......

//  Booking Appointment START here......
router.post("/bookAppointment", authenticate, bookAppointment);
router.get("/getTreatSuggest/:appoint_id", authenticate, getTreatSuggest);
router.get(
  "/getTreatSuggestViaTpid/:tpid/:branch",
  authenticate,
  getTreatSuggestViaTpid
);
//  Booking Appointment END here......

//  Patient Profile START here......
// testing
// router.get('/get-Patient-by-id/:branch/:patientId',getPatientDetails);
router.get("/get-Patient-by-id/:patientId", authenticate, getPatientDetails);
//  Patient Profile END here......

//  lab section START here......
router.post("/insertLabData", authenticate, insertLabData);
router.get("/lab-data/:appoint_id", authenticate, getLabDataByAppointId);

//  lab section END here......
// treatpackage routes
router.post("/addTreatPackageDetails", authenticate, addTreatPackageDetails);
router.get("/getTreatList/:branch/:tpid", authenticate, getTreatList);
router.put(
  "/updateTreatSitting/:branch/:tsid",
  authenticate,
  updateTreatSitting
);
router.put(
  "/updateTreatSittingStatus/:branch/:tsid",
  authenticate,
  updateTreatSittingStatus
);
router.get("/get-branch-holidays/:branch", authenticate, getBranchHoliday);
router.get("/get-branch-detail/:branch", authenticate, getBranchDetail);
router.get("/get-treatments", authenticate, getTreatment);
router.get(
  "/get-doctors-with-leave/:branch",
  authenticate,
  getDoctorDataByBranchWithLeave
);
router.get(
  "/getAppointmentsViaDocId/:branch/:did",
  authenticate,
  getAppointmentsViaDocId
);
router.post("/bookSittingAppointment", authenticate, bookSittingAppointment);
router.put(
  "/updateTreatSuggestion/:tsid/:branch",
  authenticate,
  updateTreatSuggestion
);
router.delete(
  "/deleteTreatSuggestion/:tsid/:branch",
  authenticate,
  deleteTreatSuggestion
);
router.get("/getFilteredTreat/:tpid/:branch", authenticate, getFilteredTreat);
router.get("/getExaminedataById/:tpid", authenticate, getExaminedataById);
router.get(
  "/getExaminedataByIdandexamine/:tsid/:tpid",
  authenticate,
  getExaminedataByIdandexamine
);

router.get(
  "/getExaminedataByIdandexamineAfterSitOne/:tsid/:tpid",
  authenticate,
  getExaminedataByIdandexamineAfterSitOne
);

router.get("/getProcedureList", authenticate, getProcedureList);
router.put(
  "/updateSecurityAmountAfterPayment/:tp_id",
  authenticate,
  updateSecurityAmountAfterPayment
);

router.put(
  "/updateRecSecAmountAfterPayment/:tpid",
  authenticate,
  updateRecSecAmountAfterPayment
);

router.get(
  "/getTreatmentDetailsViaSitting/:branch/:tpid/:sitting",
  authenticate,
  getTreatmentDetailsViaSitting
);

router.get(
  "/getTreatmentDetailsViaTpid/:tpid/:branch",
  authenticate,
  getTreatmentDetailsViaTpid
);
router.get(
  "/getTreatmentDataViaBranchAndTpid/:tpid/:branch",
  authenticate,
  getTreatmentDataViaBranchAndTpid
);

//patient bill via tpid
router.post(
  "/generateFinalBillwithTpid",
  authenticate,
  generateFinalBillwithTpid
);
router.get("/getBranchDetails/:branch", authenticate, getBranchDetails);
router.get("/billDetailsViaTpid/:tpid", authenticate, billDetailsViaTpid);
router.get(
  "/getAttendancebyempId/:branch/:employee_ID",
  authenticate,
  getAttendancebyempId
);
router.get("/get-leaves/:branch/:employee_Id", authenticate, getLeaves);
router.get(
  "/getTodayAttendance/:branch/:employee_ID/:date",
  authenticate,
  getTodayAttendance
);
router.post("/markAttendanceLogin", authenticate, MarkAttendanceLogin);
router.put("/markAttendanceLogout", authenticate, MarkAttendanceLogout);
router.post("/apply-leave", authenticate, applyLeave);
router.get(
  "/getSecurityAmountDataByTPUHID/:tpid",
  authenticate,
  getSecurityAmountDataByTPUHID
);
router.get(
  "/getPatientBillsAndSecurityAmountByBranch/:branch/:tpid",
  authenticate,
  getPatientBillsAndSecurityAmountByBranch
);

router.put(
  "/updateRemainingSecurityAmount/:tpid",
  authenticate,
  updateRemainingSecurityAmount
);

router.put("/makeBillPayment/:tpid/:branch", authenticate, makeBillPayment);
router.post("/sendOtp", authenticate, sendOtp);
router.post("/verifyOtp", authenticate, verifyOtp);
router.put("/resetPassword", authenticate, resetPassword);
router.get(
  "/getTreatmentViaUhid/:branch/:uhid",
  authenticate,
  getTreatmentViaUhid
);
router.get(
  "/getExaminationViaUhid/:branch/:uhid",
  authenticate,
  getExaminationViaUhid
);
router.get(
  "/getPrescriptionViaUhid/:branch/:uhid",
  authenticate,
  getPrescriptionViaUhid
);
router.put(
  "/updateTreatmentStatus/:branch/:tpid",
  authenticate,
  updateTreatmentStatus
);
// router.get('/getAllAppointmentByPatientId/:branch/:patientId',getAllAppointmentByPatientuhiId)
router.get(
  "/getTreatPackageViaTpidUhid/:branch",
  authenticate,
  getTreatPackageViaTpidUhid
);
router.put(
  "/updateSecurityAmountForRemainingAmount/:said",
  authenticate,
  updateSecurityAmountForRemainingAmount
);

router.put(
  "/updateAppointmentStatusAfterTreat/:appoint_id",
  authenticate,
  updateAppointmentStatusAfterTreat
);

router.post("/insertLab", authenticate, insertLab);
router.get("/lab-details", authenticate, getLabDetails);
router.get("/getLabTest", authenticate, getLabTest);
router.get("/getLab", authenticate, getLab);
router.get(
  "/getPatientLabTestByPatientId/:pid",
  authenticate,
  getPatientLabTestByPatientId
);
// router.get("/branches/:branch_name", authenticate, getBranchDetails);
router.get("/getOnlyExaminv/:tpid/:examId", authenticate, getOnlyExaminv);
router.get("/getPatBills/:branch", authenticate, getPatBills);
router.get(
  "/getPatientLabWithPatientDetails/:tpid",
  getPatientLabWithPatientDetails
);
router.get("/get-patient-details-by-id/:id", patrientDetailbyid);
router.get("/get-patient-test-details-by-id/:id", patienttestdatabyid);
router.get(
  "/getpatienttest-notes/:testId",
  authenticate,
  getpatienttestnotesbyid
);

router.post("/purchaseInventory/:branch", purchaseInventory);

module.exports = { authRoutes: router };
