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
    const {
      branch_name,
      patient_uhid,
      status,
      doctorId,
      doctor_name,
      appDateTime,
      treatment,
      notes,
      appointment_created_by,
      appointment_created_by_emp_id,
    } = req.body;

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
      created_at,
    ];

    db.query(
      bookAppointmentQuery,
      bookAppointmentParams,
      (appointmentErr, appointmentResult) => {
        if (appointmentErr) {
          console.error("Error booking appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          console.log("Appointment booked successfully");
          const appointmentId = appointmentResult.insertId; // Retrieve the inserted ID

          // Update the new_appoint_id in treat_suggest table
          const updateTreatSuggestQuery = `
                    UPDATE treat_suggest SET new_appoint_id = ? WHERE ts_id = ?
                `;
          const updateTreatSuggestParams = [appointmentId, req.body.ts_id];

          db.query(
            updateTreatSuggestQuery,
            updateTreatSuggestParams,
            (updateErr, updateResult) => {
              if (updateErr) {
                console.error("Error updating treat_suggest:", updateErr);
                return res.status(500).json({
                  success: false,
                  message: "Error updating treat_suggest",
                });
              } else {
                console.log("Updated treat_suggest successfully");
                return res.status(200).json({
                  appointmentId: appointmentId,
                  success: true,
                  message: "Appointment booked successfully",
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Error in booking appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Error in booking appointment",
      error: error.message,
    });
  }
};

const getTreatSuggest = (req, res) => {
  try {
    const appoint_id = req.params.appoint_id;

    const sql = `SELECT * FROM treat_suggest WHERE appoint_id = ?`;

    db.query(sql, appoint_id, (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Failed to query database",
          error: err,
        });
      } else {
        if (result.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "No data found" });
        }
        return res.status(200).json({
          success: true,
          message: "Data retrieved successfully",
          data: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const insertLabData = (req, res) => {
  const { appoint_id, patient_uhid, test_name } = req.body;

  db.query(
    "INSERT INTO dental_lab (appoint_id, patient_uhid, test_name) VALUES (?, ?, ?)",
    [appoint_id, patient_uhid, test_name],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res
          .status(500)
          .json({ success: false, message: "Error inserting data" });
        return;
      }

      console.log("Data inserted successfully");
      res
        .status(200)
        .json({ success: true, message: "Data inserted successfully" });
    }
  );
};

const getLabDataByAppointId = (req, res) => {
  const appointId = req.params.appoint_id;

  const sql = "SELECT * FROM dental_lab WHERE appoint_id = ?";

  db.query(sql, [appointId], (err, result) => {
    if (err) {
      console.error("Error retrieving lab data:", err);
      res
        .status(500)
        .json({ success: false, message: "Error retrieving lab data" });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "No lab data found for appointment ID: " + appointId,
      });
      return;
    }

    res.status(200).json({ success: true, data: result });
  });
};

const getBranchHoliday = (req, res) => {
  try {
    const branch = req.params.branch;
    const sql = "SELECT * FROM holidays WHERE branch_name = ?";

    db.query(sql, [branch], (err, results) => {
      if (err) {
        console.error("Error fetching Branch Holidays from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch Holidays" });
      } else {
        res.status(200).json({
          data: results,
          message: "Branch Holidays fetched successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching Branch Holidays from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Branch Holidays",
      error: error.message,
    });
  }
};

const getBranchDetail = (req, res) => {
  try {
    const branch = req.params.branch;
    const sql = "SELECT * FROM branches WHERE branch_name = ?";

    db.query(sql, [branch], (err, results) => {
      if (err) {
        console.error("Error fetching Branches from MySql:", err);
        res.status(500).json({ error: "Error fetching Branches" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "Branches fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching Branches from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Branches",
      error: error.message,
    });
  }
};

const getTreatment = (req, res) => {
  try {
    const sql = "SELECT * FROM treatment_list_copy";

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching treatments from MySql:", err);
        res.status(500).json({ error: "Error fetching treatments" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "treatments fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching treatments from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched treatments",
      error: error.message,
    });
  }
};

const getDoctorDataByBranchWithLeave = (req, res) => {
  try {
    const branch = req.params.branch;

    const sql = `
          SELECT 
           l.*,
              d.employee_name
          FROM 
          employee_leave  AS l
          LEFT JOIN 
          employee_register  AS d ON d.employee_ID = l.employee_ID WHERE
              d.branch_name = ? AND d.employee_role LIKE "%doctor%" AND l.leave_status = "Approved"
      `;
    db.query(sql, [branch], (err, result) => {
      if (err) {
        res
          .status(400)
          .send({ status: false, message: "error in fetching doctor" });
      } else {
        // Iterate over the result array and delete the password property from each object
        result.forEach((employee) => {
          delete employee.employee_password;
        });
        res.json({
          data: result,
          status: true,
          message: "successful fetching doctor",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getTreatSuggestViaTpid = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const branch = req.params.branch;
    const sql = `SELECT * FROM treat_suggest WHERE tp_id = ? AND branch_name = ?`;
    db.query(sql, [tpid, branch], (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Failed to query database",
          error: err,
        });
      } else {
        if (result.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "No data found" });
        }
        return res.status(200).json({
          success: true,
          message: "Data retrieved successfully",
          data: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  bookAppointment,
  getTreatSuggest,
  insertLabData,
  getLabDataByAppointId,
  getBranchHoliday,
  getBranchDetail,
  getTreatment,
  getDoctorDataByBranchWithLeave,
  getTreatSuggestViaTpid,
};
