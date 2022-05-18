<?php
    include('config.php');

    session_name('matching10');
    session_start();

    $db = new SQLite3($dbpath);
    
    $username = $_SESSION['username'];
    $user = $db->query("SELECT * FROM users WHERE username = '$username'")->fetchArray();

    $difficulty = SQLite3::escapeString($_POST['diff']);
    $date = time();
    $time = $_POST['matchtime'];

    $sql = "INSERT INTO leaderboard (difficulty, username, date, match_time ) VALUES ('$difficulty', '$username', '$date', '$time')";
    
    $db->query($sql);
?>