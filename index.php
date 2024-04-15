<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
$kereSzoveg = explode('/', $_SERVER['QUERY_STRING']);
if($keresfutar[0] === "futarok"){
    require_once 'backendpizza/index.php';
}else{
    http_response_code(405);
    $errotJson = array('message' => 'Nincs ilyen API');
    return json_encode($errotJson);
}