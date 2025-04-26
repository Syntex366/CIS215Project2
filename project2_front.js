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

const passwd = document.querySelector("#pw-id");
passwd.addEventListener('input', evalPass);

async function evalPass(event) {
    let userPass = event.target.value;

    const response = await fetch(`project1submit.php?passcde=${userPass}`);

    if (!response.ok) {
        console.error('Network response was not ok');
        return;
    }

    let result = await response.json();

    const feedback = document.querySelector("#feedback");
    if (feedback) {
        feedback.textContent = result["msg"];
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


