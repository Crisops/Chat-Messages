<?php

  include_once("../db/conexion.php");

  $conexion = conexionDb();

  if(isset($_POST)){
    $email = $_POST["email"];
    $password = $_POST["password"];
  
    $querySelectUser = "SELECT * FROM login WHERE user_mail = '$email' AND user_password = '$password'";

    $query = mysqli_query($conexion,$querySelectUser);

    $data = mysqli_fetch_assoc($query);

    if(mysqli_affected_rows($conexion) == 1){
      $res = [
        "ok" => true,
        "data" => $data
      ];
    }else{
      $res = [
        "ok" => false,
        "data" => "Error. El usuario no se encuentra registrado"
      ];
    }



  }else{
    $res = [
      "error" => "Los datos no se enviaron correctamente"
    ];
  }

  header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
  echo json_encode($res);

?>