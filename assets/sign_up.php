<?php

  include_once("../db/conexion.php");

  date_default_timezone_set('UTC');

  date_default_timezone_set("America/Mexico_City");

  $conexion = conexionDb();

  if(isset($_POST)){
    $name = $_POST["name"];
    $lastName = $_POST["lastName"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $date = date("Y-m-d H:i:s");
  
    $queryInsertUser = "INSERT INTO login (user_name, user_lastName, user_mail, user_password, user_dateLogin)
    VALUES('$name', '$lastName', '$email','$password', '$date')";

    mysqli_query($conexion, $queryInsertUser);

    $res = [
      "ok" => true
    ];
  
  }else{
    $res = [
      "error" => "Ha fallado la insersión de datos"
    ];
  }
  
  echo json_encode($res);

?>