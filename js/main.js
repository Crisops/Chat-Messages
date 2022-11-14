const $inputEmail = document.getElementById("email");
const $spanEmail = document.getElementById("span-email");
const $inputPassword = document.getElementById("password");
const $spanPassword = document.getElementById("span-password");
const $spanLast = document.getElementById("sign_span-lastName");




async function getLogin(){

  let $containerForm = document.getElementById("data-form");
  let response = await fetch("components/login.html");
  let jsonText = await response.text(response);
  $containerForm.outerHTML = jsonText;
  localStorage.setItem("user", "login");
}

async function getSignUp(){
  
  let $containerForm = document.getElementById("data-form");
  let response = await fetch("components/sign-up.html");
  let jsonText = await response.text(response);

  console.log(jsonText);

  $containerForm.innerHTML = "";
  $containerForm.outerHTML = jsonText;
}


async function getChats(){
  
  let $containerForm = document.getElementById("container-form");
  let response = await fetch("components/chat.html");
  let jsonText = await response.text(response);

  console.log(jsonText);

  $containerForm.innerHTML = "";
  $containerForm.outerHTML = jsonText;
  localStorage.setItem("user", "user");
}




function focusInput(e){
  if (e.target.matches(".login-form #email")) {
    $inputEmail.classList.add("focus");
    $spanEmail.classList.add("focus");
  }
  if (e.target.matches(".login-form #password")) {
    $inputPassword.classList.add("focus");
    $spanPassword.classList.add("focus");
  }

  if (e.target.matches(".login-form.login #email")) {
    let $spanEmail = document.getElementById("span-email");
    let $inputEmail = document.getElementById("email");
    $inputEmail.classList.add("focus");
    $spanEmail.classList.add("focus");
  }
  if (e.target.matches(".login-form.login #password")) {
    let $inputPassword = document.getElementById("password");
    let $spanPassword = document.getElementById("span-password");
    $inputPassword.classList.add("focus");
    $spanPassword.classList.add("focus");
  }

  if (e.target.matches(".data-form.sign_up #name")) {
    let $inputName = document.getElementById("name");
    let $spanName = document.getElementById("span-name");
    $inputName.classList.add("focus");
    $spanName.classList.add("focus");
  }

  if (e.target.matches(".data-form.sign_up #lastName")) {
    let $inputLastName = document.getElementById("lastName");
    let $spanLastName = document.getElementById("span-lastName");
    $inputLastName.classList.add("focus");
    $spanLastName.classList.add("focus");
  }

  if (e.target.matches(".data-form.sign_up #email")) {
    let $inputEmail = document.getElementById("email");
    let $spanEmail = document.getElementById("span-email");
    $inputEmail.classList.add("focus");
    $spanEmail.classList.add("focus");
  }

  if (e.target.matches(".data-form.sign_up #password")) {
    let $inputPassword = document.getElementById("password");
    let $spanPassword = document.getElementById("span-password");
    $inputPassword.classList.add("focus");
    $spanPassword.classList.add("focus");
  }
}

function getBackLogin(){
  location.href = "http://127.0.0.1:5500/";
}

document.addEventListener("click", (e) =>{
  focusInput(e);
  if(e.target.matches("#sign-up")){
    e.preventDefault();
    getSignUp();
  }
  if(e.target.matches(".bx.bxs-door-open")){
    localStorage.setItem("user", null);
    location.reload();
  }
})

document.addEventListener("submit", async (e) =>{
  e.preventDefault();
  let $formSignUp = document.querySelector(".sign_up_form");
  let $formLogin = document.querySelector(".form-logIn");

  if (e.target === $formSignUp) {

    try {
      
      let options = {
        method: "POST", // Metodo a realizar
        body: new FormData(e.target),
        mode: "cors"
      }

      let response = await fetch("http://localhost/ChatMessage/assets/sign_up.php", options);
      let json = await response.json();
      
      if(json.ok){
        getLogin();
      }


    } catch (error) {
      console.log(error);
    }

  }

  if (e.target === $formLogin) {
    console.log($formLogin);
    try {
      let options = {
        method: "POST", // Metodo a realizar
        body: new FormData(e.target),
        mode: "cors"
      }

      let response = await fetch("http://localhost/ChatMessage/assets/login.php", options);
      let json = await response.json();
    
      if(json.ok){
        getChats();
      }
    } catch (error) {
      console.log(error);
    }
  }

})


document.addEventListener("DOMContentLoaded", () =>{
  if (localStorage.getItem("user") === null){ // Pregunta al localStorage si la variable "theme" esta vacia
    localStorage.setItem("user", "login"); // Añade un valor a la variable "theme"
  }
  if(localStorage.getItem("user") === "login" ){
    getLogin();
  }
  if(localStorage.getItem("user") === "user" ){
    getChats();
  }
})