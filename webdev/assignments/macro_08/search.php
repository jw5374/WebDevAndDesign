<?php
    include('./lib/config.php');

    $db = new SQLite3($dbpathhome);

    $query = $_GET['q'];
    $resultPosts = $db->query("
        SELECT * FROM posts WHERE 
            title LIKE '%$query%' OR 
            body LIKE '%$query%' OR 
            name LIKE '%$query%'
    ");

    $resultComments = $db->query("
        SELECT * FROM comments WHERE 
            body LIKE '%$query%' OR 
            name LIKE '%$query%'
    ");

    $response = array();

    while($row = $resultPosts->fetchArray()) {
        $queryObj = array();
        $queryObj['id'] = $row['id'];
        $queryObj['title'] = $row['title'];
        $queryObj['body'] = $row['body'];
        $queryObj['name'] = $row['name'];
        $queryObj['time'] = date("F j, Y, g:i a", $row['time']);
        $queryObj['timestamp'] = $row['time'];
        $queryObj['querystring'] = "$query";
        array_push($response, $queryObj);
    }
    
    while($row = $resultComments->fetchArray()) {
        $queryObj = array();
        $queryObj['id'] = $row['id'];
        $queryObj['postid'] = $row['post_id'];
        $queryObj['body'] = $row['body'];
        $queryObj['name'] = $row['name'];
        $queryObj['time'] = date("F j, Y, g:i a", $row['time']);
        $queryObj['timestamp'] = $row['time'];
        $queryObj['querystring'] = "$query";
        array_push($response, $queryObj);
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script>
        let results = <?php echo json_encode($response); ?>
    </script>
    <script src="scripts/searchScript.js" defer></script>
    <title>Search Results</title>
</head>
<body>
<header>
        <?php
            if($_COOKIE['pikachu']) {
                print '
                    <form method="GET" action="lib/login.php">
                        <input type="hidden" name="logout" value="logout">
                        <input type="submit" value="Logout">
                    </form>
                    <form method="GET" action="search.php" id="search-form">
                        <input type="text" name="q" value="' . $query .'">
                        <input type="submit" value="Search">
                    </form>
                ';
            } else {
                print '
                    <form method="POST" action="lib/login.php" id="login-form">
                        <label for="user">Username: </label>
                        <input type="text" name="user" id="usernameinput"><br>
                        <label for="pass">Password: </label>
                        <input type="password" name="pass" id="passwordinput"><br>
                        <input type="submit" value="Login">
                    </form>
                    <form method="GET" action="search.php" id="search-form">
                        <input type="text" name="q" value="' . $query .'">
                        <input type="submit" value="Search">
                    </form>
                ';
            }
        ?>
    </header>
    <a href="index.php"><h1>Discussion Forum</h1></a>
    <h2>Search Results</h2>
    <hr>
    <a href="#" id="sortsearcholdest">Sort By Oldest</a> -
    <a href="#" id="sortsearchnewest">Sort By Newest</a> -
    <select name="searchfilter" id="searchfilter">
        <option value="posts-comments" default>Posts and Comments</option>
        <option value="posts">Posts</option>
        <option value="comments">Comments</option>
    </select>
    <br>
    <div class="queryresults"></div>
    <hr>
</body>
</html>