const express = require("express");
const {
  EnrollEmployee,
  EditEmployeeDetails,
  getEmployeeData,
} = require("../../controllers/adminController/adminController");
// const multer = require("multer");

const router = express.Router();

router.post("/enroll-employee", EnrollEmployee);
router.put("/EditEmployeeDetails/:emp_id", EditEmployeeDetails);
router.get("/getEmployeeDetails", getEmployeeData);

module.exports = router;
