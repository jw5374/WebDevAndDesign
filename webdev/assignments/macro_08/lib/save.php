<?php
    include('config.php');

    $db = new SQLite3($dbpathlib);

    $title = SQLite3::escapeString($_POST['title']);
    $body = SQLite3::escapeString($_POST['question']);
    $name = SQLite3::escapeString($_POST['name']);
    $time = time();

    $querystring = "INSERT INTO posts (title, body, name, time) VALUES ('$title', '$body', '$name', $time)";
    if($title && $body && $name) {
        $res = $db->query($querystring);
        $changedlines = $db->changes();
        if($changedlines) {
            header($homeredirect . "?success=saved");
        }
    } else {
        header($homeredirect . "?error=failed");
    }

?>