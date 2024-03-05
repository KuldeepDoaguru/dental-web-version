const express = require("express");
const db = require("../connect.js");
const { dentalPediatric, dentalPediatricUpdate } = require("../controller/authControl.js");
const { getAppointTable, getAppointmentById, getAppointmentsWithPatientDetails, updateAppointmentStatus } = require("../controller/authAppointTable.js");

const router = express.Router();

router.post("/dentalPediatric", dentalPediatric);
router.put("/dentalPediatricUpdate/:id", dentalPediatricUpdate);
router.get("/getAppointTable", getAppointTable);
router.get('/appointments/:id', getAppointmentById);
router.get('/getAppointmentsWithPatientDetails', getAppointmentsWithPatientDetails);
router.post('/updateAppointmentStatus', updateAppointmentStatus);


module.exports = { authRoutes: router };