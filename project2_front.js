/* Character Count Function */

const textAmt = document.querySelector("#favorite"); /* grabs the text inside the favorite textbox */
const chars = document.querySelector("#char-count"); /* grabs the span element for displaying the char count */
 
if (textAmt && chars) { /* checks if the querySelector variables exist. Avoids issues with using the JS file on multiple pages. Used on most of the other event listeners */
textAmt.addEventListener("input", function() { /* checks if the user has less than 50 characters and starts displaying the count as they type. Turns red when less than 10 characters remain. */
    chars.innerHTML = 120 - textAmt.value.length; /* the chars-remaining calculation */
        if (chars.innerHTML >= 50) { /* activates the display of the count when below 50 */
            chars.style.display = "none";
        } else {
            chars.style.display = "block";
            if (chars.innerHTML <= 10) { /* sets text to red below 10 characters */
                chars.parentElement.style.color = 'red';
            } else {
                chars.parentElement.style.color = 'black'; /* makes sure the text goes back to black if the user erases above 10 characters */
            }
        }
    })
}

/* Password AJAX Function */

const loginButton = document.querySelector("#login-id"); /* grabs the login button */
const passwd = document.querySelector("#pw-id"); /* grabs the password field */
const hideForm = document.querySelector("#form-hider"); /* grabs the div surrounding the reest of the form */

if (loginButton) {
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

if (highlighter) {
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
}



/* Other Textbox Function - Displays a textbox to enter a custom gender option when the "choose not to say/other" selection is made */

const genderSelect = document.querySelector("#gender"); /* grabs the select pane */
const otherText = document.querySelector("#other-text"); /* grabs the other textbox */

if (genderSelect) {
genderSelect.addEventListener('change', otherOptionPick); /* event listener */

    async function otherOptionPick(event) { /* hides and reveals the textbox appropriately depending on the other option's selection. Also changes the name value of the div to override the select pane when needed */
        let select = event.target.value;

        if (select === "ot") {
            otherText.style.display = "block";
            otherText.name = "gender";
        } else {
            otherText.style.display = "none";
            otherText.name = ""; 
        }  
    }
}



/* Delete Data AJAX Function - Takes an email from the user on the data page and if that email can be found in the database, the data associated with that email is deleted from the table */

const deleteButton = document.querySelector("#delete-data"); /* grabs the delete button */
const email = document.querySelector("#email-delete"); /* grabs the email from the input box */

if (deleteButton) {
    deleteButton.addEventListener('click', deleteData);

    async function deleteData(event) { /* sends a fetch request to the deletedata.php file, which further fetches the table data and uses array_diff to compare for matching emails */
        let emailToDelete = email.value;
    
            if (!(emailToDelete === "")) { /* prevents the fetch when nothing is typed in */

                const response = await fetch(`deletedata.php?email=${emailToDelete}`); /* fetch to deletedata.php */

                if (!response.ok) { /* response validation */
                    console.error("network response was not ok");
                    return;
                }

                let result = await response.json(); /* response return */

            alert(result.msg); /* display message alerting the user to the state of their data deletion request */
        }
    }
}



function validatepswd(){
    const password = document.querySelector('#pw-id');
    let errormsg = ""
    let hasUpperCase = false;

    if (password.length < 8) {
        errormsg += "Password must be more than 8 characters";
    }

}


// 1a. Background color picker
const bgPicker = document.getElementById("bgColorPicker");
bgPicker.addEventListener("input", (e) => {
    document.body.style.backgroundColor = e.target.value;
});

// 1b. Font color picker
const fontPicker = document.getElementById("fontColorPicker");
fontPicker.addEventListener("input", (e) => {
    document.body.style.color = e.target.value;
});

const pwTextBox = document.querySelector("#pw-id");

if (pwTextBox) {
pwTextBox.addEventListener('keyup', characterCounter);

    async function checkpw(event){
        let pwmsg = event.target.parentNode.querySelector(".pw-msg");
        pwmsg.innerText= "";

        let userpw = event.target.value;
        const response = await fetch('pw/project1submit.php?pw=${userpw}');
        console.log("this is the response object: ", response);

        let pwdoesnotwork = await response.json();
        console.log("this is the Promise object: ", pwdoesnotwork);

        if(pwdoesnotwork["status"] == 0){
            pwmsg.innertext = pwdoesnotwork["message"];
        }
    }
}

// Quinton code for front end validation
document.querySelectorAll("error").forEach(errormessage) {
    errorText = ""
}
let validinput= true;

const emaill = documentgetElementById("email-id").value;
if (emaill == ""){
    validinput= false;
    documentgetElementById("erroremail").textContent = "Enter valid email";
};

const passssss = documentgetElementById("pw-id").value;
if (passssss == ""){
    validinput= false;
    documentgetElementById("passerror").textContent = "Enter valid password";
};

// Tooltips JS- Quinton
function showtooltip(tooltip){
    tooltip.style.display = "block";
}
document.querySelectorAll('aria-describedby').forEach(function(element){
    const tooltip= document.querySelector(tooltip);
});
    

element.addEventListener('mouseenter', function() {
    showtooltip(tooltip);
});
