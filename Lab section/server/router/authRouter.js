const express = require("express");
const db = require("../connect.js");
const { getBranch, LoginDoctor, getPatientDetail, patrientDetailbyid, patienttestdata, removeTest, patienttestdatabyid, updateteststatus, updatepatienttestdetail, deletepatienttestdetail, patienttestnotes, getpatienttestnotesbyid, deletepatientest, editpatientest, getPatientTestDetail, sendOtp, verifyOtp, resetPassword, getPatientLabWithPatientDetails, getPatientLabWithLabTest, patientpayment, applyLeave,
    getLeaves,
    MarkAttendanceLogin,
    MarkAttendanceLogout,
    getTodayAttendance,
    getAttendancebyempId, getBranchHoliday,
    getBranchDetail,
    updatepatienttest,
    getBranch_by_name,
    getBranchDetailsByBranch,
    getEmployeeData,
    getpatientreports,deletePatientLabReport} = require("../controller/authControl.js");

const router = express.Router();
const authenticate = require("../Middleware/authMiddleware.js");
const upload = require("../controller/pdfController.js");
router.get("/getEmployeeDetails", getEmployeeData);

router.get("/get-branches", getBranch);
router.get("/getBranchDetailsByBranch/:branch",  getBranchDetailsByBranch);
router.post("/lab-attendant-login", LoginDoctor);
router.post("/get-patient-test-cost",authenticate, getPatientLabWithLabTest);
router.post("/patient-test-payment/:testId",authenticate, patientpayment);
// router.put("/update-patent-test-data/:testId",upload.single('pdf'),authenticate,updatepatienttestdetail);
router.put("/update-patent-test-data/:testId" ,upload.array('files', 10),authenticate,updatepatienttestdetail);
router.get("/get-patient-lab-reports/:testId" ,authenticate,getpatientreports);
router.put("/update-patent-test/:testId",authenticate,updatepatienttest);
router.get("/get-patient-details",authenticate,  getPatientLabWithPatientDetails);
router.get("/get-patient-test-details",authenticate, getPatientTestDetail);
router.get("/get-patient-details-by-id/:id",authenticate, patrientDetailbyid);
router.post("/paitent-test/:testId",authenticate, patienttestdata);
router.get("/get-patient-test-details-by-id/:id",authenticate, patienttestdatabyid);
router.put("/update-test-status/:testId",authenticate,updateteststatus);

router.delete("/patent-details/:testId",authenticate,deletepatienttestdetail);
router.post("/patienttest-notes",authenticate,patienttestnotes);
router.get("/getpatienttest-notes/:testId",authenticate,getpatienttestnotesbyid);1
router.delete("/delete-patienttest-notes/:noteId",authenticate,deletepatientest);
router.put("/update-patienttest-notes",authenticate,editpatientest);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.put("/resetPassword",resetPassword);
router.delete("/delete-patient-lab-report/:id", authenticate, deletePatientLabReport);


router.post('/markAttendanceLogin',authenticate, MarkAttendanceLogin);
router.put('/markAttendanceLogout',authenticate, MarkAttendanceLogout);
router.get('/getTodayAttendance/:branch/:employee_ID/:date',authenticate, getTodayAttendance);
router.get('/getAttendancebyempId/:branch/:employee_ID',authenticate, getAttendancebyempId);
router.post('/apply-leave',authenticate,applyLeave);
router.get('/get-leaves/:branch/:employee_Id',authenticate,getLeaves);


router.get('/get-branch-detail/:branch',authenticate,getBranchDetail);
router.get('/get-branch-holidays/:branch',authenticate,getBranchHoliday);

module.exports = { authRoutes: router }; 