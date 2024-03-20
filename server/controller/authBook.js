const db = require("../connect.js");

// const bookAppointment = (req, res) => {
//     try {
//         const { branch_name, patient_uhid, status, doctorId, doctor_name, appDateTime, treatment, notes, appointment_created_by, appointment_created_by_emp_id } = req.body;

//         const created_at = new Date();

//         const bookAppointmentQuery = `
//       INSERT INTO appointments (
//           patient_uhid, branch_name, assigned_doctor_name, assigned_doctor_id, appointment_dateTime, treatment_provided, appointment_status, notes, appointment_created_by, appointment_created_by_emp_id, created_at
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//         const bookAppointmentParams = [
//             patient_uhid,
//             branch_name,
//             doctor_name,
//             doctorId,
//             appDateTime,
//             treatment,
//             status,
//             notes,
//             appointment_created_by,
//             appointment_created_by_emp_id,
//             created_at
//         ];

//         db.query(bookAppointmentQuery, bookAppointmentParams, (appointmentErr, appointmentResult) => {
//             if (appointmentErr) {
//                 console.error("Error booking appointment:", appointmentErr);
//                 return res.status(500).json({ success: false, message: "Internal server error" });
//             } else {
//                 console.log("Appointment booked successfully");
//                 return res.status(200).json({
//                     data: appointmentResult,
//                     treatment: treatment,
//                     success: true,
//                     message: "Appointment Booked successfully",

//                 });
//             }
//         });

//     }
//     catch (error) {
//         console.error("Error in book appointment:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error in book appointment",
//             error: error.message,
//         });
//     }
// }

const bookAppointment = (req, res) => {
    try {
        const { branch_name, patient_uhid, status, doctorId, doctor_name, appDateTime, treatment, notes, appointment_created_by, appointment_created_by_emp_id } = req.body;

        const created_at = new Date();

        const bookAppointmentQuery = `
            INSERT INTO appointments (
                patient_uhid, branch_name, assigned_doctor_name, assigned_doctor_id, appointment_dateTime, treatment_provided, appointment_status, notes, appointment_created_by, appointment_created_by_emp_id, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const bookAppointmentParams = [
            patient_uhid,
            branch_name,
            doctor_name,
            doctorId,
            appDateTime,
            treatment,
            status,
            notes,
            appointment_created_by,
            appointment_created_by_emp_id,
            created_at
        ];

        db.query(bookAppointmentQuery, bookAppointmentParams, (appointmentErr, appointmentResult) => {
            if (appointmentErr) {
                console.error("Error booking appointment:", appointmentErr);
                return res.status(500).json({ success: false, message: "Internal server error" });
            } else {
                console.log("Appointment booked successfully");
                const appointmentId = appointmentResult.insertId; // Retrieve the inserted ID

                // Update the new_appoint_id in treat_suggest table
                const updateTreatSuggestQuery = `
                    UPDATE treat_suggest SET new_appoint_id = ? WHERE ts_id = ?
                `;
                const updateTreatSuggestParams = [appointmentId, req.body.ts_id];

                db.query(updateTreatSuggestQuery, updateTreatSuggestParams, (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error("Error updating treat_suggest:", updateErr);
                        return res.status(500).json({ success: false, message: "Error updating treat_suggest" });
                    } else {
                        console.log("Updated treat_suggest successfully");
                        return res.status(200).json({
                            appointmentId: appointmentId,
                            success: true,
                            message: "Appointment booked successfully"
                        });
                    }
                });
            }
        });

    } catch (error) {
        console.error("Error in booking appointment:", error);
        return res.status(500).json({
            success: false,
            message: "Error in booking appointment",
            error: error.message,
        });
    }
}



module.exports = { bookAppointment }; 