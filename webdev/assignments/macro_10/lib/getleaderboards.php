<?php
    include('config.php');
    
    $db = new SQLite3($dbpath);
    
    $userscores = array();
    if(isset($_COOKIE["matching10"])) {
        session_name("matching10");
        session_start();
        $username = $_SESSION['username'];
        $scores = $db->query("SELECT * FROM leaderboard WHERE username = '$username' ORDER BY match_time ASC LIMIT 25");
        while($row = $scores->fetchArray()) {
            $scoreObj = array();
            $scoreObj['difficulty'] = $row[0];
            $scoreObj['date'] = date("F j, Y, g:i a", $row[2]);
            $scoreObj['matchtime'] = $row[3];
            array_push($userscores, $scoreObj);
        }
    }

    $easyscores = array();
    $mediumscores = array();
    $hardscores = array();

    $easyquery = $db->query("SELECT * FROM leaderboard WHERE difficulty = 'easy' ORDER BY match_time ASC LIMIT 10");
    $medquery = $db->query("SELECT * FROM leaderboard WHERE difficulty = 'medium' ORDER BY match_time ASC LIMIT 10");
    $hardquery = $db->query("SELECT * FROM leaderboard WHERE difficulty = 'hard' ORDER BY match_time ASC LIMIT 10");
    
    while($row = $easyquery->fetchArray()) {
        $scoreObj = array();
        $scoreObj['user'] = $row[1];
        $scoreObj['difficulty'] = $row[0];
        $scoreObj['date'] = date("F j, Y, g:i a", $row[2]);
        $scoreObj['matchtime'] = $row[3];
        array_push($easyscores, $scoreObj);
    }

    while($row = $medquery->fetchArray()) {
        $scoreObj = array();
        $scoreObj['user'] = $row[1];
        $scoreObj['difficulty'] = $row[0];
        $scoreObj['date'] = date("F j, Y, g:i a", $row[2]);
        $scoreObj['matchtime'] = $row[3];
        array_push($mediumscores, $scoreObj);
    }

    while($row = $hardquery->fetchArray()) {
        $scoreObj = array();
        $scoreObj['user'] = $row[1];
        $scoreObj['difficulty'] = $row[0];
        $scoreObj['date'] = date("F j, Y, g:i a", $row[2]);
        $scoreObj['matchtime'] = $row[3];
        array_push($hardscores, $scoreObj);
    }

    $response = array();
    array_push($response, $easyscores);
    array_push($response, $mediumscores);
    array_push($response, $hardscores);
    array_push($response, $userscores);

    echo json_encode($response);
?>