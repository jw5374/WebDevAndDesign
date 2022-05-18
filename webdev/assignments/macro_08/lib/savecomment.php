<?php
    include('config.php');

    $db = new SQLite3($dbpathlib);

    $postid = SQLite3::escapeString($_POST['postid']);
    $body = SQLite3::escapeString($_POST['comment']);
    $name = SQLite3::escapeString($_POST['name']);
    $time = time();

    $querystring = "INSERT INTO comments (post_id, body, name, time) VALUES ('$postid', '$body', '$name', $time)";
    if($body && $name) {
        $res = $db->query($querystring);
        $changedlines = $db->changes();
        if($changedlines) {
            header($postredirect . "?postid=$postid&success=saved");
        }
    } else {
        header($postredirect . "?postid=$postid&error=failed");
    }

?>