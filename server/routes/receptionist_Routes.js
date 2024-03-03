
const express = require("express");
const { addPatient, getDisease, getTreatment, getPatients, bookAppointment } = require("../controller/receptionist_Controller");
const router = express.Router();

router.post('/add-patient',addPatient);
router.get('/get-disease',getDisease);
router.get('/get-treatments',getTreatment);
router.get('/get-Patients',getPatients);
router.post('/book-appointment',bookAppointment);

module.exports = router;