<!DOCTYPE html>
<html>
    <head>
        <title>PHP Questions: Data</title>
        <link rel="stylesheet" type="text/css" href="Style/style.css">
    </head>
<body>
    <div>
        <label for="searchData"><strong>Search:</strong></label>
        <input type="search" id="searchData" name="sd" placeholder="Search the data page...">
    </div>
    <div id="bgColorGoWee">
        <label for="bgColorPicker">Choose Background Color:</label>
        <input type="color" id="bgColorPicker" value="#ffffff">
    </div>
    <div id="fontColorGoWee">
        <label for="fontColorPicker">Choose Font Color:</label>
        <input type="color" id="fontColorPicker" value="#ffffff">
    </div>

    <?php
        require ('dbconfig.php');
        $db = connectDB();

        $display = $db->prepare("SELECT * FROM project_data"); /* prepares all data from the database table to be displayed in an HTML table */
        $display->execute();
        $data = $display->fetchAll(PDO::FETCH_ASSOC); /* fetches the prepared data */


    ?>

    <table> <!-- Table to display all individual data entries anonymously -->
        <caption>Survey Data</caption>
        <tr>
            <th>Age</th>
            <th>Gender</th>
            <th>PHP Version</th>
            <th>Favorite Part of PHP</th>
            <th>How Tough Are Ya?</th>
        </tr>
        <?php
                        foreach ($data as $row) { /* displays the data previously fetched to the frontend */
                            print("<tr>");
                            print("<td>{$row['age']}</td>");
                            print("<td>{$row['gender']}</td>");
                            print("<td>{$row['version']}</td>");
                            print("<td>{$row['favorite']}</td>");
                            print("<td>{$row['salty']}</td>");
                            print("</tr>");
                        }
                    ?>
    </table>
<?php


/**
 * Gathers age data and puts it in a format to display well on the data page
 */
function age_distribution(){
    global $db;
    $prep_selectage = $db->prepare("SELECT age FROM project_data");
    $prep_selectage->execute();
    $age_data = $prep_selectage->fetchAll();
    $age_array["0-12"] = 0;
    for($i=13;$i<65;$i=$i + 5){
        $j = $i + 4;
        $range = "$i-$j";
        $age_array[$range] = 0;
    }
    $age_array["68+"] = 0;
    # There is almost definitely a way of doing this that takes fewer lines of code. This is just the very simplest way
    for($i=0;$i<count($age_data);$i++){
        switch($age_data[$i]["age"]){
            case "0":
                $age_array["0-12"]++;
                break;
            case 13:
                $age_array["13-17"]++;
                break;
            case 18:
                $age_array["18-22"]++;
                break;
            case 23:
                $age_array["23-27"]++;
                break;
            case 28:
                $age_array["28-32"]++;
                break;
            case 33:
                $age_array["33-37"]++;
                break;
            case 38:
                $age_array["38-42"]++;
                break;
            case 43:
                $age_array["43-47"]++;
                break;
            case 48:
                $age_array["48-52"]++;
                break;
            case 53:
                $age_array["53-57"]++;
                break;
            case 58:
                $age_array["58-62"]++;
                break;
            case 63:
                $age_array["63-67"]++;
                break;
            default:
                $age_array["68+"]++;
                break;
        }
    }

    # average age was NOT required, but here's a rough estimate
    $count = 0;
    $sum = 0;
    $othersCount = 0;
    # we'll only count the small ranges since that's easier to make assumptions about.
    foreach($age_array as $range => $num){
        if($range == "0-12" or $range == "68+"){
            $othersCount += $num;
        } else{
            $count += $num;
            $start = (int)substr($range, 0, 2);
            $middle = $start + 2;  # each range is 5 integers (including start and end), so the mid point is the start plus 2
            $sum += $middle*$num; # add this n times where n is the number of people in this range
        }
    }
    $average = $sum / $count;
    $age_array["A rough average"] = $average;
    $age_array["Number of people outside of this average"] = $othersCount;
    return $age_array;
}

/**
 * Gathers gender data and puts it in a format to display well on the data page
 */
function gender_distribution(){
    global $db;
    $prep_selectgen = $db->prepare("SELECT gender FROM project_data");
    $prep_selectgen->execute();
    $gender_data = $prep_selectgen->fetchAll();
    $gender_array["Male"] = 0;
    $gender_array["Female"] = 0;
    $gender_array["Nonbinary"] = 0;
    $gender_array["Genderfluid"] = 0;
    $gender_array["Agender"] = 0;
    $gender_array["Choose Not to Say/Other"] = 0;
    for($i=0;$i<count($gender_data);$i++){
        switch($gender_data[$i]["gender"][0]){
            case "m":
                $gender_array["Male"]++;
                break;
            case "f":
                $gender_array["Female"]++;
                break;
            case "n":
                $gender_array["Nonbinary"]++;
                break;
            case "g":
                $gender_array["Genderfluid"]++;
                break;
            case "a":
                $gender_array["Agender"]++;
                break;
            default:
                $gender_array["Choose Not to Say/Other"]++;
                break;
        }
    }
    return $gender_array;
}

/**
 * Gathers version data and puts it in a format to display well on the data page
 */
function version_distribution(){
    global $db;
    $prep_selectver = $db->prepare("SELECT `version` FROM project_data");
    $prep_selectver->execute();
    $version_data = $prep_selectver->fetchAll();
    # I'm going to create the array and calculate the mode in one loop so it doesn't have to loop again!
    # This could also be done with the other functions, but efficiency is not something I necessarily consider (unless it's really bad or there's an obvious fix)
    $version_array = [0,0,0,0,0,0,0,0,0,0];
    $mode_s = [-1];
    $count = 0;
    $is_tied = false;
    for($i=0;$i<count($version_data);$i++){  # this could be done with a foreach loop, see if you can figure out how!
        if(is_numeric($version_data[$i]["version"])){
            $j = (int)$version_data[$i]["version"];
            if($j > 0 && $j < 10){
                $version_array[$j]++;
                if($version_array[$j] > $count){  #if there are more js than the current count, update the count and the current mode!
                    $count = $version_array[$j];
                    $mode_s = [$j];
                    $is_tied = false;
                } else if($version_array[$j] == $count){
                    $is_tied = true;
                    $mode_s[] = $j;
                }
            }
        }
    }
    if($is_tied){
        $versions = "";
        asort($mode_s);  # sort it first
        foreach($mode_s as $value){
            $versions .= "$value, ";
        }
        $versions = substr($versions, 0, -2); # this will remove the last comma and space!
        $version_array["Most popular versions"] = $versions;
    } else{
        if($mode_s[0] != -1){
            $version_array["Most popular version"] = $mode_s[0];
        }
    }
    return $version_array;
}

/**
 * Gathers favorite data and puts it in a format to display well on the data page
 */
function favorite_thing(){
    global $db;
    $prep_selectfav = $db->prepare("SELECT favorite FROM project_data ORDER BY RAND() LIMIT 5");
    $prep_selectfav->execute();
    $favorite_data = $prep_selectfav->fetchAll();
    $favorite_testimonies = [];
    for($i=0;$i<5;$i++){  # limit either by doing the limit 5 or only doing 5 loops!
        $favorite_testimonies []= htmlentities($favorite_data[$i]["favorite"]);
    }
    return $favorite_testimonies;
}

/**
 * Gathers tough data and puts it in a format to display well on the data page
 */
function tough_data(){
    global $db;
    $prep_selecttou = $db->prepare("SELECT salty FROM project_data");
    $prep_selecttou->execute();
    $tough_data = $prep_selecttou->fetchAll();
    $tough_array["1, I'm Spongebob!"] = 0;
    $tough_array["2, I flinch at the slightest movement"] = 0;
    $tough_array["3, I'm kinda tough."] = 0;
    $tough_array["4, I'm pretty tough, you know?"] = 0;
    $tough_array["5, I'm in the middle."] = 0;
    $tough_array["6, I'm up there!"] = 0;
    $tough_array["7, Tough like Patrick. (The dude is a genius you can't tell me otherwise.)"] = 0;
    $tough_array["8, I'm very tough!"] = 0;
    $tough_array["9, Toughest person around!"] = 0;
    $tough_array["10, I ate a bowl full of nails for breakfast. Without any milk!"] = 0;
    #print ($tough_data[0]["Salty"]);
    for($i=0;$i<count($tough_data);$i++){
        switch($tough_data[$i]["Salty"]){
            case "2":
                $tough_array["2, I flinch at the slightest movement"]++;
                break;
            case "3":
                $tough_array["3, I'm kinda tough."]++;
                break;
            case "4":
                $tough_array["4, I'm pretty tough, you know?"]++;
                break;
            case "5":
                $tough_array["5, I'm in the mi"]++;
                break;
            case "6":
                $tough_array["6, I'm up there!"]++;
                break;
            case "7":
                $tough_array["7, Tough like Patrick. (The dude is a genius you can't tell me otherwise.)"]++;
                break;
            case "8":
                $tough_array["8, I'm very tough!"]++;
                break;
            case "9":
                $tough_array["9, Toughest person around!"]++;
                break;
            case "10":
                $tough_array["10, I ate a bowl full of nails for breakfast. Without any milk!"]++;
                break;
            default:
                $tough_array["1, I'm Spongebob!"]++;
                break;
        }
    }
    return $tough_array;
}
/*
Takes password hash from users and stores it in table.
*/
function hash_pass(){
    $hash = $db->prepare("INSERT INTO project_data (hash) VALUES (?)");
    $hash->execute();
}
/**
 * pretty_display makes the data display nicely for users
 * This could be improved for CSS/Bootstrap extra credit
 * As a note: I also built this backend to work with this sort of function in mind, because I dislike doing the HTML stuff. You could have had ugly names in your arrays, you just would have needed to sort it out when it came to displaying the data!
 */
function pretty_display($data_array){
    print("<div>");
    foreach($data_array as $key => $value){
        print("<div>$key: $value</div>");
    }
    print("</div>");
}

print("<h1>Survey Data</h1>");

$prep_selectnum = $db->prepare("SELECT count(email) FROM project_data");
$prep_selectnum->execute();
$num_data = $prep_selectnum->fetchAll();
$num = $num_data[0][0];

print("<h2>Number of respondents:</h2>");
print("<div>$num</div>");
print("<h2>Age Data:</h2>");
pretty_display(age_distribution());
print("<h2>Gender Data:</h2>");
pretty_display(gender_distribution());
print("<h2>PHP Version Data:</h2>");
pretty_display(version_distribution());


print("<h2>Favorite thing about PHP:</h2>");
print("<div>");
foreach(favorite_thing() as $value){
    print("<div>$value</div>");
}
print("</div>");

print("<div>");
print("<h2>Salty Spitoon Data:</h2>");
pretty_display(tough_data());
print("</div>");

?>

<button type="button" name="delete-btn" id="delete-data">Delete My Data</Button>
    <input type="email" name="email-dlt" id="email-delete" required>

</body></html>
