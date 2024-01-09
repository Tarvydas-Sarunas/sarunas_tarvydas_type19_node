-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2024 at 09:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `type19_node_examen`
--

-- --------------------------------------------------------

--
-- Table structure for table `item_types`
--

CREATE TABLE `item_types` (
  `item_type_id` int(10) UNSIGNED NOT NULL,
  `item_type_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item_types`
--

INSERT INTO `item_types` (`item_type_id`, `item_type_name`) VALUES
(1, 'Valgis'),
(2, 'Gerimas'),
(3, 'Rubai'),
(4, 'Elektronika'),
(5, 'Buitinė technika');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `shop_item_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `shop_item_id`, `quantity`, `total_price`, `status`) VALUES
(1, 2, 4, 3, 4.50, 'Draft'),
(2, 2, 4, 3, 4.50, 'Draft'),
(3, 4, 1, 2, 1.00, 'Draft'),
(4, 5, 3, 2, 2.00, 'Draft'),
(5, 1, 1, 1, 2.50, 'Order placed');

-- --------------------------------------------------------

--
-- Table structure for table `shop_items`
--

CREATE TABLE `shop_items` (
  `shop_item_id` int(10) UNSIGNED NOT NULL,
  `shop_item_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `item_type_id` int(10) UNSIGNED NOT NULL,
  `isArchived` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop_items`
--

INSERT INTO `shop_items` (`shop_item_id`, `shop_item_name`, `price`, `description`, `image`, `item_type_id`, `isArchived`) VALUES
(1, 'Duonos kepalas', 2.50, 'Šviežiai keptas duonos kepalas', 'https://skanitradicija.lt/wp-content/uploads/2016/02/skonio-tradicija-085.jpg', 1, 0),
(2, 'Obuolių sultys', 1.99, 'Šviežiai spausti obuolių sultys', 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_136022_PCE_LT', 2, 0),
(3, 'Striukė', 250.00, 'Madinga striukė šaltam orui', 'https://assets.laboutiqueofficielle.com/w_1100,q_auto,f_auto/media/products/2021/08/12/timberland_279649_A22XB_P57_20231019T153947_01.jpg', 3, 0),
(4, 'Alus', 1.50, 'Lengvas ir labai gaivinantis', 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_1359398_PCE_LT', 2, 0),
(5, 'Alus', 1.50, 'Lengvas ir labai gaivinantis', 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_1359398_PCE_LT', 2, 0),
(6, 'Alus', 1.50, 'Lengvas ir labai gaivinantis', 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_1359398_PCE_LT', 2, 0),
(7, 'Pienas', 1.00, 'DVARO pienas 2.5 % riebumo, 1L. Populiariausias pienas, kuris vartotojų labiausiai vertinamas dėl gero šviežio pieno skonio. Jį lemia natūralūs baltymai išsaugoti naudojant unikalią gamybos technologiją. KTU Maisto institute atlikti tyrimai patvirtina, kad DVARO piene yra daugiausiai vertingųjų baltymų, todėl jis toks skanus ir naudingas organizmui.', 'http://pienozvaigzdes.lt/resized/705/736/img/p/1/0/9/0/1090.jpg', 2, 0),
(8, 'Obuoliu sultys', 1.89, 'obuolių sultys 100%. pagaminta iš koncentruotų obuolių sulčių', 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_136022_PCE_LT', 2, 0),
(9, 'Varškės sūrelis su vanile MAGIJA', 0.59, 'Pajausk nuostabų purios varškės ir natūralios Madagaskaro vanilės skonį. Tai - tobulas desertas ieškantiems greito užkandžio ar pasimėgauti prie puodelio arbatos.', 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_231990_PCE_LT', 1, 0),
(10, '501® LEVI\'S ORIGINAL', 65.95, 'Taille: Normale\nFermeture: Braguette à boutons\nRéférence: LE2210044-C11', 'https://img01.ztat.net/article/spp-media-p1/0520ad35deb946d28daafcc1df9cb56e/200d4dbdd55844af91b42c4eabe4d231.jpg?imwidth=156', 3, 0),
(11, 'JBL Tune 670NC Bleu', 99.95, 'Le casque sans fil JBL Tune 670NC combine la liberté du Bluetooth avec le confort de la réduction de bruit active pour vous offrir une écoute confortable et agréable au quotidien. Son autonomie XXL vous permettra de profiter du son JBL Pure Bass et de parcourir votre musique préférée.', 'https://media.ldlc.com/r374/ld/products/00/06/04/36/LD0006043611.jpg', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`, `role_id`) VALUES
(1, 'Jonas', 'jonas@mail.com', 'pass1', 1),
(2, 'Petras', 'petras@mail.com', 'pass2', 2),
(3, 'Ona', 'ona@mail.com', 'pass3', 1),
(4, 'Marytė', 'maryte@mail.com', 'pass4', 2),
(5, 'Antanas', 'antanas@mail.com', 'pass5', 1),
(6, 'Rūpintojėlis', 'rupis@mail.com', 'pass6', 2),
(7, 'Giedrė', 'giedre@mail.com', 'pass7', 1),
(8, 'Algirdas', 'algirdas@mail.com', 'pass8', 2),
(9, 'Jurgita', 'jurgita@mail.com', 'pass9', 1),
(10, 'Vytautas', 'vytautas@mail.com', 'pass10', 2),
(11, 'Laima', 'laima@mail.com', 'pass11', 3),
(12, 'Tomas', 'tomas@mail.com', 'pass12', 3),
(13, 'Milda', 'milda@mail.com', 'pass13', 3),
(14, 'Laimonas', 'laimonas.@mail.com', 'pass15', 2),
(36, 'Augis', 'augis@mail.com', 'pass1', 1),
(37, 'Aurimas', 'aurimas@mail.com', 'pass20', 3),
(38, 'Arturas', 'arturas@mail.com', 'pass1', 3),
(39, 'Mikas', 'mikas@mail.com', 'pass1', 1),
(41, 'berniukas', 'berniukas@mail.com', '123456', 0),
(42, 'DedeAlgis', 'dedealgis@mail.com', 'pass1', 2),
(43, 'Petrulis', 'petrulis@mail.com', 'pass1', 3),
(44, 'Saras', 'saras@mail.com', 'pass1', 1),
(45, 'jurgis', 'jurgis@mail.com', 'pass1', 3),
(46, 'Povilas', 'povilas@mail.com', 'pass1', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `role_id` int(10) UNSIGNED NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`role_id`, `role_name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'guest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item_types`
--
ALTER TABLE `item_types`
  ADD PRIMARY KEY (`item_type_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `shop_items`
--
ALTER TABLE `shop_items`
  ADD PRIMARY KEY (`shop_item_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item_types`
--
ALTER TABLE `item_types`
  MODIFY `item_type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `shop_items`
--
ALTER TABLE `shop_items`
  MODIFY `shop_item_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
