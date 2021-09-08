<?php
    $loaded_img = $_FILES["image"]["tmp_name"];
    
    if(file_exists($loaded_img) && is_uploaded_file($loaded_img)){
        $fileExt= explode("/",  $_FILES["image"]["type"])[1];
        $fileName = uniqid() . "." . $fileExt;


        move_uploaded_file($loaded_img, "../../img/" . $fileName);
        echo json_encode( array("src" => $fileName));
    }
    ?>