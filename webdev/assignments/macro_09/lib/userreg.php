<?php
    include('config.php');
    $db = new SQLite3($dbpath);
    session_start();
    session_regenerate_id();

    $username = SQLite3::escapeString($_POST['username']);
    $sessid = SQLite3::escapeString(session_id());
    
    if(preg_match($blacklist, $username)) {
        echo json_encode(array("error"=>"Inapproriate String"));
        exit();
    }

    if(isset($_COOKIE['PHPSESSID'])) {
        $currID = $_SESSION['id'];
        $db->query("UPDATE users
                SET 
                username = '$username',
                session = '$sessid'
                WHERE session = '$currID'
            ");
    } else {
        $query = "INSERT INTO users (username, password, session) VALUES ('$username', '', '$sessid')";
        $db->query($query);
    }
    

    $_SESSION['username'] = $username;
    $_SESSION['id'] = $sessid;

?>