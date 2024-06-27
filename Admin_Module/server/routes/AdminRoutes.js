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
  sendOtpEmail,
    applyLeave,
  getLeaves,
  MarkAttendanceLogin,
  MarkAttendanceLogout,
  getTodayAttendance,
  getAttendancebyempId,
    approveLeave,
  getLeaveList,
  getLabData,
  getRefundOpdAmountData,
  getRefundAmountData,
 
} = require("../controllers/AdminController");
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
  downloadLabReportByTime,
  downloadOPDReportByTime,
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
  getTreatSuggest,
  getTreatmentViaUhid,
  getPatientBillUHID,
  getExaminationViaUhid,
  getPrescriptionViaUhid,
   addLab, getLabList, updateLabDetails, labDelete,  addLabTest,
  getLabTest,
  updateLabTestDetails,
  labTestDelete, getPatientLabTest, getPatientLabTestCompleted, getPatientLabTestByPatientId
} = require("../controllers/notifyController");
const authenticate = require("../middleware/authMiddleware.js");

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
  profilePictureupload.single("empProfilePicture"), authenticate,
  EnrollEmployee
);
router.put(
  "/editEmployeeDetails/:branch/:empID",
  profilePictureupload.single("empProfilePicture"),authenticate,
  editEmployeeDetails
);
router.get("/getEmployeeDetails", getEmployeeData);
router.post("/adminLoginUser", adminLoginUser);
router.post("/sendOtp", sendOtp);
router.post("/sendOtpEmail", sendOtpEmail);
router.post("/verifyOtp", verifyOtp);
router.put("/resetPassword", resetPassword);
router.get("/getAppointmentData/:branch", authenticate, appointmentData);
router.get("/getAvailableEmp/:branch",authenticate, getAvailableEmp);
router.get("/getPatientDetailsByBranch/:branch",authenticate, getPatientDetailsByBranch);
router.get("/getBillsByBranch/:branch",authenticate, getBillsByBranch);
router.get("/getPurInventoryByBranch/:branch",authenticate, getPurInventoryByBranch);
router.get("/getEmployeeComplainByBranch/:branch",authenticate, getEmployeeComplainByBranch);
router.put("/updateAppointData/:id",authenticate, updateAppointData);
router.delete("/deleteAppointData/:id",authenticate, deleteAppointData);
router.post("/insertTimelineEvent",authenticate, insertTimelineEvent);
router.delete("/deleteBills/:id",authenticate, deleteBills);
router.get("/getBillBYBillId/:bid",authenticate, getBillBYBillId);
router.put("/updateBillDetailsByBillId/:bid",authenticate, updateBillDetailsByBillId);
router.delete("/deletePurInvoice/:branch/:id",authenticate, deletePurInvoice);
router.get("/downloadBillRecById/:file",authenticate, downloadBillRecById);
router.get("/getLabData/:branch",authenticate, getLabData);
router.post("/downloadLabReportByTime/:branch",authenticate, downloadLabReportByTime);
router.post("/downloadOPDReportByTime/:branch",authenticate, downloadOPDReportByTime);



// *******************************************************************************************************

router.get("/getPurchaseInvByPurId/:branch/:id",authenticate, getPurchaseInvByPurId);
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
  upload.single("reciept_doc"),authenticate,
  purchaseInventory
);
router.put(
  "/updatePurInvoice/:branch/:id",
  upload.single("reciept_doc"),authenticate,
  updatePurInvoice
);
router.get("/getPatientDataByBranchAndId/:pid",authenticate, getPatientDataByBranchAndId);
router.get("/getPatientBillByBranchAndId/:branch/:uhid",authenticate, getPatientBillByBranchAndId);
router.get("/getPrescriptionDetailsById/:pid",authenticate, getPrescriptionDetailsById);
router.get("/getAppointmentByBranchAndId/:branch/:pid",authenticate, getAppointmentByBranchAndId);
router.get("/examinDetailsByPatId/:pid",authenticate, examinDetailsByPatId);
router.get("/getPaymentDetailsByPatId/:pid",authenticate, getPaymentDetailsByPatId);
router.get("/getPatientTimeline/:pid",authenticate, getPatientTimeline);
router.get("/getEmployeeDataByBranch/:branch",authenticate, getEmployeeDataByBranch);
router.get("/getEmployeeDetails/:branch/:empId",authenticate, getEmployeeDataByBranchAndId);
router.post("/downloadEarnReportByTime/:branch",authenticate, downloadEarnReportByTime);
router.post(
  "/downloadExpenseReportByTime/:branch",authenticate,
  downloadExpenseReportByTime
);
router.post(
  "/downloadAppointReportByTime/:branch",authenticate,
  downloadAppointReportByTime
);
router.post(
  "/downloadBillingReportByTime/:branch",authenticate,
  downloadBillingReportByTime
);
router.get("/getAttendanceDetails/:branch",authenticate, getAttendanceDetails);
router.post(
  "/downloadAttendanceReportByTime/:branch",authenticate,
  downloadAttendanceReportByTime
);
router.post("/downloadStaffReport/:branch",authenticate, downloadStaffReport);
router.get("/getBranchDetailsByBranch/:branch",authenticate, getBranchDetailsByBranch);
router.put("/updateBranchCalenderSetting/:branch",authenticate, updateBranchCalenderSetting);
router.get("/getHolidays/:branch",authenticate, getHolidays);
router.post("/addBlockDays",authenticate, addBlockDays);
router.put("/updateHolidays/:hid",authenticate, updateHolidays);
router.delete("/deleteHolidays/:hid",authenticate, deleteHolidays);
router.get("/getDrugs/:branch",authenticate, getDrugs);
router.post("/addDrugs",authenticate, addDrugs);
router.put("/updateDrugDetails/:did",authenticate, updateDrugDetails);
router.delete("/deleteDrug/:did",authenticate, deleteDrug);

//*******************************************************************************************
router.get("/getNotifyList",authenticate, getNotifyList);
router.post("/addNotifyCommunication",authenticate, addNotifyCommunication);
router.put("/updateNotifyTagsDetails/:ntid",authenticate, updateNotifyTagsDetails);
router.delete("/deleteNotifyTags/:ntid",authenticate, deleteNotifyTags);
router.get("/getPrescription/:branch",authenticate, getPrescription);
// router.post("/addPrescription", addPrescription);
router.post("/addPrescription/:branch",authenticate, addPrescription);

router.get("/getPrescriptionById/:prid",authenticate, getPrescriptionById);
router.put("/updatePrescriptionDetails/:prid",authenticate, updatePrescriptionDetails);
router.delete("/deletePrescription/:prid",authenticate, deletePrescription);
router.post("/addTreatment",authenticate, addTreatment);
router.get("/getTreatmentList",authenticate, getTreatmentList);
router.put("/updateTreatmentDetails/:id",authenticate, updateTreatmentDetails);
router.delete("/deleteTreatment/:tid",authenticate, deleteTreatment);
// router.get("/getSuperAdminNotify/:branch",authenticate, getSuperAdminNotify);
router.get("/getSuperAdminNotify",authenticate, getSuperAdminNotify);
router.put("/markRead/:snid",authenticate, markRead);
router.post("/addSuperAdminNotify",authenticate, addSuperAdminNotify);
router.get("/getTreatSuggest/:branch",authenticate, getTreatSuggest);
router.get("/getTreatmentViaUhid/:branch/:uhid",authenticate, getTreatmentViaUhid);
router.get("/get-patientBill-data/:patientUHID",authenticate, getPatientBillUHID);
router.get("/getExaminationViaUhid/:branch/:uhid",authenticate, getExaminationViaUhid);
router.get("/getPrescriptionViaUhid/:branch/:uhid",authenticate, getPrescriptionViaUhid);
router.get("/getLeaveList/:branch",authenticate, getLeaveList);
router.put("/approveLeave/:lid",authenticate, approveLeave);
router.post("/addLab",authenticate, addLab);
router.get("/getLabList/:branch",authenticate, getLabList);
router.put("/updateLabDetails/:lid",authenticate, updateLabDetails);
router.delete("/labDelete/:lid", authenticate, labDelete);
router.post("/addLabTest",authenticate, addLabTest);
router.get("/getLabTest",authenticate, getLabTest);
router.put("/updateLabTestDetails/:ltid",authenticate, updateLabTestDetails);
router.delete("/labTestDelete/:ltid",authenticate, labTestDelete);
router.get("/getPatientLabTest",authenticate, getPatientLabTest);
router.get("/getPatientLabTestCompleted",authenticate, getPatientLabTestCompleted);
router.get("/getPatientLabTestByPatientId/:pid",authenticate, getPatientLabTestByPatientId);



////

router.post("/markAttendanceLogin", MarkAttendanceLogin);
router.put("/markAttendanceLogout", MarkAttendanceLogout);
router.get("/getTodayAttendance/:branch/:employee_ID/:date",getTodayAttendance);
router.get("/getAttendancebyempId/:branch/:employee_ID", getAttendancebyempId);
router.post("/apply-leave", applyLeave);
router.get("/get-leaves/:branch/:employee_Id", getLeaves);

router.get("/getLeaveList", getLeaveList);
router.put("/approveLeave/:lid", approveLeave);
router.get("/getRefundOpdAmountData/:branch", authenticate, getRefundOpdAmountData);
router.get("/getRefundAmountData/:branch", authenticate, getRefundAmountData);



module.exports = router;
