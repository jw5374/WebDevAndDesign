<?php
    include('config.php');
    
    $db = new SQLite3($dbpathlib);

    $sorting = $_GET['sort'];
    $querystring = "";
    if($sorting) {
        switch($sorting) {
            case "ASC":
                $querystring = "SELECT * FROM posts ORDER BY time ASC";
                break;
            case "DESC":
                $querystring = "SELECT * FROM posts ORDER BY time DESC";
                break;    
        }
    } else {
        $querystring = "SELECT * FROM posts ORDER BY id";
    }

    $posts = $db->query($querystring);
    $response = array();

    while($row = $posts->fetchArray()) {
        $postObj = array();
        $postObj['id'] = $row[0];
        $postObj['title'] = $row[1];
        $postObj['name'] = $row[3];
        $postObj['time'] = date("F j, Y, g:i a", $row[4]);
        array_push($response, $postObj);
    }

    print json_encode($response);
?>