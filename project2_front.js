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
