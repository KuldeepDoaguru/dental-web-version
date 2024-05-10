
const express = require("express");
const { addPatient, getDisease, getTreatment, getPatients, bookAppointment, getDoctorDataByBranch, getAppointments,  updateAppointmentStatus, updateAppointment, LoginReceptionist, getBranch, getDoctorDataByBranchWithLeave, getBranchDetail, updateAppointmentStatusCancel, updatePatientDetails, getBranchHoliday, getPatientById, addInquiry, getInquiries, updateInquiry, deleteInquiry,getAppointmentById, insertTimelineEvent, getPatientTimeline, getAllAppointmentByPatientId, updateAppointmentStatusCancelOpd, getPatientSecurityAmt, updatePatientSecurityAmt, getSecurityAmountDataBySID, updateRefundAmount, getSinglePatientSecurityAmt, getPatientDeatilsByUhid, applyLeave, getLeaves, MarkAttendanceLogin, MarkAttendanceLogout, getTodayAttendance, getAttendancebyempId, getSecurityAmountDataByBranch, getPatientBillsByBranch, getBranchDetailsByBranch, getSecurityAmountDataByTPUHID, getPatientBillsAndSecurityAmountByBranch, updateRemainingSecurityAmount, makeBillPayment, paidBillLIst, billDetailsViaTpid, getTreatSuggestViaTpid, getTreatPrescriptionByTpid, getTreatmentDetailsViaTpid, getDentalDataByTpid, getAppointmentsWithPatientDetailsById, getTreatmentViaUhid, getBillViaUhid, getExaminationViaUhid, getPrescriptionViaUhid, sendOtp, verifyOtp, resetPassword, updateTreatmentStatus, getPatientLabTestByPatientId } = require("../controller/receptionist_Controller");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/add-patient',authenticate, addPatient);
router.get('/get-disease', getDisease);
router.get('/get-treatments', getTreatment);
router.get('/get-Patients/:branch', authenticate , getPatients);
router.get('/get-Patient-by-id/:branch/:patientId',authenticate, getPatientById);
router.get('/get-appointment-by-id/:branch/:appointmentId',authenticate, getAppointmentById);
router.get('/get-branches', getBranch);
router.get('/get-branch-detail/:branch',getBranchDetail);
router.get('/get-branch-holidays/:branch',authenticate, getBranchHoliday);
router.get('/get-appointments/:branch',authenticate, getAppointments);
router.post('/book-appointment', authenticate, bookAppointment);
router.post('/receptionist-login',LoginReceptionist);
router.get('/get-doctors/:branch',authenticate, getDoctorDataByBranch);
router.get('/get-doctors-with-leave/:branch',authenticate, getDoctorDataByBranchWithLeave);
router.put('/update-appointment-status',authenticate, updateAppointmentStatus);
router.put('/cancel-appointment-status-opd',authenticate, updateAppointmentStatusCancelOpd);
router.put('/update-appointment-status-cancel',authenticate, updateAppointmentStatusCancel);
router.put('/update-appointment',authenticate, updateAppointment);
router.put('/update-patient-details', authenticate, updatePatientDetails);
router.post('/add-inquiry', authenticate, addInquiry);
router.post('/apply-leave', authenticate, applyLeave);
router.post('/insertTimelineEvent', authenticate, insertTimelineEvent);
router.get('/get-inquiries/:branch', authenticate, getInquiries);
router.get('/get-leaves/:branch/:employee_Id', authenticate, getLeaves);
router.put('/update-inquiry',authenticate, updateInquiry);
router.delete('/delete-inquiry/:id', authenticate, deleteInquiry);
router.get('/getPatientTimeline/:branch/:patientId', authenticate, getPatientTimeline)
router.get('/getPatientDeatilsByUhid/:branch/:uhid', authenticate, getPatientDeatilsByUhid)
router.get('/getAllAppointmentByPatientId/:branch/:patientId', authenticate, getAllAppointmentByPatientId)
router.get(
    "/getSecurityAmountDataByBranch/:branch", authenticate, 
    getSecurityAmountDataByBranch
  );
router.get('/getSecurityAmountDataBySID/:sid', authenticate, getSecurityAmountDataBySID);
router.get('/getSinglePatientSecurityAmt/:branch/:sid', authenticate, getSinglePatientSecurityAmt);
router.put("/updatePatientSecurityAmt/:sid", authenticate, updatePatientSecurityAmt);
router.put('/updateRefundAmount/:sid', authenticate, updateRefundAmount);
router.post('/markAttendanceLogin', authenticate,  MarkAttendanceLogin);
router.put('/markAttendanceLogout', authenticate,  MarkAttendanceLogout);
router.get('/getTodayAttendance/:branch/:employee_ID/:date', authenticate, getTodayAttendance);
router.get('/getAttendancebyempId/:branch/:employee_ID', authenticate,  getAttendancebyempId);
router.get("/getPatientBillsByBranch/:branch", authenticate,  getPatientBillsByBranch);

router.get("/getBranchDetailsByBranch/:branch",  getBranchDetailsByBranch);
router.get(
    "/getSecurityAmountDataByTPUHID/:tpid/:uhid", authenticate, 
    getSecurityAmountDataByTPUHID
  );
  router.get(
    "/getPatientBillsAndSecurityAmountByBranch/:branch/:bid", authenticate, 
    getPatientBillsAndSecurityAmountByBranch
  );

  router.put(
    "/updateRemainingSecurityAmount/:tp_id/:uhid", authenticate, 
    updateRemainingSecurityAmount
  );

  router.put("/makeBillPayment/:branch/:bid", authenticate,  makeBillPayment);
  router.get("/paidBillLIst/:branch", authenticate,  paidBillLIst);
  router.put("/updateTreatmentStatus/:branch/:tpid", authenticate,  updateTreatmentStatus);

  // Final Bill routers

router.get("/billDetailsViaTpid/:tpid", authenticate,  billDetailsViaTpid);
router.get("/getTreatSuggestViaTpid/:tpid/:branch", authenticate,  getTreatSuggestViaTpid);
router.get(
  "/getTreatPrescriptionByTpid/:tpid/:branch", authenticate, 
  getTreatPrescriptionByTpid
);
router.get(
  "/getTreatmentDetailsViaTpid/:tpid/:branch", authenticate, 
  getTreatmentDetailsViaTpid
);
router.get("/getDentalDataByTpid/:tpid/:branch", authenticate,  getDentalDataByTpid);
router.get(
  "/getAppointmentsWithPatientDetailsById/:tpid", authenticate, 
  getAppointmentsWithPatientDetailsById
);

// patient profile

router.get('/getTreatmentViaUhid/:branch/:uhid', authenticate, getTreatmentViaUhid);
router.get('/getBillsViaUhid/:branch/:uhid', authenticate, getBillViaUhid);
router.get('/getExaminationViaUhid/:branch/:uhid', authenticate, getExaminationViaUhid);
router.get('/getPrescriptionViaUhid/:branch/:uhid', authenticate, getPrescriptionViaUhid);
router.get('/getPatientLabTestByPatientId/:pid', authenticate, getPatientLabTestByPatientId);

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.put("/resetPassword", resetPassword);



module.exports = router;