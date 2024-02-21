const express = require("express");
const {
  EnrollEmployee,
  EditEmployeeDetails,
  getEmployeeData,
  superAdminLoginUser,
  sendOtp,
  verifyOtp,
} = require("../../controllers/superAdminController/superAdminController");
// const multer = require("multer");

const router = express.Router();

router.post("/enroll-employee", EnrollEmployee);
router.put("/EditEmployeeDetails/:emp_id", EditEmployeeDetails);
router.get("/getEmployeeDetails", getEmployeeData);
router.post("/adminLoginUser", superAdminLoginUser);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);

module.exports = router;
