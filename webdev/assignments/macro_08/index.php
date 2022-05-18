<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="scripts/postScript.js" defer></script>
    <title>Macro Assignment 08</title>
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

            if($_GET['error'] == "loginfailed") {
                print '<p style="color:red;">Incorrect credentials.</p>';
            }
        ?>
    </header>
    <h1>Discussion Forum</h1>
    <hr>
    <main>
        <a href="#" id="new-post-button">Add New Post</a>
        <?php
            $success = $_GET['success'];
            $error = $_GET['error'];
            if($success) {
                print "<p class=\"success\">Question has been saved</p>";
            } elseif($error == 'failed') {
                print "<p class=\"error\">Missing information, please try again.</p>";
            }
        ?>
        <form action="lib/save.php" method="POST" id="post-form" class="hide">
            <label for="name">Your Name:</label><br>
            <input type="text" name="name" id="namefield" size="40" required><br>
            <label for="title">Post Title:</label><br>
            <input type="text" name="title" id="titlefield" size="40" required><br>
            <label for="question">Question:</label><br>
            <textarea name="question" id="questionfield" cols="39" rows="7" required></textarea><br>
            <input type="submit" value="Submit"><br>
        </form>
    </main>
    <hr>
    <footer>
        <a href="#" id="sortoldest">Sort By Oldest</a> -
        <a href="#" id="sortnewest">Sort By Newest</a>
        <br>
        <div class="post-container"></div>
    </footer>
</body>
</html>