<?php
    include "dbconfig.php";

    $sql = ("SELECT * FROM project_data"); /* prepares all data from the database table to be displayed in an HTML table */
    $result = $conn->query($sql);

    $data = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    } 
?>
