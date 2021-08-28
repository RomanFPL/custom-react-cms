<?php
    $_POST = json_decode( file_get_contents("php://input"), true);

    $file = "../../" . $_POST["pageName"];
    $new_html = $_POST["html"];

    if($new_html && $file){
        file_put_contents($file, $new_html);
    } else {
        header("HTTP/1.0 400 Bad Request");
    }
?>