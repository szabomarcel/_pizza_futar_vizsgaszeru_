<?php
$fazon = $_POST("fazon");
$fnev = $_POST("fnev");
$ftel = $_POST("ftel");
require_once '/databaseconnection.php';
$sql = "INSERT INTO futar (fazon, fnev, ftel) VALUES (?, ?, ?)";
$stml = $connection->prepare($sql);
$stml->bind_Param("isi", $fazon, $fnev, $ftel);
if($stml->execute()){
    http_response_code(201);
    echo "Sikeresen lett hozzáadva";
}else{
    http_response_code(404);
    echo 'Sikertelen hozzáadás';
}