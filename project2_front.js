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

const loginButton = document.querySelector("#login-id");
const passwd = document.querySelector("#pw-id");
const hideForm = document.querySelector("#form-hider");

loginButton.addEventListener('click', evalPass);

async function evalPass(event) {
    let userPass = passwd.value;

    const response = await fetch(`passcheck.php?passcde=${userPass}`);

    if (!response.ok) {
        console.error('Network response was not ok');
        return;
    }

    let result = await response.json();

    if (result.msg === "Password is valid") {
        hideForm.style.display = "block";
        loginButton.style.display = "none";
    } else {
        alert("Invalid password, please try again.");
    }
}

/* Highlight Empty Questions Function - adds a red border to a question that has no answer. Border only goes away if the question is given some form of answer, not if you simply interact and fill nothing in */

emailHlight = document.querySelector("#email-id");
passHlight = document.querySelector("#pw-id");
ageHlight = document.querySelector("#age-radios");
genderHlight = document.querySelector("#gender");
versionHlight = document.querySelector("#version");
favoriteHlight = document.querySelector("#favorite");
toughHlight = document.querySelector("#tough");

highlighter = document.querySelector("#button-submit-form-id");
highlighter.addEventListener('click', highlight);

async function highlight() {

    if (emailHlight.value.trim() === "") {
        emailHlight.style.border = "2px solid red";
    }

    if (passHlight.value.trim() === "") {
        passHlight.style.border = "2px solid red";
    }

    const radios = ageHlight.querySelectorAll('input[type="radio"][name="age"]');
    let oneChecked = false;

    radios.forEach(radio => {
        if (radio.checked) {
            oneChecked = true;
        }
    });

    if (!oneChecked) {
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

emailHlight.addEventListener('input', function() {
    emailHlight.style.border = "";
});

passHlight.addEventListener('input', function() {
    passHlight.style.border = "";
});

const radios = ageHlight.querySelectorAll('input[type="radio"][name="age"]');

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


