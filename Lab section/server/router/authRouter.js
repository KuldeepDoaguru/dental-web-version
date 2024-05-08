const express = require("express");
const db = require("../connect.js");
const { getBranch, LoginDoctor, getPatientDetail, patrientDetailbyid, patienttestdata, removeTest, patienttestdatabyid, updateteststatus, updatepatienttestdetail, deletepatienttestdetail, patienttestnotes, getpatienttestnotesbyid, deletepatientest, editpatientest, getPatientTestDetail, sendOtp, verifyOtp, resetPassword } = require("../controller/authControl.js");

const router = express.Router();

router.get("/get-branches", getBranch);
router.post("/lab-attendant-login", LoginDoctor);
router.get("/get-patient-details", getPatientDetail);
router.get("/get-patient-test-details", getPatientTestDetail);
router.get("/get-patient-details-by-id/:id", patrientDetailbyid);
router.post("/paitent-test/:testId", patienttestdata);
router.get("/get-patient-test-details-by-id/:id", patienttestdatabyid);
router.put("/update-test-status/:testId",updateteststatus);
router.put("/update-patent-test-data/:testId",updatepatienttestdetail);
router.delete("/patent-details/:testId",deletepatienttestdetail);
router.post("/patienttest-notes",patienttestnotes);
router.get("/getpatienttest-notes/:testId",getpatienttestnotesbyid);1
router.delete("/delete-patienttest-notes/:noteId",deletepatientest);
router.put("/update-patienttest-notes",editpatientest);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.put("/resetPassword", resetPassword);




module.exports = { authRoutes: router }; 