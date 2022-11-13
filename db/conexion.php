<?php

  function conexionDb(){

    $host = 'localhost';
    $user = 'root';
    $pass = '3005799960';
    $db = 'chat';

    $conexion = mysqli_connect($host, $user ,$pass,$db);

    if (!$conexion) die("Conexión fallida: ". mysqli_connect_error() . "<br>");


    return $conexion;
    

    
  }
  // session_start();

  // function verificarSeguridad($nivel){
  //   return  $nivel == "Administrador";
  // }
  // function escapeString($valor){
  //   global $conexion;
  //   return mysqli_escape_string($conexion, $valor);
  // }

?>