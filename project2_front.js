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

function validatepswd(){
    const password = document.querySelector('#pw-id');
    let errormsg = ""
    let hasUpperCase = false;

    if (password.length < 8) {
        errormsg += "Password must be more than 8 characters";
    }

}


// Background color picker
const bgColorPicker = document.createElement("input");
bgColorPicker.type = "color";
bgColorPicker.id = "bg-color-picker";

const bgLabel = document.createElement("label");
bgLabel.textContent = "Choose Background Color: ";
bgLabel.appendChild(bgColorPicker);
document.querySelector("form").prepend(bgLabel);

bgColorPicker.addEventListener("input", function () {
    document.body.style.backgroundColor = bgColorPicker.value;
});

// Font color picker
const fontColorPicker = document.createElement("input");
fontColorPicker.type = "color";
fontColorPicker.style.margin = "10px";

const fontLabel = document.createElement("label");
fontLabel.textContent = "Choose Font Color:";
fontLabel.appendChild(fontColorPicker);
document.querySelector("form").prepend(fontLabel);

fontColorPicker.addEventListener("input", (e) => {
    document.body.style.color = e.target.value;
    currentFontColor = e.target.value;
    let currentFontColor = "#000000"; // default color, BLACK.
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


