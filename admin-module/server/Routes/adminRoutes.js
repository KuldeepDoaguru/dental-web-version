const express = require("express");
const multer = require("multer");
const {
  EnrollEmployee,
  getEmployeeData,
  getBranch,
  adminLoginUser,
  sendOtp,
  verifyOtp,
  resetPassword,
  appointmentData,
  getAvailableEmp,
  getPatientDetailsByBranch,
  getBillsByBranch,
  getPurInventoryByBranch,
  getEmployeeComplainByBranch,
  updateAppointData,
  deleteAppointData,
  insertTimelineEvent,
  deleteBills,
  getBillBYBillId,
  updateBillDetailsByBillId,
  deletePurInvoice,
  downloadBillRecById,
  editEmployeeDetails,
} = require("../controllers/adminController");
const {
  getPurchaseInvByPurId,
  updatePurInvoice,
  purchaseInventory,
  getPatientDataByBranchAndId,
  getPatientBillByBranchAndId,
  getPrescriptionDetailsById,
  getAppointmentByBranchAndId,
  examinDetailsByPatId,
  getPaymentDetailsByPatId,
  getPatientTimeline,
  getEmployeeDataByBranch,
  getEmployeeDataByBranchAndId,
  downloadEarnReportByTime,
  downloadExpenseReportByTime,
  downloadAppointReportByTime,
  downloadBillingReportByTime,
  getAttendanceDetails,
  downloadAttendanceReportByTime,
  downloadStaffReport,
  getBranchDetailsByBranch,
  updateBranchCalenderSetting,
  getHolidays,
  addBlockDays,
  updateHolidays,
  deleteHolidays,
  getDrugs,
  addDrugs,
  updateDrugDetails,
  deleteDrug,
} = require("../controllers/billController");
const {
  getNotifyList,
  addNotifyCommunication,
  updateNotifyTagsDetails,
  deleteNotifyTags,
  getPrescription,
  addPrescription,
  getPrescriptionById,
  updatePrescriptionDetails,
  deletePrescription,
  addTreatment,
  getTreatmentList,
  updateTreatmentDetails,
  deleteTreatment,
  getSuperAdminNotify,
  markRead,
  addSuperAdminNotify,
} = require("../controllers/notifyController");
// const multer = require("multer");

const router = express.Router();

router.get("/getBranch", getBranch);
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
router.put(
  "/editEmployeeDetails/:branch/:empID",
  profilePictureupload.single("empProfilePicture"),
  editEmployeeDetails
);
router.get("/getEmployeeDetails", getEmployeeData);
router.post("/adminLoginUser", adminLoginUser);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.put("/resetPassword", resetPassword);
router.get("/getAppointmentData/:branch", appointmentData);
router.get("/getAvailableEmp/:branch", getAvailableEmp);
router.get("/getPatientDetailsByBranch/:branch", getPatientDetailsByBranch);
router.get("/getBillsByBranch/:branch", getBillsByBranch);
router.get("/getPurInventoryByBranch/:branch", getPurInventoryByBranch);
router.get("/getEmployeeComplainByBranch/:branch", getEmployeeComplainByBranch);
router.put("/updateAppointData/:id", updateAppointData);
router.delete("/deleteAppointData/:id", deleteAppointData);
router.post("/insertTimelineEvent", insertTimelineEvent);
router.delete("/deleteBills/:id", deleteBills);
router.get("/getBillBYBillId/:bid", getBillBYBillId);
router.put("/updateBillDetailsByBillId/:bid", updateBillDetailsByBillId);
router.delete("/deletePurInvoice/:branch/:id", deletePurInvoice);
router.get("/downloadBillRecById/:file", downloadBillRecById);

// ***********************************************************************************************
router.get("/getPurchaseInvByPurId/:branch/:id", getPurchaseInvByPurId);
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
router.put(
  "/updatePurInvoice/:branch/:id",
  upload.single("reciept_doc"),
  updatePurInvoice
);
router.get("/getPatientDataByBranchAndId/:pid", getPatientDataByBranchAndId);
router.get("/getPatientBillByBranchAndId/:pid", getPatientBillByBranchAndId);
router.get("/getPrescriptionDetailsById/:pid", getPrescriptionDetailsById);
router.get("/getAppointmentByBranchAndId/:pid", getAppointmentByBranchAndId);
router.get("/examinDetailsByPatId/:pid", examinDetailsByPatId);
router.get("/getPaymentDetailsByPatId/:pid", getPaymentDetailsByPatId);
router.get("/getPatientTimeline/:pid", getPatientTimeline);
router.get("/getEmployeeDataByBranch/:branch", getEmployeeDataByBranch);
router.get("/getEmployeeDetails/:branch/:empId", getEmployeeDataByBranchAndId);
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
router.get("/getAttendanceDetails/:branch", getAttendanceDetails);
router.post(
  "/downloadAttendanceReportByTime/:branch",
  downloadAttendanceReportByTime
);
router.post("/downloadStaffReport/:branch", downloadStaffReport);
router.get("/getBranchDetailsByBranch/:branch", getBranchDetailsByBranch);
router.put("/updateBranchCalenderSetting/:branch", updateBranchCalenderSetting);
router.get("/getHolidays/:branch", getHolidays);
router.post("/addBlockDays", addBlockDays);
router.put("/updateHolidays/:hid", updateHolidays);
router.delete("/deleteHolidays/:hid", deleteHolidays);
router.get("/getDrugs/:branch", getDrugs);
router.post("/addDrugs", addDrugs);
router.put("/updateDrugDetails/:did", updateDrugDetails);
router.delete("/deleteDrug/:did", deleteDrug);

// ***********************************************************************************************
router.get("/getNotifyList", getNotifyList);
router.post("/addNotifyCommunication", addNotifyCommunication);
router.put("/updateNotifyTagsDetails/:ntid", updateNotifyTagsDetails);
router.delete("/deleteNotifyTags/:ntid", deleteNotifyTags);
router.get("/getPrescription/:branch", getPrescription);
router.post("/addPrescription", addPrescription);
router.get("/getPrescriptionById/:prid", getPrescriptionById);
router.put("/updatePrescriptionDetails/:prid", updatePrescriptionDetails);
router.delete("/deletePrescription/:prid", deletePrescription);
router.post("/addTreatment", addTreatment);
router.get("/getTreatmentList", getTreatmentList);
router.put("/updateTreatmentDetails/:id", updateTreatmentDetails);
router.delete("/deleteTreatment/:tid", deleteTreatment);
router.get("/getSuperAdminNotify/:branch", getSuperAdminNotify);
router.put("/markRead/:snid", markRead);
router.post("/addSuperAdminNotify", addSuperAdminNotify);

module.exports = router;
