<?php
    include('config.php');
    session_start();
    $db = new SQLite3($dbpath);
    
    $username = $_SESSION['username'];
    $chatid = SQLite3::escapeString($_POST['chatid']);
    $message = SQLite3::escapeString($_POST['message']);

    if(preg_match($blacklist, $message)) {
        echo json_encode(array("error"=>"Inapproriate String"));
        exit();
    }
    
    $query = "INSERT INTO messages (chat_id, name, message) VALUES ('$chatid', '$username', '$message')";
    $db->query($query);
?>