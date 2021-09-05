<?php
    $_POST = json_decode( file_get_contents("php://input"), true);

    $file = $_POST["pageName"];
    $new_html = $_POST["html"];
    $backups = json_decode(file_get_contents("../backups/backups.json"));
    if(!is_array($backups)){
        $backups = [];
    };

    if($new_html && $file){
        $backupFN = uniqid() . ".html";
        copy("../../" . $file, "../backups/" . $backupFN );
        array_push($backups, ["page" => $file, "file" => $backupFN, "time" => date("H:i:s d:m:y")]);
        file_put_contents("../backups/backups.json", json_encode($backups));
        file_put_contents("../../" . $file, $new_html);
    } else {
        header("HTTP/1.0 400 Bad Request");
    }
?>