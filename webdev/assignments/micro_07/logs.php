<?php
    $log = file_get_contents("log.txt");
    $arraylog = explode("\n", $log);

    print implode("<br>", $arraylog);
?>