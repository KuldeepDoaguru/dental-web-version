-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2024 at 03:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dental_guru`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appoint_id` int(255) NOT NULL,
  `patient_uhid` varchar(255) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `assigned_doctor_name` varchar(255) DEFAULT NULL,
  `assigned_doctor_id` varchar(50) NOT NULL,
  `appointment_dateTime` varchar(255) NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
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
  `cancel_reason` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appoint_id`, `patient_uhid`, `branch_name`, `assigned_doctor_name`, `assigned_doctor_id`, `appointment_dateTime`, `notes`, `treatment_provided`, `appointment_created_by`, `appointment_created_by_emp_id`, `appointment_updated_by`, `appointment_updated_by_emp_id`, `appointment_status`, `opd_amount`, `payment_Mode`, `transaction_Id`, `payment_Status`, `cancel_reason`, `created_at`, `updated_at`) VALUES
(185, 'DH_15', 'Madan Mahal', 'shadab', 'dg_4', '2024-03-18T10:15', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-18 12:47:24', '2024-03-18 16:24:25'),
(186, 'DH_15', 'Madan Mahal', 'umer', 'dg_1', '2024-03-18T10:30', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-18 12:51:29', '2024-03-18 12:51:29'),
(188, 'DH_15', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-20T10:00', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Cancel', '500', 'cash', '', 'paid', 'some', '2024-03-18 14:25:28', '2024-03-20 07:07:55'),
(189, 'DH_15', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T10:00', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Check-In', '500', 'cash', '', 'paid', NULL, '2024-03-18 14:27:55', '2024-03-18 15:45:31'),
(190, 'DH_15', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T10:00', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Check-In', '500', 'cash', '', 'paid', NULL, '2024-03-18 14:28:25', '2024-03-21 15:45:24'),
(191, 'DH_15', 'Madan Mahal', 'shadab', 'dg_4', '2024-03-21T10:00', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Check-In', '500', 'cash', '', 'paid', NULL, '2024-03-18 14:31:07', '2024-03-21 15:45:41'),
(192, 'DH_15', 'Madan Mahal', 'umer', 'dg_1', '2024-03-22T10:30', '', 'Dental Cleanings', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-18 14:31:51', '2024-03-21 13:25:11'),
(193, 'DH_5', 'Madan Mahal', 'umer', 'dg_1', '2024-03-23T10:45', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-18 15:37:33', '2024-03-18 15:37:33'),
(194, 'DH_16', 'Madan Mahal', 'umer', 'dg_1', '2024-03-22T10:45', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Appoint', NULL, NULL, NULL, NULL, NULL, '2024-03-18 15:52:26', '2024-03-18 16:01:19'),
(195, 'DH_16', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T10:45', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Check-In', '500', 'online', '6465656565', 'paid', NULL, '2024-03-18 15:57:04', '2024-03-18 15:59:25'),
(196, 'DH_1', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T10:15', 'no', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Cancel', '500', 'cash', '', 'Refund', 'none', '2024-03-19 05:26:42', '2024-03-21 15:58:21'),
(197, 'DH_16', 'Madan Mahal', 'umer', 'dg_1', '2024-03-19T10:30', 'no', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-19 06:13:15', '2024-03-19 06:13:15'),
(198, 'DH_16', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-19T10:15', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '300', 'online', '565656565', 'paid', NULL, '2024-03-19 06:15:32', '2024-03-19 06:15:32'),
(199, 'DH_17', 'Madan Mahal', 'shadab', 'dg_4', '2024-03-19T10:00', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', NULL, NULL, NULL, NULL, NULL, '2024-03-19 06:56:51', '2024-03-19 06:56:51'),
(200, 'DH_18', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-19T15:00', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Cancel', '300', 'online', '656565665', 'paid', 'none', '2024-03-19 07:06:29', '2024-03-19 07:08:09'),
(201, 'DH_19', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-19T15:15', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Check-In', '300', 'online', '656565665', 'paid', NULL, '2024-03-19 07:08:14', '2024-03-20 07:20:00'),
(202, 'DH_20', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-19T10:30', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-19 07:29:22', '2024-03-19 07:29:22'),
(203, 'DH_15', 'Madan Mahal', 'shadab', 'dg_4', '2024-03-20T17:30', '', 'Dental Cleanings', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Check-In', '500', '', '', '', NULL, '2024-03-19 07:30:41', '2024-03-20 07:17:18'),
(204, 'DH_15', 'Madan Mahal', 'umer', 'dg_1', '2024-03-19T18:15', 'no', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-19 07:37:50', '2024-03-19 07:37:50'),
(205, 'DH_15', 'Madan Mahal', 'umer', 'dg_1', '2024-03-19T17:15', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '300', 'cash', '', 'paid', NULL, '2024-03-19 07:39:20', '2024-03-19 07:39:20'),
(206, 'DH_7', 'Madan Mahal', 'umer', 'dg_1', '2024-03-22T10:15', 'no', 'Dental Cleanings', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Appoint', '0', '', '', '', NULL, '2024-03-19 09:06:14', '2024-03-22 13:33:04'),
(207, 'DH_7', 'Madan Mahal', 'umer', 'dg_1', '2024-03-22T11:00', 'no', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-19 09:06:36', '2024-03-19 09:06:36'),
(208, 'DH_16', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T11:15', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-19 09:11:41', '2024-03-19 09:11:41'),
(209, 'DH_16', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T11:30', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-19 09:17:04', '2024-03-19 09:17:04'),
(210, 'DH_16', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-26T10:15', '', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', 'cash', '', 'paid', NULL, '2024-03-19 09:17:59', '2024-03-19 09:17:59'),
(211, 'DH_16', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-26T10:45', 'no', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-19 09:18:13', '2024-03-19 09:18:13'),
(212, 'DH_21', 'Madan Mahal', 'umer', 'dg_1', '2024-03-19T15:45', 'no', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-19 09:27:03', '2024-03-19 09:27:03'),
(213, 'DH_22', 'Madan Mahal', 'umer', 'dg_1', '2024-03-19T16:00', 'no', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-19 09:28:16', '2024-03-19 09:28:16'),
(214, 'DH_10', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-19T14:00', '', 'Dental Cleanings', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Check-In', '0', '', '', '', NULL, '2024-03-19 10:21:14', '2024-03-20 07:21:24'),
(215, 'DH_1', 'Madan Mahal', 'shadab', 'dg_4', '2024-03-20T10:00', '', 'Dental Cleanings', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Cancel', '0', '', '', '', 'sfa', '2024-03-19 12:33:12', '2024-03-20 07:13:51'),
(216, 'DH_10', 'Madan Mahal', 'shadab', 'dg_4', '2024-03-20T10:15', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Check-In', '1000', 'cash', '', 'paid', NULL, '2024-03-19 12:34:39', '2024-03-20 07:17:23'),
(217, 'DH_23', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T11:00', '', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-19 12:46:18', '2024-03-19 12:46:18'),
(218, 'DH_24', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-20T10:00', 'no', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-20 11:44:18', '2024-03-20 11:44:18'),
(219, 'DH_25', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T15:15', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-20 15:24:59', '2024-03-20 15:24:59'),
(220, 'DH_10', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-21T10:00', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '200', 'cash', '', 'paid', NULL, '2024-03-21 06:19:00', '2024-03-21 06:19:00'),
(221, 'DH_6', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T10:30', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-21 06:33:15', '2024-03-21 06:33:15'),
(222, 'DH_16', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T12:30', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-21 06:58:04', '2024-03-21 06:58:04'),
(223, 'DH_20', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-21T18:45', 'no', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Cancel', '500', 'cash', '', 'Refund', 'none', '2024-03-21 07:04:40', '2024-03-21 12:34:16'),
(224, 'DH_15', 'Madan Mahal', 'umer', 'dg_1', '2024-03-22T16:00', 'no', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Cancel', '500', 'cash', '', 'Refund', 'none', '2024-03-21 11:23:01', '2024-03-22 09:05:13'),
(225, 'DH_10', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T18:15', 'no', 'Dental Examinations', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-21 13:40:39', '2024-03-21 13:40:39'),
(226, 'DH_12', 'Madan Mahal', 'umer', 'dg_1', '2024-03-21T19:45', 'ok', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-21 15:50:27', '2024-03-21 15:50:27'),
(227, 'DH_26', 'Madan Mahal', 'umer', 'dg_1', '2024-03-22T11:15', '', 'OPD', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Check-In', '500', 'cash', '', 'paid', NULL, '2024-03-22 10:56:37', '2024-03-22 13:24:48'),
(228, 'DH_27', 'Madan Mahal', 'umer', 'dg_1', '2024-03-23T14:15', 'no', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 10:59:45', '2024-03-22 10:59:45'),
(229, 'DH_28', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-22T10:45', '', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 11:02:49', '2024-03-22 11:02:49'),
(230, 'DH_29', 'Madan Mahal', 'umer', 'dg_1', '2024-03-22T15:00', 'no', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 11:07:55', '2024-03-22 11:07:55'),
(231, 'DH_30', 'Madan Mahal', 'umer', 'dg_1', '2024-03-22T14:45', 'no', 'Dental Cleanings', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Cancel', '0', '', '', 'Refund', 'no', '2024-03-22 12:38:53', '2024-03-22 13:25:29'),
(232, 'DH_31', 'Madan Mahal', 'shadab', 'dg_4', '2024-03-22T10:45', 'no', 'Dentures (Partial or Full)', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Cancel', '0', '', '', 'Refund', 'no', '2024-03-22 12:47:02', '2024-03-22 13:33:26'),
(233, 'DH_32', 'Madan Mahal', 'shadab', 'dg_4', '2024-03-22T11:00', 'no', 'Dental Cleanings', 'shadab', 'dg_4', 'shadab', 'dg_4', 'Cancel', '0', '', '', 'Refund', 'no', '2024-03-22 12:48:12', '2024-03-22 13:35:06'),
(234, 'DH_33', 'Madan Mahal', 'shadab', 'dg_4', '2024-03-22T18:15', 'no', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 12:55:16', '2024-03-22 12:55:16'),
(235, 'DH_34', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-22T18:30', '', 'OPD', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '500', 'cash', '', 'paid', NULL, '2024-03-22 12:56:33', '2024-03-22 12:56:33'),
(236, 'DH_33', 'Madan Mahal', 'umer', 'dg_1', '2024-03-23T10:15', 'no', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 12:58:06', '2024-03-22 12:58:06'),
(237, 'DH_1', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-22T10:30', 'no', 'Dental Examinations', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 12:59:23', '2024-03-22 12:59:23'),
(238, 'DH_33', 'Madan Mahal', 'umer', 'dg_1', '2024-03-25T10:30', 'no', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 13:01:39', '2024-03-22 13:01:39'),
(239, 'DH_1', 'Madan Mahal', 'umer', 'dg_1', '2024-03-26T10:45', 'some note', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 13:11:39', '2024-03-22 13:11:39'),
(240, 'DH_9', 'Madan Mahal', 'shubham', 'dg_2', '2024-03-23T11:00', 'no', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 13:18:57', '2024-03-22 13:18:57'),
(241, 'DH_10', 'Madan Mahal', 'shadab', 'dg_4', '2024-03-22T18:45', 'no', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 13:22:52', '2024-03-22 13:22:52'),
(242, 'DH_1', 'Madan Mahal', 'umer', 'dg_1', '2024-03-23T11:00', '', 'Dental Cleanings', 'shadab', 'dg_4', NULL, NULL, 'Appoint', '0', '', '', '', NULL, '2024-03-22 13:57:20', '2024-03-22 13:57:20');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `branch_id` int(255) NOT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `hospital_id` varchar(255) DEFAULT NULL,
  `branch_address` varchar(255) DEFAULT NULL,
  `branch_contact` varchar(255) DEFAULT NULL,
  `open_time` time(6) DEFAULT NULL,
  `close_time` time(6) DEFAULT NULL,
  `appoint_slot_duration` varchar(100) DEFAULT NULL,
  `week_off` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`branch_id`, `branch_name`, `hospital_name`, `hospital_id`, `branch_address`, `branch_contact`, `open_time`, `close_time`, `appoint_slot_duration`, `week_off`) VALUES
(1, 'Madan Mahal', 'dental square', 'hos_1', 'Madan Mahal', '8602161019', '10:00:00.786000', '20:00:00.887000', '15 min', 'sunday'),
(2, 'Vijay Nagar', 'dental square', 'hos_1', 'Vijay Nagar', '8602161018', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_attendance`
--

CREATE TABLE `employee_attendance` (
  `attendance_id` int(255) NOT NULL,
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
  `availability` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_attendance`
--

INSERT INTO `employee_attendance` (`attendance_id`, `employee_ID`, `emp_name`, `branch`, `employee_designation`, `date`, `morning_shift_login_time`, `morning_shift_logout_time`, `evening_shift_login_time`, `evening_shift_logout_time`, `allday_shift_login_time`, `allday_shift_logout_time`, `availability`) VALUES
(1, 'dg_1', 'umer', 'Madan Mahal', 'doctor', '2024-02-24 14:00:00.000000', NULL, NULL, NULL, NULL, '09:30:58.408000', '18:30:58.407000', 'yes'),
(2, 'dg_2', 'shubham', 'Madan Mahal', 'doctor', '2024-02-24 14:00:00.000000', NULL, NULL, NULL, NULL, '09:30:58.408000', '18:30:58.407000', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `employee_complaints`
--

CREATE TABLE `employee_complaints` (
  `complain_id` int(255) NOT NULL,
  `emp_id` varchar(255) DEFAULT NULL,
  `employee_name` varchar(255) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `complain` varchar(255) DEFAULT NULL,
  `rec_on` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `solved_on` datetime(6) DEFAULT NULL,
  `pending_since` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_complaints`
--

INSERT INTO `employee_complaints` (`complain_id`, `emp_id`, `employee_name`, `branch_name`, `complain`, `rec_on`, `status`, `solved_on`, `pending_since`) VALUES
(1, 'dg_1', 'umer', 'Madan Mahal', 'I want more salary', '2024-02-27 13:00:00.000000', 'Pending', NULL, NULL),
(2, 'dg_2', 'shubham', 'Vijay Nagar', 'I want more salary', '2024-02-27 11:00:00.000000', 'Pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_leave`
--

CREATE TABLE `employee_leave` (
  `id` int(11) NOT NULL,
  `employee_ID` varchar(11) NOT NULL,
  `leave_dates` varchar(1000) NOT NULL,
  `leave_reason` varchar(1000) DEFAULT NULL,
  `leave_status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_leave`
--

INSERT INTO `employee_leave` (`id`, `employee_ID`, `leave_dates`, `leave_reason`, `leave_status`) VALUES
(2, 'dg_4', '2024-02-24,2024-02-25,2024-02-26,2024-02-25,2024-03-26,2024-02-25,2024-04-27', 'medical issue', 'Approved'),
(3, 'dg_7', '2024-02-24 ', 'none', 'Approved'),
(4, 'dg_4', '2024-03-15', 'no', 'Approved'),
(5, 'dg_3', '2024-03-09,2024-03-10', 'other', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `employee_register`
--

CREATE TABLE `employee_register` (
  `sr_id` int(255) NOT NULL,
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
  `employee_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_register`
--

INSERT INTO `employee_register` (`sr_id`, `employee_ID`, `branch_name`, `employee_name`, `employee_mobile`, `employee_email`, `gender`, `employee_designation`, `employee_password`, `employee_role`, `salary`, `address`, `employee_status`, `morning_shift_start_time`, `morning_shift_end_time`, `evening_shift_start_time`, `evening_shift_end_time`, `allday_shift_start_time`, `allday_shift_end_time`, `working_days`, `availability`, `employee_picture`) VALUES
(1, 'dg_1', 'Madan Mahal', 'umer', '8602161019', 'umer@gmail.com', 'male', 'doctor', '$2b$10$7oAX2F11um8RtXe4dwHHDu4WYSxg1RgrnqVqFG9zPLpXD0Tm2cM1O', 'receptionist,doctor,consultant,lab attendant,admin', '30000', 'Ranjhi, Jabalpur', 'Approved', '10:00:00.000000', '14:00:00.000000', '18:00:00.000000', '21:00:00.000000', '10:30:00.000000', '19:00:41.475000', 'mon-fri', 'yes', 'http://localhost:7777/empProfilePicture/1709360553977Bigbulls Course.png'),
(2, 'dg_2', 'Madan Mahal', 'shubham', '8602161019', 'vikram@gmail.com', 'male', 'doctor', '$2b$10$pyFDTpDQf7WWxs8FIE0YLuBT6n0ZzBBeLFPohm3qwEvbTRV2rUvgG', 'admin,receptionist,doctor', '50000', 'Madan Mahal, Jabalpur', 'Approved', '09:00:00.755000', '15:00:00.289000', '18:00:00.000000', '22:00:00.762000', '10:30:41.769000', '19:00:41.118000', 'mon-fri', 'yes', 'http://localhost:7777/empProfilePicture/1709303771914bb3.png'),
(4, 'dg_3', 'Madan Mahal', 'Vinay singh', '8602161019', 'vinay@gmail.com', 'Male', 'doctor', 'vinay', 'doctor', '50000', 'jabalpur', 'Pending', '00:00:00.000000', '00:00:00.000000', '00:00:00.000000', '00:00:00.000000', '00:00:00.000000', '00:00:00.000000', NULL, 'yes', 'http://localhost:7777/empProfilePicture/1709278594627chaitanya img.jpg'),
(5, 'dg_4', 'Madan Mahal', 'shadab', '8602161019', 'shadab@gmail.com', 'male', 'receptionist', '$2b$10$2YcG82plPpSPv81SRIrRieTjV161MNFVdqXtcq2THlrW9ROBqYC1e', 'receptionist,doctor', '50000', 'Jabalpur', 'Approved', '00:00:00.000000', '00:00:00.000000', '00:00:00.000000', '00:00:00.000000', '10:00:00.000000', '19:00:00.000000', NULL, 'yes', 'http://localhost:7777/empProfilePicture/1709288479773kd.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `holiday_id` int(100) NOT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `holiday_name` varchar(255) DEFAULT NULL,
  `holiday_date` date DEFAULT NULL,
  `holiday_start_time` time(6) DEFAULT NULL,
  `holiday_end_time` time(6) DEFAULT NULL,
  `notes` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`holiday_id`, `branch_name`, `holiday_name`, `holiday_date`, `holiday_start_time`, `holiday_end_time`, `notes`) VALUES
(2, 'Madan Mahal', 'holi', '2024-03-07', '10:00:00.000000', '19:00:00.000000', 'leave'),
(3, 'Madan Mahal', 'diwali', '2024-03-08', '11:00:00.374000', '19:00:00.000000', 'leave test'),
(4, 'Madan Mahal', 'eid', '2024-03-09', '00:00:00.000000', NULL, 'leave test');

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `age` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `doctorId` varchar(11) DEFAULT NULL,
  `doctorName` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inquiries`
--

INSERT INTO `inquiries` (`id`, `branch`, `patient_name`, `mobile`, `email`, `gender`, `age`, `address`, `notes`, `doctorId`, `doctorName`, `created_at`, `updated_at`) VALUES
(4, NULL, '', '', '', '', '', '', '', 'dg_1', 'umer', '2024-03-16 16:11:12.866', '2024-03-16 10:41:12'),
(5, NULL, '', '', '', '', '', '', '', 'dg_1', 'umer', '2024-03-16 16:11:59.165', '2024-03-16 10:41:59'),
(6, NULL, '', '', '', '', '', '', '', 'dg_1', 'umer', '2024-03-16 16:12:46.500', '2024-03-16 10:42:46'),
(9, NULL, 'rahul', '8966446565', '', 'Male', '', '', 'dsdsd', '', '', '2024-03-16 16:49:44.028', '2024-03-16 11:19:44'),
(10, NULL, 'shubham', '9816565466', '', 'Male', '30', 'any', 'no', 'dg_4', 'shadab', '2024-03-16 16:52:08.041', '2024-03-16 11:22:08'),
(12, 'Madan Mahal', 'ravi', '4686378644', '', 'Male', '', '', 'no', 'dg_2', 'shubham', '2024-03-16 16:53:51.905', '2024-03-22 13:52:33'),
(13, 'Madan Mahal', 'ajay', '8745545584', '', 'Male', '', '', 'some note', 'dg_4', 'shadab', '2024-03-16 17:02:58.685', '2024-03-16 11:32:58'),
(14, 'Madan Mahal', 'raju', '9798989898', '', 'Male', '', '', 'no', '', '', '2024-03-16 17:05:04.736', '2024-03-22 13:50:49');

-- --------------------------------------------------------

--
-- Table structure for table `lab_details`
--

CREATE TABLE `lab_details` (
  `lab_id` int(255) NOT NULL,
  `lab_name` varchar(255) DEFAULT NULL,
  `lab_type` varchar(255) DEFAULT NULL,
  `lab_contact` varchar(255) DEFAULT NULL,
  `lab_email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `bill` varchar(255) DEFAULT NULL,
  `due_date` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `opd_details`
--

CREATE TABLE `opd_details` (
  `id` int(11) NOT NULL,
  `appoint_id` varchar(255) DEFAULT NULL,
  `patient_uhid` varchar(255) DEFAULT NULL,
  `opd_amount` varchar(50) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `opd_created_by` timestamp NULL DEFAULT NULL,
  `opd_created_by_emp_id` int(11) DEFAULT NULL,
  `opd_updated_by` int(11) DEFAULT NULL,
  `opd_updated_by_emp_id` int(11) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otpcollections`
--

CREATE TABLE `otpcollections` (
  `otp_id` int(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `code` int(10) DEFAULT NULL,
  `expiresIn` int(20) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otpcollections`
--

INSERT INTO `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`) VALUES
(1, 'kuldeepdoauruinfosystems@gmail.com', 587935, NULL, '2024-02-21 13:03:23.431863'),
(2, 'kuldeepdoauruinfosystems@gmail.com', 851667, NULL, '2024-02-21 13:42:17.013360'),
(3, 'kuldeepdoauruinfosystems@gmail.com', 855544, NULL, '2024-02-22 06:48:46.753943'),
(4, 'kuldeepdoauruinfosystems@gmail.com', 394582, NULL, '2024-02-22 07:24:40.811092'),
(5, 'kuldeepdoauruinfosystems@gmail.com', 348952, NULL, '2024-02-22 07:35:16.163797'),
(6, 'kuldeepdoauruinfosystems@gmail.com', 233311, NULL, '2024-02-22 07:36:19.224783'),
(7, 'kuldeepdoauruinfosystems@gmail.com', 754852, NULL, '2024-02-22 07:37:53.012550'),
(8, 'kuldeepdoauruinfosystems@gmail.com', 801791, NULL, '2024-02-22 07:44:34.381103'),
(9, 'kuldeepdoauruinfosystems@gmail.com', 300465, NULL, '2024-02-23 05:52:51.242543'),
(10, 'kuldeepdoauruinfosystems@gmail.com', 698273, NULL, '2024-02-23 11:48:20.380124'),
(11, 'kuldeepdoauruinfosystems@gmail.com', 283679, NULL, '2024-02-24 06:04:02.935165'),
(12, 'kuldeepdoauruinfosystems@gmail.com', 848649, NULL, '2024-02-26 04:55:56.361254'),
(13, 'kuldeepdoauruinfosystems@gmail.com', 458135, NULL, '2024-02-26 11:41:17.510872'),
(14, 'kuldeepdoauruinfosystems@gmail.com', 937824, NULL, '2024-02-27 05:48:34.079116'),
(15, 'kuldeepdoauruinfosystems@gmail.com', 497447, NULL, '2024-02-28 05:56:40.878943'),
(16, 'kuldeepdoauruinfosystems@gmail.com', 211604, NULL, '2024-02-29 06:03:46.392221'),
(17, 'kuldeepdoauruinfosystems@gmail.com', 662478, NULL, '2024-03-01 05:42:15.580562'),
(18, 'kuldeepdoauruinfosystems@gmail.com', 136910, NULL, '2024-03-02 04:53:32.367120'),
(19, 'kuldeepdoauruinfosystems@gmail.com', 143300, NULL, '2024-03-02 06:11:17.213533');

-- --------------------------------------------------------

--
-- Table structure for table `patient_bills`
--

CREATE TABLE `patient_bills` (
  `bill_id` int(255) NOT NULL,
  `bill_date` datetime(6) DEFAULT NULL,
  `uhid` varchar(255) DEFAULT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `patient_mobile` varchar(255) DEFAULT NULL,
  `patient_email` varchar(255) DEFAULT NULL,
  `treatment` varchar(255) DEFAULT NULL,
  `treatment_status` varchar(255) DEFAULT NULL,
  `drugs_quantity` int(255) DEFAULT NULL,
  `total_amount` int(255) DEFAULT NULL,
  `paid_amount` int(255) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `payment_date_time` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_bills`
--

INSERT INTO `patient_bills` (`bill_id`, `bill_date`, `uhid`, `branch_name`, `patient_name`, `patient_mobile`, `patient_email`, `treatment`, `treatment_status`, `drugs_quantity`, `total_amount`, `paid_amount`, `payment_status`, `payment_date_time`) VALUES
(1, '2024-02-28 16:39:32.603663', 'DH0001', 'Vijay Nagar', 'satyam singh', '8602161019', 'satyam@gmail.com', 'Dental Cleanings', 'Pending', 10, 1200, 0, '', '0000-00-00 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `patient_details`
--

CREATE TABLE `patient_details` (
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_details`
--

INSERT INTO `patient_details` (`uhid`, `branch_name`, `initialid`, `patient_name`, `dob`, `age`, `weight`, `gender`, `maritalstatus`, `bloodgroup`, `mobileno`, `alternatecontactno`, `emailid`, `contact_person`, `contact_person_name`, `allergy`, `disease`, `isstaff`, `staffempid`, `staffrelationid`, `isforeign`, `isvip`, `fathername`, `husbandname`, `mothername`, `address`, `pincode`, `patient_type`, `aadhaar_no`, `patient_added_by`, `patient_updated_by`, `patient_added_by_emp_id`, `patient_updated_by_emp_id`, `created_at`, `updated_at`) VALUES
('DH_1', 'Madan Mahal', NULL, 'mohit sahu', '2020-06-10', '3', '65', 'Male', NULL, 'A+', '9806324244', NULL, 'mohitsahu1993@gmail.com', 'Self', 'self', 'no', 'No Disease,Cardiovascular,Arthritis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'golbazar jabalpur', NULL, 'CGHS(Pensioner)', '655555556656', 'shadab', 'shadab', 'dg_4', 'dg_4', '2024-03-10 09:09:42', '2024-03-22 13:44:50'),
('DH_10', 'Madan Mahal', NULL, 'rishi', '2024-03-13', '65', '65', 'Male', NULL, 'A+', '7887989675', NULL, '', 'Self', 'self', 'no', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'address', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-13 08:49:00', '2024-03-13 08:49:00'),
('DH_11', 'Madan Mahal', NULL, 'rishi', '', '65', '65', 'Male', NULL, 'B+', '7887989625', NULL, '', 'Self', 'self', 'no', 'Diabetes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sdsdsd', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-13 08:55:53', '2024-03-13 08:55:53'),
('DH_12', 'Madan Mahal', NULL, 'shubham soni', '2024-03-13', '56', '60', 'Male', NULL, 'A+', '7878787889', NULL, '', 'Self', 'self', 'no', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ssdfsd', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-13 09:04:50', '2024-03-13 09:04:50'),
('DH_13', 'Madan Mahal', NULL, 'dev', '', 'self', '60', 'Male', NULL, 'A+', '4587632145', NULL, '', 'Self', 'self', 'no', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sdsd', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-13 09:16:19', '2024-03-13 09:16:19'),
('DH_14', 'Madan Mahal', NULL, 'dev', '', 'self', '60', 'Male', NULL, 'A+', '4587632185', NULL, '', 'Self', 'self', 'no', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sdsd', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-13 09:17:12', '2024-03-13 09:17:12'),
('DH_15', 'Madan Mahal', NULL, 'MOHIT sen', '', '45', '65', 'Male', NULL, 'A+', '6548966239', NULL, '', 'Self', 'self', 'no', 'Diabetes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'write town', NULL, 'CGHS(Serving)', '', 'shadab', 'shadab', 'dg_4', 'dg_4', '2024-03-15 10:09:15', '2024-03-20 14:34:00'),
('DH_16', 'Madan Mahal', NULL, 'rahul', '', '25', '65', 'Male', NULL, 'A+', '9806656565', NULL, '', 'Self', 'self', '', 'Diabetes,Asthma,itgereh,tg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'write town', NULL, 'CGHS(Serving)', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-18 15:52:26', '2024-03-18 15:52:26'),
('DH_17', 'Madan Mahal', NULL, 'umer', '2024-03-19', '26', '56', 'Male', NULL, 'A+', '9898989898', NULL, '', 'Self', 'self', '', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-19 06:56:51', '2024-03-19 06:56:51'),
('DH_18', 'Madan Mahal', NULL, 'umer', '', '26', '60', 'Male', NULL, 'B+', '8965796546', NULL, '', 'Self', 'self', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'CGHS(Serving)', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-19 07:06:29', '2024-03-19 07:06:29'),
('DH_19', 'Madan Mahal', NULL, 'umer', '', '26', '60', 'Male', NULL, 'B+', '8965796549', NULL, '', 'Self', 'self', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'CGHS(Serving)', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-19 07:08:14', '2024-03-19 07:08:14'),
('DH_2', 'Madan Mahal', NULL, 'dev ansh', '2021-02-10', '3', '65', 'Male', NULL, 'A+', '9806324245', NULL, 'dev@gmail.com', 'Self', 'self', 'no', 'Diabetes,Heart', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'golbazar', NULL, 'CGHS(Serving)', '', 'shadab', 'shadab', 'dg_4', 'dg_4', '2024-03-10 09:12:41', '2024-03-11 10:39:56'),
('DH_20', 'Madan Mahal', NULL, 'aamir', '', '56', '56', 'Male', NULL, 'A+', '5656565665', NULL, '', 'Self', 'self', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'somewhere', NULL, 'CGHS(Serving)', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-19 07:29:22', '2024-03-19 07:29:22'),
('DH_21', 'Madan Mahal', NULL, 'anuj', '', '25', '45', 'Male', NULL, '', '8989989898', NULL, '', 'Self', 'self', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'somewhere', NULL, 'CGHS(Serving)', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-19 09:27:03', '2024-03-19 09:27:03'),
('DH_22', 'Madan Mahal', NULL, 'anuj', '', '25', '45', 'Male', NULL, '', '8989989899', NULL, '', 'Self', 'self', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'somewhere', NULL, 'CGHS(Serving)', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-19 09:28:16', '2024-03-19 09:28:16'),
('DH_23', 'Madan Mahal', NULL, 'pavan', '', '56', '58', 'Male', NULL, '', '9898656699', NULL, '', 'Self', 'self', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'CGHS(Serving)', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-19 12:46:18', '2024-03-19 12:46:18'),
('DH_24', 'Madan Mahal', NULL, 'ravi', '2020-05-21', '3', '56', 'Male', NULL, '', '9865665665', NULL, '', 'Father', 'rishi', '', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-20 11:44:18', '2024-03-20 11:44:18'),
('DH_25', 'Madan Mahal', NULL, 'raju', '', '45', '60', 'Male', NULL, 'A+', '4554987461', NULL, '', 'Self', 'self', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-20 15:24:59', '2024-03-20 15:24:59'),
('DH_26', 'Madan Mahal', NULL, 'shubham soni', '2024-03-21', '56', '89', 'Male', NULL, 'B+', '4654986546', NULL, 's@gmail.com', 'Self', 'self', 'yes', 'No Disease,Heart,Cardiovascular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'CGHS(Serving)', '89895679649', 'shadab', NULL, 'dg_4', NULL, '2024-03-22 10:56:37', '2024-03-22 10:56:37'),
('DH_27', 'Madan Mahal', NULL, 'brajesh', '2024-03-22', '56', '89', 'Male', NULL, 'A+', '5968465646', NULL, 'a@gmail.com', 'Self', 'self', 'no', 'No Disease,Cardiovascular,Asthma', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'Genral', '8956959464949', 'shadab', NULL, 'dg_4', NULL, '2024-03-22 10:59:45', '2024-03-22 10:59:45'),
('DH_28', 'Madan Mahal', NULL, 'brajesh2', '', '45', '89', 'Male', NULL, '', '8798165498', NULL, '', 'Father', 'father', 'no', 'Diabetes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'somewhere', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-22 11:02:49', '2024-03-22 11:02:49'),
('DH_29', 'Madan Mahal', NULL, 'brajesh3', '2024-03-22', '98', '89', 'Male', NULL, '', '8798466498', NULL, 'b@gmail.com', 'Self', 'self', 'no', 'No Disease,Heart', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'CGHS(Serving)', '98989898989', 'shadab', NULL, 'dg_4', NULL, '2024-03-22 11:07:55', '2024-03-22 11:07:55'),
('DH_3', 'Madan Mahal', NULL, 'shubham soni', '2023-06-10', '2', '65', 'Male', NULL, 'A+', '7878787878', NULL, '', 'Self', 'self', 'no', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'write town', NULL, 'Genral', '353535354353543', 'shadab', 'shadab', 'dg_4', 'dg_4', '2024-03-10 10:35:25', '2024-03-11 07:56:22'),
('DH_30', 'Madan Mahal', NULL, 'dev 1', '2024-03-07', '56', '89', 'Male', NULL, 'A+', '9856544695', NULL, 'm@gmail.com', 'Self', 'self', 'no', 'No Disease,Cardiovascular,Heart', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'address', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-22 12:38:53', '2024-03-22 12:38:53'),
('DH_31', 'Madan Mahal', NULL, 'dev 1', '2024-03-14', '56', '65', 'Male', NULL, 'O+', '4565876159', NULL, '', 'Self', 'self', 'no', 'No Disease,Heart', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'aaaaa', NULL, 'CSMA', '5498465789465', 'shadab', NULL, 'dg_4', NULL, '2024-03-22 12:47:02', '2024-03-22 12:47:02'),
('DH_32', 'Madan Mahal', NULL, 'dev3', '2024-03-21', '23', '65', 'Male', NULL, 'O+', '4654985646', NULL, 'aaaaa@gmail.com', 'Mother', 'mummy', 'no', 'Diabetes,Cardiovascular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'asdfgh', NULL, 'CGHS(Serving)', '4654654654564', 'shadab', NULL, 'dg_4', NULL, '2024-03-22 12:48:12', '2024-03-22 12:48:12'),
('DH_33', 'Madan Mahal', NULL, 'raju', '2024-03-23', '89', '60', 'Male', NULL, '', '6456986546', NULL, 'm@gmail.com', 'Father', 'father', 'no', 'Diabetes,Cardiovascular,Asthma', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'address', NULL, 'Genral', '98987986549898', 'shadab', NULL, 'dg_4', NULL, '2024-03-22 12:55:16', '2024-03-22 12:55:16'),
('DH_34', 'Madan Mahal', NULL, 'raju 2', '', '89', '65', 'Male', NULL, '', '8986264654', NULL, 'raju@gmail.com', 'Mother', 'mother', 'yes', 'Diabetes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'adress', NULL, 'CGHS(Pensioner)', '65498465498465489', 'shadab', NULL, 'dg_4', NULL, '2024-03-22 12:56:33', '2024-03-22 12:56:33'),
('DH_4', 'vijay nagar', NULL, 'rahul', '2021-02-11', '3', '50', 'Other', NULL, 'B+', '4545454545', NULL, 'r@gmail.com', 'Father', 'name', 'no', 'Diabetes,Asthma', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'write', NULL, 'CGHS(Serving)', '65656565656', 'shadab', 'shadab', 'dg_4', 'dg_4', '2024-03-11 06:26:42', '2024-03-11 10:24:21'),
('DH_5', 'Madan Mahal', NULL, 'mohit', '2024-03-12', '30', '65', 'Male', NULL, 'B+', '5666565656', NULL, '', 'Self', 'self', 'no', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'golbazar', NULL, 'Genral', '655555556656', 'shadab', NULL, 'dg_4', NULL, '2024-03-12 06:06:48', '2024-03-12 06:06:48'),
('DH_6', 'Madan Mahal', NULL, 'mohit sahu', '2024-03-13', '23', '60', 'Male', NULL, 'A+', '2323232323', NULL, 'mohitsahu1993@gmail.com', 'Self', 'Mohit Sahu', 'no', 'Diabetes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'dfsdfsd', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-12 07:17:19', '2024-03-12 07:17:19'),
('DH_7', 'Madan Mahal', NULL, 'rahul singh', '', '28', '65', 'Male', NULL, 'A+', '5326644664', NULL, 'rahul@gmail.com', 'Self', 'self', 'no', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'Genral', '655555556656', 'shadab', NULL, 'dg_4', NULL, '2024-03-13 07:49:49', '2024-03-13 07:49:49'),
('DH_8', 'Madan Mahal', NULL, 'rahul singh', '', '28', '65', 'Male', NULL, 'A+', '5326644678', NULL, 'rahul@gmail.com', 'Self', 'self', 'no', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'jabalpur', NULL, 'Genral', '655555556656', 'shadab', NULL, 'dg_4', NULL, '2024-03-13 07:56:21', '2024-03-13 07:56:21'),
('DH_9', 'Madan Mahal', NULL, 'rishi', '2024-03-13', '65', '65', 'Male', NULL, 'A+', '7887989646', NULL, '', 'Self', 'self', 'no', 'No Disease', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'address', NULL, 'Genral', '', 'shadab', NULL, 'dg_4', NULL, '2024-03-13 08:48:23', '2024-03-13 08:48:23');

-- --------------------------------------------------------

--
-- Table structure for table `patient_disease`
--

CREATE TABLE `patient_disease` (
  `id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_disease`
--

INSERT INTO `patient_disease` (`id`, `value`, `label`) VALUES
(1, 'No Disease', 'No Disease'),
(2, 'Diabetes', 'Diabetes'),
(3, 'Heart', 'Heart'),
(4, 'Cardiovascular', 'Cardiovascular'),
(5, 'Asthma', 'Asthma'),
(6, 'Arthritis', 'Arthritis'),
(7, 'Osteoporosis', 'Osteoporosis'),
(8, 'Thyroid', 'Thyroid'),
(9, 'Kidney', 'Kidney'),
(10, 'Liver', 'Liver'),
(11, 'Gastrointestinal', 'Gastrointestinal'),
(12, 'Cancer', 'Cancer'),
(13, 'Depression', 'Depression'),
(14, 'Anxiety', 'Anxiety'),
(15, 'Alzheimer\'s', 'Alzheimer\'s'),
(16, 'HIV', 'HIV'),
(17, 'Hepatitis', 'Hepatitis');

-- --------------------------------------------------------

--
-- Table structure for table `patient_timeline`
--

CREATE TABLE `patient_timeline` (
  `event_id` int(100) NOT NULL,
  `event_date` date DEFAULT current_timestamp(),
  `event_time` time(6) DEFAULT current_timestamp(),
  `event_type` varchar(100) DEFAULT NULL,
  `event_description` varchar(100) DEFAULT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `uhid` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_timeline`
--

INSERT INTO `patient_timeline` (`event_id`, `event_date`, `event_time`, `event_type`, `event_description`, `branch_name`, `uhid`) VALUES
(1, '2024-03-04', '14:44:23.000000', 'appointment', 'apointment scheduled', 'Madan Mahal', 'DH0001'),
(2, '2024-03-04', '15:00:23.000000', 'appointment', 'apointment scheduled', 'Madan Mahal', 'DH0001'),
(3, '2024-03-04', '15:03:58.000000', 'appointment', 'apointment scheduled', 'Madan Mahal', 'DH0001'),
(4, '2024-03-04', '15:05:56.000000', 'appointment', 'apointment scheduled', 'Madan Mahal', 'DH0001'),
(5, '2024-03-12', '15:13:24.000000', 'appointment', 'apointment scheduled', 'Madan Mahal', '103'),
(6, '2024-03-19', '18:03:13.000000', 'Appointment', 'Apointment scheduled', 'Madan Mahal', 'DH_1'),
(7, '2024-03-19', '18:04:40.000000', 'Appointment', 'Apointment scheduled', 'Madan Mahal', 'DH_10'),
(8, '2024-03-19', '18:16:19.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_23'),
(9, '2024-03-19', '18:39:25.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_19'),
(10, '2024-03-20', '12:01:57.000000', 'Patient Profile', 'Patient Profile Updated', 'Madan Mahal', 'DH_1'),
(11, '2024-03-20', '12:34:51.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_15'),
(12, '2024-03-20', '12:37:55.000000', 'Appointment', 'Appointment Cancel', 'Madan Mahal', 'DH_15'),
(13, '2024-03-20', '12:43:51.000000', 'Appointment', 'Appointment Cancel', 'Madan Mahal', 'DH_1'),
(14, '2024-03-20', '12:50:00.000000', 'Appointment', 'Patient Check-In', 'Madan Mahal', NULL),
(15, '2024-03-20', '12:51:24.000000', 'Appointment', 'Patient Check-In', 'Madan Mahal', 'DH_10'),
(16, '2024-03-20', '12:55:29.000000', 'Patient Profile', 'Patient Profile Updated', 'Madan Mahal', 'DH_1'),
(17, '2024-03-20', '17:14:20.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_24'),
(18, '2024-03-20', '20:04:01.000000', 'Patient Profile', 'Patient Profile Updated', 'Madan Mahal', 'DH_15'),
(19, '2024-03-20', '20:55:00.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_25'),
(20, '2024-03-21', '11:49:02.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_10'),
(21, '2024-03-21', '12:03:16.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_6'),
(22, '2024-03-21', '12:28:05.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_16'),
(23, '2024-03-21', '12:34:42.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_20'),
(24, '2024-03-21', '16:53:02.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_15'),
(25, '2024-03-21', '17:34:11.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_15'),
(26, '2024-03-21', '17:37:17.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_15'),
(27, '2024-03-21', '17:44:49.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_20'),
(28, '2024-03-21', '17:52:10.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_23'),
(29, '2024-03-21', '17:56:33.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_15'),
(30, '2024-03-21', '18:00:22.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_15'),
(31, '2024-03-21', '18:01:17.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_20'),
(32, '2024-03-21', '18:02:21.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_20'),
(33, '2024-03-21', '18:04:18.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_20'),
(34, '2024-03-21', '18:55:12.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_15'),
(35, '2024-03-21', '19:10:40.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_10'),
(36, '2024-03-21', '21:15:24.000000', 'Appointment', 'Patient Check-In', 'Madan Mahal', 'DH_15'),
(37, '2024-03-21', '21:15:41.000000', 'Appointment', 'Patient Check-In', 'Madan Mahal', 'DH_15'),
(38, '2024-03-21', '21:20:29.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_12'),
(39, '2024-03-21', '21:28:23.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_1'),
(40, '2024-03-22', '14:35:15.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_15'),
(41, '2024-03-22', '16:26:38.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_26'),
(42, '2024-03-22', '16:29:47.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_27'),
(43, '2024-03-22', '16:32:50.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_28'),
(44, '2024-03-22', '16:37:56.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_29'),
(45, '2024-03-22', '18:08:54.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_30'),
(46, '2024-03-22', '18:17:03.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_31'),
(47, '2024-03-22', '18:18:13.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_32'),
(48, '2024-03-22', '18:25:17.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_33'),
(49, '2024-03-22', '18:26:34.000000', 'Add Patient', 'Add Patient and Appointment scheduled', 'Madan Mahal', 'DH_34'),
(50, '2024-03-22', '18:28:07.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_33'),
(51, '2024-03-22', '18:29:24.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_1'),
(52, '2024-03-22', '18:31:40.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_33'),
(53, '2024-03-22', '18:41:40.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_1'),
(54, '2024-03-22', '18:48:59.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_9'),
(55, '2024-03-22', '18:52:53.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_10'),
(56, '2024-03-22', '18:53:52.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_31'),
(57, '2024-03-22', '18:54:38.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_31'),
(58, '2024-03-22', '18:54:48.000000', 'Appointment', 'Patient Check-In', 'Madan Mahal', 'DH_26'),
(59, '2024-03-22', '18:55:10.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_32'),
(60, '2024-03-22', '18:55:27.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_30'),
(61, '2024-03-22', '18:55:31.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_30'),
(62, '2024-03-22', '18:56:13.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_7'),
(63, '2024-03-22', '18:58:26.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_7'),
(64, '2024-03-22', '18:58:43.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_7'),
(65, '2024-03-22', '19:01:12.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_7'),
(66, '2024-03-22', '19:02:44.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_7'),
(67, '2024-03-22', '19:03:04.000000', 'Edit Appointment', 'Edit Appointment', 'Madan Mahal', 'DH_7'),
(68, '2024-03-22', '19:03:27.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_31'),
(69, '2024-03-22', '19:05:06.000000', 'Cancel Appointment', 'Cancel Appointment', 'Madan Mahal', 'DH_32'),
(70, '2024-03-22', '19:13:57.000000', 'Patient Profile', 'Patient Profile Updated', 'Madan Mahal', 'DH_1'),
(71, '2024-03-22', '19:14:05.000000', 'Patient Profile', 'Patient Profile Updated', 'Madan Mahal', 'DH_1'),
(72, '2024-03-22', '19:14:50.000000', 'Patient Profile', 'Patient Profile Updated', 'Madan Mahal', 'DH_1'),
(73, '2024-03-22', '19:27:20.000000', 'Appointment', 'Appointment scheduled', 'Madan Mahal', 'DH_1');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_inventory`
--

CREATE TABLE `purchase_inventory` (
  `pur_id` int(255) NOT NULL,
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
  `purchase_date` datetime(6) DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_inventory`
--

INSERT INTO `purchase_inventory` (`pur_id`, `item_name`, `item_category`, `item_mrp`, `item_code`, `HSN_code`, `pur_quantity`, `discount`, `total_amount`, `branch_name`, `available_stock`, `low_stock_threshhold`, `distributor_name`, `distributor_number`, `bill_receipt_doc`, `purchase_date`) VALUES
(1, 'Disprin 325 tablet', 'drugs', '200', '3004', '3004', 10, '', '2000', 'Madan Mahal', 50, 20, 'Virumal', '8602161019', 'http://localhost:7777/reciept_doc/1709191637374kd.jpg', '2024-02-26 10:58:25.000000'),
(2, 'Disprin 325 tablet', 'drugs', '200', '3004', '3004', 10, '', '2000', 'Madan Mahal', 50, 10, 'Virumal', '8602161019', NULL, '2024-02-26 10:58:25.000000'),
(3, 'Disprin 325 tablet', 'true', '300', '3005', '3005', 20, '500', '5500', 'Madan Mahal', 20, 10, 'Virumal', '8602161019', 'http://localhost:7777/reciept_doc/1709210553720Bigbulls Course.png', '0000-00-00 00:00:00.000000'),
(4, 'Disprin 350 tablet', 'drugs', '200', '3006', '3006', 20, '200', '3800', 'Madan Mahal', 20, 10, 'virumal', '8602161019', 'http://localhost:7777/reciept_doc/1709191637374kd.jpg', '2024-02-29 11:00:00.000000'),
(8, 'Disprin 500 tablet', 'true', '500', '3008', '3008', 48, '500', '0', 'Madan Mahal', 48, 10, 'virumal', '8602161019', 'http://localhost:7777/reciept_doc/1709355700796kd.jpg', '2024-03-02 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `security_amount`
--

CREATE TABLE `security_amount` (
  `sa_id` int(100) NOT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `appointment_id` int(100) DEFAULT NULL,
  `uhid` varchar(100) DEFAULT NULL,
  `patient_name` varchar(100) DEFAULT NULL,
  `patient_number` varchar(100) DEFAULT NULL,
  `assigned_doctor` varchar(100) DEFAULT NULL,
  `amount` int(100) DEFAULT NULL,
  `payment_status` varchar(100) DEFAULT NULL,
  `refund_amount` int(100) DEFAULT NULL,
  `refund_date` datetime(6) DEFAULT NULL,
  `received_by` varchar(100) DEFAULT NULL,
  `refund_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `security_amount`
--

INSERT INTO `security_amount` (`sa_id`, `branch_name`, `date`, `appointment_id`, `uhid`, `patient_name`, `patient_number`, `assigned_doctor`, `amount`, `payment_status`, `refund_amount`, `refund_date`, `received_by`, `refund_by`) VALUES
(1, 'Madan Mahal', '2024-03-22 10:15:00.000000', 185, 'DH_15', 'mohit', '8602161019', 'shadab', 5000, 'success', 0, '0000-00-00 00:00:00.000000', 'shadab', '');

-- --------------------------------------------------------

--
-- Table structure for table `super_admin`
--

CREATE TABLE `super_admin` (
  `sa_id` int(255) NOT NULL,
  `hospital_id` varchar(255) DEFAULT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `super_name` varchar(255) DEFAULT NULL,
  `super_email` varchar(255) DEFAULT NULL,
  `super_mobile` varchar(255) DEFAULT NULL,
  `super_password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `super_admin`
--

INSERT INTO `super_admin` (`sa_id`, `hospital_id`, `hospital_name`, `super_name`, `super_email`, `super_mobile`, `super_password`) VALUES
(1, 'hos_1', 'dental square', 'mohit sahu', 'kuldeepdoauruinfosystems@gmail.com', '8602161019', 'mohit');

-- --------------------------------------------------------

--
-- Table structure for table `treatment_list`
--

CREATE TABLE `treatment_list` (
  `treatment_id` int(255) NOT NULL,
  `treatment_name` varchar(1000) DEFAULT NULL,
  `treatment_cost` varchar(255) DEFAULT NULL,
  `treatment_discount` varchar(255) DEFAULT NULL,
  `value` varchar(1000) NOT NULL,
  `label` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treatment_list`
--

INSERT INTO `treatment_list` (`treatment_id`, `treatment_name`, `treatment_cost`, `treatment_discount`, `value`, `label`) VALUES
(5, 'OPD', '500', '200', 'OPD', 'OPD'),
(6, 'Dental Cleanings', '1000', '100', 'Dental Cleanings', 'Dental Cleanings'),
(7, 'Dental Examinations', '1000', '100', 'Dental Examinations', 'Dental Examinations'),
(8, 'Dental Sealants', '2000', '200', 'Dental Sealants', 'Dental Sealants'),
(9, 'Fluoride Treatments', '2500', '200', 'Fluoride Treatments', 'Fluoride Treatments'),
(10, 'Crowns (Caps)', '2000', '200', 'Crowns (Caps)', 'Crowns (Caps)'),
(11, 'Bridges', '4000', '100', 'Bridges', 'Bridges'),
(12, 'Dentures (Partial or Full)', '5000', '100', 'Dentures (Partial or Full)', 'Dentures (Partial or Full)'),
(13, 'Dental Implants', '1200', '120', 'Dental Implants', 'Dental Implants'),
(14, 'Root Canal Treatment (RCT)', '2000', '200', 'Root Canal Treatment (RCT)', 'Root Canal Treatment (RCT)'),
(15, 'Root Canal Retreatment (Re-Root Canal)', '1500', '200', 'Root Canal Retreatment (Re-Root Canal)', 'Root Canal Retreatment (Re-Root Canal)'),
(16, 'Apicoectomy (Endodontic Surgery)', '1500', '200', 'Apicoectomy (Endodontic Surgery)', 'Apicoectomy (Endodontic Surgery)'),
(17, 'Scaling and Root Planing (Deep Cleaning)', '1500', '200', 'Scaling and Root Planing (Deep Cleaning)', 'Scaling and Root Planing (Deep Cleaning)'),
(18, 'Periodontal Maintenance', '4500', '200', 'Periodontal Maintenance', 'Periodontal Maintenance'),
(19, 'Gum Graft Surgery', '2000', '100', 'Gum Graft Surgery', 'Gum Graft Surgery'),
(20, 'Periodontal Flap Surgery', '1200', '200', 'Periodontal Flap Surgery', 'Periodontal Flap Surgery'),
(21, 'Teeth Whitening (Bleaching)', '1200', '300', 'Teeth Whitening (Bleaching)', 'Teeth Whitening (Bleaching)'),
(22, 'Dental Bonding', '1500', '300', 'Dental Bonding', 'Dental Bonding'),
(23, 'Porcelain Veneers', '5422', '4500', 'Porcelain Veneers', 'Porcelain Veneers'),
(24, 'Inlays and Onlays', NULL, NULL, 'Inlays and Onlays', 'Inlays and Onlays'),
(25, 'Orthodontic Treatments (Braces, Clear Aligners)', NULL, NULL, 'Orthodontic Treatments (Braces, Clear Aligners)', 'Orthodontic Treatments (Braces, Clear Aligners)'),
(26, 'Tooth Extractions (Simple and Surgical)', NULL, NULL, 'Tooth Extractions (Simple and Surgical)', 'Tooth Extractions (Simple and Surgical)'),
(27, 'Wisdom Tooth Extraction', NULL, NULL, 'Wisdom Tooth Extraction', 'Wisdom Tooth Extraction'),
(28, 'Dental Implant Surgery', NULL, NULL, 'Dental Implant Surgery', 'Dental Implant Surgery'),
(29, 'Jaw Surgery (Orthognathic Surgery)', NULL, NULL, 'Jaw Surgery (Orthognathic Surgery)', 'Jaw Surgery (Orthognathic Surgery)'),
(30, 'Complete Dentures', NULL, NULL, 'Complete Dentures', 'Complete Dentures'),
(31, 'Partial Dentures', NULL, NULL, 'Partial Dentures', 'Partial Dentures'),
(32, 'Dental Bridges', NULL, NULL, 'Dental Bridges', 'Dental Bridges'),
(33, 'Dental Implant Restorations', NULL, NULL, 'Dental Implant Restorations', 'Dental Implant Restorations'),
(34, 'Dental Sealants', NULL, NULL, 'Dental Sealants', 'Dental Sealants'),
(35, 'Fluoride Treatments', NULL, NULL, 'Fluoride Treatments', 'Fluoride Treatments'),
(36, 'Pediatric Dental Cleanings', NULL, NULL, 'Pediatric Dental Cleanings', 'Pediatric Dental Cleanings'),
(37, 'Dental Fillings for Children', NULL, NULL, 'Dental Fillings for Children', 'Dental Fillings for Children'),
(38, 'Traditional Braces', NULL, NULL, 'Traditional Braces', 'Traditional Braces'),
(39, 'Clear Aligners (Invisalign, ClearCorrect)', NULL, NULL, 'Clear Aligners (Invisalign, ClearCorrect)', 'Clear Aligners (Invisalign, ClearCorrect)'),
(40, 'Retainers', NULL, NULL, 'Retainers', 'Retainers'),
(41, 'Orthodontic Appliances', NULL, NULL, 'Orthodontic Appliances', 'Orthodontic Appliances'),
(42, 'Treatment for Dental Trauma', NULL, NULL, 'Treatment for Dental Trauma', 'Treatment for Dental Trauma'),
(43, 'Emergency Tooth Extractions', NULL, NULL, 'Emergency Tooth Extractions', 'Emergency Tooth Extractions'),
(44, 'Pain Management', NULL, NULL, 'Pain Management', 'Pain Management'),
(45, 'Temporary Dental Repairs', NULL, NULL, 'Temporary Dental Repairs', 'Temporary Dental Repairs');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appoint_id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branch_id`);

--
-- Indexes for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `employee_complaints`
--
ALTER TABLE `employee_complaints`
  ADD PRIMARY KEY (`complain_id`);

--
-- Indexes for table `employee_leave`
--
ALTER TABLE `employee_leave`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_register`
--
ALTER TABLE `employee_register`
  ADD PRIMARY KEY (`sr_id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`holiday_id`);

--
-- Indexes for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lab_details`
--
ALTER TABLE `lab_details`
  ADD PRIMARY KEY (`lab_id`);

--
-- Indexes for table `opd_details`
--
ALTER TABLE `opd_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otpcollections`
--
ALTER TABLE `otpcollections`
  ADD PRIMARY KEY (`otp_id`);

--
-- Indexes for table `patient_bills`
--
ALTER TABLE `patient_bills`
  ADD PRIMARY KEY (`bill_id`);

--
-- Indexes for table `patient_details`
--
ALTER TABLE `patient_details`
  ADD PRIMARY KEY (`uhid`);

--
-- Indexes for table `patient_disease`
--
ALTER TABLE `patient_disease`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_timeline`
--
ALTER TABLE `patient_timeline`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `purchase_inventory`
--
ALTER TABLE `purchase_inventory`
  ADD PRIMARY KEY (`pur_id`);

--
-- Indexes for table `security_amount`
--
ALTER TABLE `security_amount`
  ADD PRIMARY KEY (`sa_id`);

--
-- Indexes for table `super_admin`
--
ALTER TABLE `super_admin`
  ADD PRIMARY KEY (`sa_id`);

--
-- Indexes for table `treatment_list`
--
ALTER TABLE `treatment_list`
  ADD PRIMARY KEY (`treatment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appoint_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `branch_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  MODIFY `attendance_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee_complaints`
--
ALTER TABLE `employee_complaints`
  MODIFY `complain_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee_leave`
--
ALTER TABLE `employee_leave`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employee_register`
--
ALTER TABLE `employee_register`
  MODIFY `sr_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `holiday_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inquiries`
--
ALTER TABLE `inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `lab_details`
--
ALTER TABLE `lab_details`
  MODIFY `lab_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `opd_details`
--
ALTER TABLE `opd_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otpcollections`
--
ALTER TABLE `otpcollections`
  MODIFY `otp_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `patient_bills`
--
ALTER TABLE `patient_bills`
  MODIFY `bill_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `patient_disease`
--
ALTER TABLE `patient_disease`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `patient_timeline`
--
ALTER TABLE `patient_timeline`
  MODIFY `event_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `purchase_inventory`
--
ALTER TABLE `purchase_inventory`
  MODIFY `pur_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `security_amount`
--
ALTER TABLE `security_amount`
  MODIFY `sa_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `super_admin`
--
ALTER TABLE `super_admin`
  MODIFY `sa_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `treatment_list`
--
ALTER TABLE `treatment_list`
  MODIFY `treatment_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
