<?php

  include_once("../db/conexion.php");

  $conexion = conexionDb();

  $consultaUsers = "SELECT * FROM login";
  $query = mysqli_query($conexion, $consultaUsers);

  
  $chats = mysqli_fetch_all($query);
  
  $res = [
    "chats" => $chats
  ];

  header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
  echo json_encode($res);

?>