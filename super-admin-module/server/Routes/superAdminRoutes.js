const express = require("express");
const multer = require("multer");
const {
  EnrollEmployee,
  EditEmployeeDetails,
  getEmployeeData,
  superAdminLoginUser,
  sendOtp,
  verifyOtp,
  getBranch,
  makeAppointents,
  appointmentData,
  getAvailableEmp,
  addTreatment,
  getTreatmentList,
  updateTreatmentDetails,
  getPatientDetailsByBranch,
  purchaseInventory,
  getPurInventoryByBranch,
  addEmployeeComplain,
  getEmployeeComplainByBranch,
  updateAppointData,
  deleteAppointData,
  getEmployeeDataByBranch,
  getEmployeeDataByBranchAndId,
  resetPassword,
} = require("../controllers/superAdminController");
const {
  makeBills,
  getBillsByBranch,
  deleteBills,
  getPurchaseBillByBranch,
  getPurchaseInvByPurId,
  updatePurInvoice,
  deletePurInvoice,
  editEmployeeDetails,
  getPatientDataByBranchAndId,
  getPatientBillByBranchAndId,
  getAppointmentByBranchAndId,
  examinDetailsByPatId,
  getPaymentDetailsByPatId,
  getPrescriptionDetailsById,
  insertTimelineEvent,
  getPatientTimeline,
  addLab,
  updateBranchDetails,
  updateBillDetailsByBillId,
  getBillBYBillId,
  downloadBillRecById,
  downloadEarnReportByTime,
  downloadExpenseReportByTime,
  downloadAppointReportByTime,
  downloadBillingReportByTime,
  downloadStaffReport,
} = require("../controllers/BillSectionController");
const {
  getAttendanceDetails,
  downloadAttendanceReportByTime,
  getBranchDetailsByBranch,
  updateBranchCalenderSetting,
  addBlockDays,
  getHolidays,
  updateHolidays,
  deleteHolidays,
  addDrugs,
  getDrugs,
  updateDrugDetails,
  deleteDrug,
  addPrescription,
  getPrescription,
  updatePrescriptionDetails,
  getPrescriptionById,
  deletePrescription,
  deleteTreatment,
  addNotifyCommunication,
  getNotifyList,
  updateNotifyTagsDetails,
  deleteNotifyTags,
  addSuperAdminNotify,
  getSuperAdminNotify,
  markRead,
  getComplainById,
  updateComplaints,
  downloadEmployeeComplaintReport,
} = require("../controllers/attendanceController");
const {
  getTreatSuggest,
  getTreatmentViaUhid,
  getExaminationViaUhid,
  getPrescriptionViaUhid,
  getPatientBillUHID,
} = require("../controllers/superTreatController");
// const multer = require("multer");

const router = express.Router();

const profilePicturestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "empProfilePicture/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const profilePictureupload = multer({ storage: profilePicturestorage });
router.post(
  "/enroll-employee",
  profilePictureupload.single("empProfilePicture"),
  EnrollEmployee
);
router.put("/EditEmployeeDetails/:emp_id", EditEmployeeDetails);
router.get("/getEmployeeDetails/:branch/:empId", getEmployeeDataByBranchAndId);
router.get("/getEmployeeDataByBranch/:branch", getEmployeeDataByBranch);
router.post("/adminLoginUser", superAdminLoginUser);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.get("/getBranch", getBranch);
router.post("/makeAppointents", makeAppointents);
router.get("/getAppointmentData/:branch", appointmentData);
router.get("/getAvailableEmp/:branch", getAvailableEmp);
router.post("/addTreatment", addTreatment);
router.get("/getTreatmentList", getTreatmentList);
router.put("/updateTreatmentDetails/:id", updateTreatmentDetails);
router.get("/getPatientDetailsByBranch/:branch", getPatientDetailsByBranch);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "reciept_doc/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/purchaseInventory",
  upload.single("reciept_doc"),
  purchaseInventory
);
router.get("/getPurInventoryByBranch/:branch", getPurInventoryByBranch);
router.post("/addEmployeeComplain", addEmployeeComplain);
router.get("/getEmployeeComplainByBranch/:branch", getEmployeeComplainByBranch);
router.put("/updateAppointData/:id", updateAppointData);
router.delete("/deleteAppointData/:id", deleteAppointData);
router.put("/resetPassword", resetPassword);

// ************************************************************************************************
//bill and inventory routes
router.post("/makeBills", makeBills);
router.get("/getBillsByBranch/:branch", getBillsByBranch);
router.delete("/deleteBills/:id", deleteBills);
router.get("/getPurchaseInvByPurId/:branch/:id", getPurchaseInvByPurId);
router.put(
  "/updatePurInvoice/:branch/:id",
  upload.single("reciept_doc"),
  updatePurInvoice
);

router.delete("/deletePurInvoice/:branch/:id", deletePurInvoice);
router.put(
  "/editEmployeeDetails/:branch/:empID",
  profilePictureupload.single("empProfilePicture"),
  editEmployeeDetails
);

router.get("/getPatientDataByBranchAndId/:pid", getPatientDataByBranchAndId);

router.get(
  "/getPatientBillByBranchAndId/:branch/:pid",
  getPatientBillByBranchAndId
);
router.get("/getAppointmentByBranchAndId/:pid", getAppointmentByBranchAndId);

router.get("/examinDetailsByPatId/:pid", examinDetailsByPatId);
router.get("/getPaymentDetailsByPatId/:pid", getPaymentDetailsByPatId);
router.get("/getPrescriptionDetailsById/:pid", getPrescriptionDetailsById);
router.post("/insertTimelineEvent", insertTimelineEvent);
router.get("/getPatientTimeline/:pid", getPatientTimeline);
router.post("/addLab", addLab);
router.put("/updateBranchDetails/:bid", updateBranchDetails);
router.put("/updateBillDetailsByBillId/:bid", updateBillDetailsByBillId);
router.get("/getBillBYBillId/:bid", getBillBYBillId);
router.get("/downloadBillRecById/:file", downloadBillRecById);
router.post("/downloadEarnReportByTime/:branch", downloadEarnReportByTime);
router.post(
  "/downloadExpenseReportByTime/:branch",
  downloadExpenseReportByTime
);
router.post(
  "/downloadAppointReportByTime/:branch",
  downloadAppointReportByTime
);
router.post(
  "/downloadBillingReportByTime/:branch",
  downloadBillingReportByTime
);

router.post("/downloadStaffReport/:branch", downloadStaffReport);

//**************************************************************************************************** */
//Attendance routes

router.get("/getAttendanceDetails/:branch", getAttendanceDetails);
router.post(
  "/downloadAttendanceReportByTime/:branch",
  downloadAttendanceReportByTime
);
router.get("/getBranchDetailsByBranch/:branch", getBranchDetailsByBranch);
router.put("/updateBranchCalenderSetting/:branch", updateBranchCalenderSetting);
router.post("/addBlockDays", addBlockDays);
router.get("/getHolidays/:branch", getHolidays);
router.put("/updateHolidays/:hid", updateHolidays);
router.delete("/deleteHolidays/:hid", deleteHolidays);
router.post("/addDrugs", addDrugs);
router.get("/getDrugs/:branch", getDrugs);
router.put("/updateDrugDetails/:did", updateDrugDetails);
router.delete("/deleteDrug/:did", deleteDrug);
router.post("/addPrescription", addPrescription);
router.get("/getPrescription/:branch", getPrescription);
router.put("/updatePrescriptionDetails/:prid", updatePrescriptionDetails);
router.get("/getPrescriptionById/:prid", getPrescriptionById);
router.delete("/deletePrescription/:prid", deletePrescription);
router.delete("/deleteTreatment/:tid", deleteTreatment);
router.post("/addNotifyCommunication", addNotifyCommunication);
router.get("/getNotifyList", getNotifyList);
router.put("/updateNotifyTagsDetails/:ntid", updateNotifyTagsDetails);
router.delete("/deleteNotifyTags/:ntid", deleteNotifyTags);
router.post("/addSuperAdminNotify", addSuperAdminNotify);
router.get("/getSuperAdminNotify", getSuperAdminNotify);
router.put("/markRead/:snid", markRead);
router.get("/getComplainById/:cid", getComplainById);
router.put("/updateComplaints/:cid", updateComplaints);
router.post(
  "/downloadEmployeeComplaintReport/:branch",
  downloadEmployeeComplaintReport
);

//**************************************************************************************************** */
//Treatment routes
router.get("/getTreatSuggest/:branch", getTreatSuggest);
router.get("/getTreatmentViaUhid/:branch/:uhid", getTreatmentViaUhid);
router.get("/getExaminationViaUhid/:branch/:uhid", getExaminationViaUhid);
router.get("/getPrescriptionViaUhid/:branch/:uhid", getPrescriptionViaUhid);
router.get("/get-patientBill-data/:patientUHID", getPatientBillUHID);

module.exports = router;
