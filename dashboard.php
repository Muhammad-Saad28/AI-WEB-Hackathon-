<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Intelligent Kitchen</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<nav class="nav-bar">
    <a href="index.html">Home</a>
    <a href="features.html">Features</a>
    <a href="inventory.html">Inventory</a>
    <a href="about.html">About Us</a>
    <a href="services.html">Services</a>
    <a href="contact.html">Contact</a>
    <a href="logout.php">Logout</a>
</nav>

<section class="auth-container">
    <h2>Welcome, <?php echo $_SESSION["user_name"]; ?>!</h2>
    <p>You are now logged in.</p>
</section>

</body>
</html>
