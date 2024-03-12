const express = require("express");
const multer = require("multer");
const {
  EnrollEmployee,
  EditEmployeeDetails,
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
} = require("../controllers/billController");
// const multer = require("multer");

const router = express.Router();

router.get("/getBranch", getBranch);
router.post("/enroll-employee", EnrollEmployee);
router.put("/EditEmployeeDetails/:emp_id", EditEmployeeDetails);
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
module.exports = router;
