<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Micro 06</title>
</head>
<body>
    <form method="POST" action="process_06.php">
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
        <p>
            <?php
                if($_GET['loggedin'] === 'true') {
                    print 'Welcome Pikachu! You are the chosen one.';
                } else if($_GET['loggedin'] === 'false') {
                    print "<span style=\"color: red;\">Incorrect credentials</span>";
                }
            ?>
        </p>
    </form>
</body>
</html>