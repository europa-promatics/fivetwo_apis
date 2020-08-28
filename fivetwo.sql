-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 28, 2020 at 01:09 PM
-- Server version: 5.7.31-0ubuntu0.16.04.1
-- PHP Version: 7.2.33-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fivetwo`
--

-- --------------------------------------------------------

--
-- Table structure for table `broker_codes`
--

CREATE TABLE `broker_codes` (
  `id` bigint(20) NOT NULL,
  `company_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `broker_codes`
--

INSERT INTO `broker_codes` (`id`, `company_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, '0456', '2020-08-25 12:17:35', '2020-08-25 12:17:35'),
(2, 1, '0457', '2020-08-25 12:17:57', '2020-08-25 12:17:57'),
(3, 2, '0657', '2020-08-25 12:18:14', '2020-08-25 12:18:14'),
(4, 2, '0658', '2020-08-25 12:18:22', '2020-08-25 12:18:22');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'company 1', '2020-08-25 12:15:29', '2020-08-25 12:15:29'),
(2, 'company 2', '2020-08-25 12:15:36', '2020-08-25 12:15:36');

-- --------------------------------------------------------

--
-- Table structure for table `investors`
--

CREATE TABLE `investors` (
  `id` bigint(20) NOT NULL,
  `broker_id` bigint(20) DEFAULT NULL,
  `type` enum('investor','spouse') NOT NULL DEFAULT 'investor',
  `investor_number` varchar(60) DEFAULT NULL,
  `spouse_id` bigint(20) DEFAULT NULL,
  `AdviserCode` varchar(12) DEFAULT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `MiddleName` varchar(60) DEFAULT NULL,
  `LastName` varchar(60) DEFAULT NULL,
  `CompanyName` varchar(100) DEFAULT NULL,
  `IdNumber` varchar(60) DEFAULT NULL,
  `CellNumber` varchar(60) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `ClientNumber` varchar(60) DEFAULT NULL,
  `EntityType` varchar(60) DEFAULT NULL,
  `Product` varchar(60) DEFAULT NULL,
  `AccountName` varchar(60) DEFAULT NULL,
  `AccountNumber` varchar(12) DEFAULT NULL,
  `HomeNumber` varchar(60) DEFAULT NULL,
  `WorkNumber` varchar(60) DEFAULT NULL,
  `HomeAddress` varchar(60) DEFAULT NULL,
  `PostalAddress` varchar(255) DEFAULT NULL,
  `TaxNumber` varchar(60) DEFAULT NULL,
  `MaritalStatus` varchar(60) DEFAULT NULL,
  `BankName` varchar(60) DEFAULT NULL,
  `BankNumber` varchar(60) DEFAULT NULL,
  `AccountType` varchar(60) DEFAULT NULL,
  `Note` text,
  `UploadId` varchar(60) DEFAULT NULL,
  `DisclosureName` varchar(60) DEFAULT NULL,
  `DisclosureDate` varchar(60) DEFAULT NULL,
  `DisclosureSign` varchar(60) DEFAULT NULL,
  `DisclosureAgree` varchar(60) DEFAULT NULL,
  `RecordAdviceDate` varchar(255) DEFAULT NULL,
  `RecordAdviceClient` varchar(255) DEFAULT NULL,
  `RecordAdviceAdvisor` varchar(255) DEFAULT NULL,
  `RecordAdviceSummaryOfDiscussionWithClient` varchar(255) DEFAULT NULL,
  `RecordAdviceSummaryOfAdviceFromAdvisor` varchar(255) DEFAULT NULL,
  `RecordAdviceOfAdvisorTaken` varchar(255) DEFAULT NULL,
  `RecordAdviceOfAdvisorExplain` varchar(255) DEFAULT NULL,
  `RecordAdviceClientSignature` varchar(255) DEFAULT NULL,
  `RecordAdviceAdvisorSignature` varchar(255) DEFAULT NULL,
  `RiskProfilerClientSignature` varchar(255) DEFAULT NULL,
  `RiskProfilerAdvisorSignature` varchar(255) DEFAULT NULL,
  `Year1` varchar(255) DEFAULT NULL,
  `Year2` varchar(255) DEFAULT NULL,
  `Year3` varchar(255) DEFAULT NULL,
  `Year4` varchar(255) DEFAULT NULL,
  `Year5` varchar(255) DEFAULT NULL,
  `Year6` varchar(255) DEFAULT NULL,
  `InceptionDate` datetime DEFAULT NULL,
  `FundManager` varchar(100) DEFAULT NULL,
  `FundName` varchar(100) DEFAULT NULL,
  `FundCode` varchar(10) DEFAULT NULL,
  `InitialAdviserFees` double(15,6) DEFAULT NULL,
  `AnnualAdviserFees` double(15,6) DEFAULT NULL,
  `AnniversaryDate` datetime DEFAULT NULL,
  `Units` double(21,6) DEFAULT NULL,
  `UnitPriceInCurrency` double(18,9) DEFAULT NULL,
  `PriceDate` datetime DEFAULT NULL,
  `ValueInFundCurrency` double(35,6) DEFAULT NULL,
  `ExhangeRate` double(15,9) DEFAULT NULL,
  `ValueInRands` double(35,6) DEFAULT NULL,
  `ReportingCurrencySymbol` varchar(60) DEFAULT NULL,
  `ReportingCurrencyName` varchar(60) DEFAULT NULL,
  `FundBaseCurrency` varchar(5) DEFAULT NULL,
  `UnallottedUnits` decimal(20,9) DEFAULT NULL,
  `UnallottedMarketValueInFundCurrency` decimal(20,6) DEFAULT NULL,
  `ModelPortfolio` varchar(100) DEFAULT NULL,
  `DebitOrderTotal` decimal(20,6) DEFAULT NULL,
  `DebitOrderFrequency` varchar(20) DEFAULT NULL,
  `RegularWithdrawalTotal` decimal(20,6) DEFAULT NULL,
  `RegularWithdrawalFrequency` varchar(20) DEFAULT NULL,
  `GrossAnnuitiesTotal` decimal(20,6) DEFAULT NULL,
  `AnnuityFrequency` varchar(20) DEFAULT NULL,
  `TotalCompleteUnits` decimal(20,9) DEFAULT NULL,
  `AverageWeightedUnitCost` decimal(20,6) DEFAULT NULL,
  `CGTForTaxYear` decimal(20,6) DEFAULT NULL,
  `ISINNumber` varchar(12) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `investors`
--

INSERT INTO `investors` (`id`, `broker_id`, `type`, `investor_number`, `spouse_id`, `AdviserCode`, `FirstName`, `MiddleName`, `LastName`, `CompanyName`, `IdNumber`, `CellNumber`, `Email`, `ClientNumber`, `EntityType`, `Product`, `AccountName`, `AccountNumber`, `HomeNumber`, `WorkNumber`, `HomeAddress`, `PostalAddress`, `TaxNumber`, `MaritalStatus`, `BankName`, `BankNumber`, `AccountType`, `Note`, `UploadId`, `DisclosureName`, `DisclosureDate`, `DisclosureSign`, `DisclosureAgree`, `RecordAdviceDate`, `RecordAdviceClient`, `RecordAdviceAdvisor`, `RecordAdviceSummaryOfDiscussionWithClient`, `RecordAdviceSummaryOfAdviceFromAdvisor`, `RecordAdviceOfAdvisorTaken`, `RecordAdviceOfAdvisorExplain`, `RecordAdviceClientSignature`, `RecordAdviceAdvisorSignature`, `RiskProfilerClientSignature`, `RiskProfilerAdvisorSignature`, `Year1`, `Year2`, `Year3`, `Year4`, `Year5`, `Year6`, `InceptionDate`, `FundManager`, `FundName`, `FundCode`, `InitialAdviserFees`, `AnnualAdviserFees`, `AnniversaryDate`, `Units`, `UnitPriceInCurrency`, `PriceDate`, `ValueInFundCurrency`, `ExhangeRate`, `ValueInRands`, `ReportingCurrencySymbol`, `ReportingCurrencyName`, `FundBaseCurrency`, `UnallottedUnits`, `UnallottedMarketValueInFundCurrency`, `ModelPortfolio`, `DebitOrderTotal`, `DebitOrderFrequency`, `RegularWithdrawalTotal`, `RegularWithdrawalFrequency`, `GrossAnnuitiesTotal`, `AnnuityFrequency`, `TotalCompleteUnits`, `AverageWeightedUnitCost`, `CGTForTaxYear`, `ISINNumber`, `created_at`, `updated_at`) VALUES
(88, 1, 'investor', '159704333145', NULL, NULL, 'fdf', NULL, 'df', NULL, '33', '33', 'sdds@f.dui', NULL, NULL, NULL, NULL, NULL, '45', '54', 'df', 'sd', '4', '1', 'fdf', '343', 's', 'ds', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-10 07:08:51', '2020-08-10 07:08:51'),
(107, 1, 'investor', '159720876975', NULL, NULL, 'sdfsdf', NULL, 'dsfsdf', NULL, 's4545', '45435', 'sdfsdf@gmasilo.com', NULL, NULL, NULL, NULL, NULL, '', '', 'sdffdsf', '', '4545', '', '', '', '', 'sdfdsf', 'dlcesk9q267434.jpg', 'sdfsdf dsfsdf', '2020-08-12', '4vkd0db9.png', 'yes', '2020-08-12', 'clirnmr', 'advuisor', 'dsfsdf', 'sdfdsf', 'Yes', '', 'mxl4oqon.png', 'iybapodb.png', 'wkiho57j.png', 'p8zgledr.png', '10', '10', '0', '0', '0', '80', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-12 05:06:09', '2020-08-12 05:07:32'),
(108, 1, 'investor', '159720902091', NULL, NULL, 'dsfs', NULL, 'dfsd', NULL, '34324', '34234', 'fsdf@gmfdf.rfdg', NULL, NULL, NULL, NULL, NULL, '', '', 'fsdf', '', '4545', '', '', '', '', 'dsffsdf', 'pggya79m267434.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-12 05:10:19', '2020-08-12 05:10:28'),
(109, 1, 'investor', '159720909345', NULL, NULL, 'dfsd', NULL, 'sdfsdf', NULL, '343', '3423', 'sadsad@gm.ff', NULL, NULL, NULL, NULL, NULL, '', '', 'sdfdsf', '', '454532', '', '', '', '', 'sdfsdf', '6bvhsioi267434.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-12 05:11:32', '2020-08-12 05:11:38'),
(110, 1, 'investor', '159722305185', NULL, NULL, 'sdfds', NULL, 'fd', NULL, '4545', '345345', 'sdfsdf@gnds.vo', NULL, NULL, NULL, NULL, NULL, '', '', 'sdfsdf', '', '4545', '', '', '', '', 'sdfsdfsdf', 'y9cgknlz267434.jpg', 'sdfds fd', '2020-08-12', 'yrt0eenf.png', 'yes', '2020-08-12', 'sdfsdf', 'sdfdsf', 'undefined', 'undefined', 'Yes', '', 'hf4bptvb.png', '9lvqi6q4.png', 'xbvrqh4c.png', '82d967gm.png', '0', '100', '0', '0', '0', '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-12 09:04:11', '2020-08-12 09:05:30'),
(111, 1, 'investor', '159722803565', NULL, NULL, 'fd', NULL, 'fd', NULL, '32423423423', '342342342', 'fd@mailinator.com', NULL, NULL, NULL, NULL, NULL, '5345435345', '454353', '5345345345', 'vg nvcfgtdn ', '544', '1', 'undefined', '', 'undefined', ' gf', 'gk5aecq4Screen Shot 2020-08-12 at 3.34.09 PM.png', 'fd fd', '2020-08-12', 'noavease.png', 'yes', '2020-08-12', 'f', 'f', ' bvh ', ' bvtuy ', 'Yes', '', '51rvpxu8.png', 'gt8oa0dm.png', '8yakehr5.png', 'lcoh25n9.png', '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-12 10:27:14', '2020-08-12 11:08:38'),
(112, 1, 'spouse', '159722803547', 111, NULL, 'e', NULL, 'fd', NULL, '53454534', '54353434', 'fh@dh.gh', NULL, NULL, NULL, NULL, NULL, '', '', ' fgvtc ', '', '645645645', NULL, '', '', '', ' gf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-12 10:27:14', '2020-08-12 10:27:14'),
(113, 1, 'investor', '159723058035', NULL, NULL, 'ertert', NULL, 'retert', NULL, 'rttr', '4545', 'fgdfg@gmf.rf', NULL, NULL, NULL, NULL, NULL, '', '', 'tret', '', '4545', '', '', '', '', 'fgdfg', 'ptyoigyx267434.jpg', 'ertert retert', '2020-08-12', 'edvqahfh.png', 'yes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-12 11:09:39', '2020-08-12 11:10:34'),
(114, 1, 'investor', '159723096625', NULL, NULL, 'sadas', NULL, 'w', NULL, 'sadsad', '34324', 'sccs@gm.vd', NULL, NULL, NULL, NULL, NULL, '', '', 'sdfdsf', '', '3434', '', '', '', '', 'fsdfsdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-12 11:16:05', '2020-08-12 11:16:05'),
(115, 1, 'investor', '159723380248', NULL, NULL, 'sdsd', NULL, 'ssadsd', NULL, 'sad', '3434', 'sdsd@gm.dy', NULL, NULL, NULL, NULL, NULL, '', '', 'sdfff', '', '344343434', '', '', '', '', 'dfsdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ey956gmb.png', NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-12 12:03:21', '2020-08-26 10:41:23'),
(168, 1, 'investor', '159809193974', NULL, NULL, 'dfgdfg', NULL, 'fdgdfg', NULL, '454354', '43432', 'dfsdf@gm.fgfg', NULL, NULL, NULL, NULL, NULL, '', '', 'dfsfsdf', '', '3434', '', '', '', '', '', NULL, 'dfgdfg fdgdfg', '2020-08-24', '8h4r306e.png', 'yes', '2020-08-24', 'fg', 'undefined', 'f', 'undefined', 'No', 'fg', 'p2tgk65f.png', '8vfwjmzd.png', '5u0p7rqo.png', 'enfnaelh.png', '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-22 10:25:39', '2020-08-25 05:03:32'),
(170, 1, 'investor', '159843815858', NULL, NULL, 'mac', NULL, 'mac', NULL, '65656565', '65656565', 'mac@mailinator.com', NULL, NULL, NULL, NULL, NULL, '54345345', '3534534534', 'y ndtyjn d ', 'tyc hy', '54454545', 'COP', 'Bank1', '45455654634534', 'Type2', '', NULL, 'mac mac', '2020-08-26', 'n6c8t3dd.png', 'yes', '2020-08-26', 'fd', 'df', 'fd', 'df', 'Yes', '', 'wyxsufd7.png', 'mmzyc3zq.png', '1vvgtn07.png', 'fzk0irfo.png', '10', '10', '10', '10', '20', '40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-26 10:35:57', '2020-08-26 10:39:36'),
(171, 1, 'investor', '159843896054', NULL, NULL, 'new', NULL, 'client', NULL, '3343434324', '34343243423', 'newclient@mailinator.com', NULL, NULL, NULL, NULL, NULL, '', '', '3343', '', '34343423', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'knjysyno.png', NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-26 10:49:20', '2020-08-26 12:17:13'),
(172, 1, 'investor', '159843915829', NULL, NULL, 'fgdgdfg', NULL, 'hgf', NULL, '56456456456', '56546456456', 'gff@fgdgdf.trte', NULL, NULL, NULL, NULL, NULL, '4545345345', '45345345', 'fddr', 'dfg', '545453543', 'COP', 'Bank2', '543534534', 'Type2', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-26 10:52:37', '2020-08-26 10:53:18'),
(173, 1, 'investor', '159843968410', NULL, NULL, 'tree', NULL, 'tree', NULL, '656567567', '5645654645645', 'tree@mailinator.com', NULL, NULL, NULL, NULL, NULL, '545345345', '45353453434', ' bc', '543', '53453453', 'COP', 'Bank2', '', 'Type2', '', NULL, 'tree tree', '2020-08-26', '09rvi0be.png', 'yes', '2020-08-26', 'fhfgfg', 'ghfghfg', 'j nhty jh fyjn t56', ' jnghju ghde6', 'No', 'htryrtyrty h', 'u98bwipu.png', '5dxuqk7n.png', '7qnsw38f.png', 'u7jzvcl9.png', '10', '10', '10', '20', '20', '30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-26 11:01:23', '2020-08-26 11:34:27'),
(174, 1, 'investor', '159844010262', NULL, NULL, 'dsfdsf', NULL, 'dfdsf', NULL, '3434', '3434', 'sdsd@gm.fgg', NULL, NULL, NULL, NULL, NULL, '', '', '54545', '', '45454545', '', '', '', '', '', NULL, 'dsfdsf dfdsf', '2020-08-26', '68eogzf8.png', 'yes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'alwl2v0x.png', NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-26 11:08:22', '2020-08-26 12:07:40'),
(175, 1, 'investor', '159844260267', NULL, NULL, 'sdf', NULL, 'dfds', NULL, '343', '343', 'dcxc@gm.fy', NULL, NULL, NULL, NULL, NULL, '', '', '4545', '', '4545', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ptsd0t03.png', NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-26 11:50:02', '2020-08-26 12:03:22'),
(176, 1, 'investor', '159844434652', NULL, NULL, 'fsdf', NULL, 'sdf', NULL, '343', '34324', 'fdssd@g.fghfh', NULL, NULL, NULL, NULL, NULL, '', '', '5435', '', '43545', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'i4ddqf6h.png', NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-26 12:19:06', '2020-08-26 12:19:26'),
(177, 1, 'investor', '159844450479', NULL, NULL, 'dfds', NULL, 'fdf', NULL, '45343', '34434', 'promatics.rohit1@gmail.com', NULL, NULL, NULL, NULL, NULL, '', '', '2343', '', '34532', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'zzj0z1cm.png', NULL, '20', '20', '20', '20', '10', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-26 12:21:43', '2020-08-26 12:53:09');

-- --------------------------------------------------------

--
-- Table structure for table `investor_beneficiaries`
--

CREATE TABLE `investor_beneficiaries` (
  `id` bigint(20) NOT NULL,
  `investor_id` bigint(20) DEFAULT NULL,
  `FullName` varchar(60) NOT NULL,
  `Relationship` varchar(60) NOT NULL,
  `CellNumber` varchar(60) NOT NULL,
  `Percent` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `investor_beneficiaries`
--

INSERT INTO `investor_beneficiaries` (`id`, `investor_id`, `FullName`, `Relationship`, `CellNumber`, `Percent`, `created_at`, `updated_at`) VALUES
(24, 164, 'd', 'd', 'd', 'd', '2020-08-05 09:23:37', '2020-08-05 09:23:37'),
(25, 164, 'SDFG', 'SDF', 'DSF', 'EF', '2020-08-07 05:57:25', '2020-08-07 05:57:25'),
(26, 168, 'dsf', 'dgfd', '54543', '4', '2020-08-22 10:25:39', '2020-08-22 10:25:39');

-- --------------------------------------------------------

--
-- Table structure for table `investor_broker_appointments`
--

CREATE TABLE `investor_broker_appointments` (
  `id` bigint(20) NOT NULL,
  `investor_id` bigint(20) NOT NULL,
  `company_id` bigint(20) NOT NULL,
  `broker_code_id` bigint(20) NOT NULL,
  `OwnerInsured` varchar(255) NOT NULL,
  `PostalAddress` varchar(255) DEFAULT NULL,
  `IdNumber` varchar(255) NOT NULL,
  `HomeNumber` varchar(255) DEFAULT NULL,
  `WorkNumber` varchar(255) DEFAULT NULL,
  `CellNumber` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `DateSigned` varchar(255) NOT NULL,
  `Signature` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `investor_broker_appointments`
--

INSERT INTO `investor_broker_appointments` (`id`, `investor_id`, `company_id`, `broker_code_id`, `OwnerInsured`, `PostalAddress`, `IdNumber`, `HomeNumber`, `WorkNumber`, `CellNumber`, `Email`, `DateSigned`, `Signature`, `created_at`, `updated_at`) VALUES
(1, 115, 1, 1, '5', '', '56', '', '', '4545', 'fsdf@gm.gu', '2020-08-26', 'xuh26kxv.png', '2020-08-26 05:51:42', '2020-08-26 05:51:42'),
(2, 115, 1, 1, '45', '', '454', '', '', '4545', 'sdfsd@gm.fg', '2020-08-26', 'yi3kfzqi.png', '2020-08-26 06:39:06', '2020-08-26 06:39:06'),
(3, 115, 1, 1, '45', '', '454', '', '', '4545', 'sdfsd@gm.fg', '2020-08-26', '03gt6sgi.png', '2020-08-26 06:40:10', '2020-08-26 06:40:10'),
(4, 115, 1, 1, '45', '', '454', '', '', '4545', 'sdfsd@gm.fg', '2020-08-26', 'pa8vckif.png', '2020-08-26 06:41:20', '2020-08-26 06:41:20'),
(5, 114, 1, 1, '454', '', '4545', '', '', '54', 'fgfg@gm.tu', '2020-08-26', NULL, '2020-08-26 07:16:12', '2020-08-26 07:16:12'),
(6, 168, 1, 1, '433434', '', '4334434343', '', '', '4324234234', 'd@mailinator.com', '2020-08-26', NULL, '2020-08-26 10:07:42', '2020-08-26 10:07:42'),
(7, 168, 1, 1, '433434', '', '4334434343', '', '', '4324234234', 'd@mailinator.com', '2020-08-26', NULL, '2020-08-26 10:07:50', '2020-08-26 10:07:50'),
(8, 173, 1, 1, '65645', 'bv', '454353453', '5654645', '56545645', '564645645', 't@mailinator.com', '2020-08-26', 'vnrwqxff.png', '2020-08-26 11:10:36', '2020-08-26 11:10:36');

-- --------------------------------------------------------

--
-- Table structure for table `investor_childrens`
--

CREATE TABLE `investor_childrens` (
  `id` bigint(20) NOT NULL,
  `investor_id` bigint(20) DEFAULT NULL,
  `FullName` varchar(60) NOT NULL,
  `IdNumber` varchar(60) NOT NULL,
  `CellNumber` varchar(60) NOT NULL,
  `Email` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `investor_childrens`
--

INSERT INTO `investor_childrens` (`id`, `investor_id`, `FullName`, `IdNumber`, `CellNumber`, `Email`, `created_at`, `updated_at`) VALUES
(1, NULL, 'hg', 'h', 'h', 'gh', '2020-08-05 08:37:02', '2020-08-05 08:37:02'),
(2, NULL, 'gh', 'gh', 'h', 'h', '2020-08-05 08:37:02', '2020-08-05 08:37:02'),
(3, NULL, 'h', 'h', 'h', 'h', '2020-08-05 08:37:02', '2020-08-05 08:37:02'),
(4, NULL, 'hg', 'h', 'h', 'gh', '2020-08-05 08:46:16', '2020-08-05 08:46:16'),
(5, NULL, 'gh', 'gh', 'h', 'h', '2020-08-05 08:46:16', '2020-08-05 08:46:16'),
(6, NULL, 'h', 'h', 'h', 'h', '2020-08-05 08:46:16', '2020-08-05 08:46:16'),
(7, NULL, 'hg', 'h', 'h', 'gh', '2020-08-05 08:47:03', '2020-08-05 08:47:03'),
(8, NULL, 'gh', 'gh', 'h', 'h', '2020-08-05 08:47:03', '2020-08-05 08:47:03'),
(9, NULL, 'h', 'h', 'h', 'h', '2020-08-05 08:47:03', '2020-08-05 08:47:03'),
(10, 14, 'hg', 'h', 'h', 'gh', '2020-08-05 08:51:39', '2020-08-05 08:51:39'),
(11, NULL, 'gh', 'gh', 'h', 'h', '2020-08-05 08:51:39', '2020-08-05 08:51:39'),
(12, NULL, 'h', 'h', 'h', 'h', '2020-08-05 08:51:39', '2020-08-05 08:51:39'),
(13, 15, 'hg', 'h', 'h', 'gh', '2020-08-05 08:54:39', '2020-08-05 08:54:39'),
(14, NULL, 'gh', 'gh', 'h', 'h', '2020-08-05 08:54:39', '2020-08-05 08:54:39'),
(15, NULL, 'h', 'h', 'h', 'h', '2020-08-05 08:54:39', '2020-08-05 08:54:39'),
(16, NULL, 'hg', 'h', 'h', 'gh', '2020-08-05 08:55:29', '2020-08-05 08:55:29'),
(17, NULL, 'gh', 'gh', 'h', 'h', '2020-08-05 08:55:29', '2020-08-05 08:55:29'),
(18, NULL, 'h', 'h', 'h', 'h', '2020-08-05 08:55:29', '2020-08-05 08:55:29'),
(19, NULL, '', '', '', '', '2020-08-05 08:57:41', '2020-08-05 08:57:41'),
(20, NULL, '', '', '', '', '2020-08-05 08:57:41', '2020-08-05 08:57:41'),
(21, NULL, '', '', '', '', '2020-08-05 08:57:41', '2020-08-05 08:57:41'),
(22, 19, 'fdg', 'f', 'f', 'f', '2020-08-05 09:11:22', '2020-08-05 09:11:22'),
(23, 19, 'f', 'f', 'f', 'f', '2020-08-05 09:11:22', '2020-08-05 09:11:22'),
(24, 164, 'fdg', 'f', 'f', 'f', '2020-08-05 09:23:37', '2020-08-05 09:23:37'),
(25, 164, 'f', 'f', 'f', 'f', '2020-08-05 09:23:37', '2020-08-05 09:23:37'),
(26, 42, 'fdg', 'df', 'fg', 'df', '2020-08-07 04:05:10', '2020-08-07 04:05:10'),
(27, 43, 'g', 'g', 'g', 'g', '2020-08-07 05:52:45', '2020-08-07 05:52:45'),
(28, 44, 'SDFG', 'SDF', 'SDF', 'SDF', '2020-08-07 05:57:25', '2020-08-07 05:57:25'),
(29, 45, 'g', 'g', 'g', 'g', '2020-08-07 06:00:49', '2020-08-07 06:00:49'),
(30, 46, 'j', 'j', 'j', 'j', '2020-08-07 06:02:11', '2020-08-07 06:02:11'),
(31, 47, 'cvb', 'cvb', 'cvb', 'cvb', '2020-08-07 06:10:06', '2020-08-07 06:10:06'),
(32, 50, 'dfff', 'fg', 'fg', 'fgfg', '2020-08-07 12:37:18', '2020-08-07 12:37:18'),
(33, 66, 'gdfg', 'dfgdf', 'gdfg', 'gd', '2020-08-08 07:11:10', '2020-08-08 07:11:10'),
(34, 66, 'dfgdf', 'gdfg', 'gfd', 'asdasdasd', '2020-08-08 07:11:10', '2020-08-08 07:11:10'),
(35, 66, 'dfgdfg', 'dfgd', 'fgdf', 'dfgdf', '2020-08-08 07:11:10', '2020-08-08 07:11:10'),
(36, 67, 'hdfghdfghf', 'dfghdfgh', 'dfdfhdfgh', 'dfhg', '2020-08-08 07:17:53', '2020-08-08 07:17:53'),
(37, 83, ' v ', '5', '23', '5', '2020-08-08 12:13:29', '2020-08-08 12:13:29'),
(38, 116, 'ddg', '432432424', '242343423', 'de@ghc.g', '2020-08-14 05:29:19', '2020-08-14 05:29:19'),
(39, 119, 'gfy', '212', '213232323', 'wde@fijvs.ss', '2020-08-14 05:57:59', '2020-08-14 05:57:59'),
(40, 168, 'df', '333', '434', 'dfsdf', '2020-08-22 10:25:39', '2020-08-22 10:25:39');

-- --------------------------------------------------------

--
-- Table structure for table `investor_documents`
--

CREATE TABLE `investor_documents` (
  `id` bigint(20) NOT NULL,
  `investor_id` bigint(20) NOT NULL,
  `upload_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `investor_documents`
--

INSERT INTO `investor_documents` (`id`, `investor_id`, `upload_id`, `created_at`, `updated_at`) VALUES
(1, 167, 'wn2hed9a267434.jpg', '2020-08-22 10:08:23', '2020-08-22 10:08:23'),
(2, 167, 'ljhkol2limages.jpeg', '2020-08-22 10:08:23', '2020-08-22 10:08:23'),
(3, 167, 'y2na5so6267434.jpg', '2020-08-22 10:09:40', '2020-08-22 10:09:40'),
(4, 167, 'qiietlbvimages.jpeg', '2020-08-22 10:09:40', '2020-08-22 10:09:40'),
(5, 167, 'xxjxbftdnews-detail-1.jpg', '2020-08-22 10:09:40', '2020-08-22 10:09:40'),
(6, 168, '1ulgsjisnews-detail-1.jpg', '2020-08-22 10:25:56', '2020-08-22 10:25:56'),
(7, 168, '1ulgsjisnews-detail-1.jpg', '2020-08-22 10:25:56', '2020-08-22 10:25:56'),
(8, 168, '6a6grafnnews-detail-1.jpg', '2020-08-24 09:15:58', '2020-08-24 09:15:58'),
(9, 168, '6a6grafnnews-detail-1.jpg', '2020-08-24 09:15:58', '2020-08-24 09:15:58'),
(10, 168, '0wuwudg9news-detail-1.jpg', '2020-08-24 09:23:01', '2020-08-24 09:23:01'),
(11, 168, '0wuwudg9news-detail-1.jpg', '2020-08-24 09:23:01', '2020-08-24 09:23:01'),
(12, 168, 'vs3grrghnews-detail-1.jpg', '2020-08-24 09:25:05', '2020-08-24 09:25:05'),
(13, 168, 'vs3grrghnews-detail-1.jpg', '2020-08-24 09:25:05', '2020-08-24 09:25:05'),
(14, 168, 'bsbnmyuwimages.jpeg', '2020-08-24 09:49:27', '2020-08-24 09:49:27'),
(15, 168, 'bsbnmyuwimages.jpeg', '2020-08-24 09:49:27', '2020-08-24 09:49:27'),
(16, 174, 'qhaisylk267434.jpg', '2020-08-26 11:25:34', '2020-08-26 11:25:34'),
(17, 174, 'b780k429267434.jpg', '2020-08-26 11:49:27', '2020-08-26 11:49:27'),
(18, 174, 'b780k429267434.jpg', '2020-08-26 11:49:27', '2020-08-26 11:49:27'),
(19, 175, 'lgwyyis6267434.jpg', '2020-08-26 11:50:09', '2020-08-26 11:50:09'),
(20, 175, 'zeadw2wv267434.jpg', '2020-08-26 11:52:40', '2020-08-26 11:52:40');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` bigint(20) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `IdNumber` varchar(255) NOT NULL,
  `CellNumber` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `HomeAddress` varchar(255) NOT NULL,
  `HomeNumber` varchar(255) DEFAULT NULL,
  `MaritalStatus` varchar(255) DEFAULT NULL,
  `Note` text,
  `status` enum('visitor','investor','called','cancelled') NOT NULL DEFAULT 'visitor',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `FirstName`, `LastName`, `IdNumber`, `CellNumber`, `Email`, `HomeAddress`, `HomeNumber`, `MaritalStatus`, `Note`, `status`, `created_at`, `updated_at`) VALUES
(1, 'rohit', 'soni', 'sddxzc33', '9876543210', 'rohitsoni@mailinator.com', '141 Street Lockfield street, houston, texas,77084', '5435345', '', 'This is the lead note that this can become the investor in the future', 'investor', '2020-08-14 08:27:39', '2020-08-17 11:17:14'),
(2, 'raj', 'kumar', 'dff3448', '9876543210', 'rajkumar@mailinator.com', 'bahadarke road ludhiana', '', '', 'this is the note for the lead', 'visitor', '2020-08-14 09:14:04', '2020-08-14 09:14:04'),
(4, 'tr', 'rft', '545445', '5454545545', 'fg@fd.jf', 'd', '55545454', 'ANC-Acc', 'd', 'cancelled', '2020-08-14 09:47:37', '2020-08-14 10:19:00'),
(5, ' fgrtv vcfgb ', 'trv frtv ', '543534534', '4444344343', 'df@sdez.jghy', 'fh', '433434', 'Wid', 'fh', 'visitor', '2020-08-14 09:48:05', '2020-08-14 09:48:05'),
(6, ' fgv ', ' fv ', ' 4534344', '434343434', 'bf@gvds.jgty', ' ghf ', '44344343', 'ANC+ACC', ' ghty67 jnfhy6jn', 'visitor', '2020-08-14 10:00:06', '2020-08-14 10:00:06'),
(7, 'rcfgtv', 'cvfgrt', '45454545', '54545454545', 'ds@dfgvdfs.ghg', 'hyu gh hgy hg ghyu ghyj hhty  bgncgb hty  bgncgb ', '554545', 'ANC+ACC', 'hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb hty6  bgncgb ', 'investor', '2020-08-14 10:04:23', '2020-08-14 10:06:54'),
(8, 'cxvxc', 'vxcv', 'vcv', '343434', 'vcxv@gmd.fg', 'dfgdfg', '', '', 'dfgdfgdfgdfgdfg', 'visitor', '2020-08-14 10:15:14', '2020-08-19 12:44:43'),
(9, 'Marthunis', 'Oosthuizen', '8809295114082', '0742855555', 'mco@fivetwoinvestments.co.za', '4 Comrie Road Westville', '', 'COP', 'a', 'investor', '2020-08-17 11:21:21', '2020-08-17 11:22:43'),
(10, 'ff', 'fff', '3422323233', '23233223', 'hj@csdcs.ccc', ' vfgb gvf,  fv, bfgv, b,fgv.fgv .b,fgv.,. f8', '3', 'ANC+ACC', ' cfgvrt bnvfgtr bhn', 'investor', '2020-08-19 12:46:13', '2020-08-19 12:46:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `type` enum('user','officer') NOT NULL DEFAULT 'user',
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `broker_number` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `security_code` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `type`, `first_name`, `last_name`, `email`, `broker_number`, `company`, `password`, `security_code`, `status`, `created_at`, `updated_at`) VALUES
(1, 'user', 'Michelle', 'user', 'fivetwouser@mailinator.com', '456789', 'Five Two', '$2a$10$U4b1tIdxrIS6gO4kEEKfIeTBvfgvyUPTFsvMZrqmJZce86n6MTMNW', NULL, 'active', '2020-07-30 15:52:02', '2020-08-28 09:19:58'),
(2, 'officer', 'officer', 'user', 'fivetwouser2@mailinator.com', NULL, NULL, '$2a$10$bAGdOZePjeEUFwz8sHvR3OuTNLJhC5DMXUHMZzWEGwJQ7PwBFeon6', NULL, 'active', '2020-08-18 06:36:26', '2020-08-28 09:37:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `broker_codes`
--
ALTER TABLE `broker_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investors`
--
ALTER TABLE `investors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investor_beneficiaries`
--
ALTER TABLE `investor_beneficiaries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investor_broker_appointments`
--
ALTER TABLE `investor_broker_appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investor_childrens`
--
ALTER TABLE `investor_childrens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investor_documents`
--
ALTER TABLE `investor_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `broker_codes`
--
ALTER TABLE `broker_codes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `investors`
--
ALTER TABLE `investors`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;
--
-- AUTO_INCREMENT for table `investor_beneficiaries`
--
ALTER TABLE `investor_beneficiaries`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `investor_broker_appointments`
--
ALTER TABLE `investor_broker_appointments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `investor_childrens`
--
ALTER TABLE `investor_childrens`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `investor_documents`
--
ALTER TABLE `investor_documents`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
