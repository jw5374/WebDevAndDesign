<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Micro 07</title>
</head>
<body>
    <a href="logs.php">Log in Logs</a>
    <form method="POST" action="process_07.php"
    <?php
        if($_COOKIE["loggedin"] === "true") {
            print "style=\"display:none;\"";
        }
    ?>
    >
        <br>
        <label for="user">Username (*): </label>
        <input
            <?php 
                if($_GET['emptyuser']) {
                    print "style=\"border: 1px solid red\"";
                }
            ?>
            type="text" name="user" autocomplete="username"
            value="<?php echo $_GET['username']; ?>"
        >
        <?php 
            if($_GET['emptyuser']) {
                print "<span style=\"color: red;\">Must fill out username</span>";
            }
        ?>
        <br><br>
        <label for="pass">Password (*): </label>
        <input 
            <?php 
                if($_GET['emptypass']) {
                    print "style=\"border: 1px solid red\"";
                }
            ?>
            type="password" name="pass" autocomplete="current-password"
        >
        <?php 
            if($_GET['emptypass']) {
                print "<span style=\"color: red;\">Must fill out password</span>";
            }
        ?>  
        <br><br>
        <input type="submit" value="Login">
        <br><br><br>
    </form>
    <p>
        <?php
            if($_COOKIE['loggedin'] === 'true') {
                print 'Welcome Pikachu! You are the chosen one.';
            } else if($_GET['loggedin'] === 'false') {
                print "<span style=\"color: red;\">Incorrect credentials</span>";
            }
        ?>
    </p>
</body>
</html>