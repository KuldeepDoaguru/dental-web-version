
const express = require("express");
const { addPatient, getDisease, getTreatment, getPatients, bookAppointment, getDoctorDataByBranch, getAppointments,  updateAppointmentStatus, updateAppointment, LoginReceptionist, getBranch, getDoctorDataByBranchWithLeave, getBranchDetail, updateAppointmentStatusCancel, updatePatientDetails, getBranchHoliday, getPatientById, addInquiry, getInquiries, updateInquiry, deleteInquiry,getAppointmentById, insertTimelineEvent, getPatientTimeline, getAllAppointmentByPatientId } = require("../controller/receptionist_Controller");
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
router.put('/update-appointment-status-cancel',updateAppointmentStatusCancel);
router.put('/update-appointment',updateAppointment);
router.put('/update-patient-details',updatePatientDetails);
router.post('/add-inquiry',addInquiry);
router.post('/insertTimelineEvent',insertTimelineEvent);
router.get('/get-inquiries/:branch',getInquiries);
router.put('/update-inquiry',updateInquiry);
router.delete('/delete-inquiry/:id',deleteInquiry);
router.get('/getPatientTimeline/:branch/:patientId',getPatientTimeline)
router.get('/getAllAppointmentByPatientId/:branch/:patientId',getAllAppointmentByPatientId)


module.exports = router;