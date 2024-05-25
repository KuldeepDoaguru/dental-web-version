const express = require("express");
const db = require("../connect.js");

const getTreatmentList = (req, res) => {
  const sql = `SELECT * FROM treatment_list_copy`;
  db.query(sql, (err, results) => {
    if (!err) {
      const sanitizedResults = results.filter(
        (result) => result.treatment_id !== 5
      );

      return res.status(200).send({
        code: "success",
        data: sanitizedResults,
      });
    } else {
      console.error(`Error while performing query ${sql}`, err);
      return res.status(500).send("Server error");
    }
  });
};

const insertTreatmentData = (req, res) => {
  const examId = req.params.exam_id;
  const tpid = req.params.tpid;
  const appointmentId = req.params.appointment_id;
  const {
    branch,
    sitting_number,
    patient_uhid,
    dental_treatment,
    no_teeth,
    qty,
    cost_amt,
    disc_amt,
    total_amt,
    net_amount,
    paid_amount,
    pending_amount,
    dir_rec_amt,
    sec_rec_amt,
    dir_rec_doctor_id,
    sitting_payment_status,
    note,
  } = req.body;

  try {
    // Insert treatment details into the database
    db.query(
      "INSERT INTO dental_treatment (exam_id, tp_id, branch_name, appointment_id, sitting_number, patient_uhid, dental_treatment, no_teeth, qty, cost_amt, disc_amt, total_amt, net_amount, paid_amount, pending_amount, dir_rec_amt, sec_rec_amt, dir_rec_doctor_id,sitting_payment_status, note) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, ?)",
      [
        examId,
        tpid,
        branch,
        appointmentId,
        sitting_number,
        patient_uhid,
        dental_treatment,
        no_teeth,
        qty,
        cost_amt,
        disc_amt,
        total_amt,
        net_amount,
        paid_amount,
        pending_amount,
        dir_rec_amt,
        sec_rec_amt,
        dir_rec_doctor_id,
        sitting_payment_status,
        note,
      ],
      (error, result) => {
        if (error) {
          console.error("Error inserting treatment details:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        // Check if the insertion was successful
        if (result.affectedRows === 1) {
          // Return success response
          res
            .status(201)
            .json({ message: "Treatment details inserted successfully" });
        } else {
          // Return error response if insertion failed
          res.status(500).json({ error: "Failed to insert treatment details" });
        }
      }
    );
  } catch (error) {
    console.error("Error inserting treatment details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getExamDataIdbyAppointId = (req, res) => {
  const id = req.params.id;
  const appointmentId = req.params.appointment_id;

  const sql = `SELECT * FROM dental_examination WHERE id = ? AND appointment_id = ?`;

  db.query(sql, [id, appointmentId], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: `Error retrieving examin data` });
    } else {
      return res.status(200).json({ success: true, data: result[0] });
    }
  });
};

const getTreatmentData = (req, res) => {
  const appointmentId = req.params.appointment_id;
  const tpid = req.params.tpid;
  const branch = req.params.branch;
  const sitting = req.params.sitting;
  const treatment = req.params.treatment;

  const sql = `SELECT * FROM dental_treatment WHERE appointment_id = ? AND tp_id = ? AND branch_name = ? AND sitting_number = ? AND dental_treatment = ?`;

  db.query(
    sql,
    [appointmentId, tpid, branch, sitting, treatment],
    (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ success: false, message: "Error retrieving treatment data" });
      } else {
        return res.status(200).json({ success: true, data: results });
      }
    }
  );
};

const treatPatientUHID = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql =
    "SELECT * FROM dental_treatment WHERE patient_uhid = ? ORDER BY date DESC LIMIT 1";
  db.query(sql, [patientUHID], (err, result) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res.status(404).send("No data found for Patient UHID: " + patientUHID);
      return;
    }

    res.status(200).json(result); // Return the first (and only) element
  });
};

const getTreatPatientProfile = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql = `SELECT dental_treatment.*, appointments.assigned_doctor_name FROM dental_treatment LEFT JOIN appointments ON dental_treatment.appointment_id = appointments.appoint_id WHERE dental_treatment.patient_uhid = ?`;

  db.query(sql, [patientUHID], (err, result) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res.status(404).send("No data found for Appointment ID: " + patientUHID);
      return;
    }

    res.status(200).json(result);
  });
};

const updateTreatmentData = (req, res) => {
  const treatmentId = req.params.id; // Assuming you're passing the treatment ID in the route

  // Extract treatment data from request body
  const {
    dental_treatment,
    no_teeth,
    qty,
    cost_amt,
    original_cost_amt,
    disc_amt,
    total_amt,
    note,
  } = req.body;

  // Construct SQL query to update treatment data
  const sql = `UPDATE dental_treatment 
                 SET dental_treatment = ?, no_teeth = ?, qty = ?, cost_amt = ?, original_cost_amt = ?, disc_amt = ?, total_amt = ?, note = ?
                 WHERE id = ?`;

  // Execute the SQL query
  db.query(
    sql,
    [
      dental_treatment,
      no_teeth,
      qty,
      cost_amt,
      original_cost_amt,
      disc_amt,
      total_amt,
      note,
      treatmentId,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ success: false, message: "Error updating treatment data" });
      } else {
        console.log(results);
        return res.status(200).json({
          success: true,
          message: "Treatment data updated successfully",
          results,
        });
      }
    }
  );
};

const deleteTreatmentData = (req, res) => {
  const treatmentId = req.params.id; // Assuming you're passing the treatment ID in the route

  // Construct SQL query to delete treatment data
  const sql = `DELETE FROM dental_treatment WHERE id = ?`;

  // Execute the SQL query
  db.query(sql, [treatmentId], (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Error deleting treatment data" });
    } else {
      console.log(results);
      return res.status(200).json({
        success: true,
        message: "Treatment data deleted successfully",
        results,
      });
    }
  });
};

const insertTreatPrescription = (req, res) => {
  const { appoint_id, tpid } = req.params;
  const sitting = req.params.sitting;
  const {
    branch_name,
    patient_uhid,
    desease,
    treatment,
    medicine_name,
    dosage,
    frequency,
    duration,
    note,
  } = req.body;

  const sql =
    "INSERT INTO dental_prescription (appoint_id, tp_id, branch_name, patient_uhid, desease, treatment, sitting_number, medicine_name, dosage, frequency, duration, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)";

  db.query(
    sql,
    [
      appoint_id,
      tpid,
      branch_name,
      patient_uhid,
      desease,
      treatment,
      sitting,
      medicine_name,
      dosage,
      frequency,
      duration,
      note,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({
          message: "Prescription inserted successfully",
          id: result.insertId,
        });
      }
    }
  );
};

const prescripPatientUHID = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql = `SELECT dp.*, a.assigned_doctor_name FROM dental_prescription dp JOIN appointments a ON dp.appoint_id = a.appoint_id WHERE dp.patient_uhid = ? ORDER BY dp.date DESC LIMIT 1;`;
  db.query(sql, [patientUHID], (err, result) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res.status(404).send("No data found for Patient UHID: " + patientUHID);
      return;
    }

    res.status(200).json(result); // Return the first (and only) element
  });
};

const getPrescriptionPatientProfile = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql = `SELECT dental_prescription.*, appointments.assigned_doctor_name FROM dental_prescription LEFT JOIN appointments ON dental_prescription.appoint_id = appointments.appoint_id WHERE dental_prescription.patient_uhid = ?`;

  db.query(sql, [patientUHID], (err, result) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res.status(404).send("No data found for Appointment ID: " + patientUHID);
      return;
    }

    res.status(200).json(result);
  });
};

const getMedicineData = (req, res) => {
  const sql = "SELECT item_name FROM purchase_inventory";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // Extract the column data from the result array
      const columnData = result.map((row) => row.item_name);
      res.status(200).json(columnData);
    }
  });
};

const getTreatPrescriptionByAppointId = (req, res) => {
  const { appoint_id, tpid, treatment } = req.params;

  const sql =
    "SELECT * FROM dental_prescription WHERE appoint_id = ? AND tp_id = ? AND treatment = ?";

  db.query(sql, [appoint_id, tpid, treatment], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

const deleteTreatPrescriptionById = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM dental_prescription WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, error: "Failed to Delete" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Prescription deleted successfully",
        affectedRows: result.affectedRows,
      });
    }
  });
};

// For testing purpose

const getTreatmentDataSUM = (req, res) => {
  const appointmentId = req.params.appointment_id;

  const sql = `SELECT SUM(total_amt) AS total_amount FROM dental_treatment WHERE appointment_id = ?`;

  db.query(sql, [appointmentId], (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Error retrieving treatment data" });
    } else {
      // Assuming there's always a single row returned with the sum
      const totalAmount = results[0].total_amount;
      return res.status(200).json({ success: true, total_amount: totalAmount });
    }
  });
};

const onGoingTreat = (req, res) => {
  const patientUHID = req.params.patientUHID;

  // SQL query to fetch treatment data for the given appointment ID
  const sql = `SELECT treatment_name, sitting_result FROM treat_suggest WHERE p_uhid = ?`;

  db.query(sql, [patientUHID], (error, results) => {
    if (error) {
      console.error("Error fetching treatment data:", error.message);
      return res.status(500).json({ error: "Server error" });
    }

    let ongoingTreatment = "";
    if (results.length > 0) {
      // Calculate total sitting result
      let totalSittingResult = 0;
      results.forEach((row) => {
        totalSittingResult += row.sitting_result;
      });

      // Determine ongoing treatment
      if (totalSittingResult > 0) {
        // If there are ongoing treatments, find the treatment name
        ongoingTreatment = results.find(
          (row) => row.sitting_result > 0
        ).treatment_name;
      } else {
        ongoingTreatment = `No Ongoing Treatment`;
      }
    } else {
      ongoingTreatment = "No treatments found";
    }

    // Return the result
    res.json({ ongoingTreatment });
  });
};

const getProcedureList = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM treat_procedure_list";
    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const updateSecurityAmountAfterPayment = (req, res) => {
  const tp_id = req.params.tp_id;
  const { remaining_amount } = req.body;
  try {
    const updateQuery = `UPDATE security_amount SET remaining_amount = ? WHERE tp_id = ?`;
    db.query(updateQuery, [remaining_amount, tp_id], (err, results) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid tpid" });
      } else {
        return res.status(200).json({
          success: true,
          message: "Security amount updated successfully",
          results,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const updateRecSecAmountAfterPayment = (req, res) => {
  const tpid = req.params.tpid;
  const { sec_rec_amt, sitting_payment_status } = req.body;
  try {
    const updateQuery = `UPDATE dental_treatment SET sec_rec_amt = ?, sitting_payment_status = ? WHERE tp_id = ?`;
    db.query(
      updateQuery,
      [sec_rec_amt, sitting_payment_status, tpid],
      (err, results) => {
        if (err) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid tpid" });
        } else {
          return res.status(200).json({
            success: true,
            message: "Amount updated successfully",
            results,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTreatmentDetailsViaSitting = (req, res) => {
  try {
    const { branch, tpid, sitting } = req.params;
    const selectQuery =
      "SELECT * FROM dental_treatment WHERE branch_name = ? AND tp_id = ? AND sitting_number = ?";
    db.query(selectQuery, [branch, tpid, sitting], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getTreatmentDataViaBranchAndTpid = (req, res) => {
  const tpid = req.params.tpid;
  const branch = req.params.branch;

  const sql = `SELECT * FROM dental_treatment WHERE tp_id = ? AND branch_name = ?`;

  db.query(sql, [tpid, branch], (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Error retrieving treatment data" });
    } else {
      return res.status(200).send(results);
    }
  });
};

const generateFinalBillwithTpid = (req, res) => {
  try {
    const {
      uhid,
      tp_id,
      branch_name,
      patient_name,
      patient_mobile,
      patient_email,
      assigned_doctor_name,
      total_amount,
      paid_amount,
      pay_by_sec_amt,
    } = req.body;
    const selectQuery = "SELECT * FROM patient_bills WHERE tp_id = ?";
    db.query(selectQuery, tp_id, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length === 0) {
        const insertQuery = `INSERT INTO patient_bills (uhid,	tp_id,	branch_name,	patient_name,	patient_mobile,	patient_email,	assigned_doctor_name,	total_amount, paid_amount, pay_by_sec_amt) VALUES (?,?,?,?,?,?,?,?, ?, ?)`;

        const insertParams = [
          uhid,
          tp_id,
          branch_name,
          patient_name,
          patient_mobile,
          patient_email,
          assigned_doctor_name,
          total_amount,
          paid_amount,
          pay_by_sec_amt,
        ];

        db.query(insertQuery, insertParams, (err, result) => {
          if (err) {
            res.status(400).json({ success: false, message: err.message });
          }
          const bill_id = result?.insertId;
          const bill_date = new Date();
          const resultField = {
            uhid: uhid,
            tpid: tp_id,
            branch: branch_name,
            patient_name: patient_name,
            patient_mobile: patient_mobile,
            patient_email: patient_email,
            doctor_name: assigned_doctor_name,
            total_amount: total_amount,
            bill_id: bill_id,
            bill_date: bill_date,
            ...result[0],
          };
          res.status(200).json({ success: true, data: resultField });
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "tpid already exist" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTreatmentDetailsViaTpid = (req, res) => {
  try {
    const { tpid, branch } = req.params;
    const selectQuery =
      "SELECT * FROM dental_treatment WHERE tp_id = ? AND branch_name = ?";
    db.query(selectQuery, [tpid, branch], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getTreatPrescriptionByTpid = (req, res) => {
  const { tpid, branch } = req.params;

  const sql =
    "SELECT * FROM dental_prescription WHERE tp_id = ? AND branch_name = ?";

  db.query(sql, [tpid, branch], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

const getBranchDetails = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM branches WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const billDetailsViaTpid = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const selectQuery = "SELECT * FROM patient_bills WHERE tp_id = ?";
    db.query(selectQuery, tpid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getAttendancebyempId = (req, res) => {
  try {
    const branch = req.params.branch;
    const employee_ID = req.params.employee_ID;

    const sql =
      "SELECT * FROM employee_attendance WHERE branch = ? AND employee_ID = ? ORDER BY attendance_id DESC";

    db.query(sql, [branch, employee_ID], (err, results) => {
      if (err) {
        console.error("Error fetching attendance from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch  attendance" });
      } else {
        res.status(200).json({
          data: results,
          message: " attendance fetched successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching  attendance from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched  attendance",
      error: error.message,
    });
  }
};

const getLeaves = (req, res) => {
  const branch = req.params.branch;
  const employee_Id = req.params.employee_Id;
  try {
    const sql =
      "SELECT * FROM employee_leave WHERE branch_name = ? AND employee_ID = ? ORDER BY id DESC";

    db.query(sql, [branch, employee_Id], (err, results) => {
      if (err) {
        console.error("Error fetching leaves from MySql:", err);
        res.status(500).json({ error: "Error fetching leaves" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "leaves fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching leaves from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched leaves",
      error: error.message,
    });
  }
};

const getTodayAttendance = (req, res) => {
  try {
    const branch = req.params.branch;
    const employee_ID = req.params.employee_ID;
    const date = req.params.date;

    const sql =
      "SELECT * FROM employee_attendance WHERE branch = ? AND employee_ID = ? AND date = ?";

    db.query(sql, [branch, employee_ID, date], (err, results) => {
      if (err) {
        console.error("Error fetching attendance from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch  attendance" });
      } else {
        res.status(200).json({
          data: results,
          message: " attendance fetched successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching  attendance from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched  attendance",
      error: error.message,
    });
  }
};

const MarkAttendanceLogin = (req, res) => {
  try {
    const {
      branch_name,
      employee_ID,
      employee_name,
      employee_designation,
      date,
      loginTime,
    } = req.body;

    // Check if the employee ID for today's date and login time already exists
    const checkQuery = `
      SELECT * FROM employee_attendance 
      WHERE employee_ID = ? AND date = ?`;

    const checkParams = [employee_ID, date];

    db.query(checkQuery, checkParams, (err, result) => {
      if (err) {
        console.error("Error in checking attendance:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Attendance for this employee on today's date and login time already exists.",
        });
      }

      // If validation passes, proceed to insert the attendance record
      const addQuery = `
        INSERT INTO employee_attendance(
          employee_ID,
          emp_name,
          branch,
          employee_designation,
          date,
          allday_shift_login_time
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;

      const addParams = [
        employee_ID,
        employee_name,
        branch_name,
        employee_designation,
        date,
        loginTime,
      ];

      db.query(addQuery, addParams, (err, result) => {
        if (err) {
          console.error("Error in marking login", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        } else {
          console.log("login marked successfully");
          return res.status(200).json({
            success: true,
            message: "login marked successfully",
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in marking login:", error);
    return res.status(500).json({
      success: false,
      message: "Error in marking login:",
      error: error.message,
    });
  }
};

const MarkAttendanceLogout = (req, res) => {
  try {
    const {
      branch_name,
      employee_ID,
      employee_name,
      employee_designation,
      date,
      logoutTime,
    } = req.body;

    // Check if the employee ID for today's date and logout time already exists

    const checkQuery = `
      SELECT * FROM employee_attendance 
      WHERE employee_ID = ? AND date = ? AND branch = ? AND allday_shift_logout_time IS NOT NULL `;

    const checkParams = [employee_ID, date, branch_name];

    db.query(checkQuery, checkParams, (err, result) => {
      if (err) {
        console.error("Error in checking attendance:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Attendance for this employee on today's date and logout time already exists.",
        });
      }

      // If validation passes, proceed to update the attendance record
      const updateQuery = `
        UPDATE employee_attendance 
        SET allday_shift_logout_time = ?
        WHERE employee_ID = ? AND date = ?`;

      const updateParams = [logoutTime, employee_ID, date];

      db.query(updateQuery, updateParams, (err, result) => {
        if (err) {
          console.error("Error in marking logout", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        } else {
          console.log("Logout marked successfully");
          return res.status(200).json({
            success: true,
            message: "Logout marked successfully",
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in marking logout:", error);
    return res.status(500).json({
      success: false,
      message: "Error in marking logout:",
      error: error.message,
    });
  }
};

const applyLeave = (req, res) => {
  try {
    const {
      employee_ID,
      employee_name,
      branch_name,
      leave_dates,
      leave_reason,
      leave_status,
    } = req.body;

    const addLeaveQuery = `
    INSERT INTO employee_leave(
      employee_ID, 
      employee_name, 
      branch_name ,
      leave_dates ,
      leave_reason ,
      leave_status 
    ) VALUES (?, ?, ?, ?, ?, ?)
`;

    const addLeaveParams = [
      employee_ID,
      employee_name,
      branch_name,
      leave_dates,
      leave_reason,
      leave_status,
    ];

    db.query(addLeaveQuery, addLeaveParams, (err, Result) => {
      if (err) {
        console.error("Error in apply leave:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        console.log("Leave apply successfully");
        return res.status(200).json({
          success: true,
          message: "Leave apply successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error in apply leave:", error);
    return res.status(500).json({
      success: false,
      message: "Error in apply leave:",
      error: error.message,
    });
  }
};

const getPatBills = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM patient_bills WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

module.exports = {
  getTreatmentList,
  insertTreatmentData,
  getExamDataIdbyAppointId,
  getTreatmentData,
  updateTreatmentData,
  deleteTreatmentData,
  insertTreatPrescription,
  getMedicineData,
  getTreatPrescriptionByAppointId,
  deleteTreatPrescriptionById,
  getTreatmentDataSUM,
  getTreatPatientProfile,
  treatPatientUHID,
  getPrescriptionPatientProfile,
  prescripPatientUHID,
  onGoingTreat,
  getProcedureList,
  updateSecurityAmountAfterPayment,
  getTreatmentDetailsViaSitting,
  getTreatmentDataViaBranchAndTpid,
  generateFinalBillwithTpid,
  getTreatmentDetailsViaTpid,
  getTreatPrescriptionByTpid,
  getBranchDetails,
  billDetailsViaTpid,
  updateRecSecAmountAfterPayment,
  getAttendancebyempId,
  getLeaves,
  getTodayAttendance,
  MarkAttendanceLogin,
  MarkAttendanceLogout,
  applyLeave,
  getPatBills,
};
