<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "your_mysql_username";
$password = "your_mysql_password";
$dbname = "your_database";

// Get JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$email = $data['email'];
$password = $data['password'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Hash the password using bcrypt
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Prepare SQL statement to insert user data
$sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Account created successfully!"]);
} else {
    echo json_encode(["message" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
?>
