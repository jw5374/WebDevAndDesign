<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Results</title>
    <?php
        $ress = file_get_contents("results.txt");
        $entries = explode("\n", $ress);
        array_pop($entries);
        $entrycount = count($entries);
        if($entrycount < 1) {
            exit();
        }
        $homercount = 0;
        $margecount = 0;
        $bartcount = 0;
        $lisacount = 0;
        foreach($entries as $character) {
            $char = explode("-", $character);
            switch($char[1]) {
                case "homer":
                    $homercount += 1;
                    break;
                case "marge":
                    $margecount += 1;
                    break;
                case "bart":
                    $bartcount += 1;
                    break;
                case "lisa":
                    $lisacount += 1;
                    break;
            }
        }
    ?>
    <style>
        body {
            font-family: sans-serif;
        }

        .graphcontainer {
            display: block;
            width: 100vw;
        }

        .graphbarcont {
            position: relative;
            height: 5em;
            width: 100vw;
        }

        .graphbarcont span {
            position: absolute;
            width: 100%;
            text-align: center;
            line-height: 5em;
            z-index: 1;
        }

        .homerbar, .margebar, .bartbar, .lisabar {
            position: absolute;
            inset-block: 2px;
            border: 2px solid black;
            z-index: 0;
        }

        .homerbar {
            background-color: skyblue;
            left: 0;
            right: 
                <?php
                    print abs(($homercount/$entrycount * 100) - 100) . "%";
                ?>;
        }

        .margebar {
            background-color: gold;
            left: 0;
            right: 
                <?php
                    print abs(($margecount/$entrycount * 100) - 100) . "%";
                ?>;
        }

        .bartbar {
            background-color: green;
            left: 0;
            right: 
                <?php
                    print abs(($bartcount/$entrycount * 100) - 100) . "%";
                ?>;
        }

        .lisabar {
            background-color: lightpink;
            left: 0;
            right: 
                <?php
                    print abs(($lisacount/$entrycount * 100) - 100) . "%";
                ?>;
        }
    </style>
</head>
<body>
    <h1>Simpsons Quiz Results</h1>
    <?php
        print "
            In total there have been $entrycount quiz submission(s)
        ";
    ?>
    <div class="graphcontainer">
        <div class="graphbarcont">
            <span>
                Homer 
                <?php
                    print number_format(($homercount/$entrycount * 100), 2) . "%";
                ?>
            </span>
            <div class="homerbar"></div>
        </div>
        <div class="graphbarcont">
            <span>
                Marge
                <?php
                    print number_format(($margecount/$entrycount * 100), 2) . "%";
                ?>
            </span>
            <div class="margebar"></div>
        </div>
        <div class="graphbarcont">
            <span>
                Bart
                <?php
                    print number_format(($bartcount/$entrycount * 100), 2) . "%";
                ?>
            </span>
            <div class="bartbar"></div>
        </div>
        <div class="graphbarcont">
            <span>
                Lisa
                <?php
                    print number_format(($lisacount/$entrycount * 100), 2) . "%";
                ?>
            </span>
            <div class="lisabar"></div>
        </div>
    </div>
    <br>
    <a href="index.php" style="display:block;text-align:center;">Back to Quiz</a>
</body>
</html>

