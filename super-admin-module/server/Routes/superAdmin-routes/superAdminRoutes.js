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
} = require("../../controllers/superAdminController/superAdminController");
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
} = require("../../controllers/superAdminController/BillSectionController");
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

router.get("/getPatientBillByBranchAndId/:pid", getPatientBillByBranchAndId);
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

//**************************************************************************************************** */
module.exports = router;
