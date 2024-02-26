const express = require("express");
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
} = require("../../controllers/superAdminController/superAdminController");
// const multer = require("multer");

const router = express.Router();

router.post("/enroll-employee", EnrollEmployee);
router.put("/EditEmployeeDetails/:emp_id", EditEmployeeDetails);
router.get("/getEmployeeDetails", getEmployeeData);
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
router.post("/purchaseInventory", purchaseInventory);
router.get("/getPurInventoryByBranch/:branch", getPurInventoryByBranch);
module.exports = router;
