
const express = require("express");
const { addPatient, getDisease, getTreatment, getPatients, bookAppointment, getDoctorDataByBranch, getAppointments,  updateAppointmentStatus, updateAppointment } = require("../controller/receptionist_Controller");
const router = express.Router();

router.post('/add-patient',addPatient);
router.get('/get-disease',getDisease);
router.get('/get-treatments',getTreatment);
router.get('/get-Patients',getPatients);
router.get('/get-appointments/:branch',getAppointments);
router.post('/book-appointment',bookAppointment);
router.get('/get-doctors/:branch',getDoctorDataByBranch);
router.put('/update-appointment-status',updateAppointmentStatus);
router.put('/update-appointment',updateAppointment);

module.exports = router;