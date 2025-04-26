/* Character Count Function */

const textAmt = document.getElementById("favorite");
const chars = document.getElementById("char-count");
 
textAmt.addEventListener("input", function() {
    chars.innerHTML = 120 - textAmt.value.length;
    if (chars.innerHTML >= 50) {
        chars.style.display = "none";
    } else {
        chars.style.display = "block";
        if (chars.innerHTML <= 10) {
            chars.parentElement.style.color = 'red';
        } else {
            chars.parentElement.style.color = 'black';
        }
    }
})

/* Password AJAX Function */

const loginButton = document.querySelector("#login-id"); /* grabs the login button */
const passwd = document.querySelector("#pw-id"); /* grabs the password field */
const hideForm = document.querySelector("#form-hider"); /* grabs the div surrounding the reest of the form */

loginButton.addEventListener('click', evalPass); /* login button activates the AJAX command */

async function evalPass(event) { /* checks if the entered password matches the hashed password */
    let userPass = passwd.value; /* gets the value of the password field entry */

    const response = await fetch(`passcheck.php?passcde=${userPass}`); /* fetch to passcheck.php - promise */

    if (!response.ok) { /* response check */
        console.error('Network response was not ok');
        return;
    }

    let result = await response.json(); /*  response return from passcheck.php */

    if (result.msg === "Password is valid") { /* checks if the result value indicates a correct password */
        hideForm.style.display = "block"; /* reveals the hidden portion of the form */
        loginButton.style.display = "none"; /* hides the login button since it is no longer needed */
    } else {
        alert("Invalid password, please try again."); /* error alert for wrong password */
    }
}

/* Highlight Empty Questions Function - adds a red border to a question that has no answer. Border only goes away if the question is given some form of answer, not if you simply interact and fill nothing in */

/* bunch of querySelectors for all the questions - mostly grabs the input box, sometimes grabs a div for questions with multiple inputs */

emailHlight = document.querySelector("#email-id");
passHlight = document.querySelector("#pw-id");
ageHlight = document.querySelector("#age-radios");
genderHlight = document.querySelector("#gender");
versionHlight = document.querySelector("#version");
favoriteHlight = document.querySelector("#favorite");
toughHlight = document.querySelector("#tough");

highlighter = document.querySelector("#button-submit-form-id"); /* calls the highlight function when the submit button is pressed */
highlighter.addEventListener('click', highlight);

async function highlight() { /* checks all the questions and sets a red border around any without an answer */

    if (emailHlight.value.trim() === "") { /* checks if the input box is empty, and sets the border if it is. Same code for every question except age */
        emailHlight.style.border = "2px solid red";
    }

    if (passHlight.value.trim() === "") {
        passHlight.style.border = "2px solid red";
    }

    const radios = ageHlight.querySelectorAll('input[type="radio"][name="age"]'); /* Selects all the radio buttons for the foreach */
    let oneChecked = false; /* helper variable */

    radios.forEach(radio => { /* uses a foreach to go through all the radiobuttons and make sure none are checked. If anything is checked, the helper variable is changed to bypass the border set */
        if (radio.checked) {
            oneChecked = true;
        }
    });
    if (!oneChecked) { /* similar to the code for other questions, just using the helper variable for the check */
        ageHlight.style.border = "2px solid red";
        ageHlight.style.padding = "10px";
    }

    if (genderHlight.value === "") {
        genderHlight.style.border = "2px solid red";
    }

    if (versionHlight.value === "") {
        versionHlight.style.border = "2px solid red";
    }

    if (favoriteHlight.value.trim() === "") {
        favoriteHlight.style.border = "2px solid red";
    }

    if (toughHlight.value === "") {
        toughHlight.style.border = "2px solid red";
    }
}

/* Event Listeners that remove the border when a user interacts with the question */

emailHlight.addEventListener('input', function() { /* detects if the user submitted something into the field. Does not remove the border if they simply interact and enter nothing. Same code for all questions, age slightly differs */
    emailHlight.style.border = "";
});

passHlight.addEventListener('input', function() {
    passHlight.style.border = "";
});

const radios = ageHlight.querySelectorAll('input[type="radio"][name="age"]'); /* detects any radio button selection with a foreach to remove the border instead of detecting input like the others */

radios.forEach(radio => {
    radio.addEventListener('change', function() {
        ageHlight.style.border = "";
    });
});

genderHlight.addEventListener('input', function() {
    genderHlight.style.border = "";
});

versionHlight.addEventListener('input', function() {
    versionHlight.style.border = "";
});

favoriteHlight.addEventListener('input', function() {
    favoriteHlight.style.border = "";
});

toughHlight.addEventListener('input', function() {
    toughHlight.style.border = "";
});



function validatepswd(){
    const password = document.querySelector('#pw-id');
    let errormsg = ""
    let hasUpperCase = false;

    if (password.length < 8) {
        errormsg += "Password must be more than 8 characters";
    }

}


// Background color picker
document.addEventListener("DOMContentLoaded", () => {
    const picker = document.getElementById("bgColorPicker");
    picker.addEventListener("input", (e) => {
        document.body.style.backgroundColor = e.target.value;
    });
});

// Font color picker
document.addEventListener("DOMContentLoaded", () => {
    const picker = document.getElementById("fontColorPicker");
    picker.addEventListener("input", (e) => {
        document.body.style.color = e.target.value;
    });
});

const pwTextBox = document.querySelector("#pw-id");
pwTextBox.addEventListener('keyup', characterCounter);

async function checkpw(event){
  let pwmsg = event.target.parentNode.querySelector(".pw-msg");
  pwmsg.innerText= "";

  let userpw = event.target.value;
  const response = await fetch('pw/project1submit.php?pw=${userpw}');
  console.log("this is the response object: ", response);

  let pwdoesnotwork = await response.json();
  concolse.log("this is the Promise object: ", pwdoesnotwork);

  if(pwdoesnotwork["status"] == 0){
    pwmsg.innertext = pwdoesnotwork["message"];
  }
}


