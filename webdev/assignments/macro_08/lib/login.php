<?php
    include("config.php");

    if($_GET["logout"]) {
        setcookie("pikachu", "", time()-3600, "/");
        header($homeredirect);
        exit();
    }

    $username = $_POST['user'];
    $password = $_POST['pass'];
    if($username == 'pikachu' && $password == 'pokemon') {
        setcookie('pikachu', 'loggedin', time() + 60*60*24*30, '/');
        header($homeredirect);
    } else {
        header($homeredirect . "?error=loginfailed");
    }
?>