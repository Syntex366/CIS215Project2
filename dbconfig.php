<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    
    function connectDB(){ # Tyrell made this file
        $database = "dnicker1"; # Your username
        $user = "dnicker1"; # Your username
        $pass = "equation"; # Your password
        $host = "localhost";
        try {
            $db = new PDO("mysql:host=$host;dbname=$database", $user, $pass);
        }
        catch (PDOException $e) {echo $e;}
        return $db; 
    }
?>
