<?php
    include('config.php');
    
    $db = new SQLite3($dbpathlib);
    
    $postid = $_GET['postid'];
    $sorting = $_GET['sort'];
    $querystring = "";
    if($sorting) {
        switch($sorting) {
            case "ASC":
                $querystring = "SELECT * FROM comments WHERE post_id=$postid ORDER BY time ASC";
                break;
            case "DESC":
                $querystring = "SELECT * FROM comments WHERE post_id=$postid ORDER BY time DESC";
                break;    
        }
    } else {
        $querystring = "SELECT * FROM comments WHERE post_id=$postid ORDER BY id";
    }

    $comments = $db->query($querystring);
    $response = array();

    while($row = $comments->fetchArray()) {
        $commentObj = array();
        $commentObj['id'] = $row[0];
        $commentObj['body'] = $row[2];
        $commentObj['name'] = $row[3];
        $commentObj['time'] = date("F j, Y, g:i a", $row[4]);
        array_push($response, $commentObj);
    }

    print json_encode($response);
?>