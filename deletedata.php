<?php

require('dbconfig.php');
$db = connectDB();

if(isset($_GET["email"])) {

    $email = trim($_GET["email"]);
}

$emails = $db->prepare("SELECT email FROM project_data");
$emails->execute();

$emailArray = $emails->fetchAll(PDO::FETCH_COLUMN);


$emailCheck = array($email);

if (!(array_diff($emailCheck, $emailArray))) {

    $delete = $db->prepare("DELETE FROM project_data WHERE email = ?");
    $delete->execute([$email]);

    $msg = "Data deleted successfully";
} else {
    $msg = "Email was not found in database";
}

echo json_encode(["msg" => $msg]); /* sends the msg back to the AJAX function */
?>