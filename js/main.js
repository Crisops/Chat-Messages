const $inputEmail = document.getElementById("email");
const $spanEmail = document.getElementById("span-email");
const $inputPassword = document.getElementById("password");
const $spanPassword = document.getElementById("span-password");
const $spanLast = document.getElementById("sign_span-lastName");

let user_login;



async function getLogin(){

  let $containerForm = document.getElementById("data-form");
  let response = await fetch("components/login.html");
  let jsonText = await response.text(response);
  $containerForm.outerHTML = jsonText;

  // localStorage.setItem("user", null);
}

async function getSignUp(){
  
  let $containerForm = document.getElementById("data-form");
  let response = await fetch("components/sign-up.html");
  let jsonText = await response.text(response);

  $containerForm.innerHTML = "";
  $containerForm.outerHTML = jsonText;
}


async function getChats(){

  localStorage.setItem("user", "user");

  try {
    
  let $containerForm = document.getElementById("container-form");
  let response = await fetch("components/chat.html");
  let jsonText = await response.text(response);

  $containerForm.innerHTML = "";
  $containerForm.outerHTML = jsonText;

  let url = await fetch("http://localhost/ChatMessage/assets/chats.php");
  if (url.ok) {

    let $templateChat = document.getElementById("chats").content;
    let $fragment = document.createDocumentFragment();
    let $online_chats_user = document.getElementById("online_chats_user");

    let res = await url.json();
    console.log(res.chats);
    let data = res.chats;
    data.forEach(chat => {
      $templateChat.querySelector("#name").textContent = `${chat[1]} ${chat[2]}`;
      $templateChat.querySelector(".chat").dataset.chat = chat[0];
      let clone = document.importNode($templateChat,true);
      $fragment.appendChild(clone);
    });
    $online_chats_user.appendChild($fragment);
  }
 

  } catch (error) {
    console.log(error);
  }

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
    localStorage.setItem("user_id",null)
    location.reload();
  }

  if(e.target.matches(".chat")){
    let inputChatUser = e.target.dataset.chat;
    let divChat = document.querySelectorAll(".chat");
    let chat_name = document.getElementById("title_header_chat");
    let name_chat = e.target.querySelector(".name").textContent

    chat_name.textContent = name_chat;

    divChat.forEach((chat) =>{
      chat.classList.remove("focus");
    })
    e.target.classList.add("focus");


    let $formChats = document.getElementById("form-send_messages");
    let user_id = localStorage.getItem("user_id");

    $formChats.chat_message.setAttribute("value", `${inputChatUser}`);
    $formChats.user_login.setAttribute("value", `${user_id}`)

  }

})

document.addEventListener("submit", async (e) =>{
  e.preventDefault();
  let $formSignUp = document.querySelector(".sign_up_form");
  let $formLogin = document.querySelector(".form-logIn");
  let $formSendMeesage = document.querySelector(".form-send_messages");

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
        localStorage.setItem("user_id", json.data_user.id_user);
        getChats();
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (e.target === $formSendMeesage) {
    let text_area = document.getElementById("message_text");
    try {
      let options = {
        method: "POST", // Metodo a realizar
        body: new FormData(e.target),
        mode: "cors"
      }

      let response = await fetch("http://localhost/ChatMessage/assets/sendMessage.php", options);
      let json = await response.json();
    
      if(json.ok){
        console.log(json);
        text_area.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  }

})


document.addEventListener("DOMContentLoaded", () =>{
  if (localStorage.getItem("user") === null){ // Pregunta al localStorage si la variable "user" esta vacia
    localStorage.setItem("user", "login"); // Añade un valor a la variable "user"
  }
  if(localStorage.getItem("user") === "login" ){
    getLogin();
  }
  if(localStorage.getItem("user") === "user" ){
    getChats();
  }
})