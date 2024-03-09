const express = require("express");
const db = require("../connect.js");
const { dentalPediatric, updateDentalPediatric, getDentalDataByID, deleteDentalPediatric } = require("../controller/authControl.js");
const { getAppointTable, getAppointmentById, getAppointmentsWithPatientDetails, getAppointmentsWithPatientDetailsById, upDateAppointmentStatus } = require("../controller/authAppointTable.js");
const { getBranch, LoginDoctor } = require("../controller/authBranch.js");
const { getTreatmentList, insertTreatmentData } = require("../controller/authTreatment.js");

const router = express.Router();

// Examination  Routes START here......

router.post("/dentalPediatric", dentalPediatric);
router.put("/updatedentalPediatric/:id", updateDentalPediatric);
router.get("/getDentalDataByID/:appointmentId", getDentalDataByID);
router.delete("/deleteDentalPediatric/:id", deleteDentalPediatric);

// Examination  Routes END here......

// Appointment  Routes START here......

router.get("/getAppointTable", getAppointTable);
router.get('/appointments/:id', getAppointmentById);
router.get('/getAppointmentsWithPatientDetails', getAppointmentsWithPatientDetails);
router.get('/getAppointmentsWithPatientDetailsById/:id', getAppointmentsWithPatientDetailsById);
router.put('/upDateAppointmentStatus', upDateAppointmentStatus);

// Appointment Routes END here......

// Branch Routes START here......

router.get("/get-branches", getBranch);
router.post("/doctor-login", LoginDoctor);

// Branch Routes END here......

// Treatment List Routes START here......

router.get("/treatmentLists", getTreatmentList);
router.post("/insertTreatmentData/:appointmentId", insertTreatmentData);

// Treatment List Routes END here......


module.exports = { authRoutes: router };