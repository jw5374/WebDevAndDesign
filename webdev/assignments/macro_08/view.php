<?php
    include('./lib/config.php');

    $db = new SQLite3($dbpathhome);

    $postid = $_GET['postid'];
    if(!$postid) {
        print "Post not found, please return to <a href=\"index.php\">Home</a> page.";
        exit();
    }
    $post = $db->querySingle("SELECT * FROM posts WHERE id=$postid", true);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="scripts/commentScript.js" defer></script>
    <title>Discussion - <?php print $post['title']; ?></title>
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
                        <input type="text" name="q">
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
                        <input type="text" name="q">
                        <input type="submit" value="Search">
                    </form>
                ';
            }
        ?>
    </header>
    <a href="index.php"><h1>Discussion Forum</h1></a>
    <h2><?php print $post['title']; ?></h2>
    <hr>
    <main>
        <div>
            <p>
                <?php print 'Posted by ' . $post['name'] . ' on ' . date("F j, Y, g:i a", $post['time']); ?>
            </p>
            <p style="padding-left: 3em;">
                <?php print $post['body']; ?>
            </p>
        </div>
        <a href="#" id="new-comment-button">Add Comment</a>
        <?php
            $success = $_GET['success'];
            $error = $_GET['error'];
            if($success) {
                print "<p class=\"success\">Comment has been posted</p>";
            } elseif($error == "failed") {
                print "<p class=\"error\">Missing information, please try again.</p>";
            }
        ?>
        <form action="lib/savecomment.php" method="POST" id="post-comment-form" class="hide">
            <input type="hidden" name="postid" id="postidfield" value="<?php print $postid; ?>">
            <label for="name">Your Name:</label><br>
            <input type="text" name="name" id="namefield" size="40" required><br>
            <label for="comment">Comment:</label><br>
            <textarea name="comment" id="commentfield" cols="39" rows="7" required></textarea><br>
            <input type="submit" value="Submit"><br>
        </form>
    </main>
    <hr>
    <footer>
        <h3>Comments</h3>
        <a href="#" id="sortcommentoldest">Sort By Oldest</a> -
        <a href="#" id="sortcommentnewest">Sort By Newest</a>
        <br>
        <div class="comment-container"></div>
    </footer>
</body>
</html>