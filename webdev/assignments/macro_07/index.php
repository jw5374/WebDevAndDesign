<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Macro Assignment 07</title>
    <style>
        body {
            font-family: sans-serif;
        }
        
        .charcontainer {
            border: 2px solid black;
            border-radius: 10px;
            width: 400px;
            height: auto;
            margin: 0 auto;
            text-align: center;
            padding: 1em;
        }

        .charcontainer img {
            display: block;
            margin: 10% auto;
        }
    </style>
</head>
<body>
    <h1>Which Simpsons Character Am I?</h1>
    <hr>
    <?php
        $character = $_COOKIE["characterfound"];
        $character = ucwords($character);
        if($character) {
            print "
                <div class=\"charcontainer\">
                    <p>You are $character!</p>
                    <img src=\"../../assets/assignment07_images/$character.png\">
                    <a href=\"process_macro_07.php?clearcookie=true\">Take Quiz Again</a>
                </div>
            ";
        } elseif($_GET["error"] == "missingfields") {
            print "<span style=\"color:red;\">You did not answer every question, please completely fill the form.</span><br>";
        }
    ?>
    <form 
        <?php
            if($_COOKIE["characterfound"]) {
                print "style=\"display:none;\"";
            }
        ?>
        method="POST" action="process_macro_07.php"
    >
        <label for="achievement">What is your greatest achievement in life</label><br>
        <select name="achievement">
            <option value="select">Select an Answer</option>
            <option value="homer">Securing awards</option>
            <option value="marge">Maintaining a happy family</option>
            <option value="bart">Handling challenges</option>
            <option value="lisa">Pursuit of knowledge</option>
        </select>
        <br><br>
        <label for="description">What describes you best?</label><br>
        <select name="description">
            <option value="select">Select an Answer</option>
            <option value="marge">A natural leader</option>
            <option value="bart">Ready to try anything once</option>
            <option value="homer">The ultimate realist</option>
            <option value="lisa">An inspiration to others</option>
        </select>
        <br><br>
        <label for="fear">What's your greatest fear?</label><br>
        <select name="fear">
            <option value="select">Select an Answer</option>
            <option value="homer">Fear of failure</option>
            <option value="lisa">Fear of who you really are</option>
            <option value="bart">Fear of being judged</option>
            <option value="marge">Fear of time</option>
        </select>
        <br><br>
        <label for="hobby">What's your hobby?</label><br>
        <select name="hobby">
            <option value="select">Select an Answer</option>
            <option value="bart">Sports</option>
            <option value="homer">Blogging</option>
            <option value="marge">Reading</option>
            <option value="lisa">Music</option>
        </select>
        <br><br>
        <label for="regret">Lastly, what's your biggest regret?</label><br>
        <select name="regret">
            <option value="select">Select an Answer</option>
            <option value="homer">Working too much</option>
            <option value="marge">Worrying too much</option>
            <option value="lisa">Not following your passion</option>
            <option value="bart">Taking life too seriously</option>
        </select>
        <br><br><br>
        <input type="submit" value="What Simpsons Character am I?">
    </form>
    <hr>
    <a href="results.php">See Aggregate Results</a>
</body>
</html>