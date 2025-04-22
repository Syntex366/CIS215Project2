/* Character Count Function */

const textAmt = document.getElementById("favorite");
const chars = document.getElementById("char-count");
 
textAmt.addEventListener("input", function() {
    chars.innerHTML = 120 - textAmt.value.length;
    if (chars > 50) {
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