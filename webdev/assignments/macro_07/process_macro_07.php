<?php
    $redirect = "Location: index.php";

    if($_GET["clearcookie"]) {
        setcookie("characterfound", "", time()-3600);
        header($redirect);
        exit();
    }
    
    $ress = fopen("results.txt", "a");
    $datestring = date("D M j G:i:s T Y");

    $achieve = $_POST['achievement'];
    $descript = $_POST['description'];
    $fear = $_POST['fear'];
    $hobby = $_POST['hobby'];
    $regret = $_POST['regret'];
    $vals = array($achieve, $descript, $fear, $hobby, $regret);
    $chars = array_count_values($vals);
    $max = array(0, "");
    foreach($chars as $character => $count) {
        if($character == "select") {
            header($redirect . "?error=missingfields");
            exit();
        }
        if($count > $max[0]) {
            $max[0] = $count;
            $max[1] = $character;
        }
    }
    setcookie("characterfound", $max[1]);
    fwrite($ress, $datestring . "-" . $max[1] . "\n");
    fclose($ress);
    header($redirect);
?>