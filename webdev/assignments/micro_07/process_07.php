<?php
    $datestring = date("D M j G:i:s T Y");
    $log = fopen("log.txt", "a");
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $redirect = 'Location: index.php';
    if($username && $password) {
        if(strcmp($username, 'pikachu') === 0 && strcmp($password, 'pokemon') === 0) {
            setcookie('loggedin', "true");
            fwrite($log, $datestring . " - Successful log in\n");
            header($redirect . '?loggedin=true');
        } else {
            fwrite($log, $datestring . " - Unsuccessful log in\n");
            header($redirect . '?loggedin=false');
        }
    } else {
        $querydata = array();
        $loginfo = " - Missing ";
        if(!$username) {
            $querydata['emptyuser'] = 'empty';
            $loginfo .= "username ";
        }
        if(!$password) {
            $querydata['emptypass'] = 'empty';
            $querydata['username'] = $username ? $username : '';
            $loginfo .= "password";
        }
        fwrite($log, $datestring . $loginfo . "\n");
        header($redirect . '?' . http_build_query($querydata));
    }
    fclose($log);
?>
