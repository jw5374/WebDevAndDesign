<?php
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $redirect = 'Location: index.php';
    if($username && $password) {
        if(strcmp($username, 'pikachu') === 0 && strcmp($password, 'pokemon') === 0) {
            header($redirect . '?loggedin=true');
        } else {
            header($redirect . '?loggedin=false');
        }
    } else {
        $querydata = array();
        if(!$username) {
            $querydata['emptyuser'] = 'empty';
        }
        if(!$password) {
            $querydata['emptypass'] = 'empty';
            $querydata['username'] = $username ? $username : '';
        }
        header($redirect . '?' . http_build_query($querydata));
    }
?>
