const express = require("express");
const db = require("../connect.js");
const multer = require('multer');
const path = require('path');
const { dentalPediatric, updateDentalPediatric, getDentalDataByID, deleteDentalPediatric } = require("../controller/authControl.js");
const { getAppointTable, getAppointmentById, getAppointmentsWithPatientDetails, getAppointmentsWithPatientDetailsById, upDateAppointmentStatus } = require("../controller/authAppointTable.js");
const { getBranch, LoginDoctor, billPatientData, billPatientDataByAppId } = require("../controller/authBranch.js");
const { getTreatmentList, insertTreatmentData, getExamDataIdbyAppointId, getTreatmentData, updateTreatmentData, deleteTreatmentData, insertTreatPrescription, getMedicineData, getTreatPrescriptionByAppointId, deleteTreatPrescriptionById, getTreatmentDataSUM } = require("../controller/authTreatment.js");
const { uploadImage, getUploadedImages } = require("../controller/authContrimg.js");

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
router.post("/insertTreatmentData/:exam_id/:appointment_id", insertTreatmentData);
router.get("/getExamDataIdbyAppointId/:id/:appointment_id", getExamDataIdbyAppointId);
router.get("/getTreatmentData/:appointment_id", getTreatmentData);
router.put('/updateTreatmentData/:id', updateTreatmentData);
router.delete('/deleteTreatmentData/:id', deleteTreatmentData);

// test purpose

router.get("/getTreatmentDatasum/:appointment_id", getTreatmentDataSUM);

// Treatment List Routes END here......

// Medical Prescription Routes START here......

router.post('/insertTreatPrescription/:appoint_id', insertTreatPrescription);
router.get('/getMedicineData', getMedicineData);
router.get('/getTreatPrescriptionByAppointId/:appoint_id', getTreatPrescriptionByAppointId);
router.delete('/deleteTreatPrescriptionById/:id', deleteTreatPrescriptionById);

// Medical Prescription Routes END here......

// Prescription Image Routes START here......

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define destination folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

router.post('/uploadImage', upload.fields([{ name: 'header', maxCount: 1 }, { name: 'footer', maxCount: 1 }, { name: 'seal', maxCount: 1 }]), uploadImage);

router.get('/getUploadedImages', getUploadedImages);

// Prescription Image Routes END here......

// Bill Routes START here......
router.get('/bill-patient-data', billPatientData);
router.get('/bill-patient-data/:appoint_id', billPatientDataByAppId);
// Bill Routes END here......


module.exports = { authRoutes: router };