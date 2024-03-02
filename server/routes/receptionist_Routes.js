
const express = require("express");
const { addPatient } = require("../controller/receptionist_Controller");
const router = express.Router();

router.post('/add-patient',addPatient);

module.exports = router;