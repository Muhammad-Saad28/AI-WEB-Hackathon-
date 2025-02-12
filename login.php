<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "your_mysql_username";
$password = "your_mysql_password";
$dbname = "your_database";

// Get JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL statement to retrieve user by email
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verify the password
    if (password_verify($password, $user['password'])) {
        echo json_encode(["message" => "Login successful!"]);
    } else {
        echo json_encode(["message" => "Invalid credentials."]);
    }
} else {
    echo json_encode(["message" => "No user found with this email."]);
}

$conn->close();
?>
