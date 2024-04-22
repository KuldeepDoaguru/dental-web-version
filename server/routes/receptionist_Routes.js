
const express = require("express");
const { addPatient, getDisease, getTreatment, getPatients, bookAppointment, getDoctorDataByBranch, getAppointments,  updateAppointmentStatus, updateAppointment, LoginReceptionist, getBranch, getDoctorDataByBranchWithLeave, getBranchDetail, updateAppointmentStatusCancel, updatePatientDetails, getBranchHoliday, getPatientById, addInquiry, getInquiries, updateInquiry, deleteInquiry,getAppointmentById, insertTimelineEvent, getPatientTimeline, getAllAppointmentByPatientId, updateAppointmentStatusCancelOpd, getPatientSecurityAmt, updatePatientSecurityAmt, getSecurityAmountDataBySID, updateRefundAmount, getSinglePatientSecurityAmt, getPatientDeatilsByUhid, applyLeave, getLeaves, MarkAttendanceLogin, MarkAttendanceLogout, getTodayAttendance, getAttendancebyempId, getSecurityAmountDataByBranch, getPatientBillsByBranch, getBranchDetailsByBranch, getSecurityAmountDataByTPUHID, getPatientBillsAndSecurityAmountByBranch, updateRemainingSecurityAmount, makeBillPayment } = require("../controller/receptionist_Controller");
const router = express.Router();

router.post('/add-patient',addPatient);
router.get('/get-disease',getDisease);
router.get('/get-treatments',getTreatment);
router.get('/get-Patients/:branch',getPatients);
router.get('/get-Patient-by-id/:branch/:patientId',getPatientById);
router.get('/get-appointment-by-id/:branch/:appointmentId',getAppointmentById);
router.get('/get-branches',getBranch);
router.get('/get-branch-detail/:branch',getBranchDetail);
router.get('/get-branch-holidays/:branch',getBranchHoliday);
router.get('/get-appointments/:branch',getAppointments);
router.post('/book-appointment',bookAppointment);
router.post('/receptionist-login',LoginReceptionist);
router.get('/get-doctors/:branch',getDoctorDataByBranch);
router.get('/get-doctors-with-leave/:branch',getDoctorDataByBranchWithLeave);
router.put('/update-appointment-status',updateAppointmentStatus);
router.put('/cancel-appointment-status-opd',updateAppointmentStatusCancelOpd);
router.put('/update-appointment-status-cancel',updateAppointmentStatusCancel);
router.put('/update-appointment',updateAppointment);
router.put('/update-patient-details',updatePatientDetails);
router.post('/add-inquiry',addInquiry);
router.post('/apply-leave',applyLeave);
router.post('/insertTimelineEvent',insertTimelineEvent);
router.get('/get-inquiries/:branch',getInquiries);
router.get('/get-leaves/:branch/:employee_Id',getLeaves);
router.put('/update-inquiry',updateInquiry);
router.delete('/delete-inquiry/:id',deleteInquiry);
router.get('/getPatientTimeline/:branch/:patientId',getPatientTimeline)
router.get('/getPatientDeatilsByUhid/:branch/:uhid',getPatientDeatilsByUhid)
router.get('/getAllAppointmentByPatientId/:branch/:patientId',getAllAppointmentByPatientId)
router.get(
    "/getSecurityAmountDataByBranch/:branch",
    getSecurityAmountDataByBranch
  );
router.get('/getSecurityAmountDataBySID/:sid', getSecurityAmountDataBySID);
router.get('/getSinglePatientSecurityAmt/:branch/:sid', getSinglePatientSecurityAmt);
router.put("/updatePatientSecurityAmt/:sid", updatePatientSecurityAmt);
router.put('/updateRefundAmount/:sid',updateRefundAmount);
router.post('/markAttendanceLogin', MarkAttendanceLogin);
router.put('/markAttendanceLogout', MarkAttendanceLogout);
router.get('/getTodayAttendance/:branch/:employee_ID/:date', getTodayAttendance);
router.get('/getAttendancebyempId/:branch/:employee_ID', getAttendancebyempId);
router.get("/getPatientBillsByBranch/:branch", getPatientBillsByBranch);

router.get("/getBranchDetailsByBranch/:branch", getBranchDetailsByBranch);
router.get(
    "/getSecurityAmountDataByTPUHID/:tpid/:uhid",
    getSecurityAmountDataByTPUHID
  );
  router.get(
    "/getPatientBillsAndSecurityAmountByBranch/:branch/:bid",
    getPatientBillsAndSecurityAmountByBranch
  );

  router.put(
    "/updateRemainingSecurityAmount/:tp_id/:uhid",
    updateRemainingSecurityAmount
  );

  router.put("/makeBillPayment/:branch/:bid", makeBillPayment);



module.exports = router;