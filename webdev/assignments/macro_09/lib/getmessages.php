<?php
    include('config.php');
    $db = new SQLite3($dbpath);
    $chatid = SQLite3::escapeString($_GET['chatid']);
    $results = $db->query("SELECT * FROM messages WHERE chat_id = $chatid ORDER BY id");
    $response = array();

    while($row = $results->fetchArray()) {
        $messObj = array();
        $messObj['name'] = $row[2];
        $messObj['message'] = $row[3];
        array_push($response, $messObj);
    }

    print json_encode($response);
?>