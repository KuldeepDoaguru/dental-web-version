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
  deleteTreatSuggestion,
  getFilteredTreat,
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
} = require("../controller/authAppointTable.js");
const {
  getBranch,
  LoginDoctor,
  billPatientData,
  billPatientDataByAppId,
  getPatientBillUHID,
  insertTimelineEvent,
  getPatientTimeline,
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
} = require("../controller/authBook.js");

const router = express.Router();

// Examination  Routes START here......
router.post("/dentalPediatric", dentalPediatric);
router.put("/updatedentalPediatric/:id", updateDentalPediatric);
router.get("/getDentalDataByID/:appointmentId", getDentalDataByID);
router.get("/getDentalPatientDataByID/:patientUHID", getDentalPatientDataByID);
router.get("/getDentalPatientByID/:patientUHID", getDentalPatientByID);
router.delete("/deleteDentalPediatric/:id", deleteDentalPediatric);
// Examination  Routes END here......

// Treatment Suggestion Routes START here......
router.post("/insertTreatSuggest", insertTreatSuggest);
router.get("/updateSittingCount/:appoint_id", updateSittingCount);
router.post("/addSecurityAmount", addSecurityAmount);
router.get("/getTreatSuggestById/:appoint_id", getTreatSuggestById);
router.get(
  "/getSecurityAmountByAppointmentId/:appointment_id",
  getSecurityAmountByAppointmentId
);
// router.get('/patient-security/:appoint_id', getPatientSecurityAmt);
router.get("/patient-security/:appoint_id/:branch_name", getPatientSecurityAmt);
router.put("/update-security-amount/:sa_id", updatePatientSecurityAmt);
router.get("/getAllSecurityAmounts/:sa_id/:branch_name", getAllSecurityAmounts);
router.get("/treatPatientUHID/:patientUHID", treatPatientUHID);
router.put("/updateSecurityAmount/:said", updateSecurityAmount);
// Treatment Suggestion Routes END here........

// Appointment  Routes START here......
router.get(
  "/getAppointmentsWithPatientDetails",
  getAppointmentsWithPatientDetails
);
router.get(
  "/getAppointmentsWithPatientDetailsById/:id",
  getAppointmentsWithPatientDetailsById
);
router.put("/upDateAppointmentStatus", upDateAppointmentStatus);
router.get(
  "/getAllAppointmentByPatientId/:patientId/:branch",
  getAllAppointmentByPatientId
);

// just for testing treatment suggest sitting logic
router.get("/appointtreatSitting", getAppointmentsWithPatientDetailsTreatSugg);
// Appointment Routes END here......

// Branch Routes START here......
router.get("/get-branches", getBranch);
router.post("/doctor-login", LoginDoctor);
router.post("/insertTimelineEvent", insertTimelineEvent);
router.get("/getPatientTimeline/:branch/:patientId", getPatientTimeline);
// Branch Routes END here......

// Treatment List Routes START here......
router.get("/treatmentLists", getTreatmentList);
router.post(
  "/insertTreatmentData/:exam_id/:appointment_id",
  insertTreatmentData
);
router.get(
  "/getExamDataIdbyAppointId/:id/:appointment_id",
  getExamDataIdbyAppointId
);
router.get("/getTreatmentData/:appointment_id", getTreatmentData);
router.get("/treatPatientProfile/:patientUHID", getTreatPatientProfile);
router.put("/updateTreatmentData/:id", updateTreatmentData);
router.delete("/deleteTreatmentData/:id", deleteTreatmentData);

// test purpose
router.get("/getTreatmentDatasum/:appointment_id", getTreatmentDataSUM);
// Treatment List Routes END here......

// Medical Prescription Routes START here......
router.post("/insertTreatPrescription/:appoint_id", insertTreatPrescription);
router.get("/getMedicineData", getMedicineData);
router.get(
  "/getPrescriptionPatientProfile/:patientUHID",
  getPrescriptionPatientProfile
);
router.get("/prescripPatientUHID/:patientUHID", prescripPatientUHID);
router.get(
  "/getTreatPrescriptionByAppointId/:appoint_id",
  getTreatPrescriptionByAppointId
);
router.delete("/deleteTreatPrescriptionById/:id", deleteTreatPrescriptionById);
router.put("/updateAppointStatus/:appointId", updateAppointStatus);
router.get("/onGoingTreat/:patientUHID", onGoingTreat);
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

router.get("/getUploadedImages", getUploadedImages);
// Prescription Image Routes END here......

// Bill Routes START here......
router.get("/bill-patient-data", billPatientData);
router.get("/bill-patient-data/:appoint_id", billPatientDataByAppId);
router.get("/get-patientBill-data/:patientUHID", getPatientBillUHID);
// Bill Routes END here......

//  Booking Appointment START here......
router.post("/bookAppointment", bookAppointment);
router.get("/getTreatSuggest/:appoint_id", getTreatSuggest);
//  Booking Appointment END here......

//  Patient Profile START here......
// testing
// router.get('/get-Patient-by-id/:branch/:patientId',getPatientDetails);
router.get("/get-Patient-by-id/:patientId", getPatientDetails);
//  Patient Profile END here......

//  lab section START here......
router.post("/insertLabData", insertLabData);
router.get("/lab-data/:appoint_id", getLabDataByAppointId);

//  lab section END here......
// treatpackage routes
router.post("/addTreatPackageDetails", addTreatPackageDetails);
router.get("/getTreatList/:branch/:tpid", getTreatList);
router.put("/updateTreatSitting/:branch/:tsid", updateTreatSitting);
router.get("/get-branch-holidays/:branch", getBranchHoliday);
router.get("/get-branch-detail/:branch", getBranchDetail);
router.get("/get-treatments", getTreatment);
router.get("/get-doctors-with-leave/:branch", getDoctorDataByBranchWithLeave);
router.get("/getAppointmentsViaDocId/:branch/:did", getAppointmentsViaDocId);
router.post("/bookSittingAppointment", bookSittingAppointment);
router.put("/updateTreatSuggestion/:tsid/:branch", updateTreatSuggestion);
router.delete("/deleteTreatSuggestion/:tsid/:branch", deleteTreatSuggestion);
router.get("/getFilteredTreat/:tpid/:branch", getFilteredTreat);

module.exports = { authRoutes: router };
