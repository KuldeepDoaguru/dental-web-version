const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { db } = require("../connect");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const logger = require("./logger");

dotenv.config();

const PORT = process.env.PORT;

const getNotifyList = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM appointment_notification";
    db.query(selectQuery, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "failed to fetch notification list");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "failed to fetch notification list");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const addNotifyCommunication = (req, res) => {
  try {
    const { notification_tag, notification_msg, sms, email, whatsapp } =
      req.body;
    const selectQuery =
      "SELECT * FROM appointment_notification WHERE notification_tag = ?";
    db.query(selectQuery, notification_tag, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "failed to add notification communication");
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
          logger.registrationLogger.log("error", "this notification already exists");
        return res.status(400).send("this notification already exists");
      } else {
        const insertQuery =
          "INSERT INTO appointment_notification (notification_tag, notification_msg, sms, email, whatsapp) VALUES (?,?,?,?,?)";
        db.query(
          insertQuery,
          [notification_tag, notification_msg, sms, email, whatsapp],
          (err, result) => {
            if (err) {
                logger.registrationLogger.log("error", "failed to add notification");
              return res
                .status(400)
                .json({ success: false, message: err.message });
            }
            logger.registrationLogger.log("info", "notification added successfully");
            return res.status(200).send(result);
          }
        );
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateNotifyTagsDetails = (req, res) => {
  try {
    const ntid = req.params.ntid;
    const { notification_tag, notification_msg, sms, email, whatsapp } =
      req.body;
    const selectQuery =
      "SELECT * FROM appointment_notification WHERE notify_id = ?";
    db.query(selectQuery, ntid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid notification ID");
        res.status(500).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (notification_tag) {
          updateFields.push("notification_tag = ?");
          updateValues.push(notification_tag);
        }

        if (notification_msg) {
          updateFields.push("notification_msg = ?");
          updateValues.push(notification_msg);
        }

        if (sms) {
          updateFields.push("sms = ?");
          updateValues.push(sms);
        }

        if (email) {
          updateFields.push("email = ?");
          updateValues.push(email);
        }

        if (whatsapp) {
          updateFields.push("whatsapp = ?");
          updateValues.push(whatsapp);
        }

        const updateQuery = `UPDATE appointment_notification SET ${updateFields.join(
          ", "
        )} WHERE notify_id = ?`;

        db.query(updateQuery, [...updateValues, ntid], (err, result) => {
          if (err) {
              logger.registrationLogger.log("error", "failed to update details");
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
              logger.registrationLogger.log("info", "notification tag details updated successfully");
            return res.status(200).json({
              success: true,
              message: "Notification Tags Details updated successfully",
            });
          }
        });
      } else {
          logger.registrationLogger.log("error", "notification ID not found");
        return res.status(404).json({
          success: false,
          message: "ID not found",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteNotifyTags = (req, res) => {
  try {
    const ntid = req.params.ntid;
    const deleteQuery =
      "DELETE FROM appointment_notification WHERE notify_id = ?";
    db.query(deleteQuery, ntid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid notification ID");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "notification tags deleted successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPrescription = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery =
      "SELECT * FROM clinic_prescription WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "prescription fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const addPrescription = (req, res) => {
  try {
    const branch = req.params.branch;
    const { medicine_name, dosage, frequency, duration, notes } = req.body;
    const selectQuery =
      "SELECT * FROM clinic_prescription WHERE medicine_name = ?";
    db.query(selectQuery, medicine_name, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid medicine name");
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
          logger.registrationLogger.log("error", "medicine already exists");
        return res.status(400).send("medicine already exists");
      } else {
        const insertQuery =
          "INSERT INTO clinic_prescription (branch_name, medicine_name, dosage, frequency, duration, notes) VALUES (?,?,?,?,?,?)";
        db.query(
          insertQuery,
          [branch, medicine_name, dosage, frequency, duration, notes],
          (err, result) => {
            if (err) {
                logger.registrationLogger.log("error", "failed to add medicine");
              return res
                .status(400)
                .json({ success: false, message: err.message });
            }
            logger.registrationLogger.log("info", "medicine added successfully");
            return res.status(200).send(result);
          }
        );
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPrescriptionById = (req, res) => {
  try {
    const prid = req.params.prid;

    const selectQuery = "SELECT * FROM clinic_prescription WHERE pr_id = ?";
    db.query(selectQuery, prid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid prescription ID");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "prescription data fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePrescriptionDetails = (req, res) => {
  try {
    const prid = req.params.prid;
    const { medicine_name, dosage, frequency, duration, notes } = req.body;
    const selectQuery = "SELECT * FROM clinic_prescription WHERE pr_id = ?";
    db.query(selectQuery, prid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid prescription data");
        res.status(500).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (medicine_name) {
          updateFields.push("medicine_name = ?");
          updateValues.push(medicine_name);
        }

        if (dosage) {
          updateFields.push("dosage = ?");
          updateValues.push(dosage);
        }

        if (frequency) {
          updateFields.push("frequency = ?");
          updateValues.push(frequency);
        }

        if (duration) {
          updateFields.push("duration = ?");
          updateValues.push(duration);
        }

        if (notes) {
          updateFields.push("notes = ?");
          updateValues.push(notes);
        }

        const updateQuery = `UPDATE clinic_prescription SET ${updateFields.join(
          ", "
        )} WHERE pr_id = ?`;

        db.query(updateQuery, [...updateValues, prid], (err, result) => {
          if (err) {
              logger.registrationLogger.log("error", "failed to update details");
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
              logger.registrationLogger.log("info", "Prescription details updated successfully");
            return res.status(200).json({
              success: true,
              message: "Prescription Details updated successfully",
            });
          }
        });
      } else {
          logger.registrationLogger.log("error", "prescription ID not found");
        return res.status(404).json({
          success: false,
          message: "Prescription ID not found",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePrescription = (req, res) => {
  try {
    const prid = req.params.prid;
    const deleteQuery = "DELETE FROM clinic_prescription WHERE pr_id = ?";
    db.query(deleteQuery, prid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid prescription ID");
        return res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "prescription deleted successfully");
      return res
        .status(200)
        .json({ success: true, message: "prescription deleted successfully" });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addTreatment = (req, res) => {
  try {
    const { treatName, treatCost, treatDiscount } = req.body;
    const requiredFields = [treatName, treatCost, treatDiscount];
    if (requiredFields.some((field) => !field)) {
        logger.registrationLogger.log("error", "All field are required");
      return res.status(400).json({ error: "All fields are required" });
    }

    const selectQuery = "SELECT * FROM treatment_list_copy WHERE treatment_name = ?";
    db.query(selectQuery, [treatName], (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid treatment name");
        return res.status(500).json({ success: false, error: err.message });
      }
      if (result.length > 0) {
          logger.registrationLogger.log("error", "treatment already exists");
        return res.status(400).send("Treatment already exists");
      }

      const insertQuery = `INSERT INTO treatment_list_copy (treatment_name, treatment_cost, treatment_discount) VALUES (?, ?, ?)`;
      const insertUserParams = [treatName, treatCost, treatDiscount];

      db.query(insertQuery, insertUserParams, (errInsert, resultInsert) => {
        if (errInsert) {
            logger.registrationLogger.log("error", "an error occured while inserting treatment");
          return res.status(500).json({
            success: false,
            message: "Error while inserting treatment",
            error: errInsert.message,
          });
        }
        logger.registrationLogger.log("info", "Treatment added successfully");
        res
          .status(200)
          .json({ success: true, message: "Treatment added successfully" });
      });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTreatmentList = (req, res) => {
  try {
    const getQuery = "SELECT * FROM treatment_list_copy";
    db.query(getQuery, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "failed to fetch treatments");
        res.status(400).send(err.message);
      } else {
          logger.registrationLogger.log("info", "treatments fetched successfully");
        res.status(200).send(result);
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateTreatmentDetails = (req, res) => {
  try {
    const treatID = req.params.id;
    const { treatName, treatCost, treatDiscount } = req.body;

    const selectQuery = "SELECT * FROM treatment_list_copy WHERE treatment_id = ?";
    db.query(selectQuery, [treatID], (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid treatment ID");
        res.status(400).send(err);
      } else {
        if (result && result.length > 0) {
          const updateFields = [];
          const updateValues = [];

          if (treatName) {
            updateFields.push("treatment_name = ?");
            updateValues.push(treatName);
          }

          if (treatCost) {
            updateFields.push("treatment_cost = ?");
            updateValues.push(treatCost);
          }

          if (treatDiscount) {
            updateFields.push("treatment_discount = ?");
            updateValues.push(treatDiscount);
          }

          const updateQuery = `UPDATE treatment_list_copy SET ${updateFields.join(
            ", "
          )} WHERE treatment_id = ?`;

          db.query(updateQuery, [...updateValues, treatID], (err, result) => {
            if (err) {
                logger.registrationLogger.log("error", "failed to update details");
              return res
                .status(500)
                .json({ success: false, message: "failed to update details" });
            } else {
                logger.registrationLogger.log("info", "treatment details updated successfully");
              return res.status(200).json({
                success: true,
                message: "Details updated successfully",
              });
            }
          });
        } else {logger.registrationLogger.log("error", "treatment not found");
          return res
            .status(404)
            .json({ success: false, message: "treatment not found" });
        }
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteTreatment = (req, res) => {
  try {
    const tid = req.params.tid;
    const deleteQuery = "DELETE FROM treatment_list_copy WHERE treatment_id = ?";
    db.query(deleteQuery, tid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid treatment ID");
        return res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "treatment deleted successfully");
      return res
        .status(200)
        .json({ success: true, message: "Treatment deleted successfully" });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const getSuperAdminNotify = (req, res) => {
//   try {
//     const branch = req.params.branch;
//     const selectQuery = "SELECT * FROM employee_timeline WHERE branch_name = ?";
//     db.query(selectQuery, branch, (err, result) => {
//       if (err) {
//           logger.registrationLogger.log("error", "invalid branch");
//         res.status(400).json({ success: false, message: err.message });
//       }
//       logger.registrationLogger.log("info", "notification fetched successfully");
//       res.status(200).send(result);
//     });
//   } catch (error) {
//       logger.registrationLogger.log("error", "internal server error");
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const getSuperAdminNotify = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM employee_timeline";
    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const markRead = (req, res) => {
  try {
    const snid = req.params.snid;
    const read = "read";
    const selectQuery = "SELECT * FROM employee_timeline WHERE event_id = ?";
    db.query(selectQuery, snid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid event ID");
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery =
          "UPDATE employee_timeline SET status=? WHERE event_id = ?";
        db.query(updateQuery, [read, snid], (err, result) => {
          if (err) {
              logger.registrationLogger.log("error", "invalid event ID");
            res.status(400).json({ success: false, message: err.message });
          }
          logger.registrationLogger.log("info", "notification marked as read");
          res.status(200).send(result);
        });
      } else {
          logger.registrationLogger.log("error", "event ID not found");
        return res.status(404).json({
          success: false,
          message: "ID not found",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEmployeeDataByBranchAndId = (req, res) => {
  try {
    const branch = req.params.branch;
    const empId = req.params.empId;
    const getQuery = `SELECT * FROM employee_register WHERE branch_name = ? AND employee_ID = ?`;
    db.query(getQuery, [branch, empId], (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid employee ID");
        res.status(400).send({ message: "error in fetching employee" });
      }
      logger.registrationLogger.log("info", "employee details fetched successful");
      res.json(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const addSuperAdminNotify = (req, res) => {
  try {
    const { title, branch, event_msg, open, status } = req.body;
    const insertQuery =
      "INSERT INTO employee_timeline (title, branch_name, event_msg,	open,	status) VALUES (?,?,?,?, ?)";
    db.query(
      insertQuery,
      [title, branch, event_msg, open, status],
      (err, result) => {
        if (err) {
            logger.registrationLogger.log("error", "failed to insert employee timeline");
          res.status(400).json({ success: false, message: err.message });
        }
        logger.registrationLogger.log("info", "notificatio added successfully");
        res.status(200).send(result);
      }
    );
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const getTreatSuggest = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM patient_bills WHERE branch_name = ? ORDER BY bill_id DESC";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "treatment suggestions fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const getTreatmentViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql =
      "SELECT * FROM treat_suggest WHERE branch_name = ? AND p_uhid = ? ORDER BY tp_id DESC";

    db.query(sql, [branch, uhid], (err, results) => {
      if (err) {
          logger.registrationLogger.log("error", "error fetching treatment");
        console.error("Error fetching Treatment from MySql:", err);
        res.status(500).json({ error: "Error fetching Treatment" });
      } else {
          logger.registrationLogger.log("info", "treatment details fetched successfully");
        res.status(200).send(results);
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.error("Error fetching Treatment from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Treatment",
      error: error.message,
    });
  }
};

const getPatientBillUHID = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql = `SELECT * FROM patient_bills WHERE uhid = ? ORDER BY bill_id DESC`;

  db.query(sql, [patientUHID], (err, result) => {
    if (err) {
        logger.registrationLogger.log("error", "invalid patient uhid");
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
        logger.registrationLogger.log("error", "no data found for give patient uhid");
      res.status(404).send("No data found for Patient UHID: " + patientUHID);
      return;
    }
        logger.registrationLogger.log("info", "patient bill fetched successfully ");
    res.status(200).json(result); // Return the result
  });
};

const getExaminationViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql =
      "SELECT * FROM dental_examination WHERE branch_name = ? AND patient_uhid = ? ORDER BY exm_id DESC";

    db.query(sql, [branch, uhid], (err, results) => {
      if (err) {
          logger.registrationLogger.log("error", "error fetching examination");
        console.error("Error fetching Examination from MySql:", err);
        res.status(500).json({ error: "Error fetching Examination" });
      } else {
          logger.registrationLogger.log("info", "examination data fetched successfully");
        res.status(200).send(results);
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.error("Error fetching Examination from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Examination",
      error: error.message,
    });
  }
};

const getPrescriptionViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql =
      "SELECT * FROM dental_prescription WHERE branch_name = ? AND patient_uhid = ? ORDER BY id DESC";

    db.query(sql, [branch, uhid], (err, results) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid patient uhid");
        console.error("Error fetching Prescription from MySql:", err);
        res.status(500).json({ error: "Error fetching Prescription" });
      } else {
          logger.registrationLogger.log("info", "prescription data fetched successfully");
        res.status(200).send(results);
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.error("Error fetching Prescription from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Prescription",
      error: error.message,
    });
  }
};

const getLeaveList = (req, res) => {
    const branch = req.params.branch;
  try {
    const selectQuery = "SELECT * FROM employee_leave WHERE branch_name = ? ORDER BY created_at DESC";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid branch");
        return res.status(400).json({ success: false, message: err.message });
      } else {
          logger.registrationLogger.log("info", "leave list fetched successfully");
        return res.status(200).send(result);
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const approveLeave = (req, res) => {
  try {
    const lid = req.params.lid;
    const status = req.body.status;
    const updateQuery =
      "UPDATE employee_leave SET leave_status = ? WHERE id = ?";
    db.query(updateQuery, [status, lid], (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid leave ID");
        return res.status(400).json({ success: false, message: err.message });
      } else {
          logger.registrationLogger.log("info", "leave approved successfully");
        return res
          .status(200)
          .json({ success: true, message: "leave approved successfully" });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const addLab = (req, res) => {
  try {
    const { branch, name, type, contact, email, address, status } = req.body;
    const selectQuery = "SELECT * FROM lab_details WHERE lab_email = ?";
    db.query(selectQuery, email, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid email");
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length <= 0) {
        const insertQuery =
          "INSERT INTO lab_details (branch_name, lab_name,	lab_type,	lab_contact,	lab_email,	address,	status) VALUES (?,?,?,?,?,?, ?)";
        db.query(
          insertQuery,
          [branch, name, type, contact, email, address, status],
          (upErr, upResult) => {
            if (upErr) {
                logger.registrationLogger.log("error", "failed to add lab");
              res.status(400).json({ success: false, message: upErr.message });
            }
            logger.registrationLogger.log("info", "lab added successfully");
            res.status(200).json({ success: true, upResult: upResult });
          }
        );
      } else {
          logger.registrationLogger.log("error", "lab already exist");
        res.status(400).json({ success: false, message: "lab already exist" });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
  }
};

const getLabList = (req, res) => {
  try {
    const branch = req.params.branch;
    const SelectQuery = "SELECT * FROM lab_details WHERE branch_name = ?";
    db.query(SelectQuery, branch, (err, results) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "lab list fetched successfully");
      res.status(200).send(results);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const updateLabDetails = (req, res) => {
  const lid = req.params.lid;
  const { branch, name, type, contact, email, address, status } = req.body;
  
  const selectQuery = "SELECT * FROM lab_details WHERE lab_id = ?";
  db.query(selectQuery, lid, (err, result) => {
    if (err) {
        logger.registrationLogger.log("error", "invalid lab id");
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.length === 0) {
        logger.registrationLogger.log("error", "Lab ID not found");
      return res.status(404).json({ success: false, message: "Lab ID not found" });
    }

    const updateFields = [];
    const updateValues = [];

if (branch) {
      updateFields.push("branch_name = ?");
      updateValues.push(branch);
    }
    
    
    if (name) {
      updateFields.push("lab_name = ?");
      updateValues.push(name);
    }

    if (type) {
      updateFields.push("lab_type = ?");
      updateValues.push(type);
    }

    if (contact) {
      updateFields.push("lab_contact = ?");
      updateValues.push(contact);
    }

    if (email) {
      updateFields.push("lab_email = ?");
      updateValues.push(email);
    }

    if (address) {
      updateFields.push("address = ?");
      updateValues.push(address);
    }

    if (status) {
      updateFields.push("status = ?");
      updateValues.push(status);
    }

    const updateQuery = `UPDATE lab_details SET ${updateFields.join(", ")} WHERE lab_id = ?`;

    db.query(updateQuery, [...updateValues, lid], (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "failed to update lab details");
        console.error("Update error:", err);
        return res.status(500).json({ success: false, message: "Failed to update lab details" });
      }
      logger.registrationLogger.log("info", "Lab details updated successfully");
      
      return res.status(200).json({ success: true, message: "Lab details updated successfully" });
    });
  });
};

const labDelete = (req, res) => {
  try {
    const lid = req.params.lid;
    const deleteQuery = "DELETE FROM lab_details WHERE lab_id = ?";
    db.query(deleteQuery, lid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid lab ID");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "lab deleted successfully");
      res
        .status(200)
        .json({ success: true, message: "lab deleted successfully" });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    res.status(500).json({ success: false, message: error.message });
  }
};

const addLabTest = (req, res) => {
  try {
    const {
      test_name,
      test_code,
      waiting_days,
      default_lab,
      test_date,
      test_cost,
    } = req.body;
    const selectQuery = "SELECT * FROM lab_tests WHERE 	test_code = ?";
    db.query(selectQuery, test_code, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "test code already exists");
        return res.status(400).json({ success: false, message: "test code already exist" });
      }
      if (result && result.length <= 0) {
        const insertQuery =
          "INSERT INTO lab_tests (test_name, test_code,	waiting_days,	default_lab,	test_date,	test_cost) VALUES (?,?,?,?,?,?)";
        db.query(
          insertQuery,
          [
            test_name,
            test_code,
            waiting_days,
            default_lab,
            test_date,
            test_cost,
          ],
          (upErr, upResult) => {
            if (upErr) {
                logger.registrationLogger.log("error", "failed to add lab");
              res.status(400).json({ success: false, message: upErr.message });
            }
            logger.registrationLogger.log("info", "lab added successfully");
            res.status(200).json({ success: true, upResult: upResult });
          }
        );
      } else {
          logger.registrationLogger.log("error", "lab already exists");
        res.status(400).json({ success: false, message: "lab already exist" });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
  }
};

const getLabTest = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM lab_tests";
    db.query(selectQuery, (err, results) => {
      if (err) {
          logger.registrationLogger.log("error", "failed to fetch lab tests");
        res.status(500).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "lab test fetched successfully");
      res.status(200).send(results);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const updateLabTestDetails = (req, res) => {
  try {
    const ltid = req.params.ltid;
    const {
      test_name,
      test_code,
      waiting_days,
      default_lab,
      test_date,
      test_cost,
    } = req.body;
    const selectQuery = "SELECT * FROM lab_tests WHERE lab_tid = ?";
    db.query(selectQuery, ltid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid lab test ID");
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (test_name) {
          updateFields.push("test_name = ?");
          updateValues.push(test_name);
        }

        if (test_code) {
          updateFields.push("test_code = ?");
          updateValues.push(test_code);
        }

        if (waiting_days) {
          updateFields.push("waiting_days = ?");
          updateValues.push(waiting_days);
        }

        if (default_lab) {
          updateFields.push("default_lab = ?");
          updateValues.push(default_lab);
        }

        if (test_date) {
          updateFields.push("test_date = ?");
          updateValues.push(test_date);
        }

        if (test_cost) {
          updateFields.push("test_cost = ?");
          updateValues.push(test_cost);
        }

        const updateQuery = `UPDATE lab_tests SET ${updateFields.join(
          ", "
        )} WHERE lab_tid = ?`;
        console.log("221");
        db.query(updateQuery, [...updateValues, ltid], (err, result) => {
          if (err) {
              logger.registrationLogger.log("error", "failed to update details");
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
              logger.registrationLogger.log("info", "Lab test details updated successfully");
            return res.status(200).json({
              success: true,
              message: "Lab test details updated successfully",
            });
          }
        });
      } else {
          logger.registrationLogger.log("error", "Lab test ID not found");
        return res.status(404).json({
          success: false,
          message: "Lab  test ID not found",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const labTestDelete = (req, res) => {
  try {
    const ltid = req.params.ltid;
    const deleteQuery = "DELETE FROM lab_tests WHERE lab_tid = ?";
    db.query(deleteQuery, ltid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid lab test ID");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "lab deleted successfully");
      res
        .status(200)
        .json({ success: true, message: "lab deleted successfully" });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPatientLabTest = (req, res) => {
  try {
  const selectQuery =
  "SELECT * FROM patient_lab_details LEFT JOIN patient_details ON patient_details.uhid = patient_lab_details.patient_uhid";
    db.query(selectQuery, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "failed to fetch patient lab test");
        res.status(400).json({ success: false, message: err.message });
        return; 
      }
      logger.registrationLogger.log("info", "patient lab test fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPatientLabTestCompleted = (req, res) => {
  try { 
   const selectQuery = `
      SELECT * FROM patient_lab_test_details JOIN patient_lab_details ON patient_lab_details.testid = patient_lab_test_details.testid LEFT JOIN patient_details ON patient_details.uhid = patient_lab_details.patient_uhid
    `;
      
    db.query(selectQuery, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "failed to fetch lab test");
        res.status(400).json({ success: false, message: err.message });
        return;
      }
      logger.registrationLogger.log("info", "patient lab test completed");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPatientLabTestByPatientId = (req, res) => {
  const pid = req.params.pid;
  try {
    const selectQuery =
      "SELECT * FROM patient_lab_details LEFT JOIN patient_details ON patient_details.uhid = patient_lab_details.patient_uhid WHERE patient_lab_details.patient_uhid = ?";
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "failed to fetch patient lab test");
        res.status(400).json({ success: false, message: err.message });
        return;
      }
      logger.registrationLogger.log("info", "patient lab test fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getNotifyList,
  addNotifyCommunication,
  updateNotifyTagsDetails,
  deleteNotifyTags,
  getPrescription,
  addPrescription,
  getPrescriptionById,
  updatePrescriptionDetails,
  deletePrescription,
  addTreatment,
  getTreatmentList,
  updateTreatmentDetails,
  deleteTreatment,
  getSuperAdminNotify,
  markRead,
  addSuperAdminNotify,
  getTreatSuggest,
  getTreatmentViaUhid,
  getPatientBillUHID,
  getExaminationViaUhid,
  getPrescriptionViaUhid,

  addLab,
  getLabList,
  updateLabDetails,
  labDelete,
   addLabTest,
  getLabTest,
  updateLabTestDetails,
  labTestDelete, getPatientLabTest, getPatientLabTestCompleted, getPatientLabTestByPatientId
};
