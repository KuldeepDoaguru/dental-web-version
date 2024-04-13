const express = require("express");
const multer = require("multer");
const {
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
  getAppointmentDetailsViaID,
  getSecurityAmountDataByBranch,
  updateSecurityAmount,
  getSecurityAmountDataBySID,
  updateRefundAmount,
  updatePatientSecurityAmt,
  getBranchDetailsByBranch,
  getAppointmentDetailsViaIDForOPD,
  getTreatmentAmountByBranch,
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
} = require("../controllers/accountantController");
const {
  getEmployeeListByBranchByID,
} = require("../controllers/employeeController");

const router = express.Router();

router.post("/accountantLoginUser", accountantLoginUser);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.put("/resetPassword", resetPassword);
router.get("/getOPDDetailsByBranch/:branch", getOPDDetailsByBranch);
router.get("/getTreatmentDetailsByBranch/:branch", getTreatmentDetailsByBranch);
router.post("/voucherCreate", voucherCreate);
router.get("/getVoucherListByBranch/:branch", getVoucherListByBranch);

router.get("/getPatientBillsByBranch/:branch", getPatientBillsByBranch);
router.get("/getBillsByBranch/:branch", getBillsByBranch);
router.get("/getPurInventoryByBranch/:branch", getPurInventoryByBranch);
router.get("/getAppointmentData/:branch", appointmentData);
router.post("/addSecurityAmount", addSecurityAmount);
router.get("/getAppointmentDetailsViaID/:id", getAppointmentDetailsViaID);
router.get(
  "/getAppointmentDetailsViaIDOPD/:id",
  getAppointmentDetailsViaIDForOPD
);
router.get(
  "/getSecurityAmountDataByBranch/:branch",
  getSecurityAmountDataByBranch
);

router.put("/updateSecurityAmount/:sid", updateSecurityAmount);
router.get("/getSecurityAmountDataBySID/:sid", getSecurityAmountDataBySID);
router.put("/updateRefundAmount/:sid", updateRefundAmount);
router.put("/updatePatientSecurityAmt/:sid", updatePatientSecurityAmt);
router.get("/getBranchDetailsByBranch/:branch", getBranchDetailsByBranch);
router.get("/getTreatmentAmountByBranch/:branch", getTreatmentAmountByBranch);
router.get(
  "/getPatientBillsAndSecurityAmountByBranch/:branch/:bid",
  getPatientBillsAndSecurityAmountByBranch
);

router.put("/makeBillPayment/:branch/:bid", makeBillPayment);
router.get("/paidBillLIst/:branch", paidBillLIst);
router.get("/paidBillDetails/:branch/:bid", paidBillDetails);
router.get("/getEmployeeListByBranch/:branch", getEmployeeListByBranch);
router.post("/addEmployeeSalary/:branch", addEmployeeSalary);
router.get(
  "/getEmployeeListByBranchByID/:branch/:slid",
  getEmployeeListByBranchByID
);

// start working

router.post("/markAttendanceLogin", MarkAttendanceLogin);
router.put("/markAttendanceLogout", MarkAttendanceLogout);
router.get(
  "/getTodayAttendance/:branch/:employee_ID/:date",
  getTodayAttendance
);
router.get("/getAttendancebyempId/:branch/:employee_ID", getAttendancebyempId);
router.post("/apply-leave", applyLeave);
router.get("/get-leaves/:branch/:employee_Id", getLeaves);
router.get("/get-appointment-by-id/:branch/:appointmentId", getAppointmentById);
router.get("/voucher/:branch/:id", getVoucherDataByBranchID);

module.exports = router;
