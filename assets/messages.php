<?php

  include_once("../db/conexion.php");

  $conexion = conexionDb();

  if(isset($_GET)){
    $idUserLogin = $_GET["lg"];
    $idUserChat = $_GET["idC"];
  
    $getMessages = "SELECT chat FROM chats_messages WHERE
     fk_id_user_message = '$idUserLogin' AND fk_id_user_received = '$idUserChat'
     OR fk_id_user_message = '$idUserChat' AND fk_id_user_received = '$idUserLogin'";

    //AND fk_id_user_received = $idUserChat OR fk_id_user_received = $idUserChat";
    $query = mysqli_query($conexion, $getMessages);
  
    $messages = mysqli_fetch_all($query);

    mysqli_error($conexion);

    $res = [
      "ok" => true,
      "messages" => $messages,
      "id_chat" => $idUserChat
    ];
  
  }else{
    $res = [
      "error" => "Error. Los datos no fueron enviados"
    ];
  }

  echo json_encode($res);


  
  header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
?>