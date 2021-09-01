<?php
    $file = "../../lsdjhkljdbkjfhw9p8r3y872ogfwp;aph93d2-qwhean.html";

    if(file_exists($file)){
        unlink($file);
    } else {
        header("HTTP/1.0 400 Bad Request");
    }
?>