<?php
    ini_set("session.auto_start", "0");
    include('./lib/config.php');
    $db = new SQLite3("./db/Chat.db");

    if(isset($_COOKIE['PHPSESSID'])) {
        session_start();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="scripts/mainscript.js" defer></script>
    <title>Macro Assignment 09</title>
</head>
<body>
    <h1>Let's Chat</h1>
    <main>
        <div class="registration">
            <h2>Login</h2>
            <p>Select a username (5 or more alphanumeric characters):</p>
            <input type="text" name="username" id="usernamefield">
            <input type="submit" id="username-button" value="Start Chatting!">
            <p id="usernameerror" class="error hide">Name too short or invalid characters!</p>
        </div>
        <div class="chat-screen hide">
            <textarea name="chatlog" id="chatlog" cols="75" rows="25" readonly></textarea>
            <br>
            <input id="message-input" type="text" size="63" required>
            <button id="message-button">Send Message</button>
            <p id="messageerror" class="error hide">Message too short</p>
            <br><br>
            <label for="chatselect">Select Chat Room: </label>
            <select name="chatselect" id="chat-select">
                <?php
                    $results = $db->query("SELECT * FROM chats");
                    while($row = $results->fetchArray()) {
                        $id = $row[0];
                        $creator = $row[1];
                        $name = $row[2];
                        print "<option value=\"$id\">$name (by: $creator)</option>";
                    }
                ?>
            </select>
            <button id="changeuser">Change Username</button>
            <br>
            <input type="text" id="chatname" required>
            <button id="addchat">Create Room</button>
        </div>
    </main>
</body>
</html>