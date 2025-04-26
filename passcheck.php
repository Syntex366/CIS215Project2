<?php

/* Password AJAX PHP - adapted to using the hashed password */

if (isset($_GET["passcde"])) {
    $hashed_pass = '$2y$10$ViIleDzZvM5nXXfScjwGz.D4GH.CqNabTJ9uoIqydR5.SjmzWuxNi';

    $pass = trim($_GET["passcde"]);

    if (password_verify($pass, $hashed_pass)) {
        $msg = "Password is valid";
    } else {
        $msg = "Password not recognized";
    }

    echo json_encode(["msg" => $msg]);
}
?>

