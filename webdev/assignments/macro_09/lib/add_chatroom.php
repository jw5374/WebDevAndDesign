<?php
    include('config.php');
    $db = new SQLite3($dbpath);

    session_start();
    $username = $_SESSION['username'];
    $chatname = SQLite3::escapeString($_POST['chatname']);
    
    if(preg_match($blacklist, $username) || preg_match($blacklist, $chatname)) {
        echo json_encode(array("error"=>"Inapproriate String"));
        exit();
    }

    $query = "INSERT INTO chats (creator_name, chat_name) VALUES ('$username', '$chatname')";
    $db->query($query);
?>