const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { db } = require("../dbConnect/connect");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT;

const getNotifyList = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM appointment_notification";
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

const addNotifyCommunication = (req, res) => {
  try {
    const { notification_tag, notification_msg, sms, email, whatsapp } =
      req.body;
    const selectQuery =
      "SELECT * FROM appointment_notification WHERE notification_tag = ?";
    db.query(selectQuery, notification_tag, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        return res.status(400).send("this notification already exists");
      } else {
        const insertQuery =
          "INSERT INTO appointment_notification (notification_tag, notification_msg, sms, email, whatsapp) VALUES (?,?,?,?,?)";
        db.query(
          insertQuery,
          [notification_tag, notification_msg, sms, email, whatsapp],
          (err, result) => {
            if (err) {
              return res
                .status(400)
                .json({ success: false, message: err.message });
            }
            return res.status(200).send(result);
          }
        );
      }
    });
  } catch (error) {
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
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Notification Tags Details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "ID not found",
        });
      }
    });
  } catch (error) {
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
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
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
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const addPrescription = (req, res) => {
  try {
    const { branch_name, medicine_name, dosage, frequency, duration, notes } =
      req.body;
    const selectQuery =
      "SELECT * FROM clinic_prescription WHERE medicine_name = ?";
    db.query(selectQuery, medicine_name, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        return res.status(400).send("medicine already exists");
      } else {
        const insertQuery =
          "INSERT INTO clinic_prescription (branch_name, medicine_name, dosage, frequency, duration, notes) VALUES (?,?,?,?,?,?)";
        db.query(
          insertQuery,
          [branch_name, medicine_name, dosage, frequency, duration, notes],
          (err, result) => {
            if (err) {
              return res
                .status(400)
                .json({ success: false, message: err.message });
            }
            return res.status(200).send(result);
          }
        );
      }
    });
  } catch (error) {
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
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
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
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Prescription Details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Drug ID not found",
        });
      }
    });
  } catch (error) {
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
        return res.status(400).json({ success: false, message: err.message });
      }
      return res
        .status(200)
        .json({ success: true, message: "prescription deleted successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addTreatment = (req, res) => {
  try {
    const { treatName, treatCost, treatDiscount } = req.body;
    const requiredFields = [treatName, treatCost, treatDiscount];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const selectQuery = "SELECT * FROM treatment_list WHERE treatment_name = ?";
    db.query(selectQuery, [treatName], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      if (result.length > 0) {
        return res.status(400).send("Treatment already exists");
      }

      const insertQuery = `INSERT INTO treatment_list (treatment_name, treatment_cost, treatment_discount) VALUES (?, ?, ?)`;
      const insertUserParams = [treatName, treatCost, treatDiscount];

      db.query(insertQuery, insertUserParams, (errInsert, resultInsert) => {
        if (errInsert) {
          return res.status(500).json({
            success: false,
            message: "Error while inserting treatment",
            error: errInsert.message,
          });
        }
        res
          .status(200)
          .json({ success: true, message: "Treatment added successfully" });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTreatmentList = (req, res) => {
  try {
    const getQuery = "SELECT * FROM treatment_list";
    db.query(getQuery, (err, result) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateTreatmentDetails = (req, res) => {
  try {
    const treatID = req.params.id;
    const { treatName, treatCost, treatDiscount } = req.body;

    const selectQuery = "SELECT * FROM treatment_list WHERE treatment_id = ?";
    db.query(selectQuery, [treatID], (err, result) => {
      if (err) {
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

          const updateQuery = `UPDATE treatment_list SET ${updateFields.join(
            ", "
          )} WHERE treatment_id = ?`;

          db.query(updateQuery, [...updateValues, treatID], (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ success: false, message: "failed to update details" });
            } else {
              return res.status(200).json({
                success: true,
                message: "Details updated successfully",
              });
            }
          });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "treatment not found" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteTreatment = (req, res) => {
  try {
    const tid = req.params.tid;
    const deleteQuery = "DELETE FROM treatment_list WHERE treatment_id = ?";
    db.query(deleteQuery, tid, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      return res
        .status(200)
        .json({ success: true, message: "Treatment deleted successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getSuperAdminNotify = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM employee_timeline WHERE branch_name = ?";
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
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery =
          "UPDATE employee_timeline SET status=? WHERE event_id = ?";
        db.query(updateQuery, [read, snid], (err, result) => {
          if (err) {
            res.status(400).json({ success: false, message: err.message });
          }
          res.status(200).send(result);
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "ID not found",
        });
      }
    });
  } catch (error) {
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
        res.status(400).send({ message: "error in fetching employee" });
      }
      res.json(result);
    });
  } catch (error) {
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
          res.status(400).json({ success: false, message: err.message });
        }
        res.status(200).send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
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
};
