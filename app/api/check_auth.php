<?php
    session_start(); 
    if(isset($_SESSIONS["auth"])){
        echo json_encode(array("auth" => true));
    } else{
        echo json_encode(array("auth" => false));
    }
?>