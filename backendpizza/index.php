<?php
switch ($_SERVER['REQUEST_METHOD']){
    case "GET":
        require_once 'backendpizza/getpizza.php';
        break;
    case "POST":
        require_once 'backendpizza/postpizza.php';
        break;
    case "DELETE":
        require_once 'backendpizza/deletepizza.php';
        break;
    case "PUT":
        require_once 'backendpizza/putpizza.php';
        break;
    default:
        break;
}