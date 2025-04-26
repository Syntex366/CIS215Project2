<?php

/* Password AJAX PHP - adapted to using the hashed password */

if (isset($_GET["passcde"])) { /* gets the entered password */
    $hashed_pass = '$2y$10$ViIleDzZvM5nXXfScjwGz.D4GH.CqNabTJ9uoIqydR5.SjmzWuxNi';

    $pass = trim($_GET["passcde"]); /* gets rid of erroneous whitespace */

    if (password_verify($pass, $hashed_pass)) { /* checks if the entered password is the same as the valid hashed password */
        $msg = "Password is valid";
    } else {
        $msg = "Password not recognized";
    }

    echo json_encode(["msg" => $msg]); /* sends the msg back to the AJAX function */
}
?>

