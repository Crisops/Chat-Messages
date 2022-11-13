const $inputEmail = document.getElementById("email");
const $spanEmail = document.getElementById("span-email");
const $inputPassword = document.getElementById("password");
const $spanPassword = document.getElementById("span-password");

document.addEventListener("click", (e) =>{
  if (e.target.matches("#email")) {
    $inputEmail.classList.add("focus");
    $spanEmail.classList.add("focus");
  }
  if (e.target.matches("#password")) {
    $inputPassword.classList.add("focus");
    $spanPassword.classList.add("focus");
  }
})