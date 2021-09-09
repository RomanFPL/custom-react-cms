<?php
    session_start(); 
    if($_SESSIONS["auth"]==true){
        echo json_encode(array("auth" => true));
    } else{
        echo json_encode(array("auth" => false));
    }
?>