<?php
$host = "localhost"; // Change this if your database is hosted elsewhere
$user = "root"; // Database username
$password = ""; // Database password
$database = "intelligent_kitchen"; // Your database name

$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
