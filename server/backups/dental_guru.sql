/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: appointment_notification
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `appointment_notification` (
  `notify_id` int(100) NOT NULL AUTO_INCREMENT,
  `notification_tag` varchar(100) DEFAULT NULL,
  `notification_msg` varchar(100) DEFAULT NULL,
  `sms` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `whatsapp` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`notify_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: appointments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `appointments` (
  `appoint_id` int(255) NOT NULL AUTO_INCREMENT,
  `patient_uhid` varchar(255) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `tp_id` int(100) DEFAULT NULL,
  `assigned_doctor_name` varchar(255) DEFAULT NULL,
  `assigned_doctor_id` varchar(50) NOT NULL,
  `appointment_dateTime` varchar(255) NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `cancel_reason` varchar(1000) DEFAULT NULL,
  `treatment_provided` varchar(255) DEFAULT NULL,
  `appointment_created_by` varchar(255) DEFAULT NULL,
  `appointment_created_by_emp_id` varchar(50) DEFAULT NULL,
  `appointment_updated_by` varchar(50) DEFAULT NULL,
  `appointment_updated_by_emp_id` varchar(50) DEFAULT NULL,
  `appointment_status` varchar(255) DEFAULT NULL,
  `opd_amount` varchar(50) DEFAULT NULL,
  `payment_Mode` varchar(50) DEFAULT NULL,
  `transaction_Id` varchar(50) DEFAULT NULL,
  `payment_Status` varchar(50) DEFAULT NULL,
  `current_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`appoint_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 54 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: branches
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `branches` (
  `branch_id` int(255) NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(255) DEFAULT NULL,
  `branch_email` varchar(100) DEFAULT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `hospital_id` varchar(255) DEFAULT NULL,
  `branch_address` varchar(255) DEFAULT NULL,
  `branch_contact` varchar(255) DEFAULT NULL,
  `open_time` time(6) DEFAULT NULL,
  `close_time` time(6) DEFAULT NULL,
  `appoint_slot_duration` varchar(100) DEFAULT NULL,
  `week_off` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: dental_examination
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `dental_examination` (
  `exm_id` int(11) NOT NULL AUTO_INCREMENT,
  `tp_id` int(100) DEFAULT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `appointment_id` int(11) NOT NULL,
  `patient_uhid` varchar(50) DEFAULT NULL,
  `selected_teeth` varchar(255) DEFAULT NULL,
  `disease` varchar(255) DEFAULT NULL,
  `chief_complain` varchar(255) DEFAULT NULL,
  `advice` varchar(255) DEFAULT NULL,
  `on_examination` varchar(255) DEFAULT NULL,
  `diagnosis_category` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`exm_id`),
  KEY `appointment_id` (`appointment_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 28 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: dental_lab
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `dental_lab` (
  `lab_id` int(11) NOT NULL AUTO_INCREMENT,
  `appoint_id` varchar(50) NOT NULL,
  `patient_uhid` varchar(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `test_name` varchar(255) NOT NULL,
  PRIMARY KEY (`lab_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: dental_prescription
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `dental_prescription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appoint_id` int(11) NOT NULL,
  `tp_id` int(100) DEFAULT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `patient_uhid` varchar(50) NOT NULL,
  `desease` varchar(100) DEFAULT NULL,
  `treatment` varchar(100) DEFAULT NULL,
  `sitting_number` int(100) DEFAULT NULL,
  `medicine_name` varchar(255) NOT NULL,
  `dosage` varchar(255) NOT NULL,
  `frequency` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `appoint_id` (`appoint_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: dental_prescriptionimg
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `dental_prescriptionimg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `header` varchar(1000) NOT NULL,
  `footer` varchar(1000) NOT NULL,
  `seal` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: dental_treatment
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `dental_treatment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exam_id` int(11) NOT NULL,
  `tp_id` int(100) DEFAULT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `appointment_id` int(11) NOT NULL,
  `sitting_number` int(100) DEFAULT NULL,
  `patient_uhid` varchar(50) NOT NULL,
  `dental_treatment` varchar(500) NOT NULL,
  `no_teeth` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `cost_amt` varchar(255) NOT NULL,
  `original_cost_amt` varchar(255) NOT NULL,
  `disc_amt` varchar(255) NOT NULL,
  `total_amt` varchar(255) NOT NULL,
  `net_amount` int(100) DEFAULT NULL,
  `dir_rec_amt` int(100) DEFAULT NULL,
  `sec_rec_amt` int(100) DEFAULT NULL,
  `dir_rec_doctor_id` varchar(100) DEFAULT NULL,
  `sitting_payment_status` varchar(100) DEFAULT NULL,
  `note` varchar(1000) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `exam_id` (`exam_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 82 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: employee_attendance
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `employee_attendance` (
  `attendance_id` int(255) NOT NULL AUTO_INCREMENT,
  `employee_ID` varchar(255) DEFAULT NULL,
  `emp_name` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `employee_designation` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `morning_shift_login_time` time(6) DEFAULT NULL,
  `morning_shift_logout_time` time(6) DEFAULT NULL,
  `evening_shift_login_time` time(6) DEFAULT NULL,
  `evening_shift_logout_time` time(6) DEFAULT NULL,
  `allday_shift_login_time` time(6) DEFAULT NULL,
  `allday_shift_logout_time` time(6) DEFAULT NULL,
  `availability` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`attendance_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: employee_complaints
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `employee_complaints` (
  `complain_id` int(255) NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(255) DEFAULT NULL,
  `employee_name` varchar(255) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `complain` varchar(255) DEFAULT NULL,
  `rec_on` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `solved_on` datetime(6) DEFAULT NULL,
  `pending_since` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`complain_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: employee_leave
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `employee_leave` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(50) DEFAULT NULL,
  `employee_ID` varchar(11) NOT NULL,
  `employee_name` varchar(50) DEFAULT NULL,
  `leave_dates` varchar(1000) NOT NULL,
  `leave_reason` varchar(1000) DEFAULT NULL,
  `leave_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 39 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: employee_register
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `employee_register` (
  `sr_id` int(255) NOT NULL AUTO_INCREMENT,
  `employee_ID` varchar(255) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `employee_name` varchar(255) DEFAULT NULL,
  `employee_mobile` varchar(255) DEFAULT NULL,
  `employee_email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `employee_designation` varchar(255) DEFAULT NULL,
  `employee_password` varchar(255) DEFAULT NULL,
  `employee_role` varchar(255) DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `doctor_expertise` varchar(100) DEFAULT NULL,
  `doctor_education_details` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `employee_status` varchar(255) DEFAULT NULL,
  `morning_shift_start_time` time(6) DEFAULT NULL,
  `morning_shift_end_time` time(6) DEFAULT NULL,
  `evening_shift_start_time` time(6) DEFAULT NULL,
  `evening_shift_end_time` time(6) DEFAULT NULL,
  `allday_shift_start_time` time(6) DEFAULT NULL,
  `allday_shift_end_time` time(6) DEFAULT NULL,
  `working_days` varchar(255) DEFAULT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `employee_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sr_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: holidays
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `holidays` (
  `holiday_id` int(100) NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(100) DEFAULT NULL,
  `holiday_name` varchar(255) DEFAULT NULL,
  `holiday_date` date DEFAULT NULL,
  `holiday_start_time` time(6) DEFAULT NULL,
  `holiday_end_time` time(6) DEFAULT NULL,
  `notes` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`holiday_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: lab_details
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `lab_details` (
  `lab_id` int(255) NOT NULL AUTO_INCREMENT,
  `lab_name` varchar(255) DEFAULT NULL,
  `lab_type` varchar(255) DEFAULT NULL,
  `lab_contact` varchar(255) DEFAULT NULL,
  `lab_email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `bill` varchar(255) DEFAULT NULL,
  `due_date` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`lab_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: new_table
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `new_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uhid` varchar(255) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `mobileno` varchar(15) DEFAULT NULL,
  `emailid` varchar(255) DEFAULT NULL,
  `appoint_id` varchar(255) DEFAULT NULL,
  `assigned_doctor_name` varchar(255) DEFAULT NULL,
  `dental_treatment` varchar(255) DEFAULT NULL,
  `no_teeth` varchar(255) DEFAULT NULL,
  `cost_amt` varchar(255) DEFAULT NULL,
  `total_amt` varchar(255) DEFAULT NULL,
  `medicine_name` varchar(255) DEFAULT NULL,
  `dosage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: otpcollections
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `otpcollections` (
  `otp_id` int(100) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `code` int(10) DEFAULT NULL,
  `expiresIn` int(20) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`otp_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: patient_bills
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `patient_bills` (
  `bill_id` int(255) NOT NULL AUTO_INCREMENT,
  `bill_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `uhid` varchar(255) DEFAULT NULL,
  `tp_id` int(11) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `patient_mobile` varchar(255) DEFAULT NULL,
  `patient_email` varchar(255) DEFAULT NULL,
  `assigned_doctor_name` varchar(255) DEFAULT NULL,
  `total_amount` int(255) DEFAULT NULL,
  `paid_amount` int(255) DEFAULT NULL,
  `pay_by_sec_amt` int(100) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `payment_mode` varchar(100) DEFAULT NULL,
  `trannsaction_Id` varchar(100) DEFAULT NULL,
  `note` varchar(100) DEFAULT NULL,
  `payment_date_time` datetime(6) DEFAULT NULL,
  `receiver_name` varchar(100) DEFAULT NULL,
  `receiver_emp_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`bill_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: patient_details
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `patient_details` (
  `uhid` varchar(100) NOT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `initialid` varchar(100) DEFAULT NULL,
  `patient_name` varchar(255) NOT NULL,
  `dob` varchar(100) DEFAULT NULL,
  `age` varchar(11) NOT NULL,
  `weight` varchar(11) DEFAULT NULL,
  `gender` varchar(100) NOT NULL,
  `maritalstatus` varchar(100) DEFAULT NULL,
  `bloodgroup` varchar(100) DEFAULT NULL,
  `mobileno` varchar(100) NOT NULL,
  `alternatecontactno` varchar(100) DEFAULT NULL,
  `emailid` varchar(100) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `contact_person_name` varchar(255) DEFAULT NULL,
  `allergy` varchar(255) DEFAULT NULL,
  `disease` varchar(1000) DEFAULT NULL,
  `isstaff` varchar(100) DEFAULT NULL,
  `staffempid` varchar(100) DEFAULT NULL,
  `staffrelationid` varchar(100) DEFAULT NULL,
  `isforeign` varchar(100) DEFAULT NULL,
  `isvip` varchar(100) DEFAULT NULL,
  `fathername` varchar(100) DEFAULT NULL,
  `husbandname` varchar(100) DEFAULT NULL,
  `mothername` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `pincode` varchar(100) DEFAULT NULL,
  `patient_type` varchar(255) DEFAULT NULL,
  `aadhaar_no` varchar(100) DEFAULT NULL,
  `patient_added_by` varchar(50) DEFAULT NULL,
  `patient_updated_by` varchar(50) DEFAULT NULL,
  `patient_added_by_emp_id` varchar(50) DEFAULT NULL,
  `patient_updated_by_emp_id` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`uhid`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: patient_lab_details
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `patient_lab_details` (
  `testid` int(11) NOT NULL AUTO_INCREMENT,
  `tpid` int(11) DEFAULT NULL,
  `patient_uhid` varchar(11) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `assigned_doctor_name` varchar(255) NOT NULL,
  `lab_name` varchar(255) NOT NULL,
  `test` varchar(255) NOT NULL,
  `test_status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`testid`)
) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: patient_timeline
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `patient_timeline` (
  `event_id` int(100) NOT NULL AUTO_INCREMENT,
  `event_date` date DEFAULT current_timestamp(),
  `event_time` time(6) DEFAULT current_timestamp(),
  `event_type` varchar(100) DEFAULT NULL,
  `event_description` varchar(100) DEFAULT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `uhid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 444 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: purchase_inventory
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `purchase_inventory` (
  `pur_id` int(255) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) DEFAULT NULL,
  `item_category` varchar(255) DEFAULT NULL,
  `item_mrp` varchar(255) DEFAULT NULL,
  `item_code` varchar(255) DEFAULT NULL,
  `HSN_code` varchar(255) DEFAULT NULL,
  `pur_quantity` int(255) DEFAULT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `total_amount` varchar(255) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `available_stock` int(255) DEFAULT NULL,
  `low_stock_threshhold` int(255) DEFAULT NULL,
  `distributor_name` varchar(255) DEFAULT NULL,
  `distributor_number` varchar(255) DEFAULT NULL,
  `bill_receipt_doc` varchar(255) DEFAULT NULL,
  `purchase_date` datetime(6) DEFAULT current_timestamp(6),
  PRIMARY KEY (`pur_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: security_amount
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `security_amount` (
  `sa_id` int(100) NOT NULL AUTO_INCREMENT,
  `tp_id` varchar(100) DEFAULT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `appointment_id` int(100) DEFAULT NULL,
  `uhid` varchar(100) DEFAULT NULL,
  `patient_name` varchar(100) DEFAULT NULL,
  `patient_number` varchar(100) DEFAULT NULL,
  `treatment` varchar(255) DEFAULT NULL,
  `assigned_doctor` varchar(100) DEFAULT NULL,
  `amount` int(100) DEFAULT NULL,
  `remaining_amount` int(100) DEFAULT NULL,
  `used_amount` int(100) DEFAULT NULL,
  `payment_status` varchar(100) DEFAULT NULL,
  `payment_Mode` varchar(50) DEFAULT NULL,
  `transaction_Id` varchar(50) DEFAULT NULL,
  `payment_date` varchar(50) DEFAULT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `refund_amount` int(100) DEFAULT NULL,
  `refund_date` datetime(6) DEFAULT NULL,
  `received_by` varchar(100) DEFAULT NULL,
  `refund_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`sa_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: super_admin
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `super_admin` (
  `sa_id` int(255) NOT NULL AUTO_INCREMENT,
  `hospital_id` varchar(255) DEFAULT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `super_name` varchar(255) DEFAULT NULL,
  `super_email` varchar(255) DEFAULT NULL,
  `super_mobile` varchar(255) DEFAULT NULL,
  `super_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sa_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: test_process
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `test_process` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: treat_procedure_list
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `treat_procedure_list` (
  `treat_procedure_id` int(100) NOT NULL AUTO_INCREMENT,
  `treat_procedure_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`treat_procedure_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: treat_suggest
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `treat_suggest` (
  `ts_id` int(11) NOT NULL AUTO_INCREMENT,
  `tp_id` int(100) DEFAULT NULL,
  `appoint_id` int(11) NOT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `p_uhid` varchar(255) NOT NULL,
  `desease` varchar(100) DEFAULT NULL,
  `treatment_name` varchar(255) DEFAULT NULL,
  `totalCost` varchar(255) DEFAULT NULL,
  `treatment_status` varchar(255) DEFAULT NULL,
  `consider_sitting` varchar(255) DEFAULT NULL,
  `total_sitting` varchar(255) DEFAULT NULL,
  `current_sitting` int(100) DEFAULT NULL,
  `upcoming_sitting` int(100) DEFAULT NULL,
  `appoint_date` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `current_sitting_status` varchar(100) DEFAULT NULL,
  `upcoming_sitting_status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ts_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 25 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: treatment_list
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `treatment_list` (
  `treatment_id` int(255) NOT NULL AUTO_INCREMENT,
  `treat_procedure_id` int(100) DEFAULT NULL,
  `treat_procedure_name` varchar(100) DEFAULT NULL,
  `treatment_name` varchar(1000) DEFAULT NULL,
  `treatment_cost` varchar(255) DEFAULT NULL,
  `treatment_discount` varchar(255) DEFAULT NULL,
  `value` varchar(1000) NOT NULL,
  `label` varchar(1000) NOT NULL,
  PRIMARY KEY (`treatment_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 46 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: treatment_list_copy
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `treatment_list_copy` (
  `treatment_id` int(255) NOT NULL AUTO_INCREMENT,
  `treat_procedure_id` int(100) DEFAULT NULL,
  `treat_procedure_name` varchar(100) DEFAULT NULL,
  `treatment_name` varchar(1000) DEFAULT NULL,
  `treatment_cost` varchar(255) DEFAULT NULL,
  `treatment_discount` varchar(255) DEFAULT NULL,
  `value` varchar(1000) NOT NULL,
  `label` varchar(1000) NOT NULL,
  PRIMARY KEY (`treatment_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 53 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: treatment_package
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `treatment_package` (
  `tp_id` int(100) NOT NULL AUTO_INCREMENT,
  `uhid` varchar(100) DEFAULT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `appointment_id` int(100) DEFAULT NULL,
  `examination_id` int(100) DEFAULT NULL,
  `doctor_id` varchar(100) DEFAULT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `package_status` varchar(50) DEFAULT NULL,
  `diagnosis_category` varchar(100) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`tp_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 43 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: appointment_notification
# ------------------------------------------------------------

INSERT INTO
  `appointment_notification` (
    `notify_id`,
    `notification_tag`,
    `notification_msg`,
    `sms`,
    `email`,
    `whatsapp`
  )
VALUES
  (
    1,
    'appointment 2',
    'confirm ',
    'enable',
    'enable',
    'enable'
  );
INSERT INTO
  `appointment_notification` (
    `notify_id`,
    `notification_tag`,
    `notification_msg`,
    `sms`,
    `email`,
    `whatsapp`
  )
VALUES
  (
    2,
    'Patient Appointment Reshedule',
    'Sms! Sent to patient on reshedule an appointment',
    'disable',
    'enable',
    'enable'
  );
INSERT INTO
  `appointment_notification` (
    `notify_id`,
    `notification_tag`,
    `notification_msg`,
    `sms`,
    `email`,
    `whatsapp`
  )
VALUES
  (
    3,
    'Patient Appointment Reminder',
    'Sms! Sent to patient on the day of appointment at 8am',
    'disable',
    'enable',
    'enable'
  );
INSERT INTO
  `appointment_notification` (
    `notify_id`,
    `notification_tag`,
    `notification_msg`,
    `sms`,
    `email`,
    `whatsapp`
  )
VALUES
  (
    4,
    'Doctor Appointment Confirmation',
    'Sms! Sent to Doctor on adding a new appointment',
    'disable',
    'enable',
    'enable'
  );
INSERT INTO
  `appointment_notification` (
    `notify_id`,
    `notification_tag`,
    `notification_msg`,
    `sms`,
    `email`,
    `whatsapp`
  )
VALUES
  (
    5,
    'Doctor Appointment Reshedule',
    'Sms! Sent to Doctor on reshedule an appointment',
    'disable',
    'enable',
    'enable'
  );
INSERT INTO
  `appointment_notification` (
    `notify_id`,
    `notification_tag`,
    `notification_msg`,
    `sms`,
    `email`,
    `whatsapp`
  )
VALUES
  (
    7,
    'Patient Birthday',
    'Hi Patient, Dental Guru Wishes you a very happy birthday,                       stay happy and healt',
    'disable',
    'disable',
    'disable'
  );
INSERT INTO
  `appointment_notification` (
    `notify_id`,
    `notification_tag`,
    `notification_msg`,
    `sms`,
    `email`,
    `whatsapp`
  )
VALUES
  (
    8,
    'Patient Welcome',
    'Dear Patient, Thank you for visiting Dental guru clinic, you                       can reach us at 9',
    'disable',
    'disable',
    'disable'
  );
INSERT INTO
  `appointment_notification` (
    `notify_id`,
    `notification_tag`,
    `notification_msg`,
    `sms`,
    `email`,
    `whatsapp`
  )
VALUES
  (
    9,
    'Patient Followup',
    'Dear Patient, your appointment is due at Dental guru clinic                       date 25 oct 2023 a',
    'disable',
    'disable',
    'disable'
  );
INSERT INTO
  `appointment_notification` (
    `notify_id`,
    `notification_tag`,
    `notification_msg`,
    `sms`,
    `email`,
    `whatsapp`
  )
VALUES
  (14, 'appointment ', 'after 2 days', '', 'enable', '');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: appointments
# ------------------------------------------------------------

INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-01 09:00:00',
    '-',
    NULL,
    NULL,
    'Nurse Jane',
    '201',
    'Nurse Jane',
    '201',
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-01 11:16:45'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    '789012',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-01 10:30:00',
    'Fever',
    NULL,
    NULL,
    'Front Desk Receptionist',
    '202',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-01 11:16:45'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-25T11:00',
    'sg',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'complete',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-06 16:51:08',
    '2024-04-06 16:51:08'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-25T11:00',
    'sg',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-06 16:52:04',
    '2024-04-06 16:52:04'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-18T15:00',
    'zfv',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-06 17:03:15',
    '2024-04-06 17:03:15'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-09T11:15',
    'cgf',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-06 17:04:36',
    '2024-04-06 17:04:36'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-10T10:30',
    'aatu beta',
    NULL,
    'Crowns (Caps)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-06 21:10:31',
    '2024-04-06 21:10:31'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-09T10:45',
    'aatu beta',
    NULL,
    'Fluoride Treatments',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-06 21:27:55',
    '2024-04-06 21:27:55'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-10T11:30',
    'hghgv',
    NULL,
    'Apicoectomy (Endodontic Surgery)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-06 21:43:03',
    '2024-04-06 21:43:03'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    13,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-10T11:15',
    'cgsdgg',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-08 10:46:43',
    '2024-04-08 10:46:43'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    14,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-10T10:45',
    'lalala',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-08 15:50:42',
    '2024-04-08 15:50:42'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    15,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-12T11:00',
    'test',
    NULL,
    'Fluoride Treatments',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 16:35:23',
    '2024-04-11 16:35:23'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    16,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-13T11:00',
    'test-2',
    NULL,
    'Fluoride Treatments',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 16:58:17',
    '2024-04-11 16:58:17'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    17,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-13Tundefined',
    'dffgfg',
    NULL,
    'Fluoride Treatments',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 18:52:01',
    '2024-04-11 18:52:01'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    18,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-13T13:30',
    'test-3',
    NULL,
    'Fluoride Treatments',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 18:52:35',
    '2024-04-11 18:52:35'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    19,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-13T11:15',
    'test-4',
    NULL,
    'Fluoride Treatments',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 18:53:33',
    '2024-04-11 18:53:33'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    20,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-19T11:00',
    'test-5',
    NULL,
    'Fluoride Treatments',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 18:59:17',
    '2024-04-11 18:59:17'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    21,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-12T10:15',
    'test-6',
    NULL,
    'Fluoride Treatments',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 19:04:06',
    '2024-04-11 19:04:06'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    22,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-20T10:15',
    '',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 19:11:00',
    '2024-04-11 19:11:00'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    23,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-24Tundefined',
    '',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 19:12:05',
    '2024-04-11 19:12:05'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    24,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-26T10:30',
    '',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 19:13:10',
    '2024-04-11 19:13:10'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    25,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-23T10:45',
    '',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 19:19:23',
    '2024-04-11 19:19:23'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    26,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-13T10:45',
    '',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 20:07:04',
    '2024-04-11 20:07:04'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    27,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-19T11:15',
    '',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 20:08:15',
    '2024-04-11 20:08:15'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    28,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-27T11:15',
    '',
    NULL,
    'Dental Cleanings',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 20:46:23',
    '2024-04-11 20:46:23'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    29,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-23Tundefined',
    '',
    NULL,
    'Bridges',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 21:05:40',
    '2024-04-11 21:05:40'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    30,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-24T11:15',
    '',
    NULL,
    'Bridges',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 21:07:12',
    '2024-04-11 21:07:12'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    31,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-19T14:15',
    '',
    NULL,
    'Bridges',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 21:07:59',
    '2024-04-11 21:07:59'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    32,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-12T10:45',
    '',
    NULL,
    'Bridges',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Check-in',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-11 21:11:22',
    '2024-04-11 21:11:22'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    33,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-26T10:45',
    '',
    NULL,
    'Digital Compuler zcd XRay (R.V.G.)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-13 12:52:53',
    '2024-04-13 12:52:53'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    34,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-20T10:30',
    '',
    NULL,
    'Digital Compuler zcd XRay (R.V.G.)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-13 12:56:07',
    '2024-04-13 12:56:07'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    35,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-19T10:45',
    '',
    NULL,
    'Digital Compuler zcd XRay (R.V.G.)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-13 12:58:11',
    '2024-04-13 12:58:11'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    36,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-26T11:00',
    '',
    NULL,
    'Root Canal Treatment @ per tooth',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'Appoint',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-13 19:27:51',
    '2024-04-13 19:27:51'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    37,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-16T10:30',
    '',
    NULL,
    'Digital Compuler zcd XRay (R.V.G.)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-15 14:02:58',
    '2024-04-15 14:02:58'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    38,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-19T19:30',
    'dchdfh',
    NULL,
    'Digital Compuler zcd XRay (R.V.G.)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-18 13:12:07',
    '2024-04-18 13:12:07'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    39,
    '123456',
    'Madan Mahal',
    NULL,
    'shadab',
    'dg_4',
    '2024-04-20T11:00',
    'test',
    NULL,
    'Digital Compuler zcd XRay (R.V.G.)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-19 13:23:33',
    '2024-04-19 13:23:33'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    40,
    '123456',
    'Madan Mahal',
    30,
    'shadab',
    'dg_4',
    '2024-04-23T11:00',
    'test to check tpid',
    NULL,
    'Root Canal Treatment @ per tooth',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-19 21:06:24',
    '2024-04-19 21:06:24'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    41,
    '789012',
    'Madan Mahal',
    33,
    'shadab',
    'dg_4',
    '2024-04-25T11:30',
    '',
    NULL,
    'Digital Compuler zcd XRay (R.V.G.)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-20 21:11:18',
    '2024-04-20 21:11:18'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    42,
    '123456',
    'Madan Mahal',
    30,
    'shadab',
    'dg_4',
    '2024-04-26T11:30',
    '',
    NULL,
    'Digital Compuler zcd XRay (R.V.G.)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-24 14:06:11',
    '2024-04-24 14:06:11'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    43,
    '123456',
    'Madan Mahal',
    30,
    'shadab',
    'dg_4',
    '2024-04-26T11:15',
    '',
    NULL,
    'Digital Compuler zcd XRay (R.V.G.)',
    'shadab',
    'dg_4',
    NULL,
    NULL,
    'ongoing',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-24 14:07:52',
    '2024-04-24 14:07:52'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    44,
    '123456',
    'BranchName',
    123,
    'Dr. John Doe',
    '456',
    '2024-05-09T08:00:00',
    'Additional notes',
    NULL,
    'Treatment details',
    'Admin',
    '789',
    NULL,
    NULL,
    'Scheduled',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-09 15:10:22',
    '2024-05-09 15:10:22'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    45,
    '123456',
    'Branch Name',
    0,
    'Dr. John Doe',
    'DOC123',
    '2024-05-09T12:00:00',
    'Additional notes',
    NULL,
    'Treatment details',
    'Admin',
    'AdminID',
    NULL,
    NULL,
    'Confirmed',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-09 15:43:03',
    '2024-05-09 15:43:03'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    46,
    '123456',
    'Branch Name',
    0,
    'Dr. John Doe',
    'DOC123',
    '2024-05-09T12:00:00',
    'Additional notes',
    NULL,
    'Treatment details',
    'Admin',
    'AdminID',
    NULL,
    NULL,
    'Confirmed',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-09 15:45:41',
    '2024-05-09 15:45:41'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    47,
    '123456',
    'Branch Name',
    0,
    'Dr. John Doe',
    'DOC123',
    '2024-05-09T12:00:00',
    'Additional notes',
    NULL,
    'Treatment details',
    'Admin',
    'AdminID',
    NULL,
    NULL,
    'Confirmed',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-09 15:47:29',
    '2024-05-09 15:47:29'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    48,
    '123456',
    'Branch Name',
    0,
    'Dr. John Doe',
    'DOC123',
    '2024-05-09T12:00:00',
    'Additional notes',
    NULL,
    'Treatment details',
    'Admin',
    'AdminID',
    NULL,
    NULL,
    'Confirmed',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-09 15:51:16',
    '2024-05-09 15:51:16'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    49,
    '123456',
    'Branch Name',
    0,
    'Dr. John Doe',
    'DOC123',
    '2024-05-09T12:00:00',
    'Additional notes',
    NULL,
    'Treatment details',
    'Admin',
    'AdminID',
    NULL,
    NULL,
    'Confirmed',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-09 15:52:33',
    '2024-05-09 15:52:33'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    50,
    '123456',
    'Branch Name',
    0,
    'Dr. John Doe',
    'DOC123',
    '2024-05-09T12:00:00',
    'Additional notes',
    NULL,
    'Treatment details',
    'Admin',
    'AdminID',
    NULL,
    NULL,
    'Confirmed',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-09 15:57:16',
    '2024-05-09 15:57:16'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    51,
    '123456',
    'Branch Name',
    0,
    'Dr. Jane Smith',
    'DOC123',
    '2024-05-09T12:00:00',
    'Additional notes',
    NULL,
    'Treatment details',
    'Admin',
    'AdminID',
    NULL,
    NULL,
    'Confirmed',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-09 16:10:30',
    '2024-05-09 16:10:30'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    52,
    '123456',
    'Branch Name',
    0,
    'Dr. Jane Smith',
    'DOC123',
    '2024-05-09T12:00:00',
    'Additional notes',
    NULL,
    'Treatment details',
    'Admin',
    'AdminID',
    NULL,
    NULL,
    'Confirmed',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-09 16:14:01',
    '2024-05-09 16:14:01'
  );
INSERT INTO
  `appointments` (
    `appoint_id`,
    `patient_uhid`,
    `branch_name`,
    `tp_id`,
    `assigned_doctor_name`,
    `assigned_doctor_id`,
    `appointment_dateTime`,
    `notes`,
    `cancel_reason`,
    `treatment_provided`,
    `appointment_created_by`,
    `appointment_created_by_emp_id`,
    `appointment_updated_by`,
    `appointment_updated_by_emp_id`,
    `appointment_status`,
    `opd_amount`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_Status`,
    `current_path`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    53,
    '123456',
    'Madan Mahal',
    226,
    'Dr. Jane Smith',
    'DOC123',
    '2024-05-09T12:00:00',
    'Additional notes',
    NULL,
    'Treatment details',
    'Admin',
    'AdminID',
    NULL,
    NULL,
    'Confirmed',
    NULL,
    NULL,
    NULL,
    NULL,
    'drfffff',
    '2024-05-09 16:17:12',
    '2024-05-09 16:17:12'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: branches
# ------------------------------------------------------------

INSERT INTO
  `branches` (
    `branch_id`,
    `branch_name`,
    `branch_email`,
    `hospital_name`,
    `hospital_id`,
    `branch_address`,
    `branch_contact`,
    `open_time`,
    `close_time`,
    `appoint_slot_duration`,
    `week_off`
  )
VALUES
  (
    1,
    'Madan Mahal',
    'madanmahal@gmail.com',
    'dental square',
    'hos_1',
    'Madan Mahal',
    '8602161019',
    '10:00:00.786000',
    '20:00:00.887000',
    '15 min',
    'sunday'
  );
INSERT INTO
  `branches` (
    `branch_id`,
    `branch_name`,
    `branch_email`,
    `hospital_name`,
    `hospital_id`,
    `branch_address`,
    `branch_contact`,
    `open_time`,
    `close_time`,
    `appoint_slot_duration`,
    `week_off`
  )
VALUES
  (
    2,
    'Vijay Nagar',
    NULL,
    'dental square',
    'hos_1',
    'Vijay Nagar',
    '8602161018',
    NULL,
    NULL,
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: dental_examination
# ------------------------------------------------------------

INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    3,
    16,
    'Madan Mahal',
    12,
    '123456',
    '54, 53, 52',
    'Fracture',
    'lala',
    'lala',
    'lala',
    'Pediatric',
    '2024-04-14 18:48:56'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    12,
    16,
    'Madan Mahal',
    1,
    '123456',
    '55, 54, 53, 52',
    'Caries',
    'tata',
    'taat',
    'tata',
    'Pediatric',
    '2024-04-14 18:48:44'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    13,
    NULL,
    'Madan Mahal',
    1,
    NULL,
    '55',
    'Fracture',
    'tooth issue',
    'take care',
    'teeth clean',
    NULL,
    '2024-04-14 18:48:59'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    14,
    16,
    'Madan Mahal',
    1,
    '123456',
    '81, 71, 72',
    'Impacted',
    'tata',
    'tata',
    'tata',
    'Pediatric',
    '2024-04-14 18:49:06'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    15,
    18,
    'Madan Mahal',
    12,
    '123456',
    '85',
    'Caries',
    'ssdsd',
    'advice frontend',
    'asf',
    'Pediatric',
    '2024-04-14 18:48:50'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    16,
    24,
    'Madan Mahal',
    26,
    '123456',
    '55',
    'Fracture',
    'chief',
    'advice',
    'examination',
    'Pediatric',
    '2024-04-14 18:49:02'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    17,
    24,
    'Madan Mahal',
    26,
    '123456',
    '54, 53',
    'Caries',
    'test caries',
    'test caries',
    'test caries',
    'Pediatric',
    '2024-04-14 18:48:53'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    18,
    29,
    NULL,
    11,
    '123456',
    '63',
    'Missing Tooth',
    'zdfad',
    'adgfas',
    'sdagsdag',
    'Pediatric',
    '2024-04-18 12:45:33'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    19,
    29,
    NULL,
    11,
    NULL,
    '62',
    'Mobility',
    'sdgsd',
    'adfgsdfg',
    'sdgsd',
    NULL,
    '2024-04-18 12:45:50'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    20,
    30,
    'Madan Mahal',
    11,
    '123456',
    '55, 54',
    'Caries',
    'lala',
    'lala',
    'lala',
    'Pediatric',
    '2024-04-19 13:37:58'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    21,
    30,
    'Madan Mahal',
    11,
    NULL,
    '53, 52',
    'Fracture',
    'lala',
    'lala',
    'lala',
    NULL,
    '2024-04-19 13:38:03'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    22,
    30,
    'Madan Mahal',
    11,
    '123456',
    '85, 84',
    'Impacted',
    'test',
    'test',
    'test',
    'Pediatric',
    '2024-04-19 13:38:06'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    23,
    30,
    'Madan Mahal',
    11,
    '123456',
    '82, 81',
    'Root Stump',
    'test',
    'test',
    'test',
    'Pediatric',
    '2024-04-19 13:36:28'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    24,
    33,
    'Madan Mahal',
    2,
    '789012',
    '18, 17',
    'Caries',
    'test',
    'test',
    'test',
    'Dental-X',
    '2024-04-20 19:57:45'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    25,
    33,
    'Madan Mahal',
    2,
    NULL,
    '18, 17',
    'Fracture',
    'ftest',
    'test',
    'test',
    NULL,
    '2024-04-20 19:57:59'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    26,
    35,
    'Madan Mahal',
    26,
    '123456',
    '18, 17',
    'Mobility',
    'test',
    'test',
    'test',
    'Dental-X',
    '2024-04-21 17:19:04'
  );
INSERT INTO
  `dental_examination` (
    `exm_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `patient_uhid`,
    `selected_teeth`,
    `disease`,
    `chief_complain`,
    `advice`,
    `on_examination`,
    `diagnosis_category`,
    `date`
  )
VALUES
  (
    27,
    37,
    'Madan Mahal',
    12,
    '123456',
    '55, 54',
    'Mobility',
    'test',
    'test',
    'test',
    'Pediatric',
    '2024-04-21 19:40:59'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: dental_lab
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: dental_prescription
# ------------------------------------------------------------

INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    1,
    12,
    18,
    'Madan Mahal',
    '123456',
    'Caries',
    'Dental Cleanings',
    NULL,
    'Disprin 325 tablet',
    '300mg',
    '1-1-1(TDS)',
    '1 day',
    'test',
    '2024-04-10 21:51:43'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    2,
    12,
    18,
    'Madan Mahal',
    '123456',
    'Caries',
    'Fluoride Treatments',
    NULL,
    'Disprin 350 tablet',
    '100mg',
    '1-1-1(TDS)',
    '1 day',
    'test-2',
    '2024-04-10 21:58:51'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    4,
    12,
    18,
    'Madan Mahal',
    '123456',
    'Caries',
    'Dental Cleanings',
    NULL,
    'Disprin 325 tablet',
    '1000mg',
    '1-1-1(TDS)',
    '1 day',
    'take after sleep',
    '2024-04-12 18:35:30'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    5,
    26,
    24,
    'Madan Mahal',
    '123456',
    'Fracture',
    'Digital Compuler zcd XRay (R.V.G.)',
    1,
    'Aspirin',
    '500mg',
    'Once daily',
    '7 days',
    'Take with food',
    '2024-04-13 13:23:54'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    6,
    26,
    24,
    'Madan Mahal',
    '123456',
    'Fracture',
    'Digital Compuler zcd XRay (R.V.G.)',
    1,
    'Disprin 325 tablet',
    '300mg',
    '1-1-1(TDS)',
    '1 day',
    '',
    '2024-04-13 13:24:18'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    7,
    26,
    24,
    'Madan Mahal',
    '123456',
    'Caries',
    'Root Canal Treatment @ per tooth',
    1,
    'Disprin 325 tablet',
    '300mg',
    '1-1-0(BD)',
    '1 day',
    '',
    '2024-04-14 19:00:46'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    8,
    26,
    24,
    'Madan Mahal',
    '123456',
    'Caries',
    'Root Canal Treatment @ per tooth',
    1,
    'Disprin 325 tablet',
    '300mg',
    '1-1-1(TDS)',
    '1 day',
    '',
    '2024-04-13 19:35:04'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    9,
    0,
    29,
    'Madan Mahal',
    '123456',
    '',
    'Digital Compuler zcd XRay (R.V.G.)',
    3,
    'Disprin 325 tablet',
    '300mg',
    '1-1-1(TDS)',
    '2 days',
    'sdfasd',
    '2024-04-18 14:33:22'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    10,
    0,
    30,
    'Madan Mahal',
    '123456',
    'Caries',
    'Digital Compuler zcd XRay (R.V.G.)',
    1,
    'Disprin 325 tablet',
    '300mg',
    '1-1-1(TDS)',
    '1 day',
    '',
    '2024-04-19 14:20:06'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    11,
    0,
    30,
    'Madan Mahal',
    '123456',
    'Fracture',
    'Root Canal Treatment @ per tooth',
    1,
    'Disprin 325 tablet',
    '300mg',
    '1-1-1(TDS)',
    '1 day',
    '',
    '2024-04-19 15:03:56'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    12,
    0,
    33,
    'Madan Mahal',
    '789012',
    'Caries',
    'Digital Compuler zcd XRay (R.V.G.)',
    2,
    'Disprin 325 tablet',
    '300mg',
    '1-1-1(TDS)',
    '1 day',
    '',
    '2024-04-20 21:13:07'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    13,
    0,
    35,
    'Madan Mahal',
    '123456',
    'Mobility',
    'Digital Compuler zcd XRay (R.V.G.)',
    1,
    'Disprin 325 tablet',
    '300mg',
    '1-1-1(TDS)',
    '1 day',
    '',
    '2024-04-21 17:27:39'
  );
INSERT INTO
  `dental_prescription` (
    `id`,
    `appoint_id`,
    `tp_id`,
    `branch_name`,
    `patient_uhid`,
    `desease`,
    `treatment`,
    `sitting_number`,
    `medicine_name`,
    `dosage`,
    `frequency`,
    `duration`,
    `note`,
    `date`
  )
VALUES
  (
    14,
    0,
    37,
    'Madan Mahal',
    '123456',
    'Mobility',
    'Digital Compuler zcd XRay (R.V.G.)',
    1,
    'Disprin 325 tablet',
    '300mg',
    '1-1-1(TDS)',
    '1 day',
    '',
    '2024-04-22 12:58:51'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: dental_prescriptionimg
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: dental_treatment
# ------------------------------------------------------------

INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    1,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'faltu admi',
    '2024-04-10 19:22:46'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    2,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'test',
    '2024-04-10 19:22:54'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    3,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'test2',
    '2024-04-10 19:22:58'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    4,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'test for complete',
    '2024-04-10 19:23:02'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    5,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'test for complete 2',
    '2024-04-10 19:23:05'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    6,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'test for complete 3',
    '2024-04-10 19:23:07'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    7,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'dgdgb',
    '2024-04-10 19:23:10'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    8,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'dfgdgf',
    '2024-04-10 19:23:13'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    9,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'xcvbsdgh',
    '2024-04-10 19:23:17'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    10,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'yesssssssss',
    '2024-04-10 19:23:20'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    11,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'dfhsnbn',
    '2024-04-10 19:23:22'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    13,
    11,
    18,
    'Madan Mahal',
    12,
    NULL,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'treat',
    '2024-04-10 19:23:25'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    14,
    11,
    18,
    'Madan Mahal',
    12,
    1,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    'with sitting number',
    '2024-04-10 19:43:50'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    15,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 16:35:23'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    16,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 16:44:01'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    17,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 16:58:17'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    18,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:05:13'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    19,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:06:46'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    20,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:08:35'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    21,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:13:29'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    22,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:13:32'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    23,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:13:32'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    24,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:13:32'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    25,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:13:33'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    26,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:14:08'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    27,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:14:17'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    28,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:14:18'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    29,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 17:14:20'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    30,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '10',
    '2500',
    2250,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 18:51:35'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    31,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 18:52:01'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    32,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 18:52:35'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    33,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 18:53:33'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    34,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 18:59:17'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    35,
    12,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Fluoride Treatments',
    '85',
    '1',
    '2500',
    '',
    '',
    '2500',
    2500,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 19:04:06'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    36,
    11,
    18,
    'Madan Mahal',
    12,
    2,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 19:06:01'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    37,
    11,
    18,
    'Madan Mahal',
    12,
    3,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '',
    '1000',
    1000,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 19:07:01'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    38,
    11,
    18,
    'Madan Mahal',
    12,
    3,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '',
    '1000',
    1000,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 19:11:00'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    39,
    11,
    18,
    'Madan Mahal',
    12,
    3,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '',
    '1000',
    1000,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 19:11:49'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    40,
    11,
    18,
    'Madan Mahal',
    12,
    3,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '',
    '1000',
    1000,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 19:12:05'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    41,
    11,
    18,
    'Madan Mahal',
    12,
    3,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '',
    '1000',
    1000,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 19:13:10'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    42,
    11,
    18,
    'Madan Mahal',
    12,
    3,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 19:14:40'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    43,
    11,
    18,
    'Madan Mahal',
    12,
    3,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 19:14:57'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    44,
    11,
    18,
    'Madan Mahal',
    12,
    3,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '20',
    '1000',
    800,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 19:19:23'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    45,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 20:06:22'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    46,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '',
    '1000',
    1000,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 20:07:04'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    47,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 20:46:43'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    48,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 20:47:05'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    49,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 20:54:55'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    50,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    NULL,
    '',
    '2024-04-11 21:04:45'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    51,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    'Pending',
    '',
    '2024-04-12 17:06:57'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    52,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    '',
    '',
    '2024-04-12 17:29:09'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    53,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    '',
    '',
    '2024-04-12 17:51:09'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    54,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    'Recieved',
    '',
    '2024-04-12 18:21:40'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    55,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '10',
    '1000',
    900,
    NULL,
    NULL,
    NULL,
    '',
    '',
    '2024-04-12 18:31:05'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    56,
    11,
    18,
    'Madan Mahal',
    12,
    4,
    '123456',
    'Dental Cleanings',
    '85',
    '1',
    '1000',
    '',
    '0',
    '1000',
    1000,
    NULL,
    NULL,
    NULL,
    'Pending',
    '',
    '2024-04-12 19:27:47'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    58,
    14,
    24,
    'Madan Mahal',
    20,
    1,
    '123456',
    'Digital Compuler zcd XRay (R.V.G.)',
    '55',
    '1',
    '300',
    '',
    '10',
    '300',
    270,
    0,
    NULL,
    'dg_4',
    '',
    '',
    '2024-04-15 19:56:13'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    59,
    16,
    24,
    'Madan Mahal',
    26,
    1,
    '123456',
    'Root Canal Treatment @ per tooth',
    '54, 53',
    '2',
    '3000',
    '',
    '50',
    '6000',
    3000,
    3000,
    NULL,
    'dg_4',
    'Recieved',
    '',
    '2024-04-13 19:07:41'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    60,
    14,
    24,
    'Madan Mahal',
    25,
    1,
    '123456',
    'Digital Compuler zcd XRay (R.V.G.)',
    '55',
    '1',
    '300',
    '',
    '100',
    '300',
    0,
    0,
    NULL,
    'dg_4',
    'Recieved',
    '',
    '2024-04-15 19:56:05'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    61,
    14,
    24,
    'Madan Mahal',
    21,
    1,
    '123456',
    'Digital Compuler zcd XRay (R.V.G.)',
    '55',
    '1',
    '300',
    '',
    '100',
    '300',
    0,
    0,
    NULL,
    'dg_4',
    'Recieved',
    '',
    '2024-04-15 19:56:00'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    62,
    14,
    24,
    'Madan Mahal',
    0,
    2,
    '123456',
    'Digital Compuler zcd XRay (R.V.G.)',
    '55',
    '1',
    '300',
    '',
    '100',
    '300',
    0,
    0,
    NULL,
    'dg_4',
    'Recieved',
    '',
    '2024-04-15 13:52:49'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    63,
    18,
    29,
    'Madan Mahal',
    0,
    NULL,
    '123456',
    'Removable Partial Dentures @ per tooth',
    '62',
    '1',
    '800',
    '',
    '2',
    '800',
    784,
    0,
    NULL,
    'dg_4',
    'Recieved',
    'sdgsda',
    '2024-04-18 14:44:25'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    64,
    19,
    30,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Digital Compuler zcd XRay (R.V.G.)',
    '55, 54',
    '2',
    '300',
    '',
    '10',
    '600',
    540,
    0,
    5400,
    'dg_4',
    'Received',
    '',
    '2024-04-19 19:43:16'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    65,
    19,
    30,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Digital Compuler zcd XRay (R.V.G.)',
    '55, 54',
    '2',
    '300',
    '',
    '10',
    '600',
    540,
    540,
    5400,
    'dg_4',
    'Received',
    '',
    '2024-04-19 19:43:16'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    66,
    19,
    30,
    'Madan Mahal',
    0,
    2,
    '123456',
    'Digital Compuler zcd XRay (R.V.G.)',
    '55, 54',
    '2',
    '300',
    '',
    '10',
    '600',
    540,
    540,
    5400,
    'dg_4',
    'Received',
    '',
    '2024-04-19 19:43:16'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    67,
    20,
    30,
    'Madan Mahal',
    0,
    NULL,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    1400,
    5400,
    'dg_4',
    'Received',
    '',
    '2024-04-19 19:43:16'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    68,
    20,
    30,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    1400,
    5400,
    'dg_4',
    'Received',
    '',
    '2024-04-19 19:43:16'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    69,
    20,
    30,
    'Madan Mahal',
    0,
    2,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    1400,
    5400,
    'dg_4',
    'Received',
    '',
    '2024-04-19 19:43:16'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    70,
    20,
    30,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    1400,
    5400,
    'dg_4',
    'Received',
    '',
    '2024-04-19 19:43:16'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    71,
    20,
    30,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    1400,
    5400,
    'dg_4',
    'Received',
    '',
    '2024-04-19 19:43:16'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    72,
    20,
    30,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    5400,
    5400,
    'dg_4',
    'Received',
    '',
    '2024-04-19 19:43:16'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    73,
    20,
    30,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    0,
    5400,
    'dg_4',
    'Received',
    '',
    '2024-04-19 19:43:16'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    74,
    20,
    30,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    -600,
    NULL,
    'dg_4',
    'Recieved',
    '',
    '2024-04-19 19:56:18'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    75,
    20,
    30,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    400,
    5000,
    'dg_4',
    'Recieved',
    '',
    '2024-04-19 20:11:23'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    76,
    20,
    30,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    400,
    5000,
    'dg_4',
    'Pending',
    '',
    '2024-04-19 20:12:22'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    77,
    20,
    30,
    'Madan Mahal',
    0,
    2,
    '123456',
    'Root Canal Treatment @ per tooth',
    '53, 52',
    '2',
    '3000',
    '',
    '10',
    '6000',
    5400,
    -600,
    5400,
    'dg_4',
    '',
    '',
    '2024-04-19 20:25:40'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    78,
    22,
    33,
    'Madan Mahal',
    0,
    2,
    '789012',
    'Digital Compuler zcd XRay (R.V.G.)',
    '18, 17',
    '2',
    '300',
    '',
    '10',
    '600',
    540,
    240,
    300,
    'dg_4',
    'Recieved',
    '',
    '2024-04-20 20:59:44'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    79,
    22,
    33,
    'Madan Mahal',
    0,
    1,
    '789012',
    'Digital Compuler zcd XRay (R.V.G.)',
    '18, 17',
    '2',
    '300',
    '',
    '10',
    '600',
    540,
    540,
    0,
    'dg_4',
    'Recieved',
    '',
    '2024-04-20 21:15:19'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    80,
    23,
    35,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Digital Compuler zcd XRay (R.V.G.)',
    '18, 17',
    '2',
    '300',
    '',
    '10',
    '600',
    540,
    240,
    300,
    'dg_4',
    'Recieved',
    '',
    '2024-04-21 17:26:05'
  );
INSERT INTO
  `dental_treatment` (
    `id`,
    `exam_id`,
    `tp_id`,
    `branch_name`,
    `appointment_id`,
    `sitting_number`,
    `patient_uhid`,
    `dental_treatment`,
    `no_teeth`,
    `qty`,
    `cost_amt`,
    `original_cost_amt`,
    `disc_amt`,
    `total_amt`,
    `net_amount`,
    `dir_rec_amt`,
    `sec_rec_amt`,
    `dir_rec_doctor_id`,
    `sitting_payment_status`,
    `note`,
    `date`
  )
VALUES
  (
    81,
    24,
    37,
    'Madan Mahal',
    0,
    1,
    '123456',
    'Digital Compuler zcd XRay (R.V.G.)',
    '55, 54',
    '2',
    '300',
    '',
    '10',
    '600',
    540,
    540,
    300,
    'dg_4',
    'Pending',
    '',
    '2024-04-22 12:26:47'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: employee_attendance
# ------------------------------------------------------------

INSERT INTO
  `employee_attendance` (
    `attendance_id`,
    `employee_ID`,
    `emp_name`,
    `branch`,
    `employee_designation`,
    `date`,
    `morning_shift_login_time`,
    `morning_shift_logout_time`,
    `evening_shift_login_time`,
    `evening_shift_logout_time`,
    `allday_shift_login_time`,
    `allday_shift_logout_time`,
    `availability`
  )
VALUES
  (
    1,
    'dg_1',
    'umer',
    'Madan Mahal',
    'doctor',
    '2024-02-24 14:00:00.000000',
    NULL,
    NULL,
    NULL,
    NULL,
    '09:30:58.408000',
    '18:30:58.407000',
    'yes'
  );
INSERT INTO
  `employee_attendance` (
    `attendance_id`,
    `employee_ID`,
    `emp_name`,
    `branch`,
    `employee_designation`,
    `date`,
    `morning_shift_login_time`,
    `morning_shift_logout_time`,
    `evening_shift_login_time`,
    `evening_shift_logout_time`,
    `allday_shift_login_time`,
    `allday_shift_logout_time`,
    `availability`
  )
VALUES
  (
    2,
    'dg_2',
    'shubham',
    'Madan Mahal',
    'doctor',
    '2024-02-24 14:00:00.000000',
    NULL,
    NULL,
    NULL,
    NULL,
    '09:30:58.408000',
    '18:30:58.407000',
    'yes'
  );
INSERT INTO
  `employee_attendance` (
    `attendance_id`,
    `employee_ID`,
    `emp_name`,
    `branch`,
    `employee_designation`,
    `date`,
    `morning_shift_login_time`,
    `morning_shift_logout_time`,
    `evening_shift_login_time`,
    `evening_shift_logout_time`,
    `allday_shift_login_time`,
    `allday_shift_logout_time`,
    `availability`
  )
VALUES
  (
    3,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-20 00:00:00.000000',
    NULL,
    NULL,
    NULL,
    NULL,
    '17:19:48.000000',
    NULL,
    NULL
  );
INSERT INTO
  `employee_attendance` (
    `attendance_id`,
    `employee_ID`,
    `emp_name`,
    `branch`,
    `employee_designation`,
    `date`,
    `morning_shift_login_time`,
    `morning_shift_logout_time`,
    `evening_shift_login_time`,
    `evening_shift_logout_time`,
    `allday_shift_login_time`,
    `allday_shift_logout_time`,
    `availability`
  )
VALUES
  (
    4,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-04-20 00:00:00.000000',
    NULL,
    NULL,
    NULL,
    NULL,
    '17:20:22.000000',
    NULL,
    NULL
  );
INSERT INTO
  `employee_attendance` (
    `attendance_id`,
    `employee_ID`,
    `emp_name`,
    `branch`,
    `employee_designation`,
    `date`,
    `morning_shift_login_time`,
    `morning_shift_logout_time`,
    `evening_shift_login_time`,
    `evening_shift_logout_time`,
    `allday_shift_login_time`,
    `allday_shift_logout_time`,
    `availability`
  )
VALUES
  (
    5,
    NULL,
    'shadab',
    NULL,
    'doctor',
    '2024-04-20 00:00:00.000000',
    NULL,
    NULL,
    NULL,
    NULL,
    '17:21:44.000000',
    NULL,
    NULL
  );
INSERT INTO
  `employee_attendance` (
    `attendance_id`,
    `employee_ID`,
    `emp_name`,
    `branch`,
    `employee_designation`,
    `date`,
    `morning_shift_login_time`,
    `morning_shift_logout_time`,
    `evening_shift_login_time`,
    `evening_shift_logout_time`,
    `allday_shift_login_time`,
    `allday_shift_logout_time`,
    `availability`
  )
VALUES
  (
    6,
    'dg_4',
    'shadab',
    'Madan Mahal',
    'doctor',
    '2024-04-20 00:00:00.000000',
    NULL,
    NULL,
    NULL,
    NULL,
    '17:24:11.000000',
    '17:25:06.000000',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: employee_complaints
# ------------------------------------------------------------

INSERT INTO
  `employee_complaints` (
    `complain_id`,
    `emp_id`,
    `employee_name`,
    `branch_name`,
    `complain`,
    `rec_on`,
    `status`,
    `solved_on`,
    `pending_since`
  )
VALUES
  (
    1,
    'dg_1',
    'umer',
    'Madan Mahal',
    'I want more salary',
    '2024-02-27 13:00:00.000000',
    'Pending',
    NULL,
    NULL
  );
INSERT INTO
  `employee_complaints` (
    `complain_id`,
    `emp_id`,
    `employee_name`,
    `branch_name`,
    `complain`,
    `rec_on`,
    `status`,
    `solved_on`,
    `pending_since`
  )
VALUES
  (
    2,
    'dg_2',
    'shubham',
    'Vijay Nagar',
    'I want more salary',
    '2024-02-27 11:00:00.000000',
    'Pending',
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: employee_leave
# ------------------------------------------------------------

INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    2,
    NULL,
    'dg_4',
    NULL,
    '2024-02-24,2024-02-25,2024-02-26,2024-02-25,2024-03-26,2024-02-25,2024-04-27',
    'medical issue',
    'Approved'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    3,
    NULL,
    'dg_7',
    NULL,
    '2024-02-24 ',
    'none',
    'Approved'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    8,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-11,2024-04-12',
    '',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    11,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-11',
    '',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    14,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-11',
    'ff',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    17,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-11,2024-04-12,2024-04-13',
    'gg',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    18,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-11,2024-04-12,2024-04-14',
    'some',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    20,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-02,2024-04-03,2024-04-04',
    'on leave',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    21,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-06-27,2024-06-28',
    'ggg',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    22,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-06-27',
    'dd',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    23,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-06-27,2024-06-28,2024-06-11',
    'l',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    24,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-06-28,2024-06-27,2024-06-11',
    'll',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    25,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-06-11,2024-06-12',
    'fdf',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    27,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-11,2024-04-12,2024-04-23',
    'fd',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    28,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-30',
    'df',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    29,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-05-10',
    'ff',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    30,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-07-18',
    'ff',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    31,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-08-15',
    'dd',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    32,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-26',
    'fff',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    33,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-05-01',
    'ok',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    34,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-25',
    'ok',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    35,
    'Madan Mahal',
    'dg_5',
    'vijendra',
    '2024-04-20,2024-04-19,2024-04-18',
    'hello world',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    36,
    'Madan Mahal',
    'dg_5',
    'vijendra',
    '2024-04-14,2024-04-16',
    'ok',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    37,
    'Madan Mahal',
    'dg_5',
    'vijendra',
    '2024-04-10,2024-04-11,2024-04-12',
    'joi',
    'pending'
  );
INSERT INTO
  `employee_leave` (
    `id`,
    `branch_name`,
    `employee_ID`,
    `employee_name`,
    `leave_dates`,
    `leave_reason`,
    `leave_status`
  )
VALUES
  (
    38,
    'Madan Mahal',
    'dg_4',
    'shadab',
    '2024-04-29',
    'test leave',
    'pending'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: employee_register
# ------------------------------------------------------------

INSERT INTO
  `employee_register` (
    `sr_id`,
    `employee_ID`,
    `branch_name`,
    `employee_name`,
    `employee_mobile`,
    `employee_email`,
    `gender`,
    `employee_designation`,
    `employee_password`,
    `employee_role`,
    `salary`,
    `doctor_expertise`,
    `doctor_education_details`,
    `address`,
    `employee_status`,
    `morning_shift_start_time`,
    `morning_shift_end_time`,
    `evening_shift_start_time`,
    `evening_shift_end_time`,
    `allday_shift_start_time`,
    `allday_shift_end_time`,
    `working_days`,
    `availability`,
    `employee_picture`
  )
VALUES
  (
    1,
    'dg_1',
    'Madan Mahal',
    'umer',
    '8602161019',
    'umer@gmail.com',
    'male',
    'doctor',
    '$2b$10$7oAX2F11um8RtXe4dwHHDu4WYSxg1RgrnqVqFG9zPLpXD0Tm2cM1O',
    'receptionist,doctor,consultant,lab attendant,admin',
    '30000',
    NULL,
    NULL,
    'Ranjhi, Jabalpur',
    'Approved',
    NULL,
    NULL,
    NULL,
    NULL,
    '10:30:00.000000',
    '19:00:41.475000',
    'mon-fri',
    'yes',
    'http://localhost:7777/empProfilePicture/1709360553977Bigbulls Course.png'
  );
INSERT INTO
  `employee_register` (
    `sr_id`,
    `employee_ID`,
    `branch_name`,
    `employee_name`,
    `employee_mobile`,
    `employee_email`,
    `gender`,
    `employee_designation`,
    `employee_password`,
    `employee_role`,
    `salary`,
    `doctor_expertise`,
    `doctor_education_details`,
    `address`,
    `employee_status`,
    `morning_shift_start_time`,
    `morning_shift_end_time`,
    `evening_shift_start_time`,
    `evening_shift_end_time`,
    `allday_shift_start_time`,
    `allday_shift_end_time`,
    `working_days`,
    `availability`,
    `employee_picture`
  )
VALUES
  (
    2,
    'dg_2',
    'Madan Mahal',
    'shubham',
    '8602161019',
    'vikram@gmail.com',
    'male',
    'doctor',
    '$2b$10$pyFDTpDQf7WWxs8FIE0YLuBT6n0ZzBBeLFPohm3qwEvbTRV2rUvgG',
    'admin,receptionist',
    '50000',
    NULL,
    NULL,
    'Madan Mahal, Jabalpur',
    'Approved',
    NULL,
    NULL,
    NULL,
    NULL,
    '10:30:41.769000',
    '19:00:41.118000',
    'mon-fri',
    'yes',
    'http://localhost:7777/empProfilePicture/1709303771914bb3.png'
  );
INSERT INTO
  `employee_register` (
    `sr_id`,
    `employee_ID`,
    `branch_name`,
    `employee_name`,
    `employee_mobile`,
    `employee_email`,
    `gender`,
    `employee_designation`,
    `employee_password`,
    `employee_role`,
    `salary`,
    `doctor_expertise`,
    `doctor_education_details`,
    `address`,
    `employee_status`,
    `morning_shift_start_time`,
    `morning_shift_end_time`,
    `evening_shift_start_time`,
    `evening_shift_end_time`,
    `allday_shift_start_time`,
    `allday_shift_end_time`,
    `working_days`,
    `availability`,
    `employee_picture`
  )
VALUES
  (
    4,
    'dg_3',
    'Madan Mahal',
    'Vinay singh',
    '8602161019',
    'vinay@gmail.com',
    'Male',
    'doctor',
    'vinay',
    'doctor',
    '50000',
    NULL,
    NULL,
    'jabalpur',
    'Pending',
    '10:30:00.000000',
    '00:00:00.000000',
    '00:00:00.000000',
    '00:00:00.000000',
    '00:00:00.000000',
    '00:00:00.000000',
    NULL,
    'yes',
    'http://localhost:7777/empProfilePicture/1709278594627chaitanya img.jpg'
  );
INSERT INTO
  `employee_register` (
    `sr_id`,
    `employee_ID`,
    `branch_name`,
    `employee_name`,
    `employee_mobile`,
    `employee_email`,
    `gender`,
    `employee_designation`,
    `employee_password`,
    `employee_role`,
    `salary`,
    `doctor_expertise`,
    `doctor_education_details`,
    `address`,
    `employee_status`,
    `morning_shift_start_time`,
    `morning_shift_end_time`,
    `evening_shift_start_time`,
    `evening_shift_end_time`,
    `allday_shift_start_time`,
    `allday_shift_end_time`,
    `working_days`,
    `availability`,
    `employee_picture`
  )
VALUES
  (
    5,
    'dg_4',
    'Madan Mahal',
    'shadab',
    '8602161019',
    'shadab@gmail.com',
    'male',
    'doctor',
    '$2b$10$2YcG82plPpSPv81SRIrRieTjV161MNFVdqXtcq2THlrW9ROBqYC1e',
    'doctor',
    '50000',
    'Dentist, Oral and Maxillofacial Surgeon',
    'BDS, M.Phil. Oral Pathology & Microbiology, FCPS ',
    'Jabalpur',
    'Approved',
    '10:00:00.747000',
    '14:00:00.320000',
    '16:00:00.523000',
    '20:00:00.707000',
    '10:00:00.000000',
    '19:00:00.000000',
    'Mon-Fri',
    'yes',
    'http://localhost:7777/empProfilePicture/1709288479773kd.jpg'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: holidays
# ------------------------------------------------------------

INSERT INTO
  `holidays` (
    `holiday_id`,
    `branch_name`,
    `holiday_name`,
    `holiday_date`,
    `holiday_start_time`,
    `holiday_end_time`,
    `notes`
  )
VALUES
  (
    2,
    'Madan Mahal',
    'holi',
    '2024-03-07',
    '10:00:00.000000',
    '19:00:00.000000',
    'leave'
  );
INSERT INTO
  `holidays` (
    `holiday_id`,
    `branch_name`,
    `holiday_name`,
    `holiday_date`,
    `holiday_start_time`,
    `holiday_end_time`,
    `notes`
  )
VALUES
  (
    3,
    'Madan Mahal',
    'diwali',
    '2024-04-08',
    '11:00:00.374000',
    '19:00:00.000000',
    'leave test'
  );
INSERT INTO
  `holidays` (
    `holiday_id`,
    `branch_name`,
    `holiday_name`,
    `holiday_date`,
    `holiday_start_time`,
    `holiday_end_time`,
    `notes`
  )
VALUES
  (
    4,
    'Madan Mahal',
    'eid',
    '2024-04-09',
    '00:00:00.000000',
    NULL,
    'leave test'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: lab_details
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: new_table
# ------------------------------------------------------------

INSERT INTO
  `new_table` (
    `id`,
    `uhid`,
    `branch_name`,
    `patient_name`,
    `mobileno`,
    `emailid`,
    `appoint_id`,
    `assigned_doctor_name`,
    `dental_treatment`,
    `no_teeth`,
    `cost_amt`,
    `total_amt`,
    `medicine_name`,
    `dosage`
  )
VALUES
  (
    1,
    '3456789012',
    'Branch C',
    'Alice Johnson',
    '5555555555',
    'alice.johnson@example.com',
    '3',
    'Dr. Williams',
    'Dental Examinations,Dental Cleanings',
    NULL,
    '500,400',
    '875',
    'Disprin 325 tablet,Disprin 325 tablet',
    '300mg,300mg'
  );
INSERT INTO
  `new_table` (
    `id`,
    `uhid`,
    `branch_name`,
    `patient_name`,
    `mobileno`,
    `emailid`,
    `appoint_id`,
    `assigned_doctor_name`,
    `dental_treatment`,
    `no_teeth`,
    `cost_amt`,
    `total_amt`,
    `medicine_name`,
    `dosage`
  )
VALUES
  (
    2,
    '3456789012',
    'Branch C',
    'Alice Johnson',
    '5555555555',
    'alice.johnson@example.com',
    '3',
    'Dr. Williams',
    'Dental Examinations,Dental Cleanings',
    NULL,
    '500,400',
    '875',
    'Disprin 325 tablet,Disprin 325 tablet',
    '300mg,300mg'
  );
INSERT INTO
  `new_table` (
    `id`,
    `uhid`,
    `branch_name`,
    `patient_name`,
    `mobileno`,
    `emailid`,
    `appoint_id`,
    `assigned_doctor_name`,
    `dental_treatment`,
    `no_teeth`,
    `cost_amt`,
    `total_amt`,
    `medicine_name`,
    `dosage`
  )
VALUES
  (
    3,
    '3456789012',
    'Madan Mahal',
    'Alice Johnson',
    '5555555555',
    'alice.johnson@example.com',
    '3',
    'Dr. Williams',
    'Dental Examinations',
    NULL,
    '500',
    '475',
    NULL,
    NULL
  );
INSERT INTO
  `new_table` (
    `id`,
    `uhid`,
    `branch_name`,
    `patient_name`,
    `mobileno`,
    `emailid`,
    `appoint_id`,
    `assigned_doctor_name`,
    `dental_treatment`,
    `no_teeth`,
    `cost_amt`,
    `total_amt`,
    `medicine_name`,
    `dosage`
  )
VALUES
  (
    4,
    '3456789012',
    'Madan Mahal',
    'Alice Johnson',
    '5555555555',
    'alice.johnson@example.com',
    '3',
    'Dr. Williams',
    'Dental Examinations',
    NULL,
    '500',
    '475',
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: otpcollections
# ------------------------------------------------------------

INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    1,
    'kuldeepdoauruinfosystems@gmail.com',
    587935,
    NULL,
    '2024-02-21 18:33:23.431863'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    2,
    'kuldeepdoauruinfosystems@gmail.com',
    851667,
    NULL,
    '2024-02-21 19:12:17.013360'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    3,
    'kuldeepdoauruinfosystems@gmail.com',
    855544,
    NULL,
    '2024-02-22 12:18:46.753943'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    4,
    'kuldeepdoauruinfosystems@gmail.com',
    394582,
    NULL,
    '2024-02-22 12:54:40.811092'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    5,
    'kuldeepdoauruinfosystems@gmail.com',
    348952,
    NULL,
    '2024-02-22 13:05:16.163797'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    6,
    'kuldeepdoauruinfosystems@gmail.com',
    233311,
    NULL,
    '2024-02-22 13:06:19.224783'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    7,
    'kuldeepdoauruinfosystems@gmail.com',
    754852,
    NULL,
    '2024-02-22 13:07:53.012550'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    8,
    'kuldeepdoauruinfosystems@gmail.com',
    801791,
    NULL,
    '2024-02-22 13:14:34.381103'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    9,
    'kuldeepdoauruinfosystems@gmail.com',
    300465,
    NULL,
    '2024-02-23 11:22:51.242543'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    10,
    'kuldeepdoauruinfosystems@gmail.com',
    698273,
    NULL,
    '2024-02-23 17:18:20.380124'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    11,
    'kuldeepdoauruinfosystems@gmail.com',
    283679,
    NULL,
    '2024-02-24 11:34:02.935165'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    12,
    'kuldeepdoauruinfosystems@gmail.com',
    848649,
    NULL,
    '2024-02-26 10:25:56.361254'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    13,
    'kuldeepdoauruinfosystems@gmail.com',
    458135,
    NULL,
    '2024-02-26 17:11:17.510872'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    14,
    'kuldeepdoauruinfosystems@gmail.com',
    937824,
    NULL,
    '2024-02-27 11:18:34.079116'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    15,
    'kuldeepdoauruinfosystems@gmail.com',
    497447,
    NULL,
    '2024-02-28 11:26:40.878943'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    16,
    'kuldeepdoauruinfosystems@gmail.com',
    211604,
    NULL,
    '2024-02-29 11:33:46.392221'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    17,
    'kuldeepdoauruinfosystems@gmail.com',
    662478,
    NULL,
    '2024-03-01 11:12:15.580562'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    18,
    'kuldeepdoauruinfosystems@gmail.com',
    136910,
    NULL,
    '2024-03-02 10:23:32.367120'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    19,
    'kuldeepdoauruinfosystems@gmail.com',
    143300,
    NULL,
    '2024-03-02 11:41:17.213533'
  );
INSERT INTO
  `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`)
VALUES
  (
    20,
    'devdeveloper998@gmail.com',
    96436,
    NULL,
    '2024-04-22 18:17:45.809463'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: patient_bills
# ------------------------------------------------------------

INSERT INTO
  `patient_bills` (
    `bill_id`,
    `bill_date`,
    `uhid`,
    `tp_id`,
    `branch_name`,
    `patient_name`,
    `patient_mobile`,
    `patient_email`,
    `assigned_doctor_name`,
    `total_amount`,
    `paid_amount`,
    `pay_by_sec_amt`,
    `payment_status`,
    `payment_mode`,
    `trannsaction_Id`,
    `note`,
    `payment_date_time`,
    `receiver_name`,
    `receiver_emp_id`
  )
VALUES
  (
    1,
    '2024-04-13 20:37:07',
    'dg_1',
    1,
    'Madan Mahal',
    'shubham',
    '8602161019',
    'shubham@gmail.com',
    'shadab',
    100000,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `patient_bills` (
    `bill_id`,
    `bill_date`,
    `uhid`,
    `tp_id`,
    `branch_name`,
    `patient_name`,
    `patient_mobile`,
    `patient_email`,
    `assigned_doctor_name`,
    `total_amount`,
    `paid_amount`,
    `pay_by_sec_amt`,
    `payment_status`,
    `payment_mode`,
    `trannsaction_Id`,
    `note`,
    `payment_date_time`,
    `receiver_name`,
    `receiver_emp_id`
  )
VALUES
  (
    2,
    '2024-04-13 20:37:35',
    'dg_1',
    1,
    'Madan Mahal',
    'shubham',
    '8602161019',
    'shubham@gmail.com',
    'shadab',
    100000,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `patient_bills` (
    `bill_id`,
    `bill_date`,
    `uhid`,
    `tp_id`,
    `branch_name`,
    `patient_name`,
    `patient_mobile`,
    `patient_email`,
    `assigned_doctor_name`,
    `total_amount`,
    `paid_amount`,
    `pay_by_sec_amt`,
    `payment_status`,
    `payment_mode`,
    `trannsaction_Id`,
    `note`,
    `payment_date_time`,
    `receiver_name`,
    `receiver_emp_id`
  )
VALUES
  (
    3,
    '2024-04-13 20:38:20',
    'dg_1',
    1,
    'Madan Mahal',
    'shubham',
    '8602161019',
    'shubham@gmail.com',
    'shadab',
    100000,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `patient_bills` (
    `bill_id`,
    `bill_date`,
    `uhid`,
    `tp_id`,
    `branch_name`,
    `patient_name`,
    `patient_mobile`,
    `patient_email`,
    `assigned_doctor_name`,
    `total_amount`,
    `paid_amount`,
    `pay_by_sec_amt`,
    `payment_status`,
    `payment_mode`,
    `trannsaction_Id`,
    `note`,
    `payment_date_time`,
    `receiver_name`,
    `receiver_emp_id`
  )
VALUES
  (
    4,
    '2024-04-13 20:41:21',
    'dg_1',
    1,
    'Madan Mahal',
    'shubham',
    '8602161019',
    'shubham@gmail.com',
    'shadab',
    100000,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `patient_bills` (
    `bill_id`,
    `bill_date`,
    `uhid`,
    `tp_id`,
    `branch_name`,
    `patient_name`,
    `patient_mobile`,
    `patient_email`,
    `assigned_doctor_name`,
    `total_amount`,
    `paid_amount`,
    `pay_by_sec_amt`,
    `payment_status`,
    `payment_mode`,
    `trannsaction_Id`,
    `note`,
    `payment_date_time`,
    `receiver_name`,
    `receiver_emp_id`
  )
VALUES
  (
    9,
    '2024-04-15 12:04:15',
    '123456',
    24,
    'Madan Mahal',
    'Vinay Johnson',
    '7890123456',
    'alicejohnson@example.com',
    'shadab',
    3270,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `patient_bills` (
    `bill_id`,
    `bill_date`,
    `uhid`,
    `tp_id`,
    `branch_name`,
    `patient_name`,
    `patient_mobile`,
    `patient_email`,
    `assigned_doctor_name`,
    `total_amount`,
    `paid_amount`,
    `pay_by_sec_amt`,
    `payment_status`,
    `payment_mode`,
    `trannsaction_Id`,
    `note`,
    `payment_date_time`,
    `receiver_name`,
    `receiver_emp_id`
  )
VALUES
  (
    13,
    '2024-04-19 20:41:19',
    '123456',
    30,
    'Madan Mahal',
    'Vinay Johnson',
    '7890123456',
    'alicejohnson@example.com',
    'shadab',
    61020,
    13080,
    69400,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `patient_bills` (
    `bill_id`,
    `bill_date`,
    `uhid`,
    `tp_id`,
    `branch_name`,
    `patient_name`,
    `patient_mobile`,
    `patient_email`,
    `assigned_doctor_name`,
    `total_amount`,
    `paid_amount`,
    `pay_by_sec_amt`,
    `payment_status`,
    `payment_mode`,
    `trannsaction_Id`,
    `note`,
    `payment_date_time`,
    `receiver_name`,
    `receiver_emp_id`
  )
VALUES
  (
    14,
    '2024-04-20 21:19:37',
    '789012',
    33,
    'Madan Mahal',
    'Mohit Doe',
    '1234567890',
    'johndoe@example.com',
    'shadab',
    1080,
    780,
    300,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `patient_bills` (
    `bill_id`,
    `bill_date`,
    `uhid`,
    `tp_id`,
    `branch_name`,
    `patient_name`,
    `patient_mobile`,
    `patient_email`,
    `assigned_doctor_name`,
    `total_amount`,
    `paid_amount`,
    `pay_by_sec_amt`,
    `payment_status`,
    `payment_mode`,
    `trannsaction_Id`,
    `note`,
    `payment_date_time`,
    `receiver_name`,
    `receiver_emp_id`
  )
VALUES
  (
    15,
    '2024-04-22 17:14:19',
    '123456',
    35,
    'Madan Mahal',
    'Vinay Johnson',
    '7890123456',
    'alicejohnson@example.com',
    'shadab',
    540,
    440,
    100,
    'paid',
    'cash',
    NULL,
    'test',
    '2024-04-22 00:00:00.000000',
    'shadab',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: patient_details
# ------------------------------------------------------------

INSERT INTO
  `patient_details` (
    `uhid`,
    `branch_name`,
    `initialid`,
    `patient_name`,
    `dob`,
    `age`,
    `weight`,
    `gender`,
    `maritalstatus`,
    `bloodgroup`,
    `mobileno`,
    `alternatecontactno`,
    `emailid`,
    `contact_person`,
    `contact_person_name`,
    `allergy`,
    `disease`,
    `isstaff`,
    `staffempid`,
    `staffrelationid`,
    `isforeign`,
    `isvip`,
    `fathername`,
    `husbandname`,
    `mothername`,
    `address`,
    `pincode`,
    `patient_type`,
    `aadhaar_no`,
    `patient_added_by`,
    `patient_updated_by`,
    `patient_added_by_emp_id`,
    `patient_updated_by_emp_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    '123456',
    'Madan Mahal',
    'D789',
    'Vinay Johnson',
    '1985-03-10',
    '39',
    '60.8',
    'Female',
    'Married',
    'B+',
    '7890123456',
    '9012345678',
    'alicejohnson@example.com',
    'Bob Johnson',
    'Bob Johnson',
    NULL,
    'Diabetes',
    '1',
    '201',
    '102',
    '0',
    '1',
    'Thomas Smith',
    'John Johnson',
    'Mary Johnson',
    '789 Oak St, Village',
    '789012',
    'VIP',
    '9012 3456 7890',
    'Receptionist',
    'Doctor',
    '202',
    '103',
    NULL,
    '2024-04-01 11:30:28'
  );
INSERT INTO
  `patient_details` (
    `uhid`,
    `branch_name`,
    `initialid`,
    `patient_name`,
    `dob`,
    `age`,
    `weight`,
    `gender`,
    `maritalstatus`,
    `bloodgroup`,
    `mobileno`,
    `alternatecontactno`,
    `emailid`,
    `contact_person`,
    `contact_person_name`,
    `allergy`,
    `disease`,
    `isstaff`,
    `staffempid`,
    `staffrelationid`,
    `isforeign`,
    `isvip`,
    `fathername`,
    `husbandname`,
    `mothername`,
    `address`,
    `pincode`,
    `patient_type`,
    `aadhaar_no`,
    `patient_added_by`,
    `patient_updated_by`,
    `patient_added_by_emp_id`,
    `patient_updated_by_emp_id`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    '789012',
    'Madan Mahal',
    'G123',
    'Mohit Doe',
    '1990-05-15',
    '34',
    '70.5',
    'Male',
    'Single',
    'O+',
    '1234567890',
    '9876543210',
    'johndoe@example.com',
    'Jane Doe',
    'Jane Doe',
    'Peanuts',
    'Hypertension',
    '0',
    NULL,
    NULL,
    '0',
    '0',
    'Michael Doe',
    NULL,
    'Samantha Doe',
    '123 Main St, City',
    '123456',
    'Regular',
    '1234 5678 9012',
    'Admin',
    'Admin',
    '101',
    '101',
    NULL,
    '2024-04-01 11:30:28'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: patient_lab_details
# ------------------------------------------------------------

INSERT INTO
  `patient_lab_details` (
    `testid`,
    `tpid`,
    `patient_uhid`,
    `patient_name`,
    `branch_name`,
    `assigned_doctor_name`,
    `lab_name`,
    `test`,
    `test_status`,
    `created_date`
  )
VALUES
  (
    18,
    94,
    'DH_19',
    'dev',
    'Madan Mahal',
    'shadab',
    'blood',
    'M C V',
    'done',
    '2024-05-08 15:19:18'
  );
INSERT INTO
  `patient_lab_details` (
    `testid`,
    `tpid`,
    `patient_uhid`,
    `patient_name`,
    `branch_name`,
    `assigned_doctor_name`,
    `lab_name`,
    `test`,
    `test_status`,
    `created_date`
  )
VALUES
  (
    19,
    94,
    'DH_19',
    'dev',
    'Madan Mahal',
    'shadab',
    'radiology',
    'Panoramic X-rays',
    'pending',
    '2024-05-08 16:47:19'
  );
INSERT INTO
  `patient_lab_details` (
    `testid`,
    `tpid`,
    `patient_uhid`,
    `patient_name`,
    `branch_name`,
    `assigned_doctor_name`,
    `lab_name`,
    `test`,
    `test_status`,
    `created_date`
  )
VALUES
  (
    21,
    96,
    'DH_25',
    'shiv singh',
    'Madan Mahal',
    'shadab',
    'radiology',
    'Ultrasound',
    'pending',
    '2024-05-08 18:27:07'
  );
INSERT INTO
  `patient_lab_details` (
    `testid`,
    `tpid`,
    `patient_uhid`,
    `patient_name`,
    `branch_name`,
    `assigned_doctor_name`,
    `lab_name`,
    `test`,
    `test_status`,
    `created_date`
  )
VALUES
  (
    22,
    96,
    'DH_25',
    'shiv singh',
    'Madan Mahal',
    'shadab',
    'blood',
    'Thyroid Function Tests',
    'pending',
    '2024-05-08 18:27:32'
  );
INSERT INTO
  `patient_lab_details` (
    `testid`,
    `tpid`,
    `patient_uhid`,
    `patient_name`,
    `branch_name`,
    `assigned_doctor_name`,
    `lab_name`,
    `test`,
    `test_status`,
    `created_date`
  )
VALUES
  (
    23,
    96,
    'DH_25',
    'shiv singh',
    'Madan Mahal',
    'shadab',
    'oral',
    'Viva Voce Exams',
    'pending',
    '2024-05-08 18:27:38'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: patient_timeline
# ------------------------------------------------------------

INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    1,
    '2024-04-01',
    '16:33:14.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    2,
    '2024-04-01',
    '17:16:17.000000',
    'Examiantion',
    'Add Teeth',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    3,
    '2024-04-01',
    '17:33:08.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    4,
    '2024-04-01',
    '18:19:48.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    5,
    '2024-04-01',
    '19:07:24.000000',
    'Treatment Suggest',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    6,
    '2024-04-01',
    '19:07:38.000000',
    ' Dental Laboratory Test',
    'Add Laboratory Test',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    7,
    '2024-04-01',
    '19:31:11.000000',
    'Secuirty Amount',
    'Select Treatment Plan',
    'Madan Mahal',
    ''
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    8,
    '2024-04-01',
    '19:32:33.000000',
    'Secuirty Amount',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    9,
    '2024-04-01',
    '20:11:47.000000',
    'Treatment Form',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    10,
    '2024-04-02',
    '10:39:03.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    11,
    '2024-04-02',
    '12:03:53.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    12,
    '2024-04-02',
    '12:04:50.000000',
    'Examiantion',
    'Add Teeth DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    13,
    '2024-04-02',
    '12:05:40.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    14,
    '2024-04-02',
    '12:06:05.000000',
    'Treatment Producer',
    'Treatment Data Update',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    15,
    '2024-04-02',
    '12:21:01.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    16,
    '2024-04-02',
    '12:21:06.000000',
    'Treatment Producer',
    'Treatment Data Delete ',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    17,
    '2024-04-02',
    '12:33:39.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    18,
    '2024-04-02',
    '12:35:02.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    19,
    '2024-04-02',
    '12:37:21.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    20,
    '2024-04-02',
    '12:37:25.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    21,
    '2024-04-02',
    '12:55:22.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    22,
    '2024-04-02',
    '12:58:24.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    23,
    '2024-04-02',
    '12:59:09.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    24,
    '2024-04-02',
    '13:00:23.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    25,
    '2024-04-02',
    '13:40:35.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    26,
    '2024-04-02',
    '14:44:33.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    27,
    '2024-04-02',
    '19:45:46.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    28,
    '2024-04-02',
    '20:04:54.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    29,
    '2024-04-02',
    '20:08:24.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    30,
    '2024-04-02',
    '20:12:33.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    31,
    '2024-04-02',
    '20:17:12.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    32,
    '2024-04-02',
    '20:41:43.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    33,
    '2024-04-03',
    '10:21:41.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    34,
    '2024-04-03',
    '10:27:28.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    35,
    '2024-04-03',
    '10:28:27.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    36,
    '2024-04-03',
    '10:28:53.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    37,
    '2024-04-03',
    '13:02:08.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    38,
    '2024-04-03',
    '13:06:11.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    39,
    '2024-04-03',
    '13:08:22.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    40,
    '2024-04-03',
    '13:11:18.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    41,
    '2024-04-03',
    '13:11:37.000000',
    'Examiantion',
    'Add Teeth DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    42,
    '2024-04-03',
    '13:12:01.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    43,
    '2024-04-03',
    '13:12:08.000000',
    'Treatment Producer',
    'Treatment Data Delete ',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    44,
    '2024-04-03',
    '13:12:43.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    45,
    '2024-04-03',
    '13:13:01.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    46,
    '2024-04-03',
    '13:13:24.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    47,
    '2024-04-03',
    '13:13:33.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    48,
    '2024-04-03',
    '13:14:26.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    49,
    '2024-04-03',
    '13:14:56.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    50,
    '2024-04-03',
    '13:15:02.000000',
    ' Dental Laboratory Test',
    'Add Laboratory Test',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    51,
    '2024-04-03',
    '13:15:18.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    52,
    '2024-04-03',
    '13:17:00.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    53,
    '2024-04-03',
    '13:17:13.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    54,
    '2024-04-03',
    '13:17:33.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    55,
    '2024-04-03',
    '13:17:39.000000',
    ' Dental Laboratory Test',
    'Add Laboratory Test',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    56,
    '2024-04-03',
    '13:20:26.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    57,
    '2024-04-03',
    '13:20:41.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    58,
    '2024-04-03',
    '14:35:35.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    59,
    '2024-04-03',
    '14:41:17.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    NULL
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    60,
    '2024-04-03',
    '14:43:49.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    61,
    '2024-04-03',
    '14:44:00.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    62,
    '2024-04-03',
    '15:32:39.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    63,
    '2024-04-03',
    '15:45:16.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    64,
    '2024-04-03',
    '15:45:45.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    65,
    '2024-04-03',
    '17:03:41.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    66,
    '2024-04-03',
    '17:03:56.000000',
    'Examiantion',
    'Add Teeth DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    67,
    '2024-04-03',
    '17:04:37.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    68,
    '2024-04-03',
    '17:05:45.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    69,
    '2024-04-03',
    '17:11:38.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    70,
    '2024-04-03',
    '17:11:49.000000',
    'Examiantion',
    'Add Teeth DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    71,
    '2024-04-03',
    '17:11:56.000000',
    'Examiantion',
    'Add Teeth DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    72,
    '2024-04-03',
    '17:52:19.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    73,
    '2024-04-03',
    '20:23:26.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    74,
    '2024-04-04',
    '10:22:23.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    75,
    '2024-04-04',
    '10:33:08.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    76,
    '2024-04-04',
    '10:33:29.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    77,
    '2024-04-04',
    '10:35:20.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    78,
    '2024-04-04',
    '10:36:48.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    79,
    '2024-04-04',
    '10:38:01.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    80,
    '2024-04-04',
    '10:39:19.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    81,
    '2024-04-04',
    '10:39:58.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    82,
    '2024-04-04',
    '10:40:41.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    83,
    '2024-04-04',
    '10:41:50.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    84,
    '2024-04-04',
    '10:42:04.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    85,
    '2024-04-04',
    '10:43:15.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    86,
    '2024-04-04',
    '10:45:08.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    87,
    '2024-04-04',
    '10:45:28.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    88,
    '2024-04-04',
    '10:46:15.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    89,
    '2024-04-04',
    '10:47:38.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    90,
    '2024-04-04',
    '10:48:30.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    91,
    '2024-04-04',
    '10:57:15.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    92,
    '2024-04-04',
    '11:09:05.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    93,
    '2024-04-04',
    '11:10:08.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    94,
    '2024-04-04',
    '11:10:16.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    95,
    '2024-04-04',
    '11:11:05.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    96,
    '2024-04-04',
    '11:28:06.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    97,
    '2024-04-04',
    '11:32:49.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    98,
    '2024-04-04',
    '15:27:01.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    99,
    '2024-04-04',
    '15:56:53.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    100,
    '2024-04-04',
    '16:05:10.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    101,
    '2024-04-04',
    '16:07:21.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    102,
    '2024-04-04',
    '16:08:24.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    103,
    '2024-04-04',
    '18:53:48.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    104,
    '2024-04-04',
    '18:54:40.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    105,
    '2024-04-04',
    '20:42:35.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    106,
    '2024-04-04',
    '20:51:47.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    107,
    '2024-04-04',
    '21:54:56.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    108,
    '2024-04-05',
    '10:18:41.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    109,
    '2024-04-05',
    '11:06:14.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    110,
    '2024-04-05',
    '11:07:46.000000',
    'Examiantion',
    'Add Teeth DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    111,
    '2024-04-05',
    '11:08:24.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    112,
    '2024-04-05',
    '11:22:07.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    113,
    '2024-04-05',
    '11:23:14.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    114,
    '2024-04-05',
    '11:25:49.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    115,
    '2024-04-05',
    '11:28:24.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    116,
    '2024-04-05',
    '11:35:16.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    117,
    '2024-04-05',
    '11:37:06.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    118,
    '2024-04-05',
    '11:37:15.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    119,
    '2024-04-05',
    '11:39:58.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    120,
    '2024-04-05',
    '11:40:39.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    121,
    '2024-04-05',
    '11:42:22.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    122,
    '2024-04-05',
    '11:42:48.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    123,
    '2024-04-05',
    '13:39:05.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    124,
    '2024-04-05',
    '13:39:51.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    125,
    '2024-04-05',
    '13:43:52.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    126,
    '2024-04-05',
    '13:45:14.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    127,
    '2024-04-05',
    '13:47:05.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    128,
    '2024-04-05',
    '13:48:06.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    129,
    '2024-04-05',
    '13:50:45.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    130,
    '2024-04-05',
    '13:52:42.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    131,
    '2024-04-05',
    '14:04:23.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    132,
    '2024-04-05',
    '14:14:51.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    133,
    '2024-04-05',
    '14:16:32.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    134,
    '2024-04-05',
    '14:32:09.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    135,
    '2024-04-05',
    '14:33:46.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    136,
    '2024-04-05',
    '14:34:33.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    137,
    '2024-04-05',
    '14:44:46.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    138,
    '2024-04-05',
    '14:45:45.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    139,
    '2024-04-05',
    '15:56:21.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    140,
    '2024-04-05',
    '16:38:15.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    141,
    '2024-04-05',
    '16:41:20.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    142,
    '2024-04-05',
    '16:43:13.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    143,
    '2024-04-05',
    '16:43:59.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    144,
    '2024-04-06',
    '10:31:11.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    145,
    '2024-04-06',
    '10:39:35.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    146,
    '2024-04-06',
    '10:43:05.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    147,
    '2024-04-06',
    '10:46:13.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    148,
    '2024-04-06',
    '15:34:42.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    149,
    '2024-04-06',
    '15:35:04.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    150,
    '2024-04-06',
    '16:52:04.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    151,
    '2024-04-06',
    '17:03:15.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    152,
    '2024-04-06',
    '17:04:36.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    153,
    '2024-04-06',
    '17:10:11.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    154,
    '2024-04-06',
    '17:10:36.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    155,
    '2024-04-06',
    '17:17:57.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    156,
    '2024-04-06',
    '17:51:19.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    157,
    '2024-04-06',
    '17:51:33.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    158,
    '2024-04-06',
    '21:05:43.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    159,
    '2024-04-06',
    '21:10:31.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    160,
    '2024-04-06',
    '21:18:59.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    161,
    '2024-04-06',
    '21:26:12.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    162,
    '2024-04-06',
    '21:27:10.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    163,
    '2024-04-06',
    '21:27:55.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    164,
    '2024-04-06',
    '21:39:42.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    165,
    '2024-04-06',
    '21:42:10.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    166,
    '2024-04-06',
    '21:43:03.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    167,
    '2024-04-06',
    '22:03:37.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    168,
    '2024-04-06',
    '22:10:29.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    169,
    '2024-04-08',
    '10:44:13.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    170,
    '2024-04-08',
    '10:44:33.000000',
    'Examiantion',
    'Add Teeth DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    171,
    '2024-04-08',
    '10:45:15.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    172,
    '2024-04-08',
    '10:45:52.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    173,
    '2024-04-08',
    '10:46:43.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    174,
    '2024-04-08',
    '11:24:56.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    175,
    '2024-04-08',
    '11:26:02.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    176,
    '2024-04-08',
    '11:45:23.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    177,
    '2024-04-08',
    '11:56:24.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    178,
    '2024-04-08',
    '12:39:58.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    179,
    '2024-04-08',
    '12:41:22.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    180,
    '2024-04-08',
    '12:42:17.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    181,
    '2024-04-08',
    '12:44:36.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    182,
    '2024-04-08',
    '12:49:43.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    183,
    '2024-04-08',
    '12:51:24.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    184,
    '2024-04-08',
    '12:53:45.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    185,
    '2024-04-08',
    '15:24:41.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    186,
    '2024-04-08',
    '15:31:47.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    187,
    '2024-04-08',
    '15:33:35.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    188,
    '2024-04-08',
    '15:50:42.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    189,
    '2024-04-08',
    '16:12:36.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    190,
    '2024-04-08',
    '16:14:26.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    191,
    '2024-04-08',
    '16:15:16.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    192,
    '2024-04-08',
    '16:34:52.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    193,
    '2024-04-08',
    '16:39:32.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    194,
    '2024-04-08',
    '17:44:14.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    195,
    '2024-04-08',
    '17:45:13.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    196,
    '2024-04-08',
    '17:45:20.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    197,
    '2024-04-08',
    '17:48:09.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    198,
    '2024-04-08',
    '18:14:16.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    199,
    '2024-04-08',
    '20:56:12.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    200,
    '2024-04-08',
    '21:23:06.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    201,
    '2024-04-08',
    '23:24:28.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    202,
    '2024-04-08',
    '23:26:15.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    203,
    '2024-04-08',
    '23:27:27.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    204,
    '2024-04-08',
    '23:27:36.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    205,
    '2024-04-09',
    '10:10:13.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    206,
    '2024-04-09',
    '10:40:20.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    207,
    '2024-04-09',
    '12:14:48.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    208,
    '2024-04-09',
    '12:15:14.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    209,
    '2024-04-09',
    '13:18:29.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    210,
    '2024-04-09',
    '13:19:55.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    211,
    '2024-04-09',
    '13:34:34.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    212,
    '2024-04-09',
    '14:24:03.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    213,
    '2024-04-09',
    '14:24:15.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    214,
    '2024-04-09',
    '14:24:23.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    215,
    '2024-04-09',
    '16:47:18.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    216,
    '2024-04-09',
    '17:25:21.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    217,
    '2024-04-09',
    '17:36:51.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    218,
    '2024-04-10',
    '13:01:26.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    219,
    '2024-04-10',
    '13:01:32.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    220,
    '2024-04-10',
    '13:01:38.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    221,
    '2024-04-10',
    '13:01:59.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    222,
    '2024-04-10',
    '13:12:06.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    223,
    '2024-04-10',
    '13:21:54.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    224,
    '2024-04-10',
    '15:46:17.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    225,
    '2024-04-10',
    '15:50:13.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    226,
    '2024-04-10',
    '15:52:19.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    227,
    '2024-04-10',
    '16:27:48.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    228,
    '2024-04-10',
    '16:32:48.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    229,
    '2024-04-10',
    '16:36:24.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    230,
    '2024-04-10',
    '16:39:10.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    231,
    '2024-04-10',
    '16:41:21.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    232,
    '2024-04-10',
    '16:47:00.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    233,
    '2024-04-10',
    '16:47:26.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    234,
    '2024-04-10',
    '16:48:14.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    235,
    '2024-04-10',
    '16:48:46.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    236,
    '2024-04-10',
    '16:59:46.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    237,
    '2024-04-10',
    '17:02:57.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    238,
    '2024-04-10',
    '17:15:42.000000',
    'Treatment Producer',
    'Treatment Data Delete ',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    239,
    '2024-04-10',
    '17:22:21.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    240,
    '2024-04-10',
    '18:29:43.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    241,
    '2024-04-10',
    '19:43:50.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    242,
    '2024-04-10',
    '21:51:43.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    243,
    '2024-04-10',
    '21:58:53.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    244,
    '2024-04-10',
    '21:59:44.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    245,
    '2024-04-10',
    '22:01:01.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    246,
    '2024-04-11',
    '14:45:54.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    247,
    '2024-04-11',
    '14:46:16.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    248,
    '2024-04-11',
    '14:49:43.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    249,
    '2024-04-11',
    '16:35:23.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    250,
    '2024-04-11',
    '16:35:23.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    251,
    '2024-04-11',
    '16:44:01.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    252,
    '2024-04-11',
    '16:58:17.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    253,
    '2024-04-11',
    '16:58:17.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    254,
    '2024-04-11',
    '17:05:13.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    255,
    '2024-04-11',
    '17:06:46.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    256,
    '2024-04-11',
    '17:08:35.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    257,
    '2024-04-11',
    '17:13:29.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    258,
    '2024-04-11',
    '17:13:32.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    259,
    '2024-04-11',
    '17:13:32.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    260,
    '2024-04-11',
    '17:13:32.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    261,
    '2024-04-11',
    '17:13:33.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    262,
    '2024-04-11',
    '17:14:08.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    263,
    '2024-04-11',
    '17:14:18.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    264,
    '2024-04-11',
    '17:14:18.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    265,
    '2024-04-11',
    '17:14:20.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    266,
    '2024-04-11',
    '18:51:35.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    267,
    '2024-04-11',
    '18:52:01.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    268,
    '2024-04-11',
    '18:52:01.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    269,
    '2024-04-11',
    '18:52:36.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    270,
    '2024-04-11',
    '18:52:36.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    271,
    '2024-04-11',
    '18:53:33.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    272,
    '2024-04-11',
    '18:53:33.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    273,
    '2024-04-11',
    '18:59:17.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    274,
    '2024-04-11',
    '18:59:17.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    275,
    '2024-04-11',
    '19:04:06.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    276,
    '2024-04-11',
    '19:04:06.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    277,
    '2024-04-11',
    '19:06:01.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    278,
    '2024-04-11',
    '19:07:01.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    279,
    '2024-04-11',
    '19:11:00.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    280,
    '2024-04-11',
    '19:11:00.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    281,
    '2024-04-11',
    '19:11:49.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    282,
    '2024-04-11',
    '19:12:05.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    283,
    '2024-04-11',
    '19:12:05.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    284,
    '2024-04-11',
    '19:13:10.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    285,
    '2024-04-11',
    '19:13:10.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    286,
    '2024-04-11',
    '19:14:40.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    287,
    '2024-04-11',
    '19:14:57.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    288,
    '2024-04-11',
    '19:19:23.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    289,
    '2024-04-11',
    '19:19:23.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    290,
    '2024-04-11',
    '20:06:22.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    291,
    '2024-04-11',
    '20:07:04.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    292,
    '2024-04-11',
    '20:07:04.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    293,
    '2024-04-11',
    '20:08:15.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    294,
    '2024-04-11',
    '20:46:23.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    295,
    '2024-04-11',
    '20:46:43.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    296,
    '2024-04-11',
    '20:47:05.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    297,
    '2024-04-11',
    '20:54:55.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    298,
    '2024-04-11',
    '21:04:45.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    299,
    '2024-04-11',
    '21:05:41.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    300,
    '2024-04-11',
    '21:07:12.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    301,
    '2024-04-11',
    '21:07:59.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    302,
    '2024-04-11',
    '21:11:22.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    303,
    '2024-04-12',
    '15:40:33.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    304,
    '2024-04-12',
    '15:41:25.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    305,
    '2024-04-12',
    '15:42:13.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    306,
    '2024-04-12',
    '15:48:06.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    307,
    '2024-04-12',
    '16:11:27.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    308,
    '2024-04-12',
    '17:06:57.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    309,
    '2024-04-12',
    '17:29:10.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    310,
    '2024-04-12',
    '17:51:09.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    311,
    '2024-04-12',
    '18:21:40.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    312,
    '2024-04-12',
    '18:31:05.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    313,
    '2024-04-12',
    '18:35:30.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    314,
    '2024-04-12',
    '18:36:01.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    315,
    '2024-04-12',
    '19:27:47.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    316,
    '2024-04-13',
    '11:12:30.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    317,
    '2024-04-13',
    '11:19:46.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    318,
    '2024-04-13',
    '11:32:05.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    319,
    '2024-04-13',
    '11:34:04.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    320,
    '2024-04-13',
    '11:34:45.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    321,
    '2024-04-13',
    '11:35:58.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    322,
    '2024-04-13',
    '11:42:13.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    323,
    '2024-04-13',
    '12:49:37.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    324,
    '2024-04-13',
    '12:52:53.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    325,
    '2024-04-13',
    '12:53:35.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    326,
    '2024-04-13',
    '12:56:07.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    327,
    '2024-04-13',
    '12:58:11.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    328,
    '2024-04-13',
    '13:24:18.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    329,
    '2024-04-13',
    '16:22:56.000000',
    'Treatment Producer',
    'Treatment Data Delete ',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    330,
    '2024-04-13',
    '18:49:49.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    331,
    '2024-04-13',
    '18:50:17.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    332,
    '2024-04-13',
    '18:52:08.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    333,
    '2024-04-13',
    '18:52:37.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    334,
    '2024-04-13',
    '18:55:59.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    335,
    '2024-04-13',
    '19:06:07.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    336,
    '2024-04-13',
    '19:27:51.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    337,
    '2024-04-13',
    '19:35:04.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    338,
    '2024-04-14',
    '17:49:13.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    339,
    '2024-04-15',
    '10:34:14.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    340,
    '2024-04-15',
    '13:52:49.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    341,
    '2024-04-15',
    '13:57:22.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    342,
    '2024-04-15',
    '14:02:58.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    343,
    '2024-04-18',
    '12:36:52.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    344,
    '2024-04-18',
    '12:45:10.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    345,
    '2024-04-18',
    '12:45:33.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    346,
    '2024-04-18',
    '12:45:50.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    347,
    '2024-04-18',
    '12:46:38.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    348,
    '2024-04-18',
    '12:47:14.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    349,
    '2024-04-18',
    '12:48:15.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    350,
    '2024-04-18',
    '13:12:07.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    351,
    '2024-04-18',
    '14:33:22.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    352,
    '2024-04-18',
    '14:33:25.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    353,
    '2024-04-18',
    '14:44:25.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    354,
    '2024-04-19',
    '13:12:30.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    355,
    '2024-04-19',
    '13:12:51.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    356,
    '2024-04-19',
    '13:14:24.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    357,
    '2024-04-19',
    '13:14:50.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    358,
    '2024-04-19',
    '13:15:23.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    359,
    '2024-04-19',
    '13:15:35.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    360,
    '2024-04-19',
    '13:15:51.000000',
    'Treatment Suggest',
    'Select Treatment Plan',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    361,
    '2024-04-19',
    '13:17:33.000000',
    'Secuirty Amount',
    'Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    362,
    '2024-04-19',
    '13:23:33.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    363,
    '2024-04-19',
    '13:30:56.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    364,
    '2024-04-19',
    '13:36:28.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    365,
    '2024-04-19',
    '14:20:06.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    366,
    '2024-04-19',
    '14:20:18.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    367,
    '2024-04-19',
    '14:36:28.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    368,
    '2024-04-19',
    '14:37:37.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    369,
    '2024-04-19',
    '14:40:59.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    370,
    '2024-04-19',
    '14:46:01.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    371,
    '2024-04-19',
    '14:46:12.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    372,
    '2024-04-19',
    '14:47:12.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    373,
    '2024-04-19',
    '14:47:37.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    374,
    '2024-04-19',
    '15:03:40.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    375,
    '2024-04-19',
    '15:03:56.000000',
    'Medical Prescription',
    'Add Medicine',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    376,
    '2024-04-19',
    '15:03:58.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    377,
    '2024-04-19',
    '15:05:23.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    378,
    '2024-04-19',
    '15:05:29.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    379,
    '2024-04-19',
    '15:11:54.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    380,
    '2024-04-19',
    '15:12:15.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    381,
    '2024-04-19',
    '16:23:16.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    382,
    '2024-04-19',
    '16:33:17.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    383,
    '2024-04-19',
    '19:56:18.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    384,
    '2024-04-19',
    '20:11:23.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    385,
    '2024-04-19',
    '20:12:22.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    386,
    '2024-04-19',
    '20:25:40.000000',
    'Treatment Producer',
    'Treatment Start',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    387,
    '2024-04-19',
    '20:25:48.000000',
    'Bill Data',
    'Add Bill Data Patient Table',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    388,
    '2024-04-19',
    '21:06:24.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    389,
    '2024-04-19',
    '21:19:28.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    390,
    '2024-04-19',
    '21:20:29.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    391,
    '2024-04-19',
    '21:21:03.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    392,
    '2024-04-19',
    '21:22:40.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    393,
    '2024-04-19',
    '21:24:09.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    394,
    '2024-04-19',
    '21:27:14.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    395,
    '2024-04-20',
    '19:00:16.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    396,
    '2024-04-20',
    '19:57:07.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    397,
    '2024-04-20',
    '19:57:45.000000',
    'Examiantion',
    'Add Teeth DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    398,
    '2024-04-20',
    '19:57:59.000000',
    'Examiantion',
    'Add Teeth DentalX',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    399,
    '2024-04-20',
    '20:11:21.000000',
    'Examiantion',
    'Add Teeth Dental-X',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    400,
    '2024-04-20',
    '20:18:52.000000',
    'Treatment Suggest',
    'Select Treatment Digital Compuler zcd XRay (R.V.G.) for desease Caries',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    401,
    '2024-04-20',
    '20:21:26.000000',
    'Secuirty Amount',
    '300 Secuirty Amount Added',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    402,
    '2024-04-20',
    '20:31:53.000000',
    'Sitting Considered',
    '1 Sitting Started',
    'Madan Mahal',
    NULL
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    403,
    '2024-04-20',
    '20:45:43.000000',
    'Sitting Considered',
    '2 Sitting Started',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    404,
    '2024-04-20',
    '20:50:25.000000',
    'Security Amount Used',
    '300 security amount used',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    405,
    '2024-04-20',
    '20:59:35.000000',
    'Security Amount Used',
    '300 security amount used',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    406,
    '2024-04-20',
    '20:59:44.000000',
    'Treatment Procedure',
    'Sitting Done',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    407,
    '2024-04-20',
    '21:01:43.000000',
    'Security Amount Used',
    '300 security amount used',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    408,
    '2024-04-20',
    '21:10:53.000000',
    'Security Amount Used',
    '300 security amount used',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    409,
    '2024-04-20',
    '21:11:18.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    410,
    '2024-04-20',
    '21:13:07.000000',
    'Medical Prescription',
    'Medicine Added Successfully',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    411,
    '2024-04-20',
    '21:14:07.000000',
    'Bill Data',
    'Bill Generated for the sitting',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    412,
    '2024-04-20',
    '21:15:08.000000',
    'Sitting Considered',
    '1 Sitting Started',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    413,
    '2024-04-20',
    '21:15:19.000000',
    'Treatment Procedure',
    'Digital Compuler zcd XRay (R.V.G.) Treatment Done, TPID : 33',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    414,
    '2024-04-20',
    '21:19:37.000000',
    'Final Bill Generation',
    'Final Bill Generated for 33',
    'Madan Mahal',
    '789012'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    415,
    '2024-04-21',
    '17:15:50.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    416,
    '2024-04-21',
    '17:16:06.000000',
    'Examiantion',
    'Selected Category Dental-X',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    417,
    '2024-04-21',
    '17:16:10.000000',
    'Examiantion',
    'Selected Category Pediatric',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    418,
    '2024-04-21',
    '17:19:04.000000',
    'Examiantion',
    'Add Teeth DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    419,
    '2024-04-21',
    '17:20:47.000000',
    'Treatment Suggest',
    'Select Treatment : Digital Compuler zcd XRay (R.V.G.) for desease : Mobility',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    420,
    '2024-04-21',
    '17:21:06.000000',
    'Secuirty Amount',
    '300 Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    421,
    '2024-04-21',
    '17:23:48.000000',
    'Sitting Considered',
    '1 Sitting Started',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    422,
    '2024-04-21',
    '17:25:54.000000',
    'Security Amount Used',
    '300 security amount used',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    423,
    '2024-04-21',
    '17:26:05.000000',
    'Treatment Procedure',
    'Digital Compuler zcd XRay (R.V.G.) Treatment Done, TPID : 35',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    424,
    '2024-04-21',
    '17:27:39.000000',
    'Medical Prescription',
    'Medicine Added Successfully',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    425,
    '2024-04-21',
    '17:27:44.000000',
    'Bill Data',
    'Bill Generated for the sitting',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    426,
    '2024-04-21',
    '17:31:04.000000',
    'Final Bill Generation',
    'Final Bill Generated for TPID : 35',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    427,
    '2024-04-21',
    '19:22:03.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    428,
    '2024-04-21',
    '19:26:11.000000',
    'Examiantion',
    'Start Examintion',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    429,
    '2024-04-21',
    '19:29:36.000000',
    'Examiantion',
    'Selected Category Pediatric',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    430,
    '2024-04-21',
    '19:40:59.000000',
    'Examiantion',
    'Add Teeth Pediatric DentalX',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    431,
    '2024-04-21',
    '20:30:24.000000',
    'Treatment Suggest',
    'Select Treatment : Digital Compuler zcd XRay (R.V.G.) for desease : Mobility',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    432,
    '2024-04-21',
    '20:31:50.000000',
    'Secuirty Amount',
    '300 Secuirty Amount Added',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    433,
    '2024-04-21',
    '20:32:40.000000',
    'Examiantion',
    'Selected Category Dental-X',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    434,
    '2024-04-21',
    '20:57:47.000000',
    'Sitting Considered',
    '1 Sitting Started',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    435,
    '2024-04-22',
    '12:26:47.000000',
    'Treatment Procedure',
    'Sitting Done, TPID : 37',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    436,
    '2024-04-22',
    '12:58:51.000000',
    'Medical Prescription',
    'Medicine Added Successfully',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    437,
    '2024-04-22',
    '12:59:24.000000',
    'Bill Data',
    'Bill Generated for the sitting',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    438,
    '2024-04-24',
    '14:06:11.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    439,
    '2024-04-24',
    '14:07:52.000000',
    'Book Sitting Appointment',
    'Book Sitting Appointment',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    440,
    '2024-04-27',
    '12:35:40.000000',
    'Examiantion',
    'Selected Category Pediatric',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    441,
    '2024-04-27',
    '13:14:13.000000',
    'Examiantion',
    'Selected Category Pediatric',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    442,
    '2024-04-27',
    '13:14:20.000000',
    'Examiantion',
    'Selected Category Pediatric',
    'Madan Mahal',
    '123456'
  );
INSERT INTO
  `patient_timeline` (
    `event_id`,
    `event_date`,
    `event_time`,
    `event_type`,
    `event_description`,
    `branch_name`,
    `uhid`
  )
VALUES
  (
    443,
    '2024-04-27',
    '13:14:26.000000',
    'Examiantion',
    'Selected Category Pediatric',
    'Madan Mahal',
    '123456'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: purchase_inventory
# ------------------------------------------------------------

INSERT INTO
  `purchase_inventory` (
    `pur_id`,
    `item_name`,
    `item_category`,
    `item_mrp`,
    `item_code`,
    `HSN_code`,
    `pur_quantity`,
    `discount`,
    `total_amount`,
    `branch_name`,
    `available_stock`,
    `low_stock_threshhold`,
    `distributor_name`,
    `distributor_number`,
    `bill_receipt_doc`,
    `purchase_date`
  )
VALUES
  (
    1,
    'Disprin 325 tablet',
    'drugs',
    '200',
    '3004',
    '3004',
    10,
    '',
    '2000',
    'Madan Mahal',
    50,
    20,
    'Virumal',
    '8602161019',
    'http://localhost:7777/reciept_doc/1709191637374kd.jpg',
    '2024-02-26 10:58:25.000000'
  );
INSERT INTO
  `purchase_inventory` (
    `pur_id`,
    `item_name`,
    `item_category`,
    `item_mrp`,
    `item_code`,
    `HSN_code`,
    `pur_quantity`,
    `discount`,
    `total_amount`,
    `branch_name`,
    `available_stock`,
    `low_stock_threshhold`,
    `distributor_name`,
    `distributor_number`,
    `bill_receipt_doc`,
    `purchase_date`
  )
VALUES
  (
    2,
    'Disprin 325 tablet',
    'drugs',
    '200',
    '3004',
    '3004',
    10,
    '',
    '2000',
    'Madan Mahal',
    50,
    10,
    'Virumal',
    '8602161019',
    NULL,
    '2024-02-26 10:58:25.000000'
  );
INSERT INTO
  `purchase_inventory` (
    `pur_id`,
    `item_name`,
    `item_category`,
    `item_mrp`,
    `item_code`,
    `HSN_code`,
    `pur_quantity`,
    `discount`,
    `total_amount`,
    `branch_name`,
    `available_stock`,
    `low_stock_threshhold`,
    `distributor_name`,
    `distributor_number`,
    `bill_receipt_doc`,
    `purchase_date`
  )
VALUES
  (
    3,
    'Disprin 325 tablet',
    'true',
    '300',
    '3005',
    '3005',
    20,
    '500',
    '5500',
    'Madan Mahal',
    20,
    10,
    'Virumal',
    '8602161019',
    'http://localhost:7777/reciept_doc/1709210553720Bigbulls Course.png',
    '0000-00-00 00:00:00.000000'
  );
INSERT INTO
  `purchase_inventory` (
    `pur_id`,
    `item_name`,
    `item_category`,
    `item_mrp`,
    `item_code`,
    `HSN_code`,
    `pur_quantity`,
    `discount`,
    `total_amount`,
    `branch_name`,
    `available_stock`,
    `low_stock_threshhold`,
    `distributor_name`,
    `distributor_number`,
    `bill_receipt_doc`,
    `purchase_date`
  )
VALUES
  (
    4,
    'Disprin 350 tablet',
    'drugs',
    '200',
    '3006',
    '3006',
    20,
    '200',
    '3800',
    'Madan Mahal',
    20,
    10,
    'virumal',
    '8602161019',
    'http://localhost:7777/reciept_doc/1709191637374kd.jpg',
    '2024-02-29 11:00:00.000000'
  );
INSERT INTO
  `purchase_inventory` (
    `pur_id`,
    `item_name`,
    `item_category`,
    `item_mrp`,
    `item_code`,
    `HSN_code`,
    `pur_quantity`,
    `discount`,
    `total_amount`,
    `branch_name`,
    `available_stock`,
    `low_stock_threshhold`,
    `distributor_name`,
    `distributor_number`,
    `bill_receipt_doc`,
    `purchase_date`
  )
VALUES
  (
    8,
    'Disprin 500 tablet',
    'true',
    '500',
    '3008',
    '3008',
    48,
    '500',
    '0',
    'Madan Mahal',
    48,
    10,
    'virumal',
    '8602161019',
    'http://localhost:7777/reciept_doc/1709355700796kd.jpg',
    '2024-03-02 00:00:00.000000'
  );
INSERT INTO
  `purchase_inventory` (
    `pur_id`,
    `item_name`,
    `item_category`,
    `item_mrp`,
    `item_code`,
    `HSN_code`,
    `pur_quantity`,
    `discount`,
    `total_amount`,
    `branch_name`,
    `available_stock`,
    `low_stock_threshhold`,
    `distributor_name`,
    `distributor_number`,
    `bill_receipt_doc`,
    `purchase_date`
  )
VALUES
  (
    10,
    'xyz',
    'drugs',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'Madan Mahal',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-29 21:17:33.719618'
  );
INSERT INTO
  `purchase_inventory` (
    `pur_id`,
    `item_name`,
    `item_category`,
    `item_mrp`,
    `item_code`,
    `HSN_code`,
    `pur_quantity`,
    `discount`,
    `total_amount`,
    `branch_name`,
    `available_stock`,
    `low_stock_threshhold`,
    `distributor_name`,
    `distributor_number`,
    `bill_receipt_doc`,
    `purchase_date`
  )
VALUES
  (
    11,
    'xyzff',
    'drugs',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'Madan Mahal',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '2024-05-29 21:19:19.083273'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: security_amount
# ------------------------------------------------------------

INSERT INTO
  `security_amount` (
    `sa_id`,
    `tp_id`,
    `branch_name`,
    `date`,
    `appointment_id`,
    `uhid`,
    `patient_name`,
    `patient_number`,
    `treatment`,
    `assigned_doctor`,
    `amount`,
    `remaining_amount`,
    `used_amount`,
    `payment_status`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_date`,
    `notes`,
    `refund_amount`,
    `refund_date`,
    `received_by`,
    `refund_by`
  )
VALUES
  (
    1,
    '18',
    'Madan Mahal',
    '2024-04-12 20:08:20',
    12,
    '123456',
    'Vinay Johnson',
    '7890123456',
    '',
    'shadab',
    7500,
    -100,
    NULL,
    'success',
    'online',
    '4555465444454',
    '2024-04-12',
    NULL,
    NULL,
    NULL,
    'shadab',
    NULL
  );
INSERT INTO
  `security_amount` (
    `sa_id`,
    `tp_id`,
    `branch_name`,
    `date`,
    `appointment_id`,
    `uhid`,
    `patient_name`,
    `patient_number`,
    `treatment`,
    `assigned_doctor`,
    `amount`,
    `remaining_amount`,
    `used_amount`,
    `payment_status`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_date`,
    `notes`,
    `refund_amount`,
    `refund_date`,
    `received_by`,
    `refund_by`
  )
VALUES
  (
    2,
    '24',
    'Madan Mahal',
    '2024-04-13 12:55:52',
    26,
    '123456',
    'Vinay Johnson',
    '7890123456',
    '',
    'shadab',
    500,
    0,
    NULL,
    'success',
    'online',
    '111111',
    '2024-04-13',
    NULL,
    NULL,
    NULL,
    'shadab',
    NULL
  );
INSERT INTO
  `security_amount` (
    `sa_id`,
    `tp_id`,
    `branch_name`,
    `date`,
    `appointment_id`,
    `uhid`,
    `patient_name`,
    `patient_number`,
    `treatment`,
    `assigned_doctor`,
    `amount`,
    `remaining_amount`,
    `used_amount`,
    `payment_status`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_date`,
    `notes`,
    `refund_amount`,
    `refund_date`,
    `received_by`,
    `refund_by`
  )
VALUES
  (
    3,
    '29',
    'Madan Mahal',
    '2024-04-18 13:09:50',
    11,
    '123456',
    'Vinay Johnson',
    '7890123456',
    '',
    'shadab',
    1500,
    1230,
    NULL,
    'success',
    'cash',
    '',
    '2024-04-18',
    NULL,
    NULL,
    NULL,
    'shadab',
    NULL
  );
INSERT INTO
  `security_amount` (
    `sa_id`,
    `tp_id`,
    `branch_name`,
    `date`,
    `appointment_id`,
    `uhid`,
    `patient_name`,
    `patient_number`,
    `treatment`,
    `assigned_doctor`,
    `amount`,
    `remaining_amount`,
    `used_amount`,
    `payment_status`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_date`,
    `notes`,
    `refund_amount`,
    `refund_date`,
    `received_by`,
    `refund_by`
  )
VALUES
  (
    4,
    '30',
    'Madan Mahal',
    '2024-04-19 20:25:34',
    11,
    '123456',
    'Vinay Johnson',
    '7890123456',
    '',
    'shadab',
    6000,
    600,
    NULL,
    'success',
    'online',
    '4555465444454',
    '2024-04-19',
    NULL,
    NULL,
    NULL,
    'shadab',
    NULL
  );
INSERT INTO
  `security_amount` (
    `sa_id`,
    `tp_id`,
    `branch_name`,
    `date`,
    `appointment_id`,
    `uhid`,
    `patient_name`,
    `patient_number`,
    `treatment`,
    `assigned_doctor`,
    `amount`,
    `remaining_amount`,
    `used_amount`,
    `payment_status`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_date`,
    `notes`,
    `refund_amount`,
    `refund_date`,
    `received_by`,
    `refund_by`
  )
VALUES
  (
    5,
    '33',
    'Madan Mahal',
    '2024-04-20 21:10:53',
    2,
    '789012',
    'Mohit Doe',
    '1234567890',
    '',
    'shadab',
    300,
    0,
    NULL,
    'success',
    'online',
    '4555465444454',
    '2024-04-20',
    NULL,
    NULL,
    NULL,
    'shadab',
    NULL
  );
INSERT INTO
  `security_amount` (
    `sa_id`,
    `tp_id`,
    `branch_name`,
    `date`,
    `appointment_id`,
    `uhid`,
    `patient_name`,
    `patient_number`,
    `treatment`,
    `assigned_doctor`,
    `amount`,
    `remaining_amount`,
    `used_amount`,
    `payment_status`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_date`,
    `notes`,
    `refund_amount`,
    `refund_date`,
    `received_by`,
    `refund_by`
  )
VALUES
  (
    6,
    '35',
    'Madan Mahal',
    '2024-04-22 17:14:19',
    26,
    '123456',
    'Vinay Johnson',
    '7890123456',
    '',
    'shadab',
    300,
    0,
    NULL,
    'success',
    'online',
    '4555465444454',
    '2024-04-21',
    NULL,
    NULL,
    NULL,
    'shadab',
    NULL
  );
INSERT INTO
  `security_amount` (
    `sa_id`,
    `tp_id`,
    `branch_name`,
    `date`,
    `appointment_id`,
    `uhid`,
    `patient_name`,
    `patient_number`,
    `treatment`,
    `assigned_doctor`,
    `amount`,
    `remaining_amount`,
    `used_amount`,
    `payment_status`,
    `payment_Mode`,
    `transaction_Id`,
    `payment_date`,
    `notes`,
    `refund_amount`,
    `refund_date`,
    `received_by`,
    `refund_by`
  )
VALUES
  (
    7,
    '37',
    'Madan Mahal',
    '2024-04-21 20:31:50',
    12,
    '123456',
    'Vinay Johnson',
    '7890123456',
    '',
    'shadab',
    300,
    300,
    NULL,
    'success',
    'online',
    '4555465444454',
    '2024-04-21',
    NULL,
    NULL,
    NULL,
    'shadab',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: super_admin
# ------------------------------------------------------------

INSERT INTO
  `super_admin` (
    `sa_id`,
    `hospital_id`,
    `hospital_name`,
    `super_name`,
    `super_email`,
    `super_mobile`,
    `super_password`
  )
VALUES
  (
    1,
    'hos_1',
    'dental square',
    'mohit sahu',
    'kuldeepdoauruinfosystems@gmail.com',
    '8602161019',
    'mohit'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: test_process
# ------------------------------------------------------------

INSERT INTO
  `test_process` (`id`, `name`)
VALUES
  (1, 'Oent•lIOPA X Ray');
INSERT INTO
  `test_process` (`id`, `name`)
VALUES
  (2, 'Endodontlc Procedures');
INSERT INTO
  `test_process` (`id`, `name`)
VALUES
  (3, 'Restorative & Cosmetic Procedures');
INSERT INTO
  `test_process` (`id`, `name`)
VALUES
  (4, 'Prosthetic Procedures');
INSERT INTO
  `test_process` (`id`, `name`)
VALUES
  (5, 'Orthodentics (Br•cea) Procedures');
INSERT INTO
  `test_process` (`id`, `name`)
VALUES
  (6, 'Oral Surgery Procedures');
INSERT INTO
  `test_process` (`id`, `name`)
VALUES
  (7, 'DentalImplants Single Implant');
INSERT INTO
  `test_process` (`id`, `name`)
VALUES
  (8, 'Periodontics');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: treat_procedure_list
# ------------------------------------------------------------

INSERT INTO
  `treat_procedure_list` (`treat_procedure_id`, `treat_procedure_name`)
VALUES
  (2, 'Dental IOPA X Ray');
INSERT INTO
  `treat_procedure_list` (`treat_procedure_id`, `treat_procedure_name`)
VALUES
  (3, 'Endodontlc Procedures');
INSERT INTO
  `treat_procedure_list` (`treat_procedure_id`, `treat_procedure_name`)
VALUES
  (4, 'Restorative & Cosmetic Procedures');
INSERT INTO
  `treat_procedure_list` (`treat_procedure_id`, `treat_procedure_name`)
VALUES
  (5, 'Prosthetic Procedures');
INSERT INTO
  `treat_procedure_list` (`treat_procedure_id`, `treat_procedure_name`)
VALUES
  (6, 'Orthodentics (Braces) Procedures');
INSERT INTO
  `treat_procedure_list` (`treat_procedure_id`, `treat_procedure_name`)
VALUES
  (7, 'Oral Surgery Procedures');
INSERT INTO
  `treat_procedure_list` (`treat_procedure_id`, `treat_procedure_name`)
VALUES
  (8, 'Dental implants');
INSERT INTO
  `treat_procedure_list` (`treat_procedure_id`, `treat_procedure_name`)
VALUES
  (9, 'Periodontics');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: treat_suggest
# ------------------------------------------------------------

INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    1,
    9,
    123,
    NULL,
    'PUH123',
    'Caries',
    'Dental Cleaning',
    '1000',
    NULL,
    NULL,
    '3',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    2,
    13,
    12,
    'Madan Mahal',
    '123456',
    'Fracture',
    'Fluoride Treatments',
    '2500',
    NULL,
    NULL,
    '4',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    3,
    13,
    12,
    'Madan Mahal',
    '123456',
    'Caries',
    'Crowns (Caps)',
    '2000',
    NULL,
    NULL,
    '3',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    4,
    16,
    1,
    'Madan Mahal',
    '123456',
    'Caries',
    'Dental Cleanings',
    '1000',
    NULL,
    NULL,
    '2',
    4,
    NULL,
    NULL,
    NULL,
    'pending',
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    5,
    16,
    1,
    'Madan Mahal',
    '123456',
    'Fracture',
    'Dental Sealants',
    '2000',
    NULL,
    NULL,
    '2',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    6,
    16,
    1,
    'Madan Mahal',
    '123456',
    'Impacted',
    'Fluoride Treatments',
    '2500',
    NULL,
    NULL,
    '2',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    7,
    16,
    1,
    'Madan Mahal',
    '123456',
    'Caries',
    'Bridges',
    '4000',
    NULL,
    NULL,
    '2',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    8,
    16,
    1,
    'Madan Mahal',
    '123456',
    'Caries',
    'Periodontal Maintenance',
    '4500',
    NULL,
    NULL,
    '2',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    9,
    16,
    1,
    'Madan Mahal',
    '123456',
    'Caries',
    'Root Canal Treatment (RCT)',
    '2000',
    NULL,
    NULL,
    '2',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    11,
    18,
    12,
    'Madan Mahal',
    '123456',
    'Caries',
    'Dental Cleanings',
    '1000',
    'ongoing',
    NULL,
    '2',
    4,
    NULL,
    NULL,
    NULL,
    'ongoing',
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    12,
    18,
    12,
    'Madan Mahal',
    '123456',
    'Caries',
    'Fluoride Treatments',
    '2500',
    'pending',
    NULL,
    '2',
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    13,
    18,
    12,
    'Madan Mahal',
    '123456',
    'Caries',
    'Bridges',
    '4000',
    'pending',
    NULL,
    '2',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    14,
    24,
    26,
    'Madan Mahal',
    '123456',
    'Fracture',
    'Digital Compuler zcd XRay (R.V.G.)',
    '300',
    '',
    NULL,
    '2',
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    16,
    24,
    26,
    'Madan Mahal',
    '123456',
    'Caries',
    'Root Canal Treatment @ per tooth',
    '3000',
    'complete',
    NULL,
    '2',
    1,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    17,
    29,
    11,
    'Madan Mahal',
    '123456',
    'Missing Tooth',
    'Digital Compuler zcd XRay (R.V.G.)',
    '300',
    '',
    NULL,
    '2',
    3,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    18,
    29,
    11,
    'Madan Mahal',
    '123456',
    'Mobility',
    'Removable Partial Dentures @ per tooth',
    '800',
    'ongoing',
    NULL,
    '4',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    19,
    30,
    11,
    'Madan Mahal',
    '123456',
    'Caries',
    'Digital Compuler zcd XRay (R.V.G.)',
    '300',
    'complete',
    NULL,
    '3',
    2,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    20,
    30,
    11,
    'Madan Mahal',
    '123456',
    'Fracture',
    'Root Canal Treatment @ per tooth',
    '3000',
    'ongoing',
    NULL,
    '2',
    1,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    22,
    33,
    2,
    'Madan Mahal',
    '789012',
    'Caries',
    'Digital Compuler zcd XRay (R.V.G.)',
    '300',
    'complete',
    NULL,
    '2',
    1,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    23,
    35,
    26,
    'Madan Mahal',
    '123456',
    'Mobility',
    'Digital Compuler zcd XRay (R.V.G.)',
    '300',
    'complete',
    NULL,
    '100',
    1,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `treat_suggest` (
    `ts_id`,
    `tp_id`,
    `appoint_id`,
    `branch_name`,
    `p_uhid`,
    `desease`,
    `treatment_name`,
    `totalCost`,
    `treatment_status`,
    `consider_sitting`,
    `total_sitting`,
    `current_sitting`,
    `upcoming_sitting`,
    `appoint_date`,
    `note`,
    `current_sitting_status`,
    `upcoming_sitting_status`
  )
VALUES
  (
    24,
    37,
    12,
    'Madan Mahal',
    '123456',
    'Mobility',
    'Digital Compuler zcd XRay (R.V.G.)',
    '300',
    'ongoing',
    NULL,
    '2',
    1,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: treatment_list
# ------------------------------------------------------------

INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (5, NULL, NULL, 'OPD', '500', '0', 'OPD', 'OPD');
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    6,
    NULL,
    NULL,
    'Dental Cleanings',
    '1000',
    '1',
    'Dental Cleanings',
    'Dental Cleanings'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    7,
    NULL,
    NULL,
    'Dental Examinations',
    '1000',
    '2',
    'Dental Examinations',
    'Dental Examinations'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    8,
    NULL,
    NULL,
    'Dental Sealants',
    '2000',
    '3',
    'Dental Sealants',
    'Dental Sealants'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    9,
    NULL,
    NULL,
    'Fluoride Treatments',
    '2500',
    '3',
    'Fluoride Treatments',
    'Fluoride Treatments'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    10,
    NULL,
    NULL,
    'Crowns (Caps)',
    '2000',
    '2',
    'Crowns (Caps)',
    'Crowns (Caps)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    11,
    NULL,
    NULL,
    'Bridges',
    '4000',
    '1',
    'Bridges',
    'Bridges'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    12,
    NULL,
    NULL,
    'Dentures (Partial or Full)',
    '5000',
    '3',
    'Dentures (Partial or Full)',
    'Dentures (Partial or Full)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    13,
    NULL,
    NULL,
    'Dental Implants',
    '1200',
    '9',
    'Dental Implants',
    'Dental Implants'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    14,
    NULL,
    NULL,
    'Root Canal Treatment (RCT)',
    '2000',
    '2',
    'Root Canal Treatment (RCT)',
    'Root Canal Treatment (RCT)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    15,
    NULL,
    NULL,
    'Root Canal Retreatment (Re-Root Canal)',
    '1500',
    '2',
    'Root Canal Retreatment (Re-Root Canal)',
    'Root Canal Retreatment (Re-Root Canal)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    16,
    NULL,
    NULL,
    'Apicoectomy (Endodontic Surgery)',
    '1500',
    '2',
    'Apicoectomy (Endodontic Surgery)',
    'Apicoectomy (Endodontic Surgery)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    17,
    NULL,
    NULL,
    'Scaling and Root Planing (Deep Cleaning)',
    '1500',
    '2',
    'Scaling and Root Planing (Deep Cleaning)',
    'Scaling and Root Planing (Deep Cleaning)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    18,
    NULL,
    NULL,
    'Periodontal Maintenance',
    '4500',
    '2',
    'Periodontal Maintenance',
    'Periodontal Maintenance'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    19,
    NULL,
    NULL,
    'Gum Graft Surgery',
    '2000',
    '1',
    'Gum Graft Surgery',
    'Gum Graft Surgery'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    20,
    NULL,
    NULL,
    'Periodontal Flap Surgery',
    '1200',
    '2',
    'Periodontal Flap Surgery',
    'Periodontal Flap Surgery'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    21,
    NULL,
    NULL,
    'Teeth Whitening (Bleaching)',
    '1200',
    '3',
    'Teeth Whitening (Bleaching)',
    'Teeth Whitening (Bleaching)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    22,
    NULL,
    NULL,
    'Dental Bonding',
    '1500',
    '3',
    'Dental Bonding',
    'Dental Bonding'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    23,
    NULL,
    NULL,
    'Porcelain Veneers',
    '5422',
    '4',
    'Porcelain Veneers',
    'Porcelain Veneers'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    24,
    NULL,
    NULL,
    'Inlays and Onlays',
    '6',
    '0',
    'Inlays and Onlays',
    'Inlays and Onlays'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    25,
    NULL,
    NULL,
    'Orthodontic Treatments (Braces, Clear Aligners)',
    '700',
    '2',
    'Orthodontic Treatments (Braces, Clear Aligners)',
    'Orthodontic Treatments (Braces, Clear Aligners)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    26,
    NULL,
    NULL,
    'Tooth Extractions (Simple and Surgical)',
    '450',
    '4',
    'Tooth Extractions (Simple and Surgical)',
    'Tooth Extractions (Simple and Surgical)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    27,
    NULL,
    NULL,
    'Wisdom Tooth Extraction',
    '800',
    '2',
    'Wisdom Tooth Extraction',
    'Wisdom Tooth Extraction'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    28,
    NULL,
    NULL,
    'Dental Implant Surgery',
    '900',
    '6',
    'Dental Implant Surgery',
    'Dental Implant Surgery'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    29,
    NULL,
    NULL,
    'Jaw Surgery (Orthognathic Surgery)',
    '500',
    '0',
    'Jaw Surgery (Orthognathic Surgery)',
    'Jaw Surgery (Orthognathic Surgery)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    30,
    NULL,
    NULL,
    'Complete Dentures',
    NULL,
    NULL,
    'Complete Dentures',
    'Complete Dentures'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    31,
    NULL,
    NULL,
    'Partial Dentures',
    NULL,
    NULL,
    'Partial Dentures',
    'Partial Dentures'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    32,
    NULL,
    NULL,
    'Dental Bridges',
    NULL,
    NULL,
    'Dental Bridges',
    'Dental Bridges'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    33,
    NULL,
    NULL,
    'Dental Implant Restorations',
    NULL,
    NULL,
    'Dental Implant Restorations',
    'Dental Implant Restorations'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    34,
    NULL,
    NULL,
    'Dental Sealants',
    NULL,
    NULL,
    'Dental Sealants',
    'Dental Sealants'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    35,
    NULL,
    NULL,
    'Fluoride Treatments',
    NULL,
    NULL,
    'Fluoride Treatments',
    'Fluoride Treatments'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    36,
    NULL,
    NULL,
    'Pediatric Dental Cleanings',
    NULL,
    NULL,
    'Pediatric Dental Cleanings',
    'Pediatric Dental Cleanings'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    37,
    NULL,
    NULL,
    'Dental Fillings for Children',
    NULL,
    NULL,
    'Dental Fillings for Children',
    'Dental Fillings for Children'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    38,
    NULL,
    NULL,
    'Traditional Braces',
    NULL,
    NULL,
    'Traditional Braces',
    'Traditional Braces'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    39,
    NULL,
    NULL,
    'Clear Aligners (Invisalign, ClearCorrect)',
    NULL,
    NULL,
    'Clear Aligners (Invisalign, ClearCorrect)',
    'Clear Aligners (Invisalign, ClearCorrect)'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    40,
    NULL,
    NULL,
    'Retainers',
    NULL,
    NULL,
    'Retainers',
    'Retainers'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    41,
    NULL,
    NULL,
    'Orthodontic Appliances',
    NULL,
    NULL,
    'Orthodontic Appliances',
    'Orthodontic Appliances'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    42,
    NULL,
    NULL,
    'Treatment for Dental Trauma',
    NULL,
    NULL,
    'Treatment for Dental Trauma',
    'Treatment for Dental Trauma'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    43,
    NULL,
    NULL,
    'Emergency Tooth Extractions',
    NULL,
    NULL,
    'Emergency Tooth Extractions',
    'Emergency Tooth Extractions'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    44,
    NULL,
    NULL,
    'Pain Management',
    NULL,
    NULL,
    'Pain Management',
    'Pain Management'
  );
INSERT INTO
  `treatment_list` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    45,
    NULL,
    NULL,
    'Temporary Dental Repairs',
    NULL,
    NULL,
    'Temporary Dental Repairs',
    'Temporary Dental Repairs'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: treatment_list_copy
# ------------------------------------------------------------

INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    1,
    2,
    'Dental IOPA X Ray',
    'Digital Compuler zcd XRay (R.V.G.)',
    '300',
    NULL,
    'Digital Compuler zcd XRay (R.V.G.)',
    'Digital Compuler zcd XRay (R.V.G.)'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    2,
    3,
    'Endodontlc Procedures',
    'Root Canal Treatment @ per tooth',
    '3000',
    NULL,
    'Root Canal Treatment @ per tooth',
    'Root Canal Treatment @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    3,
    3,
    'Endodontlc Procedures',
    'Re-Root Canal Treatlment @ per tooth',
    '4000',
    NULL,
    'Re-Root Canal Treatlment @ per tooth',
    'Re-Root Canal Treatlment @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    4,
    3,
    'Endodontlc Procedures',
    'Pulpectomy (Child) @ per tooth',
    '2800',
    NULL,
    'Pulpectomy (Child) @ per tooth',
    'Pulpectomy (Child) @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    5,
    3,
    'Endodontlc Procedures',
    'Post and core @ per tooth',
    '2000',
    NULL,
    'Post and core @ per tooth',
    'Post and core @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    6,
    3,
    'Endodontlc Procedures',
    'Indirect Pulp Capping @ per tooth',
    '1500',
    NULL,
    'Indirect Pulp Capping @ per tooth',
    'Indirect Pulp Capping @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    7,
    3,
    'Endodontlc Procedures',
    'Indirect Pulp Capping with MTA @ per tooth',
    '2000',
    NULL,
    'Indirect Pulp Capping with MTA @ per tooth',
    'Indirect Pulp Capping with MTA @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    8,
    4,
    'Restorative & Cosmetic Procedures',
    'Composite Restoration @ per tooth',
    '1500',
    NULL,
    'Composite Restoration @ per tooth',
    'Composite Restoration @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    9,
    4,
    'Restorative & Cosmetic Procedures',
    'Amalgam Restoration@ per tooth',
    '800',
    NULL,
    'Amalgam Restoration@ per tooth',
    'Amalgam Restoration@ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    10,
    4,
    'Restorative & Cosmetic Procedures',
    'GIC Restoration @ per tooth',
    '600',
    NULL,
    'GIC Restoration @ per tooth',
    'GIC Restoration @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    11,
    4,
    'Restorative & Cosmetic Procedures',
    'Laminates and Veneers@ per tooth',
    '10000',
    NULL,
    'Laminates and Veneers@ per tooth',
    'Laminates and Veneers@ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    12,
    4,
    'Restorative & Cosmetic Procedures',
    'Direct Composite Veneer @ per tooth',
    '2500',
    NULL,
    'Direct Composite Veneer @ per tooth',
    'Direct Composite Veneer @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    13,
    4,
    'Restorative & Cosmetic Procedures',
    'Teeth Bleaching In Office Whitening',
    '8000',
    NULL,
    'Teeth Bleaching In Office Whitening',
    'Teeth Bleaching In Office Whitening'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    14,
    4,
    'Restorative & Cosmetic Procedures',
    'Teeth Bleaching at Home Whitening',
    '5000',
    NULL,
    'Teeth Bleaching at Home Whitening',
    'Teeth Bleaching at Home Whitening'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    15,
    4,
    'Restorative & Cosmetic Procedures',
    'Dental Jewellery (Skyce Crystal)',
    '2000',
    NULL,
    'Dental Jewellery (Skyce Crystal)',
    'Dental Jewellery (Skyce Crystal)'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    16,
    5,
    'Prosthetic Procedures',
    'Metal Free Crown Ziconia Crowns @ per Crown',
    '8000',
    NULL,
    'Metal Free Crown Ziconia Crowns @ per Crown',
    'Metal Free Crown Ziconia Crowns @ per Crown'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    17,
    5,
    'Prosthetic Procedures',
    'Porcelain Fused to Metal @ per Crown',
    '3000',
    NULL,
    'Porcelain Fused to Metal @ per Crown',
    'Porcelain Fused to Metal @ per Crown'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    18,
    5,
    'Prosthetic Procedures',
    'Metal Crowns @ Per Crown',
    '1500',
    NULL,
    'Metal Crowns @ Per Crown',
    'Metal Crowns @ Per Crown'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    19,
    5,
    'Prosthetic Procedures',
    'Metal Crowns with acrylic facing @ per Crown',
    '1800',
    NULL,
    'Metal Crowns with acrylic facing @ per Crown',
    'Metal Crowns with acrylic facing @ per Crown'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    20,
    5,
    'Prosthetic Procedures',
    'Removable Partial Dentures @ per tooth',
    '800',
    NULL,
    'Removable Partial Dentures @ per tooth',
    'Removable Partial Dentures @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    21,
    5,
    'Prosthetic Procedures',
    'Removable Full Moulh Complete Denture',
    '15000',
    NULL,
    'Removable Full Moulh Complete Denture',
    'Removable Full Moulh Complete Denture'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    22,
    5,
    'Prosthetic Procedures',
    'Crown & Bridge refix',
    '300',
    NULL,
    'Crown & Bridge refix',
    'Crown & Bridge refix'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    23,
    6,
    'Orthodentics (Braces) Procedures',
    'Metal Braces',
    '30000',
    NULL,
    'Metal Braces',
    'Metal Braces'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    24,
    6,
    'Orthodentics (Braces) Procedures',
    'Ceramic Braces',
    '45000',
    NULL,
    'Ceramic Braces',
    'Ceramic Braces'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    25,
    6,
    'Orthodentics (Braces) Procedures',
    'Lingual Braces',
    '80000',
    NULL,
    'Lingual Braces',
    'Lingual Braces'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    26,
    6,
    'Orthodentics (Braces) Procedures',
    'lnvisalign (clear or invisible braces)',
    '80000',
    NULL,
    'lnvisalign (clear or invisible braces)',
    'lnvisalign (clear or invisible braces)'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    27,
    6,
    'Orthodentics (Braces) Procedures',
    'Retention plate@ per arch',
    '2000',
    NULL,
    'Retention plate@ per arch',
    'Retention plate@ per arch'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    28,
    6,
    'Orthodentics (Braces) Procedures',
    'Self ligating metal braces',
    '55000',
    NULL,
    'Self ligating metal braces',
    'Self ligating metal braces'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    29,
    6,
    'Orthodentics (Braces) Procedures',
    'Self ligatating ceramic braces',
    '75000',
    NULL,
    'Self ligatating ceramic braces',
    'Self ligatating ceramic braces'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    30,
    6,
    'Orthodentics (Braces) Procedures',
    'Retainer (removable)',
    '3000',
    NULL,
    'Retainer (removable)',
    'Retainer (removable)'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    31,
    7,
    'Oral Surgery Procedures',
    'Extraction per tooth under LA',
    '500',
    NULL,
    'Extraction per tooth under LA',
    'Extraction per tooth under LA'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    32,
    7,
    'Oral Surgery Procedures',
    'Complicated Extraction per tooth under LA',
    '1000',
    NULL,
    'Complicated Extraction per tooth under LA',
    'Complicated Extraction per tooth under LA'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    33,
    7,
    'Oral Surgery Procedures',
    'Third Molar /Impacted Tooth Removal',
    '3000',
    NULL,
    'Third Molar /Impacted Tooth Removal',
    'Third Molar /Impacted Tooth Removal'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    34,
    7,
    'Oral Surgery Procedures',
    'Apicoectomy @ per tooth',
    '2500',
    NULL,
    'Apicoectomy @ per tooth',
    'Apicoectomy @ per tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    35,
    7,
    'Oral Surgery Procedures',
    'Minor Surgical Procedures under LA',
    '5000',
    NULL,
    'Minor Surgical Procedures under LA',
    'Minor Surgical Procedures under LA'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    36,
    7,
    'Oral Surgery Procedures',
    'Biopsy',
    '2500',
    NULL,
    'Biopsy',
    'Biopsy'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    37,
    7,
    'Oral Surgery Procedures',
    'I& D (Extra Oral)',
    '5000',
    NULL,
    'I& D (Extra Oral)',
    'I& D (Extra Oral)'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    38,
    7,
    'Oral Surgery Procedures',
    'I& D ( ntra Oral)',
    '1500',
    NULL,
    'I& D ( ntra Oral)',
    'I& D ( ntra Oral)'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    40,
    8,
    'Dental implants',
    'Single Implant',
    '25000',
    NULL,
    'Single Implant',
    'Single Implant'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    41,
    8,
    'Dental implants',
    'Full mouth Implant',
    '250000',
    NULL,
    'Full mouth Implant',
    'Full mouth Implant'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    42,
    8,
    'Dental implants',
    'Bone Grafting Procedure',
    '5000',
    NULL,
    'Bone Grafting Procedure',
    'Bone Grafting Procedure'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    43,
    9,
    'Periodontics',
    'Oral Prophylaxis (Scaling)',
    '1500',
    NULL,
    'Oral Prophylaxis (Scaling)',
    'Oral Prophylaxis (Scaling)'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    44,
    9,
    'Periodontics',
    'Gingivectomy per quadrant by scalpel',
    '3000',
    NULL,
    'Gingivectomy per quadrant by scalpel',
    'Gingivectomy per quadrant by scalpel'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    45,
    9,
    'Periodontics',
    'Flap Surgery per quadrant without bone graft',
    '6000',
    NULL,
    'Flap Surgery per quadrant without bone graft',
    'Flap Surgery per quadrant without bone graft'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    46,
    9,
    'Periodontics',
    'Bone Graft Per Tooth',
    '500',
    NULL,
    'Bone Graft Per Tooth',
    'Bone Graft Per Tooth'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    47,
    9,
    'Periodontics',
    'Operculectomy',
    '1000',
    NULL,
    'Operculectomy',
    'Operculectomy'
  );
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (49, 1, 'OPD', 'OPD', '500', NULL, 'OPD', 'OPD');
INSERT INTO
  `treatment_list_copy` (
    `treatment_id`,
    `treat_procedure_id`,
    `treat_procedure_name`,
    `treatment_name`,
    `treatment_cost`,
    `treatment_discount`,
    `value`,
    `label`
  )
VALUES
  (
    51,
    8,
    'Dental implants',
    'Sinus Lift Procedure',
    '15000',
    NULL,
    'Sinus Lift Procedure',
    'Sinus Lift Procedure'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: treatment_package
# ------------------------------------------------------------

INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    1,
    '789012',
    'Madan Mahal',
    2,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Dental-X',
    '2024-04-05 13:07:08.300880'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    2,
    '789012',
    'Madan Mahal',
    2,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Dental-X',
    '2024-04-05 13:07:46.197445'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    3,
    '789012',
    'Madan Mahal',
    2,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-05 13:07:54.481834'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    4,
    '789012',
    'Madan Mahal',
    2,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-05 13:09:24.200832'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    5,
    '789012',
    'Madan Mahal',
    2,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-05 13:09:32.487899'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    6,
    '789012',
    'Madan Mahal',
    2,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-05 16:37:58.197325'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    7,
    '123456',
    'Madan Mahal',
    1,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-06 10:31:17.100523'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    8,
    '123456',
    'Madan Mahal',
    1,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-06 15:34:44.357358'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    9,
    '123456',
    'Madan Mahal',
    1,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-06 17:10:15.217180'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    10,
    '123456',
    'Madan Mahal',
    12,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Dental-X',
    '2024-04-08 10:44:17.295053'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    11,
    '123456',
    'Madan Mahal',
    12,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-08 10:44:46.990498'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    12,
    '123456',
    'Madan Mahal',
    1,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-08 12:53:48.402754'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    13,
    '123456',
    'Madan Mahal',
    12,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-08 15:24:49.534693'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    14,
    '123456',
    'Madan Mahal',
    12,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-08 23:28:12.396266'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    15,
    '123456',
    'Madan Mahal',
    1,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-09 10:10:24.389591'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    16,
    '123456',
    'Madan Mahal',
    1,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-09 10:40:26.269021'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    17,
    '123456',
    'Madan Mahal',
    12,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-10 13:01:33.339542'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    18,
    '123456',
    'Madan Mahal',
    12,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-10 13:01:39.146973'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    19,
    '123456',
    'Madan Mahal',
    1,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-11 14:46:24.793710'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    20,
    '123456',
    'Madan Mahal',
    1,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-11 14:49:53.887764'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    21,
    '123456',
    'Madan Mahal',
    12,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-11 14:50:39.037733'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    22,
    '123456',
    'Madan Mahal',
    1,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-12 15:42:21.040148'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    23,
    '123456',
    'Madan Mahal',
    1,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-13 11:12:40.564662'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    24,
    '123456',
    'Madan Mahal',
    26,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-13 11:33:20.618341'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    25,
    '123456',
    'Madan Mahal',
    26,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-14 17:49:32.233393'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    26,
    '123456',
    'Madan Mahal',
    26,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-15 10:34:19.555884'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    27,
    '123456',
    'Madan Mahal',
    26,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Dental-X',
    '2024-04-15 13:33:21.066207'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    28,
    '123456',
    'Madan Mahal',
    26,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-18 12:36:55.577204'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    29,
    '123456',
    'Madan Mahal',
    11,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-18 12:45:13.422394'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    30,
    '123456',
    'Madan Mahal',
    11,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-19 13:12:59.739951'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    31,
    '123456',
    'Madan Mahal',
    11,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Dental-X',
    '2024-04-20 19:00:30.400952'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    32,
    '123456',
    'Madan Mahal',
    11,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-20 19:01:15.784829'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    33,
    '789012',
    'Madan Mahal',
    2,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Dental-X',
    '2024-04-20 19:57:30.764090'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    34,
    '789012',
    'Madan Mahal',
    2,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Dental-X',
    '2024-04-20 20:11:21.491502'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    35,
    '123456',
    'Madan Mahal',
    26,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Dental-X',
    '2024-04-21 17:16:06.479260'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    36,
    '123456',
    'Madan Mahal',
    26,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-21 17:16:10.460162'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    37,
    '123456',
    'Madan Mahal',
    12,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-21 19:29:36.840005'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    38,
    '123456',
    'Madan Mahal',
    12,
    0,
    'dg_4',
    'shadab',
    'completed',
    'Dental-X',
    '2024-04-21 20:32:40.290612'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    39,
    '123456',
    'Madan Mahal',
    48,
    0,
    'dg_4',
    'shadab',
    NULL,
    'Pediatric',
    '2024-04-27 12:35:40.652659'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    40,
    '123456',
    'Madan Mahal',
    48,
    0,
    'dg_4',
    'shadab',
    'ongoing',
    'Pediatric',
    '2024-04-27 13:14:13.789489'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    41,
    '123456',
    'Madan Mahal',
    48,
    0,
    'dg_4',
    'shadab',
    'ongoing',
    'Pediatric',
    '2024-04-27 13:14:20.736086'
  );
INSERT INTO
  `treatment_package` (
    `tp_id`,
    `uhid`,
    `branch_name`,
    `appointment_id`,
    `examination_id`,
    `doctor_id`,
    `doctor_name`,
    `package_status`,
    `diagnosis_category`,
    `created_at`
  )
VALUES
  (
    42,
    '123456',
    'Madan Mahal',
    48,
    0,
    'dg_4',
    'shadab',
    'ongoing',
    'Pediatric',
    '2024-04-27 13:14:26.029114'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
