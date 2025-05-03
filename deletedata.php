<?php

require('dbconfig.php'); /* stuff for database link */
$db = connectDB();

if(isset($_GET["email"])) { /* gets the entered email */

    $email = trim($_GET["email"]); /* removes whitespace */
}

$emails = $db->prepare("SELECT email FROM project_data"); /* prep statement for selecting all emails */
$emails->execute();

$emailArray = $emails->fetchAll(PDO::FETCH_COLUMN); /* fetches the emails from the database as an array */


$emailCheck = array($email); /* convert the user entered email into an array */

if (!(array_diff($emailCheck, $emailArray))) { /* check if the user entry is part of the fetched array */

    $delete = $db->prepare("DELETE FROM project_data WHERE email = ?"); /* delete the data of the user email if it is found in the fetched string */
    $delete->execute([$email]);

    $msg = "Data deleted successfully. Reload the page to reset the data display"; /* There's a table displaying database data that I'm not too sure how to connect to the AJAX function so that's why the second part */
} else {
    $msg = "Email was not found in database";
}

echo json_encode(["msg" => $msg]); /* sends the msg back to the AJAX function */
?>