<?php

  include_once("../db/conexion.php");

  $conexion = conexionDb();

  date_default_timezone_set('UTC');

  date_default_timezone_set("America/Mexico_City");

  if(isset($_POST)){
    $id_user_login = $_POST['user_login'];
    $mensaje = $_POST['message'];
    $id_user_received = $_POST["chat_message"];
    $date = date("Y-m-d H:i:s");

    $sendMessage = "INSERT INTO chats_messages (fk_id_user_message, chat, fk_id_user_received, message_date)
    VALUES('$id_user_login', '$mensaje', '$id_user_received', '$date')";


    mysqli_query($conexion, $sendMessage);
    mysqli_error($conexion);

    $res = [
      "ok" => true,
      "id_user" => $id_user_login,
      "id_user_chat" => $id_user_received
    ];
  }else{
    $res = [
      "error" => "Error. El mensaje no se ha podido enviar."
    ];
  }

  header("Access-Control-Allow-Origin: http://127.0.0.1:5500");

  echo json_encode($res);


?>