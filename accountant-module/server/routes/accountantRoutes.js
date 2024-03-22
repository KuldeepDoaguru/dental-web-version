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
} = require("../controllers/accountantController");

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
  "/getSecurityAmountDataByBranch/:branch",
  getSecurityAmountDataByBranch
);

module.exports = router;
