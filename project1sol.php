<!DOCTYPE html>
<html>
    <head>
        <title>Survey: PHP Questions</title>
    </head>
<body>

<!-- Big takeaways: required keyword, make sure value is in there, feel free to use other attributes! -->

<form action="project1submit.php" method="post" class="survey">
    
<div id="bgColorGoWee">
    <label for="bgColorPicker">Choose Background Color:</label>
    <input type="color" id="bgColorPicker" value="#ffffff">
</div>
<div id="fontColorGoWee">
    <label for="fontColorPicker">Choose Font Color:</label>
    <input type="color" id="fontColorPicker" value="#ffffff">
</div>

<fieldset>

<label>Enter your email: </label>
<input type="email" name="email-name" id="email-id" required>

<label>Enter your password: </label>
<input type="password" name="pw-name" id="pw-id" required><span id="feedback"></span>

<button type="button" name="login" id="login-id">Login</button>

</fieldset>

<div id="form-hider" style="display: none;"> <!-- div that hides the form until the correct password is entered -->

<div id="age-radios">
<label>What age are you? </label>
<div>
<label> <input type="radio" name="age" id="age-0" value="0" required>
0-12 </label>
</div>
<?php

for($i=13;$i<65;$i=$i + 5){
    $j = $i + 4;
    print("<div><label><input type='radio' name='age' id='age-$i'value='$i'>
    $i-$j </label></div>");
}

?>
<div>
<label> <input type="radio" name="age" id="age-68" value="68">
68+ </label>
</div>
</div>

<div id="gender-id">
<select name="gender" id="gender">
    <option value="">--Please select your gender--</option>
    <option value="ma">Male</option>
    <option value="fe">Female</option>
    <option value="nb">Nonbinary</option>
    <option value="gf">Genderfluid</option>
    <option value="ag">Agender</option>
    <option value="ot">Choose not to say/Other</option>
</select>
</div>

<div>
    <label> What version of PHP do you use? (only include the main version number) <input type="number" name="version" id="version" min="1", max="9" required> </label>
</div>

<div>
    <div>
        Please answer in 120 characters or fewer.
    </div>
    <label> What is your favorite part of PHP?     
    <input type=text name="favorite" id="favorite" maxLength="120" required></label>
    <p><span id="char-count" style="display: none;"></span></p>
</div>

<div>
    <h3>Random question:</h3> <!--And this was made so I could have some fun and hopefully make someone smile. Can be changed later.-->
    <p>Welcome to The Salty Spitoon. On a scale of 1-10, how tough are ya?</p>
    <select name="tough" id="tough" size="4"> <!--This is just something silly I wanted to do.-->
        <option value="1">1, I'm Spongebob!</option>
        <option value="2">2, I flinch at the slightest movement</option>
        <option value="3">3, I'm kinda tough.</option>
        <option value="4">4, I'm pretty tough, you know?</option>
        <option value="5">5, I'm in the middle.</option>
        <option value="6">6, I'm up there!</option>
        <option value="7">7, Tough like Patrick. (The dude is a genius you can't tell me otherwise.)</option>
        <option value="8">8, I'm very tough!</option>
        <option value="9">9, Toughest person around!</option>
        <option value="10">10, I ate a bowl full of nails for breakfast. Without any milk!</option>
    </select>
</div>

<button type="submit" name="button-submit-form" id = "button-submit-form-id">Submit</button>

</div> <!-- End of form hider -->

</form>

<div><a href='project1data.php'>View data page here</a></div>

<script src="project2_front.js" defer></script>
</body></html>
