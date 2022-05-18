<?php
    if($_COOKIE['matching10']) {
        session_name('matching10');
        session_start();

        setcookie( session_name(), "", time()-3600, "/" );

        session_unset();

        $_SESSION = array();

        session_destroy();
    }
 ?>