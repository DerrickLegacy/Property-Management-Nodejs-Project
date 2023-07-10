-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2023 at 07:10 PM
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
-- Database: `propertymanagementdb`
--
CREATE DATABASE IF NOT EXISTS `propertymanagementdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `propertymanagementdb`;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(100) NOT NULL,
  `firstName` varchar(35) NOT NULL,
  `secondName` varchar(35) NOT NULL,
  `email` varchar(35) DEFAULT NULL,
  `dateOfBirth` date NOT NULL,
  `PASSWORD` varchar(10) NOT NULL,
  `gender` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `firstName`, `secondName`, `email`, `dateOfBirth`, `PASSWORD`, `gender`) VALUES
(1, 'Ahaabwe ', 'Derrick', 'ahaabwe@gmail.com', '2000-08-20', '12345678', 'Male'),
(4, 'Derrick', 'Legacy', 'legacy@gmail.com', '2000-08-20', '12345678', 'Male'),
(5, 'Hadijja', 'Strong', 'hadijjah@gmail.com', '2004-08-20', '12345678', 'Female'),
(12, 'Ahaabwe', 'hgt', 'ahaabwe.derrick74@students.mak.ac.u', '2023-06-15', '1234', 'Female'),
(14, 'Ahaabwe', 'Legacies', 'ahaabwederrick74@gmail.com', '2023-06-14', 'Ahaabwe@20', 'Male'),
(15, 'Sempa', 'George', 'sempa@gmail.com', '1999-01-08', 'sempa@gmai', 'Male'),
(16, 'Nankya', 'Elsa', 'nankya@gmail.com', '2002-10-16', 'nankya', 'Female'),
(19, 'Aber', 'Mercy', 'aber@gmail.com', '1998-03-13', '@aber', 'Female'),
(20, 'John', 'Bosco', 'jb@gmail.com', '1996-02-12', '@jbmail', 'Male'),
(21, 'Tukasingura', 'Mariam', 'mariam@gmail.com', '2000-03-18', 'mariam', 'Female'),
(22, 'Ssenyonjo', 'Alvin', 'alvin@gmail.com', '2001-09-04', 'alvin', 'Male'),
(24, 'Mbide', 'Miley', 'miley@gmail.com', '2001-02-16', '@miley', 'Female'),
(25, 'Derick', 'John', 'mn@gmail.com', '1999-09-19', '12345', 'Male'),
(26, 'fik', 'lee', 'fikbatran@gmail.com', '2006-02-28', 'fik001lee', 'Male'),
(27, 'Troy', 'Tom', 'tom@admin.com', '2000-08-20', '2080', 'Male'),
(28, 'Elsa', 'Kayigwa', 'elsakayigwa@gmail.com', '1999-10-16', '20el30', 'Female'),
(29, 'Hello', 'Hi', 'hello@gmail.com', '2023-08-04', '123', 'Male'),
(30, 'Man', 'Lady', 'man@gmail.com', '2023-09-20', '12345', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `deleted_property`
--

CREATE TABLE `deleted_property` (
  `propertyId` int(11) NOT NULL,
  `propertyName` varchar(255) DEFAULT NULL,
  `type` varchar(25) NOT NULL,
  `address` varchar(255) NOT NULL,
  `numberOfBeds` int(10) NOT NULL,
  `numberOfRooms` int(10) NOT NULL,
  `image` text DEFAULT NULL,
  `postDate` date NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` int(10) NOT NULL,
  `cost` int(255) NOT NULL,
  `likes` int(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT 0,
  `email` varchar(255) NOT NULL,
  `costBefore` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deleted_property`
--

INSERT INTO `deleted_property` (`propertyId`, `propertyName`, `type`, `address`, `numberOfBeds`, `numberOfRooms`, `image`, `postDate`, `city`, `state`, `zip`, `cost`, `likes`, `approved`, `email`, `costBefore`) VALUES
(23, 'Bulange apartments', 'Rental', '453th Street', 2, 9, 'IMG-20220930-WA0009.jpg', '2023-06-20', 'Masaka', 'Bukots', 673923, 12542, 0, 1, 'miley@gmail.com', 99995),
(26, 'Bulange apartments', 'Banglow', 'Wilson Street 1', 8, 6, '', '0000-00-00', 'Hoima', '', 4536752, 0, 0, 0, 'elsakayigwa@gmail.com', 0),
(27, 'Makeree', 'Banglow', '122 ttt', 23, 75, 'marry Derrick.PNG', '2023-06-23', 'Masaka', 'Abu', 87866, 600, 0, 0, 'miley@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `lease_property`
--

CREATE TABLE `lease_property` (
  `leaseId` int(10) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `lease` date DEFAULT NULL,
  `lease_start` date DEFAULT NULL,
  `lease_end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lease_property`
--

INSERT INTO `lease_property` (`leaseId`, `propertyId`, `email`, `lease`, `lease_start`, `lease_end`) VALUES
(4, 24, 'miley@gmail.com', NULL, '2022-08-09', NULL),
(5, 15, 'ahaabwe@gmail.com', NULL, NULL, NULL),
(6, 24, 'miley@gmail.com', NULL, NULL, NULL),
(7, 25, 'miley@gmail.com', NULL, NULL, NULL),
(8, 30, 'miley@gmail.com', NULL, NULL, NULL),
(9, 30, 'miley@gmail.com', NULL, NULL, NULL),
(10, 30, 'miley@gmail.com', NULL, NULL, NULL),
(11, 15, 'ahaabwe@gmail.com', NULL, NULL, NULL),
(12, 31, 'miley@gmail.com', NULL, NULL, NULL),
(13, 32, 'legacy@gmail.com', NULL, NULL, NULL),
(14, 32, 'legacy@gmail.com', NULL, NULL, NULL),
(15, 33, 'legacy@gmail.com', NULL, NULL, NULL),
(16, 24, 'miley@gmail.com', NULL, NULL, NULL),
(17, 24, 'miley@gmail.com', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `membership`
--

CREATE TABLE `membership` (
  `membership_id` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL DEFAULT 'Free',
  `date_start` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `propertytable`
--

CREATE TABLE `propertytable` (
  `propertyId` int(11) NOT NULL,
  `propertyName` varchar(255) DEFAULT NULL,
  `type` varchar(25) NOT NULL,
  `address` varchar(255) NOT NULL,
  `numberOfBeds` int(10) NOT NULL,
  `numberOfRooms` int(10) NOT NULL,
  `image` text DEFAULT NULL,
  `postDate` date NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` int(10) NOT NULL,
  `cost` int(255) NOT NULL,
  `likes` int(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT 0,
  `email` varchar(255) NOT NULL,
  `costBefore` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `propertytable`
--

INSERT INTO `propertytable` (`propertyId`, `propertyName`, `type`, `address`, `numberOfBeds`, `numberOfRooms`, `image`, `postDate`, `city`, `state`, `zip`, `cost`, `likes`, `approved`, `email`, `costBefore`) VALUES
(24, 'Maganjo Appartments', 'Rental', '763 Belgrade', 4, 7, 'istockphoto-1165384568-612x612.jpg', '2023-06-23', 'Hoima', 'Belgrade', 7554, 245, 0, 1, 'miley@gmail.com', 0),
(31, 'Matuge By-Pass', 'Banglow', 'Matuga Road', 2, 3, '6a198dde3c34378e4c966c07c13029c2', '2023-06-23', 'Fort Portal', 'Bwera', 53453, 1200, 0, 1, 'miley@gmail.com', 1300),
(32, 'Mary  Stuart', 'Rental', '8tou', 2, 2, 'f744d4383f30e0dcbd39b99d9dbe559e', '2023-06-12', 'Masaka', 'Yobu', 673923, 120, 0, 1, 'legacy@gmail.com', 130),
(33, 'Muyenga Apartments', 'Banglow', '763 Belgrade', 5, 3, '2be1b6cdfbd222d9ca4b6aabc0f30a2c', '2021-03-03', 'Masaka', 'Belgrade', 34253, 123, 0, 1, 'legacy@gmail.com', 234),
(35, 'Bukoto A Flats', 'Banglow', '564th Street', 2, 3, 'fa38dc25137787ca1303838089f0dbde', '2024-08-29', 'Masaka', 'Bwera', 345, 170, 0, 1, 'legacy@gmail.com', 200),
(36, 'Crane Building', 'Banglow', 'Crane Street', 5, 7, '0f3bc2798e2dd127c886dfc6d61582b4', '2023-05-23', 'Masaka', 'Belgrade', 988765, 194, 0, 1, 'miley@gmail.com', 245),
(37, 'Mackay\'s Park', 'Residential', 'Park Street', 2, 7, '02a2b086a3eaf6059325bf1f332e88ff', '2023-02-01', 'Hoima', 'Bukots', 673923, 1499, 0, 1, 'miley@gmail.com', 2345),
(38, 'Entebbe Residential Suites', 'Banglow', 'Entebbe Highway', 5, 7, '708541756cfbb41923dfd61e19a67c54', '2023-06-20', 'Kampala', 'Entebbe', 98656, 700, 0, 1, 'alvin@gmail.com', 780);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `deleted_property`
--
ALTER TABLE `deleted_property`
  ADD UNIQUE KEY `propertyId` (`propertyId`);

--
-- Indexes for table `lease_property`
--
ALTER TABLE `lease_property`
  ADD PRIMARY KEY (`leaseId`);

--
-- Indexes for table `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`membership_id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `propertytable`
--
ALTER TABLE `propertytable`
  ADD PRIMARY KEY (`propertyId`),
  ADD UNIQUE KEY `propertyName` (`propertyName`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `lease_property`
--
ALTER TABLE `lease_property`
  MODIFY `leaseId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `membership`
--
ALTER TABLE `membership`
  MODIFY `membership_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `propertytable`
--
ALTER TABLE `propertytable`
  MODIFY `propertyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `membership`
--
ALTER TABLE `membership`
  ADD CONSTRAINT `membership_ibfk_1` FOREIGN KEY (`email`) REFERENCES `customer` (`email`);

--
-- Constraints for table `propertytable`
--
ALTER TABLE `propertytable`
  ADD CONSTRAINT `propertytable_ibfk_1` FOREIGN KEY (`email`) REFERENCES `customer` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
