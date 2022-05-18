<?php
    include('config.php');
    $username = SQLite3::escapeString($_POST['user']);
    $password = SQLite3::escapeString($_POST['pass']);

    $salt = 'zksrxzgqyek0huajp8cgqdranyvd1vc3';

    $hashed_password = md5($password . $salt);

    $db = new SQLite3($dbpath);
    $sql = "SELECT * FROM users WHERE (username = '$username' AND password = '$hashed_password')";

    $result = $db->query($sql)->fetchArray();

    if(!$result) {
        echo "error";
    } else {
        session_name("matching10");
        session_start();
    
        session_regenerate_id();
    
        $_SESSION['loggedin'] = 'yes';
        $_SESSION['username'] = $username;
    }
?>