<?php
/*$fazon = $_POST("fazon");
$fnev = $_POST("fnev");
$ftel = $_POST("ftel");
require_once '/databaseconnection.php';
$sql = "INSERT INTO futar (fazon, fnev, ftel) VALUES (?, ?, ?)";
$stml = $connection->prepare($sql);
$stml->bind_param("iss", $fazon, $fnev, $ftel);
if ($stml->execute()){
    http_response_code(201);
    echo "Sikeresen lett hozzáadva";
} else {
    http_response_code(404);
    echo 'Sikertelen hozzáadás';
}*/

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST["fazon"]) && isset($_POST["fnev"]) && isset($_POST["ftel"])) {
        require_once 'databaseconnection.php';
        if ($connection->connect_error) {
            die("Sikertelen kapcsolódás az adatbázishoz: " . $connection->connect_error);
        }
        $sql = "INSERT INTO futar (fazon, fnev, ftel) VALUES (?, ?, ?)";
        if ($stmt = $connection->prepare($sql)) {
            $stmt->bind_param("iss", $fazon, $fnev, $ftel);
            $fazon = $_POST["fazon"];
            $fnev = $_POST["fnev"];
            $ftel = $_POST["ftel"];
            if ($stmt->execute()) {
                http_response_code(201);
                echo "Sikeresen lett hozzáadva";
            } else {
                http_response_code(404);
                echo 'Sikertelen hozzáadás';
            }
            $stmt->close();
        } else {
            echo "Hiba a lekérés előkészítésekor: " . $connection->error;
        }
        $connection->close();
    } else {
        echo "Hiányzó mezők!";
    }
} else {
    echo "Érvénytelen kérés!";
}