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
} = require("../../controllers/superAdminController/superAdminController");
const {
  makeBills,
  getBillsByBranch,
  deleteBills,
  getPurchaseBillByBranch,
} = require("../../controllers/superAdminController/BillSectionController");
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

// ************************************************************************************************
//bill and inventory routes
router.post("/makeBills", makeBills);
router.get("/getBillsByBranch/:branch", getBillsByBranch);
router.delete("/deleteBills/:id", deleteBills);

//**************************************************************************************************** */
module.exports = router;
